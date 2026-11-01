import React from "react";
import { BookOpen, CheckCircle2, Layers } from "lucide-react";

interface FaqsKpiCardsProps {
  totalFaqs: number;
  activeCount: number;
  categoriesCount: number;
}

export function FaqsKpiCards({ totalFaqs, activeCount, categoriesCount }: FaqsKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Total FAQs</span>
          <BookOpen className="h-4 w-4 text-primary" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{totalFaqs}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Questions in help center</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Live on Storefront</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{activeCount}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Active customer visible</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Categories</span>
          <Layers className="h-4 w-4 text-indigo-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{categoriesCount}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Support topic pillars</p>
      </div>
    </div>
  );
}
