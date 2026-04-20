// components/ui/ErrorState.tsx
import { AlertCircle } from 'lucide-react';
import Button from './Button';

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{message}</p>
            {onRetry && <Button onClick={onRetry} variant="primary" size="sm">Try Again</Button>}
        </div>
    );
}