'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const logos = [
    {
        name: 'logo',
        imageUrl: '',
        width: 120,
        height: 45
    },
    {
        name: 'logo',
        imageUrl: '',
        width: 120,
        height: 45
    },
    {
        name: 'logo',
        imageUrl: '',
        width: 120,
        height: 45
    },
    {
        name: 'logo',
        imageUrl: '',
        width: 110,
        height: 45
    },
    {
        name: 'logo',
        imageUrl: '',
        width: 110,
        height: 45
    },
    {
        name: 'logo',
        imageUrl: '',
        width: 110,
        height: 45
    },
    {
        name: 'logo',
        imageUrl: '',
        width: 110,
        height: 45
    },
    {
        name: 'logo',
        imageUrl: '',
        width: 100,
        height: 45
    }
];

export default function TrustedBy() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(4);

    // Update slidesToShow based on screen size
    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth < 640) {
                setSlidesToShow(2); // Mobile: 2 logos
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(3); // Tablet: 3 logos
            } else {
                setSlidesToShow(4); // Desktop: 4 logos
            }
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);

    const totalSlides = Math.ceil(logos.length / slidesToShow);
    const maxIndex = totalSlides - 1;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Get current visible logos
    const startIndex = currentIndex * slidesToShow;
    const visibleLogos = logos.slice(startIndex, startIndex + slidesToShow);

    // Auto slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, [currentIndex, maxIndex]);

    return (
        <section className="py-16 bg-cream">
            <div className="container-custom">
                <p className="text-center text-navy-600 mb-12 text-lg font-semibold">
                    Trusted by <span className="text-primary-600 font-bold">15+ Companies</span> Worldwide
                </p>

                <div className="relative">
                    {/* Previous Button */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-all duration-300"
                        aria-label="Previous logos"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Logos Carousel */}
                    <div className="overflow-hidden mx-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center"
                            >
                                {visibleLogos.map((logo, idx) => (
                                    <motion.div
                                        key={logo.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                                    >
                                        <Image
                                            src={logo.imageUrl}
                                            alt={`${logo.name} logo`}
                                            width={logo.width}
                                            height={logo.height}
                                            className="object-contain opacity-60 hover:opacity-100 transition-opacity"
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-all duration-300"
                        aria-label="Next logos"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`transition-all duration-300 rounded-full ${
                                currentIndex === idx
                                    ? 'w-8 h-2 bg-primary-500'
                                    : 'w-2 h-2 bg-gray-300 hover:bg-primary-300'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}