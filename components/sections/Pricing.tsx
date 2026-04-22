// components/sections/Pricing.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import SectionHeading from '@/components/ui/SectionHeading';
import PricingCard from '@/components/ui/PricingCard';
import LoadingState from '@/components/ui/LoadingState';

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
                    <LoadingState />
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
                    <div className="text-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <p className="text-red-600">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-2 text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                Try Again
                            </button>
                        </div>
                        {/* Demo pricing plans for testing */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                                <p className="text-navy-500 mb-4">For small businesses</p>
                                <div className="text-4xl font-bold mb-6">$19<span className="text-lg">/mo</span></div>
                                <ul className="space-y-3 mb-8">
                                    <li>✓ SEO Audit</li>
                                    <li>✓ Keyword Research</li>
                                    <li>✓ Monthly Report</li>
                                </ul>
                                <button className="w-full btn-outline">Get Started</button>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg ring-2 ring-primary-500">
                                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                                <p className="text-navy-500 mb-4">For growing businesses</p>
                                <div className="text-4xl font-bold mb-6">$49<span className="text-lg">/mo</span></div>
                                <ul className="space-y-3 mb-8">
                                    <li>✓ Everything in Basic</li>
                                    <li>✓ Content Optimization</li>
                                    <li>✓ Link Building</li>
                                    <li>✓ Weekly Reports</li>
                                </ul>
                                <button className="w-full btn-primary">Get Started</button>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                                <p className="text-navy-500 mb-4">For large companies</p>
                                <div className="text-4xl font-bold mb-6">$99<span className="text-lg">/mo</span></div>
                                <ul className="space-y-3 mb-8">
                                    <li>✓ Everything in Pro</li>
                                    <li>✓ Dedicated Account Manager</li>
                                    <li>✓ Custom Strategy</li>
                                    <li>✓ Daily Reports</li>
                                </ul>
                                <button className="w-full btn-outline">Contact Us</button>
                            </div>
                        </div>
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