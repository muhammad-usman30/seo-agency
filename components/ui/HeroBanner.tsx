// components/ui/HeroBanner.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface HeroBannerProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: string[];
    background?: 'light' | 'gradient' | 'dark';
}

export default function HeroBanner({ title, subtitle, breadcrumbs, background = 'gradient' }: HeroBannerProps) {
    const backgrounds = {
        light: 'bg-cream',
        gradient: 'bg-gradient-to-br from-primary-50 via-cream to-blush',
        dark: 'bg-navy-800 text-white'
    };

    return (
        <section className={`py-20 lg:py-32 ${backgrounds[background]}`}>
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    {breadcrumbs && (
                        <div className="flex items-center justify-center gap-2 text-sm mb-4">
                            {breadcrumbs.map((crumb, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    {index > 0 && <ChevronRight className="w-4 h-4 text-navy-400" />}
                                    <span className={index === breadcrumbs.length - 1 ? 'text-primary-600 font-semibold' : 'text-navy-500'}>
                                        {crumb}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    <h1 className="text-5xl lg:text-7xl font-bold mb-6">{title}</h1>
                    {subtitle && <p className="text-xl text-navy-600 max-w-2xl mx-auto">{subtitle}</p>}
                </motion.div>
            </div>
        </section>
    );
}