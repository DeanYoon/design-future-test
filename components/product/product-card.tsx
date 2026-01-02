"use client";

import Image from "next/image";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div className="rounded-lg overflow-hidden bg-[#F5F5F5] hover:shadow-lg transition-shadow p-1">
            <div className="relative w-full aspect-square  rounded-lg">
                <div className="border rounded-full px-2 py-1 text-[8px] absolute text-red-700 font-bold bg-[#FFF1F3] border-[#FECDD6] top-2 left-2 z-10">
                    新しい
                </div>
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-sm hover:shadow-md transition-shadow border-[#D5D7DA]"
                >
                    <Bookmark
                        className={`w-4 h-4 transition-colors ${isBookmarked ? "text-black fill-black" : "text-gray-700"
                            }`}
                    />
                </button>
            </div>
            <div className="my-2 flex items-center gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Image
                        key={i}
                        src="/images/image.png"
                        alt="Design Future Logo"
                        width={14}
                        height={14}
                        priority
                        className="rounded"
                    />
                ))}
                <span className="text-xs text-gray-600">+ 123</span>
            </div>
            <div className="">
                <h3 className="font-semibold text-sm  line-clamp-1">{product.title}</h3>
                <p className="text-xs text-gray-500 ">{product.category}</p>
                <p className="text-xs text-gray-500 mb-1">{product.price}</p>

            </div>


            <div className="flex flex-col gap-1">
                <button className="w-full rounded-full bg-white border-gray-200 border text-xs py-1">比較する</button>
                <button className="w-full rounded-full bg-[#4D4E58] border-gray-200 border text-xs py-1 text-white">カートに追加</button>
            </div>
        </div>
    );
}

