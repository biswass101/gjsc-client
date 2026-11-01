"use client";

import { Link } from "@/lib/navigation";
import { ProductCard } from "@/features/products";
import { Button } from "@/components/ui/button";
import { Percent, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface OffersProductCatalogProps {
  products: Product[];
  view: "grid" | "list";
  onResetFilters: () => void;
}

export function OffersProductCatalog({
  products,
  view,
  onResetFilters,
}: OffersProductCatalogProps) {
  return (
    <main className="container-lux py-10 sm:py-16">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{products.length}</span>{" "}
          promotional items
        </p>

        <Link
          to="/shop"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          <span>View All Regular Catalog</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-border p-8">
          <Percent className="mx-auto h-12 w-12 text-muted-foreground/60" />
          <h3 className="mt-4 font-display text-xl font-semibold">No Deals In This Filter</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Try selecting another category or clearing your deal filter.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="mt-4 rounded-full text-xs"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-3 sm:gap-4 lg:gap-5",
            view === "grid"
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              : "grid-cols-1 max-w-2xl",
          )}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

