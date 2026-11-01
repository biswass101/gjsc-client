"use client";

import { CheckCircle2, Eye, Film, ShoppingBag } from "lucide-react";

export interface VideoStatsProps {
  totalCount: number;
  liveCount: number;
  totalEstimatedViews: number;
  taggedProductsCount: number;
}

export function VideoStats({
  totalCount,
  liveCount,
  totalEstimatedViews,
  taggedProductsCount,
}: VideoStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <div className="p-4 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs shadow-2xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Total Curated Videos</span>
          <Film className="h-4 w-4 text-primary" />
        </div>
        <p className="font-display text-2xl font-bold text-foreground mt-2">{totalCount}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Reels & creators configured</p>
      </div>

      <div className="p-4 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs shadow-2xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Live on Homepage</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="font-display text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
          {liveCount}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">
          {totalCount - liveCount > 0
            ? `${totalCount - liveCount} currently hidden/draft`
            : "All videos active"}
        </p>
      </div>

      <div className="p-4 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs shadow-2xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Estimated Audience</span>
          <Eye className="h-4 w-4 text-amber-500" />
        </div>
        <p className="font-display text-2xl font-bold text-foreground mt-2">
          {Math.round(totalEstimatedViews / 1000)}K+
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">Cumulative creator reel views</p>
      </div>

      <div className="p-4 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs shadow-2xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Tagged SKUs</span>
          <ShoppingBag className="h-4 w-4 text-purple-500" />
        </div>
        <p className="font-display text-2xl font-bold text-foreground mt-2">
          {taggedProductsCount}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">Directly shoppable products</p>
      </div>
    </div>
  );
}
