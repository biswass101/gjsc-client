"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useShop } from "@/context";
import { useAdmin, AdminFeaturedVideo } from "@/context/admin-context";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Video } from "lucide-react";
import { FeaturedVideoCard } from "./videos/FeaturedVideoCard";
import { FeaturedVideoModal } from "./videos/FeaturedVideoModal";

export function FeaturedInVideos() {
  const { featuredVideos } = useAdmin();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeModalVideo, setActiveModalVideo] = useState<AdminFeaturedVideo | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const { addToCart } = useShop();

  const videos = useMemo(() => {
    const list = featuredVideos && featuredVideos.length > 0 ? featuredVideos : [];
    return list
      .filter((v) => v.active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [featuredVideos]);

  const total = videos.length;

  // Keep active index in bounds
  useEffect(() => {
    if (total > 0 && activeIndex >= total) {
      setActiveIndex(0);
    }
  }, [total, activeIndex]);

  const flowLeftToRight = useCallback(() => {
    if (total <= 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const flowRightToLeft = useCallback(() => {
    if (total <= 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Auto-play interval
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      flowLeftToRight();
    }, 4500);
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

  const handleAddToCart = (slug: string, name: string) => {
    addToCart(slug);
    toast.success(`Added ${name} to bag!`);
  };

  if (total === 0) {
    return null;
  }

  return (
    <section
      id="featured-videos"
      className="relative overflow-hidden py-6 sm:py-10 lg:py-14 bg-gradient-to-b from-cream/30 via-cream/60 to-background border-y border-border/40"
    >
      <div className="container-lux mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-1.5">
              <Video className="w-3.5 h-3.5 text-primary fill-primary/30" />
              <span>REAL ROUTINES & REVIEWS</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Featured In Videos
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Watch real beauty creators demonstrate textures, unboxings, and results with our
              authentic Japanese skincare.
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2">
            <button
              type="button"
              onClick={flowRightToLeft}
              aria-label="Previous video"
              className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-border bg-background/90 backdrop-blur shadow-xs hover:border-primary hover:text-primary transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={flowLeftToRight}
              aria-label="Next video"
              className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-border bg-background/90 backdrop-blur shadow-xs hover:border-primary hover:text-primary transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Showcase Stage */}
      <div
        className="relative mx-auto w-full max-w-7xl h-[370px] sm:h-[410px] md:h-[440px] flex items-center justify-center select-none overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[380px] lg:w-[500px] h-[240px] sm:h-[380px] lg:h-[500px] rounded-full bg-radial from-primary/15 via-primary/5 to-transparent blur-3xl"
        />

        {videos.map((video, idx) => (
          <FeaturedVideoCard
            key={video.id}
            video={video}
            idx={idx}
            activeIndex={activeIndex}
            total={total}
            onSelectCard={setActiveIndex}
            onOpenModal={setActiveModalVideo}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <div className="text-center mt-3 sm:mt-4">
        <p className="text-[10px] sm:text-xs text-muted-foreground tracking-wider uppercase font-medium">
          {activeIndex + 1} of {total} · {videos[activeIndex]?.creatorHandle} featuring{" "}
          {videos[activeIndex]?.product.name}
        </p>
      </div>

      {activeModalVideo && (
        <FeaturedVideoModal
          activeModalVideo={activeModalVideo}
          onClose={() => setActiveModalVideo(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
}
