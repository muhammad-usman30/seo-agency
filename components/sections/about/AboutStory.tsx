// components/sections/about/AboutStory.tsx
'use client';

import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Clock } from 'lucide-react';
import Image from 'next/image';

const stats = [
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '98%', label: 'Success Rate' },
    { icon: Clock, value: '24/7', label: 'Support' },
];

export default function AboutStory() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src={'https://images.pexels.com/photos/6120403/pexels-photo-6120403.jpeg?w=800'}
                            height={400}
                            width={800}
                            alt='journey to excellence'
                            className='rounded-xl'
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Our Journey to Excellence</h2>
                        <p className="text-navy-600 mb-6">
                            As a process transformation company, we rethink and rebuild processes for the digital age.
                            With over 15 years of experience, we've helped hundreds of businesses achieve their digital goals.
                        </p>
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <stat.icon className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-navy-800">{stat.value}</div>
                                    <div className="text-sm text-navy-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}