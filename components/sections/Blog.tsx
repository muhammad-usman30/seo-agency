// components/sections/Blog.tsx
'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import BlogCard from '@/components/ui/BlogCard';
import CTAButton from '@/components/ui/CTAButton';

const blogs = [
    { title: 'Strategies for Effective Social Media Marketing', excerpt: 'Digital marketing encompasses a broad spectrum of strategies aimed...', date: 'Dec 15, 2024', slug: 'social-media-marketing' },
    { title: 'How to Optimize for User Experience and Search Rankings', excerpt: 'Digital marketing encompasses a broad spectrum of strategies aimed...', date: 'Dec 10, 2024', slug: 'user-experience-optimization' },
    { title: 'How to Optimize for and Search Rankings', excerpt: 'Digital marketing encompasses a broad spectrum of strategies aimed...', date: 'Dec 05, 2024', slug: 'search-rankings-optimization' },
];

export default function Blog() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <SectionHeading
                    badge="Our Blogs"
                    title="Latest Insights"
                    subtitle="As a process transformation company, we rethinks and rebuilds processes for the digital age."
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogs.map((blog, index) => (
                        <BlogCard key={index} {...blog} index={index} />
                    ))}
                </div>
                <div className="text-center">
                    <CTAButton href="/blog" variant="outline">View All Posts</CTAButton>
                </div>
            </div>
        </section>
    );
}