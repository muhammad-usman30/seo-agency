// components/admin/PricingForm.tsx
'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { doc, setDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';

const pricingSchema = z.object({
    name: z.string().min(2),
    priceMonthly: z.number().min(0),
    description: z.string().min(10),
    features: z.array(z.string()),
    isFeatured: z.boolean(),
    ctaText: z.string().min(2),
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

    const { register, control, handleSubmit, formState: { errors } } = useForm<PricingFormData>({
        resolver: zodResolver(pricingSchema),
        defaultValues: initialData || {
            features: [''],
            isFeatured: false,
            isPublished: true,
            order: 0,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'features',
    });

    const onSubmit = async (data: PricingFormData) => {
        setLoading(true);
        try {
            if (initialData?.id) {
                await updateDoc(doc(db, 'pricingPlans', initialData.id), {
                    ...data,
                    updatedAt: new Date(),
                });
                toast.success('Pricing plan updated successfully');
            } else {
                await addDoc(collection(db, 'pricingPlans'), {
                    ...data,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                toast.success('Pricing plan created successfully');
            }
            onSuccess();
        } catch (error) {
            toast.error('Failed to save pricing plan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 overflow-y-auto scrollbar-width-thin max-h-[580px]">
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Plan Name</label>
                <input {...register('name')} className="w-full px-4 py-2 border rounded-lg" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Price (Monthly)</label>
                <input type="number" {...register('priceMonthly', { valueAsNumber: true })} className="w-full px-4 py-2 border rounded-lg" />
                {errors.priceMonthly && <p className="text-red-500 text-sm mt-1">{errors.priceMonthly.message}</p>}
            </div>

            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea {...register('description')} rows={3} className="w-full px-4 py-2 border rounded-lg" />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Features</label>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                        <input {...register(`features.${index}`)} className="flex-1 px-4 py-2 border rounded-lg" />
                        <button type="button" onClick={() => remove(index)} className="p-2 text-red-500">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => append('')} className="flex items-center gap-2 text-primary-600">
                    <Plus className="w-4 h-4" /> Add Feature
                </button>
            </div>

            <div className="flex gap-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" {...register('isFeatured')} />
                    <span>Featured Plan</span>
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox" {...register('isPublished')} />
                    <span>Published</span>
                </label>
            </div>

            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">CTA Button Text</label>
                <input {...register('ctaText')} className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Order</label>
                <input type="number" {...register('order', { valueAsNumber: true })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div className='flex gap-2 justify-end pr-4'>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={loading} variant="primary">
                    {loading ? 'Saving...' : initialData ? 'Update Plan' : 'Create Plan'}
                </Button>

            </div>
        </form>
    );
}