import React from "react";
import { Sparkles, Flame, Tag, Layers } from "lucide-react";

interface CollectionsKpiCardsProps {
  totalCollections: number;
  featuredCount: number;
  totalKeywords: number;
  totalBundledSkus: number;
}

export function CollectionsKpiCards({
  totalCollections,
  featuredCount,
  totalKeywords,
  totalBundledSkus,
}: CollectionsKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Active Collections</span>
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{totalCollections}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Storefront themed landing pages</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Featured on Home</span>
          <Flame className="h-4 w-4 text-amber-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{featuredCount}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Homepage hero showcase</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Search Keywords</span>
          <Tag className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{totalKeywords}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Search auto-suggest tags</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Total Bundled SKUs</span>
          <Layers className="h-4 w-4 text-indigo-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{totalBundledSkus}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Cross-sell product links</p>
      </div>
    </div>
  );
}
