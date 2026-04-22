export const ProjectCardSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
        <div className="w-full h-64 bg-gray-200" />
        <div className="p-6">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
    </div>
);