"use client";

import { CatalogBreadcrumb } from "@/features/catalog";

export interface BrandBreadcrumbProps {
  brandName: string;
}

export function BrandBreadcrumb({ brandName }: BrandBreadcrumbProps) {
  return (
    <CatalogBreadcrumb
      items={[{ label: "Brands", href: "/brands" }, { label: brandName }]}
      className="text-xs text-muted-foreground"
    />
  );
}
