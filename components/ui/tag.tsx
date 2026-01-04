"use client";

import { X } from "lucide-react";

interface TagProps {
    children: React.ReactNode;
    onRemove?: () => void;
    className?: string;
}

export function Tag({ children, onRemove, className = "" }: TagProps) {
    return (
        <div
            className={`flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm ${className}`}
        >
            <span className={onRemove ? "pr-2 border-r border-gray-300" : ""}>{children}</span>
            {onRemove && (
                <button
                    onClick={onRemove}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                    aria-label="Remove"
                >
                    <X className="w-3 h-3 text-gray-500" />
                </button>
            )}
        </div>
    );
}

