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

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAt?: number | undefined;
  rating: number;
  reviews: number;
  image: string;
  short: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  howTo: string;
  skinTypes: string[];
  concerns: string[];
  stock: number;
  badge?: "New" | "Best Seller" | "Trending" | "Flash Sale" | undefined;
  sizes: string[];
  type?: "pre-order-japan" | "shein" | undefined;
};

export const CATEGORIES = [
  "Face Wash", "Cleanser", "Serum", "Essence", "Moisturizer", "Toner",
  "Sunscreen", "Eye Care", "Lip Care", "Face Mask", "Hair Care", "Body Care",
  "Beauty Accessories", "Makeup", "Gift Sets", "Travel Kits",
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

export type CategoryGroup = {
  label: string;
  categories: typeof CATEGORIES[number][];
};

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    label: "Skincare",
    categories: ["Face Wash", "Cleanser", "Serum", "Essence", "Moisturizer", "Toner", "Sunscreen", "Eye Care", "Lip Care", "Face Mask"],
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
  "Acne", "Dark Spots", "Pigmentation", "Anti Aging", "Hydration",
  "Brightening", "Large Pores", "Redness", "Sensitive Skin",
] as const;

export const BRANDS = ["Glorious Japan", "Sakura Lab", "Kyoto Botanicals", "Yuzu No Mori", "Hikari Beauty"] as const;

export const PRODUCT_IMAGES: string[] = [
  i1.src, i2.src, i3.src, i4.src, i5.src, i6.src,
  i7.src, i8.src, i9.src, i10.src, i11.src, i12.src,
  i13.src, i14.src, i15.src, i16.src,
];

const IMAGES = PRODUCT_IMAGES;

type Seed = [name: string, category: string, price: number, compare: number | 0, badge: Product["badge"] | undefined];

const SEEDS: Seed[] = [
  ["Sakura Radiance Serum", "Serum", 4850, 5900, "Best Seller"],
  ["Yuzu Glow Essence", "Essence", 3950, 0, "New"],
  ["Koji Ferment Cream", "Moisturizer", 5600, 6900, "Trending"],
  ["Matcha Clarifying Toner", "Toner", 2450, 2990, undefined],
  ["Silk Rice Cleanser", "Cleanser", 1990, 0, "Best Seller"],
  ["Hikari UV Shield SPF50", "Sunscreen", 2890, 3400, "Flash Sale"],
  ["Camellia Hydra Face Wash", "Face Wash", 1750, 0, undefined],
  ["Pearl Bright Eye Cream", "Eye Care", 3290, 3990, "Trending"],
  ["Sakura Petal Lip Balm", "Lip Care", 950, 0, "New"],
  ["Gold Infusion Face Mask", "Face Mask", 1290, 1590, "Flash Sale"],
  ["Kyoto Silk Hair Elixir", "Hair Care", 3150, 0, undefined],
  ["Hinoki Body Milk", "Body Care", 2650, 3100, undefined],
  ["Jade Facial Roller", "Beauty Accessories", 1850, 0, undefined],
  ["Glow Veil Cushion", "Makeup", 3450, 3990, "Best Seller"],
  ["Glorious Ritual Gift Set", "Gift Sets", 8900, 10900, "Trending"],
  ["Sakura Travel Kit", "Travel Kits", 3990, 0, "New"],
  ["Rice Water Deep Cleanser", "Cleanser", 2190, 0, undefined],
  ["Aurora Barrier Serum", "Serum", 5250, 6100, "Best Seller"],
];

const LOREM =
  "Formulated in Japan with slow-fermented botanicals and time-honoured beauty rituals. A weightless, fast-absorbing texture that leaves skin cushioned, luminous and calm — never heavy, never sticky.";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ---- Demo collections: Pre-Order from Japan & SHEIN ----
type DemoSeed = Pick<Product, "name" | "brand" | "category" | "price" | "image" | "type"> &
  Partial<Pick<Product, "id" | "compareAt" | "rating" | "reviews" | "short" | "description" | "ingredients" | "benefits" | "howTo" | "skinTypes" | "concerns" | "stock" | "sizes">>;

function buildDemoProduct(seed: DemoSeed): Product {
  return {
    id: seed.id ?? slugify(seed.name),
    slug: slugify(seed.name),
    rating: 4.6,
    reviews: 86,
    short: "Authentic Japanese beauty, reserved for you from Tokyo.",
    description: LOREM,
    ingredients: ["Sakura Extract", "Rice Ferment Filtrate", "Camellia Oil", "Hyaluronic Acid", "Yuzu Peel Extract", "Green Tea Polyphenols"],
    benefits: ["Deep 72-hour hydration", "Visibly brighter, even tone", "Strengthens the moisture barrier", "Soothes redness and sensitivity"],
    howTo: "Apply to cleansed skin morning and evening. Press gently into the face and neck, then follow with moisturiser and sunscreen.",
    skinTypes: ["Normal", "Combination"],
    concerns: ["Hydration", "Brightening"],
    stock: 25,
    sizes: ["30ml", "50ml", "100ml"],
    ...seed,
  };
}

