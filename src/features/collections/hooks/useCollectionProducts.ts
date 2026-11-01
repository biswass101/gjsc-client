import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/catalog";
import type { CollectionMeta } from "../data/collectionMetadata";
import type { CollectionFilterState } from "../components/CollectionFilters";
import type { CollectionSortOption } from "../components/CollectionActiveFilters";
import {
  computeAvailableFacets,
  filterCollectionProducts,
  sortCollectionProducts,
} from "./collectionFilterUtils";

export const ITEMS_PER_PAGE = 12;

export function useCollectionProducts(meta: CollectionMeta) {
  const searchParams = useSearchParams();

  // Products that belong to this collection based on collection predicate
  const collectionProducts = useMemo(() => {
    const matched = PRODUCTS.filter((p) => meta.filterPredicate(p));
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

  // Derive available filter facet counts
  const { availableCategories, availableBrands, availableConcerns, availableSkinTypes } =
    useMemo(() => computeAvailableFacets(collectionProducts), [collectionProducts]);

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
  const filteredProducts = useMemo(
    () => filterCollectionProducts(collectionProducts, filters),
    [collectionProducts, filters],
  );

  const sortedProducts = useMemo(
    () => sortCollectionProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy],
  );

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

  return {
    priceBounds,
    filters,
    sortBy,
    setSortBy,
    view,
    setView,
    currentPage,
    handleFilterChange,
    handleResetFilters,
    availableCategories,
    availableBrands,
    availableConcerns,
    availableSkinTypes,
    activeFilterCount,
    sortedProducts,
    totalPages,
    paginatedProducts,
    handlePageChange,
  };
}
