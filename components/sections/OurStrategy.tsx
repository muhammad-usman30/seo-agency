'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { ourStrategyData, strategyImages, strategyHeading } from '@/data/home/outStrategyData';

export default function OurStrategy() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-cream">
            <div className="container-custom">
                <SectionHeading
                    badge={strategyHeading.badge}
                    title={strategyHeading.title}
                    subtitle={strategyHeading.subtitle}
                />

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side - Stats and Progress */}
                    <div className="space-y-8">
                        {ourStrategyData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-end">
                                    <h3 className="text-2xl font-bold text-navy-800">
                                        {item.title}
                                    </h3>
                                    <span className="text-3xl font-bold gradient-text">
                                        {item.percentage}%
                                    </span>
                                </div>

                                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.percentage}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: index * 0.2 }}
                                        className={`absolute h-full bg-gradient-to-r ${item.gradient} rounded-full`}
                                    />
                                </div>

                                <p className="text-navy-500">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Side - Overlapping Images Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] flex items-center justify-center"
                    >
                        {/* Background blur */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-80 h-80 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full blur-3xl opacity-40 animate-pulse" />
                        </div>

                        {strategyImages.map((img, index) => {
                            const isTop = img.position === 'top-left';
                            return (
                                <motion.div
                                    key={img.id}
                                    initial={{
                                        opacity: 0,
                                        y: isTop ? -40 : 40,
                                        rotate: img.rotate,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        rotate: img.rotate,
                                    }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.3 + index * 0.2,
                                    }}
                                    className={`absolute ${isTop ? 'top-0 left-0' : 'bottom-0 right-0'
                                        } z-20 w-56 md:w-64`}
                                    style={{ transform: `rotate(${img.rotate}deg)` }}
                                >
                                    <div className="relative group">
                                        <Image
                                            width={350}
                                            height={350}
                                            src={img.src}
                                            alt={img.alt}
                                            className="rounded-xl"
                                        />

                                        {/* Badge */}
                                        <div
                                            className={`absolute ${isTop ? '-bottom-3 -right-3' : '-top-3 -left-3'
                                                } bg-white rounded-full p-2 shadow-lg`}
                                        >
                                            <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-xs">
                                                    {img.label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}