import bYuzu from "@/assets/brands/yuzu-no-mori.jpg";
import heroSpring from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import heroWhip from "@/assets/hero/Perfect Whip Fresh Beauty Ritual.png";
import heroSakura from "@/assets/hero/hero-sakura.png";
import heroSpa from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import heroCulture from "@/assets/hero/hero-japanses-culture-bg.png";
import { PRODUCT_IMAGES } from "@/lib/catalog";
import type { BrandMeta } from "./types";

export const BRAND_DEFS_T_TO_Z: BrandMeta[] = [
  // T
  {
    name: "Tsubaki",
    slug: "tsubaki",
    kanji: "ツバキ",
    origin: "Tokyo, Japan",
    tagline: "Shiseido's zero-wait salon-grade camellia oil repair hair masks and shampoos.",
    description:
      "Tsubaki Premium utilizes cutting-edge widening capillary technology to allow camellia seed oil, royal jelly, and pearl protein to penetrate deeply into hair cuticles instantly with zero wait time.",
    category: "Salon Hair Care",
    image: PRODUCT_IMAGES[4]!,
    bannerImage: heroWhip.src,
    established: "Est. 2006",
    featured: true,
    aliases: ["tsubaki", "shiseido-tsubaki"],
    keyIngredients: ["Tsubaki Camellia Oil", "Royal Jelly", "Soy Protein"],
    philosophies: [
      "Zero Wait Time Salon Quality",
      "Brilliant Light Reflection",
      "Weightless Silky Flow",
    ],
  },
  {
    name: "Three Cosmetics",
    slug: "three-cosmetics",
    kanji: "スリー",
    origin: "Tokyo, Japan",
    tagline: "Holistic organic essential oils and modern Japanese botanical makeup.",
    description:
      "Three combines organic Japanese plant oils — especially cold-pressed tea seed oil — with certified organic botanicals to awaken the natural self-recovery powers of urban skin.",
    category: "Holistic Organic",
    image: PRODUCT_IMAGES[5]!,
    bannerImage: heroCulture.src,
    established: "Est. 2009",
    aliases: ["three-cosmetics", "three", "three-japan"],
    keyIngredients: ["Japanese Tea Seed Oil", "Frankincense Essential Oil", "Jojoba Oil"],
    philosophies: ["Holistic Harmony", "Natural Self-Healing Support", "Clean Sensory Luxury"],
  },

  // U
  {
    name: "Uzu by Flowfushi",
    slug: "uzu-by-flowfushi",
    kanji: "ウズ",
    origin: "Tokyo, Japan",
    tagline: "Award-winning ergonomic Japanese eyeliner brush pens with vibrant clean pigments.",
    description:
      "Crafted in Kumano using traditional Japanese brush-making artisan techniques, Uzu's Eye Opening Liners redefine color payoff with water-proof, tear-proof, dye-free formulas.",
    category: "Artisanal Eyewear",
    image: PRODUCT_IMAGES[6]!,
    bannerImage: heroSakura.src,
    established: "Est. 2019",
    aliases: ["uzu-by-flowfushi", "uzu", "flowfushi"],
    keyIngredients: ["Kumano Yamato Brush Fibers", "WP Film Polymer", "Mineral Pigments"],
    philosophies: ["Artisan Brush Craft", "Dye-Free Purity", "Bold Free Expression"],
  },

  // V
  {
    name: "Visee",
    slug: "visee",
    kanji: "ヴィセ",
    origin: "Tokyo, Japan",
    tagline: "Glamorous Tokyo color palettes, glossy lip tints, and effortless shading.",
    description:
      "Produced by Kosé, Visee delivers trendy Shibuya makeup that blends effortlessly into the skin with sheer, buildable pigments and nourishing hyaluronic acid bases.",
    category: "Glamour Makeup",
    image: PRODUCT_IMAGES[7]!,
    bannerImage: heroSpring.src,
    established: "Est. 1994",
    aliases: ["visee", "visee-kose", "visee-avant"],
    keyIngredients: ["Hyaluronic Acid", "Squalane", "Mineral Mica"],
    philosophies: ["Effortless Glamour", "Melts Into Skin Tone", "Tokyo Trend Forward"],
  },

  // W
  {
    name: "Wafood Made",
    slug: "wafood-made",
    kanji: "ワフードメイド",
    origin: "Tokyo, Japan",
    tagline: "Traditional Japanese food ingredients: sake lees, Uji matcha, and tofu face packs.",
    description:
      "Engineered by PDC, Wafood Made harnesses authentic Japanese superfoods. Its famous Sake Kasu pack utilizes sake lees from Kumamoto brewery to gently exfoliate dull keratin and brighten skin.",
    category: "Superfood Face Packs",
    image: PRODUCT_IMAGES[8]!,
    bannerImage: heroCulture.src,
    established: "Est. 2017",
    aliases: ["wafood-made", "wafood", "pdc-wafood"],
    keyIngredients: ["Kumamoto Sake Lees Extract", "Rice Ferment", "Cucumber Fruit Extract"],
    philosophies: ["Japanese Culinary Beauty", "Keratin Softening", "Luminous Clarity"],
  },

  // Y
  {
    name: "Yuzu No Mori",
    slug: "yuzu-no-mori",
    kanji: "柚子の森",
    origin: "Kochi, Japan",
    tagline: "Cold-pressed citrus vitamin C and antioxidant mountain honey.",
    description:
      "Nestled in the sun-drenched terraced hills of Kochi, Yuzu No Mori hand-presses aromatic yuzu peel to extract pure bio-flavonoids, natural ceramides, and refreshing citrus radiance.",
    category: "Radiance Essentials",
    image: bYuzu.src,
    bannerImage: heroSpring.src,
    established: "Est. 2016",
    featured: true,
    aliases: ["yuzu-no-mori", "yuzu", "yuzu-japan"],
    keyIngredients: ["Cold-Pressed Kochi Yuzu Oil", "Mountain Honey Extract", "Bio-Flavonoids"],
    philosophies: ["Sun-Drenched Citrus", "Natural Vitamin Infusion", "Uplifting Daily Calm"],
  },
  {
    name: "Yojiya",
    slug: "yojiya",
    kanji: "よーじや",
    origin: "Kyoto, Japan",
    tagline:
      "Heritage Kyoto beauty house established in 1904, famed for aburatorigami blotting papers.",
    description:
      "For over a century in Gion, Kyoto, Yojiya has supplied geishas, kabuki actors, and discerning travelers with ultra-soft gold-leaf beaten blotting papers and gentle silk bath powders.",
    category: "Kyoto Geisha Heritage",
    image: PRODUCT_IMAGES[9]!,
    bannerImage: heroCulture.src,
    established: "Est. 1904",
    aliases: ["yojiya", "yojiya-kyoto"],
    keyIngredients: ["Gold-Leaf Beaten Washi Paper", "Silk Protein Sericin", "Aloe Vera Extract"],
    philosophies: ["120-Year Kyoto Craft", "Flawless Powder Finish", "Gentle Traditional Touch"],
  },

  // Z
  {
    name: "Za Cosmetics",
    slug: "za-cosmetics",
    kanji: "ジーエー",
    origin: "Tokyo, Japan",
    tagline: "Modern brightening UV protectors, lightweight primer bases, and clean makeup.",
    description:
      "Formulated in Tokyo with Asian skin in mind, Za Cosmetics is acclaimed for its True White Day Protector, combining SPF26 PA++ defense with tone-up pearl powders to banish dullness.",
    category: "Tone-Up UV Care",
    image: PRODUCT_IMAGES[10]!,
    bannerImage: heroSpa.src,
    established: "Est. 1997",
    aliases: ["za-cosmetics", "za", "za-japan"],
    keyIngredients: ["Vitamin C Derivative", "Pearl Extract", "Moisturizing Hyaluronate"],
    philosophies: ["Tone-Up Translucency", "Everyday Urban Primer", "Weightless All-Day Wear"],
  },
];

