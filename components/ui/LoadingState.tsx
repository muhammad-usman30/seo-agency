// components/ui/LoadingState.tsx
export default function LoadingState() {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                <div className="animate-pulse absolute inset-0 rounded-full bg-primary-200 opacity-25"></div>
            </div>
        </div>
    );
}