"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { INITIAL_FILTER_STATE, type FilterState } from "@/lib/constants/filters";

/** Manages all filter-related state for the product list */
interface FilterContextType {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedItems: string[];
    setSelectedItems: (items: string[]) => void;
    toggleOn: boolean;
    setToggleOn: (value: boolean) => void;
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
    resetAllFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

/** Provider component for filter state management */
export function FilterProvider({ children }: { children: ReactNode }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [toggleOn, setToggleOn] = useState(false);
    const [filters, setFilters] = useState(INITIAL_FILTER_STATE);

    const updateFilter = <K extends keyof FilterState>(
        key: K,
        value: FilterState[K]
    ) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const resetAllFilters = () => {
        setSearchQuery("");
        setSelectedItems([]);
        setToggleOn(false);
        setFilters(INITIAL_FILTER_STATE);
    };

    return (
        <FilterContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                selectedItems,
                setSelectedItems,
                toggleOn,
                setToggleOn,
                filters,
                setFilters,
                updateFilter,
                resetAllFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

/** Hook to access filter context - must be used within FilterProvider */
export function useFilters() {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error("useFilters must be used within a FilterProvider");
    }
    return context;
}

