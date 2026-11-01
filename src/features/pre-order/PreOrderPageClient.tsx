"use client";

import { Layout, GoToTop } from "@/components/layout";
import { ProductCard } from "@/features/products";
import { cn } from "@/lib/utils";
import { PreOrderHero } from "./components/PreOrderHero";
import { PreOrderToolbar } from "./components/PreOrderToolbar";
import { usePreOrderProducts } from "./hooks/usePreOrderProducts";

export function PreOrderPageClient() {
  const {
    selectedBrand,
    setSelectedBrand,
    selectedCategory,
    setSelectedCategory,
    view,
    setView,
    sortBy,
    setSortBy,
    brands,
    categories,
    sortedProducts,
  } = usePreOrderProducts();

  return (
    <Layout>
      {/* 1. Pre-Order Hero with 4-Step Process & Trust Guarantees */}
      <PreOrderHero />

      {/* 2. Toolbar & Filters */}
      <PreOrderToolbar
        brands={brands}
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        view={view}
        onViewChange={setView}
      />

      {/* 3. Pre-Order Catalog */}
      <main className="container-lux py-10 sm:py-16">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{sortedProducts.length}</span>{" "}
            Japanese pre-order formulations available for reservation
          </p>

          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            Next Tokyo Shipment Departs in 3 Days
          </span>
        </div>

        <div
          className={cn(
            "grid gap-3 sm:gap-4 lg:gap-5",
            view === "grid"
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              : "grid-cols-1 max-w-2xl",
          )}
        >
          {sortedProducts.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>

      <GoToTop />
    </Layout>
  );
}
