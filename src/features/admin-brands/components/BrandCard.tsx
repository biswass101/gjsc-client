import React from "react";
import { Sparkles, MapPin, Calendar, Edit2, Trash2 } from "lucide-react";
import { AdminBrand } from "@/context/admin-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface BrandCardProps {
  brand: AdminBrand;
  onEdit: (brand: AdminBrand) => void;
  onDelete: (brand: AdminBrand) => void;
  onToggleFeatured: (brand: AdminBrand) => void;
}

export function BrandCard({ brand, onEdit, onDelete, onToggleFeatured }: BrandCardProps) {
  return (
    <div className="group relative flex flex-col rounded-xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200">
      {/* Header with Logo and Kanji */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 rounded-xl border border-border/80 overflow-hidden bg-muted p-1 shrink-0 shadow-2xs">
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-full h-full object-contain p-1"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80";
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-foreground">{brand.name}</h3>
              {brand.featured && (
                <span title="Featured Brand" className="text-amber-500">
                  <Sparkles className="h-3.5 w-3.5 fill-amber-500" />
                </span>
              )}
            </div>
            {brand.kanji && (
              <span className="font-mono text-xs font-semibold text-muted-foreground tracking-wider">
                {brand.kanji}
              </span>
            )}
          </div>
        </div>

        <Badge variant="outline" className="text-[11px] font-semibold bg-muted/50 shrink-0">
          {brand.itemCount} SKUs
        </Badge>
      </div>

      {/* Origin & Est info pills */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-4 pt-3 border-t border-border/60">
        <div className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="truncate">{brand.origin}</span>
        </div>
        {brand.established && (
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span>Est. {brand.established}</span>
          </div>
        )}
      </div>

      {/* Tagline & Description */}
      <div className="my-3 space-y-1 flex-1">
        <p className="text-xs font-semibold text-primary line-clamp-1">{brand.tagline}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">{brand.description}</p>
      </div>

      {/* Category tag */}
      <div className="mb-4">
        <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
          {brand.category}
        </span>
      </div>

      {/* Footer with Featured toggle & Action Buttons */}
      <div className="pt-3 border-t border-border/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Featured:</span>
          <Switch checked={brand.featured} onCheckedChange={() => onToggleFeatured(brand)} />
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(brand)}
            className="h-8 gap-1.5 text-xs"
          >
            <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Edit</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(brand)}
            className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
