'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import SectionHeading from '@/components/ui/SectionHeading';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';
import { projectsHeading } from '@/data/home/projectsData';
import { CardSkeleton } from '../ui/CardSkeleton';

interface Project {
    id: string;
    imageUrl: string;
    title: string;
    category: string;
    excerpt: string;
    isPublished: boolean;
    order: number;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);

                // Remove orderBy to avoid index requirement
                const q = query(
                    collection(db, 'projects'),
                    where('isPublished', '==', true)
                );
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log('No projects found in Firestore');
                    setProjects([]);
                } else {
                    let projectsData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    } as Project));
                    
                    // Sort on client side
                    projectsData = projectsData.sort((a, b) => a.order - b.order);                    
                    setProjects(projectsData);
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

    const handleImageError = (projectId: string) => {
        setImageErrors(prev => ({ ...prev, [projectId]: true }));
    };

    if (loading) {
        return (
            <section className="py-20 bg-cream">
                <div className="container-custom">
                    <SectionHeading {...projectsHeading} />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <CardSkeleton key={item} />
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
                    </div>
                )}

                {!error && projects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-navy-500">No projects found. Check back soon!</p>
                    </div>
                )}

                {!error && projects.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                                {/* Image with fallback */}
                                <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                                    {project.imageUrl && !imageErrors[project.id] ? (
                                        <img 
                                            src={project.imageUrl} 
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={() => handleImageError(project.id)}
                                        />
                                    ) : (
                                        <GradientPlaceholder aspectRatio="video" label={project.title} />
                                    )}
                                </div>
                                <div className="p-6">
                                    <span className="text-primary-600 text-sm font-semibold">{project.category}</span>
                                    <h3 className="text-xl font-bold mt-2 mb-2 line-clamp-2">{project.title}</h3>
                                    <p className="text-navy-600 line-clamp-3">{project.excerpt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}