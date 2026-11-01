import type { AdminCategory, AdminCollection } from "@/types";

export const INITIAL_CATEGORIES: AdminCategory[] = [
  {
    id: "cat-1",
    slug: "skin-care",
    title: "Skin Care",
    japaneseTitle: "スキンケア · Tokyo Rituals",
    tagline: "The Art of Gentle Layering & Barrier Reverence",
    description: "Gentle double cleansing, slow-fermented rice essences, and hyaluronic hydration.",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    parentCategory: "Skincare",
    subcategories: [
      "Serum",
      "Essence",
      "Moisturizer",
      "Toner",
      "Cleanser",
      "Face Wash",
      "Face Mask",
      "Eye Care",
      "Lip Care",
    ],
    featured: true,
    itemCount: 48,
  },
  {
    id: "cat-2",
    slug: "sunscreen",
    title: "Sunscreens & UV Defense",
    japaneseTitle: "日焼け止め · Broad Spectrum",
    tagline: "Weightless Tokyo Sun Milks with Zero White Cast",
    description:
      "Award-winning Japanese UV protection formulas with hyaluronic acid and sweat resistance.",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80",
    parentCategory: "Skincare",
    subcategories: ["Sun Milk", "Gel Sunscreen", "Watery Essence", "Mineral Sunscreen"],
    featured: true,
    itemCount: 24,
  },
  {
    id: "cat-3",
    slug: "hair-care",
    title: "Japanese Hair Rituals",
    japaneseTitle: "ヘアケア · Tsubaki & Fino",
    tagline: "Repairing Masks, Camellia Oils & Scalp Tonics",
    description:
      "Transformative Japanese hair repair formulas with royal jelly and camellia seed extract.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80",
    parentCategory: "Hair",
    subcategories: ["Hair Masks", "Hair Oils", "Shampoo", "Conditioner", "Scalp Care"],
    featured: true,
    itemCount: 19,
  },
  {
    id: "cat-4",
    slug: "cleansers",
    title: "Double Cleansing & Toners",
    japaneseTitle: "クレンジング · Pure Botanicals",
    tagline: "Melt away makeup without stripping the acid mantle",
    description: "Silky cleansing oils, amino acid washes, and balancing skin softeners.",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
    parentCategory: "Skincare",
    subcategories: ["Cleansing Oil", "Cleansing Balm", "Foaming Face Wash", "Micellar Water"],
    featured: true,
    itemCount: 32,
  },
  {
    id: "cat-5",
    slug: "gift-sets",
    title: "Combo & Gift Sets",
    japaneseTitle: "ギフトセット · Omiyage Vault",
    tagline: "Handcrafted Luxury Gift Boxes & Multi-Step Sets",
    description:
      "Complete Japanese beauty routines curated for deep hydration, anti-aging, and brightening.",
    image:
      "https://images.unsplash.com/photo-1512290900672-1f5be6b4f762?auto=format&fit=crop&w=400&q=80",
    parentCategory: "Gifts",
    subcategories: ["Hydration Sets", "Anti-Aging Trios", "Travel Kits", "Double Cleanse Duos"],
    featured: true,
    itemCount: 14,
  },
];

export const INITIAL_COLLECTIONS: AdminCollection[] = [
  {
    id: "col-1",
    slug: "bestsellers",
    title: "Best Sellers",
    japaneseTitle: "ベストセラー · Tokyo Most Loved",
    tagline: "Japan's Most Revered Skincare Formulas & Daily Icons",
    description:
      "Discover Bangladesh's most cherished Japanese beauty icons. Clinically verified Tokyo imports.",
    badgeText: "Verified Top Rated · 50,000+ Reviews",
    bannerImage:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
    themeColor: "text-amber-500",
    frequentlySearched: [
      "Sakura Radiance Serum",
      "Hada Labo Lotion",
      "Fino Hair Mask",
      "Anessa Perfect UV",
    ],
    featured: true,
    itemCount: 36,
  },
  {
    id: "col-2",
    slug: "new-arrivals",
    title: "New Arrivals",
    japaneseTitle: "新入荷 · Fresh Tokyo Formulations",
    tagline: "Just Landed from Tokyo: Next-Generation J-Beauty Innovations",
    description: "Fresh arrivals straight from Japanese laboratories in Tokyo and Kyoto.",
    badgeText: "Just Landed · Tokyo Fresh Batch",
    bannerImage:
      "https://images.unsplash.com/photo-1608248597359-2f5b40cf302a?auto=format&fit=crop&w=1200&q=80",
    themeColor: "text-emerald-500",
    frequentlySearched: ["Yuzu Glow Essence", "Opera Lip Tint", "Canmake Cream Cheek"],
    featured: true,
    itemCount: 22,
  },
  {
    id: "col-3",
    slug: "trending",
    title: "Trending Now",
    japaneseTitle: "トレンド · Viral Tokyo Sensations",
    tagline: "Formulas Winning Hearts Across Bangladesh This Week",
    description:
      "Explore the most-coveted Japanese beauty formulas currently captivating skincare lovers.",
    badgeText: "Viral Sensations · High Demand",
    bannerImage:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80",
    themeColor: "text-amber-500",
    frequentlySearched: [
      "Koji Ferment Moisture Cream",
      "Matcha Clarifying Toner",
      "Silk Rice Cleanser",
    ],
    featured: true,
    itemCount: 18,
  },
  {
    id: "col-4",
    slug: "combo-gift-sets",
    title: "Combo & Gift Sets",
    japaneseTitle: "ギフトセット · The Art of Japanese Omiyage",
    tagline: "Curated Complete Rituals & Luxurious Beauty Bundles",
    description:
      "Experience the Japanese tradition of Omiyage with our luxury gift sets with up to 25% savings.",
    badgeText: "Save up to 25% · Luxury Gift Boxed",
    bannerImage:
      "https://images.unsplash.com/photo-1512290900672-1f5be6b4f762?auto=format&fit=crop&w=1200&q=80",
    themeColor: "text-pink-500",
    frequentlySearched: ["Full Ritual Sets", "Hydration Discovery", "Double Cleansing Duo"],
    featured: true,
    itemCount: 12,
  },
];
