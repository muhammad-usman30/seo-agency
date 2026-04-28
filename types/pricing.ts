export interface PricingPlan {
    id: string;
    name: string;
    priceMonthly: number;
    description: string;
    features: (string | { name: string; included: boolean })[];
    isFeatured: boolean;
    ctaText: string;
    order: number;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type PricingPlanUI = Omit<
    PricingPlan,
    'createdAt' | 'updatedAt'
>;