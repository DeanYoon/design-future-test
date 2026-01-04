"use client";

import { SearchInput, Toggle, Tag } from "@/components/ui";
import {
    CircularFilter,
    BrandFilter,
    CollectionFilter,
    OtherFilter,
} from "./filters";
import { logFilterData } from "@/lib/utils/filter-logger";
import { useFilters } from "@/contexts/filter-context";

interface FilterContentProps {
    onApply?: () => void;
}

export function FilterContent({ onApply }: FilterContentProps) {
    const {
        searchQuery,
        setSearchQuery,
        selectedItems,
        setSelectedItems,
        toggleOn,
        setToggleOn,
        filters,
        updateFilter,
    } = useFilters();

    // Add search query as a tag when Enter is pressed
    const handleSearch = (value: string) => {
        const trimmedQuery = value.trim();
        if (trimmedQuery && !selectedItems.includes(trimmedQuery)) {
            setSelectedItems([...selectedItems, trimmedQuery]);
            setSearchQuery(""); // Clear search input
        }
    };

    // Remove a specific tag item
    const handleRemoveItem = (item: string) => {
        setSelectedItems(selectedItems.filter((i) => i !== item));
    };

    // Clear all tag items
    const handleClearAll = () => {
        setSelectedItems([]);
    };

    // Log all filter data and trigger apply callback
    const handleApply = () => {
        logFilterData({
            searchQuery,
            selectedItems,
            isToggleOn: toggleOn,
            filters,
        });
        onApply?.();
    };

    return (
        <div className="space-y-0">
            {/* Search Input - Add tags by typing and pressing Enter */}
            <div className="pb-4">
                <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onEnter={handleSearch}
                    placeholder="検索..."
                    className="max-w-[calc(100%-50px)] md:max-w-full"
                />
            </div>

            {/* Sustainable Toggle - Filter eco-friendly products */}
            <div className="pb-4 ">
                <Toggle
                    checked={toggleOn}
                    onChange={(checked) => setToggleOn(checked)}
                    label="サステナブル"
                    checkedColor="bg-green-500"
                    labelColor={{
                        checked: "text-green-600",
                        unchecked: "text-black",
                    }}
                />
            </div>

            {/* Selected Items Tags - Display removable tags */}
            {selectedItems.length > 0 && (
                <div className=" space-y-2 ">
                    <div className="flex flex-wrap gap-2 items-center">
                        {selectedItems.map((item) => (
                            <Tag
                                key={item}
                                onRemove={() => handleRemoveItem(item)}
                            >
                                {item}
                            </Tag>
                        ))}
                        <button
                            onClick={handleClearAll}
                            className="text-xs text-gray-500 hover:text-gray-700  whitespace-nowrap"
                        >
                            すべてクリア
                        </button>
                    </div>
                </div>
            )}

            {/* All Filter Sections - Circular, Brand, Collection, and Others */}
            <div className="space-y-0">
                <CircularFilter
                    selectedValues={filters.circular}
                    onValueChange={(v) => updateFilter("circular", v)}
                />
                <BrandFilter
                    selectedValues={filters.brand}
                    onValueChange={(v) => updateFilter("brand", v)}
                />
                <CollectionFilter
                    selectedValues={filters.collection}
                    onValueChange={(v) => updateFilter("collection", v)}
                />

                <OtherFilter
                    title="シリーズ"
                    options={["すべて", "シリーズ1", "シリーズ2", "シリーズ3"]}
                    selectedValues={filters.series}
                    onValueChange={(v) => updateFilter("series", v)}
                />
                <OtherFilter
                    title="使用箇所"
                    options={["すべて", "使用箇所1", "使用箇所2", "使用箇所3"]}
                    selectedValues={filters.usageLocation}
                    onValueChange={(v) => updateFilter("usageLocation", v)}
                />
                <OtherFilter
                    title="価格/㎡"
                    type="radio"
                    options={[
                        "すべて",
                        "¥0 - ¥1,000/㎡",
                        "¥1,000 - ¥5,000/㎡",
                        "¥5,000以上/㎡",
                    ]}
                    selectedValues={filters.price}
                    onValueChange={(v) => updateFilter("price", v)}
                />
                <OtherFilter
                    title="カラー"
                    options={["すべて", "カラー1", "カラー2", "カラー3"]}
                    selectedValues={filters.color}
                    onValueChange={(v) => updateFilter("color", v)}
                />
                <OtherFilter
                    title="カラートーン"
                    options={["すべて", "トーン1", "トーン2", "トーン3"]}
                    selectedValues={filters.colorTone}
                    onValueChange={(v) => updateFilter("colorTone", v)}
                />
                <OtherFilter
                    title="柄・特徴"
                    options={["すべて", "柄1", "柄2", "柄3"]}
                    selectedValues={filters.pattern}
                    onValueChange={(v) => updateFilter("pattern", v)}
                />
                <OtherFilter
                    title="サイズ(長辺)"
                    options={["すべて", "サイズ1", "サイズ2", "サイズ3"]}
                    selectedValues={filters.size}
                    onValueChange={(v) => updateFilter("size", v)}
                />
                <OtherFilter
                    title="生産区分・在庫状況"
                    options={["すべて", "在庫あり", "在庫なし", "生産中"]}
                    selectedValues={filters.stockStatus}
                    onValueChange={(v) => updateFilter("stockStatus", v)}
                />
                <OtherFilter
                    title="表面光沢"
                    options={["すべて", "光沢あり", "光沢なし", "半光沢"]}
                    selectedValues={filters.surfaceGloss}
                    onValueChange={(v) => updateFilter("surfaceGloss", v)}
                />
                <OtherFilter
                    title="デザイン"
                    options={["すべて", "デザイン1", "デザイン2", "デザイン3"]}
                    selectedValues={filters.design}
                    onValueChange={(v) => updateFilter("design", v)}
                />
                <OtherFilter
                    title="滑り抵抗係数 (C.S.R)"
                    options={["すべて", "C.S.R1", "C.S.R2", "C.S.R3"]}
                    selectedValues={filters.csr}
                    onValueChange={(v) => updateFilter("csr", v)}
                />
                <OtherFilter
                    title="性能特性"
                    options={["すべて", "特性1", "特性2", "特性3"]}
                    selectedValues={filters.performance}
                    onValueChange={(v) => updateFilter("performance", v)}
                />
                <OtherFilter
                    title="防火・耐火・防炎"
                    options={["すべて", "防火", "耐火", "防炎"]}
                    selectedValues={filters.fireResistance}
                    onValueChange={(v) => updateFilter("fireResistance", v)}
                />
                <OtherFilter
                    title="商業&公共・住宅"
                    options={["すべて", "商業", "公共", "住宅"]}
                    selectedValues={filters.buildingType}
                    onValueChange={(v) => updateFilter("buildingType", v)}
                />
                <OtherFilter
                    title="用途"
                    options={["すべて", "用途1", "用途2", "用途3"]}
                    selectedValues={filters.purpose}
                    onValueChange={(v) => updateFilter("purpose", v)}
                />
                <OtherFilter
                    title="製造・生産地"
                    options={["すべて", "生産地1", "生産地2", "生産地3"]}
                    selectedValues={filters.productionPlace}
                    onValueChange={(v) => updateFilter("productionPlace", v)}
                />
                <OtherFilter
                    title="製造・生産県"
                    options={["すべて", "県1", "県2", "県3"]}
                    selectedValues={filters.productionPrefecture}
                    onValueChange={(v) => updateFilter("productionPrefecture", v)}
                />
                <OtherFilter
                    title="認証・規格・認定"
                    options={["すべて", "認証1", "認証2", "認証3"]}
                    selectedValues={filters.certification}
                    onValueChange={(v) => updateFilter("certification", v)}
                />
                <OtherFilter
                    title="木の種類/樹種"
                    options={["すべて", "樹種1", "樹種2", "樹種3"]}
                    selectedValues={filters.woodType}
                    onValueChange={(v) => updateFilter("woodType", v)}
                />
                <OtherFilter
                    title="木目の種類"
                    options={["すべて", "木目1", "木目2", "木目3"]}
                    selectedValues={filters.grainType}
                    onValueChange={(v) => updateFilter("grainType", v)}
                />
                <OtherFilter
                    title="摩耗(Martindale)"
                    options={["すべて", "摩耗1", "摩耗2", "摩耗3"]}
                    className="border-none"
                    selectedValues={filters.wear}
                    onValueChange={(v) => updateFilter("wear", v)}
                />
            </div>

            {/* Apply Button - Mobile only, logs all filter data */}
            <div className="pt-4 border-t border-gray-200  text-white md:hidden">
                <button
                    className="w-full rounded-full bg-primary   py-3 text-sm font-medium "
                    onClick={handleApply}
                >
                    適用
                </button>
            </div>
        </div>
    );
}

