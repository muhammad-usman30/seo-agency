// components/sections/Blog.tsx
'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import BlogCard from '@/components/ui/BlogCard';
import CTAButton from '@/components/ui/CTAButton';
import { blogHeading, featuredBlogs } from '@/data/blog/blog';

export default function Blog() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <SectionHeading {...blogHeading} />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {featuredBlogs.map((blog, index) => (
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
                <div className="text-center">
                    <CTAButton href="/blog" variant="outline" size="lg">
                        View All Articles
                    </CTAButton>
                </div>
            </div>
        </section>
    );
}