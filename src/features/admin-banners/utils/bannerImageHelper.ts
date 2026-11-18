import React from "react";
import { LOCAL_TO_CLOUDINARY_MAP, heroSpring } from "@/lib/cloudinaryAssets";

/**
 * Standard fallback banner image path served directly from Cloudinary CDN.
 */
export const DEFAULT_FALLBACK_BANNER = heroSpring.src;

/**
 * Cleanly resolves any banner image URL to a valid Cloudinary CDN URL.
 */
export function resolveBannerImageUrl(
  url?: string | null,
  fallback = DEFAULT_FALLBACK_BANNER
): string {
  if (!url || typeof url !== "string") {
    return fallback;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return fallback;
  }

  // Check if mapped in Cloudinary asset directory
  if (LOCAL_TO_CLOUDINARY_MAP[trimmed]) {
    return LOCAL_TO_CLOUDINARY_MAP[trimmed];
  }

  // Handle fake or legacy unversioned Cloudinary URLs
  const isUnversionedFakeCloudinary =
    trimmed.includes("res.cloudinary.com") &&
    trimmed.includes("/image/upload/") &&
    !/\/image\/upload\/v\d+\//i.test(trimmed) &&
    trimmed.includes("/images/");

  if (isUnversionedFakeCloudinary) {
    const parts = trimmed.split("/images/");
    const filename = parts[1]?.split("?")[0]?.split("#")[0];
    if (filename && LOCAL_TO_CLOUDINARY_MAP[filename]) {
      return LOCAL_TO_CLOUDINARY_MAP[filename];
    }
    return fallback;
  }

  // Real versioned Cloudinary URLs or full https URLs
  if (trimmed.startsWith("https://res.cloudinary.com/")) {
    return trimmed;
  }

  // Any relative path checking
  const cleanKey = trimmed.replace(/^\/?hero\//, "");
  if (LOCAL_TO_CLOUDINARY_MAP[cleanKey]) {
    return LOCAL_TO_CLOUDINARY_MAP[cleanKey];
  }

  return trimmed || fallback;
}

/**
 * Robust image error handler to prevent banners from ever disappearing or breaking.
 * Protects against infinite load loops by using dataset flags.
 */
export function handleBannerImageError(
  e: React.SyntheticEvent<HTMLImageElement>,
  fallback = DEFAULT_FALLBACK_BANNER
) {
  const img = e.currentTarget;
  if (img.dataset['fallbackApplied'] === "final") {
    return;
  }

  // Fallback to guaranteed Cloudinary hero asset
  img.dataset['fallbackApplied'] = "final";
  img.src = fallback;
}
