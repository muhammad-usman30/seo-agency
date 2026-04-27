'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import SectionHeading from '@/components/ui/SectionHeading';
import PricingCard from '@/components/ui/PricingCard';
import { defaultPricingPlans } from '@/data/home/defaultPricingData';
import DefaultPricingCard from '../ui/DefaultPricingCard';
import PricingCardSkeleton from '../ui/PricingCardSkeleton';

interface PricingPlan {
    id: string;
    name: string;
    priceMonthly: number;
    description: string;
    features: string[];
    isFeatured: boolean;
    ctaText: string;
    order: number;
    isPublished: boolean;
}

export default function Pricing() {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoading(true);
                setError(null);

                // First, try to get all plans (temporarily)
                const q = query(collection(db, 'pricingPlans'));
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    console.log('No pricing plans found in Firestore');
                    setError('No pricing plans found. Please add some in admin panel.');
                    setPlans([]);
                } else {
                    const plansData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    } as PricingPlan));

                    // Filter published plans
                    const publishedPlans = plansData.filter(plan => plan.isPublished === true);
                    console.log('Fetched pricing plans:', publishedPlans);
                    setPlans(publishedPlans);

                    if (publishedPlans.length === 0) {
                        setError('No published pricing plans found. Please publish some plans in admin panel.');
                    }
                }
            } catch (error: any) {
                console.error('Error fetching pricing plans:', error);
                setError(error.message || 'Failed to load pricing plans');
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <SectionHeading
                        badge="Pricing Plans"
                        title="Choose Your Plan"
                        subtitle="As a process transformation company, we rethinks and rebuilds processes for the digital age."
                    />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <PricingCardSkeleton key={i} />
                            ))}
                        </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <SectionHeading
                    badge="Pricing Plans"
                    title="Choose Your Plan"
                    subtitle="As a process transformation company, we rethinks and rebuilds processes for the digital age."
                />

                {error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {defaultPricingPlans.map((plan, index) => (
                            <div
                                key={plan.id}
                                className="animate-fade-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <DefaultPricingCard
                                    plan={plan}
                                    isStandard={plan.id === 'standard'}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {!error && plans.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <PricingCard key={plan.id} plan={plan} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
// 0322 2481191