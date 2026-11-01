import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/catalog";
import type { CategoryMeta } from "../data/categoryMetadata";
import type { CategoryFilterState } from "../components/CategoryFilters";
import type { SortOption } from "../components/CategoryActiveFilters";

export const ITEMS_PER_PAGE = 12;

export function useCategoryProducts(meta: CategoryMeta) {
  const searchParams = useSearchParams();

  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const inMatched = meta.matchedCategories.some(
        (cat) => cat.toLowerCase() === p.category.toLowerCase(),
      );
      if (inMatched) return true;

      if (p.category.toLowerCase().includes(meta.title.toLowerCase())) return true;
      if (meta.title.toLowerCase().includes(p.category.toLowerCase())) return true;

      return false;
    });
  }, [meta]);

  const priceBounds = useMemo(() => {
    if (categoryProducts.length === 0) return { min: 0, max: 15000 };
    const prices = categoryProducts.map((p) => p.price);
    const min = Math.floor(Math.min(...prices) / 100) * 100;
    const max = Math.ceil(Math.max(...prices) / 100) * 100;
    return { min: Math.max(0, min), max: Math.max(min + 1000, max) };
  }, [categoryProducts]);

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

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      if (filters.selectedSubcategory && filters.selectedSubcategory !== "All") {
        const sub = filters.selectedSubcategory.toLowerCase();
        const pCat = product.category.toLowerCase();
        const pName = product.name.toLowerCase();
        const match = pCat.includes(sub) || sub.includes(pCat) || pName.includes(sub);
        if (!match) return false;
      }

      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(product.brand)) {
        return false;
      }

      if (
        filters.selectedConcerns.length > 0 &&
        !product.concerns.some((c) => filters.selectedConcerns.includes(c))
      ) {
        return false;
      }

      if (
        filters.selectedSkinTypes.length > 0 &&
        !product.skinTypes.some((st) => filters.selectedSkinTypes.includes(st))
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

      if (filters.onSaleOnly && (!product.compareAt || product.compareAt <= product.price)) {
        return false;
      }

      return true;
    });
  }, [categoryProducts, filters]);

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
            ((a.badge === "Best Seller" ? 2 : 0) + a.rating * a.reviews),
        );
    }
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

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

  return {
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
  };
}

