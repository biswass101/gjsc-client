"use client";

import { useState, useEffect } from "react";
import { Check, Clock, Minus, Plus, Flame, Zap, Tag, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Product, FlashSaleItem } from "@/types";
import { systemApi } from "@/lib/api/system";
import { ProductBuyBoxHeader } from "./buybox/ProductBuyBoxHeader";
import { ProductGuaranteesMatrix } from "./buybox/ProductGuaranteesMatrix";
import { ProductFlashSaleBanner } from "./buybox/ProductFlashSaleBanner";

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
  flashDeal?: FlashSaleItem | null | undefined;
  flashSaleCampaignTitle?: string | undefined;
  flashSaleEndsAt?: string | null | undefined;
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
  flashDeal,
  flashSaleCampaignTitle,
  flashSaleEndsAt,
}: ProductBuyBoxProps) {
  const [couponCopied, setCouponCopied] = useState(false);
  const [featuredCoupon, setFeaturedCoupon] = useState<{
    code: string;
    label: string;
    description: string;
  } | null>({
    code: "TOKYO10",
    label: "10% OFF",
    description: "Enjoy 10% off your authentic Japanese beauty ritual orders over ৳2,000.",
  });

  useEffect(() => {
    let mounted = true;
    systemApi
      .getPublicDiscounts()
      .then((data) => {
        if (!mounted || !Array.isArray(data) || data.length === 0) return;
        // Find best discount matching product category, or take the first public one
        const match =
          data.find((d: any) => {
            if (!d.applicableCategories || d.applicableCategories.length === 0) return true;
            return d.applicableCategories.includes(product.category);
          }) || data[0];

        if (match) {
          let label = "";
          if (match.type === "percentage") label = `${match.value}% OFF`;
          else if (match.type === "fixed") label = `৳${Number(match.value).toLocaleString()} OFF`;
          else if (match.type === "free_shipping") label = "FREE SHIPPING";
          else label = `${match.value} OFF`;

          const minText =
            match.minOrderAmount && Number(match.minOrderAmount) > 0
              ? ` on orders over ৳${Number(match.minOrderAmount).toLocaleString()}`
              : "";

          setFeaturedCoupon({
            code: match.code,
            label,
            description: match.description || `Use code ${match.code} for ${label}${minText}.`,
          });
        }
      })
      .catch(() => {
        // keep fallback
      });

    return () => {
      mounted = false;
    };
  }, [product.category]);

  const copyCoupon = () => {
    if (!featuredCoupon) return;
    navigator.clipboard.writeText(featuredCoupon.code);
    setCouponCopied(true);
    toast.success(`Coupon code "${featuredCoupon.code}" copied to clipboard!`);
    setTimeout(() => setCouponCopied(false), 3000);
  };

  return (
    <div className="lg:col-span-7 flex flex-col justify-start">
      <ProductBuyBoxHeader
        product={product}
        reviewsCount={reviewsCount}
        isWishlisted={isWishlisted}
        onToggleWishlist={onToggleWishlist}
        onShare={onShare}
        onScrollToReviews={onScrollToReviews}
        isFlashSale={Boolean(flashDeal)}
      />

      {/* Active Flash Sale Announcement & Live Urgency Block */}
      {flashDeal && (
        <ProductFlashSaleBanner
          deal={flashDeal}
          campaignTitle={flashSaleCampaignTitle}
          endsAt={flashSaleEndsAt}
        />
      )}

      {/* Price Block */}
      <div
        className={cn(
          "mt-5 rounded-lg border p-4 transition-all",
          flashDeal
            ? "border-rose-500/40 bg-gradient-to-br from-rose-500/[0.06] via-amber-500/[0.02] to-background shadow-xs ring-1 ring-rose-500/20"
            : "border-border/70 bg-secondary/20",
        )}
      >
        <div className="flex items-baseline gap-3 flex-wrap">
          <span
            className={cn(
              "font-display text-3xl font-bold tracking-tight",
              flashDeal ? "text-red-600 dark:text-red-400" : "text-foreground",
            )}
          >
            {formatBDT(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-base text-muted-foreground line-through">
              {formatBDT(product.compareAt)}
            </span>
          )}
          {discountPct > 0 && (
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                flashDeal
                  ? "bg-red-600 text-white font-bold border border-red-700 shadow-sm animate-pulse inline-flex items-center gap-1"
                  : "bg-rose/15 text-rose",
              )}
            >
              {flashDeal && <Zap className="h-3 w-3 fill-white" />}
              Save {formatBDT(savingsAmount)} ({discountPct}% {flashDeal ? "FLASH DEAL" : "OFF"})
            </span>
          )}
        </div>

        <p className="mt-2 text-[11px] text-muted-foreground flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          {flashDeal
            ? "⚡ Tokyo Flash deal pricing locked in bag. Cash on Delivery & bKash available nationwide."
            : "All taxes included. Cash on Delivery & bKash available nationwide."}
        </p>
      </div>

      {/* Promotional Coupon Voucher Banner */}
      {featuredCoupon && (
        <div className="mt-3.5 flex items-center justify-between gap-3 rounded-lg border border-dashed border-rose-500/35 bg-rose-500/[0.04] p-3 text-xs transition-colors hover:border-rose-500/50">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 shrink-0">
              <Tag className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-foreground text-[11px] sm:text-xs">
                  Available Offer:
                </span>
                <code className="font-mono font-bold text-rose-600 bg-rose-500/10 px-1.5 py-0.5 rounded text-[11px] tracking-wider">
                  {featuredCoupon.code}
                </code>
                <span className="text-[11px] font-bold text-rose-600">
                  ({featuredCoupon.label})
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                {featuredCoupon.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={copyCoupon}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer shrink-0",
              couponCopied
                ? "bg-emerald-600 text-white"
                : "bg-rose-500/15 text-rose-600 hover:bg-rose-600 hover:text-white",
            )}
          >
            {couponCopied ? (
              <>
                <Check className="h-3 w-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

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
        {flashDeal ? (
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              ⚡ Flash Deal Active: Only {flashDeal.stockLeft} units remaining in Tokyo flash quota!
            </span>
          </div>
        ) : (
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
        )}

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
            className={cn(
              "flex-1 rounded-full py-6 text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all cursor-pointer",
              flashDeal &&
                "bg-red-600 hover:bg-red-700 text-white shadow-red-500/25",
            )}
            disabled={product.stock === 0}
            onClick={onAddToCart}
          >
            {product.stock === 0 ? (
              "Out of Stock"
            ) : flashDeal ? (
              <span className="flex items-center gap-2">
                <Flame className="h-4 w-4 fill-white" />
                Claim Flash Deal · Add to Bag
              </span>
            ) : (
              "Add to Bag"
            )}
          </Button>
        </div>

        {/* Direct "Buy Now" CTA for Instant Checkout */}
        {product.stock > 0 && (
          <Button
            variant="secondary"
            className={cn(
              "w-full rounded-full border py-5 text-xs uppercase tracking-[0.2em] font-bold transition-all cursor-pointer",
              flashDeal
                ? "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white"
                : "border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground",
            )}
            onClick={onBuyNow}
          >
            {flashDeal ? "Buy Now at Flash Price · Instant Checkout" : "Buy Now · Instant Checkout"}
          </Button>
        )}
      </div>

      <ProductGuaranteesMatrix />
    </div>
  );
}
