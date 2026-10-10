import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

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
};

export const CATEGORIES = [
  "Face Wash", "Cleanser", "Serum", "Essence", "Moisturizer", "Toner",
  "Sunscreen", "Eye Care", "Lip Care", "Face Mask", "Hair Care", "Body Care",
  "Beauty Accessories", "Makeup", "Gift Sets", "Travel Kits",
] as const;

export const SKIN_TYPES = ["Dry", "Oily", "Combination", "Sensitive", "Normal"] as const;

export const CONCERNS = [
  "Acne", "Dark Spots", "Pigmentation", "Anti Aging", "Hydration",
  "Brightening", "Large Pores", "Redness", "Sensitive Skin",
] as const;

export const BRANDS = ["Glorious Japan", "Sakura Lab", "Kyoto Botanicals", "Yuzu No Mori", "Hikari Beauty"] as const;

const IMAGES = [p1.src, p2.src, p3.src, p4.src, p5.src, p6.src];

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

export const PRODUCTS: Product[] = SEEDS.map(([name, category, price, compare, badge], i) => ({
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
}));

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
