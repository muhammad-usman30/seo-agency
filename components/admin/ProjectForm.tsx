'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/config';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import { Upload, X, Image as ImageIcon, Trash2 } from 'lucide-react';

const projectSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    slug: z.string().min(2, 'Slug must be at least 2 characters'),
    category: z.string().min(2, 'Category must be at least 2 characters'),
    excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
    content: z.string().min(20, 'Content must be at least 20 characters'),
    imageUrl: z.string().optional(),
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
    const [uploadingImage, setUploadingImage] = useState(false);
    const [tags, setTags] = useState<string[]>(initialData?.tags || []);
    const [tagInput, setTagInput] = useState('');
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
    const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || '');
    const [oldImageUrl, setOldImageUrl] = useState(initialData?.imageUrl || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData || {
            tags: [],
            isPublished: true,
            order: 0,
            imageUrl: '',
        },
    });

    const addTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            const newTags = [...tags, tagInput];
            setTags(newTags);
            setValue('tags', newTags);
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        const newTags = tags.filter(t => t !== tag);
        setTags(newTags);
        setValue('tags', newTags);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be less than 5MB');
            return;
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        setUploadingImage(true);
        try {
            // Create a unique filename
            const timestamp = Date.now();
            const filename = `projects/${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const storageRef = ref(storage, filename);
            
            // Upload file
            const uploadTask = await uploadBytes(storageRef, file);
            
            // Get download URL
            const downloadURL = await getDownloadURL(uploadTask.ref);
            
            // Delete old image if it exists and is in Firebase Storage
            if (oldImageUrl && oldImageUrl.includes('firebasestorage.googleapis.com')) {
                try {
                    const oldImageRef = ref(storage, oldImageUrl);
                    await deleteObject(oldImageRef);
                } catch (error) {
                    console.log('Old image not found or already deleted');
                }
            }
            
            setImageUrl(downloadURL);
            setImagePreview(downloadURL);
            setValue('imageUrl', downloadURL);
            setOldImageUrl(downloadURL);
            
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image');
        } finally {
            setUploadingImage(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleUrlInput = (url: string) => {
        setImageUrl(url);
        setImagePreview(url);
        setValue('imageUrl', url);
        setOldImageUrl(url);
        if (url) {
            toast.success('Image URL added');
        }
    };

    const removeImage = async () => {
        // Delete from Firebase Storage if it's a stored image
        if (oldImageUrl && oldImageUrl.includes('firebasestorage.googleapis.com')) {
            try {
                const imageRef = ref(storage, oldImageUrl);
                await deleteObject(imageRef);
                toast.success('Image deleted from storage');
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
        
        setImageUrl('');
        setImagePreview('');
        setOldImageUrl('');
        setValue('imageUrl', '');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        toast.success('Image removed');
    };

    const onSubmit = async (data: ProjectFormData) => {
        setLoading(true);
        try {
            const projectData = { 
                ...data, 
                tags, 
                imageUrl: imageUrl || '',
                updatedAt: new Date() 
            };
            
            if (initialData?.id) {
                await updateDoc(doc(db, 'projects', initialData.id), projectData);
                toast.success('Project updated successfully');
            } else {
                await addDoc(collection(db, 'projects'), { ...projectData, createdAt: new Date() });
                toast.success('Project created successfully');
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving project:', error);
            toast.error('Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 overflow-y-auto h-[calc(100vh-365px)] scrollbar-width-thin pr-2">
            {/* Image Upload Section */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Project Image</label>
                
                {/* Image Preview */}
                {imagePreview && (
                    <div className="relative mb-4">
                        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                                onError={() => {
                                    setImagePreview('');
                                    setImageUrl('');
                                    toast.error('Invalid image URL');
                                }}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
                
                {/* Upload Options */}
                <div className="space-y-3">
                    {/* Upload from Gallery */}
                    <div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="imageUpload"
                        />
                        <label
                            htmlFor="imageUpload"
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition"
                        >
                            <Upload className="w-5 h-5 text-primary-500" />
                            <span className="text-navy-600">
                                {uploadingImage ? 'Uploading...' : 'Upload from Gallery'}
                            </span>
                        </label>
                        {uploadingImage && (
                            <div className="mt-2 text-center">
                                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                                <span className="ml-2 text-sm text-navy-500">Uploading...</span>
                            </div>
                        )}
                    </div>
                    
                    {/* OR Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-navy-500">OR</span>
                        </div>
                    </div>
                    
                    {/* Image URL Input */}
                    <div>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => handleUrlInput(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                            />
                            <button
                                type="button"
                                onClick={() => handleUrlInput(imageUrl)}
                                className="px-4 py-2 bg-gray-100 text-navy-600 rounded-lg hover:bg-gray-200 transition"
                            >
                                <ImageIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-navy-400 mt-1">Enter a valid image URL or upload from your device</p>
                    </div>
                </div>
            </div>

            {/* Title */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input {...register('title')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200" />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Slug */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <input {...register('slug')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200" />
                <p className="text-xs text-navy-400 mt-1">URL-friendly version of the title (e.g., my-project-name)</p>
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
            </div>

            {/* Category */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select {...register('category')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200">
                    <option value="">Select a category</option>
                    <option value="Creative">Creative</option>
                    <option value="Design">Design</option>
                    <option value="Digital">Digital</option>
                    <option value="Photography">Photography</option>
                    <option value="Service">Service</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            {/* Excerpt */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <textarea {...register('excerpt')} rows={2} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200" />
                <p className="text-xs text-navy-400 mt-1">Short description shown on project cards</p>
                {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
            </div>

            {/* Content */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <textarea {...register('content')} rows={6} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200" />
                <p className="text-xs text-navy-400 mt-1">Detailed project description</p>
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>

            {/* Tags */}
            <div className='pr-4'>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                    <input 
                        value={tagInput} 
                        onChange={(e) => setTagInput(e.target.value)} 
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-200" 
                        placeholder="Press Enter to add tag"
                    />
                    <button type="button" onClick={addTag} className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700">×</button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Settings */}
            <div className="grid grid-cols-2 gap-4 pr-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input type="number" {...register('order', { valueAsNumber: true })} className="w-full px-4 py-2 border rounded-lg" />
                    <p className="text-xs text-navy-400 mt-1">Lower numbers appear first</p>
                </div>
                
                <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" {...register('isPublished')} className="w-4 h-4" />
                        <span className="text-sm font-medium">Published</span>
                    </label>
                </div>
            </div>

            {/* Form Actions */}
            <div className='flex gap-3 justify-end pr-4 pt-4 border-t'>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading || uploadingImage}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={loading || uploadingImage} variant="primary">
                    {loading ? 'Saving...' : uploadingImage ? 'Uploading Image...' : initialData ? 'Update Project' : 'Create Project'}
                </Button>
            </div>
        </form>
    );
}