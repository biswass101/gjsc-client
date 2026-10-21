"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "@/lib/navigation";
import { useShop } from "@/context";
import { formatBDT } from "@/lib/catalog";
import { toast } from "sonner";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pause,
  Play,
  ShoppingBag,
  Sparkles,
  Video,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import v1Img from "@/assets/hero/hero-with-japanese-girl.png";
import v2Img from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import v3Img from "@/assets/hero/sakura-spa-skincare-trio.png";
import v4Img from "@/assets/hero/japanese-inspired-foaming-skincare-ritual.png";
import v5Img from "@/assets/hero/Japanese Skincare Serenity Trio (1).png";
import v6Img from "@/assets/hero/Cozy Japanese Skincare Routine.png";

interface VideoReview {
  id: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  duration: string;
  views: string;
  title: string;
  caption: string;
  thumbnail: string;
  product: {
    name: string;
    slug: string;
    brand: string;
    price: number;
    compareAt?: number;
    image: string;
  };
}

const VIDEO_REVIEWS: VideoReview[] = [
  {
    id: "vid-1",
    creatorName: "Tasnim Rahman",
    creatorHandle: "@tasnim.glows",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    duration: "0:45",
    views: "48.2K",
    title: "My 3-Step Glass Skin Morning Routine in Dhaka",
    caption:
      "Honestly the Sakura Radiance Serum is the only formula that doesn't feel sticky in humid weather. My skin feels so plump and hydrated!",
    thumbnail: v1Img.src,
    product: {
      name: "Sakura Radiance Serum",
      slug: "sakura-radiance-serum",
      brand: "Glorious Japan",
      price: 4850,
      compareAt: 5900,
      image: v3Img.src,
    },
  },
  {
    id: "vid-2",
    creatorName: "Meghla Chowdhury",
    creatorHandle: "@meghla_skincare",
    creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    duration: "1:10",
    views: "62.4K",
    title: "How I cleared stubborn acne marks in 3 weeks",
    caption:
      "Matcha toner + low pH rice cleanser combo completely calmed my active breakouts and faded my pigmentation without drying out my cheeks.",
    thumbnail: v2Img.src,
    product: {
      name: "Matcha Clarifying Toner",
      slug: "matcha-clarifying-toner",
      brand: "Kyoto Botanicals",
      price: 2450,
      compareAt: 2990,
      image: v2Img.src,
    },
  },
  {
    id: "vid-3",
    creatorName: "Dr. Sultana Derma",
    creatorHandle: "@dr.sultana_derma",
    creatorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    duration: "1:32",
    views: "89.1K",
    title: "Dermatologist Review: Japanese Ferments vs Western Actives",
    caption:
      "Fermented rice filtrate and sake koji provide micro-molecular barrier support. Gentle, non-comedogenic, and suitable for sensitized Asian skin.",
    thumbnail: v3Img.src,
    product: {
      name: "Koji Ferment Moisture Cream",
      slug: "koji-ferment-cream",
      brand: "Kyoto Botanicals",
      price: 5600,
      compareAt: 6900,
      image: v3Img.src,
    },
  },
  {
    id: "vid-4",
    creatorName: "Nafisa Kamal",
    creatorHandle: "@nafisa_beauty",
    creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    duration: "0:58",
    views: "35.8K",
    title: "Zero White-Cast UV Shield Test Under Direct Sun",
    caption:
      "Tested this Hikari UV Shield under the Dhaka afternoon sun. Absorbed like a water essence with no sticky residue or flashback!",
    thumbnail: v4Img.src,
    product: {
      name: "Hikari UV Shield SPF50",
      slug: "hikari-uv-shield-spf50",
      brand: "Hikari Beauty",
      price: 2890,
      compareAt: 3400,
      image: v4Img.src,
    },
  },
  {
    id: "vid-5",
    creatorName: "Anika Tabassum",
    creatorHandle: "@anika_tokyobeauty",
    creatorAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    duration: "1:15",
    views: "54.7K",
    title: "Double Cleansing: Melting Waterproof Sunscreen Easily",
    caption:
      "Low pH rice foam that doesn't strip or tighten. The absolute best first step in any Japanese skincare routine.",
    thumbnail: v5Img.src,
    product: {
      name: "Silk Rice Gentle Cleanser",
      slug: "silk-rice-cleanser",
      brand: "Hikari Beauty",
      price: 1990,
      image: v5Img.src,
    },
  },
  {
    id: "vid-6",
    creatorName: "Samira Haque",
    creatorHandle: "@samira.skincare",
    creatorAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    duration: "0:50",
    views: "41.3K",
    title: "Japanese Rice Ferment Night Repair Ritual",
    caption:
      "Woke up with zero redness and cushioned skin. The barrier repair serum works wonders overnight in air-conditioned rooms.",
    thumbnail: v6Img.src,
    product: {
      name: "Aurora Barrier Repair Serum",
      slug: "aurora-barrier-serum",
      brand: "Glorious Japan",
      price: 5250,
      compareAt: 6100,
      image: v6Img.src,
    },
  },
];

