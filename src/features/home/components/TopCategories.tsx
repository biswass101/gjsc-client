"use client";

import { TOP_CATEGORIES, PRODUCT_IMAGES, slugify } from "@/lib/catalog";
import { Link } from "@/lib/navigation";
import { Section } from "@/components/common";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function TopCategories() {
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
          className="overflow-x-auto scrollbar-hide scroll-smooth rounded-md sm:rounded-lg"
        >
          <div className="flex gap-2.5 sm:gap-5 lg:gap-7 px-1 sm:px-2 pt-2 sm:pt-3 pb-4 sm:pb-5">
            {TOP_CATEGORIES.map((c, i) => {
              const bgImage = PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]!;
              return (
                <Link
                  key={c}
                  to={`/category/${slugify(c)}`}
                  aria-label={`Shop ${c}`}
                  className="group relative shrink-0 aspect-square w-22 sm:w-30 lg:w-36 rounded-full transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-(--shadow-lift)"
                >
                  {/* Gradient ring border (gold → sakura → lavender) */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--gold),var(--sakura),var(--lavender),var(--gold-soft),var(--gold))] shadow-(--shadow-card) transition-transform duration-1000 ease-out group-hover:rotate-180"
                  />

                  {/* Ivory gap between ring and image */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-[2.5px] sm:inset-1 rounded-full bg-background"
                  />

                  {/* Circular image area */}
                  <span className="absolute inset-[5px] sm:inset-2 overflow-hidden rounded-full bg-linear-to-br from-champagne via-cream to-sakura/40">
                    <img
                      src={bgImage}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-90"
                    />

                    {/* Soft ink gradient so the label always stays readable */}
                    <span className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/25 to-transparent transition-colors duration-500 group-hover:from-ink/85" />

                    {/* Label */}
                    <span className="absolute inset-x-0 bottom-0 flex flex-col items-center px-1.5 pb-2.5 sm:pb-4 lg:pb-5 text-center">
                      <span className="font-display text-xs sm:text-sm lg:text-base leading-tight text-white drop-shadow-md">
                        {c}
                      </span>
                      <span className="gold-rule mt-1 sm:mt-2 w-6 sm:w-12 transition-all duration-500 group-hover:w-16" />
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

export { TopCategories as Categories };
