"use client";

import { useMemo } from "react";
import { Layout, GoToTop } from "@/components/layout";
import { getBrandMeta } from "../data/brandMetadata";
import { BrandHero } from "./BrandHero";
import { BrandBestSelling } from "./BrandBestSelling";
import { BrandFilterSidebar } from "./BrandFilters";
import { BrandActiveFilters } from "./BrandActiveFilters";
import { BrandProductGrid } from "./BrandProductGrid";
import { useBrandProducts } from "../hooks/useBrandProducts";

interface BrandPageClientProps {
  slug: string;
}

export function BrandPageClient({ slug }: BrandPageClientProps) {
  const meta = useMemo(() => getBrandMeta(slug), [slug]);
  const {
    brandProducts,
    priceBounds,
    filters,
    sortBy,
    setSortBy,
    view,
    setView,
    currentPage,
    setCurrentPage,
    handleFilterChange,
    handleResetFilters,
    filteredProducts,
    sortedProducts,
    totalPages,
    paginatedProducts,
    filterProps,
  } = useBrandProducts(meta);

  return (
    <Layout>
      {/* 1. Brand Hero with Banner, Logo, Title, Kanji, Origin & Description */}
      <BrandHero meta={meta} totalProducts={brandProducts.length} />

      {/* 2. Bestselling Products from this Brand */}
      <BrandBestSelling brandName={meta.name} products={brandProducts} />

      {/* 3. Main Product Catalog & Filters Section */}
      <section className="py-8 sm:py-12 bg-background">
        <div className="container-lux">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Desktop Filter Sidebar */}
            <BrandFilterSidebar {...filterProps} />

            {/* Main Product Catalog Area */}
            <main className="flex-1 w-full min-w-0">
              {/* Active Filter Badges, Sort & View Selector */}
              <BrandActiveFilters
                totalResults={brandProducts.length}
                filteredCount={filteredProducts.length}
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                sortBy={sortBy}
                onSortChange={setSortBy}
                view={view}
                onViewChange={setView}
                priceBounds={priceBounds}
                drawerProps={filterProps}
              />

              {/* Product Grid / List with Pagination */}
              <BrandProductGrid
                products={paginatedProducts}
                view={view}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 500, behavior: "smooth" });
                }}
                onResetFilters={handleResetFilters}
              />
            </main>
          </div>
        </div>
      </section>

      {/* Floating Go To Top Button */}
      <GoToTop />
    </Layout>
  );
}
