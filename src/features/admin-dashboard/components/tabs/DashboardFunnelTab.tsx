import React from "react";
import { Progress } from "@/components/ui/progress";

interface DashboardFunnelTabProps {
  funnelData: Array<{
    stage: string;
    count: number;
    percent: number;
    color: string;
  }>;
}

export function DashboardFunnelTab({ funnelData }: DashboardFunnelTabProps) {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      {/* Conversion Stages Progress */}
      <div className="rounded-xl border border-border/80 bg-card p-5 lg:col-span-2 space-y-5 shadow-xs">
        <div className="border-b border-border/60 pb-3">
          <h2 className="font-display text-base font-bold text-foreground">
            Storefront Conversion Funnel
          </h2>
          <p className="text-xs text-muted-foreground">
            Step-by-step visitor progression from storefront landing to confirmed purchase
          </p>
        </div>

        <div className="space-y-4">
          {funnelData.map((f, i) => (
            <div
              key={f.stage}
              className="space-y-1.5 p-3 rounded-lg bg-secondary/25 border border-border/50"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full grid place-items-center bg-primary/10 text-primary text-[10px]">
                    {i + 1}
                  </span>
                  {f.stage}
                </span>
                <span className="font-semibold text-foreground">
                  {f.count.toLocaleString()} ({f.percent}%)
                </span>
              </div>
              <Progress value={f.percent} className="h-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Cart Abandonment & Conversion Insights */}
      <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
        <div className="border-b border-border/60 pb-3">
          <h2 className="font-display text-base font-bold text-foreground">
            Funnel Drop-Off Analytics
          </h2>
          <p className="text-xs text-muted-foreground">Friction points & recovery opportunities</p>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-lg border border-border bg-card">
            <p className="font-semibold text-foreground">Bag-to-Checkout Ratio</p>
            <p className="text-xl font-bold text-emerald-600 mt-1">39.6%</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Benchmark: 35%+ in Prestige Cosmetics
            </p>
          </div>

          <div className="p-3 rounded-lg border border-border bg-card">
            <p className="font-semibold text-foreground">Checkout Completion Rate</p>
            <p className="text-xl font-bold text-blue-600 mt-1">74.2%</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              High trust via bKash & Cash on Delivery options
            </p>
          </div>

          <div className="p-3 rounded-lg border border-border bg-card">
            <p className="font-semibold text-foreground">Average Session Duration</p>
            <p className="text-xl font-bold text-indigo-600 mt-1">4m 18s</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Customers exploring multi-step Japanese routines
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
