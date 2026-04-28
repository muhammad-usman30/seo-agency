'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import PricingForm from '@/components/admin/PricingForm';
import { Edit, Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { PricingPlan } from '@/types';
import LoadingState from '@/components/ui/Loading';
import ConfirmationModal from '@/components/modals/ConfirmModal';

export default function AdminPricingPage() {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [planToDelete, setPlanToDelete] = useState<PricingPlan | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchPlans = async () => {
        setLoading(true);
        const q = query(collection(db, 'pricingPlans'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        const plansData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PricingPlan));
        setPlans(plansData);
        setLoading(false);
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleDeleteClick = (plan: PricingPlan) => {
        setPlanToDelete(plan);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!planToDelete) return;
        
        setIsDeleting(true);
        try {
            await deleteDoc(doc(db, 'pricingPlans', planToDelete.id));
            toast.success(`"${planToDelete.name}" has been deleted successfully`);
            fetchPlans();
            setShowDeleteModal(false);
            setPlanToDelete(null);
        } catch (error) {
            console.error('Error deleting plan:', error);
            toast.error('Failed to delete plan');
        } finally {
            setIsDeleting(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setPlanToDelete(null);
    };

    const handleMoveUp = async (plan: PricingPlan, index: number) => {
        if (index === 0) return;
        
        const prevPlan = plans[index - 1];
        const currentOrder = plan.order;
        const prevOrder = prevPlan.order;
        
        try {
            await updateDoc(doc(db, 'pricingPlans', plan.id), { order: prevOrder });
            await updateDoc(doc(db, 'pricingPlans', prevPlan.id), { order: currentOrder });
            toast.success('Order updated successfully');
            fetchPlans();
        } catch (error) {
            toast.error('Failed to update order');
        }
    };

    const handleMoveDown = async (plan: PricingPlan, index: number) => {
        if (index === plans.length - 1) return;
        
        const nextPlan = plans[index + 1];
        const currentOrder = plan.order;
        const nextOrder = nextPlan.order;
        
        try {
            await updateDoc(doc(db, 'pricingPlans', plan.id), { order: nextOrder });
            await updateDoc(doc(db, 'pricingPlans', nextPlan.id), { order: currentOrder });
            toast.success('Order updated successfully');
            fetchPlans();
        } catch (error) {
            toast.error('Failed to update order');
        }
    };

    const canAddMorePlans = plans.filter(p => p.isPublished).length < 3;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Pricing Plans</h1>
                    <p className="text-sm text-navy-500 mt-1">
                        Maximum 3 published plans can be displayed on the website
                    </p>
                </div>
                <Button 
                    className='flex items-center' 
                    onClick={() => { setEditingPlan(null); setShowForm(true); }} 
                    variant="primary" 
                    size="sm"
                    disabled={!canAddMorePlans}
                    title={!canAddMorePlans ? "Maximum 3 plans already published" : ""}
                >
                    <Plus className="w-4 h-4 mr-2" /> <span>Add Plan</span>
                </Button>
            </div>

            {showForm && (
                <div className="mb-8 bg-white rounded-xl shadow-md p-6 relative">
                    <h2 className="text-xl font-bold mb-4">{editingPlan ? 'Edit Plan' : 'Create New Plan'}</h2>
                    <PricingForm 
                        initialData={editingPlan}
                        onSuccess={() => { setShowForm(false); setEditingPlan(null); fetchPlans(); }}
                        onCancel={() => { setShowForm(false); setEditingPlan(null); }}
                    />
                </div>
            )}

            {loading ? (
                <LoadingState />
            ) : (
                <>
                    {!showForm && (
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Order</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Featured</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Published</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {plans.map((plan, index) => (
                                        <tr key={plan.id} className={!plan.isPublished ? 'opacity-50 bg-gray-50' : ''}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-8 text-center">{plan.order}</span>
                                                    <div className="flex flex-col">
                                                        <button
                                                            onClick={() => handleMoveUp(plan, index)}
                                                            disabled={index === 0}
                                                            className="p-1 text-navy-400 hover:text-primary-600 disabled:opacity-30"
                                                        >
                                                            <ArrowUp className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleMoveDown(plan, index)}
                                                            disabled={index === plans.length - 1}
                                                            className="p-1 text-navy-400 hover:text-primary-600 disabled:opacity-30"
                                                        >
                                                            <ArrowDown className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{plan.name}</td>
                                            <td className="px-6 py-4">${plan.priceMonthly}/mo</td>
                                            <td className="px-6 py-4">
                                                {plan.isFeatured ? (
                                                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Popular</span>
                                                ) : (
                                                    <span className="text-gray-400">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {plan.isPublished ? (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Published</span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold">Draft</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => { setEditingPlan(plan); setShowForm(true); }} 
                                                        className="text-blue-500 hover:text-blue-700 transition"
                                                        title="Edit plan"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteClick(plan)} 
                                                        className="text-red-500 hover:text-red-700 transition"
                                                        title="Delete plan"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {plans.filter(p => p.isPublished).length >= 3 && (
                                <div className="bg-amber-50 border-t border-amber-200 p-4">
                                    <p className="text-amber-700 text-sm flex items-center gap-2">
                                        <span className="text-lg">⚠️</span>
                                        Maximum 3 published pricing plans reached. Unpublish or delete existing plans to add more.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete the following pricing plan?"
                confirmText="Yes, Delete Plan"
                cancelText="Cancel"
                type="danger"
                itemName={planToDelete?.name}
                itemDetail={planToDelete ? `$${planToDelete.priceMonthly}/month` : undefined}
                isLoading={isDeleting}
            />
        </div>
    );
}