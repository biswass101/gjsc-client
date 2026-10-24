"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatBDT } from "@/lib/catalog";
import { LayoutGrid, List, RotateCcw, X } from "lucide-react";
import type { ShopFilterState } from "./ShopFilters";

export type ShopSortOption =
  | "popular"
  | "bestselling"
  | "price-low"
  | "price-high"
  | "rating"
  | "newest";

interface ShopActiveFiltersProps {
  totalResults: number;
  filteredCount: number;
  startIdx: number;
  perPage: number;
  filters: ShopFilterState;
  onFilterChange: (updates: Partial<ShopFilterState>) => void;
  onResetFilters: () => void;
  sortBy: ShopSortOption;
  onSortChange: (sort: ShopSortOption) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  priceBounds: { min: number; max: number };
  drawerTriggerSlot?: React.ReactNode;
}

export function ShopActiveFilters({
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
}: ShopActiveFiltersProps) {
  // Collect active filter tags
  const activePills: { label: string; onRemove: () => void }[] = [];

  if (filters.searchQuery.trim()) {
    activePills.push({
      label: `"${filters.searchQuery}"`,
      onRemove: () => onFilterChange({ searchQuery: "" }),
    });
  }

  filters.selectedCategories.forEach((cat) => {
    activePills.push({
      label: cat,
      onRemove: () =>
        onFilterChange({
          selectedCategories: filters.selectedCategories.filter((c) => c !== cat),
        }),
    });
  });

  filters.selectedBrands.forEach((b) => {
    activePills.push({
      label: b,
      onRemove: () =>
        onFilterChange({
          selectedBrands: filters.selectedBrands.filter((brand) => brand !== b),
        }),
    });
  });

  filters.selectedConcerns.forEach((c) => {
    activePills.push({
      label: c,
      onRemove: () =>
        onFilterChange({
          selectedConcerns: filters.selectedConcerns.filter((con) => con !== c),
        }),
    });
  });

  filters.selectedSkinTypes.forEach((t) => {
    activePills.push({
      label: t,
      onRemove: () =>
        onFilterChange({
          selectedSkinTypes: filters.selectedSkinTypes.filter((type) => type !== t),
        }),
    });
  });

  filters.selectedBadges.forEach((b) => {
    activePills.push({
      label: b,
      onRemove: () =>
        onFilterChange({
          selectedBadges: filters.selectedBadges.filter((badge) => badge !== b),
        }),
    });
  });

  if (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max) {
    activePills.push({
      label: `${formatBDT(filters.minPrice)} – ${formatBDT(filters.maxPrice)}`,
      onRemove: () =>
        onFilterChange({ minPrice: priceBounds.min, maxPrice: priceBounds.max }),
    });
  }

  if (filters.inStockOnly) {
    activePills.push({
      label: "In Stock Only",
      onRemove: () => onFilterChange({ inStockOnly: false }),
    });
  }

  if (filters.onSaleOnly) {
    activePills.push({
      label: "On Sale",
      onRemove: () => onFilterChange({ onSaleOnly: false }),
    });
  }

  if (filters.minRating > 0) {
    activePills.push({
      label: `${filters.minRating}★ & Up`,
      onRemove: () => onFilterChange({ minRating: 0 }),
    });
  }

  return (
    <div className="space-y-3 mb-6">
      {/* Top Toolbar: Results count, mobile drawer trigger, Sort By, Grid/List view */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-3">
          {drawerTriggerSlot}
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Showing{" "}
            {filteredCount > 0 ? (
              <>
                <span className="font-semibold text-foreground">
                  {startIdx + 1}–{Math.min(startIdx + perPage, filteredCount)}
                </span>{" "}
                of{" "}
              </>
            ) : null}
            <span className="font-semibold text-foreground">{filteredCount}</span>{" "}
            {filteredCount === 1 ? "product" : "products"}
            {filteredCount !== totalResults && (
              <span className="text-muted-foreground/70 hidden sm:inline">
                {" "}
                (filtered from {totalResults})
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline-block text-xs text-muted-foreground">
              Sort by:
            </span>
            <Select
              value={sortBy}
              onValueChange={(val) => onSortChange(val as ShopSortOption)}
            >
              <SelectTrigger className="h-8.5 w-[140px] sm:w-[170px] rounded-full border-border/80 text-xs bg-card cursor-pointer">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="popular">Curated & Featured</SelectItem>
                <SelectItem value="bestselling">Best Selling</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid/List View Toggle */}
          <div className="hidden sm:flex items-center rounded-lg border border-border/80 bg-card p-0.5 shadow-2xs">
            <button
              onClick={() => onViewChange("grid")}
              className={`grid h-7 w-7 place-items-center rounded-md transition-colors cursor-pointer ${
                view === "grid"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid view"
              aria-label="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onViewChange("list")}
              className={`grid h-7 w-7 place-items-center rounded-md transition-colors cursor-pointer ${
                view === "list"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="List view"
              aria-label="List view"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activePills.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 animate-in fade-in duration-150">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Active:
          </span>

          {activePills.map((pill, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary shadow-2xs"
            >
              <span>{pill.label}</span>
              <button
                onClick={pill.onRemove}
                className="hover:opacity-75 cursor-pointer ml-0.5 p-0.5 rounded-full hover:bg-primary/20 transition-colors"
                title={`Remove ${pill.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-6 px-2 text-[11px] text-muted-foreground hover:text-primary cursor-pointer gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear All</span>
          </Button>
        </div>
      )}
    </div>
  );
}

