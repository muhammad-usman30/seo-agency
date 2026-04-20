// lib/hooks/useProjects.ts
'use client';

import { useState, useEffect } from 'react';
import { projectService } from '@/lib/services/projectService';
import { Project } from '@/types';

export function useProjects(publishedOnly = true) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = publishedOnly
                    ? await projectService.getPublishedProjects()
                    : await projectService.getAllProjects();
                setProjects(data);
            } catch (err) {
                setError('Failed to fetch projects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [publishedOnly]);

    return { projects, loading, error, refetch: () => fetchProjects() };
}