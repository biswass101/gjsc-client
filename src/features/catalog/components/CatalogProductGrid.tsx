"use client";

import type { Product } from "@/types";
import { ProductCard } from "@/features/products";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PackageSearch, RotateCcw } from "lucide-react";

export interface CatalogProductGridProps {
  products: Product[];
  view: "grid" | "list";
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
  emptyTitle?: string;
  emptyMessage?: string;
}

export function CatalogProductGrid({
  products,
  view,
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters,
  emptyTitle = "No Products Match Your Criteria",
  emptyMessage = "We couldn't find any products matching your active filters. Try adjusting your price range, skin type, or category filters.",
}: CatalogProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-xl border border-border/80 bg-card">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <PackageSearch className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{emptyTitle}</h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">{emptyMessage}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          className="mt-5 rounded-full text-xs gap-1.5 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset All Filters</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Product List / Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="max-w-2xl">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-6 border-t border-border/60">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 rounded-full cursor-pointer disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const active = page === currentPage;
            return (
              <Button
                key={page}
                variant={active ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className={`h-8 w-8 p-0 rounded-full text-xs font-semibold cursor-pointer ${
                  active ? "bg-primary text-primary-foreground shadow-xs" : "border-border"
                }`}
              >
                {page}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 rounded-full cursor-pointer disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
