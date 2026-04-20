// components/sections/Services.tsx
'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/ui/ServiceCard';
import { Search, Megaphone, Share2, FileText, TrendingUp, Key } from 'lucide-react';

const services = [
    { icon: Search, title: 'SEO Marketing', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', slug: 'seo-marketing' },
    { icon: Megaphone, title: 'Digital Marketing', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', slug: 'digital-marketing' },
    { icon: Share2, title: 'Social Marketing', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', slug: 'social-marketing' },
    { icon: FileText, title: 'Content Marketing', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', slug: 'content-marketing' },
    { icon: TrendingUp, title: 'Market Research', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', slug: 'market-research' },
    { icon: Key, title: 'Keyword Research', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', slug: 'keyword-research' },
];

export default function Services() {
    return (
        <section className="py-20 bg-cream">
            <div className="container-custom">
                <SectionHeading
                    badge="Our Services"
                    title="What Service We Provide"
                    subtitle="As a process transformation company, we rethink and rebuilds processes for the digital age."
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}