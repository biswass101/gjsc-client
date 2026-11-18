export interface BannerPageOption {
  key: string;
  label: string;
  group:
    | "Main Storefront Pages"
    | "Curated Collections (Nav Items)"
    | "Japanese Brand Houses (Nav Items)"
    | "Skincare Categories (Nav Items)"
    | "Company & Help Pages";
  route: string;
  defaultTitle: string;
  defaultBadge: string;
}

export const BANNER_PAGE_GROUPS = [
  "Main Storefront Pages",
  "Curated Collections (Nav Items)",
  "Japanese Brand Houses (Nav Items)",
  "Skincare Categories (Nav Items)",
  "Company & Help Pages",
] as const;

export const BANNER_PAGE_OPTIONS: BannerPageOption[] = [
  // 1. Main Storefront Pages
  {
    key: "home_hero",
    label: "Home Page — Master Hero Carousel",
    group: "Main Storefront Pages",
    route: "/",
    defaultTitle: "Pure Japanese Beauty, Direct from Tokyo Sanctuary",
    defaultBadge: "🌸 Tokyo Spring Shipment Arrived",
  },
  {
    key: "home_middle",
    label: "Home Page — Mid-Page Promotion",
    group: "Main Storefront Pages",
    route: "/",
    defaultTitle: "Tokyo Sun Defense & Humidity Mastery",
    defaultBadge: "☀️ Summer Shield Special",
  },
  {
    key: "shop",
    label: "Shop All Products Catalog",
    group: "Main Storefront Pages",
    route: "/shop",
    defaultTitle: "All Japanese Skincare Formulations",
    defaultBadge: "100% Authentic Japanese Formulations",
  },
  {
    key: "offers",
    label: "Seasonal Offers & Deals",
    group: "Main Storefront Pages",
    route: "/offers",
    defaultTitle: "Tokyo Seasonal Gift Specials & BOGO Savings",
    defaultBadge: "Save Up To 35% on Bundles",
  },
  {
    key: "pre_order",
    label: "Pre-Order Direct From Japan",
    group: "Main Storefront Pages",
    route: "/pre-order",
    defaultTitle: "Pre-Order Direct From Tokyo Laboratories",
    defaultBadge: "Direct Ginza Procurement",
  },
  {
    key: "checkout",
    label: "Checkout Trust & Guarantee Strip",
    group: "Main Storefront Pages",
    route: "/checkout",
    defaultTitle: "100% Tokyo Authenticity Guarantee & Insured Delivery",
    defaultBadge: "Safe & Verified Checkout",
  },

  // 2. Curated Collections
  {
    key: "collections",
    label: "All Collections Directory",
    group: "Curated Collections (Nav Items)",
    route: "/collections",
    defaultTitle: "Curated Tokyo Ritual Collections & Sets",
    defaultBadge: "特別コレクション · Curated Tokyo Editions",
  },
  {
    key: "collection_bestsellers",
    label: "Collection: Tokyo Bestsellers (東京ベストセラー)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/bestsellers",
    defaultTitle: "Tokyo Cult Bestsellers & Hall of Fame",
    defaultBadge: "殿堂入り · Hall of Fame",
  },
  {
    key: "collection_new_arrivals",
    label: "Collection: New Arrivals (新作入荷)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/new-arrivals",
    defaultTitle: "Just Landed: Direct from Tokyo Laboratories",
    defaultBadge: "新作入荷 · Fresh Batch 2026",
  },
  {
    key: "collection_combo_gift_sets",
    label: "Collection: Combo & Gift Sets (ギフトセット)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/combo-gift-sets",
    defaultTitle: "Curated Ritual Sets & Luxury Furoshiki Boxes",
    defaultBadge: "ギフトセット · Ritual Duos & Trios",
  },
  {
    key: "collection_skin_concern",
    label: "Collection: Shop by Skin Concern (肌悩み別)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/skin-concern",
    defaultTitle: "Targeted Solutions for Every Skin Barrier Need",
    defaultBadge: "肌悩み別 · Dermatologist Formulated",
  },
  {
    key: "collection_shein",
    label: "Collection: SHEIN Products (SHEIN コレクション)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/shein",
    defaultTitle: "SHEIN Curated Beauty & Japanese Aesthetics",
    defaultBadge: "トレンディ · Viral Beauty Edit",
  },
  {
    key: "collection_pre_order_japan",
    label: "Collection: Pre-Order from Japan (日本直送予約)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/pre-order-japan",
    defaultTitle: "Exclusive Pre-Orders Directly from Tokyo",
    defaultBadge: "日本直送予約 · Direct Japan Import",
  },
  {
    key: "collection_winter_essentials",
    label: "Collection: Winter Essentials (冬の保湿ケア)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/winter-essentials",
    defaultTitle: "Deep Winter Hydration & Moisture Shield",
    defaultBadge: "冬の乾燥対策 · Deep Hydration",
  },
  {
    key: "collection_summer_glow",
    label: "Collection: Summer Glow (夏の美白・紫外線ケア)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/summer-glow",
    defaultTitle: "Sun Defense & Radiant Vitamin C Glow",
    defaultBadge: "夏の美白 · UV Defense",
  },
  {
    key: "collection_travel_size",
    label: "Collection: Travel Size (トラベルサイズ)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/travel-size",
    defaultTitle: "Travel Minis & On-the-Go Tokyo Essentials",
    defaultBadge: "持ち運びに便利 · Travel Minis",
  },
  {
    key: "collection_value_sets",
    label: "Collection: Value Sets (お得なセット)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/value-sets",
    defaultTitle: "High-Value Bundles & Routine Combinations",
    defaultBadge: "お買い得 · Value Bundles",
  },
  {
    key: "collection_k_beauty",
    label: "Collection: K-Beauty Picks (韓国コスメ厳選)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/k-beauty",
    defaultTitle: "Trending Korean Skincare Curations",
    defaultBadge: "K-Beauty · Viral Picks",
  },
  {
    key: "collection_j_beauty",
    label: "Collection: J-Beauty Picks (J-Beauty 特集)",
    group: "Curated Collections (Nav Items)",
    route: "/collections/j-beauty",
    defaultTitle: "The Essence of Traditional Japanese Care",
    defaultBadge: "J-Beauty · Heritage Selection",
  },

  // 3. Japanese Brand Houses
  {
    key: "brands",
    label: "All Brand Houses Directory",
    group: "Japanese Brand Houses (Nav Items)",
    route: "/brands",
    defaultTitle: "Prestige Brand Houses from Ginza, Osaka & Kyoto",
    defaultBadge: "Direct Brand Partnerships",
  },
  {
    key: "brand_glorious_japan",
    label: "Brand: Glorious Japan (グロリアスジャパン)",
    group: "Japanese Brand Houses (Nav Items)",
    route: "/brand/glorious-japan",
    defaultTitle: "Glorious Japan · Ginza Tokyo Prestige Care",
    defaultBadge: "House of Glorious Japan",
  },
  {
    key: "brand_sakura_lab",
    label: "Brand: Sakura Lab (サクララボ)",
    group: "Japanese Brand Houses (Nav Items)",
    route: "/brand/sakura-lab",
    defaultTitle: "Sakura Lab Tokyo · Botanical Bio-Ferments",
    defaultBadge: "Sakura Bio-Ferment Science",
  },
  {
    key: "brand_kyoto_botanicals",
    label: "Brand: Kyoto Botanicals (京都ボタニカル)",
    group: "Japanese Brand Houses (Nav Items)",
    route: "/brand/kyoto-botanicals",
    defaultTitle: "Kyoto Botanicals · Heritage Camellia & Green Tea",
    defaultBadge: "Kyoto Heritage Organic",
  },
  {
    key: "brand_yuzu_no_mori",
    label: "Brand: Yuzu No Mori (ゆずの森)",
    group: "Japanese Brand Houses (Nav Items)",
    route: "/brand/yuzu-no-mori",
    defaultTitle: "Yuzu No Mori · Shikoku Vitamin C Essence",
    defaultBadge: "Shikoku Sun Harvest",
  },
  {
    key: "brand_hikari_beauty",
    label: "Brand: Hikari Beauty (光ビューティー)",
    group: "Japanese Brand Houses (Nav Items)",
    route: "/brand/hikari-beauty",
    defaultTitle: "Hikari Beauty · Cellular Light & Barrier Defense",
    defaultBadge: "Cellular Defense Formula",
  },

  // 4. Skincare Categories
  {
    key: "categories",
    label: "All Categories Directory",
    group: "Skincare Categories (Nav Items)",
    route: "/categories",
    defaultTitle: "8-Step Japanese Beauty Routine Categories",
    defaultBadge: "Tokyo Skincare Hierarchy",
  },
  {
    key: "category_skincare",
    label: "Category: Skincare Rituals (スキンケア)",
    group: "Skincare Categories (Nav Items)",
    route: "/category/skincare",
    defaultTitle: "Complete J-Beauty Skincare Rituals",
    defaultBadge: "スキンケア · 10-Step Ritual",
  },
  {
    key: "category_hair_care",
    label: "Category: Hair Care Rituals (ヘアケア)",
    group: "Skincare Categories (Nav Items)",
    route: "/category/hair-care",
    defaultTitle: "Japanese Scalp Care & Botanical Tsubaki Hair Rituals",
    defaultBadge: "ヘアケア · Scalp & Strands",
  },
  {
    key: "category_body_care",
    label: "Category: Body Care Rituals (ボディケア)",
    group: "Skincare Categories (Nav Items)",
    route: "/category/body-care",
    defaultTitle: "Sensory Onsen Bathing & Silk Body Hydration",
    defaultBadge: "ボディケア · Onsen Bath Rituals",
  },
  {
    key: "category_makeup",
    label: "Category: Makeup & Lip Care (メイクアップ)",
    group: "Skincare Categories (Nav Items)",
    route: "/category/makeup",
    defaultTitle: "Subtle Radiance & Glass-Skin Finishes",
    defaultBadge: "メイクアップ · Japanese Elegance",
  },
  {
    key: "category_baby_care",
    label: "Category: Baby Care (ベビーケア)",
    group: "Skincare Categories (Nav Items)",
    route: "/category/baby-care",
    defaultTitle: "Ultra-Gentle Hypoallergenic Formulas for Infants",
    defaultBadge: "ベビーケア · Safe & Pure",
  },
  {
    key: "category_accessories",
    label: "Category: Accessories & Tools (アクセサリー・雑貨)",
    group: "Skincare Categories (Nav Items)",
    route: "/category/accessories",
    defaultTitle: "Silicone Masks, Cleansing Foaming Nets & Tools",
    defaultBadge: "アクセサリー · J-Beauty Accessories",
  },

  // 5. Company & Help Pages
  {
    key: "about",
    label: "About Us — Brand Story & Heritage",
    group: "Company & Help Pages",
    route: "/about",
    defaultTitle: "The Philosophy of Glorious Japan",
    defaultBadge: "私たちの哲学 · Our Heritage",
  },
  {
    key: "faq",
    label: "FAQs & Customer Support Center",
    group: "Company & Help Pages",
    route: "/faq",
    defaultTitle: "Customer Concierge & Frequently Asked Questions",
    defaultBadge: "サポート · Concierge Desk",
  },
  {
    key: "contact",
    label: "Contact Us & Tokyo Beauty Advisors",
    group: "Company & Help Pages",
    route: "/contact",
    defaultTitle: "Get in Touch with Our Tokyo Beauty Advisors",
    defaultBadge: "お問い合わせ · Live Support",
  },
];

