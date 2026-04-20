// components/ui/SectionHeading.tsx
'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    badge?: string;
    centered?: boolean;
    className?: string;
}

export default function SectionHeading({
    title,
    subtitle,
    badge,
    centered = true,
    className = ''
}: SectionHeadingProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mb-12 ${centered ? 'text-center' : 'text-left'} ${className}`}
        >
            {badge && (
                <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-600 text-sm font-semibold mb-4">
                    {badge}
                </span>
            )}
            <h2 className="text-4xl md:text-5xl font-bold text-navy-800 mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-navy-600 max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>
    );
}