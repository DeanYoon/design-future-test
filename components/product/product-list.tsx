"use client";

import { useState, useMemo } from "react";
import { Filter, Repeat } from "lucide-react";
import { ProductCard } from "./product-card";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface ProductListProps {
    products: Product[];
    itemsPerPage?: number;
    searchTerm?: string;
    filterCount?: number;
}

function ProductListHeader({
    searchTerm,
    totalCount,
    filterCount,
}: {
    searchTerm?: string;
    totalCount: number;
    filterCount?: number;
}) {
    return (
        <div className="flex flex-col gap-2 mb-6">
            <div className="text-base">
                <span className="text-gray-500">次の条件の検索結果:</span>
                <span className="font-bold ml-2">
                    {searchTerm || "TOPPAN"} ({totalCount})
                </span>
            </div>
            <div className="flex gap-2 overflow-scroll">
                <Button>
                    フィルターを表示する ({filterCount ?? 2})
                    <Filter className="w-4 h-4" />
                </Button>
                <Button>並べ替え: ブランドA-Z</Button>
                <Button>
                    比較
                    <Repeat className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}

export function ProductList({
    products,
    itemsPerPage = 12,
    searchTerm,
    filterCount,
}: ProductListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / itemsPerPage);

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
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
}

