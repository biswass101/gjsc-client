"use client";

import { Sparkles } from "lucide-react";
import { Layout, GoToTop } from "@/components/layout";
import { ProductCard } from "@/features/products";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/catalog";
import {
  ShopFilterSidebar,
  ShopFilterDrawer,
  ShopActiveFilters,
} from "@/features/shop";
import { useShopFacets } from "@/features/shop/hooks/useShopFacets";
import { useShopCatalog, PER_PAGE } from "@/features/shop/hooks/useShopCatalog";
import { ShopPagination } from "@/features/shop/components/ShopPagination";
import { ShopHeader } from "@/features/shop/components/ShopHeader";

export function ShopClient() {
  const {
    priceBounds,
    availableCategories,
    availableBrands,
    availableConcerns,
    availableSkinTypes,
    availableBadges,
  } = useShopFacets();

  const {
    filters,
    handleFilterChange,
    handleResetFilters,
    activeFilterCount,
    sortBy,
    setSortBy,
    view,
    setView,
    sortedProducts,
    pagedProducts,
    safePage,
    totalPages,
    startIdx,
    handlePageChange,
    headerTitle,
  } = useShopCatalog(priceBounds);

  const filterProps = {
    filters,
    onFilterChange: handleFilterChange,
    onResetFilters: handleResetFilters,
    availableCategories,
    availableBrands,
    availableConcerns,
    availableSkinTypes,
    availableBadges,
    priceBounds,
    activeFilterCount,
    filteredCount: sortedProducts.length,
  };

  return (
    <Layout>
      <ShopHeader headerTitle={headerTitle} />

      <div className="container-lux py-8 sm:py-12">
        <div className="flex items-start gap-8">
          <ShopFilterSidebar {...filterProps} />

          <main className="flex-1 min-w-0">
            <ShopActiveFilters
              totalResults={PRODUCTS.length}
              filteredCount={sortedProducts.length}
              startIdx={startIdx}
              perPage={PER_PAGE}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              view={view}
              onViewChange={setView}
              priceBounds={priceBounds}
              drawerTriggerSlot={<ShopFilterDrawer {...filterProps} />}
            />

            {sortedProducts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card p-10 sm:p-16 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  No matching formulas found
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                  We could not find any products matching your specific combination of filters.
                  Try clearing a few filters or broadening your search.
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="mt-5 rounded-full px-6 text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "space-y-4 sm:space-y-6"
                }
              >
                {pagedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
              </div>
            )}

            <ShopPagination
              safePage={safePage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>
        </div>
      </div>

      <GoToTop />
    </Layout>
  );
}
