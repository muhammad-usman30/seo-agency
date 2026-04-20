// components/ui/EmptyState.tsx
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
    return (
        <div className="text-center py-12">
            {icon || <FolderOpen className="w-16 h-16 text-navy-300 mx-auto mb-4" />}
            <h3 className="text-xl font-semibold text-navy-700 mb-2">{title}</h3>
            {description && <p className="text-navy-500">{description}</p>}
        </div>
    );
}