import React from "react";
import { FolderTree, Layers, Sparkles } from "lucide-react";
import { PARENT_CATEGORIES } from "../constants";

interface CategoriesKpiCardsProps {
  totalCategories: number;
  totalSubcategories: number;
  featuredCount: number;
  avgProductsPerCat: number;
}

export function CategoriesKpiCards({
  totalCategories,
  totalSubcategories,
  featuredCount,
  avgProductsPerCat,
}: CategoriesKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Total Categories</span>
          <FolderTree className="h-4 w-4 text-primary" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{totalCategories}</p>
        <p className="text-[11px] text-muted-foreground mt-1">
          Across {PARENT_CATEGORIES.length} parent groups
        </p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Active Subcategories</span>
          <Layers className="h-4 w-4 text-indigo-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{totalSubcategories}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Deep-link navigation tags</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Featured on Home</span>
          <Sparkles className="h-4 w-4 text-amber-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{featuredCount}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Highlighted in storefront grid</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Avg Products / Cat</span>
          <Layers className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{avgProductsPerCat}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Tokyo inventory distribution</p>
      </div>
    </div>
  );
}
