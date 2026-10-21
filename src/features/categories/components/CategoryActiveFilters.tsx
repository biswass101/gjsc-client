"use client";

import { LayoutGrid, List, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/catalog";
import type { CategoryFilterState } from "./CategoryFilters";
import { CategoryFilterDrawer } from "./CategoryFilters";

export type SortOption =
  | "popular"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "newest";

interface CategoryActiveFiltersProps {
  totalResults: number;
  filteredCount: number;
  filters: CategoryFilterState;
  onFilterChange: (updates: Partial<CategoryFilterState>) => void;
  onResetFilters: () => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  priceBounds: { min: number; max: number };
  drawerProps: React.ComponentProps<typeof CategoryFilterDrawer>;
}

export function CategoryActiveFilters({
  totalResults,
  filteredCount,
  filters,
  onFilterChange,
  onResetFilters,
  sortBy,
  onSortChange,
  view,
  onViewChange,
  priceBounds,
  drawerProps,
}: CategoryActiveFiltersProps) {
  // Collect active filter tags
  const activeTags: { id: string; label: string; onRemove: () => void }[] = [];

  if (filters.selectedSubcategory && filters.selectedSubcategory !== "All") {
    activeTags.push({
      id: `sub-${filters.selectedSubcategory}`,
      label: filters.selectedSubcategory,
      onRemove: () => onFilterChange({ selectedSubcategory: "All" }),
    });
  }

  filters.selectedBrands.forEach((b) => {
    activeTags.push({
      id: `b-${b}`,
      label: `Brand: ${b}`,
      onRemove: () =>
        onFilterChange({
          selectedBrands: filters.selectedBrands.filter((item) => item !== b),
        }),
    });
  });

  filters.selectedConcerns.forEach((c) => {
    activeTags.push({
      id: `c-${c}`,
      label: `Concern: ${c}`,
      onRemove: () =>
        onFilterChange({
          selectedConcerns: filters.selectedConcerns.filter((item) => item !== c),
        }),
    });
  });

  filters.selectedSkinTypes.forEach((st) => {
    activeTags.push({
      id: `st-${st}`,
      label: `Skin: ${st}`,
      onRemove: () =>
        onFilterChange({
          selectedSkinTypes: filters.selectedSkinTypes.filter((item) => item !== st),
        }),
    });
  });

  if (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max) {
    activeTags.push({
      id: "price-range",
      label: `${formatBDT(filters.minPrice)} – ${formatBDT(filters.maxPrice)}`,
      onRemove: () =>
        onFilterChange({ minPrice: priceBounds.min, maxPrice: priceBounds.max }),
    });
  }

  if (filters.inStockOnly) {
    activeTags.push({
      id: "in-stock",
      label: "In Stock Only",
      onRemove: () => onFilterChange({ inStockOnly: false }),
    });
  }

  if (filters.onSaleOnly) {
    activeTags.push({
      id: "on-sale",
      label: "On Sale",
      onRemove: () => onFilterChange({ onSaleOnly: false }),
    });
  }

  if (filters.minRating > 0) {
    activeTags.push({
      id: "min-rating",
      label: `${filters.minRating}★ & Above`,
      onRemove: () => onFilterChange({ minRating: 0 }),
    });
  }

  return (
    <div className="space-y-3 pb-4">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        {/* Left: Product count & Mobile filter button */}
        <div className="flex items-center gap-3">
          <CategoryFilterDrawer {...drawerProps} />
          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing <strong className="text-foreground font-semibold">{filteredCount}</strong> of{" "}
            {totalResults} items
          </p>
        </div>

        {/* Right: Sort and View mode */}
        <div className="flex items-center gap-2">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground hidden sm:inline">Sort:</span>
            <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
              <SelectTrigger className="h-8.5 w-[150px] sm:w-[170px] text-xs bg-card border-border/80">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center rounded-lg border border-border/80 bg-card p-0.5 shadow-xs">
            <button
              type="button"
              onClick={() => onViewChange("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                view === "grid"
                  ? "bg-secondary text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onViewChange("list")}
              className={`p-1.5 rounded-md transition-colors ${
                view === "list"
                  ? "bg-secondary text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="List view"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-medium text-muted-foreground mr-1">Active:</span>
          {activeTags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 rounded-full bg-secondary/80 border border-border px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-primary/50 transition-colors"
            >
              <span>{tag.label}</span>
              <button
                type="button"
                onClick={tag.onRemove}
                className="hover:text-rose-500 transition-colors p-0.5 rounded-full hover:bg-black/5"
                aria-label={`Remove filter ${tag.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="text-[11px] text-primary hover:underline h-7 px-2 font-semibold"
          >
            Clear all ({activeTags.length})
          </Button>
        </div>
      )}
    </div>
  );
}

