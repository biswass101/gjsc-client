import React from "react";
import { Plane, TrendingUp, CheckCircle2, Clock } from "lucide-react";

interface PreOrdersKpiCardsProps {
  totalCampaigns: number;
  totalBookedRevenue: number;
  totalSlotsBooked?: number;
  totalSlots?: number;
  inFlightBatchesCount: number;
  readyBatchesCount?: number;
}

export function PreOrdersKpiCards({
  totalCampaigns,
  totalBookedRevenue,
  inFlightBatchesCount,
  readyBatchesCount = 0,
}: PreOrdersKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Active Pre-Orders</span>
          <Plane className="h-4 w-4 text-primary" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{totalCampaigns}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Tokyo flight allocation SKUs</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Pipeline Value</span>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">
          ৳{totalBookedRevenue.toLocaleString("en-BD")}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">Pre-order catalog valuation</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>In-Flight / Sourcing</span>
          <Clock className="h-4 w-4 text-amber-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">
          {inFlightBatchesCount}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">Active air-transit shipments</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Customs & Ready</span>
          <CheckCircle2 className="h-4 w-4 text-purple-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">
          {readyBatchesCount}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">Cleared in Dhaka & ready</p>
      </div>
    </div>
  );
}
