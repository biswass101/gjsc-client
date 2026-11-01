import React from "react";
import { AdminPageMeta } from "@/context/admin-context";
import { PageMetaCard } from "./PageMetaCard";

interface PagesGridProps {
  pages: AdminPageMeta[];
  onEdit: (page: AdminPageMeta) => void;
}

export function PagesGrid({ pages, onEdit }: PagesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {pages.map((page) => (
        <PageMetaCard key={page.id} page={page} onEdit={onEdit} />
      ))}
    </div>
  );
}

