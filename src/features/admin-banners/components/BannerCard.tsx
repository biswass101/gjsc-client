import React from "react";
import { ArrowRight, Monitor, Smartphone, Edit2, Trash2 } from "lucide-react";
import { AdminBanner } from "@/context/admin-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PAGE_KEYS } from "../constants";

interface BannerCardProps {
  banner: AdminBanner;
  onEdit: (banner: AdminBanner) => void;
  onDelete: (banner: AdminBanner) => void;
  onToggleActive: (banner: AdminBanner) => void;
}

export function BannerCard({ banner, onEdit, onDelete, onToggleActive }: BannerCardProps) {
  const pageConfig = PAGE_KEYS.find((p) => p.key === banner.pageKey);

  return (
    <div
      className={`rounded-xl border overflow-hidden bg-card shadow-xs transition-all duration-200 flex flex-col justify-between ${
        banner.active
          ? "border-border/80 hover:border-primary/40 hover:shadow-md"
          : "border-border/40 opacity-75"
      }`}
    >
      {/* Live Preview Container (Simulating Desktop Banner) */}
      <div className="relative h-56 w-full overflow-hidden bg-muted">
        <img
          src={banner.imageUrl}
          alt={banner.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

        {/* Status & Page Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge className="bg-background/90 text-foreground font-semibold text-[10px] backdrop-blur-xs shadow-xs">
            {pageConfig?.label || banner.pageTitle}
          </Badge>
          {banner.badge && (
            <Badge className="bg-primary text-primary-foreground border-none text-[10px] shadow-xs">
              {banner.badge}
            </Badge>
          )}
        </div>

        {/* Active switch & order badge in preview top-right */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white font-mono">
            Order #{banner.order}
          </span>
          <div className="rounded-full bg-black/60 backdrop-blur-md p-1 px-2 flex items-center gap-1.5">
            <span className="text-[10px] text-white">Live:</span>
            <Switch checked={banner.active} onCheckedChange={() => onToggleActive(banner)} />
          </div>
        </div>

        {/* Banner Text Overlay */}
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <h3 className="text-xl font-bold text-white drop-shadow-sm leading-tight max-w-lg">
            {banner.title}
          </h3>
          {banner.subtitle && (
            <p className="text-xs text-white/90 line-clamp-2 max-w-md drop-shadow-2xs">
              {banner.subtitle}
            </p>
          )}

          {banner.ctaText && (
            <div className="pt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-xs">
                <span>{banner.ctaText}</span>
                <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-[11px] text-white/70 font-mono">
                Target: {banner.ctaLink || "/"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Information & Action Footer */}
      <div className="p-4 bg-card/60 flex items-center justify-between gap-4 border-t border-border/60">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Monitor className="h-3.5 w-3.5 text-primary" />
            <span>Desktop Ready</span>
          </div>
          {banner.mobileImageUrl ? (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Custom Mobile Asset</span>
            </div>
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
