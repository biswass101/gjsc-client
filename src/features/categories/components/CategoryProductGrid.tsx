"use client";

import { CatalogProductGrid, type CatalogProductGridProps } from "@/features/catalog";

export type CategoryProductGridProps = CatalogProductGridProps;

export function CategoryProductGrid(props: CategoryProductGridProps) {
  return (
    <CatalogProductGrid
      emptyMessage="We couldn't find any products matching your active filters in this category. Try adjusting your price range, skin type, or brand filters."
      {...props}
    />
  );
}