// Helper to look up human-readable title for any key
export function getBannerPageOption(key: string): BannerPageOption | undefined {
  return BANNER_PAGE_OPTIONS.find((p) => p.key === key);
}

// Backward compatibility alias
export const PAGE_KEYS = BANNER_PAGE_OPTIONS;

// Curated destination quick-picks for CTA links
export const DESTINATION_PRESETS = [
  { label: "Shop All Products Catalog", url: "/shop" },
  { label: "Seasonal Offers & Deals", url: "/offers" },
  { label: "Pre-Order Direct from Tokyo", url: "/pre-order" },
  { label: "All Collections Directory", url: "/collections" },
  { label: "Collection: Bestsellers", url: "/collections/bestsellers" },
  { label: "Collection: New Arrivals", url: "/collections/new-arrivals" },
  { label: "Collection: Combo & Gift Sets", url: "/collections/combo-gift-sets" },
  { label: "Collection: Skin Concerns", url: "/collections/skin-concern" },
  { label: "All Brand Houses Directory", url: "/brands" },
  { label: "Brand: Glorious Japan", url: "/brand/glorious-japan" },
  { label: "Brand: Sakura Lab", url: "/brand/sakura-lab" },
  { label: "Brand: Kyoto Botanicals", url: "/brand/kyoto-botanicals" },
  { label: "All Categories Directory", url: "/categories" },
  { label: "Category: Skincare Rituals", url: "/category/skincare" },
  { label: "Customer FAQ & Support", url: "/faq" },
  { label: "Custom External / Internal Link...", url: "custom" },
];

