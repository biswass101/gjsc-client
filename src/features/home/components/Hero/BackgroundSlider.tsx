"use client";
import { useState } from "react";
import { Link } from "@/lib/navigation";
import { Sparkles } from "lucide-react";
import {
  resolveBannerGradient,
  handleBannerImageError,
  resolveBannerImageUrl,
  DEFAULT_FALLBACK_BANNER,
} from "@/features/admin-banners";
import { pujaSale, heroSpring, heroWhip } from "@/lib/cloudinaryAssets";

const HERO_IMAGES = [pujaSale, heroSpring, heroWhip];

export interface HeroSlide {
  src: string;
  mobileSrc?: string | null | undefined;
  ctaLink?: string | null | undefined;
  ctaText?: string | null | undefined;
  title?: string | undefined;
  subtitle?: string | undefined;
  badge?: string | undefined;
  gradient?: string | null | undefined;
}

interface BackgroundSliderProps {
  currentIndex: number;
  slides?: HeroSlide[];
}

const SLIDE_DURATION_MS = 1000;

export function BackgroundSlider({ currentIndex, slides }: BackgroundSliderProps) {
  const activeSlides: HeroSlide[] =
    slides && slides.length > 0
      ? slides.map((s) => ({
          ...s,
          src: resolveBannerImageUrl(s.src),
          mobileSrc: s.mobileSrc ? resolveBannerImageUrl(s.mobileSrc) : undefined,
        }))
      : HERO_IMAGES.map((img) => ({ src: img.src }));

  const [indexes, setIndexes] = useState({
    current: currentIndex,
    prev: currentIndex,
  });

  if (indexes.current !== currentIndex) {
    setIndexes({ current: currentIndex, prev: indexes.current });
  }

  return (
    <div className="isolate absolute inset-0 z-0 overflow-hidden rounded" suppressHydrationWarning>
      {activeSlides.map((slide, index) => {
        const isCurrent = index === indexes.current;
        const isPrev = index === indexes.prev && !isCurrent;

        const translateX = isCurrent ? 0 : isPrev ? -100 : 100;

        const hasText = Boolean(slide.title?.trim() || slide.subtitle?.trim());
        const hasOverlayContent = Boolean(slide.title || slide.subtitle || slide.badge);
        const gradientCss = hasText ? resolveBannerGradient(slide.gradient) : "none";
        const fallbackImg =
          HERO_IMAGES[index % HERO_IMAGES.length]?.src || DEFAULT_FALLBACK_BANNER;

        const content = (
          <div
            key={`${slide.src}-${index}`}
            aria-hidden={!isCurrent}
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translateX(${translateX}%)`,
              transition:
                isCurrent || isPrev ? `transform ${SLIDE_DURATION_MS}ms ease-in-out` : "none",
            }}
          >
            {/* Picture element supporting mobileImageUrl when provided */}
            <picture>
              {slide.mobileSrc && (
                <source media="(max-width: 640px)" srcSet={slide.mobileSrc} />
              )}
              <img
                src={slide.src}
                alt={slide.title || "Japanese Skincare Banner"}
                aria-hidden={!isCurrent}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                decoding={index === 0 ? "sync" : "async"}
                onError={(e) => handleBannerImageError(e, fallbackImg)}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </picture>

            {/* Gradient Atmosphere Overlay - ONLY when headline or subtitle is present! */}
            {hasText && gradientCss !== "none" && (
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{ background: gradientCss }}
              />
            )}

            {/* Banner Content Overlay (Headline, Subtitle, Badge) - button removed as requested */}
            {hasOverlayContent && (
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-12 max-w-2xl text-white z-10 pointer-events-none">
                {slide.badge && (
                  <div className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 drop-shadow-sm">
                    <Sparkles className="h-3 w-3" />
                    <span>{slide.badge}</span>
                  </div>
                )}
                {slide.title && (
                  <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
                    {slide.title}
                  </h2>
                )}
                {slide.subtitle && (
                  <p className="mt-2 text-xs sm:text-sm text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] line-clamp-2 max-w-xl leading-relaxed">
                    {slide.subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        );

        if (slide.ctaLink) {
          return (
            <Link key={`${slide.src}-${index}`} to={slide.ctaLink} className="cursor-pointer">
              {content}
            </Link>
          );
        }

        return content;
      })}
    </div>
  );
}

export { HERO_IMAGES };

