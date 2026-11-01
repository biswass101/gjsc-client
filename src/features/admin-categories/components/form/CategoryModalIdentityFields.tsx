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

interface CategoryModalIdentityFieldsProps {
  title: string;
  onTitleChange: (val: string) => void;
  japaneseTitle: string;
  setJapaneseTitle: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  parentCategory: string;
  setParentCategory: (val: string) => void;
  tagline: string;
  setTagline: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
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
  tagline,
  setTagline,
  description,
  setDescription,
}: CategoryModalIdentityFieldsProps) {
  return (
    <>
      {/* Category Name & Japanese Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="cat-title" className="text-xs font-semibold">
            Category Title <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="cat-title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. Cleansers & Washes"
            required
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
            placeholder="e.g. 洗顔・クレンジング"
          />
        </div>
      </div>

      {/* Slug & Parent Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="cat-slug" className="text-xs font-semibold">
            URL Slug Identifier <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="cat-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. cleansers-washes"
            required
          />
          <span className="text-[10px] text-muted-foreground">
            Storefront route: /categories/{slug || "slug"}
          </span>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cat-parent" className="text-xs font-semibold">
            Parent Group
          </Label>
          <Select value={parentCategory} onValueChange={setParentCategory}>
            <SelectTrigger id="cat-parent">
              <SelectValue placeholder="Select parent category" />
            </SelectTrigger>
            <SelectContent>
              {PARENT_CATEGORIES.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          placeholder="e.g. Double cleansing rituals for ultra-pure Japanese glass skin"
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="cat-desc" className="text-xs font-semibold">
          Detailed Description (SEO & Storefront Header)
        </Label>
        <Textarea
          id="cat-desc"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Explain the skin benefits, Japanese formulations, and usage advice..."
        />
      </div>
    </>
  );
}

