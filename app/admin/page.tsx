// app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { DollarSign, FolderKanban, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        pricingPlans: 0,
        projects: 0,
        contacts: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            const pricingSnap = await getDocs(collection(db, 'pricingPlans'));
            const projectsSnap = await getDocs(collection(db, 'projects'));
            const contactsSnap = await getDocs(collection(db, 'contacts'));

            setStats({
                pricingPlans: pricingSnap.size,
                projects: projectsSnap.size,
                contacts: contactsSnap.size,
            });
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Pricing Plans', value: stats.pricingPlans, icon: DollarSign, color: 'from-green-500 to-emerald-500' },
        { title: 'Projects', value: stats.projects, icon: FolderKanban, color: 'from-blue-500 to-cyan-500' },
        { title: 'Contact Submissions', value: stats.contacts, icon: Users, color: 'from-purple-500 to-pink-500' },
        { title: 'Total Revenue', value: '$0', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6">
                            <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center mb-4`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-sm text-navy-500 mb-1">{card.title}</h3>
                            <p className="text-2xl font-bold text-navy-800">{card.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <a href="/admin/pricing" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                        Manage Pricing
                    </a>
                    <a href="/admin/projects" className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700">
                        Manage Projects
                    </a>
                </div>
            </div>
        </div>
    );
}