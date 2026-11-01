"use client";

import {
  CatalogActiveFilters,
  type CatalogActiveFiltersProps,
  type CatalogSortOption,
} from "@/features/catalog";
import type { CategoryFilterState, CategoryFilterDrawer } from "./CategoryFilters";

export type SortOption = CatalogSortOption;

export interface CategoryActiveFiltersProps extends Omit<CatalogActiveFiltersProps, "drawerProps"> {
  filters: CategoryFilterState;
  onFilterChange: (updates: Partial<CategoryFilterState>) => void;
  drawerProps: React.ComponentProps<typeof CategoryFilterDrawer>;
}

export function CategoryActiveFilters(props: CategoryActiveFiltersProps) {
  return <CatalogActiveFilters {...props} />;
}
