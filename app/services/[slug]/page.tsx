// app/services/[slug]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import HeroBanner from '@/components/ui/HeroBanner';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';
import CTAButton from '@/components/ui/CTAButton';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Footer from '@/components/layout/Footer';
import { CheckCircle, HelpCircle, TrendingUp, Target, BarChart, Globe } from 'lucide-react';

const serviceData: Record<string, any> = {
    'seo-marketing': {
        title: 'SEO Marketing',
        description: 'Boost your search engine rankings with our proven SEO strategies.',
        longDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
        benefits: [
            'Amazin\' communication',
            'Best trending designing',
            'Best trending designing',
            'Mitigate Business Policy'
        ],
        features: [
            'Keyword Research & Analysis',
            'On-Page SEO Optimization',
            'Technical SEO Audit',
            'Link Building Strategy',
            'Content Optimization',
            'Performance Tracking'
        ]
    },
    'digital-marketing': {
        title: 'Digital Marketing',
        description: 'Comprehensive digital marketing solutions for your business.',
        longDescription: 'Digital marketing encompasses a broad spectrum of strategies aimed at reaching customers online. Our team helps you navigate this complex landscape.',
        benefits: ['Increased brand awareness', 'Higher conversion rates', 'Better ROI', 'Targeted audience reach'],
        features: ['PPC Campaigns', 'Social Media Ads', 'Email Marketing', 'Display Advertising']
    },
    'social-marketing': {
        title: 'Social Marketing',
        description: 'Engage your audience on social media platforms effectively.',
        longDescription: 'Social media marketing helps you connect with your audience, build your brand, and increase sales.',
        benefits: ['Brand loyalty', 'Customer engagement', 'Viral reach', 'Community building'],
        features: ['Content Creation', 'Community Management', 'Social Listening', 'Analytics Reporting']
    },
    'content-marketing': {
        title: 'Content Marketing',
        description: 'Create compelling content that drives conversions.',
        longDescription: 'Content marketing focuses on creating valuable, relevant content to attract and retain a clearly defined audience.',
        benefits: ['Lead generation', 'Brand authority', 'Customer education', 'SEO improvement'],
        features: ['Blog Writing', 'Video Production', 'Infographics', 'Case Studies']
    },
    'market-research': {
        title: 'Market Research',
        description: 'Data-driven insights to guide your marketing strategy.',
        longDescription: 'Market research helps you understand your target audience, competitors, and market trends.',
        benefits: ['Informed decisions', 'Risk reduction', 'Opportunity identification', 'Competitive advantage'],
        features: ['Competitor Analysis', 'Customer Surveys', 'Industry Trends', 'Data Analytics']
    },
    'keyword-research': {
        title: 'Keyword Research',
        description: 'Find the right keywords to target for maximum ROI.',
        longDescription: 'Keyword research is the foundation of any successful SEO strategy. We help you find high-value keywords that drive traffic and conversions.',
        benefits: ['Higher rankings', 'Targeted traffic', 'Better conversion rates', 'Lower CPC'],
        features: ['Long-tail keywords', 'Competitor keywords', 'Search volume analysis', 'Difficulty scoring']
    }
};

const faqItems = [
    { question: 'Why Should I Choose Digiara?', answer: 'Choosing the best SEO Agency means research, research and more research. Checking through reviews, team credentials, and getting proposals and audits.' },
    { question: 'Why Is SEO Link Building Important?', answer: 'SEO Link Building is essential for businesses looking to improve their online visibility and rankings. It helps to increase traffic to your website, which can lead to higher conversion rates and better ROI.' },
    { question: 'How Does Off Site SEO Work?', answer: 'Off-Site SEO involves optimizing your website\'s presence on other websites or directories that are not directly related to your main site. This can help to improve your search engine rankings and drive organic traffic to your site.' },
];

export default function SingleServicePage() {
    const { slug } = useParams();
    const service = serviceData[slug as string] || serviceData['seo-marketing'];

    return (
        <>
            <HeroBanner
                title={service.title}
                subtitle={service.description}
                breadcrumbs={['Home', 'Services', service.title]}
            />

            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-cream rounded-2xl p-6 mb-6">
                                <h3 className="text-xl font-bold mb-4">What Service We Provide</h3>
                                <ul className="space-y-3">
                                    {Object.keys(serviceData).map((key) => (
                                        <li key={key}>
                                            <a href={`/services/${key}`} className={`block px-4 py-2 rounded-lg transition ${slug === key ? 'gradient-bg text-white' : 'hover:bg-white'}`}>
                                                {serviceData[key].title}
                                            </a>
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
                            <GradientPlaceholder aspectRatio="video" label={service.title} className="mb-8" />

                            <h2 className="text-3xl font-bold mb-4">{service.title} Analysis Service</h2>
                            <p className="text-navy-600 mb-6">{service.longDescription}</p>

                            <h3 className="text-2xl font-bold mb-4">Growth Your Website In Right</h3>
                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                {service.benefits.map((benefit: string, index: number) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary-500" />
                                        <span className="text-navy-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-cream rounded-2xl p-6 mb-8">
                                <p className="text-navy-600 italic">
                                    Li Europan lingues es membres del sam famille. Lor separat existentie es un myth.
                                    Por scientie, sam vocabular. Europan lingues es membres del sam famille.
                                    Lor separat existentie es un myth. Por scienti, sam vocabular.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                {service.features.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                        <span className="text-navy-700">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <h3 className="text-2xl font-bold mb-4">Knowledge Base</h3>
                            <div className="mb-8">
                                <h4 className="text-xl font-semibold mb-2">Everything you need to know about services and solutions</h4>
                                <p className="text-navy-600 mb-4">
                                    In the initial phases, architects and designers play a crucial role in conceptualizing and designing projects.
                                </p>
                            </div>

                            <FAQAccordion items={faqItems} />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}