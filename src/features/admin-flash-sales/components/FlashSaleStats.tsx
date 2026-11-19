"use client";

import React from "react";
import { Zap, Package, ShoppingBag, TrendingUp } from "lucide-react";
import type { AdminFlashSale } from "@/types";

interface FlashSaleStatsProps {
  campaigns: AdminFlashSale[];
}

export function FlashSaleStats({ campaigns }: FlashSaleStatsProps) {
  const activeCount = campaigns.filter((c) => c.dynamicStatus === "active").length;
  const totalDeals = campaigns.reduce((acc, c) => acc + (c.items?.length || 0), 0);
  const totalAllocated = campaigns.reduce((acc, c) => acc + (c.totalAllocated || 0), 0);
  const totalClaimed = campaigns.reduce((acc, c) => acc + (c.totalClaimed || 0), 0);
  const avgClaimRate = totalAllocated > 0 ? Math.round((totalClaimed / totalAllocated) * 100) : 0;

  const statCards = [
    {
      label: "Active Campaigns",
      value: activeCount,
      sub: `${campaigns.length} total scheduled/saved`,
      icon: Zap,
      color: "text-rose-600 bg-rose-500/10 border-rose-500/20",
    },
    {
      label: "Products on Flash Sale",
      value: totalDeals,
      sub: "Across all active campaigns",
      icon: Package,
      color: "text-amber-600 bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Units Claimed by Shoppers",
      value: totalClaimed,
      sub: `Out of ${totalAllocated} allocated units`,
      icon: ShoppingBag,
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Flash Conversion Claim Rate",
      value: `${avgClaimRate}%`,
      sub: "Overall velocity of deal drops",
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-500/10 border-blue-500/20",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div key={idx} className="surface-card p-4 space-y-2 border border-border/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
              <div className={`grid h-8 w-8 place-items-center rounded-lg border ${s.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-0.5">
              <p className="font-display text-2xl font-bold tracking-tight text-foreground">
                {s.value}
              </p>
              <p className="text-[11px] text-muted-foreground">{s.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

