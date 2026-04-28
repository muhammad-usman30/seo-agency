'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info' | 'success';
    itemName?: string;
    itemDetail?: string;
    isLoading?: boolean;
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger',
    itemName,
    itemDetail,
    isLoading = false,
}: ConfirmationModalProps) {
    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    headerGradient: 'from-red-500 to-red-600',
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-600',
                    itemBg: 'bg-red-50',
                    itemBorder: 'border-red-200',
                    itemText: 'text-red-700',
                    buttonBg: 'bg-red-600 hover:bg-red-700',
                };
            case 'warning':
                return {
                    headerGradient: 'from-amber-500 to-amber-600',
                    iconBg: 'bg-amber-100',
                    iconColor: 'text-amber-600',
                    itemBg: 'bg-amber-50',
                    itemBorder: 'border-amber-200',
                    itemText: 'text-amber-700',
                    buttonBg: 'bg-amber-600 hover:bg-amber-700',
                };
            case 'info':
                return {
                    headerGradient: 'from-blue-500 to-blue-600',
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    itemBg: 'bg-blue-50',
                    itemBorder: 'border-blue-200',
                    itemText: 'text-blue-700',
                    buttonBg: 'bg-blue-600 hover:bg-blue-700',
                };
            case 'success':
                return {
                    headerGradient: 'from-green-500 to-green-600',
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600',
                    itemBg: 'bg-green-50',
                    itemBorder: 'border-green-200',
                    itemText: 'text-green-700',
                    buttonBg: 'bg-green-600 hover:bg-green-700',
                };
            default:
                return {
                    headerGradient: 'from-red-500 to-red-600',
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-600',
                    itemBg: 'bg-red-50',
                    itemBorder: 'border-red-200',
                    itemText: 'text-red-700',
                    buttonBg: 'bg-red-600 hover:bg-red-700',
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    
                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                    >
                        {/* Modal Header */}
                        <div className={`bg-gradient-to-r ${styles.headerGradient} px-6 py-4`}>
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-white">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="text-white/80 hover:text-white transition"
                                    disabled={isLoading}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="flex items-center justify-center mb-4">
                                <div className={`w-16 h-16 ${styles.iconBg} rounded-full flex items-center justify-center`}>
                                    <AlertTriangle className={`w-8 h-8 ${styles.iconColor}`} />
                                </div>
                            </div>
                            
                            <p className="text-center text-gray-700 mb-4">
                                {message}
                            </p>
                            
                            {itemName && (
                                <div className={`${styles.itemBg} border ${styles.itemBorder} rounded-lg p-4 my-4`}>
                                    <p className="text-center">
                                        <span className="text-sm text-gray-600">Item:</span>
                                        <br />
                                        <span className={`text-lg font-bold ${styles.itemText}`}>{itemName}</span>
                                    </p>
                                    {itemDetail && (
                                        <p className="text-center text-sm text-gray-500 mt-2">
                                            {itemDetail}
                                        </p>
                                    )}
                                </div>
                            )}
                            
                            <p className="text-center text-sm text-red-600">
                                ⚠️ This action cannot be undone.
                            </p>
                        </div>
                        
                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                {cancelText}
                            </Button>
                            <Button
                                type="button"
                                variant="primary"
                                onClick={onConfirm}
                                disabled={isLoading}
                                className={styles.buttonBg}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    confirmText
                                )}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}