'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function TestFirebase() {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const testConnection = async () => {
            try {
                console.log('Testing Firebase connection...');
                const querySnapshot = await getDocs(collection(db, 'projects'));
                const plans = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log('projects:', plans);
                setData(plans);
            } catch (err: any) {
                console.error('Firebase error:', err);
                setError(err.message);
            }
        };
        testConnection();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Firebase Connection Test</h1>
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-600 font-semibold">Error:</p>
                    <p className="text-red-600">{error}</p>
                </div>
            )}
            {data && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-600 font-semibold">Success! Found {data.length} projects</p>
                    <pre className="mt-2 text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}