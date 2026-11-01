import type { Product } from "@/types";
import type { CollectionFilterState } from "../components/CollectionFilters";
import type { CollectionSortOption } from "../components/CollectionActiveFilters";

export interface FacetCountItem {
  name: string;
  count: number;
}

export function computeAvailableFacets(collectionProducts: Product[]) {
  const categoryCounts = new Map<string, number>();
  const brandCounts = new Map<string, number>();
  const concernCounts = new Map<string, number>();
  const skinTypeCounts = new Map<string, number>();

  collectionProducts.forEach((p) => {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1);
    brandCounts.set(p.brand, (brandCounts.get(p.brand) ?? 0) + 1);
    p.concerns?.forEach((c) => {
      concernCounts.set(c, (concernCounts.get(c) ?? 0) + 1);
    });
    p.skinTypes?.forEach((st) => {
      skinTypeCounts.set(st, (skinTypeCounts.get(st) ?? 0) + 1);
    });
  });

  const toSortedFacetList = (counts: Map<string, number>): FacetCountItem[] =>
    Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

  return {
    availableCategories: toSortedFacetList(categoryCounts),
    availableBrands: toSortedFacetList(brandCounts),
    availableConcerns: toSortedFacetList(concernCounts),
    availableSkinTypes: toSortedFacetList(skinTypeCounts),
  };
}

export function filterCollectionProducts(
  collectionProducts: Product[],
  filters: CollectionFilterState,
): Product[] {
  return collectionProducts.filter((product) => {
    // 1. Keyword search
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesBrand = product.brand.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      const matchesShort = product.short?.toLowerCase().includes(q) ?? false;
      const matchesIngredients =
        product.ingredients?.some((ing) => ing.toLowerCase().includes(q)) ?? false;
      const matchesConcerns = product.concerns?.some((c) => c.toLowerCase().includes(q)) ?? false;

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
    if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(product.brand)) {
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
    if (filters.onSaleOnly && (!product.compareAt || product.compareAt <= product.price)) {
      return false;
    }

    return true;
  });
}

export function sortCollectionProducts(
  products: Product[],
  sortBy: CollectionSortOption,
): Product[] {
  const list = [...products];
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
}

