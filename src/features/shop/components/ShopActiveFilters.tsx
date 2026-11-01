"use client";

import {
  CatalogActiveFilters,
  type CatalogActiveFiltersProps,
  type CatalogSortOption,
} from "@/features/catalog";

export type ShopSortOption = CatalogSortOption;
export type ShopActiveFiltersProps = CatalogActiveFiltersProps;

export const ShopActiveFilters = CatalogActiveFilters;
