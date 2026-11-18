import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PARENT_CATEGORIES } from "../../constants";

export const CATEGORY_ICONS = [
  "Sparkles",
  "Zap",
  "Sunrise",
  "Layers",
  "Beaker",
  "Droplets",
  "Smile",
  "Palette",
  "Eye",
  "Leaf",
  "Wind",
  "Shield",
  "Package",
  "Scissors",
  "Gift",
  "ShoppingBag",
] as const;

interface CategoryModalIdentityFieldsProps {
  title: string;
  onTitleChange: (val: string) => void;
  japaneseTitle: string;
  setJapaneseTitle: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  parentCategory: string;
  setParentCategory: (val: string) => void;
  icon: string;
  setIcon: (val: string) => void;
  ritualStepNumber: string;
  setRitualStepNumber: (val: string) => void;
  ritualStepLabel: string;
  setRitualStepLabel: (val: string) => void;
  tagline: string;
  setTagline: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  metaDescription: string;
  setMetaDescription: (val: string) => void;
}

export function CategoryModalIdentityFields({
  title,
  onTitleChange,
  japaneseTitle,
  setJapaneseTitle,
  slug,
  setSlug,
  parentCategory,
  setParentCategory,
  icon,
  setIcon,
  ritualStepNumber,
  setRitualStepNumber,
  ritualStepLabel,
  setRitualStepLabel,
  tagline,
  setTagline,
  description,
  setDescription,
  metaDescription,
  setMetaDescription,
}: CategoryModalIdentityFieldsProps) {
  return (
    <div className="space-y-3.5">
      {/* Category Name & Japanese Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <Label htmlFor="cat-title" className="text-xs font-semibold">
            Category Title <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="cat-title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. Cleanser & Double Cleanse"
            required
            className="text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cat-japanese" className="text-xs font-semibold">
            Japanese Title (Kanji/Kana)
          </Label>
          <Input
            id="cat-japanese"
            value={japaneseTitle}
            onChange={(e) => setJapaneseTitle(e.target.value)}
            placeholder="e.g. クレンジング · Pure Botanicals"
            className="text-xs font-mono"
          />
        </div>
      </div>

      {/* Slug & Parent Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <Label htmlFor="cat-slug" className="text-xs font-semibold">
            URL Slug Identifier <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="cat-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. cleanser"
            required
            className="text-xs"
          />
          <span className="text-[10px] text-muted-foreground">
            Storefront route: <code className="text-primary">/category/{slug || "slug"}</code>
          </span>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cat-parent" className="text-xs font-semibold">
            Parent Department
          </Label>
          <Select value={parentCategory} onValueChange={setParentCategory}>
            <SelectTrigger id="cat-parent" className="text-xs">
              <SelectValue placeholder="Select parent category" />
            </SelectTrigger>
            <SelectContent>
              {PARENT_CATEGORIES.map((p) => (
                <SelectItem key={p} value={p} className="text-xs">
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Icon & Ritual Step */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="cat-icon" className="text-xs font-semibold">
            Category Icon
          </Label>
          <Select value={icon || "Sparkles"} onValueChange={setIcon}>
            <SelectTrigger id="cat-icon" className="text-xs">
              <SelectValue placeholder="Select Icon" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_ICONS.map((ic) => (
                <SelectItem key={ic} value={ic} className="text-xs">
                  {ic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cat-step-no" className="text-xs font-semibold">
            J-Beauty Step (optional)
          </Label>
          <Input
            id="cat-step-no"
            value={ritualStepNumber}
            onChange={(e) => setRitualStepNumber(e.target.value)}
            placeholder="e.g. Step 01"
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cat-step-lbl" className="text-xs font-semibold">
            Ritual Step Label
          </Label>
          <Input
            id="cat-step-lbl"
            value={ritualStepLabel}
            onChange={(e) => setRitualStepLabel(e.target.value)}
            placeholder="e.g. Oil Cleanse"
            className="text-xs"
          />
        </div>
      </div>

      {/* Tagline */}
      <div className="space-y-1.5">
        <Label htmlFor="cat-tagline" className="text-xs font-semibold">
          Storefront Tagline
        </Label>
        <Input
          id="cat-tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="e.g. Melts away waterproof makeup and SPF without stripping natural lipids"
          className="text-xs"
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="cat-desc" className="text-xs font-semibold">
          Editorial Description (Storefront Header)
        </Label>
        <Textarea
          id="cat-desc"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Explain the skin benefits, Japanese formulations, and botanical wisdom..."
          className="text-xs"
        />
      </div>

      {/* Meta Description for SEO */}
      <div className="space-y-1.5">
        <Label htmlFor="cat-meta-desc" className="text-xs font-semibold">
          SEO Meta Description
        </Label>
        <Input
          id="cat-meta-desc"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="e.g. Buy authentic Japanese cleansers in Bangladesh with Cash on Delivery..."
          className="text-xs"
        />
      </div>
    </div>
  );
}
