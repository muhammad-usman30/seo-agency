// components/admin/AdminHeader.tsx
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export default function AdminHeader() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <header className="bg-white shadow-sm px-6 py-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-navy-800">Admin Dashboard</h1>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-navy-600">{user?.email}</span>
                    <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white font-bold">
                        {user?.email?.[0].toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    );
}