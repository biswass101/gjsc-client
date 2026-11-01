import React from "react";
import { Plane, TrendingUp, Layers, Clock } from "lucide-react";

interface PreOrdersKpiCardsProps {
  totalCampaigns: number;
  totalBookedRevenue: number;
  totalSlotsBooked: number;
  totalSlots: number;
  inFlightBatchesCount: number;
}

export function PreOrdersKpiCards({
  totalCampaigns,
  totalBookedRevenue,
  totalSlotsBooked,
  totalSlots,
  inFlightBatchesCount,
}: PreOrdersKpiCardsProps) {
  const quotaPercent = totalSlots > 0 ? Math.round((totalSlotsBooked / totalSlots) * 100) : 0;

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
          <span>Booked Deposits</span>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">
          ৳{totalBookedRevenue.toLocaleString("en-BD")}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">Collected via bKash / Card</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Quota Reserved</span>
          <Layers className="h-4 w-4 text-indigo-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{quotaPercent}%</p>
        <p className="text-[11px] text-muted-foreground mt-1">
          {totalSlotsBooked} of {totalSlots} seats booked
        </p>
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
    </div>
  );
}
