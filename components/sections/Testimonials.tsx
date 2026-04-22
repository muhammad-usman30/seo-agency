'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { testimonialHeading, testimonials } from '@/data/home/testimonialsData';

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = () =>
        setCurrent((prev) => (prev + 1) % testimonials.length);

    const prev = () =>
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    useEffect(() => {
        if (paused) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [paused]);

    return (
        <section className="py-20 bg-navy-800 text-white">
            <div className="container-custom">
                <SectionHeading
                    title={testimonialHeading.title}
                    subtitle={testimonialHeading.subtitle}
                    centered
                />
                <div
                    className="relative max-w-4xl mx-auto"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(testimonials[current].rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-primary-500 text-primary-500"
                                    />
                                ))}
                            </div>

                            <p className="text-xl md:text-2xl mb-8 italic">
                                "{testimonials[current].content}"
                            </p>

                            <h4 className="text-xl font-bold">
                                {testimonials[current].name}
                            </h4>
                            <p className="text-navy-300">
                                {testimonials[current].role}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}