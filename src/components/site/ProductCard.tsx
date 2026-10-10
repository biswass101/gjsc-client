import { Link } from "@/lib/navigation";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Rating } from "./Rating";
import { formatBDT, type Product } from "@/lib/catalog";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, view = "grid" }: { product: Product; view?: "grid" | "list" }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const saved = wishlist.includes(product.slug);
  const off = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

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

      <button
        type="button"
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        onClick={() => {
          toggleWishlist(product.slug);
          toast(saved ? "Removed from wishlist" : "Saved to your wishlist");
        }}
        className="absolute right-2 top-2 sm:right-3 sm:top-3 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-border bg-background/85 backdrop-blur transition-colors hover:border-primary"
      >
        <Heart className={cn("h-3 w-3 sm:h-4 sm:w-4", saved ? "fill-rose text-rose" : "text-muted-foreground")} strokeWidth={1.5} />
      </button>

      <div className={cn("flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-5", view === "list" && "sm:flex-1 sm:justify-center")}>
        <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{product.brand}</p>
        <h3 className="font-display text-sm sm:text-xl leading-tight line-clamp-2">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="transition-colors hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[11px] sm:text-sm text-muted-foreground hidden sm:block">{product.short}</p>
        <Rating value={product.rating} count={product.reviews} />
        <div className="mt-0.5 sm:mt-1 flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-sm sm:text-base font-semibold">{formatBDT(product.price)}</span>
          {product.compareAt && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">{formatBDT(product.compareAt)}</span>
          )}
        </div>
        <Button
          variant="outline"
          className="mt-1.5 sm:mt-2 w-full rounded-full border-border text-[8px] sm:text-xs uppercase tracking-[0.18em] hover:border-primary hover:bg-primary hover:text-primary-foreground py-1.5 sm:py-2"
          disabled={product.stock === 0}
          onClick={() => addToCart(product.slug)}
        >
          <ShoppingBag className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" strokeWidth={1.5} />
          <span className="hidden sm:inline">Add to bag</span>
          <span className="inline sm:hidden">Add</span>
        </Button>
      </div>
    </article>
  );
}
