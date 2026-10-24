"use client";

import type { Product } from "@/types";
import { ProductCard } from "@/features/products";
import { Flame, Award } from "lucide-react";

interface CategoryTopSellingProps {
  categoryTitle: string;
  products: Product[];
}

export function CategoryTopSelling({
  categoryTitle,
  products,
}: CategoryTopSellingProps) {
  // Select up to 4 top products (prioritize Best Seller badge or high ratings/reviews)
  const topSellers = products
    .filter((p) => p.badge === "Best Seller" || p.rating >= 4.5 || p.badge === "Trending")
    .slice(0, 4);

  // If no specific badges, fallback to top 4 highest rated
  const items = topSellers.length >= 2 ? topSellers : products.slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="border-b border-border/60 bg-cream/30 py-6 sm:py-8">
      <div className="container-lux">
        {/* Section Header */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-rose-600 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="mt-0.5 font-display text-lg sm:text-2xl font-bold tracking-tight text-foreground">
              Top Selling in {categoryTitle}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground hidden sm:block">
              Most-loved Japanese formulas with verified customer satisfaction and five-star reviews.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            <span>Top Rated</span>
          </div>
        </div>

        {/* 4 Cards Grid / Mobile Swipe */}
        <div className="flex gap-2.5 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

