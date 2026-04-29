// app/blog/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import BlogCard from '@/components/ui/BlogCard';
import Footer from '@/components/layout/Footer';
import { Search } from 'lucide-react';
import { blogsData, featuredBlogs } from '@/data/blog/blog';

const categories = ['All', 'SEO', 'Local SEO', 'Content Marketing', 'Technical SEO', 'Link Building', 'Analytics'];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = blogsData.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <HeroBanner
                title="Our Blog"
                subtitle="Expert insights, strategies, and actionable tips for digital success"
                breadcrumbs={['Home', 'Blog']}
                backgroundURL={'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg'}
            />

            <section className="py-20 bg-white">
                <div className="container-custom">
                    <SectionHeading
                        title="Latest Articles & Insights"
                        subtitle="Stay updated with the latest trends and strategies in digital marketing"
                    />

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                            />
                        </div>
                    </div>

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

                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-navy-500">No articles found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogsData.map((blog, index) => (
                                <BlogCard
                                    key={blog.slug}
                                    title={blog.title}
                                    excerpt={blog.excerpt}
                                    date={blog.date}
                                    slug={blog.slug}
                                    author={blog.author}
                                    readTime={blog.readTime}
                                    category={blog.category}
                                    imageUrl={blog.imageUrl}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}