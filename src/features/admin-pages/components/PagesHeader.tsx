import React from "react";
import { ChevronRight, FileText } from "lucide-react";

export function PagesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          <span>Storefront Copywriting</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-bold">Page Content & SEO</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1 flex items-center gap-2.5">
          <FileText className="h-7 w-7 text-primary" />
          <span>Site-Wide Page Titles, Descriptions & SEO</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Zero-code atomic control over page titles, meta descriptions, hero headings, and intro
          texts across every route of the store.
        </p>
      </div>
    </div>
  );
}
