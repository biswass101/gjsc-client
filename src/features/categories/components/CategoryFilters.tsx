"use client";

import {
  CatalogFilterSidebar,
  CatalogFilterDrawer,
  type CatalogFilterState,
  type CatalogFilterProps,
} from "@/features/catalog";

export interface CategoryFilterState extends CatalogFilterState {
  selectedSubcategory: string;
  selectedBrands: string[];
  selectedConcerns: string[];
  selectedSkinTypes: string[];
  selectedBadges?: string[];
}

export type CategoryFiltersProps = CatalogFilterProps;

export function CategoryFilterSidebar(props: CategoryFiltersProps) {
  return <CatalogFilterSidebar hideCategories={true} {...props} />;
}

export function CategoryFilterDrawer(props: CategoryFiltersProps) {
  return <CatalogFilterDrawer hideCategories={true} {...props} />;
}
