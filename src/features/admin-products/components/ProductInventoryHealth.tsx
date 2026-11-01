"use client";

import { BRANDS } from "@/lib/catalog";

export interface ProductInventoryHealthProps {
  productsCount: number;
  inStockPercentage: number;
  totalStockUnits: number;
  lowStockCount: number;
  inventoryValuation: number;
}

export function ProductInventoryHealth({
  productsCount,
  inStockPercentage,
  totalStockUnits,
  lowStockCount,
  inventoryValuation,
}: ProductInventoryHealthProps) {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      <div className="surface-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Total Active SKUs
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-foreground">{productsCount}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Across {BRANDS.length} Japanese Brands
        </p>
      </div>

      <div className="surface-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          In-Stock Fill Rate
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-emerald-600">
          {inStockPercentage}%
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {totalStockUnits.toLocaleString()} total units on hand
        </p>
      </div>

      <div className="surface-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Low Stock Alerts
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-amber-600">{lowStockCount}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Items requiring Tokyo air restock
        </p>
      </div>

      <div className="surface-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Inventory Valuation (Cost)
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-foreground">
          ৳{inventoryValuation.toLocaleString()}
        </p>
        <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">+38% avg gross margin</p>
      </div>
    </div>
  );
}
