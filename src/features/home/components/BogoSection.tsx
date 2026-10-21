"use client";

import { useShop } from "@/context";
import { formatBDT } from "@/lib/catalog";
import { Link } from "@/lib/navigation";
import { toast } from "sonner";
import { Gift, Heart, Plus, Sparkles, Star } from "lucide-react";
import p1Img from "@/assets/new_products_images/i10.jpg";
import p2Img from "@/assets/new_products_images/i7.jpg";
import p3Img from "@/assets/new_products_images/i8.jpg";
import p4Img from "@/assets/new_products_images/i12.jpg";
import { cn } from "@/lib/utils";

interface BogoItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  freeGift: string;
  giftValue: number;
}

const BOGO_ITEMS: BogoItem[] = [
  {
    id: "bogo-1",
    slug: "gold-infusion-face-mask",
    name: "Gold Infusion Face Mask",
    brand: "Glorious Japan",
    price: 1290,
    rating: 4.7,
    reviews: 64,
    image: p1Img.src,
    freeGift: "Free Sakura Petal Lip Balm",
    giftValue: 950,
  },
  {
    id: "bogo-2",
    slug: "camellia-hydra-face-wash",
    name: "Camellia Hydra Face Wash",
    brand: "Sakura Lab",
    price: 1750,
    rating: 4.8,
    reviews: 89,
    image: p2Img.src,
    freeGift: "Free Micro-Foam Cleansing Net",
    giftValue: 650,
  },
  {
    id: "bogo-3",
    slug: "pearl-bright-eye-cream",
    name: "Pearl Bright Eye Cream",
    brand: "Kyoto Botanicals",
    price: 3290,
    rating: 4.9,
    reviews: 132,
    image: p3Img.src,
    freeGift: "Free Japanese Silk Sleep Mask",
    giftValue: 1100,
  },
  {
    id: "bogo-4",
    slug: "hinoki-body-milk",
    name: "Hinoki Body Milk (250ml)",
    brand: "Yuzu No Mori",
    price: 2650,
    rating: 4.6,
    reviews: 51,
    image: p4Img.src,
    freeGift: "Free Travel Size Rice Cleanser",
    giftValue: 850,
  },
];

export function BogoSection() {
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const handleClaim = (item: BogoItem) => {
    addToCart(item.slug);
    toast.success(`Claimed BOGO Offer for ${item.name}!`, {
      description: `${item.freeGift} (Valued at ${formatBDT(item.giftValue)}) will be included in your package.`,
    });
  };

  return (
    <section className="bg-background py-6 sm:py-8 lg:py-10">
      <div className="container-lux">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-primary">
              <Gift className="h-3.5 w-3.5" />
              <span className="eyebrow text-[10px] sm:text-xs tracking-[0.25em] font-semibold">
                DOUBLE THE RADIANCE
              </span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              Buy One Get One
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Order your favourite Japanese holy grail and receive a complimentary full-sized gift with your shipment.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
              Limited stock per customer
            </span>
          </div>
        </div>

        {/* 4 Cards Grid / Mobile Horizontal Swipe Track */}
        <div className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {BOGO_ITEMS.map((item) => {
            const saved = wishlist.includes(item.slug);

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-md sm:rounded-2xl border border-border bg-card shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-lift)] w-[50vw] sm:w-auto shrink-0 snap-start min-w-[160px]"
              >
                <div>
                  {/* Image with BOGO Badge */}
                  <div className="relative aspect-square w-full overflow-hidden bg-cream">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top BOGO Badge */}
                    <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10">
                      <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                        BOGO Deal
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

                  {/* Body */}
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

                    {/* Free Gift Tag */}
                    <div className="mt-2 sm:mt-2.5 flex items-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-[9px] sm:text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      <Gift className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-emerald-600" />
                      <span className="truncate">{item.freeGift}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="p-2.5 sm:p-4 pt-0">
                  <div className="flex items-baseline justify-between border-t border-border/60 pt-2 mb-2 sm:pt-2.5 sm:mb-2.5">
                    <div>
                      <span className="text-[8.5px] sm:text-[9px] text-muted-foreground uppercase tracking-wider block">
                        Pay Only
                      </span>
                      <span className="font-display text-xs sm:text-base font-bold text-foreground">
                        {formatBDT(item.price)}
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground line-through">
                      Worth {formatBDT(item.price + item.giftValue)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClaim(item)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-[0.98]"
                  >
                    <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>Claim BOGO Offer</span>
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
