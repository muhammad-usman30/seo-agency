// components/ui/TeamCard.tsx
'use client';

import { motion } from 'framer-motion';
import GradientPlaceholder from './GradientPlaceholder';

interface TeamCardProps {
    name: string;
    role: string;
    image: string;
    index: number;
}

export default function TeamCard({ name, role, image, index }: TeamCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center group"
        >
            <div className="mb-4 overflow-hidden rounded-2xl">
                <GradientPlaceholder aspectRatio="square" label={name} />
            </div>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-primary-600">{role}</p>
        </motion.div>
    );
}