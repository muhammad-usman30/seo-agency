// components/sections/Features.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { BarChart3, Database, TrendingUp as TrendingUpIcon, Zap } from 'lucide-react';

const features = [
    { icon: BarChart3, title: 'SEO Analytics', percentage: 95, color: 'from-blue-500 to-cyan-500' },
    { icon: Database, title: 'Data Integration', percentage: 88, color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUpIcon, title: 'Analytics Success', percentage: 92, color: 'from-green-500 to-emerald-500' },
    { icon: Zap, title: 'Fast Implementation', percentage: 85, color: 'from-orange-500 to-red-500' },
];

export default function Features() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <SectionHeading
                    title="Our Strategy"
                    subtitle="As a process transformation company, we rethinks and rebuilds processes for the digital age."
                />
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-cream rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <feature.icon className="w-10 h-10 text-primary-500" />
                                <h3 className="text-xl font-bold">{feature.title}</h3>
                            </div>
                            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${feature.percentage}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className={`absolute h-full bg-gradient-to-r ${feature.color} rounded-full`}
                                />
                            </div>
                            <p className="text-right mt-2 font-semibold text-navy-700">{feature.percentage}%</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}