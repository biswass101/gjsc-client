"use client";

import { Check, FileText, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrackingEvent } from "../types";

export interface TrackingTimelineProps {
  events: TrackingEvent[];
}

export function TrackingTimeline({ events }: TrackingTimelineProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <h3 className="font-display text-xl font-medium flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Milestone Activity & Transit Logs
        </h3>
        <span className="text-xs text-muted-foreground">Verified Tokyo Logistics</span>
      </div>

      <div className="mt-6 space-y-6 relative before:absolute before:left-3.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-border/60">
        {events.map((ev, i) => (
          <div key={i} className="relative flex items-start gap-4 sm:gap-5 pl-1">
            {/* Milestone marker */}
            <div
              className={cn(
                "relative z-10 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border-2 shrink-0 transition-all",
                ev.completed
                  ? "border-primary bg-primary text-primary-foreground shadow-xs"
                  : ev.active
                    ? "border-primary bg-background text-primary ring-4 ring-primary/20 animate-pulse shadow-sm"
                    : "border-border bg-background text-muted-foreground/50",
              )}
            >
              {ev.completed ? (
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-current" />
              )}
            </div>

            {/* Content block */}
            <div className="flex-1 rounded-xl border border-border/60 bg-secondary/20 p-4 transition-all hover:bg-secondary/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                  {ev.title}
                  {ev.active && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.2 text-[9px] font-bold uppercase tracking-wider text-primary">
                      Current Stage
                    </span>
                  )}
                </h4>
                <span className="text-xs text-muted-foreground font-medium">{ev.timestamp}</span>
              </div>

              <p className="mt-1 text-xs text-primary font-medium flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {ev.location}
              </p>

              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {ev.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

