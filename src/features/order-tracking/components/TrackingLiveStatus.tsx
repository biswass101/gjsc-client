"use client";

import { Bike, Box, CheckCircle2, Clock, Phone, RefreshCw, ShieldCheck, Truck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderTrackingData } from "../types";

export interface TrackingLiveStatusProps {
  order: OrderTrackingData;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const STEP_DEFINITIONS = [
  { label: "Order Placed", icon: Box, activeBg: "bg-rose-500", activeText: "text-rose-600 dark:text-rose-400", ringColor: "ring-rose-500/25" },
  { label: "Tokyo Packed", icon: ShieldCheck, activeBg: "bg-purple-600", activeText: "text-purple-600 dark:text-purple-400", ringColor: "ring-purple-500/25" },
  { label: "In Transit", icon: Truck, activeBg: "bg-blue-500", activeText: "text-blue-600 dark:text-blue-400", ringColor: "ring-blue-500/25" },
  { label: "Out for Delivery", icon: Bike, activeBg: "bg-sky-500", activeText: "text-sky-600 dark:text-sky-400", ringColor: "ring-sky-500/25" },
  { label: "Delivered", icon: CheckCircle2, activeBg: "bg-emerald-500", activeText: "text-emerald-600 dark:text-emerald-400", ringColor: "ring-emerald-500/25" },
];

const DEFAULT_BADGE_STYLE = {
  bg: "bg-rose-500/10",
  text: "text-rose-600 dark:text-rose-400",
  dot: "bg-rose-500",
  border: "border-rose-500/20",
};

const STATUS_BADGE_STYLES: Record<number, { bg: string; text: string; dot: string; border: string }> = {
  0: {
    bg: "bg-rose-500/10",
    text: "text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
    border: "border-rose-500/20",
  },
  1: {
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    dot: "bg-purple-500",
    border: "border-purple-500/20",
  },
  2: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
    border: "border-blue-500/20",
  },
  3: {
    bg: "bg-sky-500/10",
    text: "text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
    border: "border-sky-500/20",
  },
  4: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    border: "border-emerald-500/20",
  },
};

export function TrackingLiveStatus({ order, onRefresh, isRefreshing }: TrackingLiveStatusProps) {
  const isCancelled = order.currentStepIndex === -1;
  const statusBadge = STATUS_BADGE_STYLES[order.currentStepIndex] ?? DEFAULT_BADGE_STYLE;

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
            {isCancelled ? (
              <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                Cancelled
              </span>
            ) : (
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1 border",
                  statusBadge.bg,
                  statusBadge.text,
                  statusBadge.border,
                )}
              >
                <span className={cn("inline-block h-1.5 w-1.5 rounded-full animate-pulse", statusBadge.dot)} />
                {order.statusText}
              </span>
            )}

            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                disabled={isRefreshing}
                title="Refresh tracking status"
                className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={cn("h-2.5 w-2.5", isRefreshing && "animate-spin text-primary")} />
                <span>{isRefreshing ? "Checking..." : "Refresh"}</span>
              </button>
            )}
          </div>

          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            {isCancelled ? "Order Cancelled" : order.statusText}
          </h2>

          <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            Estimated Arrival:{" "}
            <strong className="text-foreground font-semibold">
              {isCancelled ? "N/A (Cancelled)" : order.estimatedDelivery}
            </strong>
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
        <div className="mt-5 rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 shrink-0">
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
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-sky-500/40 bg-background px-4 py-2 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white transition-all shrink-0"
            >
              <Phone className="h-3 w-3" />
              Call Rider
            </a>
          )}
        </div>
      )}

      {/* Horizontal Progress Stepper for Large Screens */}
      {isCancelled ? (
        <div className="mt-8 pt-4 border-t border-border/50">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
            <p className="text-xs font-semibold text-red-600 dark:text-red-400">
              This order has been cancelled and its reserved inventory restored. For assistance, reach out via WhatsApp support.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 pt-4 border-t border-border/50 hidden md:block">
          <div className="relative flex items-center justify-between">
            {/* Connecting line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-secondary z-0">
              <div
                className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500 transition-all duration-700"
                style={{
                  width: `${Math.max(0, Math.min(100, (order.currentStepIndex / 4) * 100))}%`,
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
                      isCurrent
                        ? cn(step.activeBg, "text-white ring-4", step.ringColor, "animate-pulse")
                        : isPast
                          ? cn(step.activeBg, "text-white border-background")
                          : "border-border bg-background text-muted-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-xs text-center font-medium max-w-[80px]",
                      isCurrent
                        ? cn("font-bold", step.activeText)
                        : isPast
                          ? "text-foreground font-medium"
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
      )}
    </div>
  );
}
