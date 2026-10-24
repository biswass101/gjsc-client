"use client";

import { useShop } from "@/context";
import { formatBDT } from "@/lib/catalog";
import { Link } from "@/lib/navigation";
import { toast } from "sonner";
import { Check, ShoppingBag, Sparkles, Star } from "lucide-react";
import b1Img from "@/assets/hero/sakura-spa-skincare-trio.png";
import b2Img from "@/assets/hero/japanese-inspired-foaming-skincare-ritual.png";
import b3Img from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import b4Img from "@/assets/hero/Japanese Skincare Serenity Trio.png";

interface BundleDeal {
  id: string;
  slug: string;
  title: string;
  badge: string;
  savings: number;
  originalPrice: number;
  bundlePrice: number;
  rating: number;
  reviews: number;
  image: string;
  items: string[];
}

const BUNDLE_DEALS: BundleDeal[] = [
  {
    id: "bundle-1",
    slug: "sakura-radiance-serum",
    title: "Glass Skin Ritual Duo",
    badge: "Most Popular",
    savings: 1050,
    originalPrice: 6840,
    bundlePrice: 5790,
    rating: 4.9,
    reviews: 142,
    image: b1Img.src,
    items: ["Silk Rice Cleanser (150ml)", "Sakura Radiance Serum (50ml)"],
  },
  {
    id: "bundle-2",
    slug: "rice-water-deep-cleanser",
    title: "Double Cleanse & Clarify Set",
    badge: "Acne & Pores",
    savings: 950,
    originalPrice: 4640,
    bundlePrice: 3690,
    rating: 4.8,
    reviews: 98,
    image: b2Img.src,
    items: ["Rice Water Deep Cleanser (120ml)", "Matcha Clarifying Toner (150ml)"],
  },
  {
    id: "bundle-3",
    slug: "koji-ferment-cream",
    title: "Barrier Rescue & Glow Combo",
    badge: "Deep Hydration",
    savings: 1300,
    originalPrice: 9550,
    bundlePrice: 8250,
    rating: 4.9,
    reviews: 116,
    image: b3Img.src,
    items: ["Yuzu Glow Essence (100ml)", "Koji Ferment Moisture Cream (50g)"],
  },
  {
    id: "bundle-4",
    slug: "glorious-ritual-gift-set",
    title: "Ultimate Tokyo Youth Ritual",
    badge: "Luxury Trio",
    savings: 2000,
    originalPrice: 10390,
    bundlePrice: 8390,
    rating: 5.0,
    reviews: 87,
    image: b4Img.src,
    items: ["Aurora Barrier Serum", "Pearl Bright Eye Cream", "Natural Jade Roller"],
  },
];

export function OffersToSayYes() {
  const { addToCart } = useShop();

  const handleAddBundle = (deal: BundleDeal) => {
    addToCart(deal.slug);
    toast.success(`Added ${deal.title} to bag!`, {
      description: `You saved ${formatBDT(deal.savings)} on this bundle deal.`,
    });
  };

  return (
    <section className="bg-background py-5 sm:py-8 lg:py-10">
      <div className="container-lux">
        {/* Section Header */}
        <div className="mb-3 sm:mb-5 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="eyebrow text-[10px] sm:text-xs tracking-[0.2em] font-semibold">
                CURATED VALUE BUNDLES
              </span>
            </div>
            <h2 className="mt-0.5 font-display text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Offers To Say Yes
            </h2>
            <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground hidden sm:block">
              Hand-picked Japanese skincare routines paired together for maximum results and maximum savings.
            </p>
          </div>
          <Link
            to="/collections/combo-gift-sets"
            className="text-[11px] sm:text-xs font-semibold text-primary hover:underline shrink-0"
          >
            All bundles →
          </Link>
        </div>

        {/* Responsive Grid: swipe carousel with snap on mobile, 2/4-col grid on sm/lg */}
        <div className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {BUNDLE_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="group flex flex-col justify-between overflow-hidden rounded-md sm:rounded-lg border border-border bg-card shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-lift)] w-[54vw] sm:w-auto shrink-0 snap-start min-w-[175px]"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-cream">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10">
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[7.5px] sm:text-[9px] font-semibold uppercase tracking-wider text-primary-foreground shadow-xs">
                      Save {formatBDT(deal.savings)}
                    </span>
                    <span className="rounded-full bg-background/90 px-2 py-0.5 text-[7.5px] sm:text-[9px] uppercase tracking-wider text-foreground backdrop-blur-xs">
                      {deal.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-2.5 sm:p-3">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[10.5px] text-amber-500">
                    <div className="flex items-center">
                      <Star className="h-2.5 w-2.5 sm:h-2.5 sm:w-2.5 fill-amber-400 text-amber-400" />
                      <span className="ml-1 font-semibold text-foreground text-[10px] sm:text-[11px]">{deal.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-[9px] sm:text-[9.5px]">({deal.reviews})</span>
                  </div>

                  <h3 className="mt-1 font-display text-xs sm:text-[13px] font-semibold leading-snug">
                    <Link
                      to="/product/$slug"
                      params={{ slug: deal.slug }}
                      className="hover:text-primary transition-colors line-clamp-1"
                    >
                      {deal.title}
                    </Link>
                  </h3>

                  {/* Included Items List */}
                  <div className="mt-1.5 space-y-1 rounded-lg bg-muted/40 p-2 text-[10px] text-muted-foreground">
                    <p className="font-semibold text-foreground text-[8px] sm:text-[8.5px] uppercase tracking-wider">
                      Includes:
                    </p>
                    {deal.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 line-clamp-1">
                        <Check className="h-2.5 w-2.5 text-primary shrink-0" strokeWidth={2.5} />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Price & Add to Bag */}
              <div className="p-2.5 sm:p-3 pt-0">
                <div className="flex items-baseline justify-between border-t border-border/60 pt-2">
                  <div>
                    <span className="text-[9.5px] sm:text-[10px] text-muted-foreground line-through block">
                      {formatBDT(deal.originalPrice)}
                    </span>
                    <span className="font-display text-xs sm:text-sm font-bold text-foreground">
                      {formatBDT(deal.bundlePrice)}
                    </span>
                  </div>
                  <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[8.5px] sm:text-[9px] font-semibold text-emerald-600">
                    Combo Deal
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddBundle(deal)}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-1.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-[0.98]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Add Bundle to Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
