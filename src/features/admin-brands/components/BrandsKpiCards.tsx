import React from "react";
import { Award, MapPin, Sparkles, Layers } from "lucide-react";

interface BrandsKpiCardsProps {
  totalCount: number;
  tokyoCount: number;
  featuredCount: number;
  totalProducts: number;
}

export function BrandsKpiCards({
  totalCount,
  tokyoCount,
  featuredCount,
  totalProducts,
}: BrandsKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Total Brands</span>
          <Award className="h-4 w-4 text-primary" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{totalCount}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Official Japanese cosmetics houses</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Tokyo Origins</span>
          <MapPin className="h-4 w-4 text-blue-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{tokyoCount}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Tokyo prefecture headquarters</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Featured Brands</span>
          <Sparkles className="h-4 w-4 text-amber-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{featuredCount}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Highlighted on homepage carousel</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Total Catalog SKUs</span>
          <Layers className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{totalProducts}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Verified authentic products</p>
      </div>
    </div>
  );
}
