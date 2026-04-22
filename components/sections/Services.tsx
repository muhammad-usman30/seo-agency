'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/ui/ServiceCard';
import { servicesData, servicesHeading } from '@/data/home/servicesData';

export default function Services() {
    return (
        <section className="py-20 bg-cream">
            <div className="container-custom">
                <SectionHeading
                    badge={servicesHeading.badge}
                    title={servicesHeading.title}
                    subtitle={servicesHeading.subtitle}
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}