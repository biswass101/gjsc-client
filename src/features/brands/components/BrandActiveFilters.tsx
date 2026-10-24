"use client";

import { BrandFilterDrawer, type BrandFilterState } from "./BrandFilters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatBDT } from "@/lib/catalog";
import { Grid, List, RotateCcw, X } from "lucide-react";

export type BrandSortOption =
  | "popular"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "newest";

interface BrandActiveFiltersProps {
  totalResults: number;
  filteredCount: number;
  filters: BrandFilterState;
  onFilterChange: (updates: Partial<BrandFilterState>) => void;
  onResetFilters: () => void;
  sortBy: BrandSortOption;
  onSortChange: (sort: BrandSortOption) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  priceBounds: { min: number; max: number };
  drawerProps: React.ComponentProps<typeof BrandFilterDrawer>;
}

export function BrandActiveFilters({
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
}: BrandActiveFiltersProps) {
  const hasActiveFilters =
    Boolean(filters.searchQuery) ||
    filters.selectedCategories.length > 0 ||
    filters.selectedConcerns.length > 0 ||
    filters.selectedSkinTypes.length > 0 ||
    filters.minPrice > priceBounds.min ||
    filters.maxPrice < priceBounds.max ||
    filters.inStockOnly ||
    filters.onSaleOnly ||
    filters.minRating > 0;

  return (
    <div className="space-y-3 mb-6">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Drawer Trigger */}
          <BrandFilterDrawer {...drawerProps} />

          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">{filteredCount}</span> of{" "}
            <span className="font-semibold text-foreground">{totalResults}</span> products
          </p>
        </div>

        {/* Right: Sort & View Toggle */}
        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground hidden sm:inline">Sort:</span>
            <Select
              value={sortBy}
              onValueChange={(val) => onSortChange(val as BrandSortOption)}
            >
              <SelectTrigger className="h-8 w-[145px] sm:w-[160px] text-xs rounded-full border-border bg-background cursor-pointer">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid / List Switcher */}
          <div className="flex items-center rounded-lg border border-border bg-background p-0.5">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => onViewChange("grid")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                view === "grid"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="List view"
              onClick={() => onViewChange("list")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                view === "list"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1 animate-in fade-in duration-200">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mr-1">
            Active Filters:
          </span>

          {/* Search Query */}
          {filters.searchQuery && (
            <FilterPill
              label={`"${filters.searchQuery}"`}
              onRemove={() => onFilterChange({ searchQuery: "" })}
            />
          )}

          {/* Categories */}
          {filters.selectedCategories.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              onRemove={() =>
                onFilterChange({
                  selectedCategories: filters.selectedCategories.filter((c) => c !== cat),
                })
              }
            />
          ))}

          {/* Concerns */}
          {filters.selectedConcerns.map((concern) => (
            <FilterPill
              key={concern}
              label={concern}
              onRemove={() =>
                onFilterChange({
                  selectedConcerns: filters.selectedConcerns.filter((c) => c !== concern),
                })
              }
            />
          ))}

          {/* Skin Types */}
          {filters.selectedSkinTypes.map((st) => (
            <FilterPill
              key={st}
              label={st}
              onRemove={() =>
                onFilterChange({
                  selectedSkinTypes: filters.selectedSkinTypes.filter((c) => c !== st),
                })
              }
            />
          ))}

          {/* Price Range */}
          {(filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max) && (
            <FilterPill
              label={`${formatBDT(filters.minPrice)} – ${formatBDT(filters.maxPrice)}`}
              onRemove={() =>
                onFilterChange({
                  minPrice: priceBounds.min,
                  maxPrice: priceBounds.max,
                })
              }
            />
          )}

          {/* In Stock */}
          {filters.inStockOnly && (
            <FilterPill
              label="In Stock"
              onRemove={() => onFilterChange({ inStockOnly: false })}
            />
          )}

          {/* On Sale */}
          {filters.onSaleOnly && (
            <FilterPill
              label="On Sale"
              onRemove={() => onFilterChange({ onSaleOnly: false })}
            />
          )}

          {/* Rating */}
          {filters.minRating > 0 && (
            <FilterPill
              label={`${filters.minRating}★ & Up`}
              onRemove={() => onFilterChange({ minRating: 0 })}
            />
          )}

          {/* Clear All Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-6 px-2 text-[11px] text-muted-foreground hover:text-primary gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear All</span>
          </Button>
        </div>
      )}
    </div>
  );
}

function FilterPill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary shadow-2xs">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
        className="rounded-full p-0.5 hover:bg-primary/20 text-primary cursor-pointer transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

