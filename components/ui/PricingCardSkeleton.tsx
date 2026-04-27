'use client';

export default function PricingCardSkeleton() {
  return (
    <div className={`
      relative rounded-2xl overflow-hidden
      bg-white border border-gray-200
      animate-pulse
    `}>
      <div className="p-8">
        {/* Plan Name Skeleton */}
        <div className="flex justify-center mb-2">
          <div className="h-7 w-24 rounded-lg bg-gray-200"></div>
        </div>

        {/* Price Skeleton */}
        <div className="mt-4 mb-6 text-center">
          <div className="flex items-baseline justify-center gap-1">
            <div className="h-12 w-28 rounded-lg bg-gray-200"></div>
            <div className="h-5 w-12 rounded-lg bg-gray-200"></div>
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full rounded bg-gray-200"></div>
          <div className="h-4 w-3/4 mx-auto rounded bg-gray-200"></div>
        </div>

        {/* Divider Skeleton */}
        <div className="h-px w-full my-6 bg-gray-200"></div>

        {/* Features List Skeleton */}
        <ul className="space-y-4 mb-8">
          {[...Array(6)].map((_, index) => (
            <li key={index} className="flex items-center justify-between gap-3">
              <div className="h-5 w-32 rounded bg-gray-200"></div>
              <div className="w-7 h-7 rounded-full bg-gray-200"></div>
            </li>
          ))}
        </ul>

        {/* Button Skeleton */}
        <div className="w-full h-11 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
}