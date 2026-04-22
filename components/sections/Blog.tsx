// components/sections/Blog.tsx
'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import BlogCard from '@/components/ui/BlogCard';
import CTAButton from '@/components/ui/CTAButton';
import { blogHeading, blogsData } from '@/data/home/blogsData';

export default function Blog() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <SectionHeading {...blogHeading} />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogsData.map((blog, index) => (
                        <BlogCard key={blog.slug} {...blog} index={index} />
                    ))}
                </div>

                <div className="text-center">
                    <CTAButton href="/blog" variant="outline">
                        View All Posts
                    </CTAButton>
                </div>
            </div>
        </section>
    );
}