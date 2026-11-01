"use client";

import { RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";

export function ProductGuaranteesMatrix() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 rounded-xl border border-border/70 bg-cream/70 p-4 text-xs text-muted-foreground">
      <div className="flex items-start gap-2.5">
        <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
        <div>
          <p className="font-semibold text-foreground">Express Delivery</p>
          <p className="text-[11px]">1–2 days Dhaka, 2–3 days nationwide</p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
        <div>
          <p className="font-semibold text-foreground">100% Authentic</p>
          <p className="text-[11px]">Direct import from Tokyo authorized makers</p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <RotateCcw className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
        <div>
          <p className="font-semibold text-foreground">7-Day Easy Returns</p>
          <p className="text-[11px]">Hassle-free guarantee on sealed items</p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
        <div>
          <p className="font-semibold text-foreground">COD & bKash</p>
          <p className="text-[11px]">Inspect product upon delivery</p>
        </div>
      </div>
    </div>
  );
}

