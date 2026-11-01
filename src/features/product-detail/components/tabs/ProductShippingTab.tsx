"use client";

import { Truck, ShieldCheck } from "lucide-react";

export function ProductShippingTab() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-xl border border-border/70 bg-card p-6 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <Truck className="h-4 w-4" /> Nationwide Delivery Details
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <div>
            <p className="font-semibold text-foreground">Dhaka Metropolitan Area</p>
            <p>Delivered within 24–48 hours. Standard fee: ৳80 (Free on orders above ৳5,000).</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Outside Dhaka (All 64 Districts)</p>
            <p>
              Delivered within 48–72 hours via Steadfast, RedX, or Pathao Courier. Standard fee:
              ৳130.
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Cash on Delivery (COD)</p>
            <p>
              Available everywhere. You may inspect the outer tamper-evident seal before payment.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/70 bg-card p-6 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <ShieldCheck className="h-4 w-4" /> Authenticity & Return Guarantee
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <div>
            <p className="font-semibold text-foreground">Tokyo Batch Direct Import</p>
            <p>
              Every bottle is imported directly from authorized Tokyo distributors with verified
              batch codes and customs documentation.
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">7-Day Easy Returns</p>
            <p>
              If you receive an incorrect or damaged item, or wish to return an unopened product
              with seal intact, notify us within 7 days for a hassle-free refund or exchange.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
