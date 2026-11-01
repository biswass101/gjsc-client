import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminBanner } from "@/context/admin-context";
import { PAGE_KEYS } from "../../constants";

interface BannerModalIdentityFieldsProps {
  pageKey: AdminBanner["pageKey"];
  setPageKey: (val: AdminBanner["pageKey"]) => void;
  title: string;
  setTitle: (val: string) => void;
  badge: string;
  setBadge: (val: string) => void;
  subtitle: string;
  setSubtitle: (val: string) => void;
}

export function BannerModalIdentityFields({
  pageKey,
  setPageKey,
  title,
  setTitle,
  badge,
  setBadge,
  subtitle,
  setSubtitle,
}: BannerModalIdentityFieldsProps) {
  return (
    <>
      {/* Target Page Placement */}
      <div className="space-y-1.5">
        <Label htmlFor="banner-page" className="text-xs font-semibold">
          Target Storefront Page Placement <span className="text-rose-500">*</span>
        </Label>
        <Select value={pageKey} onValueChange={(val) => setPageKey(val as AdminBanner["pageKey"])}>
          <SelectTrigger id="banner-page">
            <SelectValue placeholder="Select target page" />
          </SelectTrigger>
          <SelectContent>
            {PAGE_KEYS.map((p) => (
              <SelectItem key={p.key} value={p.key}>
                {p.label} ({p.route})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Title & Badge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-1.5">
          <Label htmlFor="banner-title" className="text-xs font-semibold">
            Banner Main Headline <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="banner-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Ginza Tokyo Direct: Authentic Skincare Arrival"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="banner-badge" className="text-xs font-semibold">
            Promotional Badge
          </Label>
          <Input
            id="banner-badge"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            placeholder="e.g. 🌸 Spring 2026"
          />
        </div>
      </div>

      {/* Subtitle */}
      <div className="space-y-1.5">
        <Label htmlFor="banner-subtitle" className="text-xs font-semibold">
          Supporting Subtitle / Value Proposition
        </Label>
        <Textarea
          id="banner-subtitle"
          rows={2}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="e.g. 100% Genuine formulas air-shipped weekly. Fast courier dispatch across all 64 districts in Bangladesh."
        />
      </div>
    </>
  );
}
