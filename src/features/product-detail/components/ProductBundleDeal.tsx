"use client";

import { Sparkles } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/catalog";
import type { Product } from "@/types";

interface ProductBundleDealProps {
  product: Product;
  companionProduct: Product | undefined;
  bundleBaseTotal: number;
  bundleDiscountedTotal: number;
  bundleSavings: number;
  onAddBundleToCart: () => void;
}

export function ProductBundleDeal({
  product,
  companionProduct,
  bundleBaseTotal,
  bundleDiscountedTotal,
  bundleSavings,
  onAddBundleToCart,
}: ProductBundleDealProps) {
  if (!companionProduct) return null;

  return (
    <section className="container-lux pb-12">
      <div className="overflow-hidden rounded-xl border border-border/80 bg-gradient-to-r from-cream via-background to-cream p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
          <div>
            <span className="eyebrow text-primary">Synergistic Skincare Routine</span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-medium">
              Complete The Japanese Ritual
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Pair this formula with {companionProduct.name} for 2× hydration retention and enhanced
              luminous barrier repair.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Save 5% on Routine Duo</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Product Duo Display */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 flex-1">
            {/* Current Product */}
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <img
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="h-20 w-20 rounded-lg object-cover border border-border bg-cream"
              />
              <div>
                <span className="text-[10px] uppercase font-semibold text-primary tracking-wider">
                  Step 1 · This Item
                </span>
                <h3 className="font-display text-sm font-semibold line-clamp-1">{product.name}</h3>
                <p className="text-xs font-bold text-foreground">{formatBDT(product.price)}</p>
              </div>
            </div>

            <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-muted-foreground font-bold text-sm shrink-0">
              +
            </div>

            {/* Companion Product */}
            <Link
              to="/product/$slug"
              params={{ slug: companionProduct.slug }}
              className="group flex items-center gap-3.5 w-full sm:w-auto hover:opacity-95"
            >
              <img
                src={companionProduct.image}
                alt={companionProduct.name}
                width={100}
                height={100}
                className="h-20 w-20 rounded-lg object-cover border border-border bg-cream transition-transform group-hover:scale-105"
              />
              <div>
                <span className="text-[10px] uppercase font-semibold text-primary tracking-wider">
                  Step 2 · Companion
                </span>
                <h3 className="font-display text-sm font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                  {companionProduct.name}
                </h3>
                <p className="text-xs font-bold text-foreground">
                  {formatBDT(companionProduct.price)}
                </p>
              </div>
            </Link>
          </div>

          {/* Bundle Pricing & One-Click Add */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:border-l lg:border-border/60 lg:pl-8">
            <div>
              <p className="text-xs text-muted-foreground">Ritual Bundle Total:</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-display text-2xl font-bold text-foreground">
                  {formatBDT(bundleDiscountedTotal)}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  {formatBDT(bundleBaseTotal)}
                </span>
              </div>
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                You save {formatBDT(bundleSavings)}
              </p>
            </div>

            <Button
              className="rounded-full px-6 py-6 text-xs uppercase tracking-wider font-bold shadow-sm cursor-pointer"
              onClick={onAddBundleToCart}
            >
              Add Both to Bag
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
