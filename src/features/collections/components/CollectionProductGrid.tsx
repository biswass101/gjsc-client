"use client";

import { CatalogProductGrid, type CatalogProductGridProps } from "@/features/catalog";

export type CollectionProductGridProps = CatalogProductGridProps;

export function CollectionProductGrid(props: CollectionProductGridProps) {
  return (
    <CatalogProductGrid
      emptyMessage="We couldn't find any products matching your active filters in this collection. Try adjusting your price range or skin type filters."
      {...props}
    />
  );
}
