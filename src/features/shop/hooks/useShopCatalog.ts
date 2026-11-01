import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/catalog";
import type { ShopFilterState, ShopSortOption } from "../types";

export const PER_PAGE = 12;

export function useShopCatalog(priceBounds: { min: number; max: number }) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ShopFilterState>(() => {
    const paramCategory = searchParams?.get("category");
    const paramBrand = searchParams?.get("brand");
    const paramConcern = searchParams?.get("concern");
    const paramSkinType = searchParams?.get("skinType");
    const paramBadge = searchParams?.get("badge");
    const paramQ = searchParams?.get("q") ?? "";
    const paramOnSale = searchParams?.get("onSale") === "true";

    return {
      searchQuery: paramQ,
      selectedCategories: paramCategory ? [paramCategory] : [],
      selectedBrands: paramBrand ? [paramBrand] : [],
      selectedConcerns: paramConcern ? [paramConcern] : [],
      selectedSkinTypes: paramSkinType ? [paramSkinType] : [],
      selectedBadges: paramBadge ? [paramBadge] : [],
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: paramOnSale,
    };
  });

  useEffect(() => {
    const paramCategory = searchParams?.get("category");
    const paramBrand = searchParams?.get("brand");
    const paramConcern = searchParams?.get("concern");
    const paramSkinType = searchParams?.get("skinType");
    const paramBadge = searchParams?.get("badge");
    const paramQ = searchParams?.get("q");
    const paramOnSale = searchParams?.get("onSale");

    if (
      paramCategory ||
      paramBrand ||
      paramConcern ||
      paramSkinType ||
      paramBadge ||
      paramQ !== null ||
      paramOnSale !== null
    ) {
      setFilters((prev: ShopFilterState) => ({
        ...prev,
        ...(paramCategory ? { selectedCategories: [paramCategory] } : {}),
        ...(paramBrand ? { selectedBrands: [paramBrand] } : {}),
        ...(paramConcern ? { selectedConcerns: [paramConcern] } : {}),
        ...(paramSkinType ? { selectedSkinTypes: [paramSkinType] } : {}),
        ...(paramBadge ? { selectedBadges: [paramBadge] } : {}),
        ...(paramQ !== null ? { searchQuery: paramQ ?? "" } : {}),
        ...(paramOnSale !== null ? { onSaleOnly: paramOnSale === "true" } : {}),
      }));
    }
  }, [searchParams]);

  const [sortBy, setSortBy] = useState<ShopSortOption>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const handleFilterChange = (updates: Partial<ShopFilterState>) => {
    setFilters((prev: ShopFilterState) => ({ ...prev, ...updates }));
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedCategories: [],
      selectedBrands: [],
      selectedConcerns: [],
      selectedSkinTypes: [],
      selectedBadges: [],
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: false,
    });
    setPage(1);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim()) count++;
    count += filters.selectedCategories.length;
    count += filters.selectedBrands.length;
    count += filters.selectedConcerns.length;
    count += filters.selectedSkinTypes.length;
    count += filters.selectedBadges.length;
    if (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max) count++;
    if (filters.inStockOnly) count++;
    if (filters.onSaleOnly) count++;
    if (filters.minRating > 0) count++;
    return count;
  }, [filters, priceBounds]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesShort = product.short?.toLowerCase().includes(q) ?? false;
        const matchesIngredients =
          product.ingredients?.some((ing) => ing.toLowerCase().includes(q)) ?? false;
        const matchesConcerns =
          product.concerns?.some((c) => c.toLowerCase().includes(q)) ?? false;

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

      if (
        filters.selectedCategories.length > 0 &&
        !filters.selectedCategories.includes(product.category)
      ) {
        return false;
      }

      if (
        filters.selectedBrands.length > 0 &&
        !filters.selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      if (
        filters.selectedConcerns.length > 0 &&
        !product.concerns?.some((c) => filters.selectedConcerns.includes(c))
      ) {
        return false;
      }

      if (
        filters.selectedSkinTypes.length > 0 &&
        !product.skinTypes?.some((st) => filters.selectedSkinTypes.includes(st))
      ) {
        return false;
      }

      if (
        filters.selectedBadges.length > 0 &&
        (!product.badge || !filters.selectedBadges.includes(product.badge))
      ) {
        return false;
      }

      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      if (
        filters.onSaleOnly &&
        (!product.compareAt || product.compareAt <= product.price)
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "popular":
        return list.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
      case "bestselling":
        return list.sort((a, b) => b.reviews - a.reviews);
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

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * PER_PAGE;
  const pagedProducts = sortedProducts.slice(startIdx, startIdx + PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const headerTitle = useMemo(() => {
    if (filters.selectedBadges.length === 1) {
      return `${filters.selectedBadges[0]} Formulations`;
    }
    if (filters.selectedCategories.length === 1) {
      return `${filters.selectedCategories[0]} Collection`;
    }
    if (filters.selectedBrands.length === 1) {
      return `${filters.selectedBrands[0]} Apothecary`;
    }
    return "All Japanese Beauty Formulations";
  }, [filters.selectedBadges, filters.selectedCategories, filters.selectedBrands]);

  return {
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
  };
}
