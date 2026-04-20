// app/admin/projects/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import ProjectForm from '@/components/admin/ProjectForm';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Project } from '@/types';

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const fetchProjects = async () => {
        setLoading(true);
        const snapshot = await getDocs(collection(db, 'projects'));
        const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setProjects(projectsData.sort((a, b) => a.order - b.order));
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            await deleteDoc(doc(db, 'projects', id));
            toast.success('Project deleted successfully');
            fetchProjects();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Button onClick={() => { setEditingProject(null); setShowForm(true); }} variant="primary" size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
            </div>

            {showForm && (
                <div className="mb-8 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
                    <ProjectForm initialData={editingProject} onSuccess={() => { setShowForm(false); setEditingProject(null); fetchProjects(); }} />
                    <button onClick={() => { setShowForm(false); setEditingProject(null); }} className="mt-4 text-navy-500">Cancel</button>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{project.title}</h3>
                                <p className="text-sm text-navy-500">{project.category} • Order: {project.order}</p>
                                <p className="text-sm">{project.isPublished ? 'Published' : 'Draft'}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => { setEditingProject(project); setShowForm(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(project.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}