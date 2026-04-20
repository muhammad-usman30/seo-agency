// components/sections/about/WhyUs.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';
import { CheckCircle } from 'lucide-react';

const reasons = [
    'Create A Strategy - Includes using high-quality keywords to write strategic content that ranks',
    'Building Your Site - We build custom websites from scratch or use pre-made templates',
    'Website Optimization - We optimize your website for speed, security, and user experience',
    'Promoting Your Site - We promote through social media, email marketing, and digital channels',
];

export default function WhyUs() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <SectionHeading
                    title="Why Choose Us?"
                    subtitle="What makes us different from other agencies"
                />
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-4">
                            {reasons.map((reason, index) => (
                                <div key={index} className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                                    <p className="text-navy-700">{reason}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <GradientPlaceholder aspectRatio="square" label="Why Us Visual" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}