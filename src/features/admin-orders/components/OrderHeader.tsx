"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderHeaderProps {
  totalParcels: number;
  onExportCSV: () => void;
}

export function OrderHeader({ totalParcels, onExportCSV }: OrderHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="eyebrow text-primary">Bangladesh Logistics Operations</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
            {totalParcels} Total Parcels
          </span>
        </div>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
          Order Lifecycle & Courier Dispatch Center
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Pathao Express & Steadfast API integration, bKash TrxID verification, and digital packing
          slips.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onExportCSV}
          className="rounded-full text-xs h-8 px-3.5 gap-1.5"
        >
          <Download className="h-3.5 w-3.5 text-primary" />
          Export Orders
        </Button>
      </div>
    </div>
  );
}
