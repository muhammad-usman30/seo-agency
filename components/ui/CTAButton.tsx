// components/ui/CTAButton.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface CTAButtonProps {
    children: ReactNode;
    href: string;
    variant?: 'primary' | 'outline' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
}

export default function CTAButton({
    children,
    href,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick
}: CTAButtonProps) {
    const variants = {
        primary: 'gradient-bg text-white hover:shadow-lg',
        outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
        secondary: 'bg-navy-800 text-white hover:bg-navy-700'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Link
                href={href}
                onClick={onClick}
                className={`inline-block rounded-full font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
            >
                {children}
            </Link>
        </motion.div>
    );
}