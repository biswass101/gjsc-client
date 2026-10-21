"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Flame, Heart, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/lib/navigation";
import { formatBDT } from "@/lib/catalog";
import type { Product } from "@/types";
import { useShop } from "@/context";
import { Rating } from "@/components/common";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  to = "/shop",
  search = { badge: "Trending" },
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
      // Swiped left
      flowRightToLeft();
    } else if (diff < -35) {
      // Swiped right
      flowLeftToRight();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (total === 0) return null;

  return (
    <section className="relative overflow-hidden py-5 sm:py-8 lg:py-12 bg-linear-to-b from-background via-cream/25 to-background">
      {/* Header */}
      <div className="container-lux mb-3 sm:mb-6 lg:mb-8">
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
              <Button asChild variant="outline" className="rounded-full px-4 sm:px-6 py-1.5 sm:py-3 text-[9px] uppercase tracking-[0.18em]">
                <Link to={to as "/shop"} search={search}>
                  View all <ArrowRight className="ml-1.5 h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
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
        className="relative mx-auto w-full max-w-7xl h-[410px] sm:h-[450px] md:h-[475px] lg:h-[500px] flex items-center justify-center select-none overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Soft radial glow behind featured center card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[440px] lg:w-[580px] h-[280px] sm:h-[440px] lg:h-[580px] rounded-full bg-radial from-primary/15 via-primary/5 to-transparent blur-3xl"
        />

        {products.map((product, idx) => {
          let diff = (idx - activeIndex) % total;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const isCenter = diff === 0;
          const isImmediate = Math.abs(diff) === 1;
          const isOuter = Math.abs(diff) === 2;
          // Exactly 5 cards are visible simultaneously: -2, -1, 0, 1, 2
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
      <div className="container-lux mt-2 sm:mt-3 flex flex-col items-center gap-1.5 sm:gap-2">
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
                    : "w-1.5 sm:w-2 bg-border/70 hover:bg-muted-foreground/60"
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

interface ShowcaseCardProps {
  product: Product;
  diff: number;
  isCenter: boolean;
  isImmediate: boolean;
  isOuter: boolean;
  isVisible: boolean;
  onSelect: () => void;
}

function ShowcaseCard({
  product,
  diff,
  isCenter,
  isImmediate,
  isOuter,
  isVisible,
  onSelect,
}: ShowcaseCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const saved = wishlist.includes(product.slug);
  const off = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.slug);
    toast.success(`Added ${product.name} to bag`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
    toast(saved ? "Removed from wishlist" : "Saved to your wishlist");
  };

  const zIndex = isCenter ? 30 : isImmediate ? 20 : isOuter ? 10 : 0;
  const opacity = isCenter ? 1 : isImmediate ? 0.78 : isOuter ? 0.48 : 0;

  const offsetMobile =
    diff === 0 ? 0 : diff > 0 ? (diff === 1 ? 56 : 106) : diff === -1 ? -56 : -106;
  const offsetDesktop =
    diff === 0 ? 0 : diff > 0 ? (diff === 1 ? 75 : 142) : diff === -1 ? -75 : -142;

  const scaleMobile = isCenter ? 1 : isImmediate ? 0.82 : isOuter ? 0.65 : 0.5;
  const scaleDesktop = isCenter ? 1 : isImmediate ? 0.85 : isOuter ? 0.70 : 0.5;

  return (
    <div
      onClick={!isCenter ? onSelect : undefined}
      style={
        {
          zIndex,
          opacity,
          "--tx-sm": `${offsetMobile}%`,
          "--tx-lg": `${offsetDesktop}%`,
          "--sc-sm": scaleMobile,
          "--sc-lg": scaleDesktop,
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-2 sm:top-5 left-1/2",
        "w-[170px] sm:w-[220px] md:w-[250px] lg:w-[275px]",
        "transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1)",
        "origin-center will-change-transform",
        "[transform:translateX(calc(-50%_+_var(--tx-sm)))_scale(var(--sc-sm))]",
        "sm:[transform:translateX(calc(-50%_+_var(--tx-lg)))_scale(var(--sc-lg))]",
        !isVisible && "pointer-events-none opacity-0",
        !isCenter && "cursor-pointer hover:opacity-90"
      )}
    >
      <article
        className={cn(
          "group relative overflow-hidden rounded-md sm:rounded-lg border transition-all duration-500 bg-card",
          isCenter
            ? "border-primary/50 shadow-[0_18px_50px_-10px_rgba(180,140,80,0.25)] dark:shadow-[0_18px_50px_-10px_rgba(0,0,0,0.55)] ring-2 ring-primary/25"
            : "border-border/80 shadow-sm backdrop-blur-xs hover:border-primary/40"
        )}
      >
        {/* Card Image (Decreased image area) */}
        <div className="relative aspect-[4/3.2] w-full overflow-hidden bg-cream/70">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            onClick={(e) => {
              if (!isCenter) {
                e.preventDefault();
                onSelect();
              }
            }}
            className="block h-full w-full"
          >
            <img
              src={product.image}
              alt={product.name}
              width={900}
              height={900}
              loading="lazy"
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 ease-out",
                isCenter ? "group-hover:scale-105" : ""
              )}
            />
          </Link>

          {/* Badges */}
          <div className="absolute left-2 top-2 sm:left-3 sm:top-3 flex flex-col gap-1 z-10">
            {isCenter ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-semibold tracking-wider uppercase bg-primary text-primary-foreground shadow-sm backdrop-blur">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300" />
                Featured Pick
              </span>
            ) : (
              <span className="rounded-full bg-background/85 px-2 py-0.5 text-[7px] sm:text-[9px] uppercase tracking-wider text-foreground backdrop-blur">
                Trending
              </span>
            )}

            {off > 0 && (
              <span className="rounded-full bg-primary/95 px-1.5 py-0.5 text-[7px] sm:text-[9px] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur self-start">
                -{off}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            onClick={handleWishlist}
            className="absolute right-2 top-2 sm:right-3 sm:top-3 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-border/80 bg-background/90 backdrop-blur shadow-xs hover:border-primary hover:bg-background transition-all z-10 active:scale-95 cursor-pointer"
          >
            <Heart
              className={cn(
                "h-3 w-3 sm:h-3.5 sm:w-3.5",
                saved ? "fill-rose text-rose" : "text-muted-foreground"
              )}
              strokeWidth={1.5}
            />
          </button>

          {/* Stock status */}
          {product.stock === 0 && (
            <span className="absolute inset-x-0 bottom-0 bg-foreground/80 py-1 text-center text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-background backdrop-blur">
              Out of stock
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className={cn("flex flex-col p-2 sm:p-2.5 gap-1 sm:gap-1.5", isCenter ? "bg-card" : "bg-card/90")}>
          <div className="flex items-center justify-between gap-1.5">
            <span className="text-[8px] sm:text-[8.5px] uppercase tracking-[0.2em] text-muted-foreground font-medium truncate">
              {product.brand}
            </span>
            <span className="text-[8px] sm:text-[8.5px] text-primary/90 uppercase tracking-wider font-medium truncate">
              {product.category}
            </span>
          </div>

          <h3 className="font-display text-xs sm:text-[13px] md:text-sm font-medium leading-snug line-clamp-1">
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              onClick={(e) => {
                if (!isCenter) {
                  e.preventDefault();
                  onSelect();
                }
              }}
              className="transition-colors hover:text-primary"
            >
              {product.name}
            </Link>
          </h3>

          {/* Short ritual description for the center featured card */}
          {isCenter && (
            <p className="line-clamp-2 text-[10px] sm:text-xs text-muted-foreground leading-relaxed hidden sm:block">
              {product.short}
            </p>
          )}

          {/* Rating and Price */}
          <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-border/60">
            <div className={cn(!isCenter && isOuter ? "hidden sm:block" : "")}>
              <Rating value={product.rating} count={product.reviews} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-sm font-semibold text-foreground">
                {formatBDT(product.price)}
              </span>
              {product.compareAt && (
                <span className="text-[9px] sm:text-[10px] text-muted-foreground line-through hidden sm:inline">
                  {formatBDT(product.compareAt)}
                </span>
              )}
            </div>
          </div>

          {/* Center Featured Card: Quick Action Buttons */}
          {isCenter && (
            <div className="mt-1 flex items-center gap-1.5 pt-0.5 w-full">
              <Button
                type="button"
                size="sm"
                variant="outline"
                asChild
                className="h-7 sm:h-8 px-2 sm:px-3 rounded-full text-[9px] sm:text-[10px] font-medium uppercase shrink-0 cursor-pointer"
              >
                <Link to="/product/$slug" params={{ slug: product.slug }}>
                  Details
                </Link>
              </Button>

              <Button
                type="button"
                size="sm"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
                className="h-7 sm:h-8 flex-1 min-w-0 px-2 sm:px-3 rounded-full text-[8.5px] sm:text-[10px] font-semibold uppercase gap-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs cursor-pointer whitespace-nowrap [&_svg]:size-3 sm:[&_svg]:size-3.5"
              >
                <ShoppingBag className="w-3 h-3 shrink-0" />
                <span className="truncate">Add to Bag</span>
              </Button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
