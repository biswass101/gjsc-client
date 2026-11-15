"use client";

import { useState, useEffect, useMemo } from "react";
import { useAdmin } from "@/context/admin-context";
import { Sakura } from "./SakuraFallingAnimation";
import { BackgroundSlider, HERO_IMAGES, HeroSlide } from "./BackgroundSlider";
import { CarouselIndicators } from "./CarouselIndicators";

export function Hero() {
  const { banners } = useAdmin();
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroSlides = useMemo<HeroSlide[]>(() => {
    const activeHero = (banners || [])
      .filter((b) => b.pageKey === "home_hero" && b.active !== false)
      .sort((a, b) => a.order - b.order);

    if (activeHero.length > 0) {
      return activeHero.map((b) => ({
        src: b.imageUrl,
        mobileSrc: b.mobileImageUrl,
        ctaLink: b.ctaLink,
        ctaText: b.ctaText,
        title: b.title,
        subtitle: b.subtitle,
        badge: b.badge,
        gradient: b.gradient,
      }));
    }
    return HERO_IMAGES.map((img) => ({ src: img.src }));
  }, [banners]);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="container-lux pt-3" suppressHydrationWarning>
      <div className="relative flex h-52 items-center overflow-hidden rounded-md sm:rounded-xl sm:h-95 lg:h-115" suppressHydrationWarning>
        <BackgroundSlider currentIndex={currentIndex} slides={heroSlides} />

        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <Sakura />
        </div>

        <CarouselIndicators
          currentIndex={currentIndex}
          total={heroSlides.length}
          onSelect={setCurrentIndex}
        />
      </div>
    </section>
  );
}

