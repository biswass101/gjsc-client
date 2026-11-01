import i1 from "@/assets/new_products_images/i1.jpg";
import i2 from "@/assets/new_products_images/i2.jpg";
import i3 from "@/assets/new_products_images/i3.jpg";
import i4 from "@/assets/new_products_images/i4.jpg";
import i5 from "@/assets/new_products_images/i5.jpg";
import i6 from "@/assets/new_products_images/i6.jpg";
import i7 from "@/assets/new_products_images/i7.jpg";
import i8 from "@/assets/new_products_images/i8.jpg";
import i9 from "@/assets/new_products_images/i9.jpg";
import i10 from "@/assets/new_products_images/i10.jpg";
import i11 from "@/assets/new_products_images/i11.jpg";
import i12 from "@/assets/new_products_images/i12.jpg";
import i13 from "@/assets/new_products_images/i13.jpg";
import i14 from "@/assets/new_products_images/i14.jpg";
import i15 from "@/assets/new_products_images/i15.jpg";
import i16 from "@/assets/new_products_images/i16.jpg";

import type { Product, CategoryGroup } from "@/types";
import {
  SEEDS,
  LOREM,
  slugify,
  buildDemoProduct,
  PRE_ORDER_SEEDS,
  SHEIN_SEEDS,
} from "./catalog/seeds";
export type { Product, CategoryGroup };
export { slugify };
export { BLOG_POSTS, TESTIMONIALS } from "./catalog/editorial";

export const CATEGORIES = [
  "Face Wash",
  "Cleanser",
  "Serum",
  "Essence",
  "Moisturizer",
  "Toner",
  "Sunscreen",
  "Eye Care",
  "Lip Care",
  "Face Mask",
  "Hair Care",
  "Body Care",
  "Baby Care",
  "Beauty Accessories",
  "Makeup",
  "Gift Sets",
  "Travel Kits",
] as const;

export const TOP_CATEGORIES = [
  "Skincare",
  "Hair Care",
  "Body Care",
  "Makeup",
  "Baby Care",
  "Accessories",
  "Gift Sets",
  "Face Mask",
] as const;

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    label: "Skincare",
    categories: [
      "Face Wash",
      "Cleanser",
      "Serum",
      "Essence",
      "Moisturizer",
      "Toner",
      "Sunscreen",
      "Eye Care",
      "Lip Care",
      "Face Mask",
    ],
  },
  {
    label: "Hair",
    categories: ["Hair Care"],
  },
  {
    label: "Body",
    categories: ["Body Care"],
  },
  {
    label: "Baby Care",
    categories: ["Baby Care"],
  },
  {
    label: "Accessories",
    categories: ["Beauty Accessories"],
  },
  {
    label: "Makeup",
    categories: ["Makeup"],
  },
  {
    label: "Gifts & Kits",
    categories: ["Gift Sets", "Travel Kits"],
  },
] as const;

export const SKIN_TYPES = ["Dry", "Oily", "Combination", "Sensitive", "Normal"] as const;

export const CONCERNS = [
  "Acne",
  "Dark Spots",
  "Pigmentation",
  "Anti Aging",
  "Hydration",
  "Brightening",
  "Large Pores",
  "Redness",
  "Sensitive Skin",
] as const;

export const BRANDS = [
  "Glorious Japan",
  "Sakura Lab",
  "Kyoto Botanicals",
  "Yuzu No Mori",
  "Hikari Beauty",
  "Shiseido",
  "Hada Labo",
  "Pigeon",
  "Canmake",
  "Curel",
] as const;

export const PRODUCT_IMAGES: string[] = [
  i1.src,
  i2.src,
  i3.src,
  i4.src,
  i5.src,
  i6.src,
  i7.src,
  i8.src,
  i9.src,
  i10.src,
  i11.src,
  i12.src,
  i13.src,
  i14.src,
  i15.src,
  i16.src,
];

const IMAGES = PRODUCT_IMAGES;

const PRE_ORDER_PRODUCTS: Product[] = PRE_ORDER_SEEDS.map(buildDemoProduct);
const SHEIN_PRODUCTS: Product[] = SHEIN_SEEDS.map(buildDemoProduct);

export const PRE_ORDER = PRE_ORDER_PRODUCTS;
export const SHEIN = SHEIN_PRODUCTS;

export const PRODUCTS: Product[] = [
  ...SEEDS.map(([name, category, price, compare, badge], i) => ({
    id: String(i + 1),
    slug: slugify(name),
    name,
    brand: BRANDS[i % BRANDS.length]!,
    category,
    price,
    compareAt: compare || undefined,
    rating: Math.round((4.3 + ((i * 7) % 7) / 10) * 10) / 10,
    reviews: 38 + ((i * 37) % 260),
    image: IMAGES[i % IMAGES.length]!,
    short: "Fermented Japanese botanicals for calm, luminous skin.",
    description: LOREM,
    ingredients: [
      "Sakura Extract",
      "Rice Ferment Filtrate",
      "Camellia Oil",
      "Hyaluronic Acid",
      "Yuzu Peel Extract",
      "Green Tea Polyphenols",
    ],
    benefits: [
      "Deep 72-hour hydration",
      "Visibly brighter, even tone",
      "Strengthens the moisture barrier",
      "Soothes redness and sensitivity",
    ],
    howTo:
      "Apply 2–3 drops to cleansed skin morning and evening. Press gently into the face and neck, then follow with moisturiser and sunscreen.",
    skinTypes: [SKIN_TYPES[i % 5]!, SKIN_TYPES[(i + 2) % 5]!],
    concerns: [CONCERNS[i % 9]!, CONCERNS[(i + 3) % 9]!],
    stock: i % 7 === 0 ? 4 : i % 11 === 0 ? 0 : 40,
    badge,
    sizes: ["30ml", "50ml", "100ml"],
  })),
  ...PRE_ORDER_PRODUCTS,
  ...SHEIN_PRODUCTS,
];

export const bySlug = (slug: string): Product | undefined => {
  if (!slug) return undefined;
  let decoded = slug.trim().toLowerCase();
  try {
    decoded = decodeURIComponent(slug).trim().toLowerCase();
  } catch {
    // Keep raw slug if malformed URL encoding
  }
  const normalized = slugify(decoded);
  return PRODUCTS.find(
    (p) =>
      p.slug.toLowerCase() === decoded ||
      p.slug.toLowerCase() === normalized ||
      p.id.toLowerCase() === decoded ||
      slugify(p.name) === normalized ||
      p.name.toLowerCase() === decoded,
  );
};

export const formatBDT = (n: number) => `৳${n.toLocaleString("en-BD")}`;
