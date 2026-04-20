// components/ui/ProjectCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import GradientPlaceholder from './GradientPlaceholder';
import { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-2xl">
                <GradientPlaceholder aspectRatio="video" label={project.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-primary-400 text-sm">{project.category}</span>
                    <h3 className="text-white text-xl font-bold mt-1">{project.title}</h3>
                    <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-white mt-2">
                        View Project <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}