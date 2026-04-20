// components/ui/Card.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ children, className = '', hover = true, padding = 'md' }: CardProps) {
    const paddings = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={hover ? { y: -8 } : {}}
            className={`bg-white rounded-2xl shadow-lg ${paddings[padding]} ${hover ? 'transition-all duration-300 hover:shadow-2xl' : ''} ${className}`}
        >
            {children}
        </motion.div>
    );
}