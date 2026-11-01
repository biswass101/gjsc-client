"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductRitualTabProps {
  product: Product;
}

export function ProductRitualTab({ product }: ProductRitualTabProps) {
  const isTreat = product.category === "Serum" || product.category === "Essence";
  const isSeal = product.category === "Moisturizer" || product.category === "Sunscreen";

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7 space-y-6">
        <div>
          <span className="eyebrow text-primary">Time-Honoured J-Beauty Philosophy</span>
          <h3 className="mt-1 font-display text-2xl font-medium">
            The Order of Application Matters
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            In traditional Japanese skincare, layering moves strictly from lightest viscosity to
            richest seal. This ensures botanical ferments penetrate the stratum corneum without
            evaporative moisture loss.
          </p>
        </div>

        {/* 4-Step Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="rounded-xl border border-border/60 bg-cream/50 p-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Step 01
            </span>
            <h4 className="font-display text-sm font-semibold mt-1">Cleanse</h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              Purify skin without stripping natural lipids.
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-cream/50 p-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Step 02
            </span>
            <h4 className="font-display text-sm font-semibold mt-1">Hydrate</h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              Lotion essence to soften and prepare the barrier.
            </p>
          </div>

          <div
            className={cn(
              "rounded-xl border-2 p-4 shadow-xs",
              isTreat
                ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                : "border-border/60 bg-cream/50",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                Step 03
              </span>
              {isTreat && (
                <span className="rounded-full bg-primary text-[9px] px-1.5 py-0.2 text-primary-foreground font-semibold">
                  This Product
                </span>
              )}
            </div>
            <h4 className="font-display text-sm font-semibold mt-1">Treat</h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              Concentrated actives and ferment bio-nutrients.
            </p>
          </div>

          <div
            className={cn(
              "rounded-xl border-2 p-4 shadow-xs",
              isSeal
                ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                : "border-border/60 bg-cream/50",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                Step 04
              </span>
              {isSeal && (
                <span className="rounded-full bg-primary text-[9px] px-1.5 py-0.2 text-primary-foreground font-semibold">
                  This Product
                </span>
              )}
            </div>
            <h4 className="font-display text-sm font-semibold mt-1">Seal & Protect</h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              Lock hydration in and shield against UV & oxidation.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm text-foreground/90">
          <h4 className="font-semibold text-primary flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            How to Apply — Expert Ritual Guide
          </h4>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {product.howTo}
          </p>
        </div>
      </div>

      <div className="lg:col-span-5 rounded-xl border border-border/70 bg-secondary/30 p-6 space-y-4">
        <h4 className="font-display text-lg font-semibold">Morning vs Evening Ritual</h4>
        <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
          <div className="border-l-2 border-primary pl-3">
            <p className="font-semibold text-foreground">🌅 Morning Protocol</p>
            <p className="mt-0.5">
              Apply after a gentle splash of lukewarm water or light toner. Pat gently until fully
              absorbed before applying sunscreen and makeup.
            </p>
          </div>
          <div className="border-l-2 border-primary pl-3">
            <p className="font-semibold text-foreground">🌙 Evening Recovery Protocol</p>
            <p className="mt-0.5">
              Apply generously after double-cleansing. Allow the bio-ferments to work
              synergistically with overnight cellular skin renewal.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-border/60">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Pro aesthetician tip:</strong> Warm 2–3 drops between your palms for 5
            seconds before pressing gently onto the face and neck using upward sweeping motions.
          </p>
        </div>
      </div>
    </div>
  );
}
