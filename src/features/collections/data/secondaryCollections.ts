import heroSakura from "@/assets/hero/hero-sakura.png";
import heroPuja from "@/assets/hero/puja-sale.png";
import heroSerenity from "@/assets/hero/Japanese Skincare Serenity Trio.png";
import heroSerenity1 from "@/assets/hero/Japanese Skincare Serenity Trio (1).png";
import heroCozy from "@/assets/hero/Cozy Japanese Skincare Routine.png";
import heroGirl from "@/assets/hero/hero-with-japanese-girl.png";
import type { CollectionMeta } from "./types";

export const SECONDARY_COLLECTIONS: CollectionMeta[] = [
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

