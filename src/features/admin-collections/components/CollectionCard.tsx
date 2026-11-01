import React from "react";
import { Edit2, Trash2, Sparkles } from "lucide-react";
import type { AdminCollection } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DEFAULT_BANNERS } from "../constants";

interface CollectionCardProps {
  collection: AdminCollection;
  onEdit: (col: AdminCollection) => void;
  onDeleteRequest: (col: AdminCollection) => void;
  onToggleFeatured: (col: AdminCollection) => void;
}

export function CollectionCard({
  collection: col,
  onEdit,
  onDeleteRequest,
  onToggleFeatured,
}: CollectionCardProps) {
  return (
    <div className="group relative flex flex-col rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200">
      {/* Color Accent Bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: col.themeColor || "#e11d48" }} />

      {/* Banner Image */}
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        <img
          src={col.bannerImage}
          alt={col.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_BANNERS[0] || "";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Badge Pills */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          {col.badgeText && (
            <Badge
              style={{ backgroundColor: col.themeColor || "#e11d48" }}
              className="text-white border-none text-[10px] font-bold shadow-xs"
            >
              {col.badgeText}
            </Badge>
          )}
          {col.featured && (
            <Badge className="bg-amber-500/90 text-white border-none text-[10px] gap-1 shadow-xs">
              <Sparkles className="h-2.5 w-2.5" />
              Featured
            </Badge>
          )}
        </div>

        {/* Japanese Kanji Tag */}
        {col.japaneseTitle && (
          <div className="absolute top-3 right-3 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-white tracking-widest font-mono">
            {col.japaneseTitle}
          </div>
        )}

        {/* Title & Items */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground leading-tight">{col.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{col.tagline}</p>
          </div>
          <span className="shrink-0 text-xs font-semibold bg-background/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-border">
            {col.itemCount} Items
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-4">
        <p className="text-xs text-muted-foreground line-clamp-2">{col.description}</p>

        {/* Search Keywords */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Associated Keywords ({col.frequentlySearched.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {col.frequentlySearched.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
              >
                #{tag}
              </span>
            ))}
            {col.frequentlySearched.length === 0 && (
              <span className="text-[11px] italic text-muted-foreground">
                No search tags attached
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Featured:</span>
            <Switch checked={col.featured} onCheckedChange={() => onToggleFeatured(col)} />
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(col)}
              className="h-8 gap-1.5 text-xs"
            >
              <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteRequest(col)}
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
