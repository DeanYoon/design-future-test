"use client";

import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { ReactNode, useState } from "react";

interface AccordionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
    className?: string;
    showInfo?: boolean;
    onInfoClick?: () => void;
}

export function Accordion({
    title,
    children,
    defaultOpen = false,
    className = "",
    showInfo = false,
    onInfoClick,
}: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`border-b border-gray-200  ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-900 ">{title}</span>
                    {showInfo && (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                onInfoClick?.();
                            }}
                            className="p-0.5 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                            aria-label="Info"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onInfoClick?.();
                                }
                            }}
                        >
                            <Info className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                    )}
                </div>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4  shrink-0" />
                ) : (
                    <ChevronDown className="w-4 h-4  shrink-0" />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 bg-gray-100 p-2 rounded-md" : "max-h-0 opacity-0"
                    }`}
            >
                <div >{children}</div>
            </div>
        </div>
    );
}

