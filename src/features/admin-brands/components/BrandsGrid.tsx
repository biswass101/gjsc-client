import React from "react";
import { Award, Plus } from "lucide-react";
import { AdminBrand } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { BrandCard } from "./BrandCard";

interface BrandsGridProps {
  brands: AdminBrand[];
  onOpenCreate: () => void;
  onEdit: (brand: AdminBrand) => void;
  onDelete: (brand: AdminBrand) => void;
  onToggleFeatured: (brand: AdminBrand) => void;
}

export function BrandsGrid({
  brands,
  onOpenCreate,
  onEdit,
  onDelete,
  onToggleFeatured,
}: BrandsGridProps) {
  if (brands.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
        <Award className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
        <h3 className="font-bold text-foreground text-lg">No Brands Found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
          Try adjusting your search query or add a new Japanese cosmetic brand.
        </p>
        <Button onClick={onOpenCreate} className="mt-4 gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Brand Profile</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {brands.map((brand) => (
        <BrandCard
          key={brand.id}
          brand={brand}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFeatured={onToggleFeatured}
        />
      ))}
    </div>
  );
}

