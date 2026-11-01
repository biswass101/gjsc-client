import type { Product } from "@/types";
export { PRE_ORDER_SEEDS, SHEIN_SEEDS } from "./specialSeeds";

export type Seed = [
  name: string,
  category: string,
  price: number,
  compare: number | 0,
  badge: Product["badge"] | undefined,
];

export const SEEDS: Seed[] = [
  // Skincare
  ["Sakura Radiance Serum", "Serum", 4850, 5900, "Best Seller"],
  ["Yuzu Glow Essence", "Essence", 3950, 0, "New"],
  ["Koji Ferment Cream", "Moisturizer", 5600, 6900, "Trending"],
  ["Matcha Clarifying Toner", "Toner", 2450, 2990, "Trending"],
  ["Silk Rice Cleanser", "Cleanser", 1990, 0, "Best Seller"],
  ["Hikari UV Shield SPF50", "Sunscreen", 2890, 3400, "Flash Sale"],
  ["Camellia Hydra Face Wash", "Face Wash", 1750, 0, "Trending"],
  ["Pearl Bright Eye Cream", "Eye Care", 3290, 3990, "Trending"],
  ["Sakura Petal Lip Balm", "Lip Care", 950, 0, "New"],
  ["Gold Infusion Face Mask", "Face Mask", 1290, 1590, "Flash Sale"],
  ["Rice Water Deep Cleanser", "Cleanser", 2190, 0, "Trending"],
  ["Aurora Barrier Serum", "Serum", 5250, 6100, "Best Seller"],
  ["LuLuLun Hydrating Green Mask", "Face Mask", 1850, 2200, "Best Seller"],
  ["Keana Nadeshiko Rice Mask Pack", "Face Mask", 1690, 0, "Trending"],

  // Hair Care
  ["Kyoto Silk Hair Elixir", "Hair Care", 3150, 0, "Trending"],
  ["Tsubaki Premium Moist Hair Treatment", "Hair Care", 2450, 2900, "Best Seller"],
  ["Shiseido Fino Premium Touch Mask", "Hair Care", 2250, 2700, "Best Seller"],
  ["&honey Deep Moist Hair Oil", "Hair Care", 3350, 3900, "Trending"],
  ["Oshima Tsubaki Pure Camellia Oil", "Hair Care", 2800, 0, "New"],
  ["Botanical Scalp Invigorating Tonic", "Hair Care", 2650, 3100, "Trending"],

  // Body Care
  ["Hinoki Body Milk", "Body Care", 2650, 3100, "Trending"],
  ["Bouncia Premium Rich Foam Body Soap", "Body Care", 1850, 2200, "Best Seller"],
  ["White Conc Vitamin C Body CC Cream", "Body Care", 2400, 2850, "Trending"],
  ["Curel Moisture Ceramide Body Lotion", "Body Care", 3200, 3700, "Best Seller"],
  ["Camellia Deep Hydration Hand Milk", "Body Care", 1250, 0, "New"],

  // Baby Care
  ["Mama & Kids Natural Baby Milky Lotion", "Baby Care", 3850, 4500, "Best Seller"],
  ["Pigeon Botanical Tear-Free Foam Wash", "Baby Care", 1950, 2350, "Best Seller"],
  ["Wakodo Natural Cornstarch Baby Powder", "Baby Care", 1450, 0, "Trending"],
  ["Araau Baby Moisturizing Foam Soap", "Baby Care", 1650, 1990, "Trending"],
  ["Madonna Organic Chamomile Barrier Balm", "Baby Care", 2750, 3200, "New"],

  // Makeup
  ["Glow Veil Cushion", "Makeup", 3450, 3990, "Best Seller"],
  ["Canmake Tokyo Cream Cheek Tint", "Makeup", 1450, 1750, "Best Seller"],
  ["Kiss Me Heroine Make Waterproof Mascara", "Makeup", 2150, 2500, "Best Seller"],
  ["KATE Tokyo Designing Eyebrow 3D", "Makeup", 1850, 0, "Trending"],
  ["Opera Lip Tint Rouge Tokyo Rose", "Makeup", 1950, 2300, "New"],

  // Beauty Accessories
  ["Jade Facial Roller", "Beauty Accessories", 1850, 2300, "Trending"],
  ["Mulberry Silk Sleep Eye Mask", "Beauty Accessories", 1250, 1600, "New"],
  ["Muji Pure Unbleached Facial Cotton", "Beauty Accessories", 650, 0, "Best Seller"],
  ["Natural Konjac Charcoal Facial Sponge", "Beauty Accessories", 850, 1100, "Trending"],

  // Gift Sets
  ["Glorious Ritual Gift Set", "Gift Sets", 8900, 10900, "Trending"],
  ["Sakura Blossom Hydration Discovery Set", "Gift Sets", 6400, 7500, "Best Seller"],
  ["Tokyo Ferment Anti-Aging Luxury Vault", "Gift Sets", 12500, 15000, "New"],
  ["Sakura Travel Kit", "Travel Kits", 3990, 0, "New"],
  ["Double Cleansing Japanese Ritual Duo", "Gift Sets", 4200, 5200, "Best Seller"],
  ["Tokyo Glass Skin 3-Step Starter Kit", "Gift Sets", 5900, 7200, "Best Seller"],
  ["Hada Labo Hydration Travel Mini Duo", "Travel Kits", 2100, 2600, "Trending"],
  ["Biore UV Travel Duo Sunscreen Pack", "Sunscreen", 3100, 3800, "Best Seller"],
];

export const LOREM =
  "Formulated in Japan with slow-fermented botanicals and time-honoured beauty rituals. A weightless, fast-absorbing texture that leaves skin cushioned, luminous and calm — never heavy, never sticky.";

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type DemoSeed = Pick<Product, "name" | "brand" | "category" | "price" | "image" | "type"> &
  Partial<
    Pick<
      Product,
      | "id"
      | "compareAt"
      | "rating"
      | "reviews"
      | "short"
      | "description"
      | "ingredients"
      | "benefits"
      | "howTo"
      | "skinTypes"
      | "concerns"
      | "stock"
      | "sizes"
    >
  >;

export function buildDemoProduct(seed: DemoSeed): Product {
  return {
    id: seed.id ?? slugify(seed.name),
    slug: slugify(seed.name),
    rating: 4.6,
    reviews: 86,
    short: "Authentic Japanese beauty, reserved for you from Tokyo.",
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
      "Apply to cleansed skin morning and evening. Press gently into the face and neck, then follow with moisturiser and sunscreen.",
    skinTypes: ["Normal", "Combination"],
    concerns: ["Hydration", "Brightening"],
    stock: 25,
    sizes: ["30ml", "50ml", "100ml"],
    ...seed,
  };
}
