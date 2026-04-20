// components/sections/AboutPreview.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';
import CTAButton from '@/components/ui/CTAButton';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

const features = [
    'Proven Results',
    'Customized Strategies',
    'Expertise And Experience',
    'Dedicated Support',
    'Transparent Reporting',
    'Continuous Improvement'
];

export default function AboutPreview() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* <GradientPlaceholder aspectRatio="square" label="About Us Image" /> */}
                        <Image src="/images/home/about-us-img.png" alt="About Us" width={500} height={500} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary-600 font-semibold mb-2 block">About Us</span>
                        <h2 className="text-4xl font-bold mb-6">Learn how our talented designers combine creativity</h2>
                        <p className="text-navy-600 mb-6">
                            Creating SEO-optimized website content involves several key strategies and best practices
                            to ensure your website ranks well in search engine results and attracts the right audience.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-primary-500" />
                                    <span className="text-navy-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <CTAButton href="/about" variant="primary">Learn More</CTAButton>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}