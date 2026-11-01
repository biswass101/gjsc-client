"use client";

import type { AdminDiscount } from "@/context/admin-context";

export interface DiscountAnalyticsProps {
  totalDiscounts: number;
  activeCount: number;
  totalRedemptions: number;
  topDiscount?: AdminDiscount | undefined;
}

export function DiscountAnalytics({
  totalDiscounts,
  activeCount,
  totalRedemptions,
  topDiscount,
}: DiscountAnalyticsProps) {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
      <div className="surface-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Active Campaign Vouchers
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-foreground">{activeCount} Active</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {totalDiscounts - activeCount} expired or paused
        </p>
      </div>

      <div className="surface-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Total Customer Redemptions
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-emerald-600">
          {totalRedemptions} Uses
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Average +26% cart size uplift</p>
      </div>

      <div className="surface-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Top Performing Code
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-primary font-mono">
          {topDiscount?.code || "TOKYO10"}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {topDiscount?.usageCount || 0} redemptions in Bangladesh
        </p>
      </div>
    </div>
  );
}
