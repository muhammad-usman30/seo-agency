// lib/hooks/usePricing.ts
'use client';

import { useState, useEffect } from 'react';
import { pricingService } from '@/lib/services/pricingService';
import { PricingPlan } from '@/types';

export function usePricing(publishedOnly = true) {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = publishedOnly
                    ? await pricingService.getPublishedPlans()
                    : await pricingService.getAllPlans();
                setPlans(data);
            } catch (err) {
                setError('Failed to fetch pricing plans');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, [publishedOnly]);

    return { plans, loading, error, refetch: () => fetchPlans() };
}