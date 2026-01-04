"use client";

import { Accordion, SearchInput } from "@/components/ui";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import { useEffect, useMemo, useState } from "react";
import type { Key } from "react";

type TreeNode = {
    id: string;
    label: string;
    children?: TreeNode[];
};

function toAntdTreeData(nodes: TreeNode[]): DataNode[] {
    return nodes.map((node) => ({
        key: node.id,
        title: node.label,
        children: node.children?.length ? toAntdTreeData(node.children) : undefined,
    }));
}

function buildDescendantKeyMap(nodes: TreeNode[]) {
    const map: Record<string, string[]> = {};

    const walk = (node: TreeNode) => {
        const descendants: string[] = [];
        for (const child of node.children ?? []) {
            descendants.push(child.id);
            walk(child);
            descendants.push(...(map[child.id] ?? []));
        }
        map[node.id] = descendants;
    };

    nodes.forEach(walk);
    return map;
}

function filterTree(nodes: TreeNode[], keyword: string): TreeNode[] {
    const q = keyword.trim().toLowerCase();
    if (!q) return nodes;

    const walk = (node: TreeNode): TreeNode | null => {
        const label = node.label.toLowerCase();
        const isMatch = label.includes(q);

        // If current node matches, keep the whole subtree (easier UX for selecting).
        if (isMatch) return node;

        const children = (node.children ?? [])
            .map(walk)
            .filter(Boolean) as TreeNode[];

        if (children.length === 0) return null;
        return { ...node, children };
    };

    return nodes.map(walk).filter(Boolean) as TreeNode[];
}

function collectExpandableKeys(nodes: TreeNode[]): Key[] {
    const keys: Key[] = [];

    const walk = (node: TreeNode) => {
        if (node.children && node.children.length > 0) {
            keys.push(node.id);
            node.children.forEach(walk);
        }
    };

    nodes.forEach(walk);
    return keys;
}

interface CircularFilterProps {
    selectedValues?: Key[];
    onValueChange?: (values: Key[]) => void;
}

export function CircularFilter({ selectedValues, onValueChange }: CircularFilterProps) {
    const [searchText, setSearchText] = useState("");
    const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
    const [manualExpandedKeys, setManualExpandedKeys] = useState<Key[]>([]);
    const [internalCheckedKeys, setInternalCheckedKeys] = useState<Key[]>([]);

    const checkedKeys = selectedValues ?? internalCheckedKeys;

    const isSearching = searchText.trim().length > 0;
    const filteredTreeData = useMemo(() => filterTree(treeData, searchText), [searchText]);
    const antdTreeData = useMemo(() => toAntdTreeData(filteredTreeData), [filteredTreeData]);
    const autoExpandedKeys = useMemo(() => collectExpandableKeys(filteredTreeData), [filteredTreeData]);
    const descendantKeyMap = useMemo(() => buildDescendantKeyMap(filteredTreeData), [filteredTreeData]);

    useEffect(() => {
        if (isSearching) setExpandedKeys(autoExpandedKeys);
        else setExpandedKeys(manualExpandedKeys);
    }, [isSearching, autoExpandedKeys, manualExpandedKeys]);

    const toggleExpandedKey = (key: Key) => {
        setExpandedKeys((prev) => {
            const keyStr = String(key);
            const isOpen = prev.includes(key);

            // When closing a parent, remove ALL its descendant expanded keys too.
            const descendants = descendantKeyMap[keyStr] ?? [];

            const next = isOpen
                ? prev.filter((k) => k !== key && !descendants.includes(String(k)))
                : [...prev, key];

            if (!isSearching) setManualExpandedKeys(next);
            return next;
        });
    };

    return (
        <Accordion title="サーキュラー" showInfo={true}>
            <div className="pb-3">
                <SearchInput
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="検索..."
                />
            </div>
            <Tree
                className="circular-tree"
                checkable
                selectable={false}
                treeData={antdTreeData}
                checkedKeys={checkedKeys}
                expandedKeys={expandedKeys}
                autoExpandParent={isSearching}
                onExpand={(keys) => {
                    const next = keys as Key[];
                    setExpandedKeys(next);
                    if (!isSearching) setManualExpandedKeys(next);
                }}
                onCheck={(keys) => {
                    const newKeys = (Array.isArray(keys) ? keys : keys.checked) as Key[];
                    if (!selectedValues) {
                        setInternalCheckedKeys(newKeys);
                    }
                    onValueChange?.(newKeys);
                }}
                switcherIcon={null}
                titleRender={(node) => {
                    const key = node.key as Key;
                    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
                    const isExpanded = expandedKeys.includes(key);

                    return (
                        <div className="flex items-center justify-between gap-2 min-w-0 w-full">
                            <span className="text-sm text-gray-900 truncate">{String(node.title)}</span>
                            {hasChildren ? (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleExpandedKey(key);
                                    }}
                                    className="w-6 h-6 grid place-items-center rounded transition-colors shrink-0"
                                    aria-label={isExpanded ? "Collapse" : "Expand"}
                                >
                                    {isExpanded ? (
                                        <ChevronUp className="w-4 h-4 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-gray-600" />
                                    )}
                                </button>
                            ) : (
                                <span className="w-6 h-6 inline-block shrink-0" />
                            )}
                        </div>
                    );
                }}
            />
        </Accordion>
    );
}

const treeData: TreeNode[] = [
    {
        id: "parent1",
        label: "サーキュラー1",
        children: [
            {
                id: "child1-1",
                label: "子1-1",
                children: [
                    { id: "grandchild1-1-1", label: "孫1-1-1" },
                    { id: "grandchild1-1-2", label: "孫1-1-2" },
                ],
            },
            {
                id: "child1-2",
                label: "子1-2",
                children: [
                    { id: "grandchild1-2-1", label: "孫1-2-1" },
                    { id: "grandchild1-2-2", label: "孫1-2-2" },
                ],
            },
        ],
    },
    {
        id: "parent2",
        label: "サーキュラー2",
        children: [
            {
                id: "child2-1",
                label: "子2-1",
                children: [
                    { id: "grandchild2-1-1", label: "孫2-1-1" },
                    { id: "grandchild2-1-2", label: "孫2-1-2" },
                ],
            },
        ],
    },
    {
        id: "parent3",
        label: "サーキュラー3",
        children: [],
    },
];

