"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BRANDS, CATEGORIES } from "@/lib/catalog";

export interface ProductFiltersToolbarProps {
  q: string;
  onQChange: (val: string) => void;
  selectedBrand: string;
  onBrandChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  selectedStockStatus: "All" | "in" | "low" | "out";
  onStockStatusChange: (val: "All" | "in" | "low" | "out") => void;
  selectedBadge: string;
  onBadgeChange: (val: string) => void;
  sort: string;
  onSortChange: (val: string) => void;
}

export function ProductFiltersToolbar({
  q,
  onQChange,
  selectedBrand,
  onBrandChange,
  selectedCategory,
  onCategoryChange,
  selectedStockStatus,
  onStockStatusChange,
  selectedBadge,
  onBadgeChange,
  sort,
  onSortChange,
}: ProductFiltersToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => onQChange(e.target.value)}
          placeholder="Search by title, brand, or SKU code..."
          className="pl-9 h-9 rounded-full text-xs"
        />
        {q && (
          <button
            type="button"
            onClick={() => onQChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Brand Filter */}
        <select
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
          className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
        >
          <option value="All">All Brands ({BRANDS.length})</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Stock Status Filter */}
        <select
          value={selectedStockStatus}
          onChange={(e) => onStockStatusChange(e.target.value as "All" | "in" | "low" | "out")}
          className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
        >
          <option value="All">All Stock Levels</option>
          <option value="in">In Stock (&gt; 5)</option>
          <option value="low">Low Stock (≤ 5)</option>
          <option value="out">Out of Stock (0)</option>
        </select>

        {/* Badges Filter */}
        <select
          value={selectedBadge}
          onChange={(e) => onBadgeChange(e.target.value)}
          className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
        >
          <option value="All">All Badges</option>
          <option value="Best Seller">Best Seller</option>
          <option value="Flash Sale">Flash Sale</option>
          <option value="Trending">Trending</option>
          <option value="New">New</option>
          <option value="Exclusive">Exclusive</option>
          <option value="None">No Badge</option>
        </select>

        {/* Sort Selector */}
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs font-semibold"
        >
          <option value="newest">Sort: Newest</option>
          <option value="velocity">Sort: Sales Velocity</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="stock_asc">Stock: Low to High</option>
          <option value="name_asc">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
}
