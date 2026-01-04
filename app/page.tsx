import { ProductList } from "@/components/product";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  // Expand 20 products by repeating 5 times to get 100 products
  const expandedProducts = Array.from({ length: 5 }, (_, repeatIndex) =>
    products.map((product, index) => ({
      ...product,
      id: repeatIndex * 20 + index + 1,
    }))
  ).flat();

  return <ProductList products={expandedProducts} itemsPerPage={12} />;
}



