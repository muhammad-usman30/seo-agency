'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import CTAButton from '@/components/ui/CTAButton';
import { aboutContent } from '@/data/home/aboutData';

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
                        <Image
                            src={aboutContent.image.src}
                            alt={aboutContent.image.alt}
                            width={500}
                            height={500}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <SectionHeading
                            badge={aboutContent.badge}
                            title={aboutContent.title}
                            subtitle={aboutContent.subtitle}
                            centered={false}
                        />
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {aboutContent.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-primary-500" />
                                    <span className="text-navy-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <CTAButton href={aboutContent.button.href} variant="primary">
                            {aboutContent.button.label}
                        </CTAButton>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}