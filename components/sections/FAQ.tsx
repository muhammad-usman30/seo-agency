// components/sections/FAQ.tsx
'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import FAQAccordion from '@/components/ui/FAQAccordion';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';
import Image from 'next/image';

const faqItems = [
    { question: 'Why Should I Choose Digiara?', answer: 'Choosing the best SEO Agency means research, research and more research. Checking through reviews, team credentials, and getting proposals and audits.' },
    { question: 'Why Is SEO Link Building Important?', answer: 'SEO Link Building is essential for businesses looking to improve their online visibility and rankings. It helps to increase traffic to your website, which can lead to higher conversion rates and better ROI.' },
    { question: 'How Does Off Site SEO Work?', answer: 'Off-Site SEO involves optimizing your website\'s presence on other websites or directories that are not directly related to your main site. This can help to improve your search engine rankings and drive organic traffic.' },
];

export default function FAQ() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <SectionHeading
                            title="Frequently Asked Questions"
                            subtitle="Everything you need to know about our services"
                            centered={false}
                        />
                        <FAQAccordion items={faqItems} />
                    </div>
                    <div>
                          <Image
                            src={'https://images.pexels.com/photos/221164/pexels-photo-221164.jpeg?w=800'}
                            height={400}
                            width={800}
                            alt='faqs'
                            className='rounded-xl'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}