export const DEFAULT_BANNER_PRESETS = [
  "https://res.cloudinary.com/soakj9w7/image/upload/v1794760834/glorious_japan_skin_care/hero/Glorious_Japan_Skincare_Spring_Glow.png",
  "https://res.cloudinary.com/soakj9w7/image/upload/v1794760842/glorious_japan_skin_care/hero/Perfect_Whip_Fresh_Beauty_Ritual.png",
  "https://res.cloudinary.com/soakj9w7/image/upload/v1794760853/glorious_japan_skin_care/hero/puja-sale.png",
  "https://res.cloudinary.com/soakj9w7/image/upload/v1794760839/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio.png",
  "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
  "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
  "https://res.cloudinary.com/soakj9w7/image/upload/v1794760851/glorious_japan_skin_care/hero/japanese-inspired-foaming-skincare-ritual.png",
];

export interface GradientPreset {
  id: string;
  name: string;
  description: string;
  previewClass: string;
  css: string;
}

export const BANNER_GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: "none",
    name: "Clean / No Gradient",
    description: "100% full-color artwork with zero overlay",
    previewClass: "bg-muted border border-border/60",
    css: "none",
  },
  {
    id: "sakura",
    name: "🌸 Sakura Dawn",
    description: "Delicate Tokyo rose tint with soft fade",
    previewClass: "bg-linear-to-r from-rose-900 via-rose-700/60 to-transparent",
    css: "linear-gradient(to right, rgba(136, 19, 55, 0.78), rgba(225, 29, 72, 0.38), transparent)",
  },
  {
    id: "twilight",
    name: "🌙 Tokyo Twilight",
    description: "Deep Ginza midnight indigo atmosphere",
    previewClass: "bg-linear-to-r from-indigo-950 via-slate-900/60 to-transparent",
    css: "linear-gradient(to right, rgba(15, 23, 42, 0.82), rgba(30, 27, 75, 0.42), transparent)",
  },
  {
    id: "matcha",
    name: "🍵 Kyoto Botanical",
    description: "Uji green tea emerald and bamboo depth",
    previewClass: "bg-linear-to-r from-emerald-950 via-teal-900/60 to-transparent",
    css: "linear-gradient(to right, rgba(6, 78, 59, 0.80), rgba(16, 185, 129, 0.35), transparent)",
  },
  {
    id: "amber",
    name: "✨ Ginza Sunset Gold",
    description: "Warm royal amber & camellia glow",
    previewClass: "bg-linear-to-r from-amber-950 via-orange-900/60 to-transparent",
    css: "linear-gradient(to right, rgba(120, 53, 15, 0.82), rgba(245, 158, 11, 0.35), transparent)",
  },
  {
    id: "noir",
    name: "🖤 Tokyo Noir",
    description: "Elegant velvet charcoal for high contrast",
    previewClass: "bg-linear-to-r from-neutral-950 via-neutral-900/60 to-transparent",
    css: "linear-gradient(to right, rgba(10, 10, 10, 0.80), rgba(23, 23, 23, 0.40), transparent)",
  },
];

export function resolveBannerGradient(gradient?: string | null): string {
  if (!gradient || gradient === "none") return "none";
  const found = BANNER_GRADIENT_PRESETS.find((p) => p.id === gradient);
  if (found) return found.css;
  if (gradient.startsWith("linear-gradient") || gradient.startsWith("radial-gradient")) {
    return gradient;
  }
  return "none";
}
