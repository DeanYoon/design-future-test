function ProductCardSkeleton() {
    return (
        <div className="rounded-lg overflow-hidden bg-[#F5F5F5] p-1 animate-pulse">
            <div className="w-full aspect-square rounded-lg bg-gray-200"></div>
            <div className="my-2 h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-1 mb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="w-full h-6 bg-gray-200 rounded-full"></div>
                <div className="w-full h-6 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
}

function ProductListHeaderSkeleton() {
    return (
        <div className="flex flex-col gap-2 mb-6">
            <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
            <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-9 bg-gray-200 rounded-full w-32 animate-pulse"></div>
                ))}
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <>
            <ProductListHeaderSkeleton />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        </>
    );
}

