'use client';

import { motion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';
import { Users, TrendingUp } from 'lucide-react';
import Image from 'next/image';

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
                        <h5 className="gradient-text font-semibold mb-3">Strategy Driven SEO Agency</h5>
                        <h1 className="text-4xl lg:text-6xl font-bold leading-loose mb-6">
                            Higher ranking & <br />
                            <span className='pt-3 block'>traffic with our</span>{' '}
                            <span className="gradient-text">powerful tactics</span>
                        </h1>
                        <p className="text-lg text-navy-600 mb-8">
                            Creating SEO-optimized website content involves several key strategies
                            and best practices to ensure your website ranks well in search engine
                            results and attracts the right audience.
                        </p>
                        <div className="flex flex-wrap gap-4 mb-8">
                            <CTAButton href="/contact" variant="primary" size="lg">
                                Get Started
                            </CTAButton>
                            <CTAButton href="/services" variant="outline" size="lg">
                                Learn More
                            </CTAButton>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 pt-6 border-t border-gray-200">
                            <div>
                                <div className="flex items-center gap-2 text-3xl font-bold text-navy-800">
                                    <Users className="w-6 h-6 text-primary-500" />
                                    10k+
                                </div>
                                <p className="text-navy-500">World Wide Clients</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-3xl font-bold text-navy-800">
                                    <TrendingUp className="w-6 h-6 text-primary-500" />
                                    200+
                                </div>
                                <p className="text-navy-500">Product Sales</p>
                            </div>
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