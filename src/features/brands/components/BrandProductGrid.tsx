"use client";

import { CatalogProductGrid, type CatalogProductGridProps } from "@/features/catalog";

export type BrandProductGridProps = CatalogProductGridProps;

export function BrandProductGrid(props: BrandProductGridProps) {
  return (
    <CatalogProductGrid
      emptyMessage="We couldn't find any products matching your active filters for this brand. Try adjusting your price range, skin type, or category filters."
      {...props}
    />
  );
}
