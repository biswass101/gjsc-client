import React from "react";
import { Globe, CheckCircle2, Sparkles, Calendar } from "lucide-react";
import { AdminPageMeta } from "@/context/admin-context";

interface PagesKpiCardsProps {
  pageMetas: AdminPageMeta[];
}

export function PagesKpiCards({ pageMetas }: PagesKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Managed Routes</span>
          <Globe className="h-4 w-4 text-primary" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{pageMetas.length}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Core storefront pages</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>SEO Indexing</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">100%</p>
        <p className="text-[11px] text-muted-foreground mt-1">Meta tags configured</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Custom Badges</span>
          <Sparkles className="h-4 w-4 text-amber-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">
          {pageMetas.filter((p) => p.badgeText).length}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">Hero promotional pills</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Last Content Sync</span>
          <Calendar className="h-4 w-4 text-indigo-500" />
        </div>
        <p className="text-lg font-display font-bold text-foreground mt-2">
          {pageMetas[0]?.lastUpdated || "Today"}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">Live reactive updates</p>
      </div>
    </div>
  );
}
