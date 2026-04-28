'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/config';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import ProjectForm from '@/components/admin/ProjectForm';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Project } from '@/types';
import LoadingState from '@/components/ui/Loading';
import ConfirmationModal from '@/components/modals/ConfirmModal';

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchProjects = async () => {
        setLoading(true);
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setProjects(projectsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDeleteClick = (project: Project) => {
        setProjectToDelete(project);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!projectToDelete) return;
        
        setIsDeleting(true);
        try {
            // Delete image from Firebase Storage if it exists
            if (projectToDelete.imageUrl && projectToDelete.imageUrl.includes('firebasestorage.googleapis.com')) {
                try {
                    const imageRef = ref(storage, projectToDelete.imageUrl);
                    await deleteObject(imageRef);
                } catch (error) {
                    console.log('Image not found or already deleted');
                }
            }
            
            // Delete project document from Firestore
            await deleteDoc(doc(db, 'projects', projectToDelete.id));
            toast.success(`"${projectToDelete.title}" has been deleted successfully`);
            fetchProjects();
            setShowDeleteModal(false);
            setProjectToDelete(null);
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Failed to delete project');
        } finally {
            setIsDeleting(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setProjectToDelete(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Button className='flex items-center' onClick={() => { setEditingProject(null); setShowForm(true); }} variant="primary" size="sm">
                    <Plus className="w-4 h-4 mr-2" /> <span>Add Project</span>
                </Button>
            </div>

            {showForm && (
                <div className="mb-8 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
                    <ProjectForm 
                        initialData={editingProject}
                        onSuccess={() => { setShowForm(false); setEditingProject(null); fetchProjects(); }}
                        onCancel={() => { setShowForm(false); setEditingProject(null); }}
                    />
                </div>
            )}
            
            {loading ? (
                <LoadingState />
            ) : (
                <>
                    {!showForm && (
                        <div className="grid gap-4 overflow-y-auto h-[calc(100vh-270px)]">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        {/* Image Thumbnail */}
                                        {project.imageUrl && (
                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                <img 
                                                    src={project.imageUrl} 
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-lg">{project.title}</h3>
                                            <p className="text-sm text-navy-500">{project.category} • Order: {project.order}</p>
                                            <p className="text-sm">{project.isPublished ? '✅ Published' : '📝 Draft'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setEditingProject(project); setShowForm(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDeleteClick(project)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Delete Project"
                message="Are you sure you want to delete this project?"
                confirmText="Yes, Delete Project"
                cancelText="Cancel"
                type="danger"
                itemName={projectToDelete?.title}
                itemDetail={projectToDelete?.category}
                isLoading={isDeleting}
            />
        </div>
    );
}