// components/ui/BlogCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock } from 'lucide-react';

interface BlogCardProps {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    author?: string;
    readTime?: string;
    category?: string;
    imageUrl?: string;
    index: number;
}

export default function BlogCard({
    title,
    excerpt,
    date,
    slug,
    author,
    readTime,
    category,
    imageUrl,
    index
}: BlogCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col"
        >
            <Link href={`/blog/${slug}`} className="h-full flex flex-col">
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden bg-gray-100">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={title}
                            height='auto'
                            width='auto'
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-cream flex items-center justify-center">
                            <span className="text-navy-400">{title}</span>
                        </div>
                    )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-sm text-navy-500 mb-3">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {date}
                        </span>
                        {readTime && (
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {readTime} min read
                            </span>
                        )}
                    </div>

                    {/* Category */}
                    {category && (
                        <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-semibold mb-3 self-start">
                            {category}
                        </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary-600 transition">
                        {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-navy-600 mb-4 line-clamp-3 flex-1">{excerpt}</p>

                    {/* Author */}
                    {author && (
                        <div className="flex items-center gap-1 text-sm text-navy-500 mt-auto">
                            <User className="w-3 h-3" />
                            {author}
                        </div>
                    )}
                </div>
            </Link>
        </motion.article>
    );
}