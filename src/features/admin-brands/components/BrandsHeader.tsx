import React from "react";
import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BrandsHeaderProps {
  onAddBrand: () => void;
}

export function BrandsHeader({ onAddBrand }: BrandsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          <span>Catalog Architecture</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-bold">Japanese Brand House</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
          Brand Directory & Heritage
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage official Japanese brand partners, Tokyo origins, Kanji typography, authenticity
          badges, and catalog counts.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onAddBrand}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Add Brand Profile</span>
        </Button>
      </div>
    </div>
  );
}
