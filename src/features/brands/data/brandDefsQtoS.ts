import bSakura from "@/assets/brands/sakura-lab.jpg";
import bShiseido from "@/assets/brands/shiseido.jpg";
import bSkii from "@/assets/brands/sk-ii.jpg";
import heroSpring from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import heroWhip from "@/assets/hero/Perfect Whip Fresh Beauty Ritual.png";
import heroSakura from "@/assets/hero/hero-sakura.png";
import heroSpa from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import heroCulture from "@/assets/hero/hero-japanses-culture-bg.png";
import { PRODUCT_IMAGES } from "@/lib/catalog";
import type { BrandMeta } from "./types";

export const BRAND_DEFS_Q_TO_S: BrandMeta[] = [
  // Q
  {
    name: "Q10 Kose CoEnrich",
    slug: "q10-kose-coenrich",
    kanji: "コエンリッチQ10",
    origin: "Tokyo, Japan",
    tagline: "Micro-encapsulated coenzyme Q10 anti-aging hand, cuticle, and body balms.",
    description:
      "Kosé's CoEnrich Q10 is Japan's #1 medicated hand treatment. Micro-golden capsules burst upon contact, delivering high-potency coenzyme Q10, royal jelly, and jojoba deep into hand cuticles.",
    category: "Medicated Body Care",
    image: PRODUCT_IMAGES[13]!,
    bannerImage: heroWhip.src,
    established: "Est. 2005",
    aliases: ["q10-kose-coenrich", "coenrich-q10", "kose-q10", "coenrich"],
    keyIngredients: ["Micro-Encapsulated Coenzyme Q10", "Royal Jelly Extract", "Jojoba Oil"],
    philosophies: [
      "Deep Micro-Capsule Delivery",
      "Velvety Anti-Aging Hands",
      "Moisture Seal Barrier",
    ],
  },

  // R
  {
    name: "Rohto Mentholatum",
    slug: "rohto-mentholatum",
    kanji: "ロート製薬",
    origin: "Osaka, Japan",
    tagline: "Pharmaceutical-grade lip treatments, cooling eye drops, and active skincare.",
    description:
      "Rohto Pharmaceutical has shaped Japanese healthcare and beauty since 1899. From vitamin-infused Melano CC to soothing Melty Cream Lip balms, it blends medical rigor with pleasant textures.",
    category: "Pharmaceutical Beauty",
    image: PRODUCT_IMAGES[14]!,
    bannerImage: heroSpring.src,
    established: "Est. 1899",
    featured: true,
    aliases: ["rohto-mentholatum", "rohto", "mentholatum"],
    keyIngredients: ["Moisture Bank Technology", "Menthol", "Squalane & Ceramide"],
    philosophies: ["Never Say Never", "Pharmaceutical Grade Purity", "Active Daily Relief"],
  },
  {
    name: "Rosette",
    slug: "rosette",
    kanji: "ロゼット",
    origin: "Tokyo, Japan",
    tagline: "Japan's first clay paste cleanser brand soothing pores and impurities since 1929.",
    description:
      "Rosette introduced Japan's first cream facial wash in 1929. Its iconic Gommage peeling gels and Kaidei (sea mud) paste cleansers clarify pores without leaving skin dry or tight.",
    category: "Mineral Clay Care",
    image: PRODUCT_IMAGES[15]!,
    bannerImage: heroSpa.src,
    established: "Est. 1929",
    aliases: ["rosette", "rosette-japan"],
    keyIngredients: ["Natural Mineral Sea Mud", "Fruit AHA Acids", "Rose Hip Extract"],
    philosophies: [
      "90+ Years of Cleansing Expertise",
      "Mineral Clay Absorption",
      "Gentle Enzymatic Peeling",
    ],
  },

  // S
  {
    name: "Sakura Lab",
    slug: "sakura-lab",
    kanji: "桜ラボ",
    origin: "Yokohama, Japan",
    tagline: "Bio-engineered cherry blossom actives and gentle peptide brightening.",
    description:
      "Born in Yokohama's biotech center, Sakura Lab isolates gentle flavonoids from Yoshino cherry blossom petals to inhibit melanin synthesis and deliver a soft, pink petal translucence.",
    category: "Clinical Botanicals",
    image: bSakura.src,
    bannerImage: heroSakura.src,
    established: "Est. 2016",
    featured: true,
    aliases: ["sakura-lab", "sakura", "sakura-beauty"],
    keyIngredients: ["Yoshino Cherry Blossom Extract", "Oligopeptide-68", "Niacinamide"],
    philosophies: ["Petal Luminosity", "Gentle Non-Irritating Brightening", "Dermal Comfort"],
  },
  {
    name: "Shiseido",
    slug: "shiseido",
    kanji: "資生堂",
    origin: "Ginza, Tokyo",
    tagline: "150 years of world-leading dermatological science and prestige formulas.",
    description:
      "Founded as Japan's first Western-style pharmacy in Ginza in 1872, Shiseido is the crown jewel of Japanese beauty, merging Eastern holistic philosophy with world-renowned skincare breakthroughs.",
    category: "Prestige Science",
    image: bShiseido.src,
    bannerImage: heroSpa.src,
    established: "Est. 1872",
    featured: true,
    aliases: ["shiseido", "shiseido-ginza-tokyo", "shiseido-japan"],
    keyIngredients: ["ImuGeneration150 Technology", "Reishi Mushroom", "Iris Root Extract"],
    philosophies: ["Beauty Reimagined", "Immunity Strengthening", "Sensory Artistry"],
  },
  {
    name: "SK-II",
    slug: "sk-ii",
    kanji: "エスケーツー",
    origin: "Shiga, Japan",
    tagline: "Cult-favourite Pitera fermentation for crystal clear, resilient skin.",
    description:
      "Discovered at a Japanese sake brewery by observing the youthful hands of elderly brewers, SK-II's patented Pitera bio-ingredient contains 50+ micronutrients that transform texture, firmness, and radiance.",
    category: "Bio-Ferment Luxury",
    image: bSkii.src,
    bannerImage: heroCulture.src,
    established: "Est. 1980",
    featured: true,
    aliases: ["sk-ii", "skii", "sk2"],
    keyIngredients: ["90%+ Pure Pitera Filtrate", "Natural Amino Acids", "Organic Minerals"],
    philosophies: ["Crystal Clear Skin", "Unchanged Iconic Formula", "Miracle of Fermentation"],
  },
  {
    name: "Sana Nameraka Honpo",
    slug: "sana-nameraka-honpo",
    kanji: "なめらか本舗",
    origin: "Tokyo, Japan",
    tagline: "Fermented organic isoflavone soymilk skincare for plump, bouncy skin.",
    description:
      "Sana's Nameraka Honpo utilizes double-fermented Japanese Fukuyutaka soymilk isoflavones to infuse moisture, diminish fine lines, and impart a silky smooth mochi elasticity to the complexion.",
    category: "Soy Ferment Care",
    image: PRODUCT_IMAGES[0]!,
    bannerImage: heroWhip.src,
    established: "Est. 2004",
    featured: true,
    aliases: ["sana-nameraka-honpo", "sana", "nameraka-honpo", "sana-japan"],
    keyIngredients: ["Fermented Soymilk Isoflavones", "Pure Retinol", "Soybean Protein"],
    philosophies: ["Non-GMO Japanese Soy", "Plump Mochi Texture", "Accessible Daily Goodness"],
  },
  {
    name: "Sekkisei",
    slug: "sekkisei",
    kanji: "雪肌精",
    origin: "Tokyo, Japan",
    tagline: "Traditional Japanese herbal extracts for translucent snow-like radiance.",
    description:
      "Kosé's Sekkisei has been cherished for over 35 years for its soothing blue bottle lotion, blending oriental herbal extracts like angelica, coix seed, and melothria to brighten dull skin.",
    category: "Herbal Brightening",
    image: PRODUCT_IMAGES[1]!,
    bannerImage: heroSpring.src,
    established: "Est. 1985",
    aliases: ["sekkisei", "kose-sekkisei"],
    keyIngredients: [
      "Angelica Acutiloba Root",
      "Coix Lacryma-Jobi (Job's Tears)",
      "Melothria Extract",
    ],
    philosophies: ["Snow-Like Translucence", "Oriental Botanical Harmony", "Cool Calming Moisture"],
  },
  {
    name: "Senka",
    slug: "senka",
    kanji: "専科",
    origin: "Tokyo, Japan",
    tagline: "Famous Perfect Whip micro-dense cleansing foam that cushions the skin.",
    description:
      "Shiseido Senka's Perfect Whip is Asia's most recognized cleanser. Its ultra-dense micro-foam creates a cushion between fingers and face, gently sweeping away dirt from pores without friction.",
    category: "Dense Foam Cleansing",
    image: PRODUCT_IMAGES[2]!,
    bannerImage: heroWhip.src,
    established: "Est. 2003",
    featured: true,
    aliases: ["senka", "shiseido-senka", "perfect-whip"],
    keyIngredients: ["Natural Silk Essence", "Double Hyaluronic Acid", "Moisture Booster Complex"],
    philosophies: [
      "Zero-Friction Micro Foam",
      "Deep Microscopic Purity",
      "Plump Post-Wash Softness",
    ],
  },
  {
    name: "SUQQU",
    slug: "suqqu",
    kanji: "スック",
    origin: "Tokyo, Japan",
    tagline:
      "Ultra-luxurious radiant foundations, GANKIN facial massage, and velvety eye pigments.",
    description:
      "Derived from the Japanese term 'sukku-to' (standing tall and poised), SUQQU crafts exquisite serum foundations and buttery soft eyeshadow quads inspired by the delicate Japanese seasons.",
    category: "Artisanal Luxury",
    image: PRODUCT_IMAGES[3]!,
    bannerImage: heroSpa.src,
    established: "Est. 2003",
    aliases: ["suqqu", "suqqu-japan"],
    keyIngredients: ["Camellia Japonica Seed Oil", "Green Tea Leaf Extract", "Silk Protein"],
    philosophies: ["Graceful Posture & Radiance", "GANKIN Lymphatic Care", "Luminous Living Skin"],
  },
];

