"use client";

import { SORT_OPTIONS, DEFAULT_SORT } from "@/lib/constants/sort";

interface SortContentProps {
    currentSort?: string;
    onSortChange?: (sort: string) => void;
}

export function SortContent({
    currentSort = DEFAULT_SORT,
    onSortChange,
}: SortContentProps) {
    return (
        <div className="space-y-2 p-1">
            <div className="text-lg font-extrabold">並べ替え</div>
            {SORT_OPTIONS.map((option) => (
                <label
                    key={option.value}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${currentSort === option.value
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                        }`}
                >
                    <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={currentSort === option.value}
                        onChange={() => onSortChange?.(option.value)}
                        className="w-4 h-4 border-gray-300"
                    />
                    <span className="flex-1">{option.label}</span>
                </label>
            ))}
        </div>
    );
}

