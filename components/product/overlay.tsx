"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface OverlayProps {
    isOpen: boolean;
    onClose: () => void;
    type: "filter" | "sort";
    children: React.ReactNode;
}

export function Overlay({
    isOpen,
    onClose,
    type,
    children,
}: OverlayProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>


            {/* Slide Layer */}
            <div
                className={`fixed top-0 left-0 h-full w-full bg-white z-50 transition-transform duration-300 ease-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full    relative overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4  absolute top-0 right-0  ">
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors  z-50"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1   p-4">{children}</div>

                </div>
            </div>
        </>
    );
}

