"use client";

import { useState } from "react";
import { Accordion } from "@/components/ui";
import { PRODUCT_COLORS } from "@/lib/constants/colors";

interface CollectionFilterProps {
    selectedValues?: string[];
    onValueChange?: (values: string[]) => void;
}

export function CollectionFilter({
    selectedValues: externalSelectedValues,
    onValueChange,
}: CollectionFilterProps) {
    const [internalSelectedValues, setInternalSelectedValues] = useState<string[]>([]);

    // Use external values if provided (for future integration), otherwise use internal state
    const selectedValues = externalSelectedValues ?? internalSelectedValues;

    const handleChange = (value: string) => {
        const newValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];

        // Update internal state
        if (!externalSelectedValues) {
            setInternalSelectedValues(newValues);
        }

        // Call external handler if provided
        onValueChange?.(newValues);
    };

    return (
        <Accordion title="コレクション">
            <div className="grid grid-cols-9 md:grid-cols-5 gap-2">
                {PRODUCT_COLORS.map((c) => {
                    const isSelected = selectedValues.includes(c.id);
                    const borderClass = c.isLight ? "border border-gray-300" : "border border-transparent";

                    return (
                        <button
                            key={c.id}
                            type="button"
                            onClick={() => handleChange(c.id)}
                            aria-pressed={isSelected}
                            aria-label={`${c.label} ${isSelected ? "選択中" : ""}`}
                            className={[
                                "w-10 h-10 md:w-8 md:h-8 rounded-full",
                                "grid place-items-center",
                                "transition-all",
                                borderClass,
                                isSelected ? "ring-2 ring-gray-900 ring-offset-2" : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2",
                            ].join(" ")}
                            style={{ backgroundColor: c.hex }}
                        >
                            <span className="sr-only">{c.label}</span>
                        </button>
                    );
                })}
            </div>
        </Accordion>
    );
}

