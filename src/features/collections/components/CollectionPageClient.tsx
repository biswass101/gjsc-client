"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Layout, GoToTop } from "@/components/layout";
import { PRODUCTS } from "@/lib/catalog";
import type { Product } from "@/types";
import { getCollectionMeta } from "../data/collectionMetadata";
import { CollectionHero } from "./CollectionHero";
import { CollectionBreadcrumb } from "./CollectionBreadcrumb";
import { CollectionFrequentlySearched } from "./CollectionFrequentlySearched";
import {
  CollectionFilterSidebar,
  CollectionFilterDrawer,
  type CollectionFilterState,
} from "./CollectionFilters";
import {
  CollectionActiveFilters,
  type CollectionSortOption,
} from "./CollectionActiveFilters";
import { CollectionProductGrid } from "./CollectionProductGrid";

interface CollectionPageClientProps {
  slug: string;
}

const ITEMS_PER_PAGE = 12;

export function CollectionPageClient({ slug }: CollectionPageClientProps) {
  const searchParams = useSearchParams();
  const meta = useMemo(() => getCollectionMeta(slug), [slug]);

  // Products that belong to this collection based on collection predicate
  const collectionProducts = useMemo(() => {
    const matched = PRODUCTS.filter((p) => meta.filterPredicate(p));
    // If predicate matched fewer than 3 items, provide safe fallback
    if (matched.length >= 3) return matched;
    return PRODUCTS;
  }, [meta]);

  // Compute price bounds from this collection's products
  const priceBounds = useMemo(() => {
    if (collectionProducts.length === 0) return { min: 0, max: 15000 };
    const prices = collectionProducts.map((p) => p.price);
    const min = Math.floor(Math.min(...prices) / 100) * 100;
    const max = Math.ceil(Math.max(...prices) / 100) * 100;
    return { min: Math.max(0, min), max: Math.max(min + 1000, max) };
  }, [collectionProducts]);

  // Initial filter state from URL or defaults
  const initialSearch = searchParams?.get("q") ?? "";

  const [filters, setFilters] = useState<CollectionFilterState>({
    searchQuery: initialSearch,
    selectedCategories: [],
    selectedBrands: [],
    selectedConcerns: [],
    selectedSkinTypes: [],
    minPrice: priceBounds.min,
    maxPrice: priceBounds.max,
    minRating: 0,
    inStockOnly: false,
    onSaleOnly: false,
  });

  // Sync price bounds when collection changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
      searchQuery: searchParams?.get("q") ?? "",
    }));
  }, [priceBounds, searchParams]);

  const [sortBy, setSortBy] = useState<CollectionSortOption>("curated");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter updates helper
  const handleFilterChange = (updates: Partial<CollectionFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedCategories: [],
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

  // Derive available filter facet counts from this collection's products
  const availableCategories = useMemo(() => {
    const counts = new Map<string, number>();
    collectionProducts.forEach((p) => {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [collectionProducts]);

  const availableBrands = useMemo(() => {
    const counts = new Map<string, number>();
    collectionProducts.forEach((p) => {
      counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [collectionProducts]);

  const availableConcerns = useMemo(() => {
    const counts = new Map<string, number>();
    collectionProducts.forEach((p) => {
      p.concerns?.forEach((c) => {
        counts.set(c, (counts.get(c) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [collectionProducts]);

  const availableSkinTypes = useMemo(() => {
    const counts = new Map<string, number>();
    collectionProducts.forEach((p) => {
      p.skinTypes?.forEach((st) => {
        counts.set(st, (counts.get(st) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [collectionProducts]);

  // Compute active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim()) count++;
    if (filters.selectedCategories.length > 0) count += filters.selectedCategories.length;
    if (filters.selectedBrands.length > 0) count += filters.selectedBrands.length;
    if (filters.selectedConcerns.length > 0) count += filters.selectedConcerns.length;
    if (filters.selectedSkinTypes.length > 0) count += filters.selectedSkinTypes.length;
    if (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max) count++;
    if (filters.inStockOnly) count++;
    if (filters.onSaleOnly) count++;
    if (filters.minRating > 0) count++;
    return count;
  }, [filters, priceBounds]);

  // Filtered & Sorted products pipeline
  const filteredProducts = useMemo(() => {
    return collectionProducts.filter((product) => {
      // 1. Keyword search (matches query chip or manual input)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesShort = product.short?.toLowerCase().includes(q) ?? false;
        const matchesIngredients = product.ingredients?.some((ing) =>
          ing.toLowerCase().includes(q)
        ) ?? false;
        const matchesConcerns = product.concerns?.some((c) =>
          c.toLowerCase().includes(q)
        ) ?? false;

        if (
          !matchesName &&
          !matchesBrand &&
          !matchesCategory &&
          !matchesShort &&
          !matchesIngredients &&
          !matchesConcerns
        ) {
          return false;
        }
      }

      // 2. Categories
      if (
        filters.selectedCategories.length > 0 &&
        !filters.selectedCategories.includes(product.category)
      ) {
        return false;
      }

      // 3. Brands
      if (
        filters.selectedBrands.length > 0 &&
        !filters.selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      // 4. Concerns
      if (
        filters.selectedConcerns.length > 0 &&
        !product.concerns?.some((c) => filters.selectedConcerns.includes(c))
      ) {
        return false;
      }

      // 5. Skin Types
      if (
        filters.selectedSkinTypes.length > 0 &&
        !product.skinTypes?.some((st) => filters.selectedSkinTypes.includes(st))
      ) {
        return false;
      }

      // 6. Price range
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // 7. Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // 8. In stock only
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      // 9. On sale only
      if (
        filters.onSaleOnly &&
        (!product.compareAt || product.compareAt <= product.price)
      ) {
        return false;
      }

      return true;
    });
  }, [collectionProducts, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "curated":
        return list;
      case "bestselling":
        return list.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
      case "price-low":
        return list.sort((a, b) => a.price - b.price);
      case "price-high":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "newest":
        return list.sort((a, b) => Number(b.id) - Number(a.id));
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  return (
    <Layout>
      {/* 1. Breadcrumb: Home > Collections > [Collection Title] */}
      <div className="container-lux pt-3">
        <CollectionBreadcrumb title={meta.title} />
      </div>

      {/* 2. Image Banner Section (Only image banner present, nothing else) */}
      <CollectionHero meta={meta} />

      {/* 3. Main Collection Body */}
      <div className="container-lux py-4 sm:py-6">
        {/* 4. Filter & Product Section */}
        <div className="flex items-start gap-8">
          {/* Desktop Sidebar Filters */}
          <CollectionFilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            availableCategories={availableCategories}
            availableBrands={availableBrands}
            availableConcerns={availableConcerns}
            availableSkinTypes={availableSkinTypes}
            priceBounds={priceBounds}
            activeFilterCount={activeFilterCount}
            filteredCount={sortedProducts.length}
          />

          {/* Product Listing Main Area */}
          <main className="flex-1 min-w-0">
            {/* Active Filters Toolbar with mobile drawer trigger */}
            <CollectionActiveFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              view={view}
              onViewChange={setView}
              totalResults={sortedProducts.length}
              priceBounds={priceBounds}
              drawerTriggerSlot={
                <CollectionFilterDrawer
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  availableCategories={availableCategories}
                  availableBrands={availableBrands}
                  availableConcerns={availableConcerns}
                  availableSkinTypes={availableSkinTypes}
                  priceBounds={priceBounds}
                  activeFilterCount={activeFilterCount}
                  filteredCount={sortedProducts.length}
                />
              }
            />

            {/* Products Grid / List */}
            <CollectionProductGrid
              products={paginatedProducts}
              view={view}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onResetFilters={handleResetFilters}
            />

            {/* Frequently Searched Section at bottom of the products */}
            <div className="mt-10">
              <CollectionFrequentlySearched
                collectionTitle={meta.title}
                items={meta.frequentlySearched}
                activeSearchQuery={filters.searchQuery}
                onSelectQuery={(query) => {
                  handleFilterChange({ searchQuery: query });
                  window.scrollTo({ top: 380, behavior: "smooth" });
                }}
                onClearQuery={() => handleFilterChange({ searchQuery: "" })}
              />
            </div>
          </main>
        </div>
      </div>

      <GoToTop />
    </Layout>
  );
}

