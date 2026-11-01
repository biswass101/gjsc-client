"use client";

import { useEffect, useState } from "react";
import { useShop } from "@/context";
import { Link } from "@/lib/navigation";
import { toast } from "sonner";
import { ArrowRight, Flame, Zap } from "lucide-react";
import { FLASH_ITEMS, FlashItem } from "./flash-sale/flashData";
import { FlashCard } from "./flash-sale/FlashCard";

export function FlashSaleSection() {
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaim = (item: FlashItem) => {
    addToCart(item.slug);
    toast.success(`Claimed Flash Deal for ${item.name}!`, {
      description: `Discount of ${item.discount}% applied.`,
    });
  };

  const handleToggle = (slug: string) => {
    const saved = wishlist.includes(slug);
    toggleWishlist(slug);
    toast(saved ? "Removed from wishlist" : "Saved to your wishlist");
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="bg-cream/40 py-8 sm:py-12 border-y border-border/40">
      <div className="container-lux">
        {/* Header with live timer */}
        <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-rose-600 font-semibold text-[10px] sm:text-xs tracking-[0.25em] uppercase">
              <Flame className="h-4 w-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>LIMITED QUANTITY DROPS</span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Flash Sale
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Deepest discounts on Tokyo favorites. Prices revert once timer ends or stock is
              claimed.
            </p>
          </div>

          {/* Live Countdown Box & Link to Offers */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start md:self-auto">
            <Link
              to="/offers"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-rose-600 hover:underline order-2 sm:order-1"
            >
              <span>View all deals</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <div className="flex items-center gap-2 bg-card border border-rose-500/30 rounded-md sm:rounded-lg p-2.5 sm:p-3 shadow-xs order-1 sm:order-2">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-rose-600 mr-1 flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 fill-rose-500" />
                <span>Ends in:</span>
              </span>
              <div className="flex items-center gap-1 text-foreground font-mono font-bold text-xs sm:text-sm">
                <span className="rounded-lg bg-primary/10 border border-primary/20 px-2 py-1">
                  {pad(timeLeft.hours)}h
                </span>
                <span>:</span>
                <span className="rounded-lg bg-primary/10 border border-primary/20 px-2 py-1">
                  {pad(timeLeft.minutes)}m
                </span>
                <span>:</span>
                <span className="rounded-lg bg-rose-500/10 border border-rose-500/20 px-2 py-1 text-rose-600">
                  {pad(timeLeft.seconds)}s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Flash Cards Grid */}
        <div className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {FLASH_ITEMS.map((item) => (
            <FlashCard
              key={item.id}
              item={item}
              saved={wishlist.includes(item.slug)}
              onToggleWishlist={handleToggle}
              onClaim={handleClaim}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
