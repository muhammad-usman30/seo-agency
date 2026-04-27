// components/ui/LoadingState.tsx
export default function Loading() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="relative">
                {/* Outer glow (brand gradient) */}
                <div className="w-20 h-20 rounded-full 
                    bg-gradient-to-tr 
                    from-primary-500 
                    via-primary-600 
                    to-navy-700 
                    blur-xl opacity-40 animate-pulse-slow">
                </div>

                {/* Spinning ring */}
                <div className="absolute inset-0 w-20 h-20 rounded-full border-4 
                    border-t-transparent 
                    border-l-transparent 
                    border-primary-500 
                    animate-spin">
                </div>

                {/* Inner reverse ring */}
                <div className="absolute inset-2 w-16 h-16 rounded-full border-4 
                    border-b-transparent 
                    border-r-transparent 
                    border-navy-700 
                    animate-[spin_1.5s_linear_reverse_infinite]">
                </div>

                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-ping"></div>
                </div>

            </div>
        </div>
    );
}