// components/sections/CTASection.tsx
'use client';

import { motion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';

export default function CTASection() {
    return (
        <section className="py-20 gradient-bg">
            <div className="container-custom text-center">
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
                    <CTAButton href="/contact" variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-cream">
                        Get Started Today
                    </CTAButton>
                </motion.div>
            </div>
        </section>
    );
}