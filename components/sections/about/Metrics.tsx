// components/sections/about/Metrics.tsx
'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Users, Award, Star, Clock } from 'lucide-react';

const metrics = [
    { icon: Users, value: 3, suffix: '+', label: 'Team Members' },
    { icon: Award, value: 4, suffix: '+', label: 'Winning Awards' },
    { icon: Star, value: 5, suffix: '+', label: 'Client Reviews' },
    { icon: Clock, value: 15, suffix: '+', label: 'Years Experience' },
];

export default function Metrics() {
    const [ref, inView] = useInView({ triggerOnce: true });

    return (
        <section className="py-20 gradient-bg" ref={ref}>
            <div className="container-custom">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((metric, index) => (
                        <div key={index} className="text-center text-white">
                            <metric.icon className="w-12 h-12 mx-auto mb-4" />
                            <div className="text-4xl font-bold mb-2">
                                {inView && <CountUp end={metric.value} duration={2.5} />}
                                {metric.suffix}
                            </div>
                            <div className="text-white/80">{metric.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}