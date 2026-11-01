import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DEFAULT_BANNER_PRESETS } from "../../constants";

interface BannerModalMediaCtaFieldsProps {
  imageUrl: string;
  setImageUrl: (val: string) => void;
  mobileImageUrl: string;
  setMobileImageUrl: (val: string) => void;
  ctaText: string;
  setCtaText: (val: string) => void;
  ctaLink: string;
  setCtaLink: (val: string) => void;
  order: string;
  setOrder: (val: string) => void;
  active: boolean;
  setActive: (val: boolean) => void;
}

export function BannerModalMediaCtaFields({
  imageUrl,
  setImageUrl,
  mobileImageUrl,
  setMobileImageUrl,
  ctaText,
  setCtaText,
  ctaLink,
  setCtaLink,
  order,
  setOrder,
  active,
  setActive,
}: BannerModalMediaCtaFieldsProps) {
  return (
    <>
      {/* Desktop Image URL */}
      <div className="space-y-2">
        <Label htmlFor="banner-desktop-img" className="text-xs font-semibold">
          Desktop Banner Image URL (16:9 or Widescreen) <span className="text-rose-500">*</span>
        </Label>
        <div className="flex gap-3 items-center">
          <Input
            id="banner-desktop-img"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
            className="flex-1"
          />
          {imageUrl && (
            <div className="relative h-10 w-20 rounded-md border border-border overflow-hidden bg-muted shrink-0">
              <img
                src={imageUrl}
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
          <span className="text-[10px] text-muted-foreground">Presets:</span>
          {DEFAULT_BANNER_PRESETS.map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setImageUrl(preset)}
              className="text-[10px] text-primary hover:underline"
            >
              Image {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Image URL */}
      <div className="space-y-1.5">
        <Label htmlFor="banner-mobile-img" className="text-xs font-semibold">
          Mobile Banner Image URL (Optional - Portrait / 4:5 ratio)
        </Label>
        <Input
          id="banner-mobile-img"
          value={mobileImageUrl}
          onChange={(e) => setMobileImageUrl(e.target.value)}
          placeholder="https://images.unsplash.com/... (leave blank to auto-scale desktop)"
        />
      </div>

      {/* CTA Button Text & Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="banner-cta-text" className="text-xs font-semibold">
            CTA Button Label
          </Label>
          <Input
            id="banner-cta-text"
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            placeholder="e.g. Shop Now, View Pre-Orders"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="banner-cta-link" className="text-xs font-semibold">
            CTA Destination URL
          </Label>
          <Input
            id="banner-cta-link"
            value={ctaLink}
            onChange={(e) => setCtaLink(e.target.value)}
            placeholder="e.g. /shop, /pre-order, /collections"
          />
        </div>
      </div>

      {/* Display Order & Active Switch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="space-y-1.5">
          <Label htmlFor="banner-order" className="text-xs font-semibold">
            Display Order Index
          </Label>
          <Input
            id="banner-order"
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            min={1}
          />
          <span className="text-[10px] text-muted-foreground">
            Lower number displays first in carousels
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div>
            <Label htmlFor="banner-active" className="text-xs font-semibold">
              Live on Storefront
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Enable to immediately publish banner
            </p>
          </div>
          <Switch id="banner-active" checked={active} onCheckedChange={setActive} />
        </div>
      </div>
    </>
  );
}
