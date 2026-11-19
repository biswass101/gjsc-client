"use client";

import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import type { Product } from "@/types";

interface ProductStickyMobileBarProps {
  product: Product;
  qty: number;
  onAddToCart: () => void;
  isFlashSale?: boolean | undefined;
}

export function ProductStickyMobileBar({
  product,
  qty,
  onAddToCart,
  isFlashSale,
}: ProductStickyMobileBarProps) {
  return (
    <aside
      aria-label="Mobile quick add to bag"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-border/80 bg-background/95 p-3.5 backdrop-blur-md lg:hidden shadow-lg"
    >
      <div className="flex items-center justify-between gap-3 pr-14">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={product.image}
            alt=""
            width={60}
            height={60}
            className="h-10 w-10 rounded-md object-cover border border-border shrink-0"
          />
          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-xs font-semibold text-foreground">{product.name}</p>
              {isFlashSale && (
                <span className="rounded bg-red-600 text-white font-bold text-[9px] px-1.5 py-0.5 shadow-xs shrink-0 animate-pulse">
                  ⚡ Flash
                </span>
              )}
            </div>
            <p className={cn("text-xs font-bold", isFlashSale ? "text-red-600 dark:text-red-400" : "text-primary")}>
              {formatBDT(product.price * qty)}
            </p>
          </div>
        </div>

        <Button
          className={cn(
            "rounded-full px-5 py-5 text-[11px] uppercase tracking-wider font-bold shrink-0 shadow-sm cursor-pointer",
            isFlashSale &&
              "bg-red-600 hover:bg-red-700 text-white shadow-red-500/30",
          )}
          disabled={product.stock === 0}
          onClick={onAddToCart}
        >
          {product.stock === 0 ? (
            "Sold Out"
          ) : isFlashSale ? (
            <span className="flex items-center gap-1.5">
              <Flame className="h-3 w-3 fill-white" />
              Claim Deal
            </span>
          ) : (
            "Add to Bag"
          )}
        </Button>
      </div>
    </aside>
  );
}
