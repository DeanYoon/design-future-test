import type { FilterState } from "../constants/filters";
import { getActiveFilterCount } from "./filter-counter";

// Data structure for logging filter selections
interface FilterLogData {
    searchQuery: string; // Current search query
    selectedItems: string[]; // Selected tag items
    isToggleOn: boolean; // Sustainable toggle state
    filters: FilterState; // All filter selections
}

// Log all filter data to console with Japanese labels
export function logFilterData({
    searchQuery,
    selectedItems,
    isToggleOn,
    filters,
}: FilterLogData) {
    const filterData = {
        検索クエリ: searchQuery,
        選択済みアイテム: selectedItems,
        サステナブル: isToggleOn,
        サーキュラー: filters.circular,
        ブランド: filters.brand,
        コレクション: filters.collection,
        シリーズ: filters.series,
        使用箇所: filters.usageLocation,
        "価格/㎡": filters.price,
        カラー: filters.color,
        カラートーン: filters.colorTone,
        "柄・特徴": filters.pattern,
        "サイズ(長辺)": filters.size,
        "生産区分・在庫状況": filters.stockStatus,
        表面光沢: filters.surfaceGloss,
        デザイン: filters.design,
        "滑り抵抗係数 (C.S.R)": filters.csr,
        性能特性: filters.performance,
        "防火・耐火・防炎": filters.fireResistance,
        "商業&公共・住宅": filters.buildingType,
        用途: filters.purpose,
        "製造・生産地": filters.productionPlace,
        "製造・生産県": filters.productionPrefecture,
        "認証・規格・認定": filters.certification,
        "木の種類/樹種": filters.woodType,
        木目の種類: filters.grainType,
        "摩耗(Martindale)": filters.wear,
        タイムスタンプ: new Date().toISOString(),
    };

    const activeFilterCount = getActiveFilterCount(
        searchQuery,
        selectedItems,
        isToggleOn,
        filters
    );

    console.log("=== 全フィルター選択値 ===", filterData);
    console.log(`適用されたフィルター数: ${activeFilterCount}`);
}

