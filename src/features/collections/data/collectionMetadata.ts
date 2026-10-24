import type { Product } from "@/types";
import heroSpring from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import heroWhip from "@/assets/hero/Perfect Whip Fresh Beauty Ritual.png";
import heroSakura from "@/assets/hero/hero-sakura.png";
import heroSakuraPink from "@/assets/hero/hero-sakura-pink.png";
import heroSpa from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import heroPuja from "@/assets/hero/puja-sale.png";
import heroSerenity from "@/assets/hero/Japanese Skincare Serenity Trio.png";
import heroSerenity1 from "@/assets/hero/Japanese Skincare Serenity Trio (1).png";
import heroSakuraTrio from "@/assets/hero/sakura-spa-skincare-trio.png";
import heroCozy from "@/assets/hero/Cozy Japanese Skincare Routine.png";
import heroCulture from "@/assets/hero/hero-japanses-culture-bg.png";
import heroGirl from "@/assets/hero/hero-with-japanese-girl.png";

export interface CollectionMeta {
  slug: string;
  title: string;
  japaneseTitle: string;
  tagline: string;
  description: string;
  metaDescription: string;
  badgeText: string;
  themeColor: string;
  gradientClass: string;
  bannerImage: string;
  frequentlySearched: string[];
  aliases: string[];
  filterPredicate: (product: Product) => boolean;
}

