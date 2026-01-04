"use client";

import { Menu, Search, ShoppingCart, Plus, MessageCircle, User, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/header";
import { SearchInput } from "@/components/ui";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { useCart } from "@/contexts/cart-context";

const NAV_LINKS = [
    {
        label: "プロダクト",
        href: "#",
        children: [
            { label: "すべてのプロダクト", href: "#/products/all" },
            { label: "新着", href: "#/products/new" },
            { label: "人気", href: "#/products/popular" },
            { label: "セール", href: "#/products/sale" },
        ]
    },
    {
        label: "ブランド",
        href: "#"
    },
    { label: "コレクション", href: "#" },
    { label: "デザイン", href: "#" },
    { label: "プロトタイプ", href: "#" },
    { label: "フィードバック", href: "#" },
];

export function Header() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const { cartCount } = useCart();

    useEffect(() => {
        const handleResize = () => {
            // Use 1024px (lg) breakpoint for better spacing on tablets
            setIsMobile(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown-container')) {
                setOpenDropdown(null);
            }
        };

        if (openDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [openDropdown]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white  xl:px-12">
                <div className="flex justify-between items-center px-4 py-3 gap-4">
                    {/* Left: Logo + Nav Links (PC only) */}
                    <div className="flex items-center gap-8">
                        <div className="shrink-0">
                            <Logo className="" width={122} height={36} />
                        </div>

                        {/* Navigation Links - visible on PC (lg+) */}
                        {!isMobile && (
                            <nav className="flex items-center gap-4 xl:gap-6">
                                {NAV_LINKS.map((link) => (
                                    <div key={link.label} className="relative">
                                        {link.children ? (
                                            <>
                                                {/* Dropdown trigger */}
                                                <div
                                                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                                                    className="flex items-center gap-1 text-xs xl:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
                                                >
                                                    {link.label}
                                                    <ChevronDown className="w-3 h-3" />
                                                </div>

                                                {/* Dropdown content */}
                                                <Dropdown
                                                    isOpen={openDropdown === link.label}
                                                    onClose={() => setOpenDropdown(null)}
                                                    className="w-48"
                                                >
                                                    {link.children.map((child) => (
                                                        <DropdownItem
                                                            key={child.label}
                                                            onClick={() => {
                                                                window.location.href = child.href;
                                                                setOpenDropdown(null);
                                                            }}
                                                        >
                                                            {child.label}
                                                        </DropdownItem>
                                                    ))}
                                                </Dropdown>
                                            </>
                                        ) : (
                                            // Simple link
                                            <a
                                                href={link.href}
                                                className="text-xs xl:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        )}
                    </div>

                    {/* Right: Icons */}
                    <nav className="flex items-center gap-2 xl:gap-3">
                        {isMobile ? (
                            // Mobile: Search icon, Shopping, Menu
                            <>
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
                            </>
                        ) : (
                            // PC: Search input, +, Chat, Profile, Cart
                            <>
                                <div className="min-w-0 shrink">
                                    <SearchInput
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="検索..."
                                        className="w-full max-w-[100px] focus:max-w-[140px] md:focus:max-w-[140px] lg:focus:max-w-[180px] xl:focus:max-w-[200px] transition-all duration-200"
                                    />
                                </div>
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                                    aria-label="追加"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                                    aria-label="チャット"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                </button>
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                                    aria-label="プロフィール"
                                >
                                    <User className="w-5 h-5" />
                                </button>
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors relative shrink-0"
                                    aria-label="カート"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {/* Cart count badge */}

                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount > 0 ? '+' : ''}{cartCount > 9 ? '9' : cartCount}
                                    </span>

                                </button>
                            </>
                        )}
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;