const PRE_ORDER_SEEDS: DemoSeed[] = [
  { name: "Shiseido Ultimune Concentrate", brand: "Shiseido", category: "Serum", price: 9500, compareAt: 11200, image: i1.src, type: "pre-order-japan", rating: 4.8, reviews: 142, short: "Imuno-boosting serum for resilient, radiant skin." },
  { name: "SK-II Facial Treatment Essence", brand: "SK-II", category: "Essence", price: 14500, image: i2.src, type: "pre-order-japan", rating: 4.9, reviews: 210, short: "The cult Pitera essence for crystal-clear skin." },
  { name: "Hada Labo Gokujyun Lotion", brand: "Hada Labo", category: "Toner", price: 2350, compareAt: 2700, image: i3.src, type: "pre-order-japan", rating: 4.7, reviews: 98, short: "Triple hyaluronic acid for deep, weightless hydration." },
  { name: "Kose Clear Turn Brightening Mask", brand: "Kose", category: "Face Mask", price: 1650, image: i4.src, type: "pre-order-japan", rating: 4.5, reviews: 64, short: "Sheet mask drenched in brightening essence." },
  { name: "DHC Deep Cleansing Oil", brand: "DHC", category: "Cleanser", price: 3200, image: i5.src, type: "pre-order-japan", rating: 4.8, reviews: 176, short: "Olive-oil cleansing that dissolves makeup effortlessly." },
  { name: "Biore UV Aqua Rich Watery Essence", brand: "Biore", category: "Sunscreen", price: 2450, compareAt: 2900, image: i6.src, type: "pre-order-japan", rating: 4.7, reviews: 188, short: "Weightless SPF50+ PA++++ daily protection." },
];

const SHEIN_SEEDS: DemoSeed[] = [
  { name: "SHEIN Glow Cushion Foundation", brand: "SHEIN", category: "Makeup", price: 1850, compareAt: 2400, image: i7.src, type: "shein", rating: 4.3, reviews: 74, short: "Dewy cushion base for a luminous, second-skin finish.", sizes: ["01 Porcelain", "02 Natural", "03 Honey"] },
  { name: "SHEIN Matte Liquid Lipstick", brand: "SHEIN", category: "Lip Care", price: 950, image: i8.src, type: "shein", rating: 4.4, reviews: 121, short: "Comfortable matte colour that lasts all day.", sizes: ["Rosewood", "Terracotta", "Berry"] },
  { name: "SHEIN Pearl Hair Claw Clip", brand: "SHEIN", category: "Beauty Accessories", price: 550, image: i9.src, type: "shein", rating: 4.6, reviews: 58, short: "Pearl-accented clip for an effortless updo.", sizes: ["Large"] },
  { name: "SHEIN Shimmer Body Glow Oil", brand: "SHEIN", category: "Body Care", price: 1250, image: i10.src, type: "shein", rating: 4.2, reviews: 47, short: "Lightweight oil for a soft, luminous glow.", sizes: ["50ml", "100ml"] },
  { name: "SHEIN Volumizing Lash Mascara", brand: "SHEIN", category: "Makeup", price: 780, compareAt: 990, image: i11.src, type: "shein", rating: 4.1, reviews: 63, short: "Buildable volume without clumps or flakes.", sizes: ["Black", "Brown"] },
  { name: "SHEIN Silk Scrunchie Trio", brand: "SHEIN", category: "Beauty Accessories", price: 650, image: i12.src, type: "shein", rating: 4.5, reviews: 39, short: "Gentle mulberry-silk scrunchies, set of three.", sizes: ["Set of 3"] },
];

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
    ingredients: ["Sakura Extract", "Rice Ferment Filtrate", "Camellia Oil", "Hyaluronic Acid", "Yuzu Peel Extract", "Green Tea Polyphenols"],
    benefits: ["Deep 72-hour hydration", "Visibly brighter, even tone", "Strengthens the moisture barrier", "Soothes redness and sensitivity"],
    howTo: "Apply 2–3 drops to cleansed skin morning and evening. Press gently into the face and neck, then follow with moisturiser and sunscreen.",
    skinTypes: [SKIN_TYPES[i % 5]!, SKIN_TYPES[(i + 2) % 5]!],
    concerns: [CONCERNS[i % 9]!, CONCERNS[(i + 3) % 9]!],
    stock: i % 7 === 0 ? 4 : i % 11 === 0 ? 0 : 40,
    badge,
    sizes: ["30ml", "50ml", "100ml"],
  })),
  ...PRE_ORDER_PRODUCTS,
  ...SHEIN_PRODUCTS,
];

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const formatBDT = (n: number) => `৳${n.toLocaleString("en-BD")}`;

export const BLOG_POSTS = [
  { slug: "japanese-layering-ritual", title: "The Japanese Layering Ritual, Explained", excerpt: "Why the order of your routine matters more than the number of steps.", date: "2026-07-18", read: "6 min" },
  { slug: "double-cleansing", title: "Double Cleansing Without Stripping Your Skin", excerpt: "A gentle two-step method for a soft, balanced barrier.", date: "2026-06-30", read: "4 min" },
  { slug: "sakura-science", title: "Sakura Extract: The Science Behind the Petal", excerpt: "How cherry blossom polyphenols help calm and brighten.", date: "2026-06-02", read: "5 min" },
];

export const TESTIMONIALS = [
  { name: "Nusrat A.", city: "Dhaka", text: "My skin has never looked calmer. The serum absorbs beautifully and the packaging feels like a gift." },
  { name: "Farhana K.", city: "Chattogram", text: "Authentic Japanese products, delivered fast with cash on delivery. Exactly what I was looking for." },
  { name: "Tasnim R.", city: "Sylhet", text: "The essence transformed my dry patches in two weeks. Genuinely premium quality." },
];
