import heroSpring from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import type { CollectionMeta } from "./types";
import { PRIMARY_COLLECTIONS } from "./primaryCollections";
import { SECONDARY_COLLECTIONS } from "./secondaryCollections";

export type { CollectionMeta } from "./types";

export const COLLECTION_DEFINITIONS: CollectionMeta[] = [
  ...PRIMARY_COLLECTIONS,
  ...SECONDARY_COLLECTIONS,
];

export function normalizeCollectionSlug(rawSlug: string): string {
  const decoded = decodeURIComponent(rawSlug).toLowerCase().trim();
  const slugified = decoded.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  for (const def of COLLECTION_DEFINITIONS) {
    if (def.slug === slugified) return def.slug;
    for (const alias of def.aliases) {
      if (
        alias.toLowerCase() === decoded ||
        alias.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slugified
      ) {
        return def.slug;
      }
    }
  }

  return slugified;
}

export function getCollectionMeta(slug: string): CollectionMeta {
  const normalized = normalizeCollectionSlug(slug);
  const found = COLLECTION_DEFINITIONS.find((c) => c.slug === normalized);
  if (found) return found;

  const cleanTitle = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    slug: normalized,
    title: cleanTitle,
    japaneseTitle: `${cleanTitle} · 日本コレクション`,
    tagline: "Curated Japanese Beauty Formulations",
    description: `Discover our specialized ${cleanTitle} collection, curated directly from Tokyo laboratories and Japanese beauty artisans for radiant, healthy skin.`,
    metaDescription: `Shop the authentic ${cleanTitle} collection at Glorious Japan Skin Care in Bangladesh.`,
    badgeText: "Authentic Tokyo Import",
    themeColor: "text-primary",
    gradientClass: "from-primary/10 via-champagne/10 to-transparent",
    bannerImage: heroSpring.src,
    frequentlySearched: ["Serums", "Hydration", "Sunscreen", "Cleansers", "Moisturizers"],
    aliases: [normalized],
    filterPredicate: (p) =>
      p.name.toLowerCase().includes(normalized) || p.category.toLowerCase().includes(normalized),
  };
}