export const COLLECTION_DEFINITIONS: CollectionMeta[] = [
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
    filterPredicate: (p) =>
      p.badge === "Best Seller" || p.rating >= 4.7 || p.reviews >= 70,
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
    filterPredicate: (p) =>
      p.badge === "New" || p.badge === "Trending" || Number(p.id) > 25,
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
    filterPredicate: (p) =>
      p.badge === "Trending" || p.rating >= 4.7 || p.reviews >= 80,
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
    aliases: [
      "combo-gift-sets",
      "combo and gift sets",
      "gift-sets",
      "gift sets",
      "combos",
      "sets",
    ],
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
    aliases: [
      "skin-concern",
      "skin concern",
      "concerns",
      "shop-by-skin-concern",
      "skin-concerns",
    ],
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
    filterPredicate: (p) =>
      p.type === "shein" || p.brand.toLowerCase() === "shein",
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
    aliases: [
      "pre-order-japan",
      "pre order japan",
      "pre-order",
      "preorder",
      "japan-direct",
    ],
    filterPredicate: (p) =>
      p.type === "pre-order-japan" || p.price > 9000,
  },
  {
    slug: "winter-essentials",
    title: "Winter Essentials",
    japaneseTitle: "冬の保湿 · Intensive Ceramide & Barrier Care",
    tagline: "Lock in 72-Hour Moisture & Shield Delicate Skin from Dry Winter Air",
    description:
      "Deeply restorative formulas enriched with Japanese rice ceramides, squalane, camellia oil, and soothing botanicals designed to combat cold-weather flakiness, chapped lips, and compromised skin barriers.",
    metaDescription:
      "Japanese winter skincare essentials in Bangladesh: rich ceramide moisturizers, lip treatments, and hydrating body lotions.",
    badgeText: "72h Barrier Lock · Deep Ceramide Infusion",
    themeColor: "text-sky-500",
    gradientClass: "from-sky-500/15 via-blue-500/10 to-transparent",
    bannerImage: heroCozy.src,
    frequentlySearched: [
      "Ceramide Body Lotion",
      "Koji Ferment Cream",
      "Camellia Hand Milk",
      "Sakura Lip Balm",
      "Fino Hair Mask",
      "Aurora Barrier Serum",
    ],
    aliases: ["winter-essentials", "winter essentials", "winter", "dry-skin-essentials"],
    filterPredicate: (p) =>
      p.category === "Moisturizer" ||
      p.category === "Body Care" ||
      p.category === "Lip Care" ||
      p.name.includes("Cream") ||
      p.name.includes("Barrier") ||
      p.name.includes("Moist") ||
      p.name.includes("Hydra"),
  },
  {
    slug: "summer-glow",
    title: "Summer Glow",
    japaneseTitle: "サマーグロウ · Featherlight Sun Defense & Dewy Radiance",
    tagline: "Non-Greasy SPF50 Shields & Weightless Dewy Hydration",
    description:
      "Japanese suncare is legendary for its watery, invisible textures. Explore SPF50+ PA++++ shields, clarifying matcha toners, and antioxidant vitamin C elixirs that keep your skin shine-free, hydrated, and protected from tropical humidity.",
    metaDescription:
      "Weightless Japanese summer skincare and SPF50 sunscreens in Bangladesh for humid weather and glowing skin.",
    badgeText: "SPF 50+ PA++++ · Sweat & Humidity Resistant",
    themeColor: "text-amber-500",
    gradientClass: "from-amber-400/20 via-orange-400/10 to-transparent",
    bannerImage: heroSakura.src,
    frequentlySearched: [
      "Biore UV Watery Essence",
      "Hikari UV Shield",
      "Matcha Clarifying Toner",
      "White Conc Vitamin C",
      "Yuzu Glow Essence",
      "Oil-Free Face Wash",
    ],
    aliases: ["summer-glow", "summer glow", "summer", "sun-protection"],
    filterPredicate: (p) =>
      p.category === "Sunscreen" ||
      p.category === "Toner" ||
      p.category === "Essence" ||
      p.category === "Cleanser" ||
      p.name.includes("UV") ||
      p.name.includes("Glow") ||
      p.name.includes("Light"),
  },
  {
    slug: "travel-size",
    title: "Travel Size",
    japaneseTitle: "トラベルサイズ · Portable Ritual Minis",
    tagline: "TSA-Friendly Luxury Minis for Flawless On-the-Go Radiance",
    description:
      "Compact, travel-ready skincare essentials and portable sets that fit effortlessly into your carry-on luggage. Never compromise your Japanese multi-step routine whether traveling abroad or away for the weekend.",
    metaDescription:
      "Travel-sized Japanese skincare, mini kits, and sheet masks in Bangladesh for portable beauty on the go.",
    badgeText: "TSA Approved · Travel Ready Sizes",
    themeColor: "text-teal-500",
    gradientClass: "from-teal-500/15 via-emerald-500/10 to-transparent",
    bannerImage: heroSerenity1.src,
    frequentlySearched: [
      "Sakura Travel Kit",
      "Sheet Masks",
      "Sakura Lip Balm",
      "Mulberry Silk Mask",
      "Unbleached Cotton",
      "Konjac Sponge",
    ],
    aliases: ["travel-size", "travel size", "travel", "minis", "travel-kits"],
    filterPredicate: (p) =>
      p.category === "Travel Kits" ||
      p.category === "Lip Care" ||
      p.category === "Face Mask" ||
      p.category === "Beauty Accessories" ||
      p.name.includes("Travel") ||
      p.price < 1500,
  },
  {
    slug: "value-sets",
    title: "Value Sets",
    japaneseTitle: "バリューセット · Maximum Routine Savings",
    tagline: "Bestselling Formulations Bundled with Exclusive Discounts",
    description:
      "Smart skincare bundles that give you the most comprehensive ritual at the best price. Featuring paired serums, double cleansing routines, and complete beauty boxes with generous price markdowns.",
    metaDescription:
      "Value skincare bundles and discounted beauty sets from Japan in Bangladesh with huge routine savings.",
    badgeText: "Special Bundle Pricing · Save Big",
    themeColor: "text-rose-500",
    gradientClass: "from-rose-500/15 via-amber-500/10 to-transparent",
    bannerImage: heroPuja.src,
    frequentlySearched: [
      "Glorious Ritual Set",
      "Sakura Discovery Set",
      "Tokyo Luxury Vault",
      "Hair Care Duo",
      "Double Cleansing Set",
    ],
    aliases: ["value-sets", "value sets", "bundles", "deals", "special-offers"],
    filterPredicate: (p) =>
      p.category === "Gift Sets" ||
      p.category === "Travel Kits" ||
      Boolean(p.compareAt && p.compareAt > p.price),
  },
  {
    slug: "k-beauty",
    title: "K-Beauty Picks",
    japaneseTitle: "Kビューティー · Korean Innovations & Glass Skin",
    tagline: "Cult-Favorite Korean Skincare & Makeup Formulations",
    description:
      "Curated Asian beauty stars known for luminous glass skin finishes, gentle centella soothing, and cushion bases. Perfect companions to your daily Japanese ritual.",
    metaDescription:
      "Shop top Korean skincare and makeup in Bangladesh. Dewy cushion foundations, sheet masks, and lip tints.",
    badgeText: "Viral Glass Skin · Dewy Finish Favorites",
    themeColor: "text-fuchsia-500",
    gradientClass: "from-fuchsia-500/15 via-rose-500/10 to-transparent",
    bannerImage: heroGirl.src,
    frequentlySearched: [
      "Glow Cushion Base",
      "Lip Tint Rouge",
      "LuLuLun Green Mask",
      "Keana Rice Pack",
      "Cream Cheek Tint",
    ],
    aliases: ["k-beauty", "k beauty", "korean-beauty", "korea"],
    filterPredicate: (p) =>
      p.category === "Makeup" ||
      p.category === "Face Mask" ||
      p.brand === "Canmake" ||
      p.name.includes("Cushion") ||
      p.name.includes("Tint"),
  },
  {
    slug: "j-beauty",
    title: "J-Beauty Picks",
    japaneseTitle: "和コスメ · Pure Japanese Botanical Wisdom",
    tagline: "Timeless Botanical Rituals & Slow-Fermented Mastery",
    description:
      "The absolute pinnacle of Japanese cosmetic art. Infused with centuries of botanical wisdom—fermented rice, sakura blossoms, green tea polyphenols, and camellia seed oils—crafted to honor your skin's natural barrier.",
    metaDescription:
      "Authentic Japanese skincare and cosmetics in Bangladesh: Shiseido, Hada Labo, Sakura Lab, and Tsubaki.",
    badgeText: "100% Authentic Tokyo · Pure Botanical Ferments",
    themeColor: "text-primary",
    gradientClass: "from-primary/15 via-champagne/15 to-transparent",
    bannerImage: heroSerenity.src,
    frequentlySearched: [
      "Sakura Radiance Serum",
      "Tsubaki Hair Mask",
      "Kyoto Botanicals",
      "Oshima Camellia Oil",
      "Hinoki Body Milk",
      "Bouncia Rich Foam",
    ],
    aliases: ["j-beauty", "j beauty", "japanese-beauty", "japan"],
    filterPredicate: (p) =>
      p.brand !== "SHEIN" &&
      (p.brand === "Glorious Japan" ||
        p.brand === "Sakura Lab" ||
        p.brand === "Kyoto Botanicals" ||
        p.brand === "Yuzu No Mori" ||
        p.brand === "Hikari Beauty" ||
        p.brand === "Shiseido" ||
        p.brand === "Hada Labo" ||
        p.brand === "Tsubaki" ||
        p.brand === "Curel" ||
        p.brand === "Pigeon" ||
        p.brand === "SK-II" ||
        p.brand === "DHC" ||
        p.brand === "Biore" ||
        p.brand === "Kose"),
  },
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

  const cleanTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

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
    frequentlySearched: [
      "Serums",
      "Hydration",
      "Sunscreen",
      "Cleansers",
      "Moisturizers",
    ],
    aliases: [normalized],
    filterPredicate: (p) =>
      p.name.toLowerCase().includes(normalized) ||
      p.category.toLowerCase().includes(normalized),
  };
}
