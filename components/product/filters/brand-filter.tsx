"use client";

import { Accordion, SearchInput } from "@/components/ui";
import { useMemo, useState } from "react";

interface BrandFilterProps {
    selectedValues?: string[];
    onValueChange?: (values: string[]) => void;
}

export function BrandFilter({
    selectedValues = [],
    onValueChange,
}: BrandFilterProps) {
    const options = useMemo(() => ["ブランドA", "ブランドB", "ブランドC"], []);
    const [search, setSearch] = useState("");

    const handleChange = (value: string) => {
        const newValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];

        onValueChange?.(newValues);
    };

    const visibleOptions = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return options;
        return options.filter((brand) => brand.toLowerCase().includes(q));
    }, [options, search]);

    return (
        <Accordion title="ブランド">
            <div className="space-y-3">
                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    placeholder="ブランドを検索"
                    aria-label="ブランド検索"
                />

                <div className="space-y-2">
                    {visibleOptions.length > 0 ? (
                        visibleOptions.map((option) => (
                            <label
                                key={option}
                                className="flex items-center gap-2 cursor-pointer select-none"
                            >
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded  "
                                    checked={selectedValues.includes(option)}
                                    onChange={() => handleChange(option)}
                                />
                                <span className="text-sm">{option}</span>
                            </label>
                        ))
                    ) : (
                        <p className="text-xs text-gray-500">
                            該当するブランドがありません
                        </p>
                    )}
                </div>
            </div>
        </Accordion>
    );
}

