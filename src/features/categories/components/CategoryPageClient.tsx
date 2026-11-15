"use client";

import { useMemo } from "react";
import { Layout, GoToTop } from "@/components/layout";
import { useAdmin } from "@/context/admin-context";
import { getCategoryMeta, normalizeCategorySlug } from "../data/categoryMetadata";
import { CategoryHero } from "./CategoryHero";
import { CategoryTopSelling } from "./CategoryTopSelling";
import { CategoryFilterSidebar } from "./CategoryFilters";
import { CategoryActiveFilters } from "./CategoryActiveFilters";
import { CategoryProductGrid } from "./CategoryProductGrid";
import { useCategoryProducts } from "../hooks/useCategoryProducts";

interface CategoryPageClientProps {
  slug: string;
}

export function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const { categories: adminCategories } = useAdmin();

  const meta = useMemo(() => {
    const staticMeta = getCategoryMeta(slug);
    const normalized = normalizeCategorySlug(slug);
    const adminCat = adminCategories.find(
      (c) =>
        c.slug === normalized ||
        c.slug === slug ||
        c.title.toLowerCase() === normalized.replace(/-/g, " ") ||
        c.title.toLowerCase() === slug.toLowerCase()
    );
    if (adminCat) {
      const mergedSubcats =
        adminCat.subcategories && adminCat.subcategories.length > 0
          ? ["All", ...adminCat.subcategories.filter((s) => s.toLowerCase() !== "all")]
          : staticMeta.subcategories;

      return {
        ...staticMeta,
        title: adminCat.title,
        japaneseTitle: adminCat.japaneseTitle || staticMeta.japaneseTitle,
        tagline: adminCat.tagline || staticMeta.tagline,
        description: adminCat.description || staticMeta.description,
        subcategories: mergedSubcats,
        matchedCategories: Array.from(
          new Set([
            adminCat.title,
            ...(adminCat.subcategories || []),
            ...staticMeta.matchedCategories,
          ])
        ),
      };
    }
    return staticMeta;
  }, [slug, adminCategories]);

  const {
    categoryProducts,
    priceBounds,
    filters,
    handleFilterChange,
    handleResetFilters,
    availableBrands,
    availableConcerns,
    availableSkinTypes,
    filteredProducts,
    sortedProducts,
    paginatedProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    activeFilterCount,
    sortBy,
    setSortBy,
    view,
    setView,
  } = useCategoryProducts(meta);

  const filterProps = {
    filters,
    onFilterChange: handleFilterChange,
    onResetFilters: handleResetFilters,
    availableSubcategories: meta.subcategories,
    availableBrands,
    availableConcerns,
    availableSkinTypes,
    priceBounds,
    activeFilterCount,
    filteredCount: filteredProducts.length,
  };

  return (
    <Layout>
      {/* 1. Category Hero with Title, Description & Subcategory Pills */}
      <CategoryHero
        meta={meta}
        totalCount={categoryProducts.length}
        selectedSubcategory={filters.selectedSubcategory}
        onSelectSubcategory={(sub) => handleFilterChange({ selectedSubcategory: sub })}
      />

      {/* 2. Top Selling Products in this Category */}
      <CategoryTopSelling categoryTitle={meta.title} products={categoryProducts} />

      {/* 3. Main Product Catalog & Filter Area */}
      <section className="py-8 sm:py-12 bg-background">
        <div className="container-lux">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <CategoryFilterSidebar {...filterProps} />

            <main className="flex-1 w-full min-w-0">
              <CategoryActiveFilters
                totalResults={categoryProducts.length}
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

              <CategoryProductGrid
                products={paginatedProducts}
                view={view}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                onResetFilters={handleResetFilters}
              />
            </main>
          </div>
        </div>
      </section>

      <GoToTop />
    </Layout>
  );
}
