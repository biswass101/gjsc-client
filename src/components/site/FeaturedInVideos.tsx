"use client";

import { useState } from "react";
import { Link } from "@/lib/navigation";
import { useShop } from "@/lib/store";
import { formatBDT } from "@/lib/catalog";
import { toast } from "sonner";
import {
  CheckCircle2,
  Eye,
  Heart,
  Pause,
  Play,
  ShoppingBag,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import v1Img from "@/assets/hero/hero-with-japanese-girl.png";
import v2Img from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import v3Img from "@/assets/hero/sakura-spa-skincare-trio.png";
import v4Img from "@/assets/hero/japanese-inspired-foaming-skincare-ritual.png";

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
];

export function FeaturedInVideos() {
  const [activeVideo, setActiveVideo] = useState<VideoReview | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const { addToCart } = useShop();

  const handleAddToCart = (slug: string, name: string) => {
    addToCart(slug);
    toast.success(`Added ${name} to bag!`);
  };

  return (
    <section className="bg-cream/40 py-6 sm:py-10 lg:py-14">
      <div className="container-lux">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="eyebrow text-[10px] sm:text-xs tracking-[0.2em] font-semibold">
                REAL ROUTINES & REVIEWS
              </span>
            </div>
            <h2 className="mt-0.5 font-display text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Featured In Videos
            </h2>
            <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground hidden sm:block">
              Watch real beauty creators demonstrate textures, unboxings, and results with our authentic Japanese skincare.
            </p>
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider shrink-0">
            Tap to play
          </span>
        </div>

        {/* 4 Video Cards Grid (Responsive 2 cols on mobile, 4 on md) */}
        <div className="grid gap-3 sm:gap-4 md:grid-cols-4 grid-cols-2">
          {VIDEO_REVIEWS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => {
                setActiveVideo(vid);
                setIsPlaying(true);
              }}
              className="group relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-black shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-primary/60 active:scale-98"
            >
              {/* Aspect Ratio 9:15 Container */}
              <div className="relative aspect-[9/15] w-full overflow-hidden">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                  loading="lazy"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

                {/* Top Bar: Duration & Views */}
                <div className="absolute top-2 inset-x-2 flex items-center justify-between text-white z-10">
                  <span className="rounded-full bg-black/60 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-semibold backdrop-blur-md">
                    {vid.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-medium backdrop-blur-md">
                    <Eye className="h-2.5 w-2.5" />
                    <span>{vid.views}</span>
                  </span>
                </div>

                {/* Center Play Button with Pulse */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="relative grid h-10 w-10 sm:h-13 sm:w-13 place-items-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary shadow-md">
                    <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-white ml-0.5" />
                    <span className="absolute inset-0 rounded-full border border-white/60 animate-ping opacity-30" />
                  </div>
                </div>

                {/* Bottom Content: Creator & Tagged Product */}
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5 text-white z-10 flex flex-col justify-end">
                  {/* Creator Info */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <img
                      src={vid.creatorAvatar}
                      alt={vid.creatorName}
                      className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover border border-white/50"
                    />
                    <div className="leading-tight truncate">
                      <p className="text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 text-white truncate">
                        <span>{vid.creatorName}</span>
                        <CheckCircle2 className="h-2.5 w-2.5 text-primary shrink-0" />
                      </p>
                    </div>
                  </div>

                  <p className="font-display text-[11px] sm:text-xs font-semibold line-clamp-2 leading-snug text-white">
                    {vid.title}
                  </p>

                  {/* Tagged Product Pill */}
                  <div className="mt-1.5 flex items-center justify-between rounded-lg bg-white/15 backdrop-blur-md border border-white/20 p-1 text-[9px] sm:text-[10px]">
                    <div className="flex items-center gap-1 truncate">
                      <ShoppingBag className="h-2.5 w-2.5 text-primary shrink-0" />
                      <span className="font-medium text-white truncate">{vid.product.name}</span>
                    </div>
                    <span className="font-bold text-white shrink-0 ml-1">
                      {formatBDT(vid.product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Preview - Mobile Scrollable & Centered */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-2xl bg-card border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute right-3 top-3 z-30 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left: Video Player Simulation */}
              <div className="relative h-60 xs:h-72 md:h-full bg-black overflow-hidden flex items-center justify-center">
                <img
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  className="h-full w-full object-cover opacity-85"
                />

                {/* Simulated playing controls */}
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

                {/* Bottom player bar */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white text-xs">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 rounded-md bg-black/40 backdrop-blur-xs hover:bg-black/60"
                  >
                    {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </button>
                  <span className="text-[9px] sm:text-[10px] text-white/80">Reel Preview · {activeVideo.duration}</span>
                </div>
              </div>

              {/* Right: Creator Details & Tagged Product */}
              <div className="p-4 sm:p-6 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div>
                  {/* Creator Header */}
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-border/70">
                    <img
                      src={activeVideo.creatorAvatar}
                      alt={activeVideo.creatorName}
                      className="h-9 w-9 rounded-full object-cover border"
                    />
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                        <span>{activeVideo.creatorName}</span>
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </h4>
                      <p className="text-[11px] text-muted-foreground">{activeVideo.creatorHandle}</p>
                    </div>
                  </div>

                  {/* Video Title & Caption */}
                  <h3 className="mt-2.5 font-display text-sm sm:text-base font-bold leading-snug">
                    {activeVideo.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed italic bg-muted/30 p-2.5 rounded-xl border border-border/50">
                    "{activeVideo.caption}"
                  </p>
                </div>

                {/* Tagged Product Box */}
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-2.5">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-primary block">
                    Featured Product in Video
                  </span>

                  <div className="flex items-center gap-2.5">
                    <img
                      src={activeVideo.product.image}
                      alt={activeVideo.product.name}
                      className="h-12 w-12 rounded-lg object-cover bg-cream border border-border shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                        {activeVideo.product.brand}
                      </p>
                      <h4 className="text-xs font-semibold truncate text-foreground">
                        {activeVideo.product.name}
                      </h4>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="font-display text-xs sm:text-sm font-bold text-foreground">
                          {formatBDT(activeVideo.product.price)}
                        </span>
                        {activeVideo.product.compareAt && (
                          <span className="text-[9px] text-muted-foreground line-through">
                            {formatBDT(activeVideo.product.compareAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(activeVideo.product.slug, activeVideo.product.name)
                      }
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all active:scale-98"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Add To Bag</span>
                    </button>
                    <Link
                      to="/product/$slug"
                      params={{ slug: activeVideo.product.slug }}
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
