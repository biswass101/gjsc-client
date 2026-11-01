import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DEFAULT_IMAGES } from "../../constants";

interface CategoryModalMediaFieldsProps {
  image: string;
  setImage: (val: string) => void;
  featured: boolean;
  setFeatured: (val: boolean) => void;
  itemCount: string;
  setItemCount: (val: string) => void;
}

export function CategoryModalMediaFields({
  image,
  setImage,
  featured,
  setFeatured,
  itemCount,
  setItemCount,
}: CategoryModalMediaFieldsProps) {
  return (
    <>
      {/* Image URL & Live Preview */}
      <div className="space-y-2">
        <Label htmlFor="cat-img" className="text-xs font-semibold">
          Category Card Image URL <span className="text-rose-500">*</span>
        </Label>
        <div className="flex gap-3 items-center">
          <Input
            id="cat-img"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
            className="flex-1"
          />
          {image && (
            <div className="relative h-10 w-14 rounded-md border border-border overflow-hidden bg-muted shrink-0">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                }}
              />
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <span className="text-[10px] text-muted-foreground">Quick Presets:</span>
          {DEFAULT_IMAGES.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setImage(img)}
              className="text-[10px] text-primary hover:underline"
            >
              Preset {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Options: Featured & Stock count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div>
            <Label htmlFor="cat-feat" className="text-xs font-semibold">
              Featured Category
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Display prominently in homepage grid
            </p>
          </div>
          <Switch id="cat-feat" checked={featured} onCheckedChange={setFeatured} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cat-count" className="text-xs font-semibold">
            Product Count
          </Label>
          <Input
            id="cat-count"
            type="number"
            value={itemCount}
            onChange={(e) => setItemCount(e.target.value)}
            min={0}
          />
        </div>
      </div>
    </>
  );
}
