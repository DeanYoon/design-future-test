"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "./product-card";
import { Pagination } from "@/components/ui/pagination";
import { ProductListHeader } from "./product-list-header";
import { FilterContent } from "./filter-content";
import { DEFAULT_SORT } from "@/lib/constants/sort";
import { getActiveFilterCount } from "@/lib/utils/filter-counter";
import { FilterProvider, useFilters } from "@/contexts/filter-context";
import type { Product } from "@/types/product";

interface ProductListProps {
    products: Product[];
    itemsPerPage?: number;
    searchTerm?: string;
}

function ProductListContent({
    products,
    searchTerm,
}: ProductListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [currentSort, setCurrentSort] = useState(DEFAULT_SORT);

    // Use filter context instead of local state
    const { searchQuery, selectedItems, toggleOn, filters } = useFilters();

    // Responsive state - calculated once and passed to all children
    const [isMobile, setIsMobile] = useState(false);
    const [gridCols, setGridCols] = useState(2);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const mobile = width < 768;
            setIsMobile(mobile);

            let cols = 2;
            let items = 12;

            if (width >= 1280) {
                cols = 5;
                items = 35; // 5 cols × 7 rows
            } else if (width >= 1024) {
                cols = 4;
                items = 28; // 4 cols × 7 rows
            } else if (width >= 768) {
                cols = 3;
                items = 18; // 3 cols × 6 rows
            } else {
                cols = 2;
                items = 12; // 2 cols × 6 rows
            }

            setGridCols(cols);
            setItemsPerPage(items);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Calculate active filter count
    const filterCount = useMemo(
        () =>
            getActiveFilterCount(
                searchQuery,
                selectedItems,
                toggleOn,
                filters
            ),
        [searchQuery, selectedItems, toggleOn, filters]
    );

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return products.slice(startIndex, endIndex);
    }, [products, currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <ProductListHeader
                searchTerm={searchTerm}
                totalCount={products.length}
                filterCount={filterCount}
                sidebar={{
                    isVisible: isSidebarVisible,
                    onToggleVisibility: () => setIsSidebarVisible(!isSidebarVisible),
                }}
                sort={{
                    currentSort,
                    onSortChange: setCurrentSort,
                }}
            />
            <div className="flex gap-6">
                {/* Desktop Sidebar - Filter Only with Slide Animation */}
                <aside
                    className={`hidden transition-all duration-300 ease-in-out overflow-hidden ${isSidebarVisible
                        ? "md:block w-64 shrink-0 opacity-100 translate-x-0"
                        : "md:hidden w-0 opacity-0 -translate-x-full"
                        }`}
                >
                    <div className="bg-white border-gray-200 rounded-lg overflow-hidden w-64">
                        <div className="p-4 md:p-1">
                            <FilterContent />
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {paginatedProducts.map((product, idx) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={idx}
                                isMobile={isMobile}
                                gridCols={gridCols}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export function ProductList(props: ProductListProps) {
    return (
        <FilterProvider>
            <ProductListContent {...props} />
        </FilterProvider>
    );
}

