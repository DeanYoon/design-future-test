"use client";

import { Menu, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { MobileFilter, MobileNav, Logo } from "@/components/header";


export function Header() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 w-full bg-white`}
            >
                <div className="  flex justify-between items-center p-3">
                    <Logo className="" width={122} height={36} />
                    <nav className="flex items-center  gap-4 text-sm font-medium">
                        <button onClick={() => setIsSearchFilterOpen(!isSearchFilterOpen)}>
                            <Search className="w-5 h-5" />
                        </button>
                        <ShoppingCart className="w-5 h-5" />
                        <button
                            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                    </nav>
                </div>
            </header>
            <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
            <MobileFilter isOpen={isSearchFilterOpen} onClose={() => setIsSearchFilterOpen(false)} />
        </>
    );
}

export default Header;
