"use client";

import { Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreOrderToolbarProps {
  brands: string[];
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function PreOrderToolbar({
  brands,
  selectedBrand,
  onSelectBrand,
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortByChange,
  view,
  onViewChange,
}: PreOrderToolbarProps) {
  return (
    <div className="sticky top-16 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md shadow-2xs py-3">
      <div className="container-lux">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Brand Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase mr-1 hidden sm:inline">
              Brand:
            </span>
            {brands.map((b) => {
              const active = selectedBrand === b;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => onSelectBrand(b)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  {b}
                </button>
              );
            })}
          </div>

          {/* Sort & View Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="h-8 rounded-full border border-border bg-background px-3 text-xs font-medium cursor-pointer"
            >
              <option value="popular">Most In-Demand</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="flex items-center rounded-lg border border-border bg-background p-0.5">
              <button
                type="button"
                onClick={() => onViewChange("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-colors cursor-pointer",
                  view === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Grid className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onViewChange("list")}
                className={cn(
                  "p-1.5 rounded-md transition-colors cursor-pointer",
                  view === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        {categories.length > 2 && (
          <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase mr-1">
              Category:
            </span>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={cn(
                    "px-2.5 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer",
                    active
                      ? "bg-primary/15 text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

