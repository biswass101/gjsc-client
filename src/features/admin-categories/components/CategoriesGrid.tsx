import React from "react";
import { FolderTree, Plus } from "lucide-react";
import type { AdminCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "./CategoryCard";

interface CategoriesGridProps {
  categories: AdminCategory[];
  onEdit: (cat: AdminCategory) => void;
  onDeleteRequest: (cat: AdminCategory) => void;
  onToggleFeatured: (cat: AdminCategory) => void;
  onOpenCreate: () => void;
}

export function CategoriesGrid({
  categories,
  onEdit,
  onDeleteRequest,
  onToggleFeatured,
  onOpenCreate,
}: CategoriesGridProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
        <FolderTree className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
        <h3 className="font-bold text-foreground text-lg">No Categories Found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
          Try adjusting your search query or create a new category to populate your catalog.
        </p>
        <Button onClick={onOpenCreate} className="mt-4 gap-2">
          <Plus className="h-4 w-4" />
          <span>Create First Category</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDeleteRequest={onDeleteRequest}
          onToggleFeatured={onToggleFeatured}
        />
      ))}
    </div>
  );
}

