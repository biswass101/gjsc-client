"use client";

import React from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface FlashSaleFilterSortProps {
  dealCount: number;
  brands: string[];
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
}

export function FlashSaleFilterSort({
  dealCount,
  brands,
  selectedBrand,
  onSelectBrand,
  sortBy,
  onSortByChange,
}: FlashSaleFilterSortProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-b border-border/60">
      {/* Brands Pills */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
        <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap flex items-center gap-1.5 mr-1">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Brands:</span>
        </span>

        {brands.map((b) => (
          <button
            key={b}
            onClick={() => onSelectBrand(b)}
            className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedBrand === b
                ? "bg-rose-600 text-white font-semibold shadow-xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Counter & Sort Selector */}
      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
        <span className="text-xs text-muted-foreground font-medium">
          Showing <strong className="text-foreground">{dealCount}</strong> flash drops
        </span>

        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="rounded-lg border border-border/80 bg-card px-2.5 py-1 text-xs font-medium text-foreground outline-hidden focus:border-rose-500 cursor-pointer"
          >
            <option value="discount">Deepest Discount %</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="claimed">Most Claimed (Urgency)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

