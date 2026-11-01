import heroSpring from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import heroWhip from "@/assets/hero/Perfect Whip Fresh Beauty Ritual.png";
import heroSpa from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import heroCulture from "@/assets/hero/hero-japanses-culture-bg.png";
import { PRODUCT_IMAGES } from "@/lib/catalog";
import type { BrandMeta } from "./types";

export const BRAND_DEFS_M_TO_P: BrandMeta[] = [
  // M
  {
    name: "Melano CC",
    slug: "melano-cc",
    kanji: "メラノCC",
    origin: "Osaka, Japan",
    tagline: "Rohto's best-selling pure Vitamin C essence for dark spots, acne scars, and pores.",
    description:
      "Melano CC is the undisputed champion of Japanese brightening. Using Rohto's patented anhydrous formula, it stabilizes active pure L-Ascorbic Acid to penetrate deep into melanin roots.",
    category: "Targeted Brightening",
    image: PRODUCT_IMAGES[4]!,
    bannerImage: heroWhip.src,
    established: "Est. 2005",
    featured: true,
    aliases: ["melano-cc", "melanocc", "rohto-melano-cc"],
    keyIngredients: [
      "Active Vitamin C (Ascorbic Acid)",
      "Vitamin E Derivative",
      "Alpinia White Extract",
    ],
    philosophies: [
      "Direct Melanin Targeting",
      "Patented No-Air Micro-Nozzle",
      "Visible Texture Smoothing",
    ],
  },
  {
    name: "Minon Amino Moist",
    slug: "minon-amino-moist",
    kanji: "ミノン",
    origin: "Tokyo, Japan",
    tagline: "9 essential amino acids designed specifically for sensitive, dry skin barriers.",
    description:
      "Formulated by Daiichi Sankyo Healthcare, Minon Amino Moist hydrates reactive skin with 9 amino acids that mimic the skin's natural moisturizing factor (NMF), preventing tightness and irritation.",
    category: "Hypoallergenic Derma",
    image: PRODUCT_IMAGES[5]!,
    bannerImage: heroSpa.src,
    established: "Est. 1973",
    aliases: ["minon-amino-moist", "minon", "daiichi-sankyo-minon"],
    keyIngredients: ["9 Natural Amino Acids", "Hyaluronic Acid", "Squalane"],
    philosophies: [
      "Hypoallergenic Safety",
      "Mimics Natural Skin Lipids",
      "Gentle Protective Shield",
    ],
  },
  {
    name: "Muhi Baby",
    slug: "muhi-baby",
    kanji: "ムヒ",
    origin: "Toyama, Japan",
    tagline: "Ultra-gentle soothing balms and anti-itch creams for delicate baby and adult skin.",
    description:
      "Manufactured in Toyama's medicine heartland by Ikeda Mohando, Muhi Baby relieves insect bites, heat rash, and irritation with non-steroidal, hypoallergenic cooling agents.",
    category: "Gentle Family Care",
    image: PRODUCT_IMAGES[6]!,
    bannerImage: heroSpring.src,
    established: "Est. 1909",
    aliases: ["muhi-baby", "muhi", "ikeda-mohando"],
    keyIngredients: ["Diphenhydramine", "Glycyrrhetinic Acid", "Panthenol"],
    philosophies: ["Non-Steroidal Safety", "Instant Relief", "Infant Certified"],
  },

  // N
  {
    name: "Naturie",
    slug: "naturie",
    kanji: "ナチュリエ",
    origin: "Tokyo, Japan",
    tagline: "Japan's #1 Hatomugi pearl barley skin conditioner and soothing moisture gel.",
    description:
      "Naturie Hatomugi Skin Conditioner is a Japanese cultural staple. Infused with natural coix seed extract, it delivers a deluge of non-sticky hydration to soothe sun-exposed and textured skin.",
    category: "Hatomugi Care",
    image: PRODUCT_IMAGES[7]!,
    bannerImage: heroWhip.src,
    established: "Est. 2002",
    featured: true,
    aliases: ["naturie", "naturie-hatomugi", "hatomugi", "imju"],
    keyIngredients: [
      "Natural Coix Seed Extract (Job's Tears)",
      "Dipotassium Glycyrrhizate",
      "Water Matrix",
    ],
    philosophies: ["Generous Everyday Hydration", "Calms Redness & Heat", "Zero Stickiness"],
  },
  {
    name: "Nivea Japan",
    slug: "nivea-japan",
    kanji: "ニベア花王",
    origin: "Tokyo, Japan",
    tagline: "Exclusive Japanese UV water gel sunscreens and rich protective barrier creams.",
    description:
      "Produced exclusively by Kao in Japan, Nivea Japan formulations are completely distinct from European versions — famed worldwide for their water-bursting UV Protect Water Gels.",
    category: "Hydra Sun & Body",
    image: PRODUCT_IMAGES[8]!,
    bannerImage: heroSpa.src,
    established: "Est. 1968",
    aliases: ["nivea-japan", "nivea-kao", "nivea"],
    keyIngredients: ["Hyaluronic Acid", "Phellodendron Bark Extract", "SPF50+ PA+++ Water Gel"],
    philosophies: [
      "Bursts Like Water On Skin",
      "Featherweight Everyday Defense",
      "Deep Cutaneous Comfort",
    ],
  },

  // O
  {
    name: "Orbis",
    slug: "orbis",
    kanji: "オルビス",
    origin: "Tokyo, Japan",
    tagline: "100% oil-free dermatological formulations and barrier-activating moisture essences.",
    description:
      "Part of the POLA Orbis Group, Orbis is celebrated for its 100% oil-free philosophy. Its Defencera line was Japan's first government-approved oral beauty product for barrier moisture retention.",
    category: "Oil-Free Specialist",
    image: PRODUCT_IMAGES[9]!,
    bannerImage: heroSpring.src,
    established: "Est. 1984",
    aliases: ["orbis", "orbis-japan"],
    keyIngredients: ["DF-Ceramides", "Corn Extract", "Trehalose"],
    philosophies: ["Oil-Free Purity", "Science of Barrier Defense", "Breathe Freely"],
  },
  {
    name: "Oshima Tsubaki",
    slug: "oshima-tsubaki",
    kanji: "大島椿",
    origin: "Tokyo, Japan",
    tagline: "100% natural cold-pressed camellia seed oil for lustrous hair and skin since 1927.",
    description:
      "Sourced from the sun-drenched volcanic soil of Izu Oshima island, Oshima Tsubaki is Japan's most historic 100% pure camellia seed oil, rich in oleic acid triglycerides to lock in shine.",
    category: "Heritage Camellia Oil",
    image: PRODUCT_IMAGES[10]!,
    bannerImage: heroCulture.src,
    established: "Est. 1927",
    aliases: ["oshima-tsubaki", "tsubaki-oil", "oshima"],
    keyIngredients: ["100% Pure Camellia Japonica Seed Oil", "Oleic Acid (approx. 85%)"],
    philosophies: ["Single Ingredient Mastery", "Pure Cold Pressing", "Heirloom Gloss & Strength"],
  },

  // P
  {
    name: "Pigeon",
    slug: "pigeon",
    kanji: "ピジョン",
    origin: "Tokyo, Japan",
    tagline: "Trusted gentle skincare, newborn baby washes, and hypoallergenic moisturisers.",
    description:
      "Japan's most trusted maternal and infant brand for over 65 years, Pigeon crafts ultra-mild, tear-free foam cleansers and ceramide-infused baby lotions loved by adults with hyper-sensitive skin.",
    category: "Maternal & Baby Care",
    image: PRODUCT_IMAGES[11]!,
    bannerImage: heroSpring.src,
    established: "Est. 1957",
    featured: true,
    aliases: ["pigeon", "pigeon-japan"],
    keyIngredients: ["Baby Ceramides", "Cholesteryl Isostearate", "Hyaluronate"],
    philosophies: ["Mother's Loving Touch", "Tear-Free Hypoallergenic", "Gentlest Daily Care"],
  },
  {
    name: "POLA",
    slug: "pola",
    kanji: "ポーラ",
    origin: "Ginza, Tokyo",
    tagline: "Prestige anti-aging Nobel-prize inspired cellular repair beauty.",
    description:
      "POLA's ultra-luxury B.A (Bio-Active) series revolutionized cosmetic science by discovering anti-glycation mechanisms that prevent skin sagging and yellowing, restoring youthful firmness.",
    category: "High Prestige Bio-Active",
    image: PRODUCT_IMAGES[12]!,
    bannerImage: heroSpa.src,
    established: "Est. 1929",
    aliases: ["pola", "pola-japan", "pola-ba"],
    keyIngredients: ["Golden Silk Extract", "B.A Core Complex", "Epigenetic Peptides"],
    philosophies: [
      "Bio-Active Cellular Awakening",
      "Anti-Glycation Mastery",
      "Unrivaled Luxury Texture",
    ],
  },
];

