import heroSpring from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import heroWhip from "@/assets/hero/Perfect Whip Fresh Beauty Ritual.png";
import heroSpa from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import heroSakuraPink from "@/assets/hero/hero-sakura-pink.png";
import heroSakuraTrio from "@/assets/hero/sakura-spa-skincare-trio.png";
import heroCulture from "@/assets/hero/hero-japanses-culture-bg.png";
import type { CollectionMeta } from "./types";

export const PRIMARY_COLLECTIONS: CollectionMeta[] = [
  {
    slug: "bestsellers",
    title: "Best Sellers",
    japaneseTitle: "ベストセラー · Tokyo Most Loved",
    tagline: "Japan's Most Revered Skincare Formulas & Daily Icons",
    description:
      "Discover Bangladesh's most cherished Japanese beauty icons. Clinically revered formulations tested and celebrated for delivering luminous, calm, dewy skin. Dermatologically verified and 100% authentic Tokyo imports.",
    metaDescription:
      "Shop top-selling Japanese beauty & skincare products in Bangladesh. Highest rated Tokyo essences, serums, moisturizers, and sunscreens.",
    badgeText: "Verified Top Rated · 50,000+ Reviews",
    themeColor: "text-amber-500",
    gradientClass: "from-amber-500/15 via-rose-500/10 to-transparent",
    bannerImage: heroWhip.src,
    frequentlySearched: [
      "Sakura Radiance Serum",
      "Hada Labo Lotion",
      "Fino Hair Mask",
      "Biore UV Watery SPF50",
      "Silk Rice Cleanser",
      "Curel Ceramide Lotion",
      "LuLuLun Face Mask",
      "Deep Hydration Cream",
    ],
    aliases: ["bestsellers", "best-sellers", "best-seller", "bestseller", "most-popular"],
    filterPredicate: (p) => p.badge === "Best Seller" || p.rating >= 4.7 || p.reviews >= 70,
  },
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    japaneseTitle: "新入荷 · Fresh Tokyo Formulations",
    tagline: "Just Landed from Tokyo: Next-Generation J-Beauty Innovations",
    description:
      "Fresh arrivals straight from Japanese laboratories in Tokyo and Kyoto. Explore our latest seasonal drops featuring fermented botanicals, cutting-edge barrier technologies, and luminous seasonal formulations.",
    metaDescription:
      "Explore the latest Japanese skincare and beauty releases in Bangladesh. Fresh arrivals directly flown from Tokyo laboratories.",
    badgeText: "Just Landed · Tokyo Fresh Batch",
    themeColor: "text-emerald-500",
    gradientClass: "from-emerald-500/15 via-primary/10 to-transparent",
    bannerImage: heroSpring.src,
    frequentlySearched: [
      "Yuzu Glow Essence",
      "Opera Lip Tint Rouge",
      "Canmake Cream Cheek",
      "Madonna Organic Balm",
      "Camellia Hand Milk",
      "Tokyo Ferment Vault",
      "Mulberry Silk Mask",
    ],
    aliases: ["new-arrivals", "new arrivals", "new-arrival", "new", "latest"],
    filterPredicate: (p) => p.badge === "New" || p.badge === "Trending" || Number(p.id) > 25,
  },
  {
    slug: "trending",
    title: "Trending Now",
    japaneseTitle: "トレンド · Viral Tokyo Sensations",
    tagline: "Formulas Winning Hearts Across Bangladesh This Week",
    description:
      "Explore the most-coveted Japanese beauty formulas currently captivating skincare lovers. Viral sensations, high-performance daily essentials, and beloved Japanese customer favorites.",
    metaDescription:
      "Shop trending Japanese skincare and beauty sensations in Bangladesh. Top-rated viral Tokyo formulas.",
    badgeText: "Viral Sensations · High Demand",
    themeColor: "text-amber-500",
    gradientClass: "from-amber-500/15 via-rose-500/10 to-transparent",
    bannerImage: heroSpring.src,
    frequentlySearched: [
      "Sakura Radiance Serum",
      "Hikari UV Shield",
      "Koji Ferment Moisture Cream",
      "Matcha Clarifying Toner",
      "Silk Rice Cleanser",
      "Hinoki Body Milk",
    ],
    aliases: ["trending", "trending-now", "popular-now", "viral"],
    filterPredicate: (p) => p.badge === "Trending" || p.rating >= 4.7 || p.reviews >= 80,
  },
  {
    slug: "combo-gift-sets",
    title: "Combo & Gift Sets",
    japaneseTitle: "ギフトセット · The Art of Japanese Omiyage",
    tagline: "Curated Complete Rituals & Luxurious Beauty Bundles",
    description:
      "Experience the Japanese tradition of Omiyage with our luxury gift sets and multi-step routine boxes. Beautifully presented with complete rituals for deep hydration, anti-aging, and skin brightening with up to 25% bundle savings.",
    metaDescription:
      "Buy authentic Japanese skincare gift sets and routine combos in Bangladesh. Handcrafted bundles with Cash on Delivery nationwide.",
    badgeText: "Save up to 25% · Luxury Gift Boxed",
    themeColor: "text-pink-500",
    gradientClass: "from-pink-500/15 via-purple-500/10 to-transparent",
    bannerImage: heroSakuraTrio.src,
    frequentlySearched: [
      "Full Ritual Sets",
      "Hydration Discovery",
      "Anti-Aging Vault",
      "Travel Kits",
      "Double Cleansing Duo",
      "Silk Scrunchie Set",
    ],
    aliases: ["combo-gift-sets", "combo and gift sets", "gift-sets", "gift sets", "combos", "sets"],
    filterPredicate: (p) =>
      p.category === "Gift Sets" ||
      p.category === "Travel Kits" ||
      p.name.toLowerCase().includes("set") ||
      p.name.toLowerCase().includes("kit") ||
      p.name.toLowerCase().includes("trio") ||
      p.name.toLowerCase().includes("pack") ||
      Boolean(p.compareAt && p.compareAt - p.price >= 800),
  },
  {
    slug: "skin-concern",
    title: "Shop by Skin Concern",
    japaneseTitle: "肌悩み別 · Targeted Barrier Solutions",
    tagline: "Clinically Proven Formulations for Targeted Skin Transformation",
    description:
      "Find precise solutions tailored to your unique skin needs. Whether you are soothing persistent redness, combating stubborn acne, fading post-sun dark spots, or strengthening compromised barriers, our authentic Japanese targeted treatments deliver visible results.",
    metaDescription:
      "Targeted Japanese skincare solutions in Bangladesh: Acne, dark spots, sensitive skin, anti-aging, and deep hydration.",
    badgeText: "Targeted Formulations · Dermatologist Tested",
    themeColor: "text-blue-500",
    gradientClass: "from-blue-500/15 via-primary/10 to-transparent",
    bannerImage: heroSpa.src,
    frequentlySearched: [
      "Acne & Blemish",
      "Dark Spots & Pigmentation",
      "Hydration & Dry Patches",
      "Anti-Aging & Firming",
      "Enlarged Pores",
      "Sensitive & Redness",
      "Barrier Repair",
    ],
    aliases: ["skin-concern", "skin concern", "concerns", "shop-by-skin-concern", "skin-concerns"],
    filterPredicate: (p) => p.concerns && p.concerns.length > 0,
  },
  {
    slug: "shein",
    title: "SHEIN Products",
    japaneseTitle: "SHEINビューティー · Global Viral Beauty",
    tagline: "Accessible Glamour & Second-Skin Modern Essentials",
    description:
      "Curated collection of viral SHEIN beauty favorites, glowing foundations, creamy lip colors, and delicate hair accessories that blend effortless glamour with everyday practicality.",
    metaDescription:
      "Shop viral SHEIN beauty, cushion foundations, and accessories in Bangladesh with fast nationwide delivery.",
    badgeText: "Trending Worldwide · Everyday Value",
    themeColor: "text-indigo-500",
    gradientClass: "from-indigo-500/15 via-rose-500/10 to-transparent",
    bannerImage: heroSakuraPink.src,
    frequentlySearched: [
      "Cushion Foundation",
      "Matte Liquid Lipstick",
      "Pearl Hair Claw Clip",
      "Shimmer Glow Oil",
      "Volumizing Mascara",
      "Silk Scrunchie Trio",
    ],
    aliases: ["shein", "shein-products", "shein beauty"],
    filterPredicate: (p) => p.type === "shein" || p.brand.toLowerCase() === "shein",
  },
  {
    slug: "pre-order-japan",
    title: "Pre-Order from Japan",
    japaneseTitle: "日本直送 · Reserved Direct from Tokyo",
    tagline: "Exclusive Tokyo Apothecary Releases Reserved Fresh for You",
    description:
      "Reserve rare cult Japanese beauty elixirs directly sourced from Tokyo department stores and apothecary shelves. Guaranteed authentic, fresh production batches flown in with white-glove logistics.",
    metaDescription:
      "Pre-order rare Japanese luxury skincare from Tokyo in Bangladesh: SK-II, Shiseido, Hada Labo, Biore, and DHC.",
    badgeText: "Air Freight Direct · 100% Guaranteed Authentic",
    themeColor: "text-red-500",
    gradientClass: "from-red-500/15 via-amber-500/10 to-transparent",
    bannerImage: heroCulture.src,
    frequentlySearched: [
      "SK-II Pitera Essence",
      "Shiseido Ultimune",
      "Hada Labo Gokujyun",
      "DHC Cleansing Oil",
      "Biore UV Watery",
      "Kose Brightening Mask",
    ],
    aliases: ["pre-order-japan", "pre order japan", "pre-order", "preorder", "japan-direct"],
    filterPredicate: (p) => p.type === "pre-order-japan" || p.price > 9000,
  },
];

