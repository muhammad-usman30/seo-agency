export interface PricingFeature {
    name: string;
    included: boolean;
  }
  
  export interface DefaultPricingPlan {
    id: string;
    name: string;
    price: number;
    period: string;
    description: string;
    features: PricingFeature[]; 
    isPopular?: boolean;
    buttonText: string;
  }
  
  export const defaultPricingPlans: DefaultPricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 199.99,
      period: '/mo',
      description: 'Ideal for small businesses or startups looking to establish their online presence.',
      features: [
        { name: 'Support Your Business', included: true },
        { name: 'Enter Unlimited Bills', included: true },
        { name: 'Detailed Risk Profiling', included: true },
        { name: 'Bank Transactions', included: true },
        { name: 'Revoke Document Access', included: false }, 
        { name: 'Financial Strategy', included: false } 
      ],
      buttonText: 'Get Started'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 299.99,
      period: '/mo',
      description: 'Suitable for growing businesses aiming to expand their reach and visibility.',
      features: [
        { name: 'Support Your Business', included: true },
        { name: 'Enter Unlimited Bills', included: true },
        { name: 'Detailed Risk Profiling', included: true },
        { name: 'Revoke Document Access', included: true },
        { name: 'Bank Transactions', included: true },
        { name: 'Financial Strategy', included: false } 
      ],
      isPopular: true,
      buttonText: 'Get Started'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 499.99,
      period: '/mo',
      description: 'Designed for established businesses looking to dominate their market online.',
      features: [
        { name: 'Support Your Business', included: true },
        { name: 'Enter Unlimited Bills', included: true },
        { name: 'Detailed Risk Profiling', included: true },
        { name: 'Revoke Document Access', included: true },
        { name: 'Bank Transactions', included: true },
        { name: 'Financial Strategy', included: true } 
      ],
      buttonText: 'Get Started'
    }
  ];