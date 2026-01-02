import type { Product } from "@/types/product";

const API_BASE_URL = "https://fakestoreapi.com";

interface FetchOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export async function getProducts(
  options: FetchOptions = {}
): Promise<Product[]> {
  // Add 3 second delay to show loading page
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Test: 50% chance of failure
  if (Math.random() < 0.5) {
    throw new Error("Failed to load products (test error)");
  }

  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      cache: options.cache ?? "no-store",
      next: options.revalidate ? { revalidate: options.revalidate } : { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Unexpected data format");
    }

    return data;
  } catch (error) {
    console.error("Product loading error:", error);

    if (error instanceof Error) {
      throw new Error(`Failed to load products: ${error.message}`);
    }

    throw new Error("Failed to load products");
  }
}
