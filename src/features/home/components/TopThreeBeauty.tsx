"use client";

import { useShop } from "@/context";
import { toast } from "sonner";
import { Trophy } from "lucide-react";
import { PODIUM } from "./top-three/podiumData";
import { TopThreeCard } from "./top-three/TopThreeCard";

export function TopThreeBeauty() {
  const { toggleWishlist, wishlist } = useShop();

  const handleToggle = (slug: string) => {
    const saved = wishlist.includes(slug);
    toggleWishlist(slug);
    toast(saved ? "Removed from wishlist" : "Saved to your wishlist");
  };

  return (
    <section className="bg-cream/40 py-8 sm:py-12 lg:py-14 border-y border-border/40">
      <div className="container-lux">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-primary text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
            <Trophy className="h-3.5 w-3.5 text-primary" />
            <span>ANNUAL TOKYO BEAUTY AWARDS</span>
          </div>

          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Top 3 Of Beauty
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The three crowning holy grail Japanese formulations chosen by customer acclaim, repeat
            orders, and verified dermatologist praise.
          </p>
        </div>

        {/* 3 SaaS Subscription Cards */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl flex justify-start sm:justify-center md:grid md:grid-cols-3 md:items-center md:justify-items-center gap-4 sm:gap-5 lg:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 pt-3 px-4 sm:px-6 md:px-0">
            {PODIUM.map((item) => (
              <TopThreeCard
                key={item.slug}
                item={item}
                saved={wishlist.includes(item.slug)}
                onToggleWishlist={handleToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
