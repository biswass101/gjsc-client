"use client";

import { PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/features/products";
import { Link } from "@/lib/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

export function ExclusiveAccessories() {
  // Select accessories items
  const accessories = PRODUCTS.filter(
    (p) =>
      p.category === "Beauty Accessories" ||
      p.slug === "jade-facial-roller" ||
      p.slug === "shein-pearl-hair-claw-clip" ||
      p.slug === "shein-silk-scrunchie-trio"
  ).slice(0, 4);

  return (
    <section className="bg-background py-6 sm:py-8 lg:py-10">
      <div className="container-lux">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="eyebrow text-[10px] sm:text-xs tracking-[0.25em] font-semibold">
                RITUAL ESSENTIALS
              </span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              Exclusive Accessories
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Japanese jade rollers, mulberry silk bands, and hair accessories designed to elevate your daily routine.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              to="/shop"
              search={{ category: "Beauty Accessories" }}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline"
            >
              <span>View All Accessories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Products in 1 Row */}
        <div className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {accessories.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
