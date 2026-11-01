import React from "react";
import { Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoriesHeaderProps {
  onOpenCreate: () => void;
}

export function CategoriesHeader({ onOpenCreate }: CategoriesHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          <span>Catalog Architecture</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-bold">Categories & Subcategories</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
          Category & Subcategory Hierarchy
        </h1>
        <p className="text-sm text-muted-foreground">
          Complete atomic control over product groupings, Japanese naming, subcategory tagging, and
          storefront discovery.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onOpenCreate}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Category</span>
        </Button>
      </div>
    </div>
  );
}
