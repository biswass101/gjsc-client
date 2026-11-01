import heroSpring from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import { PRODUCT_IMAGES, slugify } from "@/lib/catalog";
import type { BrandMeta } from "./types";
import { ALPHABET_NUMBER_KEYS } from "./types";
import { BRAND_DEFS_NUMBERS } from "./brandDefsNumbers";
import { BRAND_DEFS_A_TO_D } from "./brandDefsAtoD";
import { BRAND_DEFS_E_TO_H } from "./brandDefsEtoH";
import { BRAND_DEFS_I_TO_L } from "./brandDefsItoL";
import { BRAND_DEFS_M_TO_P } from "./brandDefsMtoP";
import { BRAND_DEFS_Q_TO_S } from "./brandDefsQtoS";
import { BRAND_DEFS_T_TO_Z } from "./brandDefsTtoZ";

export type { BrandMeta } from "./types";
export { ALPHABET_NUMBER_KEYS } from "./types";

export const BRAND_DEFINITIONS: BrandMeta[] = [
  ...BRAND_DEFS_NUMBERS,
  ...BRAND_DEFS_A_TO_D,
  ...BRAND_DEFS_E_TO_H,
  ...BRAND_DEFS_I_TO_L,
  ...BRAND_DEFS_M_TO_P,
  ...BRAND_DEFS_Q_TO_S,
  ...BRAND_DEFS_T_TO_Z,
];

export function getAllBrands(): BrandMeta[] {
  return BRAND_DEFINITIONS;
}

export function getBrandsByLetter(): Record<string, BrandMeta[]> {
  const grouped: Record<string, BrandMeta[]> = {};

  ALPHABET_NUMBER_KEYS.forEach((key) => {
    grouped[key] = [];
  });

  BRAND_DEFINITIONS.forEach((brand) => {
    const firstChar = brand.name.trim().charAt(0).toUpperCase();
    if (grouped[firstChar]) {
      grouped[firstChar].push(brand);
    } else {
      grouped["0"] = grouped["0"] || [];
      grouped["0"].push(brand);
    }
  });

  return grouped;
}

export function getBrandMeta(slug: string): BrandMeta {
  const normalized = decodeURIComponent(slug).toLowerCase().trim();

  const found = BRAND_DEFINITIONS.find((b) => {
    if (b.slug.toLowerCase() === normalized) return true;
    if (slugify(b.name).toLowerCase() === normalized) return true;
    if (b.name.toLowerCase() === normalized) return true;
    if (b.aliases.some((a) => a.toLowerCase() === normalized)) return true;
    return false;
  });

  if (found) return found;

  // Fallback for unknown brand slug
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    name: title,
    slug,
    kanji: "日本美研",
    origin: "Tokyo, Japan",
    tagline: "Authentic Japanese beauty formulations curated for luminous skin.",
    description: `Discover authentic Japanese skincare and beauty formulas from ${title}. Imported directly from certified laboratories across Tokyo, Kyoto, and Osaka.`,
    category: "Japanese Beauty House",
    image: PRODUCT_IMAGES[0]!,
    bannerImage: heroSpring.src,
    aliases: [slug],
    keyIngredients: ["Rice Ferment", "Camellia Oil", "Hyaluronic Acid"],
    philosophies: ["Authentic Japanese Purity", "Dermatologically Verified", "Radiant Glass Skin"],
  };
}
