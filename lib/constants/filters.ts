import type { Key } from "react";

// Initial state for all filter options
export const INITIAL_FILTER_STATE = {
    circular: [] as Key[],
    brand: [] as string[],
    collection: [] as string[],
    series: ["すべて"],
    usageLocation: ["すべて"],
    price: ["すべて"],
    color: ["すべて"],
    colorTone: ["すべて"],
    pattern: ["すべて"],
    size: ["すべて"],
    stockStatus: ["すべて"],
    surfaceGloss: ["すべて"],
    design: ["すべて"],
    csr: ["すべて"],
    performance: ["すべて"],
    fireResistance: ["すべて"],
    buildingType: ["すべて"],
    purpose: ["すべて"],
    productionPlace: ["すべて"],
    productionPrefecture: ["すべて"],
    certification: ["すべて"],
    woodType: ["すべて"],
    grainType: ["すべて"],
    wear: ["すべて"],
};

export type FilterState = typeof INITIAL_FILTER_STATE;

