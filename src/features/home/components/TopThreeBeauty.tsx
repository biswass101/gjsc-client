"use client";

import { useShop } from "@/context";
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
    quote: "Traditional sake ferment that melts into the skin, locking in deep hydration without heaviness.",
  },
  {
    rank: 1,
    name: "Sakura Radiance Serum",
    slug: "sakura-radiance-serum",
    brand: "Glorious Japan",
    award: "Cult Favorite Skincare Hero",
    accolade: "Grand Gold Winner",
    rating: 4.9,
    reviews: 380,
    price: 4850,
    compareAt: 5900,
    image: p1Img.src,
    volume: "50ml",
    quote: "Chosen by over 2,500 women across Bangladesh for transformative glass skin radiance.",
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
    quote: "A cloud-like, low-pH rice foam that purifies deeply while cushioning sensitive barriers.",
  },
];

export function TopThreeBeauty() {
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const handleAdd = (slug: string, name: string) => {
    addToCart(slug);
    toast.success(`Added ${name} to bag!`);
  };

  return (
    <section className="bg-cream/40 py-8 sm:py-12 lg:py-16 border-y border-border/40">
      <div className="container-lux">
        {/* Section Header - Perfectly Centered */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-primary text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
            <Trophy className="h-3.5 w-3.5 text-primary" />
            <span>ANNUAL TOKYO BEAUTY AWARDS</span>
          </div>

          <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Top 3 Of Beauty
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The three crowning holy grail Japanese formulations chosen by customer acclaim, repeat orders, and verified dermatologist praise.
          </p>
        </div>

        {/* 3-Card Podium Grid: Centered on Desktop, Swipe Track on Mobile */}
        <div className="flex gap-3.5 sm:gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:items-end max-w-4xl mx-auto">
          {PODIUM.map((item) => {
            const isFirst = item.rank === 1;
            const saved = wishlist.includes(item.slug);

            return (
              <div
                key={item.slug}
                className={cn(
                  "relative flex flex-col justify-between rounded-md sm:rounded-lg border transition-all duration-500 overflow-hidden bg-card shadow-xs hover:shadow-lg w-[70vw] sm:w-[45vw] md:w-auto shrink-0 snap-center min-w-[210px]",
                  isFirst
                    ? "order-1 md:order-2 border-amber-400/80 md:-translate-y-3 ring-2 ring-amber-400/30 shadow-amber-500/10"
                    : item.rank === 2
                    ? "order-2 md:order-1 border-border/80"
                    : "order-3 md:order-3 border-border/80"
                )}
              >
                <div>
                  {/* Centered Top Rank Badge Header */}
                  <div
                    className={cn(
                      "px-3 py-2 flex items-center justify-center gap-1.5 text-xs font-semibold border-b text-center",
                      isFirst
                        ? "bg-gradient-to-r from-amber-500/20 via-primary/20 to-amber-500/20 border-amber-400/30 text-amber-900 dark:text-amber-200"
                        : "bg-muted/60 border-border text-foreground"
                    )}
                  >
                    {isFirst ? (
                      <Crown className="h-4 w-4 text-amber-500 fill-amber-400" />
                    ) : item.rank === 2 ? (
                      <Medal className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Award className="h-4 w-4 text-amber-700" />
                    )}
                    <span className="font-display font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                      Rank #{item.rank} · {item.accolade}
                    </span>
                  </div>

                  {/* Product Image Area - Low Area with Sleek Aspect */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream/80 group">
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
                      className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full border border-border bg-background/85 backdrop-blur-xs transition-colors hover:border-primary z-10 active:scale-95"
                    >
                      <Heart
                        className={cn("h-3.5 w-3.5", saved ? "fill-rose text-rose" : "text-muted-foreground")}
                      />
                    </button>

                    {/* Volume Pill */}
                    <div className="absolute left-2.5 bottom-2.5">
                      <span className="rounded-full bg-background/90 px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-medium text-foreground backdrop-blur-xs border border-border/50">
                        {item.volume}
                      </span>
                    </div>
                  </div>

                  {/* Body Content - All Elements Centered */}
                  <div className="p-3 sm:p-4 text-center">
                    {/* Brand */}
                    <p className="uppercase tracking-[0.2em] text-[8.5px] sm:text-[9.5px] font-semibold text-primary">
                      {item.brand}
                    </p>

                    {/* Title */}
                    <h3 className="mt-1 font-display text-sm sm:text-[15px] font-bold leading-snug line-clamp-1">
                      <Link
                        to="/product/$slug"
                        params={{ slug: item.slug }}
                        className="hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </h3>

                    {/* Award Tag - Centered */}
                    <div className="mt-1.5 flex justify-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-primary">
                        <Award className="h-3 w-3 shrink-0" />
                        <span className="truncate max-w-[190px]">{item.award}</span>
                      </span>
                    </div>

                    {/* Star Rating - Centered */}
                    <div className="mt-2 flex items-center justify-center gap-1 text-amber-500">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-foreground text-[10.5px] sm:text-[11.5px]">
                        {item.rating}
                      </span>
                      <span className="text-[9px] sm:text-[9.5px] text-muted-foreground">
                        ({item.reviews} reviews)
                      </span>
                    </div>

                    {/* Customer Review Quote - Centered */}
                    <p className="mt-2 text-[10.5px] sm:text-[11px] text-muted-foreground italic leading-relaxed line-clamp-2">
                      "{item.quote}"
                    </p>
                  </div>
                </div>

                {/* Price & Action Footer - Centered */}
                <div className="p-3 sm:p-4 pt-0 text-center">
                  <div className="pt-2.5 border-t border-border/60 mb-2.5 flex items-baseline justify-center gap-2">
                    {item.compareAt && (
                      <span className="text-[10px] sm:text-[11px] text-muted-foreground line-through">
                        {formatBDT(item.compareAt)}
                      </span>
                    )}
                    <span className="font-display text-sm sm:text-base font-bold text-foreground">
                      {formatBDT(item.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(item.slug, item.name)}
                    className={cn(
                      "flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold shadow-xs transition-all active:scale-[0.98]",
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
