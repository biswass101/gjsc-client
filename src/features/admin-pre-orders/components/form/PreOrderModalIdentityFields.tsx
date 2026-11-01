import React from "react";
import type { AdminBrand } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreOrderModalIdentityFieldsProps {
  productName: string;
  setProductName: (val: string) => void;
  japaneseName: string;
  setJapaneseName: (val: string) => void;
  brand: string;
  setBrand: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  brands: AdminBrand[];
}

export function PreOrderModalIdentityFields({
  productName,
  setProductName,
  japaneseName,
  setJapaneseName,
  brand,
  setBrand,
  category,
  setCategory,
  brands,
}: PreOrderModalIdentityFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="po-name" className="text-xs font-semibold">
            Product Title <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="po-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g. SK-II Facial Treatment Essence Limited Tokyo Edition"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="po-japanese" className="text-xs font-semibold">
            Japanese Name (Kanji/Kana)
          </Label>
          <Input
            id="po-japanese"
            value={japaneseName}
            onChange={(e) => setJapaneseName(e.target.value)}
            placeholder="e.g. フェイシャルトリートメントエッセンス"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="po-brand" className="text-xs font-semibold">
            Brand Partner
          </Label>
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger id="po-brand">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((b) => (
                <SelectItem key={b.name} value={b.name}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="po-cat" className="text-xs font-semibold">
            Skincare Category
          </Label>
          <Input
            id="po-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Prestige Essence, Sunscreen"
          />
        </div>
      </div>
    </>
  );
}

