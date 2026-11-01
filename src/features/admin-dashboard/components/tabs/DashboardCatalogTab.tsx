import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminProduct } from "@/context/admin-context";

interface DashboardCatalogTabProps {
  brandPerformanceData: Array<{ brand: string; revenue: number; units: number }>;
  topProducts: AdminProduct[];
}

export function DashboardCatalogTab({
  brandPerformanceData,
  topProducts,
}: DashboardCatalogTabProps) {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {/* Top Brands by Revenue */}
      <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
        <div className="border-b border-border/60 pb-3 flex items-center justify-between">
          <div>
            <h2 className="font-display text-base font-bold text-foreground">
              Top Japanese Brand Houses
            </h2>
            <p className="text-xs text-muted-foreground">Ranked by customer gross spending</p>
          </div>
          <Button asChild variant="outline" size="sm" className="h-7 text-xs rounded-full">
            <Link href="/admin/brands">All Brands</Link>
          </Button>
        </div>

        <div className="space-y-3">
          {brandPerformanceData.map((b, idx) => (
            <div
              key={b.brand}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/25 border border-border/50 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                  #{idx + 1}
                </span>
                <div>
                  <p className="font-bold text-foreground">{b.brand}</p>
                  <p className="text-[11px] text-muted-foreground">{b.units} units sold</p>
                </div>
              </div>
              <span className="font-bold text-foreground text-sm font-mono">
                ৳{b.revenue.toLocaleString("en-BD")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bestselling Japanese SKUs */}
      <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
        <div className="border-b border-border/60 pb-3 flex items-center justify-between">
          <div>
            <h2 className="font-display text-base font-bold text-foreground">Top Product SKUs</h2>
            <p className="text-xs text-muted-foreground">
              Most demanded Tokyo skincare formulations
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="h-7 text-xs rounded-full">
            <Link href="/admin/products">Inventory</Link>
          </Button>
        </div>

        <div className="divide-y divide-border/50">
          {topProducts.map((p, idx) => (
            <div key={p.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-secondary text-[11px] font-bold text-muted-foreground">
                  #{idx + 1}
                </span>
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-10 w-10 rounded-lg object-cover border border-border/60"
                />
                <div>
                  <p className="font-semibold text-foreground line-clamp-1">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {p.brand} • <span className="font-mono">{p.sku}</span>
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-bold text-foreground text-sm">
                  ৳{p.price.toLocaleString("en-BD")}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {p.stock > 0 ? (
                    <span className="text-emerald-600 font-medium">{p.stock} in stock</span>
                  ) : (
                    <span className="text-rose-600 font-medium">Out of stock</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
