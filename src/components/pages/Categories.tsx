"use client";

import { TOP_CATEGORIES, PRODUCT_IMAGES } from "@/lib/catalog";
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
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
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
    const targetScroll =
      direction === "left"
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
          className="overflow-x-auto scrollbar-hide scroll-smooth rounded-4xl"
        >
          <div className="flex gap-3 sm:gap-5 lg:gap-7 px-2 pt-3 pb-5">
            {TOP_CATEGORIES.map((c, i) => {
              const bgImage = PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]!;
              return (
                <Link
                  key={c}
                  to="/shop"
                  search={{ category: c }}
                  aria-label={`Shop ${c}`}
                  className="group relative shrink-0 aspect-square w-28 sm:w-36 lg:w-44 rounded-full transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-(--shadow-lift)"
                >
                  {/* Gradient ring border (gold → sakura → lavender) */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--gold),var(--sakura),var(--lavender),var(--gold-soft),var(--gold))] shadow-(--shadow-card) transition-transform duration-1000 ease-out group-hover:rotate-180"
                  />

                  {/* Ivory gap between ring and image */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-[3px] sm:inset-1 rounded-full bg-background"
                  />

                  {/* Circular image area */}
                  <span className="absolute inset-[6px] sm:inset-2 overflow-hidden rounded-full bg-linear-to-br from-champagne via-cream to-sakura/40">
                    <img
                      src={bgImage}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-90"
                    />

                    {/* Soft ink gradient so the label always stays readable */}
                    <span className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/25 to-transparent transition-colors duration-500 group-hover:from-ink/85" />

                    {/* Label */}
                    <span className="absolute inset-x-0 bottom-0 flex flex-col items-center px-2 pb-4 sm:pb-6 lg:pb-8 text-center">
                      <span className="font-display text-sm sm:text-lg lg:text-xl leading-tight text-white drop-shadow-md">
                        {c}
                      </span>
                      <span className="gold-rule mt-1.5 sm:mt-2 w-8 sm:w-12 transition-all duration-500 group-hover:w-16" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden flex justify-center gap-1 mt-3">
          {TOP_CATEGORIES.map((_, i) => (
            <div key={i} className="h-1 w-8 rounded-full bg-border/40" />
          ))}
        </div>
      </div>
    </Section>
  );
}
