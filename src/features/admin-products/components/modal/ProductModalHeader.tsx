"use client";

import { Package } from "lucide-react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { AdminProduct } from "@/context/admin-context";
import { FORM_TABS } from "../../data/productConstants";
import type { ProductFormTab } from "../../types";

export interface ProductModalHeaderProps {
  editingProduct: AdminProduct | null;
  formStatus: AdminProduct["status"];
  formTab: ProductFormTab;
  onTabChange: (tab: ProductFormTab) => void;
}

export function ProductModalHeader({
  editingProduct,
  formStatus,
  formTab,
  onTabChange,
}: ProductModalHeaderProps) {
  return (
    <DialogHeader className="p-5 pb-4 border-b border-border/80 bg-background/95 shrink-0">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <DialogTitle className="flex items-center gap-2 font-display text-lg sm:text-xl font-bold text-foreground">
            <div className="h-8 w-8 rounded-lg bg-primary/10 grid place-items-center text-primary">
              <Package className="h-4 w-4" />
            </div>
            {editingProduct
              ? `Edit: ${editingProduct.name}`
              : "Create New Japanese Skincare Product"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground flex items-center gap-2">
            <span>100% Authentic Japanese Cosmetics Formulation</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-primary font-medium">Tokyo Sourcing & INCI Standards</span>
          </DialogDescription>
        </div>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[11px] font-semibold text-muted-foreground">Catalog Status:</span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              formStatus === "active"
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                : formStatus === "draft"
                  ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                  : "bg-muted text-muted-foreground border border-border"
            }`}
          >
            {formStatus}
          </span>
        </div>
      </div>

      {/* Stepped Tab Selector */}
      <div className="pt-3">
        <div
          role="tablist"
          className="grid grid-cols-5 w-full bg-secondary/50 p-1 rounded-xl h-10 border border-border/60"
        >
          {FORM_TABS.map((t, idx) => {
            const Icon = t.icon;
            const isActive = formTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(t.id)}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-background text-foreground shadow-xs border border-border/80"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                />
                <span className="hidden sm:inline truncate">{t.label}</span>
                <span className="sm:hidden font-mono text-[10px]">{idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>
    </DialogHeader>
  );
}
