import heroSpring from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import heroWhip from "@/assets/hero/Perfect Whip Fresh Beauty Ritual.png";
import heroSakura from "@/assets/hero/hero-sakura.png";
import heroSpa from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import { PRODUCT_IMAGES } from "@/lib/catalog";
import type { BrandMeta } from "./types";

export const BRAND_DEFS_A_TO_D: BrandMeta[] = [
  // A
  {
    name: "Anessa",
    slug: "anessa",
    kanji: "アネッサ",
    origin: "Tokyo, Japan",
    tagline: "Japan's #1 UV defense pioneer featuring Thermo Booster and Aqua Booster technology.",
    description:
      "Owned by Shiseido and trusted as Japan's gold-standard sun care for decades, Anessa features revolutionary friction-resistant, heat-activated UV filters that get stronger with sweat and water.",
    category: "Prestige Sun Care",
    image: PRODUCT_IMAGES[11]!,
    bannerImage: heroWhip.src,
    established: "Est. 1992",
    featured: true,
    aliases: ["anessa", "shiseido-anessa"],
    keyIngredients: ["Auto Booster Technology", "Green Tea Leaf Extract", "Potent Collagen"],
    philosophies: [
      "Uncompromising UV Shield",
      "Sweat & Heat Activated",
      "Skincare-Infused Sun Protection",
    ],
  },
  {
    name: "Albion",
    slug: "albion",
    kanji: "アルビオン",
    origin: "Ginza, Tokyo",
    tagline: "Renowned for the iconic Skin Conditioner Essential and signature milk-first ritual.",
    description:
      "Since 1956 in Ginza, Albion has pioneered luxury Japanese skincare through carefully sourced Job's Tears 'Kita-no-Hato' extracts, restoring translucent softness and resilience to tired skin.",
    category: "Luxury Prestige",
    image: PRODUCT_IMAGES[12]!,
    bannerImage: heroSpa.src,
    established: "Est. 1956",
    aliases: ["albion", "albion-japan"],
    keyIngredients: ["Organic Kita-no-Hato Job's Tears", "Witch Hazel", "Plump Ceramides"],
    philosophies: ["Milk-First Routine", "Clarity & Translucence", "Finest Botanical Harvests"],
  },
  {
    name: "Attenir",
    slug: "attenir",
    kanji: "アテニア",
    origin: "Yokohama, Japan",
    tagline: "High-grade anti-aging cleansers and botanical oils at honest prices.",
    description:
      "A prestigious sister company of FANCL, Attenir is celebrated for its bestselling Skin Clear Cleanse Oil that dissolves age-related dullness and makeup while nourishing the dermal barrier.",
    category: "Anti-Aging Cleansing",
    image: PRODUCT_IMAGES[13]!,
    bannerImage: heroSpring.src,
    established: "Est. 1989",
    aliases: ["attenir", "attenir-japan"],
    keyIngredients: ["Rockrose Oil", "Inca Inchi Oil", "Argan Oil"],
    philosophies: [
      "Age-Stain Removal",
      "High Quality Without Luxury Markup",
      "Comforting Aroma Rituals",
    ],
  },

  // B
  {
    name: "Biore",
    slug: "biore",
    kanji: "ビオレ",
    origin: "Tokyo, Japan",
    tagline: "World-famous featherweight UV essences and microscopic skin purification.",
    description:
      "Kao Biore is an international household name beloved for its weightless UV Aqua Rich Watery Essence SPF50+ and deep pore micro-foaming cleansing technologies.",
    category: "Daily Essentials",
    image: PRODUCT_IMAGES[14]!,
    bannerImage: heroWhip.src,
    established: "Est. 1980",
    featured: true,
    aliases: ["biore", "kao-biore"],
    keyIngredients: ["Micro Defense Capsules", "Royal Jelly Extract", "Hyaluronic Acid"],
    philosophies: [
      "Watery Weightless Comfort",
      "Invisible Sun Protection",
      "Gentle Daily Cleansing",
    ],
  },
  {
    name: "Bifesta",
    slug: "bifesta",
    kanji: "ビフェスタ",
    origin: "Osaka, Japan",
    tagline: "Ultra-fine carbonated dense foams and water-based micellar makeup removal.",
    description:
      "Engineered by Mandom in Osaka, Bifesta delivers micro-carbonated bubbles that cleanse deep into pores without friction, wiping away waterproof makeup in a single stroke.",
    category: "Pore & Cleansing",
    image: PRODUCT_IMAGES[15]!,
    bannerImage: heroSpa.src,
    established: "Est. 2011",
    aliases: ["bifesta", "mandom-bifesta"],
    keyIngredients: ["Dense Carbonated Micro-Foam", "Hyaluronate", "Lactic Acid"],
    philosophies: ["Zero Friction Cleansing", "Moisturizing Micellar", "Bouncy Foam Texture"],
  },

  // C
  {
    name: "Canmake Tokyo",
    slug: "canmake",
    kanji: "キャンメイク",
    origin: "Tokyo, Japan",
    tagline: "Playful, high-pigment, cruelty-free Japanese color cosmetics and Mermaid UV gel.",
    description:
      "Canmake Tokyo brings Tokyo's vibrant Harajuku and Shibuya beauty culture to life with sweet blush compacts, silky eyeshadow palettes, and cult-favorite Mermaid Skin Gel UV.",
    category: "Japanese Color Beauty",
    image: PRODUCT_IMAGES[0]!,
    bannerImage: heroSakura.src,
    established: "Est. 1985",
    featured: true,
    aliases: ["canmake", "canmake-tokyo"],
    keyIngredients: ["85% Beautifying Ingredients", "Evening Primrose Oil", "Cica"],
    philosophies: ["Girly & Glamorous", "Accessible High Performance", "Gentle On Delicate Skin"],
  },
  {
    name: "Curel",
    slug: "curel",
    kanji: "キュレル",
    origin: "Tokyo, Japan",
    tagline: "Japan's #1 dermatological specialist for sensitive, dry, and troubled skin.",
    description:
      "Engineered by Kao Corporation after 30+ years of lipid science, Curel replenishes ceramide functions inside the stratum corneum to protect reactive skin from environmental irritants.",
    category: "Dermatological Barrier",
    image: PRODUCT_IMAGES[1]!,
    bannerImage: heroSpa.src,
    established: "Est. 1999",
    featured: true,
    aliases: ["curel", "kao-curel"],
    keyIngredients: ["Ceramide Functioning Ingredient", "Eucalyptus Extract", "Allantoin"],
    philosophies: [
      "Ceramide Barrier Restoration",
      "Clinically Proven for Sensitive Skin",
      "Fragrance & Colorant Free",
    ],
  },
  {
    name: "Chifure",
    slug: "chifure",
    kanji: "ちふれ",
    origin: "Saitama, Japan",
    tagline: "100% transparent ingredients, gentle formulas, and eco-refills since 1947.",
    description:
      "Chifure stands for complete transparency, publishing every single percentage of ingredients on packaging. Hypoallergenic, alcohol-free, and loved across multiple generations.",
    category: "Honest Heritage",
    image: PRODUCT_IMAGES[2]!,
    bannerImage: heroSpring.src,
    established: "Est. 1947",
    aliases: ["chifure", "chifure-cosmetics"],
    keyIngredients: ["Bio-Hyaluronic Acid", "Trehalose", "Arbutin"],
    philosophies: ["Total Ingredient Transparency", "Refillable Ecology", "Pure Simplicity"],
  },

  // D
  {
    name: "DHC",
    slug: "dhc",
    kanji: "ディーエイチシー",
    origin: "Tokyo, Japan",
    tagline: "Legendary organic olive virgin oil cleansing and pure vitamin formulas.",
    description:
      "Famous worldwide for selling a Deep Cleansing Oil every few seconds, DHC utilizes hand-harvested organic Spanish olives cold-pressed in Japan to dissolve water-resistant makeup effortlessly.",
    category: "Olive Botanical Care",
    image: PRODUCT_IMAGES[3]!,
    bannerImage: heroSpa.src,
    established: "Est. 1972",
    featured: true,
    aliases: ["dhc", "dhc-japan"],
    keyIngredients: ["100% Organic Olive Virgin Oil", "Rosemary Leaf Extract", "Vitamin E"],
    philosophies: [
      "Natural Olive Power",
      "Water-Soluble Oil Formula",
      "Nourishing Without Clogging",
    ],
  },
  {
    name: "Decorté",
    slug: "decorte",
    kanji: "コスメデコルテ",
    origin: "Tokyo, Japan",
    tagline:
      "Ultra-prestige multi-lamellar liposome technology delivering 24h continuous hydration.",
    description:
      "Kosé's crowning luxury skincare house, Decorté micro-encapsulates bio-identical phospholipids into 0.1-micron multi-layered capsules that melt deeply into the skin over 24 hours.",
    category: "High-End Prestige",
    image: PRODUCT_IMAGES[4]!,
    bannerImage: heroSpa.src,
    established: "Est. 1970",
    aliases: ["decorte", "cosme-decorte"],
    keyIngredients: ["Multi-Lamellar Liposomes", "White Birch Water", "Shirakaba Extract"],
    philosophies: ["Sub-Micron Technology", "Sensory Elegance", "Enduring Luminosity"],
  },
  {
    name: "Dr. Ci:Labo",
    slug: "dr-ci-labo",
    kanji: "ドクターシーラボ",
    origin: "Tokyo, Japan",
    tagline: "Medical-grade dermatological collagen gels and potent Vitamin C brightening.",
    description:
      "Founded by a practicing Tokyo dermatologist, Dr. Ci:Labo creates medical-grade Aqua-Collagen-Gel and VC100 essences that visibly firm, refine texture, and diminish hyperpigmentation.",
    category: "Medical Derma Care",
    image: PRODUCT_IMAGES[5]!,
    bannerImage: heroWhip.src,
    established: "Est. 1999",
    aliases: ["dr-ci-labo", "dr-cilabo", "drcilabo", "cilabo"],
    keyIngredients: ["High-Penetration Vitamin C (APPS)", "Fermented Collagen", "Niacinamide"],
    philosophies: ["Doctor-Formulated", "Multi-Benefit Aqua Gels", "Dermatological Potency"],
  },
];

