"use client";

import { ShoppingBag, ArrowUpDown, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatBDT } from "@/lib/utils";
import type { AdminProduct } from "@/context/admin-context";
import { THUMBNAIL_PRESETS } from "../../data/videoConstants";

interface VideoModalProductFieldsProps {
  products: AdminProduct[];
  selectedProductSlug: string;
  onSelectProduct: (slug: string) => void;
  productName: string;
  setProductName: (v: string) => void;
  productBrand: string;
  setProductBrand: (v: string) => void;
  productPrice: string;
  setProductPrice: (v: string) => void;
  productCompareAt: string;
  setProductCompareAt: (v: string) => void;
  active: boolean;
  setActive: (v: boolean) => void;
  featured: boolean;
  setFeatured: (v: boolean) => void;
  order: string;
  setOrder: (v: string) => void;
  thumbnail: string;
  creatorName: string;
  title: string;
}

export function VideoModalProductFields({
  products,
  selectedProductSlug,
  onSelectProduct,
  productName,
  setProductName,
  productBrand,
  setProductBrand,
  productPrice,
  setProductPrice,
  productCompareAt,
  setProductCompareAt,
  active,
  setActive,
  featured,
  setFeatured,
  order,
  setOrder,
  thumbnail,
  creatorName,
  title,
}: VideoModalProductFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Product Tagging Card */}
      <div className="p-3 rounded-lg border border-border/80 bg-muted/20 space-y-3">
        <h4 className="font-semibold text-xs text-foreground flex items-center gap-1.5">
          <ShoppingBag className="h-3.5 w-3.5 text-primary" />
          <span>Tagged Shoppable Product</span>
        </h4>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Select Store Product (Auto-fills details)</Label>
          <Select value={selectedProductSlug} onValueChange={onSelectProduct}>
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Pick a product..." />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {products.map((p) => (
                <SelectItem key={p.slug} value={p.slug} className="text-xs">
                  {p.name} ({formatBDT(p.price)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="vid-pname" className="text-xs font-medium">
              Product Title
            </Label>
            <Input
              id="vid-pname"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product Name"
              className="text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vid-pbrand" className="text-xs font-medium">
              Brand
            </Label>
            <Input
              id="vid-pbrand"
              value={productBrand}
              onChange={(e) => setProductBrand(e.target.value)}
              placeholder="Glorious Japan"
              className="text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="vid-pprice" className="text-xs font-medium">
              Price (BDT) *
            </Label>
            <Input
              id="vid-pprice"
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="4850"
              className="text-xs"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vid-pcompare" className="text-xs font-medium">
              Compare Price (Optional)
            </Label>
            <Input
              id="vid-pcompare"
              type="number"
              value={productCompareAt}
              onChange={(e) => setProductCompareAt(e.target.value)}
              placeholder="5900"
              className="text-xs"
            />
          </div>
        </div>
      </div>

      {/* Publishing & Ordering */}
      <div className="p-3 rounded-lg border border-border/80 bg-muted/20 space-y-3">
        <h4 className="font-semibold text-xs text-foreground flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-primary" />
          <span>Publishing & Carousel Sequence</span>
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-2 rounded-lg bg-card border border-border">
            <Label className="text-xs cursor-pointer">Live on Storefront</Label>
            <Switch checked={active} onCheckedChange={setActive} />
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-card border border-border">
            <Label className="text-xs cursor-pointer">Featured Badge</Label>
            <Switch checked={featured} onCheckedChange={setFeatured} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="vid-order" className="text-xs font-medium">
            Carousel Position (1 = First Video in flow)
          </Label>
          <Input
            id="vid-order"
            type="number"
            min="1"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="text-xs"
          />
        </div>
      </div>

      {/* Real-time Preview Pill */}
      <div className="rounded-xl border border-border p-3 bg-card shadow-2xs space-y-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
          Card Preview (How customers see this reel)
        </span>
        <div className="flex items-center gap-3 p-2 rounded-lg bg-black/90 text-white">
          <img
            src={thumbnail || THUMBNAIL_PRESETS[0]?.url}
            alt="Thumbnail preview"
            className="h-14 w-10 object-cover rounded bg-muted shrink-0"
          />
          <div className="truncate flex-1">
            <p className="text-[10px] text-primary font-semibold flex items-center gap-1">
              <span>{creatorName || "Creator Name"}</span>
              <CheckCircle2 className="h-2.5 w-2.5" />
            </p>
            <p className="text-xs font-bold text-white truncate">{title || "Reel Title Preview"}</p>
            <p className="text-[10px] text-white/70 truncate">
              {productName || "Tagged Product"} · ৳{productPrice || "0"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
