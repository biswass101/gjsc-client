"use client";

import { useState, useEffect, useMemo } from "react";
import { Link } from "@/lib/navigation";
import { useAdmin } from "@/context/admin-context";
import type { CollectionMeta } from "../data/collectionMetadata";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { resolveBannerGradient } from "@/features/admin-banners/constants";

interface CollectionHeroProps {
  meta: CollectionMeta;
}

export function CollectionHero({ meta }: CollectionHeroProps) {
  const { banners } = useAdmin();
  const [currentIndex, setCurrentIndex] = useState(0);

  const normalizedSlug = meta.slug.replace(/-/g, "_");
  const matchingBanners = useMemo(() => {
    return (banners || [])
      .filter(
        (b) =>
          (b.pageKey === `collection_${normalizedSlug}` ||
            b.pageKey === meta.slug ||
            b.pageKey === normalizedSlug) &&
          b.active !== false
      )
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [banners, normalizedSlug, meta.slug]);

  // Auto-rotate if multiple banners exist
  useEffect(() => {
    if (matchingBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % matchingBanners.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [matchingBanners.length]);

  const activeBanner = matchingBanners[currentIndex] ?? matchingBanners[0];

  // If no database banners configured yet, fall back gracefully to the metadata image
  if (!activeBanner || matchingBanners.length === 0) {
    return (
      <section
        aria-label={`${meta.title} Banner`}
        className="container-lux pt-2 sm:pt-3 pb-2 sm:pb-3"
      >
        <div className="relative w-full h-44 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-md sm:rounded-xl border border-border/40 bg-muted shadow-2xs">
          <img
            src={meta.bannerImage}
            alt={`${meta.title} Banner`}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>
    );
  }

  const hasText = Boolean(activeBanner.title?.trim() || activeBanner.subtitle?.trim());
  const gradientCss = hasText ? resolveBannerGradient(activeBanner.gradient) : "none";

  return (
    <section
      aria-label={`${meta.title} Dynamic Hero Banner`}
      className="container-lux pt-2 sm:pt-3 pb-2 sm:pb-3"
    >
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-md sm:rounded-xl border border-border/50 bg-muted shadow-md group">
        {/* Banner Picture with Responsive Mobile Art-Direction */}
        <picture>
          {activeBanner.mobileImageUrl && (
            <source media="(max-width: 640px)" srcSet={activeBanner.mobileImageUrl} />
          )}
          <img
            src={activeBanner.imageUrl}
            alt={activeBanner.title || meta.title}
            className="h-full w-full object-cover object-center transition-all duration-700"
          />
        </picture>

        {/* Applied Gradient Atmosphere Overlay - ONLY when headline or subtitle is present! */}
        {hasText && gradientCss !== "none" && (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{ background: gradientCss }}
          />
        )}

        {/* Banner Content Overlay (when headline, subtitle or badge provided) - button removed */}
        {(activeBanner.title || activeBanner.subtitle || activeBanner.badge) && (
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-10 max-w-2xl text-white z-10 pointer-events-none">
            {activeBanner.badge && (
              <div className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
                <Sparkles className="h-3 w-3" />
                <span>{activeBanner.badge}</span>
              </div>
            )}

            {activeBanner.title && (
              <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
                {activeBanner.title}
              </h2>
            )}

            {activeBanner.subtitle && (
              <p className="mt-2 text-xs sm:text-sm text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] line-clamp-2 leading-relaxed max-w-xl">
                {activeBanner.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Carousel Navigation Arrows & Indicators if Multiple Banners */}
        {matchingBanners.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous Slide"
              onClick={() =>
                setCurrentIndex(
                  (prev) => (prev - 1 + matchingBanners.length) % matchingBanners.length
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 hover:bg-background text-foreground border border-border/40 shadow-xs backdrop-blur-md grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next Slide"
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % matchingBanners.length)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 hover:bg-background text-foreground border border-border/40 shadow-xs backdrop-blur-md grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 right-4 flex items-center gap-1.5 z-20">
              {matchingBanners.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
