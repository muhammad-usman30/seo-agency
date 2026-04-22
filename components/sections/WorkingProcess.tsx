'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import ProcessCard from '@/components/ui/ProcessCard';
import { workingProcesses, workingProcessHeading } from '@/data/home/workingProcessData';

export default function WorkingProcess() {
    return (
        <section className="py-20 bg-cream">
            <div className="container-custom">
                <SectionHeading {...workingProcessHeading} />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {workingProcesses.map((process, index) => (
                        <ProcessCard key={index} {...process} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}