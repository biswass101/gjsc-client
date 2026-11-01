import React from "react";
import { Sparkles, Plus } from "lucide-react";
import type { AdminCollection } from "@/types";
import { Button } from "@/components/ui/button";
import { CollectionCard } from "./CollectionCard";

interface CollectionsGridProps {
  collections: AdminCollection[];
  onEdit: (col: AdminCollection) => void;
  onDeleteRequest: (col: AdminCollection) => void;
  onToggleFeatured: (col: AdminCollection) => void;
  onOpenCreate: () => void;
}

export function CollectionsGrid({
  collections,
  onEdit,
  onDeleteRequest,
  onToggleFeatured,
  onOpenCreate,
}: CollectionsGridProps) {
  if (collections.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
        <Sparkles className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
        <h3 className="font-bold text-foreground text-lg">No Collections Found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
          Try a different search query or launch a new skincare collection routine.
        </p>
        <Button onClick={onOpenCreate} className="mt-4 gap-2">
          <Plus className="h-4 w-4" />
          <span>Create First Collection</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((col) => (
        <CollectionCard
          key={col.id}
          collection={col}
          onEdit={onEdit}
          onDeleteRequest={onDeleteRequest}
          onToggleFeatured={onToggleFeatured}
        />
      ))}
    </div>
  );
}

