"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRODUCT_IMAGES } from "@/lib/catalog";

export interface ProductMediaTabProps {
  image: string;
  onImageChange: (val: string) => void;
  gallery: string[];
  newGalleryInput: string;
  onNewGalleryInputChange: (val: string) => void;
  onAddGalleryImage: (url?: string) => void;
  onRemoveGalleryImage: (url: string) => void;
}

export function ProductMediaTab({
  image,
  onImageChange,
  gallery,
  newGalleryInput,
  onNewGalleryInputChange,
  onAddGalleryImage,
  onRemoveGalleryImage,
}: ProductMediaTabProps) {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Primary Cover Image URL & Live Preview */}
      <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-3">
        <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">
          Primary Storefront Cover Image
        </h3>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Live Thumbnail Preview */}
          <div className="relative h-28 w-28 rounded-xl overflow-hidden border-2 border-primary/40 bg-card shadow-sm shrink-0 grid place-items-center">
            {image ? (
              <img src={image} alt="Cover Preview" className="h-full w-full object-cover" />
            ) : (
              <div className="text-muted-foreground text-[10px] text-center p-2">No Image URL</div>
            )}
            <span className="absolute bottom-1 left-1 rounded bg-primary/90 text-primary-foreground text-[9px] px-1.5 py-0.2 font-bold uppercase">
              Cover
            </span>
          </div>

          <div className="flex-1 space-y-2 w-full">
            <Label className="text-xs font-bold text-foreground">Primary Image URL</Label>
            <Input
              value={image}
              onChange={(e) => onImageChange(e.target.value)}
              placeholder="https://..."
              className="h-10 rounded-xl text-xs"
            />
            <p className="text-[11px] text-muted-foreground">
              This image will appear as the lead hero visual on the catalog grid, search results,
              and cart.
            </p>
          </div>
        </div>

        {/* Quick-Click Image Presets */}
        <div className="pt-2 border-t border-border/60">
          <span className="block text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Click to Select from Authentic Japanese Catalog Presets:
          </span>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {PRODUCT_IMAGES.slice(0, 8).map((imgUrl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onImageChange(imgUrl);
                  onAddGalleryImage(imgUrl);
                }}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 cursor-pointer ${
                  image === imgUrl
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border/70 opacity-75 hover:opacity-100"
                }`}
              >
                <img src={imgUrl} alt={`Preset ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Multi-Angle Gallery Images */}
      <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">
            Additional Multi-Angle Gallery Images
          </h3>
          <span className="text-[10px] text-muted-foreground">{gallery.length} Gallery Photos</span>
        </div>

        {/* Add Gallery URL Input */}
        <div className="flex gap-2">
          <Input
            value={newGalleryInput}
            onChange={(e) => onNewGalleryInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddGalleryImage();
              }
            }}
            placeholder="Paste additional image URL (e.g. back label, texture swatch, application shot)..."
            className="h-10 rounded-xl text-xs"
          />
          <Button
            type="button"
            size="sm"
            onClick={() => onAddGalleryImage()}
            className="rounded-xl text-xs h-10 px-4 shrink-0 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Image
          </Button>
        </div>

        {/* Gallery Thumbnails Grid */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {gallery.map((imgUrl, idx) => {
              const isCover = image === imgUrl;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-xl overflow-hidden border bg-card p-1 transition-all ${
                    isCover ? "border-primary ring-1 ring-primary/40" : "border-border/80"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Gallery ${idx + 1}`}
                    className="aspect-square w-full object-cover rounded-lg"
                  />
                  <div className="mt-1.5 flex items-center justify-between text-[10px] px-1">
                    {isCover ? (
                      <span className="text-primary font-bold">Cover Photo</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onImageChange(imgUrl)}
                        className="text-muted-foreground hover:text-primary font-medium cursor-pointer"
                      >
                        Make Cover
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onRemoveGalleryImage(imgUrl)}
                      className="text-muted-foreground hover:text-rose transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
