"use client";

import { PRODUCTS, type Product } from "@/lib/catalog";
import { ProductCard } from "@/features/products";
import { Link } from "@/lib/navigation";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

export function BestOfSkincare() {
  // Select 4 pinnacle skincare items (Cleanser, Serum, Essence, Cream)
  const bestSkincare = PRODUCTS.filter(
    (p) =>
      p.slug === "sakura-radiance-serum" ||
      p.slug === "yuzu-glow-essence" ||
      p.slug === "koji-ferment-cream" ||
      p.slug === "matcha-clarifying-toner"
  ).slice(0, 4);

  return (
    <section className="bg-background py-6 sm:py-8 lg:py-10">
      <div className="container-lux">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-primary">
              <Leaf className="h-3.5 w-3.5" />
              <span className="eyebrow text-[10px] sm:text-xs tracking-[0.25em] font-semibold">
                FERMENTED BOTANICALS
              </span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              Best Of Skincare
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Formulated in Japan with slow-fermented rice, camellia seed oil, and Uji green tea for calm, cushiony skin.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              to="/shop"
              search={{ category: "Serum" }}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline"
            >
              <span>View All Skincare</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Products in 1 Row */}
        <div className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bestSkincare.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
