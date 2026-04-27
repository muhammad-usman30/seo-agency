// app/blog/page.tsx (Blog Listing Page)
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';
import LoadingState from '@/components/ui/Loading';
import Footer from '@/components/layout/Footer';
import { Calendar, User, Clock } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    imageUrl: string;
    isPublished: boolean;
    createdAt: any;
}

const BlogCardSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
        <div className="w-full h-64 bg-gray-200" />
        <div className="p-6">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
    </div>
);

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'SEO', 'Digital Marketing', 'Social Media', 'Content Marketing', 'News'];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const postsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as BlogPost));

                const publishedPosts = postsData.filter(post => post.isPublished === true);
                setPosts(publishedPosts);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = selectedCategory === 'All'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    return (
        <>
            <HeroBanner
                title="Our Blog"
                subtitle="Insights, tips, and latest trends in digital marketing"
                breadcrumbs={['Home', 'Blog']}
            />

            <section className="py-20 bg-white">
                <div className="container-custom">
                    <SectionHeading
                        title="Latest Articles"
                        subtitle="Expert insights and strategies to grow your online presence"
                    />

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === cat
                                        ? 'gradient-bg text-white'
                                        : 'bg-gray-100 text-navy-600 hover:bg-primary-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <BlogCardSkeleton key={item} />
                            ))}
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <GradientPlaceholder aspectRatio="video" label="No Posts Yet" />
                            <p className="text-navy-500 mt-4">No blog posts found. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <Link href={`/blog/${post.slug}`} key={post.id}>
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                                        <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                                            {post.imageUrl ? (
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <GradientPlaceholder aspectRatio="video" label={post.title} />
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-navy-500 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {post.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {post.readTime} min read
                                                </span>
                                            </div>
                                            <span className="text-primary-600 text-sm font-semibold">{post.category}</span>
                                            <h3 className="text-xl font-bold mt-2 mb-2 line-clamp-2">{post.title}</h3>
                                            <p className="text-navy-600 line-clamp-3">{post.excerpt}</p>
                                            <div className="flex items-center gap-2 mt-4 text-navy-500">
                                                <User className="w-4 h-4" />
                                                <span className="text-sm">{post.author}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}