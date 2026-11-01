import { PRODUCT_IMAGES } from "@/lib/catalog";
import {
  Beaker,
  Droplets,
  Eye,
  Gift,
  Layers,
  Leaf,
  Package,
  Palette,
  Scissors,
  Shield,
  ShoppingBag,
  Smile,
  Sparkles,
  Sunrise,
  Wind,
  Zap,
} from "lucide-react";

export interface CategoryDetail {
  name: string;
  kanji: string;
  department: string;
  tagline: string;
  icon: React.ElementType;
  image: string;
  popularTags: string[];
  ritualStep?: {
    step: string;
    label: string;
  };
}

export const CATEGORY_DIRECTORY: CategoryDetail[] = [
  {
    name: "Serum",
    kanji: "美容液",
    department: "Skincare",
    tagline:
      "Concentrated bioactive formulas delivering glass-skin radiance and dark spot correction.",
    icon: Zap,
    image: PRODUCT_IMAGES[0]!,
    popularTags: ["Sakura Serum", "Niacinamide", "Vitamin C", "Peptides"],
    ritualStep: { step: "Step 04", label: "Treat & Brighten" },
  },
  {
    name: "Sunscreen",
    kanji: "日焼け止め",
    department: "Skincare",
    tagline: "Japan's #1 SPF50+ PA++++ weightless watery defense with zero white cast or grease.",
    icon: Sunrise,
    image: PRODUCT_IMAGES[5]!,
    popularTags: ["Water Gel SPF50", "Mermaid Gel", "Thermo Booster"],
    ritualStep: { step: "Step 05", label: "UV Barrier Shield" },
  },
  {
    name: "Toner",
    kanji: "化粧水",
    department: "Skincare",
    tagline: "Japan's signature watery lotions that drench the skin barrier and balance pH.",
    icon: Layers,
    image: PRODUCT_IMAGES[2]!,
    popularTags: ["Hyaluronic Lotion", "Hatomugi", "Matcha Water", "Aqua Shield"],
    ritualStep: { step: "Step 03", label: "Hydrate & Prep" },
  },
  {
    name: "Cleanser",
    kanji: "クレンジング",
    department: "Skincare",
    tagline:
      "Melts away waterproof makeup, excess sebum, and SPF without stripping natural lipids.",
    icon: Beaker,
    image: PRODUCT_IMAGES[4]!,
    popularTags: ["Deep Cleansing Oil", "Cleansing Balm", "Micellar Water"],
    ritualStep: { step: "Step 01", label: "Oil Cleanse" },
  },
  {
    name: "Face Wash",
    kanji: "洗顔料",
    department: "Skincare",
    tagline: "Micro-dense whipped foam cleansers that cushion skin and purify pores gently.",
    icon: Droplets,
    image: PRODUCT_IMAGES[6]!,
    popularTags: ["Dense Foam Wash", "Low-pH Wash", "Enzyme Powder"],
    ritualStep: { step: "Step 02", label: "Micro-Foam Wash" },
  },
  {
    name: "Moisturizer",
    kanji: "乳液・クリーム",
    department: "Skincare",
    tagline: "Slow-fermented rice and biomimetic ceramide creams locking in 72-hour moisture.",
    icon: Smile,
    image: PRODUCT_IMAGES[1]!,
    popularTags: ["Ceramide Cream", "Aqua Gel", "Night Emulsion"],
    ritualStep: { step: "Step 05", label: "Moisture Lock" },
  },
  {
    name: "Essence",
    kanji: "エッセンス",
    department: "Skincare",
    tagline: "Deeply penetrating fermented yeast and botanical extracts for crystal-clear skin.",
    icon: Sparkles,
    image: PRODUCT_IMAGES[3]!,
    popularTags: ["Pitera Ferment", "Yuzu Extract", "Sake Koji Water"],
  },
  {
    name: "Face Mask",
    kanji: "フェイスマスク",
    department: "Skincare",
    tagline: "15-minute intensive hydration sheet masks and brightening rice wash-off packs.",
    icon: Palette,
    image: PRODUCT_IMAGES[7]!,
    popularTags: ["Daily LuLuLun", "Rice Serum Mask", "Gold Infusion"],
  },
  {
    name: "Eye Care",
    kanji: "アイクリーム",
    department: "Skincare",
    tagline: "Delicate brightening pearl extracts and retinol eye creams for smooth contours.",
    icon: Eye,
    image: PRODUCT_IMAGES[8]!,
    popularTags: ["Pearl Eye Cream", "Retinol Care", "Hydra Depuff"],
  },
  {
    name: "Lip Care",
    kanji: "リップケア",
    department: "Skincare",
    tagline: "Nourishing cherry blossom butters, camellia oils, and melty overnight balms.",
    icon: Leaf,
    image: PRODUCT_IMAGES[9]!,
    popularTags: ["Melty Lip Balm", "Sakura Petal Butter", "Lip Scrub"],
  },
  {
    name: "Hair Care",
    kanji: "ヘアケア",
    department: "Hair",
    tagline: "Pure Oshima camellia seed oils, Fino royal jelly masks, and salon scalp tonics.",
    icon: Wind,
    image: PRODUCT_IMAGES[10]!,
    popularTags: ["Fino Hair Mask", "Tsubaki Camellia Oil", "Scalp Purifying"],
  },
  {
    name: "Body Care",
    kanji: "ボディケア",
    department: "Body",
    tagline: "Onsen thermal hot spring body washes, Hinoki cypress milks, and ceramide lotions.",
    icon: Shield,
    image: PRODUCT_IMAGES[11]!,
    popularTags: ["Bouncia Foam", "Hinoki Body Wash", "Ceramide Lotion"],
  },
  {
    name: "Makeup",
    kanji: "メイクアップ",
    department: "Makeup",
    tagline: "Breathable dewy cushions, waterproof tubing mascaras, and watercolor cheek tints.",
    icon: Package,
    image: PRODUCT_IMAGES[12]!,
    popularTags: ["Cushion Foundation", "Waterproof Mascara", "Dewy Blush"],
  },
  {
    name: "Baby Care",
    kanji: "ベビーケア",
    department: "Baby Care",
    tagline:
      "Pediatrician-tested hypoallergenic washes and ceramide milks for delicate infant skin.",
    icon: Smile,
    image: PRODUCT_IMAGES[13]!,
    popularTags: ["Pigeon Foam Wash", "Baby Ceramide Milk", "Tear-Free"],
  },
  {
    name: "Beauty Accessories",
    kanji: "美容小物",
    department: "Accessories",
    tagline: "Handcrafted natural Konjac sponges, jade gua sha, and 100% pure Hiroshima cotton.",
    icon: Scissors,
    image: PRODUCT_IMAGES[14]!,
    popularTags: ["Konjac Sponge", "Mulberry Silk", "Unbleached Cotton"],
  },
  {
    name: "Gift Sets",
    kanji: "ギフトセット",
    department: "Gifts & Kits",
    tagline: "Curated Japanese discovery boxes, full 4-step skincare rituals, and luxury gifts.",
    icon: Gift,
    image: PRODUCT_IMAGES[15]!,
    popularTags: ["Full Ritual Box", "Discovery Trio", "Bestseller Kit"],
  },
  {
    name: "Travel Kits",
    kanji: "トラベルキット",
    department: "Gifts & Kits",
    tagline: "TSA-approved Japanese beauty miniatures designed for on-the-go glowing skin.",
    icon: ShoppingBag,
    image: PRODUCT_IMAGES[1]!,
    popularTags: ["Travel Essentials", "Mini 4-Step Set", "Pouch Ready"],
  },
];

export const J_BEAUTY_STEPS = [
  {
    step: "01",
    name: "Cleansing",
    japanese: "クレンジング",
    action: "Oil Cleanse",
    categorySlug: "cleanser",
    desc: "Dissolve waterproof SPF & makeup without friction.",
  },
  {
    step: "02",
    name: "Face Wash",
    japanese: "洗顔料",
    action: "Micro-Foam",
    categorySlug: "face-wash",
    desc: "Dense cloud-like bubbles sweep impurities from pores.",
  },
  {
    step: "03",
    name: "Lotion / Toner",
    japanese: "化粧水",
    action: "Hydrate & Prep",
    categorySlug: "toner",
    desc: "Drench the skin barrier with watery hyaluronic hydration.",
  },
  {
    step: "04",
    name: "Serum & Essence",
    japanese: "美容液",
    action: "Target & Brighten",
    categorySlug: "serum",
    desc: "Bioactive Sakura and Vitamin C for glass-skin glow.",
  },
  {
    step: "05",
    name: "Moisturizer & SPF",
    japanese: "乳液 · UV",
    action: "Seal & Protect",
    categorySlug: "sunscreen",
    desc: "Lock in moisture with ceramides & block UV rays.",
  },
];

