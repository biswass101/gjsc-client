"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Layout, GoToTop } from "@/components/layout";
import { PRODUCTS } from "@/lib/catalog";
import type { Product } from "@/types";
import { getCategoryMeta } from "../data/categoryMetadata";
import { CategoryHero } from "./CategoryHero";
import { CategoryTopSelling } from "./CategoryTopSelling";
import {
  CategoryFilterSidebar,
  CategoryFilterDrawer,
  type CategoryFilterState,
} from "./CategoryFilters";
import { CategoryActiveFilters, type SortOption } from "./CategoryActiveFilters";
import { CategoryProductGrid } from "./CategoryProductGrid";

interface CategoryPageClientProps {
  slug: string;
}

const ITEMS_PER_PAGE = 12;

export function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const searchParams = useSearchParams();
  const meta = useMemo(() => getCategoryMeta(slug), [slug]);

  // All products belonging to this category department
  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // 1. Direct matched categories match
      const inMatched = meta.matchedCategories.some(
        (cat) => cat.toLowerCase() === p.category.toLowerCase()
      );
      if (inMatched) return true;

      // 2. Subcategory / title match
      if (p.category.toLowerCase().includes(meta.title.toLowerCase())) return true;
      if (meta.title.toLowerCase().includes(p.category.toLowerCase())) return true;

      return false;
    });
  }, [meta]);

  // Compute price bounds from category products
  const priceBounds = useMemo(() => {
    if (categoryProducts.length === 0) return { min: 0, max: 15000 };
    const prices = categoryProducts.map((p) => p.price);
    const min = Math.floor(Math.min(...prices) / 100) * 100;
    const max = Math.ceil(Math.max(...prices) / 100) * 100;
    return { min: Math.max(0, min), max: Math.max(min + 1000, max) };
  }, [categoryProducts]);

  // Initial filter state
  const initialSubcategory = searchParams?.get("sub") ?? "All";

  const [filters, setFilters] = useState<CategoryFilterState>({
    selectedSubcategory: initialSubcategory,
    selectedBrands: [],
    selectedConcerns: [],
    selectedSkinTypes: [],
    minPrice: priceBounds.min,
    maxPrice: priceBounds.max,
    minRating: 0,
    inStockOnly: false,
    onSaleOnly: false,
  });

  // Sync price bounds when category changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
      selectedSubcategory: searchParams?.get("sub") ?? "All",
    }));
  }, [priceBounds, searchParams]);

  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter updates helper
  const handleFilterChange = (updates: Partial<CategoryFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      selectedSubcategory: "All",
      selectedBrands: [],
      selectedConcerns: [],
      selectedSkinTypes: [],
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: false,
    });
    setCurrentPage(1);
  };

  // Available facets calculation
  const availableBrands = useMemo(() => {
    const counts: Record<string, number> = {};
    categoryProducts.forEach((p) => {
      counts[p.brand] = (counts[p.brand] ?? 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [categoryProducts]);

  const availableConcerns = useMemo(() => {
    const counts: Record<string, number> = {};
    categoryProducts.forEach((p) => {
      p.concerns.forEach((c) => {
        counts[c] = (counts[c] ?? 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [categoryProducts]);

  const availableSkinTypes = useMemo(() => {
    const counts: Record<string, number> = {};
    categoryProducts.forEach((p) => {
      p.skinTypes.forEach((st) => {
        counts[st] = (counts[st] ?? 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [categoryProducts]);

  // Apply all filters
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      // 1. Subcategory filter
      if (
        filters.selectedSubcategory &&
        filters.selectedSubcategory !== "All"
      ) {
        const sub = filters.selectedSubcategory.toLowerCase();
        const pCat = product.category.toLowerCase();
        const pName = product.name.toLowerCase();
        const match =
          pCat.includes(sub) ||
          sub.includes(pCat) ||
          pName.includes(sub);
        if (!match) return false;
      }

      // 2. Brand filter
      if (
        filters.selectedBrands.length > 0 &&
        !filters.selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      // 3. Skin Concern filter
      if (
        filters.selectedConcerns.length > 0 &&
        !product.concerns.some((c) => filters.selectedConcerns.includes(c))
      ) {
        return false;
      }

      // 4. Skin Type filter
      if (
        filters.selectedSkinTypes.length > 0 &&
        !product.skinTypes.some((st) => filters.selectedSkinTypes.includes(st))
      ) {
        return false;
      }

      // 5. Price filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // 6. Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // 7. In stock filter
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      // 8. On sale filter
      if (filters.onSaleOnly && (!product.compareAt || product.compareAt <= product.price)) {
        return false;
      }

      return true;
    });
  }, [categoryProducts, filters]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price_asc":
        return list.sort((a, b) => a.price - b.price);
      case "price_desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case "newest":
        return list.sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0));
      case "popular":
      default:
        return list.sort(
          (a, b) =>
            (b.badge === "Best Seller" ? 2 : 0) +
            b.rating * b.reviews -
            ((a.badge === "Best Seller" ? 2 : 0) + a.rating * a.reviews)
        );
    }
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.selectedSubcategory && filters.selectedSubcategory !== "All") count++;
    count += filters.selectedBrands.length;
    count += filters.selectedConcerns.length;
    count += filters.selectedSkinTypes.length;
    if (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max) count++;
    if (filters.inStockOnly) count++;
    if (filters.onSaleOnly) count++;
    if (filters.minRating > 0) count++;
    return count;
  }, [filters, priceBounds]);

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
      <CategoryTopSelling
        categoryTitle={meta.title}
        products={categoryProducts}
      />

      {/* 3. Main Product Catalog & Filter Area */}
      <section className="py-8 sm:py-12 bg-background">
        <div className="container-lux">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Desktop Filter Sidebar */}
            <CategoryFilterSidebar {...filterProps} />

            {/* Main Product Area */}
            <main className="flex-1 w-full min-w-0">
              {/* Active Filter Badges, Sort & View Selector */}
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

              {/* Product Grid / List with Pagination & Empty State */}
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

      {/* Go to top button */}
      <GoToTop />
    </Layout>
  );
}

