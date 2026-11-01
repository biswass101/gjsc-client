import React from "react";
import { ChevronRight, Plus, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannersHeaderProps {
  onCreateBanner: () => void;
}

export function BannersHeader({ onCreateBanner }: BannersHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          <span>Visual Merchandising</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-bold">Page Promotional Banners</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1 flex items-center gap-2.5">
          <ImageIcon className="h-7 w-7 text-primary" />
          <span>Site-Wide Page Banners Manager</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Complete atomic control over hero carousels, promotion strips, and responsive visual
          banners across every page of the website.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onCreateBanner}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Banner</span>
        </Button>
      </div>
    </div>
  );
}