export function FeaturedInVideos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeModalVideo, setActiveModalVideo] = useState<VideoReview | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const { addToCart } = useShop();

  const total = VIDEO_REVIEWS.length;

  const flowLeftToRight = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const flowRightToLeft = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Auto-play interval: smooth continuous flow like Trending Now
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

  return (
    <section className="relative overflow-hidden py-6 sm:py-10 lg:py-14 bg-gradient-to-b from-cream/30 via-cream/60 to-background border-y border-border/40">
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
              Watch real beauty creators demonstrate textures, unboxings, and results with our authentic Japanese skincare.
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2">
            {/* Navigation buttons */}
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

      {/* 3D Showcase Stage: exactly like Trending Now */}
      <div
        className="relative mx-auto w-full max-w-7xl h-[420px] sm:h-[500px] md:h-[540px] flex items-center justify-center select-none overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Soft radial glow behind featured center video card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[440px] lg:w-[580px] h-[280px] sm:h-[440px] lg:h-[580px] rounded-full bg-radial from-primary/15 via-primary/5 to-transparent blur-3xl"
        />

        {VIDEO_REVIEWS.map((video, idx) => {
          let diff = (idx - activeIndex) % total;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const isCenter = diff === 0;
          const isImmediate = Math.abs(diff) === 1;
          const isOuter = Math.abs(diff) === 2;
          const isVisible = Math.abs(diff) <= 2;

          if (!isVisible) return null;

          const zIndex = isCenter ? 30 : isImmediate ? 20 : isOuter ? 10 : 0;
          const opacity = isCenter ? 1 : isImmediate ? 0.8 : isOuter ? 0.45 : 0;

          const offsetMobile =
            diff === 0 ? 0 : diff > 0 ? (diff === 1 ? 58 : 108) : diff === -1 ? -58 : -108;
          const offsetDesktop =
            diff === 0 ? 0 : diff > 0 ? (diff === 1 ? 78 : 145) : diff === -1 ? -78 : -145;

          const scaleMobile = isCenter ? 1 : isImmediate ? 0.82 : isOuter ? 0.65 : 0.5;
          const scaleDesktop = isCenter ? 1 : isImmediate ? 0.85 : isOuter ? 0.70 : 0.5;

          return (
            <div
              key={video.id}
              onClick={() => {
                if (!isCenter) {
                  setActiveIndex(idx);
                } else {
                  setActiveModalVideo(video);
                  setIsPlaying(true);
                }
              }}
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
                "absolute top-2 sm:top-4 left-1/2 cursor-pointer",
                "w-[190px] sm:w-[260px] md:w-[290px] lg:w-[310px]",
                "transition-all duration-700 ease-out will-change-transform",
                "[transform:translateX(calc(-50%+var(--tx-sm)))_scale(var(--sc-sm))]",
                "sm:[transform:translateX(calc(-50%+var(--tx-lg)))_scale(var(--sc-lg))]"
              )}
            >
              <article
                className={cn(
                  "relative flex flex-col justify-between overflow-hidden rounded-md sm:rounded-2xl bg-black border transition-all duration-500 shadow-sm",
                  isCenter
                    ? "border-primary/70 shadow-2xl ring-1 ring-primary/40"
                    : "border-border/60 hover:border-primary/50"
                )}
              >
                {/* 9:14 Aspect Video Thumbnail */}
                <div className="relative aspect-[9/13] sm:aspect-[9/13.5] w-full overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                    loading="lazy"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/30" />

                  {/* Top Bar: Duration & Views */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between text-white z-10">
                    <span className="rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-semibold backdrop-blur-md">
                      {video.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-medium backdrop-blur-md">
                      <Eye className="h-2.5 w-2.5" />
                      <span>{video.views}</span>
                    </span>
                  </div>

                  {/* Center Play Button: prominent on center card */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div
                      className={cn(
                        "relative grid place-items-center rounded-full text-white backdrop-blur-md border transition-all duration-300",
                        isCenter
                          ? "h-13 w-13 sm:h-15 sm:w-15 bg-primary/90 border-primary shadow-lg scale-105"
                          : "h-10 w-10 sm:h-12 sm:w-12 bg-white/30 border-white/40"
                      )}
                    >
                      <Play className={cn("fill-white ml-0.5", isCenter ? "h-6 w-6" : "h-4 w-4 sm:h-5 sm:w-5")} />
                      {isCenter && (
                        <span className="absolute inset-0 rounded-full border border-primary animate-ping opacity-35" />
                      )}
                    </div>
                  </div>

                  {/* Bottom Content: Creator Info & Tagged Product */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 text-white z-10 flex flex-col justify-end">
                    {/* Creator Header */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <img
                        src={video.creatorAvatar}
                        alt={video.creatorName}
                        className="h-6 w-6 rounded-full object-cover border border-white/60"
                      />
                      <div className="leading-tight truncate">
                        <p className="text-[11px] font-semibold flex items-center gap-1 text-white truncate">
                          <span>{video.creatorName}</span>
                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                        </p>
                        <p className="text-[9px] text-white/70">{video.creatorHandle}</p>
                      </div>
                    </div>

                    <p className="font-display text-xs sm:text-sm font-semibold line-clamp-2 leading-snug text-white">
                      {video.title}
                    </p>

                    {/* Tagged Product Pill (Highlighted on Center Card) */}
                    <div className="mt-2 flex items-center justify-between rounded-xl bg-white/15 backdrop-blur-md border border-white/25 p-1.5 text-[10px]">
                      <div className="flex items-center gap-1.5 truncate">
                        <ShoppingBag className="h-3 w-3 text-primary shrink-0" />
                        <span className="font-medium text-white truncate">{video.product.name}</span>
                      </div>
                      <span className="font-bold text-white shrink-0 ml-1">
                        {formatBDT(video.product.price)}
                      </span>
                    </div>

                    {/* Center Card Action Buttons */}
                    {isCenter && (
                      <div className="mt-2.5 flex items-center gap-1.5 pt-1 border-t border-white/20">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalVideo(video);
                            setIsPlaying(true);
                          }}
                          className="flex-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold py-1.5 transition-colors text-center"
                        >
                          Watch Video
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(video.product.slug, video.product.name);
                          }}
                          className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-semibold py-1.5 transition-colors flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="h-3 w-3" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {/* Center status text */}
      <div className="text-center mt-3 sm:mt-4">
        <p className="text-[10px] sm:text-xs text-muted-foreground tracking-wider uppercase font-medium">
          {activeIndex + 1} of {total} · {VIDEO_REVIEWS[activeIndex]?.creatorHandle} featuring {VIDEO_REVIEWS[activeIndex]?.product.name}
        </p>
      </div>

      {/* Video Modal Preview */}
      {activeModalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalVideo(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-2xl bg-card border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalVideo(null)}
              className="absolute right-3 top-3 z-30 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left: Video Player Simulation */}
              <div className="relative h-60 sm:h-72 md:h-full bg-black overflow-hidden flex items-center justify-center">
                <img
                  src={activeModalVideo.thumbnail}
                  alt={activeModalVideo.title}
                  className="h-full w-full object-cover opacity-85"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="grid h-14 w-14 place-items-center rounded-full bg-primary/90 text-primary-foreground backdrop-blur-md shadow-lg transition-transform hover:scale-105"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6 fill-current" />
                    ) : (
                      <Play className="h-6 w-6 fill-current ml-0.5" />
                    )}
                  </button>
                </div>

                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white text-xs">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 rounded-md bg-black/40 backdrop-blur-xs hover:bg-black/60"
                  >
                    {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </button>
                  <span className="text-[9px] sm:text-[10px] text-white/80">Reel Preview · {activeModalVideo.duration}</span>
                </div>
              </div>

              {/* Right: Creator Details & Tagged Product */}
              <div className="p-4 sm:p-6 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div>
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-border/70">
                    <img
                      src={activeModalVideo.creatorAvatar}
                      alt={activeModalVideo.creatorName}
                      className="h-9 w-9 rounded-full object-cover border"
                    />
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                        <span>{activeModalVideo.creatorName}</span>
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </h4>
                      <p className="text-[11px] text-muted-foreground">{activeModalVideo.creatorHandle}</p>
                    </div>
                  </div>

                  <h3 className="mt-2.5 font-display text-sm sm:text-base font-bold leading-snug">
                    {activeModalVideo.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed italic bg-muted/30 p-2.5 rounded-xl border border-border/50">
                    "{activeModalVideo.caption}"
                  </p>
                </div>

                {/* Tagged Product Box */}
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-2.5">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-primary block">
                    Featured Product in Video
                  </span>

                  <div className="flex items-center gap-2.5">
                    <img
                      src={activeModalVideo.product.image}
                      alt={activeModalVideo.product.name}
                      className="h-12 w-12 rounded-lg object-cover bg-cream border border-border shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                        {activeModalVideo.product.brand}
                      </p>
                      <h4 className="text-xs font-semibold truncate text-foreground">
                        {activeModalVideo.product.name}
                      </h4>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="font-display text-xs sm:text-sm font-bold text-foreground">
                          {formatBDT(activeModalVideo.product.price)}
                        </span>
                        {activeModalVideo.product.compareAt && (
                          <span className="text-[9px] text-muted-foreground line-through">
                            {formatBDT(activeModalVideo.product.compareAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(activeModalVideo.product.slug, activeModalVideo.product.name)
                      }
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all active:scale-98"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Add To Bag</span>
                    </button>
                    <Link
                      to="/product/$slug"
                      params={{ slug: activeModalVideo.product.slug }}
                      className="rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary transition-colors text-center shrink-0"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
