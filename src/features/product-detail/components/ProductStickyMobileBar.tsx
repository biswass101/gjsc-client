"use client";

import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/catalog";
import type { Product } from "@/types";

interface ProductStickyMobileBarProps {
  product: Product;
  qty: number;
  onAddToCart: () => void;
}

export function ProductStickyMobileBar({ product, qty, onAddToCart }: ProductStickyMobileBarProps) {
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
            <p className="truncate text-xs font-semibold text-foreground">{product.name}</p>
            <p className="text-xs font-bold text-primary">{formatBDT(product.price * qty)}</p>
          </div>
        </div>

        <Button
          className="rounded-full px-5 py-5 text-[11px] uppercase tracking-wider font-bold shrink-0 shadow-sm cursor-pointer"
          disabled={product.stock === 0}
          onClick={onAddToCart}
        >
          {product.stock === 0 ? "Sold Out" : "Add to Bag"}
        </Button>
      </div>
    </aside>
  );
}
