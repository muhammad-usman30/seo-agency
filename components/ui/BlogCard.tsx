// components/ui/BlogCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import GradientPlaceholder from './GradientPlaceholder';

interface BlogCardProps {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    index: number;
}

export default function BlogCard({ title, excerpt, date, slug, index }: BlogCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            <GradientPlaceholder aspectRatio="video" label="Blog Image" />
            <div className="p-6">
                <div className="text-sm text-primary-600 mb-2">{date}</div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{title}</h3>
                <p className="text-navy-600 mb-4 line-clamp-3">{excerpt}</p>
                <Link href={`/blog/${slug}`} className="text-primary-600 font-semibold hover:text-primary-700">
                    Read More →
                </Link>
            </div>
        </motion.article>
    );
}