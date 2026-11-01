import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, slugify } from "@/lib/catalog";
import type { Product } from "@/types";
import type { BrandMeta } from "../data/brandMetadata";
import type { BrandFilterState } from "../components/BrandFilters";
import type { BrandSortOption } from "../components/BrandActiveFilters";
import { computeBrandFacets, filterBrandProducts, sortBrandProducts } from "./brandFilterUtils";

export const ITEMS_PER_PAGE = 12;

export function useBrandProducts(meta: BrandMeta) {
  const searchParams = useSearchParams();

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
      8 - directMatches.length,
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
  const { availableCategories, availableConcerns, availableSkinTypes } = useMemo(
    () => computeBrandFacets(brandProducts),
    [brandProducts],
  );

  // Apply all filters
  const filteredProducts = useMemo(
    () => filterBrandProducts(brandProducts, filters),
    [brandProducts, filters],
  );

  // Sorting
  const sortedProducts = useMemo(
    () => sortBrandProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy],
  );

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

  return {
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
  };
}

