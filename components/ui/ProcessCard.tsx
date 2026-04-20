// components/ui/ProcessCard.tsx
'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ProcessCardProps {
    number: string;
    icon: LucideIcon;
    title: string;
    description: string;
    index: number;
}

export default function ProcessCard({ number, icon: Icon, title, description, index }: ProcessCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-white rounded-2xl p-6 shadow-lg group hover:shadow-2xl transition-all duration-300"
        >
            <div className="absolute -top-3 -right-3 w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-lg">
                {number}
            </div>
            <Icon className="w-12 h-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-navy-600">{description}</p>
        </motion.div>
    );
}