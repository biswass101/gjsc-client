import React from "react";
import { Image as ImageIcon, Plus } from "lucide-react";
import { AdminBanner } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { BannerCard } from "./BannerCard";

interface BannersGridProps {
  banners: AdminBanner[];
  onOpenCreate: () => void;
  onEdit: (banner: AdminBanner) => void;
  onDelete: (banner: AdminBanner) => void;
  onToggleActive: (banner: AdminBanner) => void;
}

export function BannersGrid({
  banners,
  onOpenCreate,
  onEdit,
  onDelete,
  onToggleActive,
}: BannersGridProps) {
  if (banners.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
        <h3 className="font-bold text-foreground text-lg">No Banners Found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
          Create promotional banners for your storefront pages to guide customer conversion.
        </p>
        <Button onClick={onOpenCreate} className="mt-4 gap-2">
          <Plus className="h-4 w-4" />
          <span>Create Promotional Banner</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {banners.map((banner) => (
        <BannerCard
          key={banner.id}
          banner={banner}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}

