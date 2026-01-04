"use client";

import { useState, useEffect, useRef } from "react";
import { Filter, Repeat, ListFilter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { Overlay } from "./overlay";
import { FilterContent } from "./filter-content";
import { SortContent } from "./sort-content";
import { getSortLabel, SORT_OPTIONS } from "@/lib/constants/sort";
import { useFilters } from "@/contexts/filter-context";

export interface SortProps {
    currentSort: string;
    onSortChange: (sort: string) => void;
}

export interface SidebarProps {
    isVisible: boolean;
    onToggleVisibility: () => void;
}

export interface ProductListHeaderProps {
    searchTerm?: string;
    totalCount: number;
    filterCount?: number;
    sidebar: SidebarProps;
    sort: SortProps;
}

export function ProductListHeader({
    searchTerm,
    totalCount,
    filterCount,
    sidebar,
    sort,
}: ProductListHeaderProps) {
    const { isVisible: isSidebarVisible, onToggleVisibility } = sidebar;
    const { currentSort, onSortChange } = sort;
    const [isMobile, setIsMobile] = useState(false);
    const [layerType, setLayerType] = useState<"filter" | "sort" | null>(null);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const sortButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // Automatically close overlay and dropdown when resizing to mobile
            if (mobile) {
                setLayerType(null);
                setIsSortDropdownOpen(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleFilterClick = () => {
        if (isMobile) {
            setLayerType("filter");
        } else {
            onToggleVisibility();
        }
    };

    const handleSortClick = () => {
        if (isMobile) {
            setLayerType("sort");
        } else {
            setIsSortDropdownOpen(!isSortDropdownOpen);
        }
    };

    const handleCloseLayer = () => {
        setLayerType(null);
    };

    const handleSortSelect = (sortValue: string) => {
        onSortChange(sortValue);
        setIsSortDropdownOpen(false);
    };


    return (
        <>
            <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center gap-2 mb-6  md:mt-6">
                <div className="text-base md:text-xl">
                    <span className="text-gray-500">次の条件の検索結果:</span>
                    <span className="font-bold ml-2">
                        {searchTerm || "TOPPAN"} ({totalCount})
                    </span>
                </div>
                <div className="flex gap-2 overflow-scroll relative">
                    <Button onClick={handleFilterClick}>
                        {isMobile
                            ? `フィルターを表示する (${filterCount || 0})`
                            : isSidebarVisible
                                ? "フィルターを隠す"
                                : `フィルターを表示する (${filterCount || 0})`
                        }
                        {isMobile || !isSidebarVisible ? (
                            <Filter className="w-4 h-4" />
                        ) : (
                            <ListFilter className="w-4 h-4" />
                        )}
                    </Button>

                    {/* Sort Button with Dropdown */}
                    <div ref={sortButtonRef} className="relative">
                        <Button onClick={handleSortClick}>
                            並べ替え: <span className="text-gray-500">{getSortLabel(currentSort)}</span>
                            {!isMobile && (
                                isSortDropdownOpen
                                    ? <ChevronUp className="w-4 h-4" />
                                    : <ChevronDown className="w-4 h-4" />
                            )}
                        </Button>

                        {/* Sort Dropdown (PC only) */}
                        {!isMobile && (
                            <Dropdown
                                isOpen={isSortDropdownOpen}
                                onClose={() => setIsSortDropdownOpen(false)}
                                className="w-64 max-h-96 overflow-y-auto"
                                triggerRef={sortButtonRef}
                            >
                                {SORT_OPTIONS.map((option) => (
                                    <DropdownItem
                                        key={option.value}
                                        onClick={() => handleSortSelect(option.value)}
                                        isActive={currentSort === option.value}
                                    >
                                        {option.label}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        )}
                    </div>

                    <Button>
                        比較
                        <Repeat className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Mobile Filter/Sort Layer */}
            <Overlay
                isOpen={layerType !== null}
                onClose={handleCloseLayer}
                type={layerType || "filter"}
            >
                {layerType === "filter" && (
                    <FilterContent onApply={handleCloseLayer} />
                )}
                {layerType === "sort" && (
                    <SortContent
                        currentSort={currentSort}
                        onSortChange={(sort) => {
                            onSortChange(sort);
                            handleCloseLayer();
                        }}
                    />
                )}
            </Overlay>
        </>
    );
}

