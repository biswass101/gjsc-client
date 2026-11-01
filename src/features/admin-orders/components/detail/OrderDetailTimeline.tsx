"use client";

import type { AdminOrder } from "@/context/admin-context";

interface OrderDetailTimelineProps {
  timeline: AdminOrder["timeline"];
}

export function OrderDetailTimeline({ timeline }: OrderDetailTimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="rounded-xl border border-border/80 bg-secondary/10 p-4 space-y-3">
      <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
        Chronological Audit Trail & Status History
      </h4>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/80">
        {timeline.map((event) => (
          <div key={event.id} className="relative space-y-0.5">
            <span className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">{event.title}</span>
              <span className="text-[10px] text-muted-foreground font-mono">{event.time}</span>
            </div>
            <p className="text-muted-foreground text-[11px]">{event.description}</p>
            <p className="text-[10px] text-muted-foreground/60 italic">by {event.by}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
