// components/sections/WorkingProcess.tsx
'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import ProcessCard from '@/components/ui/ProcessCard';
import { Search, Settings, Target, Code, BarChart, Share2 } from 'lucide-react';

const processes = [
    { number: '01', icon: Search, title: 'Research', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { number: '02', icon: Settings, title: 'Customize', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { number: '03', icon: Target, title: 'Targeting', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { number: '04', icon: Code, title: 'Building Your Site', description: 'Creating a website is an art form, and we\'re here to help you.' },
    { number: '05', icon: BarChart, title: 'Website Optimization', description: 'Optimizing your website for search engines can make all the difference.' },
    { number: '06', icon: Share2, title: 'Promoting Your Site', description: 'Promoting your website is essential for increasing brand awareness.' },
];

export default function WorkingProcess() {
    return (
        <section className="py-20 bg-cream">
            <div className="container-custom">
                <SectionHeading
                    badge="Working Process"
                    title="How We Work"
                    subtitle="As a process transformation company, we rethinks and rebuilds processes for the digital age."
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {processes.map((process, index) => (
                        <ProcessCard key={index} {...process} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}