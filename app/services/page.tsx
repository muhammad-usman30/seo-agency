import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/ui/ServiceCard';
import WorkingProcess from '@/components/sections/WorkingProcess';
import Pricing from '@/components/sections/Pricing';
import Footer from '@/components/layout/Footer';
import { servicesData } from '@/data/home/servicesData';
import CTASection from '@/components/sections/CTASection';

export const metadata = {
    title: 'Services - JAVUSSEO | Premium SEO & Digital Marketing Services',
    description: 'Explore our comprehensive range of SEO, digital marketing, social media, and content marketing services designed to boost your online presence.',
};

export default function ServicesPage() {
    return (
        <>
            <HeroBanner
                title="Our Services"
                subtitle="What Service We Provide"
                breadcrumbs={['Home', 'Services']}
                backgroundURL='https://images.pexels.com/photos/942331/pexels-photo-942331.jpeg'
            />

            <section className="py-20 bg-white">
                <div className="container-custom">
                    <SectionHeading
                        title="What Service We Provide"
                        subtitle="As a process transformation company, we rethink and rebuilds processes for the digital age."
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, index) => (
                            <ServiceCard key={index} {...service} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <WorkingProcess />
            <Pricing />
            <CTASection />
            <Footer />
        </>
    );
}