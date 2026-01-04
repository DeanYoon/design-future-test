"use client";

import { Search } from "lucide-react";
import { InputHTMLAttributes, KeyboardEvent } from "react";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onKeyDown"> {
    onEnter?: (value: string) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export function SearchInput({
    onEnter,
    onKeyDown,
    className = "",
    ...props
}: SearchInputProps) {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onEnter) {
            e.preventDefault();
            const value = e.currentTarget.value.trim();
            if (value) {
                onEnter(value);
                e.currentTarget.value = "";
            }
        }
        onKeyDown?.(e);
    };

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                {...props}
                onKeyDown={handleKeyDown}
                className={`w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent ${className}`}
            />
        </div>
    );
}

