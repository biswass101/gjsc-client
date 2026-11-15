import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Loader2, Cloud, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/lib/api";
import { DEFAULT_BANNER_PRESETS, DESTINATION_PRESETS } from "../../constants";

interface BannerModalMediaCtaFieldsProps {
  imageUrl: string;
  setImageUrl: (val: string) => void;
  mobileImageUrl: string;
  setMobileImageUrl: (val: string) => void;
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
  ctaLink,
  setCtaLink,
  order,
  setOrder,
  active,
  setActive,
}: BannerModalMediaCtaFieldsProps) {
  const [isUploadingDesktop, setIsUploadingDesktop] = useState(false);
  const [isUploadingMobile, setIsUploadingMobile] = useState(false);

  const desktopFileInputRef = useRef<HTMLInputElement | null>(null);
  const mobileFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDesktopFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    try {
      setIsUploadingDesktop(true);
      toast.info(`Uploading image...`);
      const res = await adminApi.uploadImage(file);
      if (res?.url) {
        setImageUrl(res.url);
        toast.success("Image uploaded successfully! 🌸");
      }
    } catch (err: any) {
      console.error("Desktop banner upload error:", err);
      toast.error(err?.message || "Failed to upload banner image");
    } finally {
      setIsUploadingDesktop(false);
    }
  };

  const handleMobileFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    try {
      setIsUploadingMobile(true);
      toast.info(`Uploading mobile image...`);
      const res = await adminApi.uploadImage(file);
      if (res?.url) {
        setMobileImageUrl(res.url);
        toast.success("Mobile image uploaded successfully! 📱");
      }
    } catch (err: any) {
      console.error("Mobile banner upload error:", err);
      toast.error(err?.message || "Failed to upload mobile banner image");
    } finally {
      setIsUploadingMobile(false);
    }
  };

  return (
    <>
      {/* Hidden file inputs */}
      <input
        ref={desktopFileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
        onChange={handleDesktopFileChange}
      />
      <input
        ref={mobileFileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
        onChange={handleMobileFileChange}
      />

      {/* Desktop Image URL */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="banner-desktop-img" className="text-xs font-semibold">
            Desktop Banner Image (16:9 or Widescreen) <span className="text-rose-500">*</span>
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isUploadingDesktop}
            onClick={() => desktopFileInputRef.current?.click()}
            className="text-[11px] h-7 px-2 text-primary hover:bg-primary/10 flex items-center gap-1 cursor-pointer font-medium"
          >
            {isUploadingDesktop ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-3 w-3" />
                <span>Upload Image</span>
              </>
            )}
          </Button>
        </div>
        <div className="flex gap-3 items-center">
          <Input
            id="banner-desktop-img"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image link or click Upload Image above..."
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
        <p className="text-[11px] text-muted-foreground">
          Upload an image directly or paste any public image link.
        </p>
      </div>

      {/* Mobile Image URL */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="banner-mobile-img" className="text-xs font-semibold">
            Mobile Banner Image URL (Optional - Portrait / 4:5 ratio)
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isUploadingMobile}
            onClick={() => mobileFileInputRef.current?.click()}
            className="text-[11px] h-7 px-2 text-primary hover:bg-primary/10 flex items-center gap-1 cursor-pointer font-medium"
          >
            {isUploadingMobile ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-3 w-3" />
                <span>Upload Mobile Image</span>
              </>
            )}
          </Button>
        </div>
        <div className="flex gap-3 items-center">
          <Input
            id="banner-mobile-img"
            value={mobileImageUrl}
            onChange={(e) => setMobileImageUrl(e.target.value)}
            placeholder="Paste mobile image link or upload above (optional)"
            className="flex-1"
          />
          {mobileImageUrl && (
            <div className="relative h-10 w-12 rounded-md border border-border overflow-hidden bg-muted shrink-0">
              <img
                src={mobileImageUrl}
                alt="Mobile Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Banner Click Destination Link (Optional) */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">
            Banner Click Destination (Optional)
          </Label>
          <Select
            value={
              DESTINATION_PRESETS.some((d) => d.url === ctaLink)
                ? ctaLink
                : ctaLink
                  ? "custom"
                  : ""
            }
            onValueChange={(val) => {
              if (val === "custom") return;
              setCtaLink(val);
            }}
          >
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Choose a destination page from quick-list..." />
            </SelectTrigger>
            <SelectContent>
              {DESTINATION_PRESETS.map((dest) => (
                <SelectItem key={dest.url} value={dest.url} className="text-xs">
                  {dest.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="banner-cta-link" className="text-xs font-semibold">
              Target Link URL <span className="text-muted-foreground font-normal">(Optional - Clicking banner image navigates here)</span>
            </Label>
            {ctaLink && (
              <button
                type="button"
                onClick={() => setCtaLink("")}
                className="text-[11px] text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer"
              >
                Clear Link
              </button>
            )}
          </div>
          <Input
            id="banner-cta-link"
            value={ctaLink}
            onChange={(e) => setCtaLink(e.target.value)}
            placeholder="e.g. /shop, /pre-order, /collections/bestsellers (or leave empty)"
          />
        </div>
      </div>

      {/* Display Order & Active Switch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="space-y-1.5">
          <Label htmlFor="banner-order" className="text-xs font-semibold">
            Slide Index for this Page Section (1, 2, 3...)
          </Label>
          <Input
            id="banner-order"
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            min={1}
          />
          <span className="text-[10px] text-muted-foreground">
            Independent per-page index (e.g. 1, 2, 3 for Home Hero; 1, 2 for Best Sellers)
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

