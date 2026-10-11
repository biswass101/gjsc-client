
"use client";

import { Link } from "@/lib/navigation";
import { PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Content() {
  return (
    <div className="animate-rise pt-2 sm:pt-4 lg:pt-6">
      <p className="eyebrow inline-block rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5 sm:px-2 sm:py-1 backdrop-blur-md text-[8px] sm:text-xs">
        Est. 2025 · Made in Japan
      </p>

      <h1 className="mt-1.5 sm:mt-4 lg:mt-6 font-display text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-5xl leading-[1.05]">
        Stay Glorious,
        <br />
        <span className="gold-text bg-clip-text text-transparent">
          Shine with Confidence
        </span>
      </h1>

      <p className="mt-1.5 sm:mt-4 lg:mt-6 max-w-lg text-xs sm:text-xs md:text-sm lg:text-base leading-relaxed text-foreground/80 drop-shadow-sm">
        Slow-fermented Japanese formulas — sakura, rice ferment and camellia —
        for skin that looks quietly, unmistakably radiant.
      </p>

      <div className="mt-2 sm:mt-4 lg:mt-6 flex flex-wrap gap-1 sm:gap-2">
        <Button
          asChild
          className="rounded-full px-2 sm:px-5 lg:px-6 py-0.5 sm:py-2 lg:py-3 text-[7px] sm:text-[9px] lg:text-xs uppercase tracking-[0.15em] shadow-xl transition-transform hover:scale-105 active:scale-95"
        >
          <Link to="/shop">Shop</Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="rounded-full border-primary/20 bg-background/50 px-2 sm:px-5 lg:px-6 py-0.5 sm:py-2 lg:py-3 text-[7px] sm:text-[9px] lg:text-xs uppercase tracking-[0.15em] backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
        >
          <Link to="/about">Story</Link>
        </Button>
      </div>

      {/* Trust badges - commented out
      <div className="mt-2.5 sm:mt-8 lg:mt-12 flex flex-wrap gap-x-1.5 sm:gap-x-6 lg:gap-x-8 gap-y-1 sm:gap-y-3 lg:gap-y-4 rounded-lg sm:rounded-2xl border border-border/50 bg-background/40 p-1.5 sm:p-4 lg:p-5 text-[7px] sm:text-[9px] lg:text-[11px] font-medium uppercase tracking-[0.1em] backdrop-blur-md">
        <span className="flex items-center gap-0.5 sm:gap-1.5 lg:gap-2">
          <span className="flex h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
            <ShieldCheck className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-primary" strokeWidth={1.5} />
          </span>
          <span className="hidden sm:inline">100% Authentic</span>
          <span className="inline sm:hidden">Authentic</span>
        </span>

        <span className="flex items-center gap-0.5 sm:gap-1.5 lg:gap-2">
          <span className="flex h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
            <Truck className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-primary" strokeWidth={1.5} />
          </span>
          <span className="hidden sm:inline">Free delivery</span>
          <span className="inline sm:hidden">Free</span>
        </span>

        <span className="flex items-center gap-0.5 sm:gap-1.5 lg:gap-2">
          <span className="flex h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
            <PackageCheck className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-primary" strokeWidth={1.5} />
          </span>
          <span className="hidden sm:inline">COD & bKash</span>
          <span className="inline sm:hidden">Payment</span>
        </span>
      </div>
      */}
    </div>
  );
}
