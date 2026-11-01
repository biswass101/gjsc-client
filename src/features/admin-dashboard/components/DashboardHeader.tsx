import React from "react";
import { Building2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimeRange } from "../types";

interface DashboardHeaderProps {
  timeRange: TimeRange;
  setTimeRange: (t: TimeRange) => void;
  onExportCSV: () => void;
}

const TIME_RANGES: Array<{ id: TimeRange; label: string }> = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7D" },
  { id: "30d", label: "30D" },
  { id: "90d", label: "90D" },
  { id: "ytd", label: "YTD" },
];

export function DashboardHeader({ timeRange, setTimeRange, onExportCSV }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-border/70 pb-5">
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="eyebrow text-primary font-bold">Executive Cockpit v2.6</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Telemetry Active
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:text-blue-300">
            <Building2 className="h-3 w-3" /> Tokyo Hub • Dhaka
          </span>
        </div>

        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-foreground">
          Business Intelligence & Operations Observatory
        </h1>
        <p className="mt-1 text-xs text-muted-foreground max-w-2xl">
          Real-time telemetry across revenue velocity, gross profitability margins, Tokyo import
          pipelines, courier fulfillment, and atomic storefront architecture.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="flex items-center rounded-full border border-border/80 bg-secondary/40 p-1 text-xs">
          {TIME_RANGES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTimeRange(t.id)}
              className={`rounded-full px-3 py-1 font-medium transition-all ${
                timeRange === t.id
                  ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onExportCSV}
          className="rounded-full text-xs h-8 px-3.5 gap-1.5 shadow-2xs hover:border-primary/50"
        >
          <Download className="h-3.5 w-3.5 text-primary" />
          <span>Export Audit (CSV)</span>
        </Button>
      </div>
    </div>
  );
}
