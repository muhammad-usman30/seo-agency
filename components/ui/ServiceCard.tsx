// components/ui/ServiceCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import * as Icons from 'lucide-react';

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
    slug: string;
    index: number;
}

export default function ServiceCard({ icon, title, description, slug, index }: ServiceCardProps) {
    // Dynamically get the icon component from the icon name string
    const IconComponent = (Icons as any)[icon];

    // Fallback icon if the specified icon doesn't exist
    if (!IconComponent) {
        console.warn(`Icon "${icon}" not found`);
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
        >
            <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-navy-600 mb-4 line-clamp-3">{description}</p>
            <Link
                href={`/services/${slug}`}
                className="text-primary-600 font-semibold hover:text-primary-700 transition inline-flex items-center gap-1 group-hover:gap-2"
            >
                Learn More
                <span className="text-lg">→</span>
            </Link>
        </motion.div>
    );
}