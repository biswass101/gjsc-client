"use client";

import { useEffect, useState } from "react";
import { useShop } from "@/context";
import { formatBDT } from "@/lib/catalog";
import { Link } from "@/lib/navigation";
import { toast } from "sonner";
import { Flame, Heart, ShoppingBag, Star, Zap } from "lucide-react";
import f1Img from "@/assets/new_products_images/i6.jpg";
import f2Img from "@/assets/new_products_images/i10.jpg";
import f3Img from "@/assets/new_products_images/i4.jpg";
import f4Img from "@/assets/new_products_images/i14.jpg";
import { cn } from "@/lib/utils";

interface FlashItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  compareAt: number;
  discount: number;
  stockLeft: number;
  claimedPercent: number;
  rating: number;
  image: string;
}

const FLASH_ITEMS: FlashItem[] = [
  {
    id: "flash-1",
    slug: "hikari-uv-shield-spf50",
    name: "Hikari UV Shield SPF50+ PA++++",
    brand: "Hikari Beauty",
    price: 2890,
    compareAt: 3600,
    discount: 20,
    stockLeft: 4,
    claimedPercent: 82,
    rating: 4.8,
    image: f1Img.src,
  },
  {
    id: "flash-2",
    slug: "gold-infusion-face-mask",
    name: "Gold Infusion Revitalizing Mask",
    brand: "Glorious Japan",
    price: 1290,
    compareAt: 1750,
    discount: 26,
    stockLeft: 3,
    claimedPercent: 88,
    rating: 4.7,
    image: f2Img.src,
  },
  {
    id: "flash-3",
    slug: "pearl-bright-eye-cream",
    name: "Pearl Bright Caffeine Eye Cream",
    brand: "Kyoto Botanicals",
    price: 3290,
    compareAt: 4200,
    discount: 22,
    stockLeft: 6,
    claimedPercent: 74,
    rating: 4.9,
    image: f3Img.src,
  },
  {
    id: "flash-4",
    slug: "aurora-barrier-serum",
    name: "Aurora Barrier Repair Serum (50ml)",
    brand: "Glorious Japan",
    price: 5250,
    compareAt: 6800,
    discount: 23,
    stockLeft: 2,
    claimedPercent: 92,
    rating: 4.9,
    image: f4Img.src,
  },
];

export function FlashSaleSection() {
  const { addToCart, toggleWishlist, wishlist } = useShop();

  // Real-time ticking countdown timer (set to 8h 45m from now for demo)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaim = (item: FlashItem) => {
    addToCart(item.slug);
    toast.success(`Claimed Flash Deal for ${item.name}!`, {
      description: `Discount of ${item.discount}% applied.`,
    });
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="bg-cream/40 py-8 sm:py-12 border-y border-border/40">
      <div className="container-lux">
        {/* Header with live timer */}
        <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-rose-600 font-semibold text-[10px] sm:text-xs tracking-[0.25em] uppercase">
              <Flame className="h-4 w-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>LIMITED QUANTITY DROPS</span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Flash Sale
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Deepest discounts on Tokyo favorites. Prices revert once timer ends or stock is claimed.
            </p>
          </div>

          {/* Live Countdown Box */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-2 bg-card border border-rose-500/30 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-xs">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-rose-600 mr-1 flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 fill-rose-500" />
                <span>Ends in:</span>
              </span>
              <div className="flex items-center gap-1 text-foreground font-mono font-bold text-xs sm:text-sm">
                <span className="rounded-lg bg-primary/10 border border-primary/20 px-2 py-1">
                  {pad(timeLeft.hours)}h
                </span>
                <span>:</span>
                <span className="rounded-lg bg-primary/10 border border-primary/20 px-2 py-1">
                  {pad(timeLeft.minutes)}m
                </span>
                <span>:</span>
                <span className="rounded-lg bg-rose-500/10 border border-rose-500/20 px-2 py-1 text-rose-600">
                  {pad(timeLeft.seconds)}s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Flash Cards Grid / Mobile Horizontal Swipe Track */}
        <div className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {FLASH_ITEMS.map((item) => {
            const saved = wishlist.includes(item.slug);

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-md sm:rounded-2xl border border-rose-500/20 bg-card shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-rose-500/50 hover:shadow-lg w-[50vw] sm:w-auto shrink-0 snap-start min-w-[160px]"
              >
                <div>
                  {/* Image with Flash Badge */}
                  <div className="relative aspect-square w-full overflow-hidden bg-cream">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10">
                      <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[9px] sm:text-[11px] font-bold text-white shadow-xs">
                        -{item.discount}% OFF
                      </span>
                    </div>

                    {/* Wishlist */}
                    <button
                      type="button"
                      aria-label="Wishlist"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.slug);
                        toast(saved ? "Removed from wishlist" : "Saved to your wishlist");
                      }}
                      className="absolute right-2 top-2 sm:right-2.5 sm:top-2.5 grid h-6.5 w-6.5 sm:h-8 sm:w-8 place-items-center rounded-full border border-border bg-background/85 backdrop-blur-xs transition-colors hover:border-primary z-10"
                    >
                      <Heart
                        className={cn(
                          "h-3 w-3 sm:h-3.5 sm:w-3.5",
                          saved ? "fill-rose text-rose" : "text-muted-foreground"
                        )}
                      />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-2.5 sm:p-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
                        {item.brand}
                      </span>
                      <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500">
                        <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] sm:text-[11px] font-semibold text-foreground">
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-1 font-display text-[11px] sm:text-sm font-semibold line-clamp-1">
                      <Link
                        to="/product/$slug"
                        params={{ slug: item.slug }}
                        className="hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </h3>

                    {/* Stock Progress Bar */}
                    <div className="mt-2 sm:mt-3 space-y-1">
                      <div className="flex justify-between text-[9px] sm:text-[10px] font-medium">
                        <span className="text-muted-foreground">
                          Claimed {item.claimedPercent}%
                        </span>
                        <span className="font-semibold text-rose-600">
                          Only {item.stockLeft} left!
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-600 transition-all duration-500"
                          style={{ width: `${item.claimedPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="p-2.5 sm:p-4 pt-0">
                  <div className="flex items-baseline justify-between border-t border-border/60 pt-2 mb-2 sm:pt-2.5 sm:mb-2.5">
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground line-through block">
                        {formatBDT(item.compareAt)}
                      </span>
                      <span className="font-display text-xs sm:text-base font-bold text-rose-600">
                        {formatBDT(item.price)}
                      </span>
                    </div>
                    <span className="rounded bg-rose-500/10 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-semibold text-rose-600">
                      Save {formatBDT(item.compareAt - item.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClaim(item)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-rose-600 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-white shadow-xs transition-all hover:bg-rose-700 active:scale-[0.98]"
                  >
                    <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>Claim Deal</span>
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
