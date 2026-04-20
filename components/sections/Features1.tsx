// components/sections/Features.tsx (Alternative with two images)
'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';
import { BarChart3, Database, TrendingUp, Zap } from 'lucide-react';

const features = [
    {
        icon: BarChart3,
        title: 'SEO Analytics',
        percentage: 95,
        color: 'from-blue-500 to-cyan-500',
        description: 'Comprehensive analytics to track your SEO performance'
    },
    {
        icon: Database,
        title: 'Data Integration',
        percentage: 88,
        color: 'from-purple-500 to-pink-500',
        description: 'Connect all your data sources in one place'
    },
    {
        icon: TrendingUp,
        title: 'Analytics Success',
        percentage: 92,
        color: 'from-green-500 to-emerald-500',
        description: 'Measure and optimize your success metrics'
    },
    {
        icon: Zap,
        title: 'SEO Optimization',
        percentage: 85,
        color: 'from-orange-500 to-red-500',
        description: 'Fast and effective optimization strategies'
    },
];

export default function Features1() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-cream">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-600 text-sm font-semibold mb-4"
                    >
                        Our Strategy
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-navy-800 mb-4"
                    >
                        SEO Analytics & Strategy Skill
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-navy-600 max-w-3xl mx-auto"
                    >
                        As a process transformation company, we rethink and rebuilds processes for the digital age.
                    </motion.p>
                </div>

                {/* Top Image Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <GradientPlaceholder
                        aspectRatio="video"
                        label="SEO Strategy Overview"
                        animated
                        className="shadow-xl"
                    />
                </motion.div>

                {/* Progress Bars Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-800">{feature.title}</h3>
                                </div>
                                <span className="text-3xl font-bold text-navy-800">{feature.percentage}%</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${feature.percentage}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                                    className={`absolute h-full bg-gradient-to-r ${feature.color} rounded-full`}
                                />
                            </div>

                            <p className="text-navy-500 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    );
}