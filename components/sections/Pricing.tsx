// components/sections/Pricing.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import SectionHeading from '@/components/ui/SectionHeading';
import PricingCard from '@/components/ui/PricingCard';
import LoadingState from '@/components/ui/LoadingState';
import { PricingPlan } from '@/types';

export default function Pricing() {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const q = query(
                    collection(db, 'pricingPlans'),
                    where('isPublished', '==', true),
                    orderBy('order', 'asc')
                );
                const snapshot = await getDocs(q);
                const plansData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PricingPlan));
                setPlans(plansData);
            } catch (error) {
                console.error('Error fetching pricing plans:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    if (loading) return <LoadingState />;

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <SectionHeading
                    badge="Pricing Plans"
                    title="Choose Your Plan"
                    subtitle="As a process transformation company, we rethinks and rebuilds processes for the digital age."
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <PricingCard key={plan.id} plan={plan} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}