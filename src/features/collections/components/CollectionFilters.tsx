"use client";

import {
  CatalogFilterSidebar,
  CatalogFilterDrawer,
  type CatalogFilterState,
  type CatalogFilterProps,
} from "@/features/catalog";

export interface CollectionFilterState extends CatalogFilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedConcerns: string[];
  selectedSkinTypes: string[];
}

export type CollectionFiltersProps = CatalogFilterProps;

export const CollectionFilterSidebar = CatalogFilterSidebar;
export const CollectionFilterDrawer = CatalogFilterDrawer;
