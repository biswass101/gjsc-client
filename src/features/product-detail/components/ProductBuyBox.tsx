"use client";

import { Check, Clock, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { ProductBuyBoxHeader } from "./buybox/ProductBuyBoxHeader";
import { ProductGuaranteesMatrix } from "./buybox/ProductGuaranteesMatrix";

interface ProductBuyBoxProps {
  product: Product;
  qty: number;
  setQty: (qty: number) => void;
  size: string;
  setSize: (size: string) => void;
  discountPct: number;
  savingsAmount: number;
  reviewsCount: number;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onShare: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onScrollToReviews: () => void;
}

export function ProductBuyBox({
  product,
  qty,
  setQty,
  size,
  setSize,
  discountPct,
  savingsAmount,
  reviewsCount,
  isWishlisted,
  onToggleWishlist,
  onShare,
  onAddToCart,
  onBuyNow,
  onScrollToReviews,
}: ProductBuyBoxProps) {
  return (
    <div className="lg:col-span-7 flex flex-col justify-start">
      <ProductBuyBoxHeader
        product={product}
        reviewsCount={reviewsCount}
        isWishlisted={isWishlisted}
        onToggleWishlist={onToggleWishlist}
        onShare={onShare}
        onScrollToReviews={onScrollToReviews}
      />

      {/* Price Block */}
      <div className="mt-5 rounded-lg border border-border/70 bg-secondary/20 p-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold tracking-tight text-foreground">
            {formatBDT(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-base text-muted-foreground line-through">
              {formatBDT(product.compareAt)}
            </span>
          )}
          {discountPct > 0 && (
            <span className="rounded-full bg-rose/15 px-2.5 py-0.5 text-xs font-semibold text-rose">
              Save {formatBDT(savingsAmount)} ({discountPct}% OFF)
            </span>
          )}
        </div>

        <p className="mt-2 text-[11px] text-muted-foreground flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          All taxes included. Cash on Delivery & bKash available nationwide.
        </p>
      </div>

      {/* Short Description */}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.short}</p>

      {/* Skin Types & Concerns Match */}
      <div className="mt-4 space-y-2 border-t border-b border-border/50 py-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground/80 shrink-0">Best For:</span>
          {product.skinTypes?.map((st) => (
            <span
              key={st}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground"
            >
              {st} Skin
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground/80 shrink-0">Concerns:</span>
          {product.concerns?.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Variant / Size Selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs">
            <span className="eyebrow font-semibold">Select Size</span>
            <span className="text-muted-foreground">Selected: {size}</span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2.5">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all cursor-pointer",
                  s === size
                    ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/40 font-semibold"
                    : "border-border/80 text-muted-foreground hover:border-primary/60 hover:text-foreground",
                )}
              >
                <span>{s}</span>
                {s === size && <Check className="h-3 w-3 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stock Urgency & Countdown */}
      <div className="mt-5 space-y-1.5 text-xs">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-block h-2.5 w-2.5 rounded-full",
              product.stock === 0
                ? "bg-rose"
                : product.stock < 10
                  ? "bg-amber-500 animate-pulse"
                  : "bg-emerald-500 animate-pulse",
            )}
          />
          <span className="font-medium text-foreground">
            {product.stock === 0
              ? "Currently out of stock"
              : product.stock < 10
                ? `Only ${product.stock} bottles remaining in stock — order soon!`
                : "In stock · Dispatched from Dhaka hub within 24 hours"}
          </span>
        </div>

        {product.stock > 0 && (
          <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground pl-4">
            <Clock className="h-3 w-3 text-primary" />
            Order within <strong>03h 24m</strong> for immediate priority dispatch.
          </p>
        )}
      </div>

      {/* Stepper & CTAs (Dual "Add to Bag" & "Buy Now") */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {/* Stepper */}
          <div className="flex items-center gap-1 rounded-full border border-border/80 bg-background px-2 py-1 shadow-xs">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty(Math.max(1, qty - 1))}
              disabled={qty <= 1 || product.stock === 0}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty(Math.min(product.stock, qty + 1))}
              disabled={qty >= product.stock || product.stock === 0}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Primary Add to Bag */}
          <Button
            className="flex-1 rounded-full py-6 text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            disabled={product.stock === 0}
            onClick={onAddToCart}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Bag"}
          </Button>
        </div>

        {/* Direct "Buy Now" CTA for Instant Checkout */}
        {product.stock > 0 && (
          <Button
            variant="secondary"
            className="w-full rounded-full border border-primary/40 bg-primary/10 py-5 text-xs uppercase tracking-[0.2em] font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
            onClick={onBuyNow}
          >
            Buy Now · Instant Checkout
          </Button>
        )}
      </div>

      <ProductGuaranteesMatrix />
    </div>
  );
}
