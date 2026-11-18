import React, { useState } from "react";
import {
  Monitor,
  Smartphone,
  Sparkles,
  Link as LinkIcon,
  Loader2,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PAGE_KEYS, resolveBannerGradient } from "../constants";
import {
  resolveBannerImageUrl,
  handleBannerImageError,
  DEFAULT_FALLBACK_BANNER,
} from "../utils/bannerImageHelper";

interface BannerLivePreviewProps {
  pageKey: string;
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  mobileImageUrl: string;
  gradient: string;
  customStart: string;
  customEnd: string;
  customOpacity: number;
  active: boolean;
  ctaLink: string;
  desktopPreviewBlob?: string | null;
  mobilePreviewBlob?: string | null;
  isUploadingDesktop?: boolean;
  isUploadingMobile?: boolean;
}

function hexToRgba(hex: string, alpha: number) {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
}

export function BannerLivePreview({
  pageKey,
  title,
  subtitle,
  badge,
  imageUrl,
  mobileImageUrl,
  gradient,
  customStart,
  customEnd,
  customOpacity,
  active,
  ctaLink,
  desktopPreviewBlob,
  mobilePreviewBlob,
  isUploadingDesktop,
  isUploadingMobile,
}: BannerLivePreviewProps) {
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">(
    "desktop"
  );

  const pageMeta = PAGE_KEYS.find((p) => p.key === pageKey);
  const pageLabel = pageMeta?.label || pageKey;

  // Resolve current gradient CSS
  const hasText = Boolean(title.trim() || subtitle.trim());
  let gradientCss = "none";
  if (gradient === "custom") {
    gradientCss = `linear-gradient(to right, ${hexToRgba(
      customStart,
      customOpacity / 100
    )}, ${hexToRgba(customEnd, (customOpacity / 100) * 0.45)}, transparent)`;
  } else if (gradient && gradient !== "none") {
    gradientCss = resolveBannerGradient(gradient);
  }

  // Pick preview image source: blob preview (instant before/during upload) > uploaded URL
  const activeDesktopSrc =
    desktopPreviewBlob ||
    (imageUrl.trim() ? resolveBannerImageUrl(imageUrl.trim()) : null);

  const activeMobileSrc =
    mobilePreviewBlob ||
    (mobileImageUrl.trim()
      ? resolveBannerImageUrl(mobileImageUrl.trim())
      : null);

  const displaySrc =
    previewDevice === "mobile"
      ? activeMobileSrc || activeDesktopSrc
      : activeDesktopSrc;

  const isUploading =
    previewDevice === "mobile" ? isUploadingMobile : isUploadingDesktop;

  return (
    <div className="rounded-xl border border-primary/25 bg-linear-to-b from-primary/5 via-card to-card p-4 space-y-3 shadow-xs">
      {/* Header bar with controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-primary/10 border-primary/25 text-primary text-[11px] font-semibold flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3" />
            <span>Storefront Live Preview</span>
          </Badge>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            • {pageLabel}
          </span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg border border-border/60">
          <button
            type="button"
            onClick={() => setPreviewDevice("desktop")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              previewDevice === "desktop"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Desktop (16:9)</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewDevice("mobile")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              previewDevice === "mobile"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile (4:5)</span>
          </button>
        </div>
      </div>

      {/* Visual Canvas */}
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-border/80 bg-neutral-900 transition-all ${
          previewDevice === "mobile"
            ? "mx-auto max-w-[320px] h-80 shadow-md ring-4 ring-muted/50"
            : "h-56 sm:h-72 shadow-sm"
        }`}
      >
        {displaySrc ? (
          <>
            <img
              src={displaySrc}
              alt="Live Banner Preview"
              onError={handleBannerImageError}
              className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-300"
            />
            {/* Gradient Atmosphere Overlay */}
            {hasText && gradientCss !== "none" && (
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{ background: gradientCss }}
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-muted-foreground bg-muted/20">
            <ImageIcon className="h-10 w-10 text-muted-foreground/40 mb-2" />
            <p className="text-xs font-medium text-foreground">
              No banner image selected yet
            </p>
            <p className="text-[11px] text-muted-foreground mt-1 max-w-xs">
              Upload a picture or paste a URL below to see a real-time preview of
              your banner.
            </p>
          </div>
        )}

        {/* Uploading progress overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-xs font-semibold text-foreground">
              Uploading & processing image...
            </span>
          </div>
        )}

        {/* Status indicators in top bar */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10 gap-2">
          <Badge className="bg-background/90 text-foreground font-semibold text-[10px] backdrop-blur-xs shadow-xs border border-border/40">
            {pageLabel}
          </Badge>
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-xs shadow-xs border ${
                active
                  ? "bg-emerald-500/90 text-white border-emerald-400"
                  : "bg-neutral-800/90 text-neutral-300 border-neutral-700"
              }`}
            >
              {active ? "● Live on Storefront" : "○ Draft / Hidden"}
            </span>
          </div>
        </div>

        {/* Banner Content Overlay (Badge, Title, Subtitle) */}
        {(badge || title || subtitle) && (
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white pointer-events-none z-10 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            {badge && (
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider mb-1.5 w-fit shadow-xs">
                <Sparkles className="h-2.5 w-2.5" />
                <span>{badge}</span>
              </div>
            )}
            {title && (
              <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight line-clamp-2">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-[11px] sm:text-xs text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] line-clamp-2 leading-relaxed max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer metadata chips */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground gap-2 pt-1 border-t border-border/40">
        <div className="flex items-center gap-2">
          {ctaLink ? (
            <span className="flex items-center gap-1 text-primary">
              <LinkIcon className="h-3 w-3" />
              <span>Target: {ctaLink}</span>
            </span>
          ) : (
            <span>No click destination (display only)</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {gradient && gradient !== "none" && (
            <span className="text-muted-foreground">
              Atmosphere: <strong className="text-foreground capitalize">{gradient}</strong>
            </span>
          )}
          {mobileImageUrl && (
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              ✓ Mobile Asset Configured
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

