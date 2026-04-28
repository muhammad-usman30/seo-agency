import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/ui/ServiceCard';
import WorkingProcess from '@/components/sections/WorkingProcess';
import Pricing from '@/components/sections/Pricing';
import Footer from '@/components/layout/Footer';

const services = [
    { icon: 'Search', title: 'SEO Marketing', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur lorem donec.', slug: 'seo-marketing' },
    { icon: 'Megaphone', title: 'Digital Marketing', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur lorem donec.', slug: 'digital-marketing' },
    { icon: 'Share2', title: 'Social Marketing', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur lorem donec.', slug: 'social-marketing' },
    { icon: 'FileText', title: 'Content Marketing', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur lorem donec.', slug: 'content-marketing' },
    { icon: 'TrendingUp', title: 'Market Research', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur lorem donec.', slug: 'market-research' },
    { icon: 'Key', title: 'Keyword Research', description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur lorem donec.', slug: 'keyword-research' },
];

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
            />

            <section className="py-20 bg-white">
                <div className="container-custom">
                    <SectionHeading
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

            <WorkingProcess />
            <Pricing />
            <Footer />
        </>
    );
}