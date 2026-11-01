"use client";

import { Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BRANDS, CATEGORIES } from "@/lib/catalog";
import type { AdminProduct } from "@/context/admin-context";
import { JAPAN_REGIONS } from "../../data/productConstants";

export interface ProductIdentityTabProps {
  name: string;
  onNameChange: (val: string) => void;
  japaneseName: string;
  onJapaneseNameChange: (val: string) => void;
  brand: string;
  onBrandChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  productType: "in-stock" | "pre-order-japan" | "shein";
  onProductTypeChange: (val: "in-stock" | "pre-order-japan" | "shein") => void;
  origin: string;
  onOriginChange: (val: string) => void;
  badge: AdminProduct["badge"] | "";
  onBadgeChange: (val: AdminProduct["badge"] | "") => void;
  status: AdminProduct["status"];
  onStatusChange: (val: AdminProduct["status"]) => void;
}

export function ProductIdentityTab({
  name,
  onNameChange,
  japaneseName,
  onJapaneseNameChange,
  brand,
  onBrandChange,
  category,
  onCategoryChange,
  productType,
  onProductTypeChange,
  origin,
  onOriginChange,
  badge,
  onBadgeChange,
  status,
  onStatusChange,
}: ProductIdentityTabProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Product Title */}
      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold text-foreground">
            Product Title (English / International) <span className="text-rose-500">*</span>
          </Label>
          <span className="text-[10px] text-muted-foreground">Primary Storefront Name</span>
        </div>
        <Input
          required
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="e.g. Hada Labo Gokujyun Premium Hyaluronic Acid Lotion"
          className="mt-1.5 h-10 rounded-xl text-xs font-medium"
        />
      </div>

      {/* Japanese Name */}
      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <span className="font-jp">日本語名</span> Native Japanese Formulation Name
            <span className="rounded-full bg-primary/10 text-primary px-1.5 py-0.2 text-[9px] font-semibold">
              J-Beauty Authentic
            </span>
          </Label>
          <span className="text-[10px] text-muted-foreground">Kanji / Katakana verification</span>
        </div>
        <Input
          value={japaneseName}
          onChange={(e) => onJapaneseNameChange(e.target.value)}
          placeholder="e.g. 肌ラボ 極潤プレミアム ヒアルロン液 170mL"
          className="mt-1.5 h-10 rounded-xl text-xs font-jp"
        />
      </div>

      {/* Brand & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs font-bold text-foreground">Japanese Brand</Label>
          <select
            value={brand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium focus:ring-1 focus:ring-primary"
          >
            {BRANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label className="text-xs font-bold text-foreground">Skincare Category</Label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium focus:ring-1 focus:ring-primary"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sourcing Channel / Supply Chain */}
      <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-2.5">
        <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5 text-primary" />
          Distribution & Supply Chain Channel
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => onProductTypeChange("in-stock")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              productType === "in-stock"
                ? "border-primary bg-primary/10 shadow-xs"
                : "border-border/70 bg-card hover:bg-secondary/30"
            }`}
          >
            <span className="block font-semibold text-xs text-foreground">
              📦 Local Hub In-Stock
            </span>
            <span className="block text-[10.5px] text-muted-foreground mt-0.5">
              Ready in Dhaka warehouse. Same-day / 24h dispatch.
            </span>
          </button>

          <button
            type="button"
            onClick={() => onProductTypeChange("pre-order-japan")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              productType === "pre-order-japan"
                ? "border-primary bg-primary/10 shadow-xs"
                : "border-border/70 bg-card hover:bg-secondary/30"
            }`}
          >
            <span className="block font-semibold text-xs text-foreground">
              ✈️ Tokyo Direct Air-Freight
            </span>
            <span className="block text-[10.5px] text-muted-foreground mt-0.5">
              Fresh Tokyo batch pre-order. 7–10 days delivery.
            </span>
          </button>

          <button
            type="button"
            onClick={() => onProductTypeChange("shein")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              productType === "shein"
                ? "border-primary bg-primary/10 shadow-xs"
                : "border-border/70 bg-card hover:bg-secondary/30"
            }`}
          >
            <span className="block font-semibold text-xs text-foreground">
              🌸 Lifestyle & Accessories
            </span>
            <span className="block text-[10.5px] text-muted-foreground mt-0.5">
              Curated accessories, beauty tools, and lifestyle goods.
            </span>
          </button>
        </div>
      </div>

      {/* Japanese Provenance & Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-xs font-bold text-foreground">Japanese Origin</Label>
          <select
            value={origin}
            onChange={(e) => onOriginChange(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            {JAPAN_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label className="text-xs font-bold text-foreground">Merchandising Badge</Label>
          <select
            value={badge || ""}
            onChange={(e) => onBadgeChange(e.target.value as AdminProduct["badge"] | "")}
            className="mt-1.5 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="">No Special Badge</option>
            <option value="Best Seller">Best Seller</option>
            <option value="Flash Sale">Flash Sale</option>
            <option value="Trending">Trending</option>
            <option value="New">New Arrival</option>
            <option value="Exclusive">Tokyo Exclusive</option>
          </select>
        </div>

        <div>
          <Label className="text-xs font-bold text-foreground">Catalog Visibility</Label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as AdminProduct["status"])}
            className="mt-1.5 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="active">Active (Visible on Storefront)</option>
            <option value="draft">Draft (Hidden in Admin Only)</option>
            <option value="archived">Archived (Discontinued)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
