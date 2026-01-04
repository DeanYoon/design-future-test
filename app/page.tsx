"use client";

import { ProductList } from "@/components/product";
import { useProducts } from "@/hooks";

export default function Home() {
  const { products, loading, error, refetch } = useProducts();

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
            onClick={refetch}
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



