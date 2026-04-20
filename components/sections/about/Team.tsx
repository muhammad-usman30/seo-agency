// components/sections/about/Team.tsx
'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import TeamCard from '@/components/ui/TeamCard';

const team = [
    { name: 'Gaurav Sharma', role: 'CEO - Co-Founder', image: '/images/team1.jpg' },
    { name: 'Shefali Gupta', role: 'Marketing Manager', image: '/images/team2.jpg' },
    { name: 'Mark John', role: 'President of Sales', image: '/images/team3.jpg' },
    { name: 'Natsah Glovica', role: 'Sales Manager', image: '/images/team4.jpg' },
];

export default function Team() {
    return (
        <section className="py-20 bg-cream">
            <div className="container-custom">
                <SectionHeading
                    badge="Our Team"
                    title="Meet Our Experts"
                    subtitle="Dedicated professionals committed to your success"
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <TeamCard key={index} {...member} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}