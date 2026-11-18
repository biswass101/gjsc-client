import type { AdminDiscount, AdminBanner } from "@/types";

export const INITIAL_DISCOUNTS: AdminDiscount[] = [
  {
    id: "disc-1",
    code: "TOKYO10",
    type: "percentage",
    value: 10,
    minSpend: 2000,
    usageLimit: 500,
    usageCount: 142,
    status: "active",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
  },
  {
    id: "disc-2",
    code: "SAKURA500",
    type: "fixed",
    value: 500,
    minSpend: 4000,
    usageLimit: 200,
    usageCount: 78,
    status: "active",
    startDate: "2026-08-01",
    endDate: "2026-09-30",
  },
];

export const INITIAL_BANNERS: AdminBanner[] = [
  // 1. Home Master Hero Carousel (3 Slides)
  {
    id: "ban-home-hero-1",
    pageKey: "home_hero",
    pageTitle: "Home Master Hero — Tokyo Sanctuary",
    title: "",
    subtitle: undefined,
    badge: undefined,
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760834/glorious_japan_skin_care/hero/Glorious_Japan_Skincare_Spring_Glow.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760842/glorious_japan_skin_care/hero/Perfect_Whip_Fresh_Beauty_Ritual.png",
    ctaLink: "/collections/bestsellers",
    active: true,
    order: 1,
  },
  {
    id: "ban-home-hero-2",
    pageKey: "home_hero",
    pageTitle: "Home Master Hero — Kyoto Camellia Ritual",
    title: "",
    subtitle: undefined,
    badge: undefined,
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760853/glorious_japan_skin_care/hero/puja-sale.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760839/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio.png",
    ctaLink: "/shop?category=skincare",
    active: true,
    order: 2,
  },
  {
    id: "ban-home-hero-3",
    pageKey: "home_hero",
    pageTitle: "Home Master Hero — Bio-Ferment Innovation",
    title: "",
    subtitle: undefined,
    badge: undefined,
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
    ctaLink: "/collections/new-arrivals",
    active: true,
    order: 3,
  },

  // 2. Home Mid-Page Promotion
  {
    id: "ban-home-mid-1",
    pageKey: "home_middle",
    pageTitle: "Home Page — Mid-Page Promotion",
    title: "Tokyo Sun Defense & Humidity Mastery",
    subtitle:
      "Anessa, Biore & Skin Aqua — Japan's top UV milks with weightless finish and extreme weather defense.",
    badge: "☀️ Summer Shield Special",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760851/glorious_japan_skin_care/hero/japanese-inspired-foaming-skincare-ritual.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760831/glorious_japan_skin_care/hero/Cozy_Japanese_Skincare_Routine.png",
    ctaLink: "/shop",
    active: true,
    order: 1,
  },

  // 3. Core Storefront Hubs
  {
    id: "ban-shop-1",
    pageKey: "shop",
    pageTitle: "Catalog Shop Page Header",
    title: "All Japanese Skincare Formulations",
    subtitle:
      "Browse over 800+ authentic imported cosmetics verified with Tokyo laboratory batch codes.",
    badge: "100% Authentic Japanese Formulations",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760848/glorious_japan_skin_care/hero/hero-sakura.png",
    ctaLink: "/shop",
    active: true,
    order: 1,
  },
  {
    id: "ban-offers-1",
    pageKey: "offers",
    pageTitle: "Seasonal Offers & Deals Header",
    title: "Tokyo Seasonal Gift Specials & BOGO Savings",
    subtitle:
      "Exclusive Japanese skincare bundles, free gift discovery sets, and limited discount codes.",
    badge: "Save Up To 35% on Bundles",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760847/glorious_japan_skin_care/hero/hero-sakura-pink.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760845/glorious_japan_skin_care/hero/hero-japanses-culture-bg.png",
    ctaLink: "/offers",
    active: true,
    order: 1,
  },
  {
    id: "ban-pre-order-1",
    pageKey: "pre_order",
    pageTitle: "Pre-Order Direct From Japan",
    title: "Pre-Order Direct From Tokyo Laboratories",
    subtitle:
      "Reserve exclusive prestige formulations delivered by temperature-controlled air freight in 10-14 days.",
    badge: "Direct Ginza Procurement",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760834/glorious_japan_skin_care/hero/Glorious_Japan_Skincare_Spring_Glow.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760842/glorious_japan_skin_care/hero/Perfect_Whip_Fresh_Beauty_Ritual.png",
    ctaLink: "/pre-order",
    active: true,
    order: 1,
  },
  {
    id: "ban-checkout-1",
    pageKey: "checkout",
    pageTitle: "Checkout Trust Strip",
    title: "100% Tokyo Authenticity Guarantee & Insured Delivery",
    subtitle:
      "Express delivery across all 64 districts in Bangladesh with safe Cash on Delivery and bKash.",
    badge: "Safe & Verified Checkout",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760853/glorious_japan_skin_care/hero/puja-sale.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760839/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio.png",
    ctaLink: "/checkout",
    active: true,
    order: 1,
  },

  // 4. Collections Hub & Individual Collections
  {
    id: "ban-collections-hub-1",
    pageKey: "collections",
    pageTitle: "All Collections Directory Header",
    title: "Curated Tokyo Ritual Collections & Sets",
    subtitle:
      "Hand-selected beauty rituals from Glass Skin essentials to Barrier Repair duos, crafted for Asian skin.",
    badge: "特別コレクション · Curated Tokyo Editions",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
    ctaLink: "/collections",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-bestsellers-1",
    pageKey: "collection_bestsellers",
    pageTitle: "Collection: Tokyo Bestsellers Hero",
    title: "Tokyo Cult Bestsellers & Hall of Fame",
    subtitle:
      "The highest-rated Japanese essences, watery lotions, and cleansing oils beloved by millions across Tokyo.",
    badge: "殿堂入り · Hall of Fame",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760851/glorious_japan_skin_care/hero/japanese-inspired-foaming-skincare-ritual.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760831/glorious_japan_skin_care/hero/Cozy_Japanese_Skincare_Routine.png",
    ctaLink: "/collections/bestsellers",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-new-arrivals-1",
    pageKey: "collection_new_arrivals",
    pageTitle: "Collection: New Arrivals Hero",
    title: "Just Landed: Direct from Tokyo Laboratories",
    subtitle:
      "The newest formulations, seasonal limited releases, and updated 2026 recipe revisions freshly imported.",
    badge: "新作入荷 · Fresh Batch 2026",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760848/glorious_japan_skin_care/hero/hero-sakura.png",
    ctaLink: "/collections/new-arrivals",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-combo-sets-1",
    pageKey: "collection_combo_gift_sets",
    pageTitle: "Collection: Combo & Gift Sets Hero",
    title: "Curated Ritual Sets & Luxury Furoshiki Boxes",
    subtitle:
      "Complete multi-step skincare routines paired for synergistic efficacy and elegantly presented for gifting.",
    badge: "ギフトセット · Ritual Duos & Trios",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760847/glorious_japan_skin_care/hero/hero-sakura-pink.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760845/glorious_japan_skin_care/hero/hero-japanses-culture-bg.png",
    ctaLink: "/collections/combo-gift-sets",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-skin-concern-1",
    pageKey: "collection_skin_concern",
    pageTitle: "Collection: Skin Concern Solutions Hero",
    title: "Targeted Solutions for Every Skin Barrier Need",
    subtitle:
      "Specialized regimens for hyperpigmentation, acne-prone sensitivity, dehydration, and weakened barriers.",
    badge: "肌悩み別 · Dermatologist Formulated",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760834/glorious_japan_skin_care/hero/Glorious_Japan_Skincare_Spring_Glow.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760842/glorious_japan_skin_care/hero/Perfect_Whip_Fresh_Beauty_Ritual.png",
    ctaLink: "/collections/skin-concern",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-shein-1",
    pageKey: "collection_shein",
    pageTitle: "Collection: SHEIN Products Hero",
    title: "SHEIN Curated Beauty & Japanese Aesthetics",
    subtitle:
      "Trending viral beauty tools, compact organizers, and beauty lifestyle picks.",
    badge: "トレンディ · Viral Beauty Edit",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760853/glorious_japan_skin_care/hero/puja-sale.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760839/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio.png",
    ctaLink: "/collections/shein",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-pre-order-1",
    pageKey: "collection_pre_order_japan",
    pageTitle: "Collection: Pre-Order from Japan Hero",
    title: "Exclusive Pre-Orders Directly from Tokyo",
    subtitle:
      "Rare salon-grade cosmetics, department store exclusives, and boutique formulations air-shipped to your door.",
    badge: "日本直送予約 · Direct Japan Import",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
    ctaLink: "/collections/pre-order-japan",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-winter-1",
    pageKey: "collection_winter_essentials",
    pageTitle: "Collection: Winter Essentials Hero",
    title: "Deep Winter Moisture & Extreme Barrier Comfort",
    subtitle:
      "Multi-ceramide creams, horse oil formulations, and rich hyaluronic treatments to withstand harsh dry cold.",
    badge: "厳選冬の保湿 · Winter Comfort",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760851/glorious_japan_skin_care/hero/japanese-inspired-foaming-skincare-ritual.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760831/glorious_japan_skin_care/hero/Cozy_Japanese_Skincare_Routine.png",
    ctaLink: "/collections/winter-essentials",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-summer-1",
    pageKey: "collection_summer_glow",
    pageTitle: "Collection: Summer Glow Hero",
    title: "Featherlight Hydration & Tokyo Glass-Skin Radiance",
    subtitle:
      "Oil-free water gels, brightening vitamin C drops, and sweat-resistant sun shields for hot humid days.",
    badge: "夏の輝きUV · Summer Radiance",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760848/glorious_japan_skin_care/hero/hero-sakura.png",
    ctaLink: "/collections/summer-glow",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-travel-1",
    pageKey: "collection_travel_size",
    pageTitle: "Collection: Travel Size Minis Hero",
    title: "Travel Minis & On-the-Go Tokyo Essentials",
    subtitle:
      "Compact TSA-friendly cleansing oils, mist toners, and travel-ready barrier kits for globetrotters.",
    badge: "持ち運びに便利 · Travel Minis",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760847/glorious_japan_skin_care/hero/hero-sakura-pink.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760845/glorious_japan_skin_care/hero/hero-japanses-culture-bg.png",
    ctaLink: "/collections/travel-size",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-value-1",
    pageKey: "collection_value_sets",
    pageTitle: "Collection: High-Value Sets Hero",
    title: "High-Value Bundles & Complete Routine Sets",
    subtitle:
      "Save up to 35% on full morning-and-night Japanese skincare rituals and limited curated gift sets.",
    badge: "お買い得 · Value Bundles",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760834/glorious_japan_skin_care/hero/Glorious_Japan_Skincare_Spring_Glow.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760842/glorious_japan_skin_care/hero/Perfect_Whip_Fresh_Beauty_Ritual.png",
    ctaLink: "/collections/value-sets",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-k-beauty-1",
    pageKey: "collection_k_beauty",
    pageTitle: "Collection: K-Beauty Picks Hero",
    title: "Trending Korean Skincare Curations & Viral Glass Skin",
    subtitle:
      "Centella asiatica soothing serums, snail mucin essences, and heartleaf calming toners hand-picked for you.",
    badge: "K-Beauty · Viral Picks",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760853/glorious_japan_skin_care/hero/puja-sale.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760839/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio.png",
    ctaLink: "/collections/k-beauty",
    active: true,
    order: 1,
  },
  {
    id: "ban-col-j-beauty-1",
    pageKey: "collection_j_beauty",
    pageTitle: "Collection: J-Beauty Heritage Selection Hero",
    title: "The Pure Essence of Traditional Japanese Care",
    subtitle:
      "Centuries-old botanical wisdom, rice ferment filtrates, and silk protein hydration from Kyoto and Ginza.",
    badge: "J-Beauty · Heritage Selection",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
    ctaLink: "/collections/j-beauty",
    active: true,
    order: 1,
  },

  // 5. Brands Hub & Individual Brand Houses
  {
    id: "ban-brands-hub-1",
    pageKey: "brands",
    pageTitle: "Japanese Brand House Directory Header",
    title: "Prestige Brand Houses from Ginza, Osaka & Kyoto",
    subtitle:
      "Official brand authorized distributors: Glorious Japan, Sakura Lab, Kyoto Botanicals, and Yuzu No Mori.",
    badge: "Direct Brand Partnerships",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760851/glorious_japan_skin_care/hero/japanese-inspired-foaming-skincare-ritual.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760831/glorious_japan_skin_care/hero/Cozy_Japanese_Skincare_Routine.png",
    ctaLink: "/brands",
    active: true,
    order: 1,
  },
  {
    id: "ban-brand-glorious-1",
    pageKey: "brand_glorious_japan",
    pageTitle: "Brand: Glorious Japan Hero Banner",
    title: "Glorious Japan · Ginza Tokyo Prestige Care",
    subtitle:
      "Rooted in centuries of classical Japanese beauty wisdom fused with modern cellular fermentation science.",
    badge: "House of Glorious Japan",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760848/glorious_japan_skin_care/hero/hero-sakura.png",
    ctaLink: "/brand/glorious-japan",
    active: true,
    order: 1,
  },
  {
    id: "ban-brand-sakura-1",
    pageKey: "brand_sakura_lab",
    pageTitle: "Brand: Sakura Lab Hero Banner",
    title: "Sakura Lab Tokyo · Botanical Bio-Ferments",
    subtitle:
      "Clinically engineered fermented cherry blossom extract and high-potency ceramides for deep radiance.",
    badge: "Sakura Bio-Ferment Science",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760847/glorious_japan_skin_care/hero/hero-sakura-pink.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760845/glorious_japan_skin_care/hero/hero-japanses-culture-bg.png",
    ctaLink: "/brand/sakura-lab",
    active: true,
    order: 1,
  },
  {
    id: "ban-brand-kyoto-1",
    pageKey: "brand_kyoto_botanicals",
    pageTitle: "Brand: Kyoto Botanicals Hero Banner",
    title: "Kyoto Botanicals · Heritage Camellia & Green Tea",
    subtitle:
      "Traditional cold-pressed organic botanicals hand-harvested from certified Kyoto family estates.",
    badge: "Kyoto Heritage Organic",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760834/glorious_japan_skin_care/hero/Glorious_Japan_Skincare_Spring_Glow.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760842/glorious_japan_skin_care/hero/Perfect_Whip_Fresh_Beauty_Ritual.png",
    ctaLink: "/brand/kyoto-botanicals",
    active: true,
    order: 1,
  },
  {
    id: "ban-brand-yuzu-1",
    pageKey: "brand_yuzu_no_mori",
    pageTitle: "Brand: Yuzu No Mori Hero Banner",
    title: "Yuzu No Mori · Shikoku Vitamin C Essence",
    subtitle:
      "Hand-picked Shikoku Island yuzu citrus packed with pure, stable Vitamin C to banish dullness and fatigue.",
    badge: "Shikoku Sun Harvest",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760853/glorious_japan_skin_care/hero/puja-sale.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760839/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio.png",
    ctaLink: "/brand/yuzu-no-mori",
    active: true,
    order: 1,
  },
  {
    id: "ban-brand-hikari-1",
    pageKey: "brand_hikari_beauty",
    pageTitle: "Brand: Hikari Beauty Hero Banner",
    title: "Hikari Beauty · Cellular Light & Barrier Defense",
    subtitle:
      "Innovative biomimetic lipid complexes delivering resilient protection against environmental pollutants.",
    badge: "Cellular Defense Formula",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
    ctaLink: "/brand/hikari-beauty",
    active: true,
    order: 1,
  },

  // 6. Categories Hub & Individual Categories
  {
    id: "ban-cat-hub-1",
    pageKey: "categories",
    pageTitle: "Categories Hub Header",
    title: "8-Step Japanese Beauty Routine Categories",
    subtitle:
      "From gentle oil cleansing and watery lotions to rich ceramides and UV protection shields.",
    badge: "Tokyo Skincare Hierarchy",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760851/glorious_japan_skin_care/hero/japanese-inspired-foaming-skincare-ritual.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760831/glorious_japan_skin_care/hero/Cozy_Japanese_Skincare_Routine.png",
    ctaLink: "/categories",
    active: true,
    order: 1,
  },
  {
    id: "ban-cat-skincare-1",
    pageKey: "category_skincare",
    pageTitle: "Category: Skincare Rituals Hero",
    title: "Complete J-Beauty Skincare Rituals",
    subtitle:
      "Layered hydration, double cleansing, balancing lotions, and targeted treatment serums.",
    badge: "スキンケア · 10-Step Ritual",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760848/glorious_japan_skin_care/hero/hero-sakura.png",
    ctaLink: "/category/skincare",
    active: true,
    order: 1,
  },
  {
    id: "ban-cat-hair-care-1",
    pageKey: "category_hair_care",
    pageTitle: "Category: Hair Care Rituals Hero",
    title: "Japanese Scalp Care & Botanical Tsubaki Hair Rituals",
    subtitle:
      "Salon-grade amino acid shampoos, tsubaki camellia oil treatments, and deep restorative hair masks.",
    badge: "ヘアケア · Scalp & Strands",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760847/glorious_japan_skin_care/hero/hero-sakura-pink.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760845/glorious_japan_skin_care/hero/hero-japanses-culture-bg.png",
    ctaLink: "/category/hair-care",
    active: true,
    order: 1,
  },
  {
    id: "ban-cat-body-care-1",
    pageKey: "category_body_care",
    pageTitle: "Category: Body Care Rituals Hero",
    title: "Sensory Onsen Bathing & Silk Body Hydration",
    subtitle:
      "Nourishing milk washes, hot-spring mineral soaks, and velvety hand balms imported from Japan.",
    badge: "ボディケア · Onsen Bath Rituals",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760834/glorious_japan_skin_care/hero/Glorious_Japan_Skincare_Spring_Glow.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760842/glorious_japan_skin_care/hero/Perfect_Whip_Fresh_Beauty_Ritual.png",
    ctaLink: "/category/body-care",
    active: true,
    order: 1,
  },
  {
    id: "ban-cat-makeup-1",
    pageKey: "category_makeup",
    pageTitle: "Category: Makeup & Lip Care Hero",
    title: "Subtle Radiance & Glass-Skin Makeup Finishes",
    subtitle:
      "Japanese tinted lip oils, featherweight cushion balms, and natural glow makeup direct from Tokyo.",
    badge: "メイクアップ · Japanese Elegance",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760853/glorious_japan_skin_care/hero/puja-sale.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760839/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio.png",
    ctaLink: "/category/makeup",
    active: true,
    order: 1,
  },
  {
    id: "ban-cat-baby-1",
    pageKey: "category_baby_care",
    pageTitle: "Category: Baby Care Pure Formulations Hero",
    title: "Ultra-Gentle Hypoallergenic Formulas for Sensitive Skin & Infants",
    subtitle:
      "Pediatrician-tested pigeon milk baths, unscented barrier creams, and pure natural cotton care from Japan.",
    badge: "ベビーケア · Safe & Pure",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
    ctaLink: "/category/baby-care",
    active: true,
    order: 1,
  },
  {
    id: "ban-cat-accessories-1",
    pageKey: "category_accessories",
    pageTitle: "Category: Beauty Accessories & Tools Hero",
    title: "Silicone Foaming Nets, Cleansing Sponges & Facial Massage Tools",
    subtitle:
      "Authentic Japanese whipping nets, konjac cleansing sponges, and precision beauty accessories.",
    badge: "アクセサリー · J-Beauty Accessories",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760851/glorious_japan_skin_care/hero/japanese-inspired-foaming-skincare-ritual.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760831/glorious_japan_skin_care/hero/Cozy_Japanese_Skincare_Routine.png",
    ctaLink: "/category/accessories",
    active: true,
    order: 1,
  },

  // 7. Information & Help Pages
  {
    id: "ban-about-1",
    pageKey: "about",
    pageTitle: "About Us Header Banner",
    title: "The Philosophy of Glorious Japan",
    subtitle:
      "Bridging ancient Ginza apothecary traditions and modern Tokyo biochemistry directly to Dhaka.",
    badge: "私たちの哲学 · Our Heritage",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760848/glorious_japan_skin_care/hero/hero-sakura.png",
    ctaLink: "/about",
    active: true,
    order: 1,
  },
  {
    id: "ban-faq-1",
    pageKey: "faq",
    pageTitle: "FAQs & Help Center Header",
    title: "Customer Concierge & Frequently Asked Questions",
    subtitle:
      "Everything you need to know about Tokyo authenticity verification, air freight shipping, and COD in Bangladesh.",
    badge: "サポート · Concierge Desk",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760847/glorious_japan_skin_care/hero/hero-sakura-pink.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760845/glorious_japan_skin_care/hero/hero-japanses-culture-bg.png",
    ctaLink: "/faq",
    active: true,
    order: 1,
  },
  {
    id: "ban-contact-1",
    pageKey: "contact",
    pageTitle: "Contact Us Header Banner",
    title: "Get in Touch with Our Tokyo Beauty Advisors",
    subtitle:
      "Personalized skincare consultations, batch code authenticity checks, and dedicated WhatsApp support.",
    badge: "お問い合わせ · Live Support",
    imageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760834/glorious_japan_skin_care/hero/Glorious_Japan_Skincare_Spring_Glow.png",
    mobileImageUrl:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760842/glorious_japan_skin_care/hero/Perfect_Whip_Fresh_Beauty_Ritual.png",
    ctaLink: "/contact",
    active: true,
    order: 1,
  },
];
