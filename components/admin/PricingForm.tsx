// components/admin/PricingForm.tsx (Add validation for max 3 published plans)
'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { doc, updateDoc, addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';

const pricingSchema = z.object({
    name: z.string().min(2, 'Plan name is required'),
    priceMonthly: z.number().min(0, 'Price must be 0 or greater'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    features: z.array(
        z.object({
            name: z.string(),
            included: z.boolean()
        })
    ),
    isFeatured: z.boolean(),
    ctaText: z.string().min(2, 'Button text is required'),
    order: z.number(),
    isPublished: z.boolean(),
});

type PricingFormData = z.infer<typeof pricingSchema>;

interface PricingFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function PricingForm({ initialData, onSuccess, onCancel }: PricingFormProps) {
    const [loading, setLoading] = useState(false);
    const [publishedCount, setPublishedCount] = useState(0);

    // Get current published plans count
    useEffect(() => {
        const fetchPublishedCount = async () => {
            const q = query(collection(db, 'pricingPlans'), where('isPublished', '==', true));
            const snapshot = await getDocs(q);
            setPublishedCount(snapshot.size);
        };
        fetchPublishedCount();
    }, []);

    const getInitialFeatures = () => {
        if (initialData?.features) {
            if (initialData.features.length > 0 && typeof initialData.features[0] === 'string') {
                return initialData.features.map((feature: string) => ({
                    name: feature,
                    included: true
                }));
            }
            return initialData.features;
        }
        return [{ name: '', included: true }];
    };

    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<PricingFormData>({
        resolver: zodResolver(pricingSchema),
        defaultValues: initialData ? {
            ...initialData,
            features: getInitialFeatures(),
        } : {
            features: [{ name: '', included: true }],
            isFeatured: false,
            isPublished: true,
            order: 0,
            ctaText: 'Get Started',
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'features',
    });

    const watchedFeatures = watch('features');
    const isPublished = watch('isPublished');

    const toggleFeatureIncluded = (index: number, currentValue: boolean) => {
        setValue(`features.${index}.included`, !currentValue);
    };

    const onSubmit = async (data: PricingFormData) => {
        // Check if trying to publish a new plan and already have 3 published
        if (data.isPublished && !initialData?.isPublished && publishedCount >= 3) {
            toast.error('Maximum 3 published pricing plans allowed. Please unpublish an existing plan first.');
            return;
        }
        
        // Check if editing and trying to publish when already 3 published
        if (data.isPublished && initialData && !initialData.isPublished && publishedCount >= 3) {
            toast.error('Maximum 3 published pricing plans allowed. Please unpublish an existing plan first.');
            return;
        }

        setLoading(true);
        try {
            const formattedData = {
                ...data,
                features: data.features,
                updatedAt: new Date(),
            };

            if (initialData?.id) {
                await updateDoc(doc(db, 'pricingPlans', initialData.id), formattedData);
                toast.success('Pricing plan updated successfully');
            } else {
                await addDoc(collection(db, 'pricingPlans'), {
                    ...formattedData,
                    createdAt: new Date(),
                });
                toast.success('Pricing plan created successfully');
            }
            onSuccess();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to save pricing plan');
        } finally {
            setLoading(false);
        }
    };

    const maxPublishedReached = publishedCount >= 3 && !initialData?.isPublished;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 overflow-y-auto scrollbar-width-thin max-h-[580px]">
            {maxPublishedReached && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-700 text-sm">
                        ⚠️ Maximum 3 published pricing plans reached. You cannot publish more than 3 plans.
                    </p>
                </div>
            )}

            {/* Plan Name */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Plan Name *</label>
                <input 
                    {...register('name')} 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                    placeholder="e.g., Basic Plan"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Price */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Price (Monthly) *</label>
                <input 
                    type="number" 
                    {...register('priceMonthly', { valueAsNumber: true })} 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                    placeholder="19.99"
                />
                {errors.priceMonthly && <p className="text-red-500 text-sm mt-1">{errors.priceMonthly.message}</p>}
            </div>

            {/* Description */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea 
                    {...register('description')} 
                    rows={3} 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                    placeholder="Brief description of this plan..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Features with Toggle */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-3">Features *</label>
                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                                <input 
                                    {...register(`features.${index}.name`)} 
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                                    placeholder="Feature name"
                                />
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-navy-600">Included:</label>
                                <button
                                    type="button"
                                    onClick={() => toggleFeatureIncluded(index, watchedFeatures?.[index]?.included ?? true)}
                                    className={`
                                        relative w-12 h-6 rounded-full transition-colors duration-300
                                        ${watchedFeatures?.[index]?.included 
                                            ? 'bg-green-500' 
                                            : 'bg-red-500'}
                                    `}
                                >
                                    <span className={`
                                        absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300
                                        ${watchedFeatures?.[index]?.included ? 'translate-x-6' : 'translate-x-0'}
                                    `} />
                                </button>
                                <span className="text-xs font-medium w-8">
                                    {watchedFeatures?.[index]?.included ? 'Yes' : 'No'}
                                </span>
                            </div>
                            
                            <button 
                                type="button" 
                                onClick={() => remove(index)} 
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
                
                <button 
                    type="button" 
                    onClick={() => append({ name: '', included: true })} 
                    className="mt-3 flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition"
                >
                    <Plus className="w-4 h-4" /> Add Feature
                </button>
            </div>

            {/* Plan Settings */}
            <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register('isFeatured')} className="w-4 h-4" />
                    <span className="text-sm font-medium">Featured Plan (Popular badge)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        {...register('isPublished')} 
                        className="w-4 h-4"
                        disabled={maxPublishedReached && !initialData?.isPublished}
                    />
                    <span className={`text-sm font-medium ${maxPublishedReached && !initialData?.isPublished ? 'text-gray-400' : ''}`}>
                        Published (Visible on website)
                    </span>
                </label>
            </div>

            {/* CTA Button Text */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">CTA Button Text *</label>
                <input 
                    {...register('ctaText')} 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                    placeholder="Get Started"
                />
                {errors.ctaText && <p className="text-red-500 text-sm mt-1">{errors.ctaText.message}</p>}
            </div>

            {/* Order */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Display Order *</label>
                <input 
                    type="number" 
                    {...register('order', { valueAsNumber: true })} 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                    placeholder="0"
                />
                <p className="text-xs text-navy-400 mt-1">Lower numbers appear first (1, 2, 3)</p>
            </div>

            {/* Form Actions */}
            <div className='flex gap-3 justify-end pr-4 pt-4 border-t'>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button 
                    type="submit" 
                    disabled={loading || (maxPublishedReached && !initialData?.isPublished)} 
                    variant="primary"
                >
                    {loading ? 'Saving...' : initialData ? 'Update Plan' : 'Create Plan'}
                </Button>
            </div>
        </form>
    );
}