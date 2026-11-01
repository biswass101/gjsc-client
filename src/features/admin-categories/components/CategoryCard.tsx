import React from "react";
import { Edit2, Trash2, Sparkles } from "lucide-react";
import type { AdminCategory } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DEFAULT_IMAGES } from "../constants";

interface CategoryCardProps {
  category: AdminCategory;
  onEdit: (cat: AdminCategory) => void;
  onDeleteRequest: (cat: AdminCategory) => void;
  onToggleFeatured: (cat: AdminCategory) => void;
}

export function CategoryCard({
  category,
  onEdit,
  onDeleteRequest,
  onToggleFeatured,
}: CategoryCardProps) {
  return (
    <div className="group relative flex flex-col rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200">
      {/* Image Header with Japanese Tag */}
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_IMAGES[0] || "";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

        {/* Parent category & featured pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-xs font-semibold text-[10px]"
          >
            {category.parentCategory}
          </Badge>
          {category.featured && (
            <Badge className="bg-amber-500/90 text-white border-none text-[10px] gap-1 shadow-xs">
              <Sparkles className="h-2.5 w-2.5" />
              Featured
            </Badge>
          )}
        </div>

        {/* Japanese Kanji / Hiragana Stamp */}
        {category.japaneseTitle && (
          <div className="absolute top-3 right-3 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-white tracking-widest font-mono">
            {category.japaneseTitle}
          </div>
        )}

        {/* Bottom Title Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground leading-tight">{category.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{category.tagline}</p>
          </div>
          <span className="shrink-0 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {category.itemCount} SKUs
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-4">
        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2">{category.description}</p>

        {/* Subcategories Tags */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Subcategories ({category.subcategories.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {category.subcategories.map((sub, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
              >
                {sub}
              </span>
            ))}
            {category.subcategories.length === 0 && (
              <span className="text-[11px] italic text-muted-foreground">
                No subcategories configured
              </span>
            )}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-3 border-t border-border/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Featured:</span>
            <Switch
              checked={category.featured}
              onCheckedChange={() => onToggleFeatured(category)}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(category)}
              className="h-8 gap-1.5 text-xs"
            >
              <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteRequest(category)}
              className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
