import Image from "next/image"

export const CardSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
        <div className="w-full h-64 p-6">
            <Image src='/images/placeholder.jpg' alt="placeholder image" width={300} height={100} className="h-full w-full rounded-lg opacity-50" />
        </div>
        <div className="p-6">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
    </div>
);