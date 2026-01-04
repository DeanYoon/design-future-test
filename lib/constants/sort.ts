export interface SortOption {
    value: string;
    label: string;
}

export const SORT_OPTIONS: SortOption[] = [
    { value: "newest", label: "新着" },
    { value: "brand-az", label: "ブランドA-Z" },
    { value: "product-az", label: "製品名A-Z" },
    { value: "product-za", label: "製品名Z-A" },
    { value: "price-low", label: "価格¥-¥¥¥¥¥" },
    { value: "price-high", label: "価格¥¥¥¥¥-¥" },
    { value: "plain-pattern", label: "無地 - 柄あり" },
    { value: "pattern-plain", label: "柄あり - 無地" },
    { value: "dark-light", label: "濃い - 薄い" },
    { value: "light-dark", label: "薄い - 濃い" },
];

export const DEFAULT_SORT = "newest";

export function getSortLabel(sortValue: string): string {
    const option = SORT_OPTIONS.find((opt) => opt.value === sortValue);
    return option?.label || SORT_OPTIONS[0].label;
}

