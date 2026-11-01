import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "@/lib/navigation";
import { formatBDT } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { FlashItem } from "./flashData";

interface FlashCardProps {
  item: FlashItem;
  saved: boolean;
  onToggleWishlist: (slug: string) => void;
  onClaim: (item: FlashItem) => void;
}

export function FlashCard({ item, saved, onToggleWishlist, onClaim }: FlashCardProps) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-md sm:rounded-lg border border-rose-500/20 bg-card shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-rose-500/50 hover:shadow-lg w-[50vw] sm:w-auto shrink-0 snap-start min-w-[160px]">
      <div>
        {/* Image with Flash Badge */}
        <div className="relative aspect-[4/3.25] w-full overflow-hidden bg-cream">
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
              onToggleWishlist(item.slug);
            }}
            className="absolute right-2 top-2 sm:right-2.5 sm:top-2.5 grid h-6.5 w-6.5 sm:h-8 sm:w-8 place-items-center rounded-full border border-border bg-background/85 backdrop-blur-xs transition-colors hover:border-primary z-10 cursor-pointer"
          >
            <Heart
              className={cn(
                "h-3 w-3 sm:h-3.5 sm:w-3.5",
                saved ? "fill-rose text-rose" : "text-muted-foreground",
              )}
            />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-2.5 sm:p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
              {item.brand}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500">
              <Star className="h-2.5 w-2.5 sm:h-2.5 sm:w-2.5 fill-amber-400 text-amber-400" />
              <span className="text-[10px] sm:text-[10.5px] font-semibold text-foreground">
                {item.rating}
              </span>
            </div>
          </div>

          <h3 className="mt-1 font-display text-[11px] sm:text-[13px] font-semibold line-clamp-1">
            <Link
              to="/product/$slug"
              params={{ slug: item.slug }}
              className="hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          </h3>

          {/* Stock Progress Bar */}
          <div className="mt-1.5 sm:mt-2 space-y-1">
            <div className="flex justify-between text-[9px] sm:text-[9.5px] font-medium">
              <span className="text-muted-foreground">Claimed {item.claimedPercent}%</span>
              <span className="font-semibold text-rose-600">Only {item.stockLeft} left!</span>
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
      <div className="p-2.5 sm:p-3 pt-0">
        <div className="flex items-baseline justify-between border-t border-border/60 pt-2 mb-2 sm:pt-2 sm:mb-2">
          <div>
            <span className="text-[9px] sm:text-[9.5px] text-muted-foreground line-through block">
              {formatBDT(item.compareAt)}
            </span>
            <span className="font-display text-xs sm:text-sm font-bold text-rose-600">
              {formatBDT(item.price)}
            </span>
          </div>
          <span className="rounded bg-rose-500/10 px-1.5 py-0.5 text-[8px] sm:text-[8.5px] font-semibold text-rose-600">
            Save {formatBDT(item.compareAt - item.price)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onClaim(item)}
          className="flex w-full items-center justify-center gap-1.5 rounded-md bg-rose-600 py-1.5 sm:py-1.5 text-[11px] sm:text-[11.5px] font-semibold text-white shadow-xs transition-all hover:bg-rose-700 active:scale-[0.98] cursor-pointer"
        >
          <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span>Claim Deal</span>
        </button>
      </div>
    </div>
  );
}

