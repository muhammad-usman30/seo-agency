// components/admin/ProjectForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';

const projectSchema = z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    category: z.string().min(2),
    excerpt: z.string().min(10),
    content: z.string().min(20),
    imageUrl: z.string().url().optional().or(z.literal('')),
    tags: z.array(z.string()),
    order: z.number(),
    isPublished: z.boolean(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ProjectForm({ initialData, onSuccess, onCancel }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState<string[]>(initialData?.tags || []);
    const [tagInput, setTagInput] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData || {
            tags: [],
            isPublished: true,
            order: 0,
        },
    });

    const addTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const onSubmit = async (data: ProjectFormData) => {
        setLoading(true);
        try {
            const projectData = { ...data, tags, updatedAt: new Date() };
            if (initialData?.id) {
                await updateDoc(doc(db, 'projects', initialData.id), projectData);
                toast.success('Project updated successfully');
            } else {
                await addDoc(collection(db, 'projects'), { ...projectData, createdAt: new Date() });
                toast.success('Project created successfully');
            }
            onSuccess();
        } catch (error) {
            toast.error('Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 overflow-y-auto max-h-[525px]">
            <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input {...register('title')} className="w-full px-4 py-2 border rounded-lg" />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input {...register('slug')} className="w-full px-4 py-2 border rounded-lg" />
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input {...register('category')} className="w-full px-4 py-2 border rounded-lg" />
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea {...register('excerpt')} rows={2} className="w-full px-4 py-2 border rounded-lg" />
                {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea {...register('content')} rows={6} className="w-full px-4 py-2 border rounded-lg" />
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input {...register('imageUrl')} width={300} height={150} className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                    <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" />
                    <button type="button" onClick={addTag} className="px-4 py-2 bg-primary-500 text-white rounded-lg">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-2">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="text-red-500">×</button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex gap-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" {...register('isPublished')} />
                    <span>Published</span>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Order</label>
                <input type="number" {...register('order', { valueAsNumber: true })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div className='flex gap-2 justify-end'>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={loading} variant="primary">
                    {loading ? 'Saving...' : initialData ? 'Update Project' : 'Create Project'}
                </Button>
            </div>
        </form>
    );
}
