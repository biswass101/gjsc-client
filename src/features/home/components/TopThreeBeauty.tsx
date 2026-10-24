"use client";

import { useShop } from "@/context";
import { formatBDT } from "@/lib/catalog";
import { Link } from "@/lib/navigation";
import { toast } from "sonner";
import { Award, Check, Crown, Heart, Medal, Star, Trophy } from "lucide-react";
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
  features: string[];
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
    features: [
      "Traditional sake koji ferment extract",
      "72-hour deep moisture barrier repair",
    ],
    quote: "Deep hydration that melts in weightlessly.",
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
    features: [
      "Bio-engineered cherry blossom actives",
      "Transformative luminous glass-skin glow",
      "Triple hyaluronic acid & niacinamide",
    ],
    quote: "Chosen by 2,500+ women for glass skin.",
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
    features: [
      "Low-pH micro-dense amino acid foam",
      "100% Japanese rice water nutrients",
    ],
    quote: "Cloud-like foam with zero barrier tightness.",
  },
];

export function TopThreeBeauty() {
  const { toggleWishlist, wishlist } = useShop();

  return (
    <section className="bg-cream/40 py-8 sm:py-12 lg:py-14 border-y border-border/40">
      <div className="container-lux">
        {/* Section Header - Perfectly Centered */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-primary text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
            <Trophy className="h-3.5 w-3.5 text-primary" />
            <span>ANNUAL TOKYO BEAUTY AWARDS</span>
          </div>

          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Top 3 Of Beauty
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The three crowning holy grail Japanese formulations chosen by customer acclaim,
            repeat orders, and verified dermatologist praise.
          </p>
        </div>

        {/* 3 SaaS Subscription Cards: Perfectly Centered, Compact Height */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl flex justify-start sm:justify-center md:grid md:grid-cols-3 md:items-center md:justify-items-center gap-4 sm:gap-5 lg:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 pt-3 px-4 sm:px-6 md:px-0">
            {PODIUM.map((item) => {
              const isFirst = item.rank === 1; // Middle card (2nd in large screen view)
              const saved = wishlist.includes(item.slug);

              return (
                <div
                  key={item.slug}
                  className={cn(
                    "relative flex flex-col justify-between rounded-2xl border transition-all duration-500 bg-card",
                    "w-[85vw] max-w-[310px] sm:max-w-[330px] md:w-full md:max-w-none shrink-0 snap-center mx-auto",
                    isFirst
                      ? "md:scale-105 z-20 border-2 border-primary/70 shadow-xl shadow-primary/15 ring-3 ring-primary/10 p-4 sm:p-5 order-1 md:order-2"
                      : "md:scale-95 border-border/80 shadow-xs p-3.5 sm:p-4 opacity-95 hover:opacity-100 hover:border-primary/40 " +
                        (item.rank === 2 ? "order-2 md:order-1" : "order-3 md:order-3")
                  )}
                >
                  {/* Floating Banner for Middle #1 Card */}
                  {isFirst && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 rounded-full bg-linear-to-r from-amber-500 via-primary to-amber-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        <Crown className="h-3 w-3 text-amber-200 fill-amber-200" />
                        #1 Champion
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Top Rank Badge Header */}
                    <div className="flex items-center justify-center mb-2">
                      {isFirst ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/25 px-2.5 py-0.5 text-[11px] font-bold text-primary uppercase tracking-wider">
                          <Trophy className="h-3 w-3 text-primary" />
                          Grand Gold Winner
                        </span>
                      ) : item.rank === 2 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Medal className="h-3 w-3 text-slate-400" />
                          Rank #2 · Silver
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-900/10 dark:bg-amber-900/30 border border-amber-800/20 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          <Award className="h-3 w-3 text-amber-700" />
                          Rank #3 · Bronze
                        </span>
                      )}
                    </div>

                    {/* Compact Product Image Area */}
                    <div
                      className={cn(
                        "relative w-full overflow-hidden rounded-xl bg-cream/70 group mb-2.5",
                        isFirst ? "aspect-[16/9]" : "aspect-[16/8.5]"
                      )}
                    >
                      <Link
                        to="/product/$slug"
                        params={{ slug: item.slug }}
                        className="block h-full w-full"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>

                      {/* Wishlist Button */}
                      <button
                        type="button"
                        aria-label="Wishlist"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(item.slug);
                          toast(saved ? "Removed from wishlist" : "Saved to your wishlist");
                        }}
                        className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full border border-border/80 bg-background/90 backdrop-blur-xs transition-colors hover:border-primary z-10 active:scale-95 cursor-pointer shadow-2xs"
                      >
                        <Heart
                          className={cn(
                            "h-3 w-3",
                            saved ? "fill-rose text-rose" : "text-muted-foreground"
                          )}
                        />
                      </button>

                      {/* Volume Pill */}
                      <span className="absolute bottom-1.5 left-1.5 rounded-full bg-background/90 px-1.5 py-0.5 text-[8px] font-medium text-foreground backdrop-blur-xs border border-border/60">
                        {item.volume}
                      </span>
                    </div>

                    {/* Product Title & Brand */}
                    <div className="text-center px-1">
                      <p className="uppercase tracking-[0.2em] text-[8px] sm:text-[9px] font-semibold text-primary">
                        {item.brand}
                      </p>

                      <h3
                        className={cn(
                          "mt-0.5 font-display font-bold leading-snug line-clamp-1",
                          isFirst ? "text-sm sm:text-base" : "text-[13px] sm:text-sm"
                        )}
                      >
                        <Link
                          to="/product/$slug"
                          params={{ slug: item.slug }}
                          className="hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                      </h3>

                      <p className="mt-0.5 text-[10.5px] text-muted-foreground line-clamp-1">
                        {item.award}
                      </p>
                    </div>

                    {/* Compact Pricing Row */}
                    <div className="my-2 text-center pt-2 border-t border-border/60">
                      <div className="flex items-baseline justify-center gap-1">
                        <span
                          className={cn(
                            "font-display font-extrabold text-foreground tracking-tight",
                            isFirst ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                          )}
                        >
                          {formatBDT(item.price)}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium">
                          / {item.volume}
                        </span>
                      </div>

                      {item.compareAt && (
                        <div className="mt-0.5 flex items-center justify-center gap-1.5">
                          <span className="text-[11px] text-muted-foreground line-through">
                            {formatBDT(item.compareAt)}
                          </span>
                          <span className="text-[9px] font-bold text-rose-600 bg-rose-500/10 px-1.5 py-0.2 rounded-full">
                            Save {formatBDT(item.compareAt - item.price)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Concise Formula Highlights */}
                    <div className="my-2 pt-2 border-t border-border/60 space-y-1 text-left">
                      {item.features.map((feat) => (
                        <div
                          key={feat}
                          className="flex items-start gap-1.5 text-xs text-foreground/90"
                        >
                          <Check
                            className={cn(
                              "h-3 w-3 shrink-0 mt-0.5",
                              isFirst ? "text-primary stroke-[2.5]" : "text-emerald-600 stroke-2"
                            )}
                          />
                          <span className="leading-tight text-[11px] sm:text-[11.5px] truncate">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating & Short Quote Footer (No Button) */}
                  <div className="mt-auto pt-2 border-t border-border/50 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-foreground text-[11px]">
                        {item.rating}
                      </span>
                      <span className="text-[9.5px] text-muted-foreground">
                        ({item.reviews} reviews)
                      </span>
                    </div>

                    <p className="text-[10.5px] text-muted-foreground italic leading-relaxed line-clamp-1 px-1">
                      "{item.quote}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
