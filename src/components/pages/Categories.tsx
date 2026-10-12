"use client";

import { TOP_CATEGORIES } from "@/lib/catalog";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import { Link } from "@/lib/navigation";
import { Section } from "./shared/Section";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function Categories() {
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
    <Section
      eyebrow="Shop by Category"
      title="Top Categories"
      subtitle="Our most-loved essentials for a complete ritual."
      to="/categories"
    >
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
          <div className="flex gap-2 sm:gap-3 lg:gap-4 pb-2">
            {TOP_CATEGORIES.map((c, i) => {
              const bgImages = [p1, p2, p3, p4, p5, p6];
              const bgImage = bgImages[i % bgImages.length]!;
              return (
                <Link
                  key={c}
                  to="/shop"
                  search={{ category: c }}
                  className="group relative shrink-0 flex flex-col items-center justify-center gap-2 rounded-lg border border-border overflow-hidden p-4 sm:p-6 lg:p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-card)] w-32 sm:w-40 lg:w-48 aspect-square"
                >
                  {/* Background image */}
                  <img
                    src={bgImage.src}
                    alt={c}
                    className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                  {/* Content */}
                  <div className="relative flex flex-col items-center justify-center">
                    <span className="text-xs sm:text-sm lg:text-base leading-tight text-foreground drop-shadow-md">
                      {c}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden flex justify-center gap-1 mt-3">
          {TOP_CATEGORIES.map((_, i) => (
            <div
              key={i}
              className="h-1 w-8 rounded-full bg-border/40"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
