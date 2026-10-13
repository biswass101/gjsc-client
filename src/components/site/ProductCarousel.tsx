"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/catalog";

interface ProductCarouselProps {
  products: Product[];
  title: string;
  eyebrow: string;
  to?: string;
  search?: any;
}

export function ProductCarousel({ products, title, eyebrow, to, search }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const targetScroll = direction === "left"
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-4 sm:py-6 lg:py-8">
      <div className="mb-2 sm:mb-4 lg:mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 text-center sm:text-left">
        <h2 className="font-display text-sm sm:text-lg md:text-xl lg:text-2xl">
          {title} <span className="text-muted-foreground">— {eyebrow.toUpperCase()}</span>
        </h2>
        <div className="gold-rule mt-3 sm:mt-4 sm:hidden" />
        {to && (
          <div className="flex justify-center sm:justify-end">
            <a
              href={to}
              className="rounded-full border border-border bg-background px-4 sm:px-6 py-1.5 sm:py-3 text-[8px] sm:text-[9px] uppercase tracking-[0.15em] whitespace-nowrap hover:border-primary hover:text-primary transition-colors"
            >
              View all
            </a>
          </div>
        )}
      </div>

      <div className="relative">
        {/* Left Scroll Indicator */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg hover:bg-background transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Scroll Indicator */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg hover:bg-background transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollability}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div className="flex gap-3 sm:gap-4 lg:gap-5 pb-2">
            {products.map((product) => (
              <div key={product.id} className="shrink-0 w-56 sm:w-64 lg:w-72">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden flex justify-center gap-1 mt-3">
          {products.map((_, i) => (
            <div key={i} className="h-1 w-8 rounded-full bg-border/40" />
          ))}
        </div>
      </div>
    </section>
  );
}