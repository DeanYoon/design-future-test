export const PRODUCT_COLORS = [
    { id: "white", label: "白", hex: "#FFFFFF", isLight: true },
    { id: "black", label: "黒", hex: "#111827", isLight: false },
    { id: "red", label: "赤", hex: "#EF4444", isLight: false },
    { id: "blue", label: "青", hex: "#3B82F6", isLight: false },
    { id: "green", label: "緑", hex: "#22C55E", isLight: false },
    { id: "yellow", label: "黄", hex: "#FACC15", isLight: true },
    { id: "orange", label: "橙", hex: "#F97316", isLight: false },
    { id: "purple", label: "紫", hex: "#A855F7", isLight: false },
    { id: "gray", label: "灰", hex: "#9CA3AF", isLight: true },
] as const;

export type ProductColorId = (typeof PRODUCT_COLORS)[number]["id"];

/**
 * FakeStoreAPI products have no color field.
 * We derive a stable pseudo-color from the product id so the UI can still filter.
 */
export function getDerivedProductColorId(productId: number): ProductColorId {
    const idx = Math.abs(productId) % PRODUCT_COLORS.length;
    return PRODUCT_COLORS[idx]!.id;
}


