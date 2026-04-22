// components/ui/CustomImage.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import GradientPlaceholder from './GradientPlaceholder';

interface CustomImageProps {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    width?: number;
    height?: number;
}

export default function CustomImage({ src, alt, className = '', fill = false, width, height }: CustomImageProps) {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // If image fails to load, show placeholder
    if (error || !src) {
        return (
            <div className={`relative ${className}`} style={!fill ? { width, height } : {}}>
                <GradientPlaceholder aspectRatio="video" label={alt} />
            </div>
        );
    }

    // Check if it's a Firebase Storage URL that needs special handling
    const isFirebaseUrl = src.includes('firebasestorage.googleapis.com');

    // For Firebase URLs, we need to decode the path
    let imageSrc = src;
    if (isFirebaseUrl) {
        try {
            const url = new URL(src);
            const pathname = decodeURIComponent(url.pathname);
            imageSrc = `${url.origin}${pathname}`;
        } catch (e) {
            console.error('Error parsing Firebase URL:', e);
        }
    }

    return (
        <div className={`relative overflow-hidden ${className}`} style={!fill ? { width, height } : {}}>
            <Image
                src={imageSrc}
                alt={alt}
                fill={fill}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoadingComplete={() => setIsLoading(false)}
                onError={() => setError(true)}
                unoptimized={isFirebaseUrl} // For Firebase URLs, bypass optimization
            />
            {isLoading && (
                <div className="absolute inset-0">
                    <GradientPlaceholder aspectRatio="video" label="Loading..." />
                </div>
            )}
        </div>
    );
}