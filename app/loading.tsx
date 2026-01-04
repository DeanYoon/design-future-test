function ProductCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-card-bg p-1 lg:p-2 animate-pulse">
      <div className="w-full aspect-square rounded-xl bg-gray-200"></div>
      <div className="my-2 flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-[18px] h-[18px] bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="space-y-1 mb-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/5"></div>
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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-6 md:mt-6">
      <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-9 bg-gray-200 rounded-full w-32 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

function FilterSidebarSkeleton() {
  return (
    <aside className="hidden md:block w-64 shrink-0">
      <div className="bg-white border-gray-200 rounded-lg overflow-hidden w-64 p-4 space-y-4">
        {/* Search skeleton */}
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        
        {/* Toggle skeleton */}
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        
        {/* Filter sections */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="space-y-1">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function Loading() {
  return (
    <>
      <ProductListHeaderSkeleton />
      <div className="flex gap-6">
        {/* Desktop Sidebar Skeleton */}
        <FilterSidebarSkeleton />

        {/* Product Grid Skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
