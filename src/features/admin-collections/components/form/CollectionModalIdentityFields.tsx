import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CollectionModalIdentityFieldsProps {
  title: string;
  onTitleChange: (val: string) => void;
  japaneseTitle: string;
  setJapaneseTitle: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  badgeText: string;
  setBadgeText: (val: string) => void;
  tagline: string;
  setTagline: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
}

export function CollectionModalIdentityFields({
  title,
  onTitleChange,
  japaneseTitle,
  setJapaneseTitle,
  slug,
  setSlug,
  badgeText,
  setBadgeText,
  tagline,
  setTagline,
  description,
  setDescription,
}: CollectionModalIdentityFieldsProps) {
  return (
    <>
      {/* Title & Japanese Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="col-title" className="text-xs font-semibold">
            Collection Title <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="col-title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. Glass Skin Ritual"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="col-japanese" className="text-xs font-semibold">
            Japanese Title (Kanji/Kana)
          </Label>
          <Input
            id="col-japanese"
            value={japaneseTitle}
            onChange={(e) => setJapaneseTitle(e.target.value)}
            placeholder="e.g. ガラス肌・透明感"
          />
        </div>
      </div>

      {/* Slug & Badge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="col-slug" className="text-xs font-semibold">
            URL Slug Identifier <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="col-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. glass-skin-ritual"
            required
          />
          <span className="text-[10px] text-muted-foreground">
            Storefront route: /collections/{slug || "slug"}
          </span>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="col-badge" className="text-xs font-semibold">
            Storefront Badge Text
          </Label>
          <Input
            id="col-badge"
            value={badgeText}
            onChange={(e) => setBadgeText(e.target.value)}
            placeholder="e.g. Most Popular, Seasonal Limited, Best Seller"
          />
        </div>
      </div>

      {/* Tagline */}
      <div className="space-y-1.5">
        <Label htmlFor="col-tagline" className="text-xs font-semibold">
          Collection Tagline
        </Label>
        <Input
          id="col-tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="e.g. 5-step hydration ritual for porcelain luminosity"
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="col-desc" className="text-xs font-semibold">
          Editorial Description
        </Label>
        <Textarea
          id="col-desc"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe why this curated ritual is special and how to use the products in sequence..."
        />
      </div>
    </>
  );
}

