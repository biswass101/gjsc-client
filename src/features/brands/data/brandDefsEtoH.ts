import bGlorious from "@/assets/brands/glorious-japan.jpg";
import bHikari from "@/assets/brands/hikari-beauty.jpg";
import bHada from "@/assets/brands/hada-labo.jpg";
import heroSpring from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import heroWhip from "@/assets/hero/Perfect Whip Fresh Beauty Ritual.png";
import heroSakura from "@/assets/hero/hero-sakura.png";
import heroSpa from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import heroCulture from "@/assets/hero/hero-japanses-culture-bg.png";
import { PRODUCT_IMAGES } from "@/lib/catalog";
import type { BrandMeta } from "./types";

export const BRAND_DEFS_E_TO_H: BrandMeta[] = [
  // E
  {
    name: "Elixir Superieur",
    slug: "elixir-superieur",
    kanji: "エリクシール",
    origin: "Tokyo, Japan",
    tagline:
      "Shiseido's collagen science pioneer creating the signature 'Tsuyadama' luminous pearl cheek glow.",
    description:
      "Japan's best-selling anti-aging skincare line for 15+ consecutive years, Elixir utilizes proprietary collagen-metabolism science to impart plump, bouncy resilience with radiant light-reflecting cheeks.",
    category: "Collagen Anti-Aging",
    image: PRODUCT_IMAGES[6]!,
    bannerImage: heroSpring.src,
    established: "Est. 1983",
    aliases: ["elixir-superieur", "elixir", "shiseido-elixir"],
    keyIngredients: ["Watercress Extract", "Hydrolyzed Collagen Glycine", "M-Tranexamic Acid"],
    philosophies: ["Tsuyadama Pearl Glow", "Deep Collagen Density", "Firm Radiant Contours"],
  },
  {
    name: "Excel Tokyo",
    slug: "excel-tokyo",
    kanji: "エクセル",
    origin: "Tokyo, Japan",
    tagline: "Chic Tokyo trendsetting textures, featherlight brow pencils, and creamy eyeshadows.",
    description:
      "Produced by Noevir in Tokyo, Excel is celebrated for silky Skinny Rich Shadows that flatter Asian skin tones with micro-pearl shimmer and effortless application.",
    category: "Trend Makeup",
    image: PRODUCT_IMAGES[7]!,
    bannerImage: heroSakura.src,
    established: "Est. 1987",
    aliases: ["excel-tokyo", "excel", "excel-makeup"],
    keyIngredients: ["Squalane", "Gold Pearl Pigments", "Silk Powder"],
    philosophies: ["Effortless Sophistication", "Velvety Blending", "Everyday Luxury"],
  },

  // F
  {
    name: "FANCL",
    slug: "fancl",
    kanji: "ファンケル",
    origin: "Yokohama, Japan",
    tagline: "100% preservative-free, sterile-sealed skincare and cult mild cleansing oil.",
    description:
      "Pioneers of preservative-free cosmetics, FANCL packages its products in sterile hermetic bottles, preventing friction and oxidation to deliver pure active nourishment to sensitive complexions.",
    category: "Preservative-Free",
    image: PRODUCT_IMAGES[8]!,
    bannerImage: heroSpa.src,
    established: "Est. 1980",
    featured: true,
    aliases: ["fancl", "fancl-japan"],
    keyIngredients: ["Aged Hop Extract", "Meadowfoam Seed Oil", "Green Tea Catechins"],
    philosophies: [
      "Mutenka (Preservative-Free)",
      "Hermetically Sealed Purity",
      "Pore Frictionless Cleansing",
    ],
  },
  {
    name: "Fino",
    slug: "fino",
    kanji: "フィーノ",
    origin: "Tokyo, Japan",
    tagline: "Shiseido's salon-grade Premium Touch royal jelly hair masks and restorative oils.",
    description:
      "Fino is Asia's most coveted hair mask treatment, combining royal jelly EX, trehalose, and PCA to melt into heat-damaged, frizzy strands and restore liquid-silk smoothness.",
    category: "Intensive Hair Care",
    image: PRODUCT_IMAGES[9]!,
    bannerImage: heroWhip.src,
    established: "Est. 2004",
    featured: true,
    aliases: ["fino", "shiseido-fino"],
    keyIngredients: ["Royal Jelly EX", "Trehalose + Sorbitol", "PCA & Squalane"],
    philosophies: ["Salon-Grade Restoration", "Melt-In Cuticle Bonding", "Liquid Silk Finish"],
  },

  // G
  {
    name: "Glorious Japan",
    slug: "glorious-japan",
    kanji: "栄光日本",
    origin: "Tokyo, Japan",
    tagline: "Slow-fermented rice and sakura botanicals crafted for daily calm and glass skin.",
    description:
      "Our signature in-house laboratory line crafted in Tokyo. Blending centuries-old Japanese temple botanicals, sake koji ferment, and mountain spring waters to restore equilibrium to city-stressed skin.",
    category: "Signature House",
    image: bGlorious.src,
    bannerImage: heroSpring.src,
    established: "Est. 2018",
    featured: true,
    aliases: ["glorious-japan", "glorious", "glorious-skincare"],
    keyIngredients: ["Sakura Petal Extract", "Rice Ferment Filtrate", "Camellia Seed Oil"],
    philosophies: ["Slow Fermentation", "Harmonious Simplicity", "Radiant Glass Clarity"],
  },
  {
    name: "GATSBY",
    slug: "gatsby",
    kanji: "ギャツビー",
    origin: "Osaka, Japan",
    tagline: "Premier Japanese men's grooming, cooling facial wipes, and styling essentials.",
    description:
      "Mandom's celebrated grooming brand provides refreshing carbonated face washes, ultra-cooling oil-control facial sheets, and hair styling waxes designed for active Asian men.",
    category: "Men's Grooming",
    image: PRODUCT_IMAGES[10]!,
    bannerImage: heroCulture.src,
    established: "Est. 1978",
    aliases: ["gatsby", "mandom-gatsby"],
    keyIngredients: ["Menthol", "Witch Hazel", "Sebum Absorbing Powder"],
    philosophies: ["Instant Cooling Freshness", "Oil-Free Comfort", "Urban Confidence"],
  },

  // H
  {
    name: "Hada Labo",
    slug: "hada-labo",
    kanji: "肌ラボ",
    origin: "Osaka, Japan",
    tagline: "Gold-standard multi-molecular hyaluronic acid hydration for bouncy mochi skin.",
    description:
      "Developed under pharmaceutical principles by Rohto Pharmaceutical, Hada Labo eliminates all unnecessary additives, colorants, and fragrances, focusing exclusively on deep, weightless hydration with up to 7 molecular sizes of hyaluronic acid.",
    category: "Hydration Pioneer",
    image: bHada.src,
    bannerImage: heroWhip.src,
    established: "Est. 2004",
    featured: true,
    aliases: ["hada-labo", "hadalabo", "rohto-hada-labo"],
    keyIngredients: ["Fermented Hyaluronic Acid", "Super Hyaluronic Acid", "Nano Hyaluronic Acid"],
    philosophies: ["Perfect x Simple", "Mochi Bouncy Hydration", "Zero Fillers"],
  },
  {
    name: "Hikari Beauty",
    slug: "hikari-beauty",
    kanji: "光美研",
    origin: "Osaka, Japan",
    tagline: "Featherlight sun shields and modern multi-barrier repair essences.",
    description:
      "Created in Osaka, Hikari Beauty focuses on featherlight textures, antioxidant yuzu extracts, and non-comedogenic sun filters that feel completely weightless under South Asian humidity.",
    category: "Sun & Barrier",
    image: bHikari.src,
    bannerImage: heroSpring.src,
    established: "Est. 2017",
    featured: true,
    aliases: ["hikari-beauty", "hikari"],
    keyIngredients: ["Broad Spectrum SPF50 Filters", "Yuzu Ceramide", "Cica Extract"],
    philosophies: ["Weightless UV Shield", "Non-Greasy Matte Finish", "Modern Urban Defense"],
  },
  {
    name: "Heroine Make",
    slug: "heroine-make",
    kanji: "ヒロインメイク",
    origin: "Tokyo, Japan",
    tagline: "Isehan's legendary waterproof mascaras and tear-proof liquid eyeliner pens.",
    description:
      "Kiss Me Heroine Make is universally acclaimed as the most bulletproof Japanese eye makeup in existence. Its curl-lock mascaras and ultra-fine liquid pens resist tears, sweat, and sebum completely.",
    category: "Longwear Eye Makeup",
    image: PRODUCT_IMAGES[11]!,
    bannerImage: heroSakura.src,
    established: "Est. 2005",
    featured: true,
    aliases: ["heroine-make", "kiss-me-heroine-make", "kiss-me", "isehan"],
    keyIngredients: ["Super Waterproof Polymers", "Camellia Oil", "Royal Jelly Extract"],
    philosophies: ["Unshakeable All-Day Curl", "Tear-Proof Reliability", "Dramatic Definition"],
  },
];

