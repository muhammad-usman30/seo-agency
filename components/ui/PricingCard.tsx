// components/ui/PricingCard.tsx
'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PricingPlan } from '@/types';
import CTAButton from './CTAButton';

interface PricingCardProps {
    plan: PricingPlan;
    index: number;
}

export default function PricingCard({ plan, index }: PricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl ${plan.isFeatured ? 'ring-2 ring-primary-500 scale-105' : ''
                }`}
        >
            {plan.isFeatured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 gradient-bg text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Popular
                </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-navy-500 mb-4">{plan.description}</p>
            <div className="mb-6">
                <span className="text-4xl font-bold">${plan.priceMonthly}</span>
                <span className="text-navy-500">/mo</span>
            </div>
            <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary-500" />
                        <span className="text-navy-600">{feature}</span>
                    </li>
                ))}
            </ul>
            <CTAButton href="/contact" variant={plan.isFeatured ? 'primary' : 'outline'} className="w-full">
                {plan.ctaText}
            </CTAButton>
        </motion.div>
    );
}