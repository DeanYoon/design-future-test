"use client";

import { ReactNode, useEffect, useRef, RefObject, useState } from "react";

export interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
    triggerRef?: RefObject<HTMLElement | null>;
}

export function Dropdown({ isOpen, onClose, children, className = "", triggerRef }: DropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

    // Prevent body scroll when dropdown is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [isOpen]);

    // Calculate position when triggerRef is provided and dropdown is open
    useEffect(() => {
        if (isOpen && triggerRef?.current) {
            const updatePosition = () => {
                const rect = triggerRef.current?.getBoundingClientRect();
                if (rect) {
                    setPosition({
                        top: rect.bottom + 8, // 8px gap (mt-2)
                        left: rect.left,
                    });
                }
            };
            
            updatePosition();
            window.addEventListener("scroll", updatePosition, true);
            window.addEventListener("resize", updatePosition);
            
            return () => {
                window.removeEventListener("scroll", updatePosition, true);
                window.removeEventListener("resize", updatePosition);
            };
        }
    }, [isOpen, triggerRef]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isInsideDropdown = dropdownRef.current && dropdownRef.current.contains(target);
            const isInsideTrigger = triggerRef?.current && triggerRef.current.contains(target);
            
            if (!isInsideDropdown && !isInsideTrigger) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen, onClose, triggerRef]);

    if (!isOpen) return null;

    // Use fixed positioning when triggerRef is provided
    if (triggerRef && position) {
        return (
            <div
                ref={dropdownRef}
                className={`fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 ${className}`}
                style={{
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                }}
            >
                {children}
            </div>
        );
    }

    // Default absolute positioning (for header)
    return (
        <div
            ref={dropdownRef}
            className={`absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 ${className}`}
        >
            {children}
        </div>
    );
}

interface DropdownItemProps {
    onClick: () => void;
    children: ReactNode;
    isActive?: boolean;
    className?: string;
}

export function DropdownItem({ onClick, children, isActive = false, className = "" }: DropdownItemProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors ${isActive ? "bg-gray-50 font-semibold" : ""
                } ${className}`}
        >
            {children}
        </button>
    );
}

