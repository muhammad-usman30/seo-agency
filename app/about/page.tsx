import HeroBanner from '@/components/ui/HeroBanner';
import AboutStory from '@/components/sections/about/AboutStory';
import TrustedBy from '@/components/sections/about/TrustedBy';
import WorkingProcess from '@/components/sections/WorkingProcess';
import WhyUs from '@/components/sections/about/WhyUs';
import Team from '@/components/sections/about/Team';
import Metrics from '@/components/sections/about/Metrics';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'About Us - JAVUSSEO | Premium SEO Agency',
    description: 'Learn about our 15+ years of experience, proven results, and dedicated team of SEO experts committed to your success.',
};

export default function AboutPage() {
    return (
        <>
            <HeroBanner
                title="About Us"
                subtitle="15+ Years Of Experience in Driving Digital Success"
                breadcrumbs={['Home', 'About Us']}
                backgroundURL='https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=1600'
                overlayOpacity={70}
            />
            <AboutStory />
            <TrustedBy />
            <WorkingProcess />
            <WhyUs />
            <Team />
            <Metrics />
            <Testimonials />
            <FAQ />
            <Footer />
        </>
    );
}
