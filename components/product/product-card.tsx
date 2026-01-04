"use client";

import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/contexts/cart-context";

interface ProductCardProps {
    product: Product;
    index?: number;
    isMobile?: boolean;
    gridCols?: number;
}

export function ProductCard({
    product,
    index = 0,
    isMobile = true,
    gridCols = 2
}: ProductCardProps) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const { addToCart } = useCart();

    // Show badge only on first column (index % cols === 0)
    const showBadge = index % gridCols === 0;

    return (
        <div className="rounded-xl  overflow-hidden bg-card-bg hover:shadow-lg transition-shadow p-1 lg:p-2">
            <div className="group relative w-full aspect-square rounded-xl overflow-hidden">
                {/* Badge - only first column, hide on hover (PC) to avoid overlap with checkbox */}
                {showBadge && (
                    <div className={`border rounded-full px-2 py-1 text-[12%] md:text-[10px] absolute text-red-700 font-bold bg-badge-bg border-badge-border top-2 left-2 z-20 transition-opacity ${!isMobile ? "group-hover:opacity-0" : ""
                        }`}>
                        新しい
                    </div>
                )}

                {/* Image with hover overlay */}
                <div className="relative w-full h-full ">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className={`object-contain p-4 transition-opacity ${!isMobile ? "group-hover:opacity-70" : ""
                            }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Dark overlay on hover (PC only) */}
                    {!isMobile && (
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
                    )}
                </div>

                {/* MOBILE: Bookmark button - bottom right, always visible */}
                {isMobile && (
                    <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className="absolute bottom-2 right-2 z-20 rounded-full bg-white p-2 shadow-sm hover:shadow-md transition-shadow border-border-light"
                        aria-label="ブックマーク"
                    >
                        <Bookmark
                            className={`w-4 h-4 transition-colors ${isBookmarked ? "text-black fill-black" : "text-gray-700"
                                }`}
                        />
                    </button>
                )}

                {/* PC: Checkbox - top left, visible on hover */}
                {!isMobile && (
                    <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="w-5 h-5 rounded border-2 border-white shadow-md cursor-pointer"
                            aria-label="商品を選択"
                        />
                    </div>
                )}

                {/* PC: Heart button - top right, visible on hover */}
                {!isMobile && (
                    <button
                        onClick={() => setIsFavorited(!isFavorited)}
                        className="absolute top-2 right-2 z-20 rounded-full bg-white p-2 px-4 shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
                        aria-label="お気に入りに追加"
                    >
                        保存
                    </button>
                )}
            </div>

            {/* Thumbnail previews */}
            <div className="my-2 flex items-center gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Image
                        key={i}
                        src="/images/image.png"
                        alt="Design Future Logo"
                        width={18}
                        height={18}
                        priority
                        className="rounded"
                    />
                ))}
                <span className="text-xs text-gray-600">+ 123</span>
            </div>

            {/* Product info */}
            <div className=" flex flex-col gap-1">
                <div className="font-bold text-sm line-clamp-1">{product.title}</div>
                <div className="text-xs text-gray-500">{product.category}</div>
                <div className="text-xs text-gray-500 mb-1">${product.price}</div>
            </div>

            {/* Add to cart button (+ compare button on mobile) */}
            <div className="flex flex-col gap-1">
                {isMobile && (
                    <button className="w-full rounded-full bg-white border-gray-200 border text-xs py-1 hover:bg-gray-50 transition-colors">
                        比較する
                    </button>
                )}
                <button
                    onClick={addToCart}
                    className="w-full rounded-full bg-primary border-gray-200 border text-xs py-1 md:py-2 text-white! hover:bg-primary-hover transition-colors"
                >
                    カートに追加
                </button>
            </div>
        </div>
    );
}

