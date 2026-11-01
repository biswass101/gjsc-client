"use client";

import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProductHeaderProps {
  productsCount: number;
  onExportCsv: () => void;
  onOpenAdd: () => void;
}

export function ProductHeader({ productsCount, onExportCsv, onOpenAdd }: ProductHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="eyebrow text-primary">Tokyo Inventory Management</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
            Live Catalog ({productsCount} SKUs)
          </span>
        </div>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
          Product Catalog & Multi-Variant SKUs
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Full lifecycle control over pricing, profit margins, batch stock replenishment, and
          merchandising badges.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onExportCsv}
          className="rounded-full text-xs h-8 px-3.5 gap-1.5 cursor-pointer"
        >
          <Download className="h-3.5 w-3.5 text-primary" />
          Export CSV
        </Button>

        <Button
          size="sm"
          onClick={onOpenAdd}
          className="rounded-full text-xs h-8 px-4 gap-1.5 shadow-2xs font-semibold cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Product
        </Button>
      </div>
    </div>
  );
}
