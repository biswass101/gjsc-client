"use client";

import { CatalogBreadcrumb } from "@/features/catalog";

export interface CollectionBreadcrumbProps {
  title: string;
}

export function CollectionBreadcrumb({ title }: CollectionBreadcrumbProps) {
  return (
    <CatalogBreadcrumb items={[{ label: "Collections", href: "/collections" }, { label: title }]} />
  );
}
