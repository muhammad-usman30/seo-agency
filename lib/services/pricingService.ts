// lib/services/pricingService.ts
import { collection, query, where, orderBy, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { PricingPlan } from '@/types';

export const pricingService = {
    async getPublishedPlans(): Promise<PricingPlan[]> {
        const q = query(
            collection(db, 'pricingPlans'),
            where('isPublished', '==', true),
            orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PricingPlan));
    },

    async getAllPlans(): Promise<PricingPlan[]> {
        const q = query(collection(db, 'pricingPlans'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PricingPlan));
    },

    async getPlanById(id: string): Promise<PricingPlan | null> {
        const docRef = doc(db, 'pricingPlans', id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as PricingPlan : null;
    },

    async createPlan(data: Omit<PricingPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        const docRef = await addDoc(collection(db, 'pricingPlans'), {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return docRef.id;
    },

    async updatePlan(id: string, data: Partial<PricingPlan>): Promise<void> {
        await updateDoc(doc(db, 'pricingPlans', id), {
            ...data,
            updatedAt: new Date(),
        });
    },

    async deletePlan(id: string): Promise<void> {
        await deleteDoc(doc(db, 'pricingPlans', id));
    },
};