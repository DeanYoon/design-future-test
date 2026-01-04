"use client";

import { useEffect, useState } from "react";
import { ProductList } from "@/components/product";
import type { Product } from "@/types/product";

const API_BASE_URL = "https://fakestoreapi.com";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Client-side fetching - runs in user's browser
    fetch(`${API_BASE_URL}/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API returned ${res.status}`);
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Expand products
  const expandedProducts =
    products.length > 0
      ? Array.from({ length: 5 }, (_, repeatIndex) =>
        products.map((product, index) => ({
          ...product,
          id: repeatIndex * 20 + index + 1,
        }))
      ).flat()
      : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-gray-600">商品を読み込んでいます...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 font-bold">エラーが発生しました</p>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-hover"
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  return <ProductList products={expandedProducts} itemsPerPage={12} />;
}



