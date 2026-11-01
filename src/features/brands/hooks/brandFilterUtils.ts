import type { Product } from "@/types";
import type { BrandFilterState } from "../components/BrandFilters";
import type { BrandSortOption } from "../components/BrandActiveFilters";

export interface BrandFacetItem {
  name: string;
  count: number;
}

export function computeBrandFacets(brandProducts: Product[]) {
  const categoryCounts: Record<string, number> = {};
  const concernCounts: Record<string, number> = {};
  const skinTypeCounts: Record<string, number> = {};

  brandProducts.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1;
    p.concerns.forEach((c) => {
      concernCounts[c] = (concernCounts[c] ?? 0) + 1;
    });
    p.skinTypes.forEach((st) => {
      skinTypeCounts[st] = (skinTypeCounts[st] ?? 0) + 1;
    });
  });

  const toSortedList = (counts: Record<string, number>): BrandFacetItem[] =>
    Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

  return {
    availableCategories: toSortedList(categoryCounts),
    availableConcerns: toSortedList(concernCounts),
    availableSkinTypes: toSortedList(skinTypeCounts),
  };
}

export function filterBrandProducts(brandProducts: Product[], filters: BrandFilterState): Product[] {
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
}

export function sortBrandProducts(products: Product[], sortBy: BrandSortOption): Product[] {
  const list = [...products];
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
}

