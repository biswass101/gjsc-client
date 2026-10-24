export interface CategoryMeta {
  slug: string;
  title: string;
  japaneseTitle: string;
  tagline: string;
  description: string;
  metaDescription: string;
  subcategories: string[];
  matchedCategories: string[];
  aliases: string[];
}

export const CATEGORY_DEFINITIONS: CategoryMeta[] = [
  {
    slug: "skin-care",
    title: "Skin Care",
    japaneseTitle: "スキンケア · Tokyo Rituals",
    tagline: "The Art of Gentle Layering & Barrier Reverence",
    description:
      "Curated directly from verified Tokyo laboratories, our authentic Japanese skincare rituals center on gentle double cleansing, slow-fermented rice essences, brightening sakura polyphenols, and weightless hyaluronic hydration. Dermatologist reviewed for calm, dewy, radiant skin across Bangladesh's climate.",
    metaDescription:
      "Shop authentic Japanese skincare in Bangladesh. Tokyo-formulated serums, essences, cleansers, toners and sunscreens with Cash on Delivery nationwide.",
    subcategories: [
      "All",
      "Serum",
      "Cleanser",
      "Face Wash",
      "Essence",
      "Moisturizer",
      "Toner",
      "Sunscreen",
      "Face Mask",
      "Eye Care",
      "Lip Care",
    ],
    matchedCategories: [
      "Serum",
      "Cleanser",
      "Face Wash",
      "Essence",
      "Moisturizer",
      "Toner",
      "Sunscreen",
      "Eye Care",
      "Lip Care",
      "Face Mask",
      "Skincare",
    ],
    aliases: ["skin-care", "skin care", "skincare", "skin"],
  },
  {
    slug: "hair-care",
    title: "Hair Care",
    japaneseTitle: "ヘアケア · Camellia Silk Care",
    tagline: "Nourished Roots & Glass-Gloss Shine",
    description:
      "Experience Japan's famous hair ceremony. Infused with pure Oshima island camellia seed oil, royal jelly, and hydrolyzed silk peptides, our Japanese shampoos, hair masks, and repair elixirs mend split ends, tame humidity frizz, and restore mirror-like gloss from scalp to tip.",
    metaDescription:
      "Buy genuine Japanese hair care in Bangladesh: Tsubaki, Fino, &honey, and Oshima Camellia oils for smooth, healthy hair.",
    subcategories: [
      "All",
      "Hair Oil & Serum",
      "Hair Mask & Treatment",
      "Scalp Care",
    ],
    matchedCategories: ["Hair Care", "Hair"],
    aliases: ["hair-care", "hair care", "haircare", "hair"],
  },
  {
    slug: "body-care",
    title: "Body Care",
    japaneseTitle: "ボディケア · Japanese Onsen Bath",
    tagline: "Deep Hydration from Tokyo Thermal Springs",
    description:
      "Turn your daily shower into a calming onsen ritual. Our Japanese body washes, Hinoki cypress milks, and ceramide lotions lock in moisture for 72 hours, soothe dry skin, and leave a faint, comforting whisper of Japanese botanicals.",
    metaDescription:
      "Authentic Japanese body care in Bangladesh. Hinoki body lotions, Bouncia foam soaps, and Curel ceramide washes delivered to your door.",
    subcategories: [
      "All",
      "Body Lotion & Milk",
      "Body Soap & Wash",
      "Body Scrub",
      "Hand Care",
    ],
    matchedCategories: ["Body Care", "Body"],
    aliases: ["body-care", "body care", "bodycare", "body"],
  },
  {
    slug: "makeup",
    title: "Makeup",
    japaneseTitle: "メイクアップ · Dewy J-Beauty",
    tagline: "Luminous, Breathable, Second-Skin Glow",
    description:
      "Japanese makeup celebrates natural radiance and effortless wear. From featherlight cushion foundations that never crease to waterproof tubing mascaras and sheer watercolor cheek tints, achieve the coveted Tokyo glass-skin finish with formulas that care for your skin.",
    metaDescription:
      "Buy authentic Japanese makeup in Bangladesh: cushion foundation, smudge-free mascaras, cheek tints, and lip glosses from Tokyo.",
    subcategories: [
      "All",
      "Cushion Foundation",
      "Cheek Tint & Blush",
      "Mascara & Eyes",
      "Lip Color",
    ],
    matchedCategories: ["Makeup", "Lip Care"],
    aliases: ["makeup", "make up", "cosmetics"],
  },
  {
    slug: "baby-care",
    title: "Baby Care",
    japaneseTitle: "ベビーケア · Ultra-Gentle Care",
    tagline: "Pediatrician-Tested for Delicate Infant Skin",
    description:
      "Formulated to the world's most stringent Japanese safety standards, our baby essentials are 100% fragrance-free, hypoallergenic, and enriched with biomimetic ceramides and chamomile. Designed for newborns, toddlers, and sensitive family members.",
    metaDescription:
      "Gentle Japanese baby care products in Bangladesh: Pigeon, Mama & Kids, and Wakodo baby lotion, washes, and barrier balms.",
    subcategories: [
      "All",
      "Baby Lotion & Milk",
      "Baby Wash & Foam",
      "Baby Powder",
      "Barrier Balm",
    ],
    matchedCategories: ["Baby Care", "Baby"],
    aliases: ["baby-care", "baby care", "babycare", "baby"],
  },
  {
    slug: "accessories",
    title: "Beauty Accessories",
    japaneseTitle: "アクセサリ · Ritual Tools",
    tagline: "Traditional Tools for Elevated Daily Skincare",
    description:
      "Elevate your ritual with handcrafted beauty tools. Discover authentic Japanese jade rollers, natural Konjac charcoal cleansing sponges, 100% pure unbleached cotton pads from Hiroshima, and pure mulberry silk sleep bands.",
    metaDescription:
      "Authentic Japanese skincare tools and accessories in Bangladesh: jade rollers, Konjac sponges, silk scrunchies, and cotton pads.",
    subcategories: [
      "All",
      "Facial Rollers & Gua Sha",
      "Cotton & Sponges",
      "Silk Hair Care",
    ],
    matchedCategories: ["Beauty Accessories", "Accessories"],
    aliases: ["accessories", "beauty-accessories", "beauty accessories", "tools"],
  },
  {
    slug: "gift-sets",
    title: "Gift Sets & Travel Kits",
    japaneseTitle: "ギフトセット · The Art of Omiyage",
    tagline: "Luxury Japanese Beauty Bundles & Travel Sets",
    description:
      "The perfect gift of radiant skin. Elegantly presented in Japanese gift boxes, our curated sets bring together full 4-step daily rituals and TSA-friendly travel miniatures to pamper yourself or someone special.",
    metaDescription:
      "Luxury Japanese skincare gift sets and travel kits in Bangladesh. Curated discovery boxes and holiday bundles.",
    subcategories: [
      "All",
      "Full Ritual Sets",
      "Travel Discovery Kits",
      "Hydration Bundles",
    ],
    matchedCategories: ["Gift Sets", "Travel Kits"],
    aliases: ["gift-sets", "gift sets", "gifts", "travel-kits", "travel kits"],
  },
  {
    slug: "face-mask",
    title: "Face Masks & Treatments",
    japaneseTitle: "フェイスマスク · Intensive Treatment",
    tagline: "Concentrated Botanical Serum Infusion",
    description:
      "Intensive 15-minute rescue for tired skin. Our Tokyo sheet masks and wash-off rice ferment packs drench your skin in concentrated hyaluronic acid, gold peptides, and vitamin C for immediate plumping, soothing, and glass-like clarity.",
    metaDescription:
      "Authentic Japanese sheet masks and wash-off treatments in Bangladesh: LuLuLun, Keana Rice Mask, and Gold Infusion packs.",
    subcategories: [
      "All",
      "Sheet Masks",
      "Wash-Off Mask Packs",
      "Brightening Masks",
      "Hydration Masks",
    ],
    matchedCategories: ["Face Mask"],
    aliases: ["face-mask", "face-masks", "face mask", "masks"],
  },
];

