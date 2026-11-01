"use client";

import {
  CatalogFilterSidebar,
  CatalogFilterDrawer,
  type CatalogFilterState,
  type CatalogFacetItem,
  type CatalogFilterProps,
} from "@/features/catalog";

export interface ShopFilterState extends CatalogFilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedConcerns: string[];
  selectedSkinTypes: string[];
  selectedBadges: string[];
}

export type FacetItem = CatalogFacetItem;
export type ShopFiltersProps = CatalogFilterProps;

export const ShopFilterSidebar = CatalogFilterSidebar;
export const ShopFilterDrawer = CatalogFilterDrawer;
