import bKyoto from "@/assets/brands/kyoto-botanicals.jpg";
import heroSpring from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import heroWhip from "@/assets/hero/Perfect Whip Fresh Beauty Ritual.png";
import heroSakura from "@/assets/hero/hero-sakura.png";
import heroSpa from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import heroCulture from "@/assets/hero/hero-japanses-culture-bg.png";
import { PRODUCT_IMAGES } from "@/lib/catalog";
import type { BrandMeta } from "./types";

export const BRAND_DEFS_I_TO_L: BrandMeta[] = [
  // I
  {
    name: "IPSA",
    slug: "ipsa",
    kanji: "イプサ",
    origin: "Tokyo, Japan",
    tagline: "Minimalist bespoke Japanese skincare featuring the iconic Time Reset Aqua lotion.",
    description:
      "A luxury branch of Shiseido founded on personalized skin diagnostics, IPSA's Time Reset Aqua forms an invisible water shield over the stratum corneum to treat acne, rough texture, and dehydration simultaneously.",
    category: "Bespoke Minimalist",
    image: PRODUCT_IMAGES[12]!,
    bannerImage: heroSpa.src,
    established: "Est. 1986",
    aliases: ["ipsa", "ipsa-japan"],
    keyIngredients: ["Aqua Presenter III", "Tranexamic Acid", "Peony Extract"],
    philosophies: ["Individual Skin Recipe", "Non-Sticky Water Shield", "Effortless Minimalism"],
  },
  {
    name: "Ishizawa Lab",
    slug: "ishizawa-lab",
    kanji: "石澤研究所",
    origin: "Tokyo, Japan",
    tagline: "Cult-favorite Keana Nadeshiko 100% Japanese rice pore-minimizing care.",
    description:
      "Ishizawa Lab became a global sensation with its Keana Nadeshiko Rice Masks. Made with 100% domestic Japanese rice serum, it tightens enlarged pores and nourishes dry, textured skin.",
    category: "Pore Care Specialist",
    image: PRODUCT_IMAGES[13]!,
    bannerImage: heroSpring.src,
    established: "Est. 1989",
    featured: true,
    aliases: ["ishizawa-lab", "keana-nadeshiko", "keana", "ishizawa"],
    keyIngredients: [
      "100% Domestic Japanese Rice Serum",
      "Baking Soda (Sodium Bicarbonate)",
      "Rice Bran Oil",
    ],
    philosophies: ["Natural Rice Ferment", "Pore Clarifying", "Soft Smooth Texture"],
  },

  // J
  {
    name: "JuJu Cosmetics",
    slug: "juju-cosmetics",
    kanji: "ジュジュ化粧品",
    origin: "Tokyo, Japan",
    tagline: "Pioneering fermented hyaluronic acid lotions and gentle everyday hydration.",
    description:
      "Acclaimed for its Aquamoist line, JuJu was among the earliest Japanese houses to integrate bio-fermented hyaluronic acid into daily toners, keeping skin supple and calm across generations.",
    category: "Pure Moisture",
    image: PRODUCT_IMAGES[14]!,
    bannerImage: heroWhip.src,
    established: "Est. 1946",
    aliases: ["juju-cosmetics", "juju", "aquamoist"],
    keyIngredients: ["Fermented Hyaluronic Acid", "Squalane", "Glycerin"],
    philosophies: ["Gentle Hydration", "Time-Tested Safety", "Comforting Softness"],
  },

  // K
  {
    name: "Kyoto Botanicals",
    slug: "kyoto-botanicals",
    kanji: "京都本舗",
    origin: "Kyoto, Japan",
    tagline: "Time-honoured Uji matcha, sake koji ferment, and camellia seed oils.",
    description:
      "Distilling the ancient botanical wisdom of Kyoto's imperial gardens, Kyoto Botanicals unites organic ceremonial matcha antioxidants with cold-fermented rice waters to soothe reactive skin.",
    category: "Heritage Care",
    image: bKyoto.src,
    bannerImage: heroCulture.src,
    established: "Est. 2015",
    featured: true,
    aliases: ["kyoto-botanicals", "kyoto", "kyoto-skincare"],
    keyIngredients: ["Organic Uji Matcha", "Sake Koji Filtrate", "Camellia Japonica Seed Oil"],
    philosophies: ["Zen Tranquility", "Temple Garden Botanicals", "Soothes Urban Redness"],
  },
  {
    name: "Kose",
    slug: "kose",
    kanji: "コーセー",
    origin: "Tokyo, Japan",
    tagline: "Pioneering Japanese cosmetic formulation, brightening serums, and sheet masks.",
    description:
      "Founded in 1946, Kosé is one of Japan's most historic beauty conglomerates, celebrated for creating Japan's first serum formulation and iconic brightening sheet masks.",
    category: "Pioneering Conglomerate",
    image: PRODUCT_IMAGES[15]!,
    bannerImage: heroSpa.src,
    established: "Est. 1946",
    featured: true,
    aliases: ["kose", "kose-cosmetics", "kose-japan"],
    keyIngredients: ["Clear Turn Brightening Essence", "Coenzyme Q10", "Hyaluronic Acid"],
    philosophies: [
      "Wisdom and Beauty for People and the Earth",
      "Innovation in Texture",
      "Enduring Radiance",
    ],
  },
  {
    name: "Kate Tokyo",
    slug: "kate-tokyo",
    kanji: "ケイト",
    origin: "Tokyo, Japan",
    tagline: "Kanebo's edgy Tokyo makeup sensation, famed for the viral Lip Monster series.",
    description:
      "Kate Tokyo captures the cutting-edge spirit of Tokyo nightlife. Its viral Lip Monster uses lip moisture to transform into a high-shine, transfer-proof gel matrix that lasts through meals.",
    category: "Tokyo Trend Makeup",
    image: PRODUCT_IMAGES[0]!,
    bannerImage: heroSakura.src,
    established: "Est. 1997",
    featured: true,
    aliases: ["kate-tokyo", "kate", "kanebo-kate", "lip-monster"],
    keyIngredients: ["Moisture-Transform Gel Polymer", "Jojoba Oil", "Chamomile Extract"],
    philosophies: ["No More Rules", "Ultra Long-Wearing Gel Coating", "Vibrant Tokyo Edge"],
  },
  {
    name: "Kikumasamune",
    slug: "kikumasamune",
    kanji: "菊正宗",
    origin: "Kobe, Japan",
    tagline:
      "Traditional 360-year-old sake brewery bringing koji amino acids to face and body lotions.",
    description:
      "Founded in 1659 as an imperial sake brewery in Kobe, Kikumasamune discovered that brewery workers had remarkably youthful hands. Its high-moist sake lotions deliver concentrated amino acids, arbutin, and placenta extract.",
    category: "Brewery Ferment",
    image: PRODUCT_IMAGES[1]!,
    bannerImage: heroCulture.src,
    established: "Est. 1659",
    featured: true,
    aliases: ["kikumasamune", "kiku-masamune", "kiku"],
    keyIngredients: ["Sake Ferment Filtrate", "Arbutin", "Ceramides NP & AP"],
    philosophies: [
      "360-Year Brewing Mastery",
      "Rich Natural Amino Acids",
      "Generous All-Body Hydration",
    ],
  },

  // L
  {
    name: "LuLuLun",
    slug: "lululun",
    kanji: "ルルルン",
    origin: "Tokyo, Japan",
    tagline: "Japan's #1 daily face mask brand engineered for intensive barrier hydration.",
    description:
      "LuLuLun transformed skincare by introducing daily 7-day sheet mask rituals. Using thick, three-layer microfibre sheets saturated with Japanese botanicals, it plumps dehydrated skin like a salon treatment.",
    category: "Daily Face Masks",
    image: PRODUCT_IMAGES[2]!,
    bannerImage: heroSpa.src,
    established: "Est. 2011",
    featured: true,
    aliases: ["lululun", "lululun-japan"],
    keyIngredients: ["Lipidure", "Acacia Honey", "Ceramide EOP"],
    philosophies: ["Everyday Mask Routine", "3-Layer Microfiber Hug", "Moisture Retention Matrix"],
  },
  {
    name: "Lion Pair Acne",
    slug: "lion-pair-acne",
    kanji: "ペアアクネ",
    origin: "Tokyo, Japan",
    tagline: "Japan's gold standard dermatological spot treatment cream for cystic and adult acne.",
    description:
      "Lion Pair Acne Cream is Japan's most widely recommended pharmaceutical topical cream. Formulated with Ibuprofen Piconol and Isopropyl Methylphenol, it reduces swelling and clears acne without peeling.",
    category: "Clinical Derma Care",
    image: PRODUCT_IMAGES[3]!,
    bannerImage: heroSpring.src,
    established: "Est. 1891",
    featured: true,
    aliases: ["lion-pair-acne", "pair-acne", "lion-pair", "pair"],
    keyIngredients: [
      "Ibuprofen Piconol (IPPN)",
      "Isopropyl Methylphenol (IPMP)",
      "Stearyl Alcohol",
    ],
    philosophies: [
      "Anti-Inflammatory Action",
      "Clear Non-Greasy Gel Texture",
      "Works Seamlessly Under Makeup",
    ],
  },
];

