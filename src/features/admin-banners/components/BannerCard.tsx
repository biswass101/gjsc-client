import React, { useState } from "react";
import { Monitor, Smartphone, Edit2, Trash2 } from "lucide-react";
import { AdminBanner, useAdmin } from "@/context/admin-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PAGE_KEYS, resolveBannerGradient } from "../constants";
import { resolveBannerImageUrl, handleBannerImageError } from "../utils/bannerImageHelper";

interface BannerCardProps {
  banner: AdminBanner;
  onEdit: (banner: AdminBanner) => void;
  onDelete: (banner: AdminBanner) => void;
  onToggleActive: (banner: AdminBanner) => void;
}

export function BannerCard({ banner, onEdit, onDelete, onToggleActive }: BannerCardProps) {
  const { banners } = useAdmin();
  const [viewDevice, setViewDevice] = useState<"desktop" | "mobile">("desktop");
  const pageConfig = PAGE_KEYS.find((p) => p.key === banner.pageKey);

  const pageBanners = (banners || [])
    .filter((b) => b.pageKey === banner.pageKey)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const totalInPage = pageBanners.length;

  const hasText = Boolean(banner.title?.trim() || banner.subtitle?.trim());
  const gradientCss = hasText ? resolveBannerGradient(banner.gradient) : "none";

  const displayImageUrl =
    viewDevice === "mobile" && banner.mobileImageUrl
      ? resolveBannerImageUrl(banner.mobileImageUrl)
      : resolveBannerImageUrl(banner.imageUrl);

  return (
    <div
      className={`rounded-xl border overflow-hidden bg-card shadow-xs transition-all duration-200 flex flex-col justify-between ${
        banner.active
          ? "border-border/80 hover:border-primary/40 hover:shadow-md"
          : "border-border/40 opacity-75"
      }`}
    >
      {/* Live Preview Container (Simulating Desktop/Mobile Banner) */}
      <div className="relative h-56 w-full overflow-hidden bg-muted">
        <img
          src={displayImageUrl}
          alt={banner.title || "Banner"}
          className={`w-full h-full ${
            viewDevice === "mobile" && banner.mobileImageUrl
              ? "object-contain bg-neutral-900"
              : "object-cover"
          }`}
          loading="lazy"
          onError={handleBannerImageError}
        />

        {/* Status & Page Badge in preview top-left */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge className="bg-background/90 text-foreground font-semibold text-[10px] backdrop-blur-xs shadow-xs">
            {pageConfig?.label || banner.pageTitle}
          </Badge>
          {banner.badge && (
            <Badge className="bg-primary text-primary-foreground border-none text-[10px] shadow-xs">
              {banner.badge}
            </Badge>
          )}
          {hasText && banner.gradient && banner.gradient !== "none" && (
            <Badge variant="outline" className="bg-background/85 text-foreground text-[9px] backdrop-blur-xs">
              🎨 Styled Gradient
            </Badge>
          )}
        </div>

        {/* Active switch & order badge in preview top-right */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="rounded-md bg-background/85 backdrop-blur-md border border-border/50 px-2 py-0.5 text-[10px] font-bold text-foreground font-mono shadow-xs">
            Slide #{banner.order} {totalInPage > 1 ? `of ${totalInPage}` : ""}
          </span>
          <div className="rounded-full bg-background/85 backdrop-blur-md border border-border/50 p-1 px-2 flex items-center gap-1.5 shadow-xs">
            <span className="text-[10px] font-medium text-foreground">Live:</span>
            <Switch checked={banner.active} onCheckedChange={() => onToggleActive(banner)} />
          </div>
        </div>

        {/* Applied Gradient Atmosphere Overlay - ONLY when headline or subtitle is present! */}
        {hasText && gradientCss !== "none" && (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{ background: gradientCss }}
          />
        )}

        {/* Banner Text Overlay (when headline or subtitle provided) */}
        {(banner.title || banner.subtitle) && (
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-background/85 backdrop-blur-md border border-border/40 space-y-1.5 shadow-sm">
            {banner.title && (
              <h3 className="text-sm font-bold text-foreground leading-tight line-clamp-1">
                {banner.title}
              </h3>
            )}
            {banner.subtitle && (
              <p className="text-[11px] text-muted-foreground line-clamp-1">
                {banner.subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Information & Action Footer */}
      <div className="p-4 bg-card/60 flex items-center justify-between gap-4 border-t border-border/60">
        <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground flex-wrap">
          <button
            type="button"
            onClick={() => setViewDevice("desktop")}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
              viewDevice === "desktop"
                ? "bg-primary/15 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Desktop</span>
          </button>
          {banner.mobileImageUrl ? (
            <button
              type="button"
              onClick={() =>
                setViewDevice((prev) => (prev === "mobile" ? "desktop" : "mobile"))
              }
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                viewDevice === "mobile"
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
              }`}
              title="Click to toggle mobile preview"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile {viewDevice === "mobile" ? "Active" : "Ready"}</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Auto Responsive</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(banner)}
            className="h-8 gap-1.5 text-xs"
          >
            <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Edit</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(banner)}
            className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
