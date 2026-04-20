// components/ui/ServiceCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    slug: string;
    index: number;
}

export default function ServiceCard({ icon: Icon, title, description, slug, index }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-navy-600 mb-4">{description}</p>
            <Link href={`/services/${slug}`} className="text-primary-600 font-semibold hover:text-primary-700">
                Learn More →
            </Link>
        </motion.div>
    );
}