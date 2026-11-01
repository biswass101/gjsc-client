"use client";

import { Bike, Box, CheckCircle2, Clock, Phone, ShieldCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderTrackingData } from "../types";

export interface TrackingLiveStatusProps {
  order: OrderTrackingData;
}

const STEP_DEFINITIONS = [
  { label: "Order Placed", icon: Box },
  { label: "Tokyo Packed", icon: ShieldCheck },
  { label: "In Transit", icon: Truck },
  { label: "Out for Delivery", icon: Bike },
  { label: "Delivered", icon: CheckCircle2 },
];

export function TrackingLiveStatus({ order }: TrackingLiveStatusProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
              Live Tracking
            </span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              #{order.orderId}
            </span>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {order.statusText}
            </span>
          </div>

          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            {order.statusText}
          </h2>

          <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            Estimated Arrival:{" "}
            <strong className="text-foreground font-semibold">{order.estimatedDelivery}</strong>
          </p>
        </div>

        {/* Courier Partner Info */}
        <div className="rounded-xl border border-border/60 bg-secondary/30 p-3 sm:text-right text-xs shrink-0">
          <p className="text-[11px] text-muted-foreground">Courier Partner</p>
          <p className="font-bold text-foreground text-sm flex items-center sm:justify-end gap-1.5 mt-0.5">
            <Truck className="h-4 w-4 text-primary" />
            {order.courier}
          </p>
          <p className="text-[10.5px] text-muted-foreground font-mono mt-0.5">
            CN: {order.consignmentId}
          </p>
        </div>
      </div>

      {/* Assigned Rider Info (When Out for Delivery) */}
      {order.riderName && (
        <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/20 text-primary shrink-0">
              <Bike className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Delivery Rider: {order.riderName}</p>
              <p className="text-muted-foreground text-[11.5px]">
                Your parcel is in the delivery van. Keep cash/bKash ready for verification.
              </p>
            </div>
          </div>

          {order.riderPhone && (
            <a
              href={`tel:${order.riderPhone}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/40 bg-background px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all shrink-0"
            >
              <Phone className="h-3 w-3" />
              Call Rider
            </a>
          )}
        </div>
      )}

      {/* Horizontal Progress Stepper for Large Screens */}
      <div className="mt-8 pt-4 border-t border-border/50 hidden md:block">
        <div className="relative flex items-center justify-between">
          {/* Connecting line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-secondary z-0">
            <div
              className="h-full bg-primary transition-all duration-700"
              style={{
                width: `${(order.currentStepIndex / 4) * 100}%`,
              }}
            />
          </div>

          {/* Step circles */}
          {STEP_DEFINITIONS.map((step, idx) => {
            const Icon = step.icon;
            const isPast = idx < order.currentStepIndex;
            const isCurrent = idx === order.currentStepIndex;

            return (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-full border-2 transition-all shadow-xs",
                    isPast
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary bg-background text-primary ring-4 ring-primary/20 animate-pulse"
                        : "border-border bg-background text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs text-center font-medium max-w-[80px]",
                    isCurrent
                      ? "text-primary font-bold"
                      : isPast
                        ? "text-foreground"
                        : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

