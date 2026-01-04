"use client";

import { Accordion } from "@/components/ui";

interface OtherFilterProps {
    title: string;
    options: string[];
    type?: "checkbox" | "radio";
    selectedValues?: string[];
    onValueChange?: (values: string[]) => void;
    className?: string;
}

export function OtherFilter({
    title,
    options,
    type = "checkbox",
    selectedValues = [],
    onValueChange,
    className = "",
}: OtherFilterProps) {
    const handleChange = (value: string) => {
        if (type === "radio") {
            onValueChange?.([value]);
            return;
        }

        if (value === "すべて") {
            onValueChange?.(["すべて"]);
            return;
        }

        const newValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues.filter((v) => v !== "すべて"), value];

        onValueChange?.(newValues.length > 0 ? newValues : ["すべて"]);
    };

    return (
        <Accordion title={title} className={className}>
            <div className="space-y-2">
                {options.map((option) => (
                    <label
                        key={option}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <input
                            type={type}
                            name={type === "radio" ? title : undefined}
                            className={`w-4 h-4 border-gray-300 ${type === "checkbox" ? "rounded" : ""
                                }`}
                            checked={selectedValues.includes(option)}
                            onChange={() => handleChange(option)}
                        />
                        <span className="text-sm">{option}</span>
                    </label>
                ))}
            </div>
        </Accordion>
    );
}

