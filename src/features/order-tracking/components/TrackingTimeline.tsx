"use client";

import { useState, useMemo } from "react";
import {
  ArrowUpDown,
  Bike,
  Box,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrackingEvent } from "../types";

export interface TrackingTimelineProps {
  events: TrackingEvent[];
}

type StatusKey =
  | "delivered"
  | "out_for_delivery"
  | "in_transit"
  | "dispatched"
  | "packed"
  | "placed"
  | "payment"
  | "cancelled"
  | "note";

interface StatusTheme {
  category: string;
  badgeLabel: string;
  badgeClass: string;
  cardBg: string;
  borderClass: string;
  borderLeftClass: string;
  markerBg: string;
  markerRing: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const THEMES: Record<StatusKey, StatusTheme> = {
  delivered: {
    category: "Delivered",
    badgeLabel: "Delivered Successfully",
    badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    cardBg:
      "bg-gradient-to-br from-emerald-500/[0.12] via-emerald-500/[0.04] to-card/90 dark:from-emerald-950/40 dark:via-emerald-900/15 dark:to-card/90",
    borderClass: "border-emerald-500/35 hover:border-emerald-500/60 shadow-emerald-500/5",
    borderLeftClass: "border-l-4 border-l-emerald-500",
    markerBg: "bg-emerald-500 text-white",
    markerRing: "ring-emerald-500/25",
    icon: CheckCircle2,
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  out_for_delivery: {
    category: "Out for Delivery",
    badgeLabel: "Out for Delivery · Live",
    badgeClass: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
    cardBg:
      "bg-gradient-to-br from-sky-500/[0.14] via-sky-500/[0.04] to-card/90 dark:from-sky-950/45 dark:via-sky-900/15 dark:to-card/90",
    borderClass: "border-sky-500/40 hover:border-sky-500/70 shadow-sky-500/10",
    borderLeftClass: "border-l-4 border-l-sky-500",
    markerBg: "bg-sky-500 text-white animate-pulse",
    markerRing: "ring-sky-500/30",
    icon: Bike,
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  in_transit: {
    category: "In Transit",
    badgeLabel: "In Transit · Regional Hub",
    badgeClass: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
    cardBg:
      "bg-gradient-to-br from-blue-500/[0.11] via-indigo-500/[0.03] to-card/90 dark:from-blue-950/35 dark:via-blue-900/15 dark:to-card/90",
    borderClass: "border-blue-500/35 hover:border-blue-500/60 shadow-blue-500/5",
    borderLeftClass: "border-l-4 border-l-blue-500",
    markerBg: "bg-blue-500 text-white",
    markerRing: "ring-blue-500/25",
    icon: Truck,
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  dispatched: {
    category: "Dispatched",
    badgeLabel: "Dispatched · Courier Handover",
    badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    cardBg:
      "bg-gradient-to-br from-amber-500/[0.12] via-amber-500/[0.03] to-card/90 dark:from-amber-950/35 dark:via-amber-900/15 dark:to-card/90",
    borderClass: "border-amber-500/35 hover:border-amber-500/60 shadow-amber-500/5",
    borderLeftClass: "border-l-4 border-l-amber-500",
    markerBg: "bg-amber-500 text-white",
    markerRing: "ring-amber-500/25",
    icon: PackageCheck,
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  packed: {
    category: "Tokyo Packed",
    badgeLabel: "Tokyo Quality Packed",
    badgeClass: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
    cardBg:
      "bg-gradient-to-br from-purple-500/[0.12] via-purple-500/[0.03] to-card/90 dark:from-purple-950/35 dark:via-purple-900/15 dark:to-card/90",
    borderClass: "border-purple-500/35 hover:border-purple-500/60 shadow-purple-500/5",
    borderLeftClass: "border-l-4 border-l-purple-500",
    markerBg: "bg-purple-600 text-white",
    markerRing: "ring-purple-500/25",
    icon: ShieldCheck,
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  placed: {
    category: "Order Placed",
    badgeLabel: "Order Received & Confirmed",
    badgeClass: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
    cardBg:
      "bg-gradient-to-br from-rose-500/[0.10] via-rose-500/[0.02] to-card/90 dark:from-rose-950/30 dark:via-rose-900/10 dark:to-card/90",
    borderClass: "border-rose-500/30 hover:border-rose-500/50 shadow-rose-500/5",
    borderLeftClass: "border-l-4 border-l-rose-500",
    markerBg: "bg-rose-500 text-white",
    markerRing: "ring-rose-500/25",
    icon: Box,
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  payment: {
    category: "Payment",
    badgeLabel: "Payment Verified",
    badgeClass: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30",
    cardBg:
      "bg-gradient-to-br from-teal-500/[0.11] via-teal-500/[0.03] to-card/90 dark:from-teal-950/35 dark:via-teal-900/15 dark:to-card/90",
    borderClass: "border-teal-500/35 hover:border-teal-500/60 shadow-teal-500/5",
    borderLeftClass: "border-l-4 border-l-teal-500",
    markerBg: "bg-teal-600 text-white",
    markerRing: "ring-teal-500/25",
    icon: CreditCard,
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  cancelled: {
    category: "Cancelled",
    badgeLabel: "Order Cancelled",
    badgeClass: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
    cardBg:
      "bg-gradient-to-br from-red-500/[0.14] via-red-500/[0.04] to-card/90 dark:from-red-950/40 dark:via-red-900/15 dark:to-card/90",
    borderClass: "border-red-500/40 hover:border-red-500/60 shadow-red-500/5",
    borderLeftClass: "border-l-4 border-l-red-500",
    markerBg: "bg-red-500 text-white",
    markerRing: "ring-red-500/30",
    icon: XCircle,
    iconColor: "text-red-600 dark:text-red-400",
  },
  note: {
    category: "Update",
    badgeLabel: "Logistics Update",
    badgeClass: "bg-secondary text-muted-foreground border-border/60",
    cardBg:
      "bg-gradient-to-br from-secondary/50 via-secondary/20 to-card/90 dark:from-secondary/30 dark:via-secondary/10 dark:to-card/90",
    borderClass: "border-border/70 hover:border-border",
    borderLeftClass: "border-l-4 border-l-muted-foreground/40",
    markerBg: "bg-secondary text-foreground",
    markerRing: "ring-border/30",
    icon: FileText,
    iconColor: "text-muted-foreground",
  },
};

function getStatusTheme(title = "", description = ""): StatusTheme {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes("cancel")) return THEMES.cancelled;
  if (text.includes("deliver")) return THEMES.delivered;
  if (
    text.includes("out for delivery") ||
    text.includes("rider en route") ||
    text.includes("delivery vehicle") ||
    text.includes("delivery van")
  ) {
    return THEMES.out_for_delivery;
  }
  if (
    text.includes("in transit") ||
    text.includes("regional hub") ||
    text.includes("sorting center") ||
    text.includes("transit")
  ) {
    return THEMES.in_transit;
  }
  if (
    text.includes("dispatched") ||
    text.includes("handed over") ||
    text.includes("assigned to") ||
    text.includes("courier partner") ||
    text.includes("consignment")
  ) {
    return THEMES.dispatched;
  }
  if (
    text.includes("pack") ||
    text.includes("quality") ||
    text.includes("inspect") ||
    text.includes("furoshiki") ||
    text.includes("processing") ||
    text.includes("warehouse")
  ) {
    return THEMES.packed;
  }
  if (
    text.includes("payment") ||
    text.includes("trxid") ||
    text.includes("paid via") ||
    text.includes("bkash") ||
    text.includes("card")
  ) {
    return THEMES.payment;
  }
  if (
    text.includes("placed") ||
    text.includes("confirmed") ||
    text.includes("received") ||
    text.includes("verified") ||
    text.includes("order #")
  ) {
    return THEMES.placed;
  }

  return THEMES.note;
}

export function TrackingTimeline({ events }: TrackingTimelineProps) {
  // User requirement: Timeline growing upward so user immediately sees the latest milestone at landing
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Keep track of the actual latest milestone in the chain
  const indexedEvents = useMemo(() => {
    const list = events || [];
    return list.map((ev, originalIndex) => ({
      ...ev,
      originalIndex,
      isLatestInChain: originalIndex === list.length - 1,
    }));
  }, [events]);

  // Reverse list when sortOrder is 'newest' so latest is index 0 (top of timeline)
  const displayedEvents = useMemo(() => {
    if (sortOrder === "newest") {
      return [...indexedEvents].reverse();
    }
    return [...indexedEvents];
  }, [indexedEvents, sortOrder]);

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
      {/* Header with Title and Upward/Downward Direction Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
        <div>
          <h3 className="font-display text-xl font-medium flex items-center gap-2 text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            Milestone Activity & Transit Logs
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {sortOrder === "newest"
              ? "Timeline order: Growing upward · Latest milestone at top"
              : "Timeline order: Step-by-step · Oldest initial milestone at top"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))}
          className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary hover:border-primary/40 transition-all cursor-pointer shadow-2xs shrink-0 self-start sm:self-auto"
          title="Toggle timeline ordering"
        >
          <ArrowUpDown className="h-3.5 w-3.5 text-primary" />
          <span>{sortOrder === "newest" ? "Latest First (Upward ↑)" : "Oldest First (Downward ↓)"}</span>
        </button>
      </div>

      {/* Timeline List with Connecting Line */}
      <div className="mt-6 space-y-5 sm:space-y-6 relative before:absolute before:left-3.5 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-primary/60 before:via-border/80 before:to-border/30">
        {displayedEvents.map((ev, i) => {
          const theme = getStatusTheme(ev.title, ev.description);
          const ThemeIcon = theme.icon;
          const isTopCard = i === 0 && sortOrder === "newest";

          return (
            <div key={`${ev.originalIndex}-${i}`} className="relative flex items-start gap-3.5 sm:gap-4 pl-0.5">
              {/* Milestone Icon Marker */}
              <div
                className={cn(
                  "relative z-10 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border-2 shrink-0 transition-all shadow-xs ring-4",
                  ev.isLatestInChain
                    ? cn(theme.markerBg, theme.markerRing, "border-background ring-4 shadow-md")
                    : ev.completed
                      ? cn(theme.markerBg, "border-background ring-2", theme.markerRing)
                      : "border-border bg-background text-muted-foreground/50 ring-transparent",
                )}
              >
                <ThemeIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>

              {/* Styled Status Card with Unique Color, Texture, Gradient & Border Accent */}
              <div
                className={cn(
                  "relative flex-1 overflow-hidden rounded-xl border p-4 sm:p-5 backdrop-blur-[2px] transition-all duration-200 hover:shadow-md",
                  theme.cardBg,
                  theme.borderClass,
                  theme.borderLeftClass,
                  isTopCard && "ring-1 ring-primary/30",
                )}
              >
                {/* Subtle Geometric Texture Overlay */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Card Top Row: Badges, Stage Label, Timestamp */}
                <div className="relative z-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Status Badge */}
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider border",
                        theme.badgeClass,
                      )}
                    >
                      <ThemeIcon className="h-3 w-3 shrink-0" />
                      {theme.badgeLabel}
                    </span>

                    {/* Latest Status Pill */}
                    {isTopCard && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary border border-primary/20 shadow-2xs">
                        <Sparkles className="h-2.5 w-2.5 animate-spin" />
                        LATEST UPDATE
                      </span>
                    )}

                    {ev.active && !isTopCard && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                        Current Stage
                      </span>
                    )}
                  </div>

                  {/* Timestamp */}
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1 shrink-0">
                    <Clock className="h-3 w-3 text-muted-foreground/70" />
                    {ev.timestamp}
                  </span>
                </div>

                {/* Milestone Title */}
                <h4 className="relative z-1 mt-2.5 font-semibold text-sm sm:text-base text-foreground leading-snug">
                  {ev.title}
                </h4>

                {/* Location with Pin */}
                <p className={cn("relative z-1 mt-1 text-xs font-medium flex items-center gap-1.5", theme.iconColor)}>
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span>{ev.location}</span>
                </p>

                {/* Description */}
                <p className="relative z-1 mt-2 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                  {ev.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
