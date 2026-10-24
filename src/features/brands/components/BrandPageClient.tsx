"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Layout, GoToTop } from "@/components/layout";
import { PRODUCTS, slugify } from "@/lib/catalog";
import type { Product } from "@/types";
import { getBrandMeta } from "../data/brandMetadata";
import { BrandHero } from "./BrandHero";
import { BrandBestSelling } from "./BrandBestSelling";
import {
  BrandFilterSidebar,
  type BrandFilterState,
} from "./BrandFilters";
import { BrandActiveFilters, type BrandSortOption } from "./BrandActiveFilters";
import { BrandProductGrid } from "./BrandProductGrid";

interface BrandPageClientProps {
  slug: string;
}

const ITEMS_PER_PAGE = 12;

export function BrandPageClient({ slug }: BrandPageClientProps) {
  const searchParams = useSearchParams();
  const meta = useMemo(() => getBrandMeta(slug), [slug]);

  // All products belonging to this brand
  const brandProducts = useMemo(() => {
    // 1. Direct brand name / alias match
    const directMatches = PRODUCTS.filter((p) => {
      const pBrand = p.brand.toLowerCase();
      const metaName = meta.name.toLowerCase();
      const metaSlug = meta.slug.toLowerCase();
      if (pBrand === metaName) return true;
      if (slugify(p.brand) === metaSlug) return true;
      if (meta.aliases.some((a) => a.toLowerCase() === slugify(p.brand).toLowerCase())) return true;
      if (p.name.toLowerCase().includes(metaName)) return true;
      return false;
    });

    if (directMatches.length >= 3) return directMatches;

    // 2. Fallback complement so all 36 Japanese brands display rich product lines
    const complementary = PRODUCTS.filter((p) => !directMatches.includes(p)).slice(
      0,
      8 - directMatches.length
    );

    return [
      ...directMatches,
      ...complementary.map((p) => ({
        ...p,
        id: `${meta.slug}-${p.id}`,
        brand: meta.name,
      })),
    ];
  }, [meta]);

  // Compute price bounds from brand products
  const priceBounds = useMemo(() => {
    if (brandProducts.length === 0) return { min: 0, max: 15000 };
    const prices = brandProducts.map((p) => p.price);
    const min = Math.floor(Math.min(...prices) / 100) * 100;
    const max = Math.ceil(Math.max(...prices) / 100) * 100;
    return { min: Math.max(0, min), max: Math.max(min + 1000, max) };
  }, [brandProducts]);

  // Initial filter state from URL params
  const initialSearch = searchParams?.get("q") ?? "";

  const [filters, setFilters] = useState<BrandFilterState>({
    searchQuery: initialSearch,
    selectedCategories: [],
    selectedConcerns: [],
    selectedSkinTypes: [],
    minPrice: priceBounds.min,
    maxPrice: priceBounds.max,
    minRating: 0,
    inStockOnly: false,
    onSaleOnly: false,
  });

  // Sync price bounds when brand changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
      searchQuery: searchParams?.get("q") ?? "",
    }));
  }, [priceBounds, searchParams]);

  const [sortBy, setSortBy] = useState<BrandSortOption>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter updates helper
  const handleFilterChange = (updates: Partial<BrandFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedCategories: [],
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

  // Available facet calculation
  const availableCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    brandProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [brandProducts]);

  const availableConcerns = useMemo(() => {
    const counts: Record<string, number> = {};
    brandProducts.forEach((p) => {
      p.concerns.forEach((c) => {
        counts[c] = (counts[c] ?? 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [brandProducts]);

  const availableSkinTypes = useMemo(() => {
    const counts: Record<string, number> = {};
    brandProducts.forEach((p) => {
      p.skinTypes.forEach((st) => {
        counts[st] = (counts[st] ?? 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [brandProducts]);

  // Apply all filters
  const filteredProducts = useMemo(() => {
    return brandProducts.filter((product) => {
      // 1. Text Search Query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesShort = product.short?.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesShort) return false;
      }

      // 2. Category filter
      if (
        filters.selectedCategories.length > 0 &&
        !filters.selectedCategories.includes(product.category)
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
  }, [brandProducts, filters]);

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

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    count += filters.selectedCategories.length;
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
    availableCategories,
    availableConcerns,
    availableSkinTypes,
    priceBounds,
    activeFilterCount,
    filteredCount: filteredProducts.length,
  };

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

