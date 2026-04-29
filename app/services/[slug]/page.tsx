'use client';

import { useParams } from 'next/navigation';
import HeroBanner from '@/components/ui/HeroBanner';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';
import CTAButton from '@/components/ui/CTAButton';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Footer from '@/components/layout/Footer';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqItems, serviceData } from '@/data/services/services';
import Image from 'next/image';

export default function SingleServicePage() {
    const { slug } = useParams();
    const service = serviceData[slug as string];
    
    if (!service) {
        return (
            <>
                <HeroBanner
                    title="Service Not Found"
                    subtitle="The service you're looking for doesn't exist"
                    breadcrumbs={['Home', 'Services', '404']}
                />
                <div className="py-20 text-center">
                    <div className="container-custom">
                        <p className="text-navy-600">Sorry, the requested service page could not be found.</p>
                        <Link href="/services" className="inline-block mt-4 btn-primary">
                            View All Services
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <HeroBanner
                title={service.title}
                subtitle={service.description}
                breadcrumbs={['Home', 'Services', service.title]}
                backgroundURL={service.heroBanner}
            />

            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-cream rounded-2xl p-6 mb-6 sticky top-24">
                                <h3 className="text-xl font-bold mb-4">All Services</h3>
                                <ul className="space-y-2">
                                    {Object.entries(serviceData).map(([key, data]) => (
                                        <li key={key}>
                                            <Link 
                                                href={`/services/${key}`} 
                                                className={`block px-4 py-2 rounded-lg transition text-sm ${
                                                    slug === key 
                                                        ? 'gradient-bg text-white' 
                                                        : 'hover:bg-white text-navy-700'
                                                }`}
                                            >
                                                {data.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white text-center">
                                <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                                <p className="text-white/90 mb-4">Get in touch and let us know how we can help as soon as possible.</p>
                                <CTAButton href="/contact" variant="primary" className="bg-white text-primary-600 hover:bg-cream">
                                    Work With Us
                                </CTAButton>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <img src={service.sectionBanner} alt='section banner' className='h-[60vh] min-h-[300px] w-full rounded-xl mb-4 object-cover' />

                            <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                            <p className="text-navy-600 mb-6 leading-relaxed">{service.longDescription}</p>

                            <h3 className="text-2xl font-bold mb-4">Why Choose Our {service.title}?</h3>
                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                {service.benefits.map((benefit: string, index: number) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-navy-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gradient-to-r from-primary-50 to-cream rounded-2xl p-6 mb-8">
                                <p className="text-navy-700 italic">
                                    "As a process transformation company, we rethink and rebuild processes for the digital age. 
                                    Our {service.title.toLowerCase()} service is designed to deliver measurable results and 
                                    sustainable growth for your business."
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold mb-4">What's Included</h3>
                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                {service.features.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                        <span className="text-navy-700">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-navy-50 rounded-2xl p-6 mb-8">
                                <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
                                <p className="text-navy-600 mb-4">
                                    Let's discuss how our {service.title.toLowerCase()} service can help your business grow.
                                </p>
                                <CTAButton href="/contact" variant="primary">
                                    Contact Us Today
                                </CTAButton>
                            </div>

                            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
                            <FAQAccordion items={faqItems} />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}