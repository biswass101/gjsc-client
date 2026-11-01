import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { THEME_COLORS } from "../../constants";

interface CollectionModalColorBannerFieldsProps {
  themeColor: string;
  setThemeColor: (val: string) => void;
  bannerImage: string;
  setBannerImage: (val: string) => void;
}

export function CollectionModalColorBannerFields({
  themeColor,
  setThemeColor,
  bannerImage,
  setBannerImage,
}: CollectionModalColorBannerFieldsProps) {
  return (
    <>
      {/* Theme Color Selector */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold flex items-center justify-between">
          <span>Theme Accent Color</span>
          <span className="font-mono text-xs">{themeColor}</span>
        </Label>
        <div className="flex items-center gap-2 flex-wrap">
          {THEME_COLORS.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => setThemeColor(c.hex)}
              className={`h-8 px-3 rounded-lg flex items-center gap-2 text-xs font-medium border transition-all ${
                themeColor === c.hex
                  ? "ring-2 ring-primary ring-offset-2 border-transparent text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className="h-3.5 w-3.5 rounded-full shrink-0 shadow-2xs"
                style={{ backgroundColor: c.hex }}
              />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Banner Image URL */}
      <div className="space-y-2">
        <Label htmlFor="col-banner" className="text-xs font-semibold">
          Banner Image URL <span className="text-rose-500">*</span>
        </Label>
        <div className="flex gap-3 items-center">
          <Input
            id="col-banner"
            value={bannerImage}
            onChange={(e) => setBannerImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
            className="flex-1"
          />
          {bannerImage && (
            <div className="relative h-10 w-16 rounded-md border border-border overflow-hidden bg-muted shrink-0">
              <img
                src={bannerImage}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

