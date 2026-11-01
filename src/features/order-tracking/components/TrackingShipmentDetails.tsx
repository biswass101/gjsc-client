"use client";

import { cn } from "@/lib/utils";
import type { OrderTrackingData } from "../types";

export interface TrackingShipmentDetailsProps {
  order: OrderTrackingData;
}

export function TrackingShipmentDetails({ order }: TrackingShipmentDetailsProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
      <h3 className="font-display text-lg font-medium border-b border-border/50 pb-2.5">
        Shipment Details
      </h3>

      <div className="space-y-3 text-xs leading-relaxed">
        <div>
          <span className="text-muted-foreground block text-[11px]">Recipient</span>
          <strong className="text-foreground font-semibold text-sm">{order.customerName}</strong>
          <p className="text-muted-foreground">{order.phone}</p>
        </div>

        <div>
          <span className="text-muted-foreground block text-[11px]">Delivery Address</span>
          <p className="font-medium text-foreground">{order.destination}</p>
          <span className="inline-block mt-0.5 rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
            {order.zone}
          </span>
        </div>

        <div className="border-t border-border/50 pt-2.5">
          <span className="text-muted-foreground block text-[11px]">Payment Terms</span>
          <p className="font-semibold text-foreground">{order.paymentMethod}</p>
          <span
            className={cn(
              "inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
              order.paymentStatus.includes("Paid")
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
            )}
          >
            {order.paymentStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
