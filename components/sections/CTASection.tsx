// components/sections/CTASection.tsx
'use client';

import { motion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';

export default function CTASection() {
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=1600")',
                }}
            />

            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 z-10 bg-black/80" />

            <div className="container-custom text-center relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Grow Your Business?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join 500+ companies that trust us for their SEO success
                    </p>
                    <CTAButton href="/contact" variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-cream shadow-lg hover:shadow-xl transition-all">
                        Get Started Today
                    </CTAButton>
                </motion.div>
            </div>
        </section>
    );
}