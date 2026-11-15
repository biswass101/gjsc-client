import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminBanner } from "@/context/admin-context";
import {
  BANNER_PAGE_GROUPS,
  BANNER_PAGE_OPTIONS,
  getBannerPageOption,
} from "../../constants";

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
  // Check if current pageKey is in standard options or is custom
  const isStandardOption = BANNER_PAGE_OPTIONS.some((p) => p.key === pageKey);
  const [isCustomKey, setIsCustomKey] = useState(!isStandardOption && Boolean(pageKey));
  const [customKeyInput, setCustomKeyInput] = useState(!isStandardOption ? pageKey : "");

  const handleSelectChange = (val: string) => {
    if (val === "__custom__") {
      setIsCustomKey(true);
      if (customKeyInput) {
        setPageKey(customKeyInput);
      }
      return;
    }

    setIsCustomKey(false);
    setPageKey(val);

    // Keep headline optional - only suggest badge if currently blank
    const opt = getBannerPageOption(val);
    if (opt) {
      if (!badge.trim() && opt.defaultBadge) setBadge(opt.defaultBadge);
    }
  };

  const handleCustomKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.toLowerCase().replace(/\s+/g, "_");
    setCustomKeyInput(rawVal);
    setPageKey(rawVal);
  };

  return (
    <>
      {/* Target Page Placement */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="banner-page" className="text-xs font-semibold">
            Target Page / Section Placement <span className="text-rose-500">*</span>
          </Label>
          <span className="text-[11px] text-muted-foreground">
            Select which storefront page or nav section will display this banner
          </span>
        </div>

        <Select
          value={isCustomKey ? "__custom__" : pageKey}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger id="banner-page" className="h-10 text-xs">
            <SelectValue placeholder="Choose page or collection section..." />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {BANNER_PAGE_GROUPS.map((group) => {
              const groupItems = BANNER_PAGE_OPTIONS.filter((p) => p.group === group);
              if (groupItems.length === 0) return null;

              return (
                <SelectGroup key={group}>
                  <SelectLabel className="text-[11px] font-bold uppercase tracking-wider text-primary px-2 py-1 bg-muted/40">
                    {group}
                  </SelectLabel>
                  {groupItems.map((p) => (
                    <SelectItem key={p.key} value={p.key} className="text-xs py-1.5">
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              );
            })}

            <SelectGroup>
              <SelectLabel className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1 bg-muted/40">
                Future / Custom Additions
              </SelectLabel>
              <SelectItem value="__custom__" className="text-xs font-semibold text-primary">
                + Create Custom Page Section Key...
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {isCustomKey && (
          <div className="pt-2">
            <Label htmlFor="custom-page-key" className="text-[11px] font-medium text-primary">
              Custom Page Identifier (letters, numbers, underscore)
            </Label>
            <Input
              id="custom-page-key"
              value={customKeyInput}
              onChange={handleCustomKeyChange}
              placeholder="e.g. tokyo_sakura_sale_2026 or new_arrival_special"
              className="mt-1 text-xs"
              required
            />
          </div>
        )}
      </div>

      {/* Title & Badge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="banner-title" className="text-xs font-semibold">
              Banner Main Headline <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            {title && (
              <button
                type="button"
                onClick={() => setTitle("")}
                className="text-[11px] text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <Input
            id="banner-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Optional - leave blank for image-only banner"
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="banner-badge" className="text-xs font-semibold">
              Promotional Badge <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            {badge && (
              <button
                type="button"
                onClick={() => setBadge("")}
                className="text-[11px] text-rose-500 hover:text-rose-600 font-medium transition-colors cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
          <Input
            id="banner-badge"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            placeholder="Optional - e.g. 🌸 Spring 2026 (or leave empty)"
          />
        </div>
      </div>

      {/* Subtitle */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="banner-subtitle" className="text-xs font-semibold">
            Supporting Subtitle / Value Proposition <span className="text-muted-foreground font-normal">(Optional)</span>
          </Label>
          {subtitle && (
            <button
              type="button"
              onClick={() => setSubtitle("")}
              className="text-[11px] text-rose-500 hover:text-rose-600 font-medium transition-colors cursor-pointer"
            >
              Remove
            </button>
          )}
        </div>
        <Textarea
          id="banner-subtitle"
          rows={2}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Optional - leave blank if you want no subtitle / value proposition on this banner"
        />
      </div>
    </>
  );
}
