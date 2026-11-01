import React from "react";
import { Image as ImageIcon, CheckCircle2, Layers, Smartphone } from "lucide-react";
import { PAGE_KEYS } from "../constants";

interface BannersKpiCardsProps {
  totalBanners: number;
  activeCount: number;
  coveredPagesCount: number;
  mobileReadyCount: number;
}

export function BannersKpiCards({
  totalBanners,
  activeCount,
  coveredPagesCount,
  mobileReadyCount,
}: BannersKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Total Banners</span>
          <ImageIcon className="h-4 w-4 text-primary" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{totalBanners}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Configured storefront banners</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Active Live Banners</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{activeCount}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Currently rendering on website</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Pages Covered</span>
          <Layers className="h-4 w-4 text-indigo-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">
          {coveredPagesCount} / {PAGE_KEYS.length}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">Distinct storefront routes</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Responsive Mobile Ready</span>
          <Smartphone className="h-4 w-4 text-amber-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{mobileReadyCount}</p>
        <p className="text-[11px] text-muted-foreground mt-1">With custom mobile aspect ratio</p>
      </div>
    </div>
  );
}
