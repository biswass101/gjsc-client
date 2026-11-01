import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORIGIN_CITIES, BRAND_CATEGORIES } from "../../constants";

interface BrandModalIdentityFieldsProps {
  name: string;
  onNameChange: (val: string) => void;
  kanji: string;
  setKanji: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  origin: string;
  setOrigin: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  established: string;
  setEstablished: (val: string) => void;
}

export function BrandModalIdentityFields({
  name,
  onNameChange,
  kanji,
  setKanji,
  slug,
  setSlug,
  origin,
  setOrigin,
  category,
  setCategory,
  established,
  setEstablished,
}: BrandModalIdentityFieldsProps) {
  return (
    <>
      {/* Brand Name & Kanji */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="brand-name" className="text-xs font-semibold">
            Brand Name <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="brand-name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. Shiseido, Hada Labo, Rohto"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="brand-kanji" className="text-xs font-semibold">
            Japanese Kanji / Kana
          </Label>
          <Input
            id="brand-kanji"
            value={kanji}
            onChange={(e) => setKanji(e.target.value)}
            placeholder="e.g. 資生堂, 肌ラボ"
          />
        </div>
      </div>

      {/* Slug & Origin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="brand-slug" className="text-xs font-semibold">
            URL Slug Identifier <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="brand-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. shiseido"
            required
          />
          <span className="text-[10px] text-muted-foreground">
            Storefront route: /brands/{slug || "slug"}
          </span>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="brand-origin" className="text-xs font-semibold">
            City / Prefecture of Origin
          </Label>
          <Select value={origin} onValueChange={setOrigin}>
            <SelectTrigger id="brand-origin">
              <SelectValue placeholder="Select origin" />
            </SelectTrigger>
            <SelectContent>
              {ORIGIN_CITIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category & Established Year */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="brand-cat" className="text-xs font-semibold">
            Primary Brand Category
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="brand-cat">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {BRAND_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="brand-est" className="text-xs font-semibold">
            Year Established
          </Label>
          <Input
            id="brand-est"
            value={established}
            onChange={(e) => setEstablished(e.target.value)}
            placeholder="e.g. 1872 or 2004"
          />
        </div>
      </div>
    </>
  );
}

