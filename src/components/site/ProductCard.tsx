import { Link } from "@/lib/navigation";
import { Heart, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { formatBDT, type Product } from "@/lib/catalog";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, view = "grid" }: { product: Product; view?: "grid" | "list" }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const saved = wishlist.includes(product.slug);
  const off = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.slug);
    toast.success("Added to bag", {
      description: `${product.name} is now in your shopping bag.`,
    });
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-card transition-all duration-500 hover:shadow-[var(--shadow-lift)] hover:border-primary/50",
        view === "list" && "sm:flex sm:flex-row",
      )}
    >
      <div>
        {/* Product Image Container */}
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className={cn("relative block overflow-hidden bg-cream", view === "list" ? "sm:w-52 sm:shrink-0" : "")}
        >
          <img
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />

          {/* Top Left Badges */}
          <div className="absolute left-2 top-2 sm:left-2.5 sm:top-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            {product.badge && (
              <span className="rounded-full bg-background/90 px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-foreground backdrop-blur-xs border border-border/40 shadow-xs">
                {product.badge}
              </span>
            )}
            {off > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-wider font-bold text-primary-foreground shadow-xs">
                -{off}%
              </span>
            )}
          </div>

          {/* Out of stock indicator */}
          {product.stock === 0 && (
            <span className="absolute inset-x-0 bottom-0 bg-foreground/80 py-1 text-center text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-background backdrop-blur-xs z-10">
              Out of stock
            </span>
          )}
        </Link>

        {/* Wishlist Button - Always accessible */}
        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.slug);
            toast(saved ? "Removed from wishlist" : "Saved to your wishlist");
          }}
          className="absolute right-10 top-2 sm:right-11 sm:top-2.5 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-border/80 bg-background/90 backdrop-blur-xs transition-all hover:border-primary hover:bg-background z-20 shadow-xs active:scale-95"
        >
          <Heart className={cn("h-3.5 w-3.5", saved ? "fill-rose text-rose" : "text-muted-foreground")} strokeWidth={1.5} />
        </button>

        {/* Add to Cart Button - Visible on touch/mobile, hover on desktop */}
        {product.stock > 0 && (
          <button
            type="button"
            aria-label="Add to bag"
            onClick={handleAddToCart}
            className="absolute right-2 top-2 sm:right-2.5 sm:top-2.5 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-primary bg-primary text-primary-foreground backdrop-blur-xs transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105 active:scale-95 z-20 shadow-xs"
          >
            <Plus className="h-4 w-4" strokeWidth={2.2} />
          </button>
        )}

        {/* Product Details */}
        <div className={cn("p-2.5 sm:p-3.5", view === "list" && "sm:flex-1 sm:justify-center")}>
          <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-medium text-muted-foreground truncate">
            {product.brand}
          </p>

          <h3 className="mt-0.5 font-display text-xs sm:text-sm font-semibold leading-snug line-clamp-2">
            <Link to="/product/$slug" params={{ slug: product.slug }} className="transition-colors hover:text-primary">
              {product.name}
            </Link>
          </h3>

          <p className="mt-1 line-clamp-1 text-[10px] text-muted-foreground hidden sm:block">
            {product.short}
          </p>
        </div>
      </div>

      {/* Rating & Price Bottom Bar */}
      <div className="px-2.5 pb-2.5 sm:px-3.5 sm:pb-3.5 pt-0">
        <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-border/50">
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-amber-500 shrink-0">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground text-[10px] sm:text-xs">{product.rating}</span>
            <span className="text-[9px] text-muted-foreground hidden xs:inline">({product.reviews})</span>
          </div>

          <div className="flex items-baseline gap-1 sm:gap-1.5 shrink-0 text-right">
            {product.compareAt && (
              <span className="text-[9px] sm:text-[11px] text-muted-foreground line-through whitespace-nowrap">
                {formatBDT(product.compareAt)}
              </span>
            )}
            <span className="text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
              {formatBDT(product.price)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
