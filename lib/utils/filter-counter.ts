import type { FilterState } from "../constants/filters";

// Check if a filter value is active
const isActive = (value: unknown, checkAll = true): boolean => {
    if (Array.isArray(value)) {
        return value.length > 0 && (!checkAll || !value.includes("すべて"));
    }
    return Boolean(value);
};

// Calculate the number of active filters
export function getActiveFilterCount(
    searchQuery: string,
    selectedItems: string[],
    isToggleOn: boolean,
    filters: FilterState
): number {
    return [
        isActive(searchQuery, false),
        isActive(selectedItems, false),
        isActive(isToggleOn, false),
        isActive(filters.circular, false),
        isActive(filters.brand, false),
        isActive(filters.collection, false),
        isActive(filters.series),
        isActive(filters.usageLocation),
        isActive(filters.price),
        isActive(filters.color),
        isActive(filters.colorTone),
        isActive(filters.pattern),
        isActive(filters.size),
        isActive(filters.stockStatus),
        isActive(filters.surfaceGloss),
        isActive(filters.design),
        isActive(filters.csr),
        isActive(filters.performance),
        isActive(filters.fireResistance),
        isActive(filters.buildingType),
        isActive(filters.purpose),
        isActive(filters.productionPlace),
        isActive(filters.productionPrefecture),
        isActive(filters.certification),
        isActive(filters.woodType),
        isActive(filters.grainType),
        isActive(filters.wear),
    ].filter(Boolean).length;
}

