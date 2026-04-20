// components/sections/Projects.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import LoadingState from '@/components/ui/LoadingState';
import { Project } from '@/types';

const categories = ['All', 'Creative', 'Design', 'Digital', 'Photography', 'Service'];

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const q = query(
                    collection(db, 'projects'),
                    where('isPublished', '==', true),
                    orderBy('order', 'asc')
                );
                const snapshot = await getDocs(q);
                const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
                setProjects(projectsData);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    if (loading) return <LoadingState />;

    return (
        <section className="py-20 bg-cream">
            <div className="container-custom">
                <SectionHeading
                    badge="Our Work"
                    title="Featured Projects"
                    subtitle="As a process transformation company, we rethinks and rebuilds processes for the digital age."
                />

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeCategory === cat
                                ? 'gradient-bg text-white'
                                : 'bg-white text-navy-600 hover:bg-primary-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}