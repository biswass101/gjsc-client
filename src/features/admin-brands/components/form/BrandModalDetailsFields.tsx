import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface BrandModalDetailsFieldsProps {
  tagline: string;
  setTagline: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  logo: string;
  setLogo: (val: string) => void;
  featured: boolean;
  setFeatured: (val: boolean) => void;
  itemCount: string;
  setItemCount: (val: string) => void;
}

export function BrandModalDetailsFields({
  tagline,
  setTagline,
  description,
  setDescription,
  logo,
  setLogo,
  featured,
  setFeatured,
  itemCount,
  setItemCount,
}: BrandModalDetailsFieldsProps) {
  return (
    <>
      {/* Tagline */}
      <div className="space-y-1.5">
        <Label htmlFor="brand-tagline" className="text-xs font-semibold">
          Official Brand Motto / Tagline
        </Label>
        <Input
          id="brand-tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="e.g. 150 Years of Ginza Tokyo Skincare Excellence"
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="brand-desc" className="text-xs font-semibold">
          Brand Heritage & Description
        </Label>
        <Textarea
          id="brand-desc"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the company's patent formulations, active ingredients, and dermatological standards..."
        />
      </div>

      {/* Logo URL & Live Preview */}
      <div className="space-y-2">
        <Label htmlFor="brand-logo" className="text-xs font-semibold">
          Brand Logo Image URL <span className="text-rose-500">*</span>
        </Label>
        <div className="flex gap-3 items-center">
          <Input
            id="brand-logo"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
            className="flex-1"
          />
          {logo && (
            <div className="relative h-10 w-14 rounded-md border border-border overflow-hidden bg-muted shrink-0">
              <img
                src={logo}
                alt="Preview"
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Options: Featured & Stock count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div>
            <Label htmlFor="brand-feat" className="text-xs font-semibold">
              Featured Brand
            </Label>
            <p className="text-[11px] text-muted-foreground">Feature on storefront brand strip</p>
          </div>
          <Switch id="brand-feat" checked={featured} onCheckedChange={setFeatured} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="brand-count" className="text-xs font-semibold">
            Product Catalog Count
          </Label>
          <Input
            id="brand-count"
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
