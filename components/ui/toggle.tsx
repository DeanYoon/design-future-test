"use client";

import { ReactNode } from "react";

interface ToggleLabelColor {
    checked: string;
    unchecked: string;
}

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: ReactNode;
    checkedColor?: string;
    labelColor?: ToggleLabelColor;
}

export function Toggle({
    checked,
    onChange,
    label,
    checkedColor = "bg-green-500",
    labelColor = {
        checked: "text-green-600",
        unchecked: "text-black",
    },
}: ToggleProps) {
    return (
        <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only peer"
                />
                <div
                    className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${checked ? checkedColor : "bg-gray-200"
                        }`}
                ></div>
            </label>
            {label && (
                <span className={`text-sm font-medium ${checked ? labelColor.checked : labelColor.unchecked
                    }`}>
                    {label}
                </span>
            )}
        </div>
    );
}

