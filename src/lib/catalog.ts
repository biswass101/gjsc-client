import { PRODUCT_IMAGE_URLS } from "@/lib/cloudinaryAssets";

import type { Product, CategoryGroup, AdminProduct } from "@/types";
import {
  SEEDS,
  LOREM,
  slugify,
  buildDemoProduct,
  PRE_ORDER_SEEDS,
  SHEIN_SEEDS,
} from "./catalog/seeds";
export type { Product, CategoryGroup, AdminProduct };
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

export const PRODUCT_IMAGES: string[] = PRODUCT_IMAGE_URLS;

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

export const bySlug = (slug: string, source: Product[] = PRODUCTS): Product | undefined => {
  if (!slug) return undefined;
  let decoded = slug.trim().toLowerCase();
  try {
    decoded = decodeURIComponent(slug).trim().toLowerCase();
  } catch {
    // Keep raw slug if malformed URL encoding
  }
  const normalized = slugify(decoded);
  return source.find(
    (p) =>
      p.slug.toLowerCase() === decoded ||
      p.slug.toLowerCase() === normalized ||
      p.id.toLowerCase() === decoded ||
      slugify(p.name) === normalized ||
      p.name.toLowerCase() === decoded,
  );
};

export function adminProductToStorefront(ap: any): Product {
  return {
    id: String(ap.id),
    slug: ap.slug,
    name: ap.name,
    japaneseName: ap.japaneseName || undefined,
    brand: ap.brand || ap.brandName || "Authentic Japan",
    category: ap.category || ap.categoryName || "Skincare",
    price: Number(ap.price || 0),
    compareAt: ap.compareAt ? Number(ap.compareAt) : undefined,
    rating: Number(ap.rating || 5),
    reviews: Number(ap.reviewsCount ?? ap.reviews ?? 0),
    image: ap.image || (ap.images && ap.images[0]) || "",
    images: Array.isArray(ap.images) && ap.images.length > 0 ? ap.images : [ap.image || ""],
    short: ap.short || "",
    description: ap.description || "",
    ingredients: Array.isArray(ap.ingredients) ? ap.ingredients : [],
    benefits: Array.isArray(ap.benefits) ? ap.benefits : [],
    howTo: ap.howTo || "",
    skinTypes: Array.isArray(ap.skinTypes) ? ap.skinTypes : [],
    concerns: Array.isArray(ap.concerns) ? ap.concerns : [],
    stock: Number(ap.stock || 0),
    badge: ap.badge || undefined,
    sizes: Array.isArray(ap.sizes) ? ap.sizes : ["Standard"],
    type: ap.productType || ap.type || "in-stock",
    origin: ap.origin || "Tokyo, Japan",
    texture: ap.texture || undefined,
    pao: ap.pao || undefined,
    spf: ap.spf || undefined,
    barcode: ap.barcode || undefined,
    sku: ap.sku || undefined,
  };
}

export function mergeStorefrontProducts(
  adminProducts: AdminProduct[] | undefined,
  staticProducts: Product[] = PRODUCTS,
): Product[] {
  if (!adminProducts || adminProducts.length === 0) {
    return staticProducts;
  }

  // Active admin products converted to storefront format
  const activeAdmin = adminProducts
    .filter((p) => p.status === "active")
    .map(adminProductToStorefront);

  // Map strictly by normalized slug so DB auto-increment IDs never collide with unrelated static seed IDs
  const adminMap = new Map<string, Product>();
  const adminAllBySlug = new Map<string, AdminProduct>();
  adminProducts.forEach((ap) => {
    if (ap.slug) {
      adminAllBySlug.set(ap.slug.toLowerCase(), ap);
    }
  });
  activeAdmin.forEach((p) => {
    if (p.slug) {
      adminMap.set(p.slug.toLowerCase(), p);
    }
  });

  const matchedAdminSlugs = new Set<string>();
  const mergedStatic: Product[] = [];

  for (const sp of staticProducts) {
    const slugKey = sp.slug.toLowerCase();

    // Check if this product was modified, deleted, or archived in adminProducts (strictly by slug)
    const foundInAdminAll = adminAllBySlug.get(slugKey);

    if (foundInAdminAll) {
      if (foundInAdminAll.status === "active") {
        const activeItem = adminMap.get(slugKey);
        if (activeItem) {
          mergedStatic.push(activeItem);
          matchedAdminSlugs.add(slugKey);
        }
      }
      // If status is draft or archived, it is omitted from the storefront
    } else {
      mergedStatic.push(sp);
    }
  }

  // Add newly created admin products that weren't in base list
  for (const ap of activeAdmin) {
    const slugKey = ap.slug.toLowerCase();
    if (!matchedAdminSlugs.has(slugKey)) {
      mergedStatic.unshift(ap); // Newly created products appear first!
      matchedAdminSlugs.add(slugKey);
    }
  }

  return mergedStatic;
}

export const formatBDT = (n: number) => `৳${n.toLocaleString("en-BD")}`;
