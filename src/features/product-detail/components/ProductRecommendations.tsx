"use client";

import { ChevronRight } from "lucide-react";
import { Link } from "@/lib/navigation";
import { ProductCard } from "@/features/products";
import type { Product } from "@/types";

interface ProductRecommendationsProps {
  product: Product;
  alsoLike: Product[];
  recentlyViewed: Product[];
}

export function ProductRecommendations({
  product,
  alsoLike,
  recentlyViewed,
}: ProductRecommendationsProps) {
  return (
    <>
      {/* You May Also Like */}
      <section className="container-lux pb-16 sm:pb-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="eyebrow text-primary">Curated Recommendations</span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium mt-1">
              You May Also Like
            </h2>
          </div>
          <Link
            to="/shop"
            search={{ category: product.category }}
            className="text-xs uppercase tracking-wider font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>View All {product.category}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {alsoLike.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="container-lux pb-24 sm:pb-20">
          <div className="mb-6">
            <span className="eyebrow text-primary">Your History</span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium mt-1">Recently Viewed</h2>
          </div>
          <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewed.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
