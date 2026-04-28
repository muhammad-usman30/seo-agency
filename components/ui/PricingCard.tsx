'use client';

import { PricingPlanUI } from '@/types';
import { Check, X } from 'lucide-react';
import CTAButton from './CTAButton';

interface PricingCardProps {
    plan: PricingPlanUI;
    index: number;
}

export default function PricingCard({ plan, index }: PricingCardProps) {
    const isPopular = plan.isFeatured;

    return (
        <div className={`
            relative rounded-2xl overflow-hidden transition-all duration-300 
            ${isPopular
                ? 'gradient-bg text-white shadow-2xl hover:shadow-3xl hover:-translate-y-2 scale-105'
                : 'bg-white text-navy-800 border border-gray-200 shadow-xl hover:shadow-2xl hover:-translate-y-2'
            }
        `}>
            {/* Popular Badge */}
            {isPopular && (
                <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 text-xs font-bold px-6 py-3 pt-4 rounded-bl-2xl animate-bounce">
                        POPULAR
                    </div>
                </div>
            )}

            <div className="p-8">
                {/* Plan Name */}
                <h3 className={`text-2xl text-center font-bold mb-2 ${isPopular ? 'text-white' : 'gradient-text'}`}>
                    {plan.name}
                </h3>

                {/* Price */}
                <div className="mt-4 mb-6 text-center">
                    <span className={`text-5xl md:text-6xl font-display font-bold ${isPopular ? 'text-white' : 'text-navy-800'}`}>
                        ${plan.priceMonthly}
                    </span>
                    <span className={`${isPopular ? 'text-white/70' : 'text-navy-500'}`}>
                        /mo
                    </span>
                </div>

                {/* Description */}
                <p className={`leading-relaxed text-center mb-6 ${isPopular ? 'text-white/80' : 'text-navy-600'}`}>
                    {plan.description}
                </p>

                {/* Divider */}
                <div className={`h-px w-full my-6 ${isPopular ? 'bg-white/20' : 'bg-gray-200'}`}></div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => {
                        // Handle both string and object formats
                        const featureName = typeof feature === 'string' ? feature : feature.name;
                        const isIncluded = typeof feature === 'string' ? true : feature.included;
                        
                        return (
                            <li key={idx} className="flex items-center justify-between gap-3">
                                <span className={`${isPopular ? 'text-white/90' : 'text-navy-700'} ${!isIncluded ? 'opacity-60 line-through' : ''}`}>
                                    {featureName}
                                </span>
                                <div className={`
                                    flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                                    ${isIncluded
                                        ? (isPopular ? 'bg-white/20' : 'bg-primary-100')
                                        : (isPopular ? 'bg-white/10' : 'bg-gray-100')
                                    }
                                `}>
                                    {isIncluded ? (
                                        <Check className={`
                                            w-5 h-5 
                                            ${isPopular ? 'text-white' : 'text-primary-600'}
                                        `} />
                                    ) : (
                                        <X className={`
                                            w-5 h-5 
                                            ${isPopular ? 'text-white/50' : 'text-gray-400'}
                                        `} />
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {/* Button */}
                <CTAButton
                    href='/contact'
                    variant={isPopular ? 'secondary' : 'primary'}
                    className={`w-full text-center ${isPopular ? '!bg-white !text-primary-600 hover:!bg-cream' : ''}`}
                >
                    {plan.ctaText || 'Get Started'}
                </CTAButton>
            </div>
        </div>
    );
}