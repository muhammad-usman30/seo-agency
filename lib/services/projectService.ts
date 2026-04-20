// lib/services/projectService.ts
import { collection, query, where, orderBy, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Project } from '@/types';

export const projectService = {
    async getPublishedProjects(): Promise<Project[]> {
        const q = query(
            collection(db, 'projects'),
            where('isPublished', '==', true),
            orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    },

    async getAllProjects(): Promise<Project[]> {
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    },

    async getProjectBySlug(slug: string): Promise<Project | null> {
        const q = query(collection(db, 'projects'), where('slug', '==', slug), where('isPublished', '==', true));
        const snapshot = await getDocs(q);
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Project;
    },

    async createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        const docRef = await addDoc(collection(db, 'projects'), {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return docRef.id;
    },

    async updateProject(id: string, data: Partial<Project>): Promise<void> {
        await updateDoc(doc(db, 'projects', id), {
            ...data,
            updatedAt: new Date(),
        });
    },

    async deleteProject(id: string): Promise<void> {
        await deleteDoc(doc(db, 'projects', id));
    },
};