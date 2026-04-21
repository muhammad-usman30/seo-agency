'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';
import Image from 'next/image';

export default function Features1() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-cream">
            <div className="container-custom">
                <div className="text-center mb-14">
                    <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-600 text-sm font-semibold mb-4">
                        Our Strategy
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-800 mb-4">
                        Seo analytics & strategy skill
                    </h2>
                    <p className="text-lg text-navy-600 max-w-2xl mx-auto">
                        As a process transformation company, we rethink and rebuilds processes for the digital age.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side - Stats and Progress */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="flex justify-between items-end">
                                <h3 className="text-2xl font-bold text-navy-800">SEO Optimization</h3>
                                <span className="text-3xl font-bold gradient-text">95%</span>
                            </div>
                            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '95%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                    className="absolute h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                                />
                            </div>
                            <p className="text-navy-500">
                                As a process transformation company, we rethink and rebuilds processes for the digital
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="space-y-4"
                        >
                            <div className="flex justify-between items-end">
                                <h3 className="text-2xl font-bold text-navy-800">Data Integration</h3>
                                <span className="text-3xl font-bold gradient-text">88%</span>
                            </div>
                            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '88%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="absolute h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                                />
                            </div>
                            <p className="text-navy-500">
                                As a process transformation company, we rethink and rebuilds processes for the digital
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                        >
                            <div className="flex justify-between items-end">
                                <h3 className="text-2xl font-bold text-navy-800">Analytics Success</h3>
                                <span className="text-3xl font-bold gradient-text">92%</span>
                            </div>
                            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '92%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="absolute h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                />
                            </div>
                            <p className="text-navy-500">
                                As a process transformation company, we rethink and rebuilds processes for the digital
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                        >
                            <div className="flex justify-between items-end">
                                <h3 className="text-2xl font-bold text-navy-800">Fast Implementation</h3>
                                <span className="text-3xl font-bold gradient-text">99%</span>
                            </div>
                            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '99%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                />
                            </div>
                            <p className="text-navy-500">
                                As a process transformation company, we rethink and rebuilds processes for the digital
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Side - Overlapping Images Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] flex items-center justify-center"
                    >
                        {/* Background blur circle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-80 h-80 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full blur-3xl opacity-40 animate-pulse" />
                        </div>

                        {/* Image 1 - Top positioned */}
                        <motion.div
                            initial={{ opacity: 0, y: -40, rotate: -5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="absolute top-0 left-0 z-20 w-52 md:w-60"
                            style={{ transform: 'rotate(-3deg)' }}
                        >
                            <div className="relative group">
                                <Image width={350} height={350} src="/images/home/strategy-img-1.jpg" alt='strategy-img-1' className='rounded-xl' />
                                <div className="absolute -bottom-3 -right-3 bg-white rounded-full p-2 shadow-lg">
                                    <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-xs">SEO</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Image 2 - Bottom positioned */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, rotate: 5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 5 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="absolute bottom-0 right-0 z-20 w-52 md:w-60"
                            style={{ transform: 'rotate(3deg)' }}
                        >
                            <div className="relative group">
                                <Image width={350} height={350} src="/images/home/strategy-img-2.jpg" alt='strategy-img-2' className='rounded-xl' />
                                <div className="absolute -top-3 -left-3 bg-white rounded-full p-2 shadow-lg">
                                    <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-xs">DATA</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        {/* Decorative elements */}
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-500 rounded-full animate-ping" />
                        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-primary-400 rounded-full animate-pulse" />
                        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary-600 rounded-full animate-bounce" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}