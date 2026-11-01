"use client";

import {
  CatalogFilterSidebar,
  CatalogFilterDrawer,
  type CatalogFilterState,
  type CatalogFilterProps,
} from "@/features/catalog";

export interface BrandFilterState extends CatalogFilterState {
  selectedCategories: string[];
  selectedConcerns: string[];
  selectedSkinTypes: string[];
}

export type BrandFiltersProps = CatalogFilterProps;

export function BrandFilterSidebar(props: BrandFiltersProps) {
  return <CatalogFilterSidebar hideBrands={true} {...props} />;
}

export function BrandFilterDrawer(props: BrandFiltersProps) {
  return <CatalogFilterDrawer hideBrands={true} {...props} />;
}
