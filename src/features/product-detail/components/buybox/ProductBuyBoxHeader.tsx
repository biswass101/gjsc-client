"use client";

import { ChevronRight, Flame, Heart, Share2 } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Rating } from "@/components/common";
import { slugify } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductBuyBoxHeaderProps {
  product: Product;
  reviewsCount: number;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onShare: () => void;
  onScrollToReviews: () => void;
}

export function ProductBuyBoxHeader({
  product,
  reviewsCount,
  isWishlisted,
  onToggleWishlist,
  onShare,
  onScrollToReviews,
}: ProductBuyBoxHeaderProps) {
  return (
    <>
      {/* Brand Eyebrow with Brand Link */}
      <div className="flex items-center justify-between gap-2">
        <Link
          to={`/brands/${slugify(product.brand)}`}
          className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary hover:text-primary/80 transition-colors"
        >
          <span>{product.brand}</span>
          <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* Action buttons: Share & Wishlist */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onShare}
            aria-label="Share product"
            className="grid h-8 w-8 place-items-center rounded-full border border-border/70 bg-background text-muted-foreground hover:border-primary hover:text-foreground transition-all active:scale-95 shadow-xs cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onToggleWishlist}
            aria-label="Toggle wishlist"
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full border border-border/70 bg-background transition-all active:scale-95 shadow-xs cursor-pointer",
              isWishlisted
                ? "border-rose/50 bg-rose/10 text-rose"
                : "text-muted-foreground hover:border-primary hover:text-foreground",
            )}
          >
            <Heart
              className={cn("h-3.5 w-3.5", isWishlisted && "fill-rose text-rose")}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      {/* Product Title */}
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground leading-[1.15]">
        {product.name}
      </h1>

      {/* Japanese Subtitle */}
      <p className="mt-1 text-xs font-serif tracking-widest text-muted-foreground/80">
        伝統と科学の調和 · Authentic Japanese Botanical Formula
      </p>

      {/* Rating & Social Proof Bar */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <Rating value={product.rating} count={product.reviews} />
          <button
            type="button"
            onClick={onScrollToReviews}
            className="ml-1 text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 cursor-pointer"
          >
            ({reviewsCount} reviews)
          </button>
        </div>

        <span className="text-muted-foreground/40">•</span>

        <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
          <Flame className="h-3.5 w-3.5 fill-current" />
          <span>28 people viewed this hour</span>
        </div>
      </div>
    </>
  );
}
