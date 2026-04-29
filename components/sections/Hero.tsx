'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';
import { Users, TrendingUp, ChevronLeft, ChevronRight, Star, Award } from 'lucide-react';
import Image from 'next/image';
import { heroSlides, imageVariants, textVariants } from '@/data/home/heroData';

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-slide functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentSlide(index);
        // Resume auto-play after 10 seconds of inactivity
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setIsAutoPlaying(false);
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setIsAutoPlaying(false);
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const currentData = heroSlides[currentSlide];

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=1600")',
                }}
            />

            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-900/95 via-navy-900/90 to-navy-900/85" />

            {/* Animated gradient overlay for depth */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary-600/20 via-transparent to-primary-500/20" />

            {/* Decorative elements */}
            <div className="absolute top-20 right-10 z-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-10 z-10 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="container-custom relative z-20 py-16 lg:py-38">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content - Slides from bottom to top */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`text-${currentSlide}`}
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="space-y-6"
                        >
                            {/* Badge */}
                            <motion.span
                                className="inline-block px-4 py-2 bg-primary-500/20 backdrop-blur-sm text-primary-400 rounded-full text-sm font-semibold border border-primary-500/30"
                                whileHover={{ scale: 1.05 }}
                            >
                                {currentData.badge}
                            </motion.span>

                            {/* Title */}
                            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                                {currentData.title.line1} <br />
                                <span className="block mt-2">
                                    {currentData.title.line2}
                                </span>{' '}
                                <span className="gradient-text block mt-2">
                                    {currentData.title.highlight}
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                                {currentData.description}
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                {currentData.buttons.map((btn, i) => (
                                    <CTAButton
                                        key={i}
                                        href={btn.href}
                                        variant={btn.variant as 'primary' | 'outline'}
                                        size="md"
                                        className={btn.variant === 'primary' ? 'shadow-lg hover:shadow-xl' : 'border-white/30 text-white hover:bg-white/10'}
                                    >
                                        {btn.label}
                                    </CTAButton>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="flex gap-8 pt-6 border-t border-white/10">
                                {currentData.stats.map((stat, i) => {
                                    const Icon = stat.icon === 'users' ? Users : stat.icon === 'trending' ? TrendingUp : Award;
                                    return (
                                        <div key={i} className="group">
                                            <div className="flex items-center gap-2 text-3xl font-bold text-white group-hover:text-primary-400 transition">
                                                <Icon className="w-7 h-7 text-primary-400" />
                                                {stat.value}
                                            </div>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {stat.label}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Right Image - Slides from right to left */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`image-${currentSlide}`}
                            variants={imageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <div className="relative w-full h-[400px] lg:h-[500px]">
                                    <Image
                                        src={currentData.image}
                                        alt={currentData.imageAlt}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                {/* Image overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
                            </div>

                            {/* Trust badge overlay */}
                            <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                    <span className="text-white font-semibold">4.9/5 Rating</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Trusted by 500+ companies</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Slider Navigation Dots */}
                <div className="flex justify-center gap-3 mt-12">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 rounded-full ${currentSlide === index
                                    ? 'w-12 h-2 bg-primary-500'
                                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-primary-500/80 transition-all duration-300"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-primary-500/80 transition-all duration-300"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
}