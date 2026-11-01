"use client";

import { CatalogBreadcrumb } from "@/features/catalog";

export interface CategoryBreadcrumbProps {
  title: string;
  parent?: { label: string; href: string };
}

export function CategoryBreadcrumb({ title, parent }: CategoryBreadcrumbProps) {
  return (
    <CatalogBreadcrumb
      items={
        parent
          ? [{ label: parent.label, href: parent.href }, { label: title }]
          : [{ label: "Categories", href: "/categories" }, { label: title }]
      }
    />
  );
}
