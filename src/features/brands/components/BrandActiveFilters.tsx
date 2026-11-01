"use client";

import {
  CatalogActiveFilters,
  type CatalogActiveFiltersProps,
  type CatalogSortOption,
} from "@/features/catalog";
import type { BrandFilterState, BrandFilterDrawer } from "./BrandFilters";

export type BrandSortOption = CatalogSortOption;

export interface BrandActiveFiltersProps extends Omit<CatalogActiveFiltersProps, "drawerProps"> {
  filters: BrandFilterState;
  onFilterChange: (updates: Partial<BrandFilterState>) => void;
  drawerProps: React.ComponentProps<typeof BrandFilterDrawer>;
}

export function BrandActiveFilters(props: BrandActiveFiltersProps) {
  return <CatalogActiveFilters {...props} />;
}
