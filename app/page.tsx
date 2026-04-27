// app/page.tsx
import Hero from '@/components/sections/Hero';
import AboutPreview from '@/components/sections/AboutPreview';
import Services from '@/components/sections/Services';
import WorkingProcess from '@/components/sections/WorkingProcess';
import Pricing from '@/components/sections/Pricing';
import Projects from '@/components/sections/Projects';
import Testimonials from '@/components/sections/Testimonials';
import Blog from '@/components/sections/Blog';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';
import OurStrategy from '@/components/sections/OurStrategy';

export const metadata = {
  title: 'JAVUSSEO - Premium SEO Agency | Boost Your Rankings & Traffic',
  description: 'Strategy-driven SEO agency helping businesses achieve higher rankings and increased organic traffic with proven tactics and transparent reporting.',
  openGraph: {
    title: 'JAVUSSEO - Premium SEO Agency',
    description: 'Boost your website rankings with our powerful SEO strategies',
    url: 'https://seo-agency.com',
    siteName: 'JAVUSSEO',
    images: [
      {
        url: 'https://seo-agency.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Services />
      <OurStrategy />
      <WorkingProcess />
      <Projects />
      <Pricing />
      <Testimonials />
      <Blog />
      <CTASection />
      <Footer />

    </>
  );
}