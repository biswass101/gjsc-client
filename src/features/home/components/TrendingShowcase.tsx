"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Flame, ArrowRight } from "lucide-react";
import { Link } from "@/lib/navigation";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShowcaseCard } from "./trending/ShowcaseCard";

interface TrendingShowcaseProps {
  products: Product[];
  title?: string;
  eyebrow?: string;
  to?: string;
  search?: Record<string, string>;
}

export function TrendingShowcase({
  products,
  title = "Trending Now",
  eyebrow = "Rising & Coveted",
  to = "/collections/trending",
  search,
}: TrendingShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = products.length;

  // Products flow from left to right across the showcase
  const flowLeftToRight = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const flowRightToLeft = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Auto-play interval: smooth continuous flow left-to-right
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      flowLeftToRight();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, total, flowLeftToRight]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 35) {
      flowRightToLeft();
    } else if (diff < -35) {
      flowLeftToRight();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (total === 0) return null;

  return (
    <section className="relative overflow-hidden py-6 sm:py-8 lg:py-11 bg-linear-to-b from-background via-cream/25 to-background">
      {/* Header */}
      <div className="container-lux mb-4 sm:mb-5 lg:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] mb-1.5 sm:mb-2">
              <Flame className="w-3.5 h-3.5 text-primary fill-primary/30 animate-pulse" />
              <span>{eyebrow}</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
              {title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Formulas winning hearts across Bangladesh this week.
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
            {to && (
              <Button
                asChild
                variant="outline"
                className="rounded-full px-4 sm:px-6 py-1.5 sm:py-3 text-[9px] uppercase tracking-[0.18em]"
              >
                {search ? (
                  <Link to={to} search={search}>
                    View all <ArrowRight className="ml-1.5 h-3.5 w-3.5" strokeWidth={1.5} />
                  </Link>
                ) : (
                  <Link to={to}>
                    View all <ArrowRight className="ml-1.5 h-3.5 w-3.5" strokeWidth={1.5} />
                  </Link>
                )}
              </Button>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={flowRightToLeft}
                aria-label="Previous trending product"
                className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-border bg-background/90 backdrop-blur shadow-xs hover:border-primary hover:text-primary transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={flowLeftToRight}
                aria-label="Next trending product"
                className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-border bg-background/90 backdrop-blur shadow-xs hover:border-primary hover:text-primary transition-all active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Card 3D Showcase Stage */}
      <div
        className="relative mx-auto w-full max-w-7xl h-75 sm:h-95 md:h-102.5 lg:h-110 flex items-center justify-center select-none overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-70 sm:w-110 lg:w-145 h-70 sm:h-110 lg:h-145 rounded-full bg-radial from-primary/15 via-primary/5 to-transparent blur-3xl"
        />

        {products.map((product, idx) => {
          let diff = (idx - activeIndex) % total;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const isCenter = diff === 0;
          const isImmediate = Math.abs(diff) === 1;
          const isOuter = Math.abs(diff) === 2;
          const isVisible = Math.abs(diff) <= 2;

          return (
            <ShowcaseCard
              key={product.id}
              product={product}
              diff={diff}
              isCenter={isCenter}
              isImmediate={isImmediate}
              isOuter={isOuter}
              isVisible={isVisible}
              onSelect={() => setActiveIndex(idx)}
            />
          );
        })}
      </div>

      {/* Pagination indicators */}
      <div className="container-lux mt-3 sm:mt-4 flex flex-col items-center gap-2 sm:gap-2.5">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {products.map((p, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show ${p.name}`}
                className={cn(
                  "h-1.5 sm:h-2 rounded-full transition-all duration-500 cursor-pointer",
                  active
                    ? "w-7 sm:w-9 bg-primary shadow-xs"
                    : "w-1.5 sm:w-2 bg-border/70 hover:bg-muted-foreground/60",
                )}
              />
            );
          })}
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground tracking-wider uppercase font-medium">
          {activeIndex + 1} of {total} · {products[activeIndex]?.name}
        </p>
      </div>
    </section>
  );
}
