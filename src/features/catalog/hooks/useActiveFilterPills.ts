import { formatBDT } from "@/lib/catalog";
import type { CatalogFilterState } from "../types";

export interface ActivePill {
  label: string;
  onRemove: () => void;
}

export function useActiveFilterPills(
  filters: CatalogFilterState,
  onFilterChange: (updates: Partial<CatalogFilterState>) => void,
  priceBounds: { min: number; max: number },
): ActivePill[] {
  const activePills: ActivePill[] = [];

  if (filters.searchQuery?.trim()) {
    activePills.push({
      label: `"${filters.searchQuery}"`,
      onRemove: () => onFilterChange({ searchQuery: "" }),
    });
  }

  if (filters.selectedSubcategory && filters.selectedSubcategory !== "All") {
    activePills.push({
      label: filters.selectedSubcategory,
      onRemove: () => onFilterChange({ selectedSubcategory: "All" }),
    });
  }

  (filters.selectedCategories || []).forEach((cat) => {
    activePills.push({
      label: cat,
      onRemove: () =>
        onFilterChange({
          selectedCategories: (filters.selectedCategories || []).filter((c) => c !== cat),
        }),
    });
  });

  (filters.selectedBrands || []).forEach((b) => {
    activePills.push({
      label: b,
      onRemove: () =>
        onFilterChange({
          selectedBrands: (filters.selectedBrands || []).filter((brand) => brand !== b),
        }),
    });
  });

  (filters.selectedConcerns || []).forEach((c) => {
    activePills.push({
      label: c,
      onRemove: () =>
        onFilterChange({
          selectedConcerns: (filters.selectedConcerns || []).filter((con) => con !== c),
        }),
    });
  });

  (filters.selectedSkinTypes || []).forEach((t) => {
    activePills.push({
      label: t,
      onRemove: () =>
        onFilterChange({
          selectedSkinTypes: (filters.selectedSkinTypes || []).filter((type) => type !== t),
        }),
    });
  });

  (filters.selectedBadges || []).forEach((badge) => {
    activePills.push({
      label: badge,
      onRemove: () =>
        onFilterChange({
          selectedBadges: (filters.selectedBadges || []).filter((bg) => bg !== badge),
        }),
    });
  });

  if (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max) {
    activePills.push({
      label: `${formatBDT(filters.minPrice)} – ${formatBDT(filters.maxPrice)}`,
      onRemove: () =>
        onFilterChange({
          minPrice: priceBounds.min,
          maxPrice: priceBounds.max,
        }),
    });
  }

  if (filters.minRating > 0) {
    activePills.push({
      label: `★ ${filters.minRating}+ Stars`,
      onRemove: () => onFilterChange({ minRating: 0 }),
    });
  }

  if (filters.inStockOnly) {
    activePills.push({
      label: "In Stock Only",
      onRemove: () => onFilterChange({ inStockOnly: false }),
    });
  }

  if (filters.onSaleOnly) {
    activePills.push({
      label: "On Sale",
      onRemove: () => onFilterChange({ onSaleOnly: false }),
    });
  }

  return activePills;
}

