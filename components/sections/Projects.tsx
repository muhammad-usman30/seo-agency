'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import SectionHeading from '@/components/ui/SectionHeading';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';
import LoadingState from '@/components/ui/LoadingState';
import { projectsHeading } from '@/data/home/projectsData';
import { ProjectCardSkeleton } from '../ui/ProjectCardSkeleton';

interface Project {
    id: string;
    imageUrl: string;
    title: string;
    category: string;
    excerpt: string;
    isPublished: boolean;
    order: number;
}

// const categories = ['All', 'Creative', 'Design', 'Digital', 'Photography', 'Service'];

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);

                const querySnapshot = await getDocs(collection(db, 'projects'));

                if (querySnapshot.empty) {
                    console.log('No projects found in Firestore');
                    setError('No projects found. Please add some in admin panel.');
                    setProjects([]);
                } else {
                    const projectsData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    } as Project));

                    const publishedProjects = projectsData.filter(project => project.isPublished === true);
                    console.log('Fetched projects:', publishedProjects);
                    setProjects(publishedProjects);

                    if (publishedProjects.length === 0) {
                        setError('No published projects found. Please publish some projects in admin panel.');
                    }
                }
            } catch (error: any) {
                console.error('Error fetching projects:', error);
                setError(error.message || 'Failed to load projects');
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    if (loading) {
        return (
            <section className="py-20 bg-cream">
                <div className="container-custom">
                    <SectionHeading {...projectsHeading} />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <ProjectCardSkeleton key={item} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-cream">
            <div className="container-custom">
                <SectionHeading {...projectsHeading} />

                {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
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
                </div> */}

                {error && (
                    <div className="text-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <p className="text-red-600">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-2 text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                Try Again
                            </button>
                        </div>
                        {/* Demo projects for testing */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                    <GradientPlaceholder aspectRatio="video" label={`Project ${item}`} />
                                    <div className="p-6">
                                        <span className="text-primary-600 text-sm">Digital Marketing</span>
                                        <h3 className="text-xl font-bold mt-2">Sample Project {item}</h3>
                                        <p className="text-navy-600 mt-2">This is a sample project description.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!error && filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-navy-500">No projects found in category: {activeCategory}</p>
                    </div>
                )}

                {!error && filteredProjects.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                <GradientPlaceholder aspectRatio="video" label={project.title} />
                                {/* <Image src={project.imageUrl} alt='project image' loading='lazy' /> */}
                                <div className="p-6">
                                    <span className="text-primary-600 text-sm">{project.category}</span>
                                    <h3 className="text-xl font-bold mt-2">{project.title}</h3>
                                    <p className="text-navy-600 mt-2">{project.excerpt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}