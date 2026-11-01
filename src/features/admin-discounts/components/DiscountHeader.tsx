"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DiscountHeaderProps {
  activeCount: number;
  onOpenCreate: () => void;
}

export function DiscountHeader({ activeCount, onOpenCreate }: DiscountHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="eyebrow text-primary">Marketing & Conversion Optimization</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
            {activeCount} Active Codes
          </span>
        </div>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
          Promotional Coupons & Discount Rules
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Create percentage vouchers, cash rebates (BDT), and free shipping codes with spend
          thresholds and usage ceilings.
        </p>
      </div>

      <Button
        size="sm"
        onClick={onOpenCreate}
        className="rounded-full text-xs h-8 px-4 gap-1.5 shadow-2xs font-semibold cursor-pointer"
      >
        <Plus className="h-3.5 w-3.5" />
        Create Coupon
      </Button>
    </div>
  );
}
