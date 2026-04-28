'use client';

import { DefaultPricingPlan } from '@/data/home/defaultPricingData';
import { Check, X } from 'lucide-react';
import Button from './Button';
import CTAButton from './CTAButton';

interface PricingCardProps {
    plan: DefaultPricingPlan;
    isStandard?: boolean;
}

export default function DefaultPricingCard({ plan, isStandard = false }: PricingCardProps) {
    const isPopular = plan.isPopular;

    return (
        <div className={`
      relative rounded-2xl overflow-hidden transition-all duration-300 
      ${isStandard
                ? 'gradient-bg text-white shadow-2xl hover:shadow-3xl hover:-translate-y-2'
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
                <h3 className={`text-xl text-center font-bold mb-2 ${isStandard ? 'text-white' : 'gradient-text'}`}>
                    {plan.name}
                </h3>

                {/* Price */}
                <div className="mt-4 mb-6 text-center">
                    <span className={`text-5xl md:text-6xl font-display font-bold ${isStandard ? 'text-white' : 'text-navy-800'}`}>
                        ${plan.price}
                    </span>
                    <span className={`${isStandard ? 'text-white/70' : 'text-navy-500'}`}>
                        {plan.period}
                    </span>
                </div>

                {/* Description */}
                <p className={`leading-relaxed text-center mb-6 ${isStandard ? 'text-white/80' : 'text-navy-600'}`}>
                    {plan.description}
                </p>

                {/* Divider */}
                <div className={`h-px w-full my-6 ${isStandard ? 'bg-white/20' : 'bg-gray-200'}`}></div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center justify-between gap-3">
                            <span className={`${isStandard ? 'text-white/90' : 'text-navy-700'} ${!feature.included ? 'opacity-60' : ''}`}>
                                {feature.name}
                            </span>
                            <div className={`
                flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                ${feature.included
                                    ? (isStandard ? 'bg-white/20' : 'bg-primary-100')
                                    : (isStandard ? 'bg-white/10' : 'bg-gray-100')
                                }
              `}>
                                {feature.included ? (
                                    <Check className={`
                    w-5 h-5 
                    ${isStandard ? 'text-white' : 'text-primary-600'}
                  `} />
                                ) : (
                                    <X className={`
                    w-5 h-5 
                    ${isStandard ? 'text-white/50' : 'text-gray-400'}
                  `} />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Button */}
                <CTAButton
                    href='/contact'
                    variant={isStandard ? 'secondary' : 'primary'}
                    className={`w-full bg-white text-center ${isStandard ? '!text-orange-600' : ''}`}
                >
                    {plan.buttonText}
                </CTAButton>
            </div>
        </div>
    );
}