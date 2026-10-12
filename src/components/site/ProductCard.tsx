import { Link } from "@/lib/navigation";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";
import { Rating } from "./Rating";
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
    toast.success("Added to bag");
  };

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:shadow-[var(--shadow-lift)]",
        view === "list" && "sm:flex",
      )}
    >
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className={cn("relative block overflow-hidden bg-cream", view === "list" ? "sm:w-56 sm:shrink-0" : "")}
      >
        <img
          src={product.image}
          alt={product.name}
          width={900}
          height={900}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-2 top-2 sm:left-3 sm:top-3 flex flex-col gap-1">
          {product.badge && (
            <span className="rounded-full bg-background/85 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
              {product.badge}
            </span>
          )}
          {off > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-primary-foreground">
              -{off}%
            </span>
          )}
        </div>
        {product.stock === 0 && (
          <span className="absolute inset-x-0 bottom-0 bg-foreground/70 py-1 sm:py-1.5 text-center text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-background">
            Out of stock
          </span>
        )}
      </Link>

      {/* Wishlist Button - Left Side */}
      <button
        type="button"
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.slug);
          toast(saved ? "Removed from wishlist" : "Saved to your wishlist");
        }}
        className="absolute right-11 top-2 sm:right-12 sm:top-3 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-border bg-background/85 backdrop-blur transition-all hover:border-primary hover:bg-background z-10"
      >
        <Heart className={cn("h-3 w-3 sm:h-3.5 sm:w-3.5", saved ? "fill-rose text-rose" : "text-muted-foreground")} strokeWidth={1.5} />
      </button>

      {/* Add to Cart Button - Top Right on Hover */}
      {product.stock > 0 && (
        <button
          type="button"
          aria-label="Add to bag"
          onClick={handleAddToCart}
          className="absolute right-2 top-2 sm:right-3 sm:top-3 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-primary bg-primary text-primary-foreground backdrop-blur transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
        >
          <Plus className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={2} />
        </button>
      )}

      <div className={cn("flex flex-col gap-1 sm:gap-1.5 p-2.5 sm:p-3.5", view === "list" && "sm:flex-1 sm:justify-center")}>
        <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{product.brand}</p>
        <h3 className="font-display text-xs sm:text-base leading-tight line-clamp-2">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="transition-colors hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{product.short}</p>
        
        {/* Rating and Price on Same Line */}
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <Rating value={product.rating} count={product.reviews} />
          <div className="flex items-baseline gap-1 sm:gap-1.5">
            <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">{formatBDT(product.price)}</span>
            {product.compareAt && (
              <span className="text-[10px] sm:text-xs text-muted-foreground line-through whitespace-nowrap">{formatBDT(product.compareAt)}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
