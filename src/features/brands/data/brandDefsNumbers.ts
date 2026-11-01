import heroSpring from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import heroWhip from "@/assets/hero/Perfect Whip Fresh Beauty Ritual.png";
import heroSakura from "@/assets/hero/hero-sakura.png";
import heroSpa from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import heroCulture from "@/assets/hero/hero-japanses-culture-bg.png";
import { PRODUCT_IMAGES } from "@/lib/catalog";
import type { BrandMeta } from "./types";

export const BRAND_DEFS_NUMBERS: BrandMeta[] = [
  // 1
  {
    name: "1Day Tattoo",
    slug: "1day-tattoo",
    kanji: "1日タトゥー",
    origin: "Tokyo, Japan",
    tagline: "Waterproof, smudge-free precision Japanese micro-pigment formulas.",
    description:
      "Formulated by K-Palette in Tokyo, 1Day Tattoo is celebrated for ultra-durable, waterproof eyeliners and brow liners that withstand Bangladesh's heat and humidity effortlessly.",
    category: "Precision Eyewear",
    image: PRODUCT_IMAGES[0]!,
    bannerImage: heroCulture.src,
    established: "Est. 2005",
    aliases: ["1day-tattoo", "1-day-tattoo", "k-palette", "kpalette"],
    keyIngredients: ["Micro-polymer emulsion", "Hyaluronic Acid", "Swertia Japonica Extract"],
    philosophies: ["All-Day Waterproof", "Zero Smudging", "Ultra-Fine Precision"],
  },
  {
    name: "100% Pure Japan",
    slug: "100-pure-japan",
    kanji: "100% ピュア",
    origin: "Hokkaido, Japan",
    tagline: "Raw organic botanical extracts cultivated in northern Japanese climates.",
    description:
      "Sourced from the pristine organic flora of Hokkaido, 100% Pure Japan captures wild angelica, snow fungus, and lavender waters into clean barrier formulas.",
    category: "Clean Botanicals",
    image: PRODUCT_IMAGES[1]!,
    bannerImage: heroSpring.src,
    established: "Est. 2012",
    aliases: ["100-pure-japan", "100-pure", "100pure"],
    keyIngredients: ["Hokkaido Snow Fungus", "Wild Angelica", "Cold-Pressed Seed Oils"],
    philosophies: ["Zero Additives", "Northern Botanicals", "Skin Microbiome Friendly"],
  },

  // 2
  {
    name: "24h Cosme",
    slug: "24h-cosme",
    kanji: "24h コスメ",
    origin: "Tokyo, Japan",
    tagline: "Gentle natural mineral skincare and makeup safe enough to sleep in.",
    description:
      "24h Cosme crafts chemical-free mineral cosmetics infused with organic camellia oil and aloe, designed to deliver sheer coverage while protecting delicate Asian skin round the clock.",
    category: "Mineral Care",
    image: PRODUCT_IMAGES[2]!,
    bannerImage: heroSpa.src,
    established: "Est. 2008",
    aliases: ["24h-cosme", "24hcosme", "24-cosme"],
    keyIngredients: ["Mineral Mica", "Organic Camellia Seed Oil", "Pearl Powder"],
    philosophies: ["Sleep-Safe Formulas", "Clean Minerals", "Sensitive Skin Approved"],
  },

  // 3
  {
    name: "365 Labo",
    slug: "365-labo",
    kanji: "365 ラボ",
    origin: "Kyoto, Japan",
    tagline: "Daily balancing ferments engineered for seasonal climate shifts.",
    description:
      "Developed in Kyoto's laboratory district, 365 Labo provides minimalist daily essentials formulated with triple rice ferment filtrates to maintain moisture balance 365 days a year.",
    category: "Daily Barrier Care",
    image: PRODUCT_IMAGES[3]!,
    bannerImage: heroSakura.src,
    established: "Est. 2018",
    aliases: ["365-labo", "365labo", "labo-365"],
    keyIngredients: ["Rice Ferment Filtrate", "Ceramide NP", "Uji Green Tea"],
    philosophies: ["Year-Round Balance", "Gentle Fermentation", "Non-Sticky Hydration"],
  },

  // 4
  {
    name: "4B Cosmetics",
    slug: "4b-cosmetics",
    kanji: "4B コスメ",
    origin: "Osaka, Japan",
    tagline: "Clinical-grade stem cell and peptide beauty created for Japanese aesthetic salons.",
    description:
      "Trusted by certified aesthetic clinics across Osaka and Kobe, 4B Cosmetics merges biotechnology with concentrated marine placenta for deep cellular replenishment.",
    category: "Clinical Salon",
    image: PRODUCT_IMAGES[4]!,
    bannerImage: heroSpa.src,
    established: "Est. 2011",
    aliases: ["4b-cosmetics", "4b", "4b-japan"],
    keyIngredients: ["Bio-Placenta Complex", "EGF Peptides", "Hydrolyzed Collagen"],
    philosophies: ["Aesthetic Clinic Grade", "Targeted Cell Repair", "Visible Firmness"],
  },

  // 5
  {
    name: "50 Megumi",
    slug: "50-megumi",
    kanji: "50の恵",
    origin: "Osaka, Japan",
    tagline: "50 nourishing traditional herbal extracts for scalp, hair, and resilient skin.",
    description:
      "A flagship heritage brand by Rohto Pharmaceutical, 50 Megumi combines ginseng, ginger, reishi mushroom, and 47 other medicinal botanicals to fortify mature skin and thinning hair.",
    category: "Herbal Vitality",
    image: PRODUCT_IMAGES[5]!,
    bannerImage: heroWhip.src,
    established: "Est. 2007",
    aliases: ["50-megumi", "50megumi", "rohto-50-megumi"],
    keyIngredients: ["Panax Ginseng", "Reishi Mushroom", "Hydrolyzed Silk"],
    philosophies: ["50 Active Botanicals", "Scalp & Barrier Density", "Time-Tested Strength"],
  },

  // 6
  {
    name: "60 Skin Tokyo",
    slug: "60-skin-tokyo",
    kanji: "60 スキン",
    origin: "Tokyo, Japan",
    tagline: "Rapid 60-second morning skincare rituals for radiant city skin.",
    description:
      "60 Skin Tokyo reimagines fast mornings with multi-action splash toners and sheet masks that cleanse, tone, and prime the complexion in exactly 60 seconds.",
    category: "Express Rituals",
    image: PRODUCT_IMAGES[6]!,
    bannerImage: heroSpring.src,
    established: "Est. 2019",
    aliases: ["60-skin-tokyo", "60-skin", "60skin"],
    keyIngredients: ["Grapefruit Extract", "Malic Acid", "Water Soluble Collagen"],
    philosophies: ["60-Second Efficacy", "Pore Tightening", "Flawless Makeup Prep"],
  },

  // 7
  {
    name: "7th Heaven Tokyo",
    slug: "7th-heaven-tokyo",
    kanji: "第7天国",
    origin: "Ginza, Tokyo",
    tagline: "Luxurious botanical sheet masks and hot spring facial oils.",
    description:
      "Handcrafted in Tokyo's Ginza boutique district, 7th Heaven Tokyo infuses onsen volcanic waters and organic yuzu peel into soothing mask treatments.",
    category: "Boutique Spa",
    image: PRODUCT_IMAGES[7]!,
    bannerImage: heroSpa.src,
    established: "Est. 2016",
    aliases: ["7th-heaven-tokyo", "7th-heaven", "seventh-heaven"],
    keyIngredients: ["Thermal Onsen Water", "Kochi Yuzu Oil", "Squalane"],
    philosophies: ["At-Home Onsen Therapy", "Sensory Wellbeing", "Deep Calming"],
  },

  // 8
  {
    name: "8 The Thalasso",
    slug: "8-the-thalasso",
    kanji: "エイトザタラソ",
    origin: "Tokyo, Japan",
    tagline: "Marine stem cells and deep ocean water for cellular scalp & hair regeneration.",
    description:
      "8 The Thalasso revolutionized hair and scalp care by treating hair like facial skin. Harnessing 8 oceanic thalasso actives, it repairs damaged cuticles and binds deep hydration.",
    category: "Oceanic Thalasso",
    image: PRODUCT_IMAGES[8]!,
    bannerImage: heroWhip.src,
    established: "Est. 2019",
    aliases: ["8-the-thalasso", "eight-the-thalasso", "8thethalasso", "thalasso"],
    keyIngredients: ["Marine Crithmum Stem Cells", "Deep Sea Water", "Ocean Squalane"],
    philosophies: ["Skinification of Hair", "Deep Cuticle Repair", "Silky Aquatic Moisture"],
  },

  // 9
  {
    name: "9.0 Spa Japan",
    slug: "9-0-spa-japan",
    kanji: "9.0 スパ",
    origin: "Hakone, Japan",
    tagline: "Onsen hot spring mineral rich balms and therapeutic body soaks.",
    description:
      "Born from the legendary Hakone volcanic springs, 9.0 Spa Japan formulates restorative mineral balms and botanical body cleansers that relieve tension and hydrate rough skin.",
    category: "Thermal Onsen",
    image: PRODUCT_IMAGES[9]!,
    bannerImage: heroCulture.src,
    established: "Est. 2014",
    aliases: ["9-0-spa-japan", "90-spa-japan", "9-spa"],
    keyIngredients: ["Hakone Volcanic Minerals", "Sulfur Extract", "Japanese Hinoki Cypress"],
    philosophies: ["Volcanic Mineral Healing", "Muscle Relaxation", "Velvety Softness"],
  },

  // 0
  {
    name: "0-Acne Lab",
    slug: "0-acne-lab",
    kanji: "ゼロアクネ",
    origin: "Yokohama, Japan",
    tagline:
      "Gentle clarifying sulfur, cica, and tea tree formulas for sensitive blemish-prone skin.",
    description:
      "Formulated specifically for tropical high-humidity climates, 0-Acne Lab eliminates stubborn blemishes and calms inflamed pores without stripping natural barrier lipids.",
    category: "Targeted Clarifying",
    image: PRODUCT_IMAGES[10]!,
    bannerImage: heroSpring.src,
    established: "Est. 2020",
    aliases: ["0-acne-lab", "zero-acne-lab", "0-acne", "zero-acne"],
    keyIngredients: ["Colloidal Sulfur", "Madecassoside", "Japanese Green Tea Extract"],
    philosophies: ["Non-Comedogenic", "Blemish Defense", "Zero Barrier Stripping"],
  },
];

