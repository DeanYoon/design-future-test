"use client";

import { SlidePanel } from "./slide-panel";

interface MobileFilterProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export function MobileFilter({ isOpen, onClose, children }: MobileFilterProps) {
    return (
        <SlidePanel
            isOpen={isOpen}
            onClose={onClose}
            title="Filter"
            ariaLabel="Mobile filter"
        >
            {children || (
                <div className="text-gray-500">Add filter options here</div>
            )}
        </SlidePanel>
    );
}

