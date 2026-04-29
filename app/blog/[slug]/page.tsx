// app/blog/[slug]/page.tsx
'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import HeroBanner from '@/components/ui/HeroBanner';
import Footer from '@/components/layout/Footer';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, Heart, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { blogsData } from '@/data/blog/blog';

export default function SingleBlogPage() {
    const { slug } = useParams();
    const post = blogsData.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = blogsData
        .filter(p => p.category === post.category && p.slug !== slug)
        .slice(0, 3);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
    };

    // Function to render content sections
    const renderSection = (section: any, index: number) => {
        switch (section.type) {
            case 'heading':
                if (section.content.startsWith('1.') || section.content.startsWith('2.') ||
                    section.content.startsWith('3.') || section.content.startsWith('4.') ||
                    section.content.startsWith('5.')) {
                    return (
                        <h2 key={index} className="text-2xl font-bold text-navy-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                            {section.content}
                        </h2>
                    );
                }
                return (
                    <h3 key={index} className="text-xl font-bold text-navy-800 mt-6 mb-3">
                        {section.content}
                    </h3>
                );

            case 'paragraph':
                return (
                    <p key={index} className="text-navy-600 leading-relaxed mb-4">
                        {section.content}
                    </p>
                );

            case 'image':
                return (
                    <div key={index} className="my-8 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={section.content}
                            alt="Blog content"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                );

            case 'list':
                return (
                    <div key={index} className="my-6">
                        <p className="text-navy-700 font-semibold mb-3">{section.content}</p>
                        <ul className="space-y-2 list-disc list-inside text-navy-600">
                            {section.items?.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                );

            case 'quote':
                return (
                    <div key={index} className="my-8 p-6 bg-gradient-to-r from-primary-50 to-cream rounded-2xl border-l-4 border-primary-500">
                        <p className="text-navy-700 italic text-lg">"{section.content}"</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <HeroBanner
                title={post.title}
                subtitle={post.excerpt}
                breadcrumbs={['Home', 'Blog', post.title]}
                // background="gradient"
                backgroundURL={post.heroBanner}
            />

            <article className="py-20 bg-white">
                <div className="container-custom px-16 mx-auto">
                    {/* Meta Info */}
                    <div className="flex flex-wrap justify-between items-center mb-8 pb-8 border-b border-gray-200">
                        <div className="flex flex-wrap gap-6 text-navy-500">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                {post.readTime} min read
                            </span>
                            <span className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                {post.author}
                            </span>
                        </div>
                        <div className="flex gap-3 mt-4 sm:mt-0">
                            <button
                                onClick={handleShare}
                                className="p-2 bg-gray-100 rounded-full hover:bg-primary-100 transition group"
                                aria-label="Share article"
                            >
                                <Share2 className="w-5 h-5 text-navy-600 group-hover:text-primary-600" />
                            </button>
                            <button className="p-2 bg-gray-100 rounded-full hover:bg-primary-100 transition group" aria-label="Save article">
                                <Bookmark className="w-5 h-5 text-navy-600 group-hover:text-primary-600" />
                            </button>
                            <button className="p-2 bg-gray-100 rounded-full hover:bg-primary-100 transition group" aria-label="Like article">
                                <Heart className="w-5 h-5 text-navy-600 group-hover:text-primary-600" />
                            </button>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-[70vh] object-cover"
                        />
                    </div>

                    {/* Category Badge */}
                    <div className="mb-6">
                        <span className="inline-block px-4 py-1 bg-primary-100 text-primary-600 rounded-full text-light font-semibold">
                            {post.category}
                        </span>
                    </div>

                    {/* Content Sections */}
                    <div className="prose prose-lg max-w-none">
                        {post.sections.map((section, index) => renderSection(section, index))}
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-10 pt-8 border-t border-gray-200">
                            <div className="flex items-center gap-2 mb-4">
                                <Tag className="w-5 h-5 text-primary-500" />
                                <h3 className="text-lg font-bold text-navy-800">Tags:</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-light text-navy-600 hover:bg-primary-100 hover:text-primary-600 transition cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Author Bio */}
                    <div className="mt-10 p-6 bg-gradient-to-r from-primary-50 to-cream rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                {post.author.charAt(0)}
                            </div>
                            <div className='space-y-2'>
                                <h4 className="font-bold text-navy-800">Written by {post.author}</h4>
                                <p className="text-light text-navy-600">SEO Specialist & Digital Marketing Expert</p>
                                <p className="text-light text-navy-500 mt-1">Passionate about helping businesses grow through strategic SEO and content marketing.</p>
                            </div>
                        </div>
                    </div>

                    {/* Back to Blog Button */}
                    <div className="mt-10 text-center">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition">
                            <ArrowLeft className="w-4 h-4" />
                            Back to All Articles
                        </Link>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-20 bg-cream">
                    <div className="container-custom">
                        <h2 className="text-3xl font-bold text-center mb-12">You Might Also Like</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.map((post, index) => (
                                <Link href={`/blog/${post.slug}`} key={post.slug}>
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full">
                                        <div className="relative w-full h-48 overflow-hidden">
                                            <img
                                                src={post.imageUrl}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <span className="text-primary-600 text-light font-semibold">{post.category}</span>
                                            <h3 className="text-lg font-bold mt-2 mb-2 line-clamp-2 group-hover:text-primary-600 transition">
                                                {post.title}
                                            </h3>
                                            <p className="text-navy-600 text-light line-clamp-2">{post.excerpt}</p>
                                            <div className="flex items-center gap-3 mt-3 text-xs text-navy-400">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {post.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {post.readTime} min read
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </>
    );
}