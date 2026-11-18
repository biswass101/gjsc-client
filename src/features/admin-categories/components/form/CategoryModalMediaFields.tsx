import React, { useRef } from "react";
import { Upload, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { resolveBannerImageUrl, handleBannerImageError } from "@/features/admin-banners";

interface CategoryModalMediaFieldsProps {
  image: string;
  setImage: (val: string) => void;
  bannerImage: string;
  setBannerImage: (val: string) => void;
  onUploadImage?: ((file: File) => void) | undefined;
  onUploadBanner?: ((file: File) => void) | undefined;
  isUploadingImage?: boolean | undefined;
  isUploadingBanner?: boolean | undefined;
  featured: boolean;
  setFeatured: (val: boolean) => void;
  itemCount: string;
  setItemCount: (val: string) => void;
}

export function CategoryModalMediaFields({
  image,
  setImage,
  bannerImage,
  setBannerImage,
  onUploadImage,
  onUploadBanner,
  isUploadingImage = false,
  isUploadingBanner = false,
  featured,
  setFeatured,
  itemCount,
  setItemCount,
}: CategoryModalMediaFieldsProps) {
  const cardFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  const handleCardFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadImage) {
      onUploadImage(file);
    }
  };

  const handleBannerFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadBanner) {
      onUploadBanner(file);
    }
  };

  return (
    <div className="space-y-4 pt-1">
      {/* 1. Category Card Image */}
      <div className="space-y-1.5">
        <Label htmlFor="cat-img" className="text-xs font-semibold flex items-center justify-between">
          <span>Card Image (Cloudinary CDN) <span className="text-rose-500">*</span></span>
          {image.startsWith("https://res.cloudinary.com/") && (
            <span className="text-[10px] text-emerald-600 font-medium">✓ Cloudinary Synced</span>
          )}
        </Label>
        <div className="flex gap-2.5 items-center">
          <Input
            id="cat-img"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
            required
            className="flex-1 text-xs"
          />
          <input
            type="file"
            ref={cardFileInputRef}
            onChange={handleCardFileSelect}
            accept="image/*"
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploadingImage}
            onClick={() => cardFileInputRef.current?.click()}
            className="shrink-0 text-xs gap-1.5"
          >
            {isUploadingImage ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5 text-primary" />
                <span>Upload</span>
              </>
            )}
          </Button>
          {image && (
            <div className="relative h-10 w-14 rounded-md border border-border overflow-hidden bg-muted shrink-0 shadow-2xs">
              <img
                src={resolveBannerImageUrl(image)}
                alt="Preview"
                onError={handleBannerImageError}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. Category Hero Banner Image */}
      <div className="space-y-1.5">
        <Label htmlFor="cat-banner" className="text-xs font-semibold flex items-center justify-between">
          <span>Category Hero Banner (Cloudinary Header)</span>
          {bannerImage.startsWith("https://res.cloudinary.com/") && (
            <span className="text-[10px] text-emerald-600 font-medium">✓ Cloudinary Synced</span>
          )}
        </Label>
        <div className="flex gap-2.5 items-center">
          <Input
            id="cat-banner"
            value={bannerImage}
            onChange={(e) => setBannerImage(e.target.value)}
            placeholder="https://res.cloudinary.com/... (optional category header)"
            className="flex-1 text-xs"
          />
          <input
            type="file"
            ref={bannerFileInputRef}
            onChange={handleBannerFileSelect}
            accept="image/*"
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploadingBanner}
            onClick={() => bannerFileInputRef.current?.click()}
            className="shrink-0 text-xs gap-1.5"
          >
            {isUploadingBanner ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5 text-primary" />
                <span>Upload</span>
              </>
            )}
          </Button>
          {bannerImage && (
            <div className="relative h-10 w-16 rounded-md border border-border overflow-hidden bg-muted shrink-0 shadow-2xs">
              <img
                src={resolveBannerImageUrl(bannerImage)}
                alt="Banner Preview"
                onError={handleBannerImageError}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* 3. Options: Featured & Product count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/20 p-3">
          <div>
            <Label htmlFor="cat-feat" className="text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Featured Category
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Display prominently in storefront directory and navigation
            </p>
          </div>
          <Switch id="cat-feat" checked={featured} onCheckedChange={setFeatured} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cat-count" className="text-xs font-semibold">
            Catalog Products Count
          </Label>
          <Input
            id="cat-count"
            type="number"
            value={itemCount}
            onChange={(e) => setItemCount(e.target.value)}
            min={0}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  );
}