// Helper to normalize any incoming URL slug or parameter
export function normalizeCategorySlug(rawSlug: string): string {
  const decoded = decodeURIComponent(rawSlug).toLowerCase().trim();
  const slugified = decoded.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Match against known category definitions
  for (const def of CATEGORY_DEFINITIONS) {
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

  // Also check subcategory matches (e.g. "serum", "cleanser", etc.)
  return slugified;
}

export function getCategoryMeta(slug: string): CategoryMeta {
  const normalized = normalizeCategorySlug(slug);
  const found = CATEGORY_DEFINITIONS.find((c) => c.slug === normalized);
  if (found) return found;

  // Fallback dynamic definition for subcategories like "serum", "cleanser", etc.
  const cleanTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    slug: normalized,
    title: cleanTitle,
    japaneseTitle: `${cleanTitle} · 日本の美学`,
    tagline: "Authentic Tokyo Formulation & Rituals",
    description: `Explore our collection of authentic Japanese ${cleanTitle.toLowerCase()}, crafted in certified Tokyo partner laboratories and imported directly to Bangladesh with guaranteed authenticity.`,
    metaDescription: `Buy authentic Japanese ${cleanTitle.toLowerCase()} in Bangladesh. Cash on delivery & fast shipping across 64 districts.`,
    subcategories: ["All"],
    matchedCategories: [cleanTitle],
    aliases: [normalized],
  };
}

