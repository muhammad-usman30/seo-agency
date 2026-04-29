'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/ui/ServiceCard';
import { servicesData, servicesHeading } from '@/data/home/servicesData';
import CTAButton from '../ui/CTAButton';

export default function Services() {
    const featuredServices = servicesData.slice(0, 6);

    return (
        <section className="relative py-20"
        style={{
            backgroundImage: `url(https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?w=1600)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="relative z-10 container-custom">
                <SectionHeading
                    badge={servicesHeading.badge}
                    title={servicesHeading.title}
                    subtitle={servicesHeading.subtitle}
                    titleClass='text-navy-100'
                    subTitleClass='text-navy-200'
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredServices.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
                
                {/* View All Services Button */}
                <div className="text-center mt-12">
                    <CTAButton href='/services' variant="outline" size="lg">
                        View All Services
                    </CTAButton>
                </div>
            </div>
        </section>
    );
}