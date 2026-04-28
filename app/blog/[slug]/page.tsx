'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import HeroBanner from '@/components/ui/HeroBanner';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';
import Footer from '@/components/layout/Footer';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, Heart } from 'lucide-react';
import { toast } from 'sonner';

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
    tags: string[];
    isPublished: boolean;
}

export default function SingleBlogPage() {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const q = query(collection(db, 'blogs'), where('slug', '==', slug), where('isPublished', '==', true));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const postData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as BlogPost;
                    setPost(postData);

                    // Fetch related posts
                    const relatedQ = query(
                        collection(db, 'blogs'),
                        where('category', '==', postData.category),
                        where('isPublished', '==', true)
                    );
                    const relatedSnapshot = await getDocs(relatedQ);
                    const related = relatedSnapshot.docs
                        .map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
                        .filter(p => p.slug !== slug)
                        .slice(0, 3);
                    setRelatedPosts(related);
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
    };

    if (loading) {
        return (
            <>
                <HeroBanner title="Loading..." subtitle="Please wait" breadcrumbs={['Home', 'Blog', 'Loading']} />
                <div className="py-20">
                    <div className="container-custom">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8" />
                            <div className="h-96 bg-gray-200 rounded mb-8" />
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded" />
                                <div className="h-4 bg-gray-200 rounded w-5/6" />
                                <div className="h-4 bg-gray-200 rounded w-4/6" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!post) {
        return (
            <>
                <HeroBanner title="Post Not Found" subtitle="The blog post you're looking for doesn't exist" breadcrumbs={['Home', 'Blog', '404']} />
                <div className="py-20 text-center">
                    <div className="container-custom">
                        <GradientPlaceholder aspectRatio="video" label="404 - Post Not Found" />
                        <Link href="/blog" className="inline-block mt-8 btn-primary">
                            Back to Blog
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <HeroBanner
                title={post.title}
                subtitle={post.excerpt}
                breadcrumbs={['Home', 'Blog', post.title]}
            />

            <article className="py-20 bg-white">
                <div className="container-custom max-w-4xl mx-auto">
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
                                className="p-2 bg-gray-100 rounded-full hover:bg-primary-100 transition"
                            >
                                <Share2 className="w-5 h-5 text-navy-600" />
                            </button>
                            <button className="p-2 bg-gray-100 rounded-full hover:bg-primary-100 transition">
                                <Bookmark className="w-5 h-5 text-navy-600" />
                            </button>
                            <button className="p-2 bg-gray-100 rounded-full hover:bg-primary-100 transition">
                                <Heart className="w-5 h-5 text-navy-600" />
                            </button>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-8 rounded-2xl overflow-hidden">
                        {post.imageUrl ? (
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-auto object-cover"
                            />
                        ) : (
                            <GradientPlaceholder aspectRatio="video" label={post.title} />
                        )}
                    </div>

                    {/* Category Badge */}
                    <div className="mb-6">
                        <span className="inline-block px-4 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                            {post.category}
                        </span>
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none prose-headings:text-navy-800 prose-p:text-navy-600 prose-a:text-primary-600 prose-strong:text-navy-800"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-bold mb-3">Tags:</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-navy-600">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-20 bg-cream">
                    <div className="container-custom">
                        <h2 className="text-3xl font-bold text-center mb-12">Related Articles</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.map((related) => (
                                <Link href={`/blog/${related.slug}`} key={related.id}>
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                        <div className="relative w-full h-48 overflow-hidden">
                                            {related.imageUrl ? (
                                                <img
                                                    src={related.imageUrl}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <GradientPlaceholder aspectRatio="video" label={related.title} />
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <span className="text-primary-600 text-sm font-semibold">{related.category}</span>
                                            <h3 className="text-lg font-bold mt-2 line-clamp-2">{related.title}</h3>
                                            <p className="text-navy-600 mt-2 line-clamp-2">{related.excerpt}</p>
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