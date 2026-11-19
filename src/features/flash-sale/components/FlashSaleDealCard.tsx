"use client";

import React from "react";
import { ShoppingBag, Heart, Star, Flame, Check } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FlashSaleItem } from "@/types";

interface FlashSaleDealCardProps {
  item: FlashSaleItem;
  saved: boolean;
  onToggleWishlist: (slug: string) => void;
  onClaimDeal: (item: FlashSaleItem) => void;
}

export function FlashSaleDealCard({
  item,
  saved,
  onToggleWishlist,
  onClaimDeal,
}: FlashSaleDealCardProps) {
  const stockRemaining = item.stockLeft !== undefined ? item.stockLeft : Math.max(0, item.allocatedStock - item.claimedCount);
  const isSoldOut = stockRemaining <= 0;
  const claimPercentage = item.claimedPercent || 0;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-rose-500/20 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-rose-500/50 hover:shadow-xl">
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-[4/3.4] w-full overflow-hidden bg-cream/40">
          <Link to={`/product/${item.slug}`} className="block h-full w-full">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground bg-muted">
                Tokyo Skincare
              </div>
            )}
          </Link>

          {/* Discount Badge */}
          {item.discount > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <span className="rounded-full bg-rose-600 px-2.5 py-1 text-xs font-bold text-white shadow-md flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 fill-white" />
                <span>-{item.discount}% OFF</span>
              </span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            aria-label="Wishlist"
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist(item.slug);
            }}
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-border/80 bg-background/85 backdrop-blur-xs transition-colors hover:border-rose-500 z-10 cursor-pointer"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                saved ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
              )}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2.5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
              {item.brand || "Glorious Japan"}
            </span>

            <Link to={`/product/${item.slug}`}>
              <h3 className="font-display text-sm font-semibold text-foreground line-clamp-2 hover:text-rose-600 transition-colors">
                {item.name}
              </h3>
            </Link>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="flex items-center text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-500" />
            </div>
            <span className="font-semibold text-foreground">{item.rating || 4.9}</span>
            <span className="text-[11px] text-muted-foreground">• Tokyo Domestic Batch</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="font-mono text-lg font-bold text-rose-600">
              ৳{item.price.toLocaleString()}
            </span>
            {item.compareAt && item.compareAt > item.price && (
              <span className="font-mono text-xs line-through text-muted-foreground">
                ৳{item.compareAt.toLocaleString()}
              </span>
            )}
          </div>

          {/* Claimed Quota & Progress Bar */}
          <div className="space-y-1.5 pt-1 border-t border-border/50">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground font-medium">
                {item.claimedCount} / {item.allocatedStock} Claimed
              </span>
              <span className="font-bold text-rose-600">{claimPercentage}%</span>
            </div>

            <Progress
              value={claimPercentage}
              className="h-2 bg-rose-500/10 rounded-full"
            />

            <div className="flex items-center justify-between text-[10px] pt-0.5">
              {!isSoldOut ? (
                <span className="font-semibold text-amber-600 flex items-center gap-1">
                  <Flame className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span>Only {stockRemaining} units left at flash price!</span>
                </span>
              ) : (
                <span className="font-semibold text-muted-foreground">
                  Deal 100% Claimed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0">
        <Button
          onClick={() => onClaimDeal(item)}
          disabled={isSoldOut}
          className={cn(
            "w-full rounded-xl text-xs font-semibold gap-2 shadow-xs transition-all",
            isSoldOut
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-gradient-to-r from-rose-600 to-amber-600 text-white hover:from-rose-500 hover:to-amber-500 cursor-pointer"
          )}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{isSoldOut ? "Deal Sold Out" : "Claim Flash Deal"}</span>
        </Button>
      </div>
    </div>
  );
}

