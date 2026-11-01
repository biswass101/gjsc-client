"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List } from "lucide-react";
import type { CatalogFilterState, CatalogSortOption, CatalogFilterProps } from "../types";
import { CatalogFilterDrawer } from "./CatalogFilters";
import { useActiveFilterPills } from "../hooks/useActiveFilterPills";
import { CatalogActivePillsStrip } from "./filters/CatalogActivePillsStrip";

export interface CatalogActiveFiltersProps {
  totalResults: number;
  filteredCount?: number;
  startIdx?: number;
  perPage?: number;
  filters: CatalogFilterState;
  onFilterChange: (updates: Partial<CatalogFilterState>) => void;
  onResetFilters: () => void;
  sortBy: CatalogSortOption;
  onSortChange: (sort: CatalogSortOption) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  priceBounds: { min: number; max: number };
  drawerTriggerSlot?: React.ReactNode;
  drawerProps?: CatalogFilterProps;
}

export function CatalogActiveFilters({
  totalResults,
  filteredCount,
  startIdx,
  perPage,
  filters,
  onFilterChange,
  onResetFilters,
  sortBy,
  onSortChange,
  view,
  onViewChange,
  priceBounds,
  drawerTriggerSlot,
  drawerProps,
}: CatalogActiveFiltersProps) {
  const effectiveFilteredCount = filteredCount ?? totalResults;
  const activePills = useActiveFilterPills(filters, onFilterChange, priceBounds);

  const hasPaging = startIdx !== undefined && perPage !== undefined;
  const endIdx = hasPaging
    ? Math.min(startIdx + perPage, effectiveFilteredCount)
    : effectiveFilteredCount;

  return (
    <div className="space-y-3">
      {/* Top Bar: Results Count + Drawer trigger + Sort + View Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-card p-3 shadow-2xs">
        <div className="flex items-center gap-3">
          {drawerTriggerSlot || (drawerProps && <CatalogFilterDrawer {...drawerProps} />)}
          <div className="text-xs text-muted-foreground">
            {effectiveFilteredCount === 0 ? (
              <span>No products found</span>
            ) : hasPaging ? (
              <span>
                Showing <strong className="text-foreground">{startIdx + 1}</strong>–
                <strong className="text-foreground">{endIdx}</strong> of{" "}
                <strong className="text-foreground">{effectiveFilteredCount}</strong> results
                {effectiveFilteredCount !== totalResults && (
                  <span className="ml-1 text-[11px] text-muted-foreground">
                    (filtered from {totalResults})
                  </span>
                )}
              </span>
            ) : (
              <span>
                Showing <strong className="text-foreground">{effectiveFilteredCount}</strong> of{" "}
                <strong className="text-foreground">{totalResults}</strong> products
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground hidden sm:inline">Sort:</span>
            <Select value={sortBy} onValueChange={(val) => onSortChange(val as CatalogSortOption)}>
              <SelectTrigger className="h-8.5 text-xs w-[150px] sm:w-[170px] rounded-lg">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="bestselling">Best Selling</SelectItem>
                <SelectItem
                  value={
                    sortBy === "price_asc" || sortBy === "price_desc" ? "price_asc" : "price-low"
                  }
                >
                  Price: Low to High
                </SelectItem>
                <SelectItem
                  value={
                    sortBy === "price_asc" || sortBy === "price_desc" ? "price_desc" : "price-high"
                  }
                >
                  Price: High to Low
                </SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                {sortBy === "curated" && (
                  <SelectItem value="curated">Curated Collection</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center border border-border/80 rounded-lg p-0.5 bg-secondary/40">
            <button
              onClick={() => onViewChange("grid")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                view === "grid"
                  ? "bg-background text-primary shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onViewChange("list")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                view === "list"
                  ? "bg-background text-primary shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="List view"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Pills Strip */}
      <CatalogActivePillsStrip activePills={activePills} onResetFilters={onResetFilters} />
    </div>
  );
}
