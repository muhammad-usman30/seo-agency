'use client';

import { motion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';
import { Users, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { heroContent } from '@/data/home/heroData';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-blush py-20 lg:py-32">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h5 className="gradient-text font-semibold mb-3">
                            {heroContent.badge}
                        </h5>
                        <h1 className="text-4xl lg:text-6xl font-bold leading-loose mb-6">
                            {heroContent.title.line1} <br />
                            <span className="pt-3 block">
                                {heroContent.title.line2}
                            </span>{' '}
                            <span className="gradient-text">
                                {heroContent.title.highlight}
                            </span>
                        </h1>
                        <p className="text-lg text-navy-600 mb-8">
                            {heroContent.description}
                        </p>
                        <div className="flex flex-wrap gap-4 mb-8">
                            {heroContent.buttons.map((btn, i) => (
                                <CTAButton
                                    key={i}
                                    href={btn.href}
                                    variant={btn.variant}
                                    size="lg"
                                >
                                    {btn.label}
                                </CTAButton>
                            ))}
                        </div>
                        {/* Stats */}
                        <div className="flex gap-8 pt-6 border-t border-gray-200">
                            {heroContent.stats.map((stat, i) => {
                                const Icon = stat.icon === 'users' ? Users : TrendingUp;
                                return (
                                    <div key={i}>
                                        <div className="flex items-center gap-2 text-3xl font-bold text-navy-800">
                                            <Icon className="w-6 h-6 text-primary-500" />
                                            {stat.value}
                                        </div>
                                        <p className="text-navy-500">
                                            {stat.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Image
                            src="/images/home/hero-image.png"
                            alt="Hero Visual"
                            width={500}
                            height={500}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}