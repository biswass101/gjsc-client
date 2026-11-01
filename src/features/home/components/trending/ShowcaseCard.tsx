import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "@/lib/navigation";
import { formatBDT } from "@/lib/catalog";
import type { Product } from "@/types";
import { useShop } from "@/context";
import { Rating } from "@/components/common";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ShowcaseCardProps {
  product: Product;
  diff: number;
  isCenter: boolean;
  isImmediate: boolean;
  isOuter: boolean;
  isVisible: boolean;
  onSelect: () => void;
}

export function ShowcaseCard({
  product,
  diff,
  isCenter,
  isImmediate,
  isOuter,
  isVisible,
  onSelect,
}: ShowcaseCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const saved = wishlist.includes(product.slug);
  const off = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.slug);
    toast.success(`Added ${product.name} to bag`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
    toast(saved ? "Removed from wishlist" : "Saved to your wishlist");
  };

  const zIndex = isCenter ? 30 : isImmediate ? 20 : isOuter ? 10 : 0;
  const opacity = isCenter ? 1 : isImmediate ? 0.78 : isOuter ? 0.48 : 0;

  const offsetMobile =
    diff === 0 ? 0 : diff > 0 ? (diff === 1 ? 56 : 106) : diff === -1 ? -56 : -106;
  const offsetDesktop =
    diff === 0 ? 0 : diff > 0 ? (diff === 1 ? 75 : 142) : diff === -1 ? -75 : -142;

  const scaleMobile = isCenter ? 1 : isImmediate ? 0.82 : isOuter ? 0.65 : 0.5;
  const scaleDesktop = isCenter ? 1 : isImmediate ? 0.85 : isOuter ? 0.7 : 0.5;

  return (
    <div
      onClick={!isCenter ? onSelect : undefined}
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
        "absolute top-2 sm:top-4 left-1/2",
        "w-42.5 sm:w-55 md:w-62.5 lg:w-68.75",
        "transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1)",
        "origin-center will-change-transform",
        "transform-[translateX(calc(-50%+var(--tx-sm)))_scale(var(--sc-sm))]",
        "sm:transform-[translateX(calc(-50%+var(--tx-lg)))_scale(var(--sc-lg))]",
        !isVisible && "pointer-events-none opacity-0",
        !isCenter && "cursor-pointer hover:opacity-90",
      )}
    >
      <article
        className={cn(
          "group relative overflow-hidden rounded-md sm:rounded-lg border transition-all duration-500 bg-card",
          isCenter
            ? "border-primary/50 shadow-[0_18px_50px_-10px_rgba(180,140,80,0.25)] dark:shadow-[0_18px_50px_-10px_rgba(0,0,0,0.55)] ring-2 ring-primary/25"
            : "border-border/80 shadow-sm backdrop-blur-xs hover:border-primary/40",
        )}
      >
        <div className="relative aspect-[4/3.2] w-full overflow-hidden bg-cream/70">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            onClick={(e) => {
              if (!isCenter) {
                e.preventDefault();
                onSelect();
              }
            }}
            className="block h-full w-full"
          >
            <img
              src={product.image}
              alt={product.name}
              width={900}
              height={720}
              loading="lazy"
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 ease-out",
                isCenter ? "scale-105" : "group-hover:scale-105",
              )}
            />
          </Link>

          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1 z-10">
            {product.badge && (
              <span className="rounded-full bg-primary/90 backdrop-blur px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
                {product.badge}
              </span>
            )}
            {off > 0 && (
              <span className="rounded-full bg-rose/90 backdrop-blur px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-bold text-white shadow-xs">
                -{off}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "absolute right-2 top-2 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-background/85 backdrop-blur shadow-xs transition-all active:scale-90 z-10 cursor-pointer",
              saved ? "text-rose bg-rose/10" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Heart className={cn("h-3.5 w-3.5", saved && "fill-rose text-rose")} strokeWidth={1.5} />
          </button>
        </div>

        {/* Card Details */}
        <div className="p-2 sm:p-3 space-y-1">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest">
            <span className="truncate">{product.brand}</span>
            <span className="shrink-0">{product.category}</span>
          </div>

          <h3 className="font-display text-xs sm:text-sm font-semibold tracking-tight text-foreground line-clamp-1 leading-snug">
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              onClick={(e) => {
                if (!isCenter) {
                  e.preventDefault();
                  onSelect();
                }
              }}
              className="hover:text-primary transition-colors"
            >
              {product.name}
            </Link>
          </h3>

          <div className="flex items-center gap-1.5 pt-0.5">
            <Rating value={product.rating} count={product.reviews} />
          </div>

          <div className="flex items-baseline justify-between pt-1 border-t border-border/60">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xs sm:text-base font-bold text-foreground">
                {formatBDT(product.price)}
              </span>
              {product.compareAt && (
                <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                  {formatBDT(product.compareAt)}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to bag`}
              className={cn(
                "grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full transition-all active:scale-90 cursor-pointer",
                isCenter
                  ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
                  : "bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground",
              )}
            >
              <ShoppingBag className="h-3 w-3" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
