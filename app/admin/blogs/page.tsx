// app/admin/blogs/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Edit, Trash2, Plus } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    category: string;
    isPublished: boolean;
    date: string;
}

export default function AdminBlogsPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        const snapshot = await getDocs(collection(db, 'blogs'));
        const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
        setPosts(postsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            await deleteDoc(doc(db, 'blogs', id));
            toast.success('Post deleted successfully');
            fetchPosts();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Blog Posts</h1>
                <Link href="/admin/blogs/new">
                    <Button variant="primary" size="sm">
                        <Plus className="w-4 h-4 mr-2" /> Add Post
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Title</th>
                                <th className="px-6 py-3 text-left">Category</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td className="px-6 py-4">{post.title}</td>
                                    <td className="px-6 py-4">{post.category}</td>
                                    <td className="px-6 py-4">{post.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${post.isPublished ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {post.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link href={`/admin/blogs/${post.id}`} className="text-blue-500 hover:text-blue-700">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}