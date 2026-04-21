// app/admin/pricing/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import PricingForm from '@/components/admin/PricingForm';
import { Edit, Trash2, Plus } from 'lucide-react';
import { PricingPlan } from '@/types';

export default function AdminPricingPage() {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

    const fetchPlans = async () => {
        setLoading(true);
        const snapshot = await getDocs(collection(db, 'pricingPlans'));
        const plansData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PricingPlan));
        setPlans(plansData.sort((a, b) => a.order - b.order));
        setLoading(false);
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this plan?')) {
            await deleteDoc(doc(db, 'pricingPlans', id));
            toast.success('Plan deleted successfully');
            fetchPlans();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Pricing Plans</h1>
                <Button className='flex items-center' onClick={() => { setEditingPlan(null); setShowForm(true); }} variant="primary" size="sm">
                    <Plus className="w-4 h-4 mr-2" /> <span>Add Plan</span>
                </Button>
            </div>

            {showForm && (
                <div className="mb-8 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">{editingPlan ? 'Edit Plan' : 'Create New Plan'}</h2>
                    <PricingForm initialData={editingPlan} onSuccess={() => { setShowForm(false); setEditingPlan(null); fetchPlans(); }} />
                    <button onClick={() => { setShowForm(false); setEditingPlan(null); }} className="mt-4 text-navy-500 flex items-center border px-10 py-2.5 rounded-full hover:bg-gray-200 hover:text-black">Cancel</button>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Featured</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Published</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Order</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {plans.map((plan) => (
                                <tr key={plan.id}>
                                    <td className="px-6 py-4">{plan.name}</td>
                                    <td className="px-6 py-4">${plan.priceMonthly}/mo</td>
                                    <td className="px-6 py-4">{plan.isFeatured ? '✓' : '✗'}</td>
                                    <td className="px-6 py-4">{plan.isPublished ? '✓' : '✗'}</td>
                                    <td className="px-6 py-4">{plan.order}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => { setEditingPlan(plan); setShowForm(true); }} className="text-blue-500 hover:text-blue-700">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(plan.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}