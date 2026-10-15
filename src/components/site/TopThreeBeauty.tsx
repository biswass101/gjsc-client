"use client";

import { useShop } from "@/lib/store";
import { formatBDT } from "@/lib/catalog";
import { Link } from "@/lib/navigation";
import { toast } from "sonner";
import { Award, Crown, Heart, Medal, Plus, Star, Trophy } from "lucide-react";
import p1Img from "@/assets/new_products_images/i1.jpg";
import p2Img from "@/assets/new_products_images/i3.jpg";
import p3Img from "@/assets/new_products_images/i5.jpg";
import { cn } from "@/lib/utils";

interface PodiumProduct {
  rank: 1 | 2 | 3;
  name: string;
  slug: string;
  brand: string;
  award: string;
  accolade: string;
  rating: number;
  reviews: number;
  price: number;
  compareAt?: number;
  image: string;
  volume: string;
  quote: string;
}

const PODIUM: PodiumProduct[] = [
  {
    rank: 2,
    name: "Koji Ferment Moisture Cream",
    slug: "koji-ferment-cream",
    brand: "Kyoto Botanicals",
    award: "Best Barrier Moisturizer 2026",
    accolade: "Silver Medal",
    rating: 4.8,
    reviews: 245,
    price: 5600,
    compareAt: 6900,
    image: p2Img.src,
    volume: "50g",
    quote: "Deep traditional sake ferment that melts instantly, locking in hydration without heaviness.",
  },
  {
    rank: 1,
    name: "Sakura Radiance Serum",
    slug: "sakura-radiance-serum",
    brand: "Glorious Japan",
    award: "Cult Favorite Skincare Hero 2026",
    accolade: "Grand Gold Winner",
    rating: 4.9,
    reviews: 380,
    price: 4850,
    compareAt: 5900,
    image: p1Img.src,
    volume: "50ml",
    quote: "Chosen by over 2,500 women across Bangladesh for transformative glass skin radiance and barrier resilience.",
  },
  {
    rank: 3,
    name: "Silk Rice Gentle Cleanser",
    slug: "silk-rice-cleanser",
    brand: "Hikari Beauty",
    award: "Best Gentle Daily Wash 2026",
    accolade: "Bronze Medal",
    rating: 4.8,
    reviews: 310,
    price: 1990,
    image: p3Img.src,
    volume: "150ml",
    quote: "A cloud-like, low-pH rice foam that purifies deeply while cushioning sensitive skin.",
  },
];

export function TopThreeBeauty() {
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const handleAdd = (slug: string, name: string) => {
    addToCart(slug);
    toast.success(`Added ${name} to bag!`);
  };

  return (
    <section className="bg-cream/40 py-6 sm:py-10 lg:py-14">
      <div className="container-lux">
        {/* Section Header */}
        <div className="flex items-center justify-between sm:justify-center mb-4 sm:mb-8 max-w-2xl mx-auto">
          <div className="text-left sm:text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 sm:px-3 sm:py-1 text-primary text-[9px] sm:text-xs font-semibold tracking-wider">
              <Trophy className="h-3.5 w-3.5 text-primary" />
              <span>ANNUAL BEAUTY AWARDS</span>
            </div>
            <h2 className="mt-1 sm:mt-2 font-display text-lg sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Top 3 Of Beauty
            </h2>
            <p className="mt-0.5 sm:mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed hidden sm:block">
              The three holy grail Japanese formulations crowned by authentic customer reviews, repeat orders, and verified dermatologist acclaim.
            </p>
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground md:hidden uppercase tracking-wider shrink-0">
            Swipe →
          </span>
        </div>

        {/* Podium Layout: On mobile it is a swipe track like Offers To Say Yes; On desktop it's a 3-column podium */}
        <div className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:items-end max-w-6xl mx-auto">
          {PODIUM.map((item) => {
            const isFirst = item.rank === 1;
            const saved = wishlist.includes(item.slug);

            return (
              <div
                key={item.slug}
                className={cn(
                  "relative flex flex-col justify-between rounded-2xl border transition-all duration-500 overflow-hidden bg-card shadow-xs hover:shadow-lg w-[82vw] xs:w-[70vw] sm:w-auto shrink-0 snap-start",
                  isFirst
                    ? "order-1 md:order-2 border-amber-400/70 md:-translate-y-4 ring-1 ring-amber-400/40 shadow-amber-500/10"
                    : item.rank === 2
                    ? "order-2 md:order-1 border-border/80"
                    : "order-3 md:order-3 border-border/80"
                )}
              >
                {/* Top Rank Badge */}
                <div
                  className={cn(
                    "px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between text-xs font-semibold border-b",
                    isFirst
                      ? "bg-gradient-to-r from-amber-500/20 via-primary/15 to-amber-500/20 border-amber-400/30 text-amber-900 dark:text-amber-200"
                      : "bg-muted/60 border-border text-foreground"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {isFirst ? (
                      <Crown className="h-4 w-4 text-amber-500 fill-amber-400" />
                    ) : item.rank === 2 ? (
                      <Medal className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Award className="h-4 w-4 text-amber-700" />
                    )}
                    <span className="font-display font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                      Rank #{item.rank}
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold opacity-90">
                    {item.accolade}
                  </span>
                </div>

                {/* Product Image Area */}
                <div className="relative aspect-square w-full overflow-hidden bg-cream/80 group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    aria-label="Wishlist"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(item.slug);
                      toast(saved ? "Removed from wishlist" : "Saved to your wishlist");
                    }}
                    className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-border bg-background/85 backdrop-blur-xs transition-colors hover:border-primary z-10 active:scale-95"
                  >
                    <Heart
                      className={cn("h-3.5 w-3.5", saved ? "fill-rose text-rose" : "text-muted-foreground")}
                    />
                  </button>

                  {/* Volume Pill */}
                  <div className="absolute left-2.5 bottom-2.5 sm:left-3 sm:bottom-3">
                    <span className="rounded-full bg-background/90 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-foreground backdrop-blur-xs border border-border/50">
                      {item.volume}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="uppercase tracking-[0.2em] text-[8px] sm:text-[9px] font-semibold text-primary">
                        {item.brand}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-foreground text-[10px] sm:text-[11px]">
                          {item.rating}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground">({item.reviews})</span>
                      </div>
                    </div>

                    <h3 className="mt-1.5 font-display text-sm sm:text-base md:text-lg font-bold leading-snug">
                      <Link
                        to="/product/$slug"
                        params={{ slug: item.slug }}
                        className="hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </h3>

                    {/* Award Tag */}
                    <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-primary">
                      <Award className="h-3 w-3 shrink-0" />
                      <span className="line-clamp-1">{item.award}</span>
                    </div>

                    {/* Customer Review Quote */}
                    <p className="mt-2 text-[11px] sm:text-xs text-muted-foreground italic leading-relaxed line-clamp-2 sm:line-clamp-3">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-4 pt-3 border-t border-border/60">
                    <div className="flex items-baseline justify-between mb-2.5">
                      <div>
                        {item.compareAt && (
                          <span className="text-[10px] sm:text-xs text-muted-foreground line-through block">
                            {formatBDT(item.compareAt)}
                          </span>
                        )}
                        <span className="font-display text-base sm:text-lg font-bold text-foreground">
                          {formatBDT(item.price)}
                        </span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider">
                        Tokyo Verified
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(item.slug, item.name)}
                      className={cn(
                        "flex w-full items-center justify-center gap-1.5 rounded-xl py-2 sm:py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-[0.98]",
                        isFirst
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add #{item.rank} To Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
