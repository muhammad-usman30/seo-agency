// components/sections/about/TrustedBy.tsx
'use client';

import { motion } from 'framer-motion';

const logos = ['Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum'];

export default function TrustedBy() {
    return (
        <section className="py-12 bg-cream">
            <div className="container-custom">
                <p className="text-center text-navy-500 mb-8">Trusted by 500+ Companies Around The World</p>
                <div className="flex flex-wrap justify-center items-center gap-12">
                    {logos.map((logo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-2xl font-bold text-navy-300"
                        >
                            {logo}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}