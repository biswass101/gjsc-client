"use client";

import type { Product } from "@/types";
import { ProductCard } from "@/features/products";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PackageSearch, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollectionProductGridProps {
  products: Product[];
  view: "grid" | "list";
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}

export function CollectionProductGrid({
  products,
  view,
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters,
}: CollectionProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/60 p-10 sm:p-16 text-center my-6">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary mb-3">
          <PackageSearch className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
          No products matched your filters
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-sm">
          Try clearing your search keyword, adjusting your price range, or resetting filters to browse all items in this collection.
        </p>
        <Button
          onClick={onResetFilters}
          className="mt-5 rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          <span>Reset All Filters</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Products Display */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} view="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} view="list" />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-4 pb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-8.5 px-2.5 rounded-lg border-border/80 text-xs"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Prev</span>
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isCurrent = page === currentPage;
            return (
              <Button
                key={page}
                variant={isCurrent ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className={cn(
                  "h-8.5 min-w-[34px] px-2 rounded-lg text-xs font-semibold",
                  isCurrent
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "border-border/80 text-foreground hover:bg-secondary"
                )}
              >
                {page}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="h-8.5 px-2.5 rounded-lg border-border/80 text-xs"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}

