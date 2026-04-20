// lib/services/contactService.ts
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Contact } from '@/types';

export const contactService = {
    async submitContact(data: Omit<Contact, 'id' | 'createdAt'>): Promise<string> {
        const docRef = await addDoc(collection(db, 'contacts'), {
            ...data,
            createdAt: new Date(),
        });
        return docRef.id;
    },

    async getAllContacts(): Promise<Contact[]> {
        const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contact));
    },
};