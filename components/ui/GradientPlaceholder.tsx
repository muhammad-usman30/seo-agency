// components/ui/GradientPlaceholder.tsx
'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GradientPlaceholderProps {
    className?: string;
    aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
    icon?: LucideIcon;
    label?: string;
    animated?: boolean;
}

export default function GradientPlaceholder({
    className = '',
    aspectRatio = 'auto',
    icon: Icon,
    label = 'Image Placeholder',
    animated = true
}: GradientPlaceholderProps) {
    const aspectClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        auto: 'aspect-auto'
    };

    return (
        <div className={`relative overflow-hidden rounded-2xl ${aspectClasses[aspectRatio]} ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-blush to-cream" />

            {/* Animated gradient blobs */}
            {animated && (
                <>
                    <motion.div
                        className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-r from-primary-300/30 to-primary-400/30 blur-3xl"
                        animate={{
                            x: ['0%', '100%', '0%'],
                            y: ['0%', '50%', '0%'],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-l from-primary-200/20 to-primary-300/20 blur-2xl"
                        animate={{
                            x: ['0%', '-100%', '0%'],
                            y: ['0%', '-50%', '0%'],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                        animate={{
                            x: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </>
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-6 text-center">
                {Icon && <Icon className="w-12 h-12 text-primary-400 mb-3" />}
                <p className="text-navy-400 text-sm font-medium bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                    {label}
                </p>
            </div>
        </div>
    );
}