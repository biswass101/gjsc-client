"use client";

import { Link } from "@/lib/navigation";
import { ArrowRight, BadgePercent, CheckCircle2, ShieldCheck, Truck } from "lucide-react";

export function FreeDeliveryBanner() {
  return (
    <section className="bg-background py-4 sm:py-6">
      <div className="container-lux">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-primary/25 bg-gradient-to-r from-primary/10 via-cream to-primary/5 p-4 sm:p-8 lg:p-10 shadow-xs">
          {/* Subtle Decorative Background Glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-8">
            {/* Left Title & Value Proposition */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
                <Truck className="h-3.5 w-3.5" />
                <span>Nationwide Shipping Perk</span>
              </div>

              <h2 className="mt-2 font-display text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Free Delivery Available
              </h2>

              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Enjoy complimentary express doorstep delivery on all orders above <strong className="text-foreground font-semibold">৳5,000</strong> across all 64 districts in Bangladesh. No coupon code required.
              </p>

              {/* 3 Trust Points */}
              <div className="mt-3.5 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-border/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-[11px] sm:text-xs font-medium text-foreground">
                    Cash On Delivery (COD)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-[11px] sm:text-xs font-medium text-foreground">
                    100% Tokyo Authentic
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgePercent className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-[11px] sm:text-xs font-medium text-foreground">
                    24h Express Dispatch
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Box: Full width button on mobile for easy thumb tapping */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-3 shrink-0 pt-2 sm:pt-0 border-t border-border/40 sm:border-t-0">
              <div className="text-left sm:text-right">
                <span className="text-[9px] sm:text-xs uppercase tracking-wider text-muted-foreground block">
                  Order Threshold
                </span>
                <p className="font-display text-xl sm:text-3xl font-bold text-primary">
                  ৳5,000+
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Applied automatically at checkout
                </p>
              </div>

              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-98 text-center"
              >
                <span>Shop Free Delivery Items</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
