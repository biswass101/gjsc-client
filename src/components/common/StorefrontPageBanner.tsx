"use client";

import { useState, useEffect, useMemo } from "react";
import { Link } from "@/lib/navigation";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { AdminBanner } from "@/types";

interface StorefrontPageBannerProps {
  pageKey: AdminBanner["pageKey"];
  defaultTitle: string;
  defaultSubtitle?: string;
  defaultBadge?: string;
  defaultCtaText?: string;
  defaultCtaLink?: string;
  breadcrumb?: Array<{ label: string; href?: string }>;
  centered?: boolean;
}

export function StorefrontPageBanner({
  pageKey,
  defaultTitle,
  defaultSubtitle,
  defaultBadge,
  defaultCtaText,
  defaultCtaLink,
  breadcrumb,
  centered = false,
}: StorefrontPageBannerProps) {
  const { banners } = useAdmin();
  const [currentIndex, setCurrentIndex] = useState(0);

  const matchingBanners = useMemo(() => {
    return (banners || [])
      .filter((b) => b.pageKey === pageKey && b.active !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [banners, pageKey]);

  useEffect(() => {
    if (matchingBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % matchingBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [matchingBanners.length]);

  const activeBanner = matchingBanners[currentIndex] || matchingBanners[0];

  const title = activeBanner?.title || defaultTitle;
  const subtitle = activeBanner?.subtitle || defaultSubtitle;
  const badge = activeBanner?.badge || defaultBadge;
  const ctaText = activeBanner?.ctaText || defaultCtaText;
  const ctaLink = activeBanner?.ctaLink || defaultCtaLink;
  const imageUrl = activeBanner?.imageUrl;
  const mobileImageUrl = activeBanner?.mobileImageUrl;

  return (
    <div className="relative overflow-hidden border-b border-border bg-linear-to-b from-primary/10 via-cream/40 to-background py-8 sm:py-12 group">
      {imageUrl && (
        <div className="absolute inset-0 z-0 transition-opacity duration-700">
          <picture>
            {mobileImageUrl && (
              <source media="(max-width: 640px)" srcSet={mobileImageUrl} />
            )}
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40" />
        </div>
      )}

      <div className={`container-lux relative z-10 ${centered ? "text-center max-w-3xl mx-auto" : ""}`}>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className={`text-xs text-muted-foreground mb-3 ${centered ? "flex justify-center" : ""}`}>
            {breadcrumb.map((crumb, idx) => (
              <span key={crumb.label}>
                {idx > 0 && <span className="mx-2 text-border">/</span>}
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className={`${centered ? "mx-auto max-w-3xl" : "max-w-3xl"} space-y-2`}>
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>{badge}</span>
            </div>
          )}
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground transition-all duration-300">
            {title}
          </h1>
          {subtitle && (
            <p className={`mt-2 text-xs sm:text-sm text-muted-foreground ${centered ? "mx-auto" : ""} max-w-2xl leading-relaxed`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel controls if multiple banners exist for this page */}
        {matchingBanners.length > 1 && (
          <div className="mt-4 flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-1.5">
              {matchingBanners.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to banner slide ${idx + 1}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-primary/30 hover:bg-primary/60"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous Banner"
                onClick={() =>
                  setCurrentIndex(
                    (prev) => (prev - 1 + matchingBanners.length) % matchingBanners.length
                  )
                }
                className="h-7 w-7 rounded-md border border-border bg-background/80 hover:bg-background grid place-items-center text-foreground transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Next Banner"
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % matchingBanners.length)
                }
                className="h-7 w-7 rounded-md border border-border bg-background/80 hover:bg-background grid place-items-center text-foreground transition-colors cursor-pointer"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
