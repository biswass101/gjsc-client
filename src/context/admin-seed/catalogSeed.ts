import type { AdminCategory, AdminCollection } from "@/types";

export const INITIAL_CATEGORIES: AdminCategory[] = [
  {
    "title": "Serums & Ampoules",
    "slug": "serum",
    "japaneseTitle": "美容液 · High Potency Actives",
    "tagline": "Concentrated bioactive formulas delivering glass-skin radiance and dark spot correction.",
    "description": "Fast-absorbing targeted treatments packed with Sakura bio-ferments, pure Vitamin C, and multi-weight hyaluronic acid for translucent glass skin.",
    "metaDescription": "Explore authentic Japanese serums and ampoules imported directly from Tokyo. Brighten, hydrate, and target skin concerns with bioactive formulations.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760872/glorious_japan_skin_care/new_products_images/i1.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760848/glorious_japan_skin_care/hero/hero-sakura.png",
    "icon": "Zap",
    "parentCategory": "Skincare",
    "subcategories": [
      "Brightening Serum",
      "Barrier Serum",
      "Hydrating Serum",
      "Niacinamide",
      "Vitamin C",
      "Peptide Ampoules"
    ],
    "popularTags": [
      "Sakura Serum",
      "Niacinamide",
      "Vitamin C",
      "Peptides",
      "Glass Skin"
    ],
    "ritualStep": {
      "step": "Step 04",
      "label": "Treat & Brighten"
    },
    "featured": true,
    "itemCount": 15,
    "id": "cat-1"
  },
  {
    "title": "Sunscreens & UV Defense",
    "slug": "sunscreen",
    "japaneseTitle": "日焼け止め · Broad Spectrum",
    "tagline": "Japan's #1 SPF50+ PA++++ weightless watery defense with zero white cast or grease.",
    "description": "Award-winning Japanese UV protection formulas with hyaluronic acid, sweat resistance, and invisible non-greasy watery gel textures.",
    "metaDescription": "Discover Japan's top-rated SPF50+ PA++++ sunscreens. Feather-light water gels and sun milks that protect and hydrate with zero white cast.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760881/glorious_japan_skin_care/new_products_images/i6.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760834/glorious_japan_skin_care/hero/Glorious_Japan_Skincare_Spring_Glow.png",
    "icon": "Sunrise",
    "parentCategory": "Skincare",
    "subcategories": [
      "Sun Milk",
      "Water Gel Sunscreen",
      "Watery Essence",
      "Mineral Sunscreen",
      "Tone-Up UV"
    ],
    "popularTags": [
      "Water Gel SPF50",
      "Mermaid Gel",
      "Thermo Booster",
      "Sweat-Proof"
    ],
    "ritualStep": {
      "step": "Step 05",
      "label": "UV Barrier Shield"
    },
    "featured": true,
    "itemCount": 16,
    "id": "cat-2"
  },
  {
    "title": "Toners & Skin Softeners",
    "slug": "toner",
    "japaneseTitle": "化粧水 · Balance & Prep",
    "tagline": "Japan's signature watery lotions that drench the skin barrier and balance pH.",
    "description": "Alcohol-free hydrating lotions and skin conditioners infused with fermented rice water, Job's tears (Hatomugi), and soothing matcha botanicals.",
    "metaDescription": "Quench thirsty skin with authentic Japanese toners and lotions. Replenish moisture and restore optimal skin pH balance with rice and botanical extracts.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760879/glorious_japan_skin_care/new_products_images/i3.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
    "icon": "Layers",
    "parentCategory": "Skincare",
    "subcategories": [
      "Hydrating Toner",
      "Clarifying Toner",
      "Calming Lotion",
      "Hatomugi Skin Conditioner"
    ],
    "popularTags": [
      "Hyaluronic Lotion",
      "Hatomugi",
      "Matcha Water",
      "Aqua Shield"
    ],
    "ritualStep": {
      "step": "Step 03",
      "label": "Hydrate & Prep"
    },
    "featured": true,
    "itemCount": 12,
    "id": "cat-3"
  },
  {
    "title": "Cleansers & Double Cleanse",
    "slug": "cleanser",
    "japaneseTitle": "クレンジング · Pure Botanicals",
    "tagline": "Melts away waterproof makeup, excess sebum, and SPF without stripping natural lipids.",
    "description": "Silky Japanese cleansing oils, melting balms, and gentle micellar waters formulated with botanical camellia, olive, and rice germ oils.",
    "metaDescription": "Experience authentic Japanese double cleansing. Dissolve stubborn makeup and sunscreen effortlessly without stripping your skin's natural moisture.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760881/glorious_japan_skin_care/new_products_images/i5.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760851/glorious_japan_skin_care/hero/japanese-inspired-foaming-skincare-ritual.png",
    "icon": "Beaker",
    "parentCategory": "Skincare",
    "subcategories": [
      "Cleansing Oil",
      "Cleansing Balm",
      "Micellar Cleansing Water",
      "Gel Cleanser"
    ],
    "popularTags": [
      "Deep Cleansing Oil",
      "Cleansing Balm",
      "Micellar Water",
      "Waterproof Melt"
    ],
    "ritualStep": {
      "step": "Step 01",
      "label": "Oil Cleanse"
    },
    "featured": true,
    "itemCount": 14,
    "id": "cat-4"
  },
  {
    "title": "Face Wash & Micro-Foams",
    "slug": "face-wash",
    "japaneseTitle": "洗顔料 · Dense Micro-Foam",
    "tagline": "Micro-dense whipped foam cleansers that cushion skin and purify pores gently.",
    "description": "Amino acid-based face washes and enzyme powder washes that whip into dense marshmallow clouds, sweeping away impurities with zero friction.",
    "metaDescription": "Gently purify pores with rich, micro-dense Japanese foam cleansers. Low-pH and amino acid formulations designed for friction-free face washing.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760883/glorious_japan_skin_care/new_products_images/i7.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760842/glorious_japan_skin_care/hero/Perfect_Whip_Fresh_Beauty_Ritual.png",
    "icon": "Droplets",
    "parentCategory": "Skincare",
    "subcategories": [
      "Dense Micro-Foam",
      "Enzyme Powder Wash",
      "Low-pH Gentle Wash",
      "Acne Care Wash"
    ],
    "popularTags": [
      "Dense Foam Wash",
      "Low-pH Wash",
      "Enzyme Powder",
      "Pore Purify"
    ],
    "ritualStep": {
      "step": "Step 02",
      "label": "Micro-Foam Wash"
    },
    "featured": true,
    "itemCount": 10,
    "id": "cat-5"
  },
  {
    "title": "Moisturizers & Creams",
    "slug": "moisturizer",
    "japaneseTitle": "乳液・クリーム · Barrier Seal",
    "tagline": "Slow-fermented rice and biomimetic ceramide creams locking in 72-hour moisture.",
    "description": "Lightweight milky emulsions, bouncy water-gels, and rich lipid-barrier creams that seal in deep hydration and reinforce the natural skin barrier.",
    "metaDescription": "Fortify your moisture barrier with Japanese hydrating creams, emulsions, and water-gels. Infused with ceramides, squalane, and fermented rice extract.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760878/glorious_japan_skin_care/new_products_images/i2.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760831/glorious_japan_skin_care/hero/Cozy_Japanese_Skincare_Routine.png",
    "icon": "Smile",
    "parentCategory": "Skincare",
    "subcategories": [
      "Gel Cream",
      "Barrier Cream",
      "Milky Emulsion",
      "Night Recovery Cream"
    ],
    "popularTags": [
      "Ceramide Cream",
      "Aqua Gel",
      "Night Emulsion",
      "Barrier Repair"
    ],
    "ritualStep": {
      "step": "Step 05",
      "label": "Moisture Lock"
    },
    "featured": true,
    "itemCount": 12,
    "id": "cat-6"
  },
  {
    "title": "Essences & First Treatments",
    "slug": "essence",
    "japaneseTitle": "エッセンス · Deep Moisture",
    "tagline": "Deeply penetrating fermented yeast and botanical extracts for crystal-clear skin.",
    "description": "Water-light first treatment essences formulated with Galactomyces, Pitera, and fermented botanical nutrients that penetrate down to cellular layers.",
    "metaDescription": "Discover authentic Japanese treatment essences. Supercharge skin renewal and clarity with rich fermented extracts and natural sake koji.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760880/glorious_japan_skin_care/new_products_images/i4.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
    "icon": "Sparkles",
    "parentCategory": "Skincare",
    "subcategories": [
      "First Essence",
      "Treatment Essence",
      "Ferment Filtrate",
      "Hydrating Essence"
    ],
    "popularTags": [
      "Pitera Ferment",
      "Yuzu Extract",
      "Sake Koji Water",
      "Crystal Clear"
    ],
    "featured": true,
    "itemCount": 10,
    "id": "cat-7"
  },
  {
    "title": "Face Masks & Treatments",
    "slug": "face-mask",
    "japaneseTitle": "フェイスマスク · Daily Glow",
    "tagline": "15-minute intensive hydration sheet masks and brightening rice wash-off packs.",
    "description": "Everyday bulk sheet mask packs, biocellulose treatment masks, and mineral-rich Japanese rice wash-off packs delivering instant salon-grade radiance.",
    "metaDescription": "Hydrate and brighten in 15 minutes with Japan's top sheet masks and rice wash-off packs. Daily skin nourishment packed with vitamins and botanicals.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760884/glorious_japan_skin_care/new_products_images/i8.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760847/glorious_japan_skin_care/hero/hero-sakura-pink.png",
    "icon": "Palette",
    "parentCategory": "Skincare",
    "subcategories": [
      "Daily Sheet Masks",
      "Wash-Off Rice Mask",
      "Hydrogel Mask",
      "Sleeping Pack"
    ],
    "popularTags": [
      "Daily LuLuLun",
      "Rice Serum Mask",
      "Gold Infusion",
      "Instant Glow"
    ],
    "featured": true,
    "itemCount": 12,
    "id": "cat-8"
  },
  {
    "title": "Eye Care & Creams",
    "slug": "eye-care",
    "japaneseTitle": "アイクリーム · Gentle Vitality",
    "tagline": "Delicate brightening pearl extracts and retinol eye creams for smooth contours.",
    "description": "Gentle yet powerful Japanese eye formulations designed to target dark circles, under-eye puffiness, and fine expression lines with micro-peptides.",
    "metaDescription": "Brighten and smooth delicate under-eye contours with authentic Japanese eye creams and collagen hydrogel patches. Targeted anti-aging care.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760884/glorious_japan_skin_care/new_products_images/i9.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760839/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio.png",
    "icon": "Eye",
    "parentCategory": "Skincare",
    "subcategories": [
      "Eye Cream",
      "Eye Serum",
      "Collagen Eye Patches",
      "Retinol Care"
    ],
    "popularTags": [
      "Pearl Eye Cream",
      "Retinol Care",
      "Hydra Depuff",
      "Dark Circle Relief"
    ],
    "featured": true,
    "itemCount": 8,
    "id": "cat-9"
  },
  {
    "title": "Lip Care & Balms",
    "slug": "lip-care",
    "japaneseTitle": "リップケア · Silky Moisture",
    "tagline": "Nourishing cherry blossom butters, camellia oils, and melty overnight balms.",
    "description": "Melty Japanese lip balms, SPF protective lip conditioners, and deep-conditioning overnight lip sleeping masks with sakura extract and squalane.",
    "metaDescription": "Condition and protect lips with Tokyo's favorite lip balms and overnight treatment masks. Formulated with squalane, camellia oil, and cherry blossom.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760873/glorious_japan_skin_care/new_products_images/i10.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760848/glorious_japan_skin_care/hero/hero-sakura.png",
    "icon": "Leaf",
    "parentCategory": "Skincare",
    "subcategories": [
      "Melty Lip Balm",
      "Lip Sleeping Mask",
      "Tinted Lip Conditioner",
      "Lip Scrub"
    ],
    "popularTags": [
      "Melty Lip Balm",
      "Sakura Petal Butter",
      "Lip Scrub",
      "Overnight Lip Mask"
    ],
    "featured": true,
    "itemCount": 8,
    "id": "cat-10"
  },
  {
    "title": "Japanese Hair Rituals",
    "slug": "hair-care",
    "japaneseTitle": "ヘアケア · Tsubaki & Fino",
    "tagline": "Pure Oshima camellia seed oils, Fino royal jelly masks, and salon scalp tonics.",
    "description": "Transformative Japanese hair repair treatments, scalp-purifying clarifying shampoos, and nourishing camellia seed hair oils for silky, glass-like shine.",
    "metaDescription": "Restore damaged hair with Japan's viral hair masks and camellia seed oils. Shop authentic Fino, Tsubaki, and salon-grade Japanese haircare.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760874/glorious_japan_skin_care/new_products_images/i11.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760845/glorious_japan_skin_care/hero/hero-japanses-culture-bg.png",
    "icon": "Wind",
    "parentCategory": "Hair",
    "subcategories": [
      "Hair Masks",
      "Hair Oils",
      "Scalp Shampoos",
      "Nourishing Conditioners",
      "Scalp Care"
    ],
    "popularTags": [
      "Fino Hair Mask",
      "Tsubaki Camellia Oil",
      "Scalp Purifying",
      "Damage Repair"
    ],
    "featured": true,
    "itemCount": 14,
    "id": "cat-11"
  },
  {
    "title": "Body Care & Onsen Rituals",
    "slug": "body-care",
    "japaneseTitle": "ボディケア · Silky Smooth",
    "tagline": "Onsen thermal hot spring body washes, Hinoki cypress milks, and ceramide lotions.",
    "description": "Indulgent thermal spring body washes, Hinoki cypress aromatic body milks, and ultra-hydrating ceramide creams for head-to-toe softness.",
    "metaDescription": "Treat your body to Japanese onsen rituals with rich body soaps, whitening lotions, and ceramide body milks from Tokyo and Kyoto.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760874/glorious_japan_skin_care/new_products_images/i12.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
    "icon": "Shield",
    "parentCategory": "Body",
    "subcategories": [
      "Foaming Body Wash",
      "Body Milk",
      "Hand Cream",
      "Exfoliating Body Scrub",
      "Bath Salts"
    ],
    "popularTags": [
      "Bouncia Foam",
      "Hinoki Body Wash",
      "Ceramide Lotion",
      "Onsen Salts"
    ],
    "featured": true,
    "itemCount": 10,
    "id": "cat-12"
  },
  {
    "title": "Japanese Makeup & Cosmetics",
    "slug": "makeup",
    "japaneseTitle": "メイクアップ · Tokyo Luminous",
    "tagline": "Breathable dewy cushions, waterproof tubing mascaras, and watercolor cheek tints.",
    "description": "Lightweight, skin-loving Japanese makeup formulas designed to highlight natural translucency with smudge-proof wear and effortless elegance.",
    "metaDescription": "Discover Japan's bestselling makeup: smudge-proof tubing mascaras, dewy cushion compacts, and watercolor cheek stains for a fresh Tokyo look.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760875/glorious_japan_skin_care/new_products_images/i13.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    "icon": "Package",
    "parentCategory": "Makeup",
    "subcategories": [
      "Cushion Foundation",
      "Tubing Mascara",
      "Dewy Blush",
      "Eyebrow Pencil",
      "Lip Tint"
    ],
    "popularTags": [
      "Cushion Foundation",
      "Waterproof Mascara",
      "Dewy Blush",
      "Heroine Make"
    ],
    "featured": true,
    "itemCount": 12,
    "id": "cat-13"
  },
  {
    "title": "Baby & Mother Care",
    "slug": "baby-care",
    "japaneseTitle": "ベビーケア · Safe & Pure",
    "tagline": "Pediatrician-tested hypoallergenic washes and ceramide milks for delicate infant skin.",
    "description": "Pure, additive-free Japanese baby skincare from trusted brands like Pigeon, Mama & Kids, and Wakodo designed for newborn and ultra-sensitive skin.",
    "metaDescription": "Safeguard delicate baby skin with pediatrician-tested Japanese baby washes, ceramide lotions, and tear-free shampoos. Zero harsh chemicals.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760876/glorious_japan_skin_care/new_products_images/i14.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760831/glorious_japan_skin_care/hero/Cozy_Japanese_Skincare_Routine.png",
    "icon": "Smile",
    "parentCategory": "Baby Care",
    "subcategories": [
      "Baby Foam Wash",
      "Baby Milky Lotion",
      "Tear-Free Shampoo",
      "Barrier Cream"
    ],
    "popularTags": [
      "Pigeon Foam Wash",
      "Baby Ceramide Milk",
      "Tear-Free",
      "Hypoallergenic"
    ],
    "featured": true,
    "itemCount": 8,
    "id": "cat-14"
  },
  {
    "title": "Beauty Accessories & Tools",
    "slug": "beauty-accessories",
    "japaneseTitle": "美容小物 · Tokyo Craft",
    "tagline": "Handcrafted natural Konjac sponges, jade gua sha, and 100% pure Hiroshima cotton.",
    "description": "Artisan Japanese beauty tools including 100% natural konjac facial sponges, unbleached multi-layer cotton pads, and facial massage tools.",
    "metaDescription": "Elevate your beauty ritual with authentic Japanese tools. Pure organic cotton pads, handcrafted konjac sponges, and scalp massage brushes.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760877/glorious_japan_skin_care/new_products_images/i15.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760845/glorious_japan_skin_care/hero/hero-japanses-culture-bg.png",
    "icon": "Scissors",
    "parentCategory": "Accessories",
    "subcategories": [
      "Pure Cotton Pads",
      "Konjac Sponges",
      "Facial Rollers & Gua Sha",
      "Scalp Brushes"
    ],
    "popularTags": [
      "Konjac Sponge",
      "Mulberry Silk",
      "Unbleached Cotton",
      "Hiroshima Craft"
    ],
    "featured": true,
    "itemCount": 8,
    "id": "cat-15"
  },
  {
    "title": "Combo & Gift Sets",
    "slug": "gift-sets",
    "japaneseTitle": "ギフトセット · Omiyage Vault",
    "tagline": "Curated Japanese discovery boxes, full 4-step skincare rituals, and luxury gifts.",
    "description": "Thoughtfully assembled Japanese beauty routines, starter ritual gift boxes, and seasonal Tokyo discovery sets packaged for perfect gifting.",
    "metaDescription": "Discover curated Japanese skincare sets and luxury gift boxes. Ideal for beginners or gifting a full Tokyo beauty layering ritual.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760877/glorious_japan_skin_care/new_products_images/i16.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760853/glorious_japan_skin_care/hero/puja-sale.png",
    "icon": "Gift",
    "parentCategory": "Gifts & Kits",
    "subcategories": [
      "Full Ritual Box",
      "Discovery Trio",
      "Hydration Set",
      "Anti-Aging Kit"
    ],
    "popularTags": [
      "Full Ritual Box",
      "Discovery Trio",
      "Bestseller Kit",
      "Omiyage Gift"
    ],
    "featured": true,
    "itemCount": 10,
    "id": "cat-16"
  },
  {
    "title": "Travel Kits & Minis",
    "slug": "travel-kits",
    "japaneseTitle": "トラベルキット · Tokyo On-the-Go",
    "tagline": "TSA-approved Japanese beauty miniatures designed for on-the-go glowing skin.",
    "description": "Compact, leak-proof travel editions of your favorite Japanese skincare regimens. Keep your glass-skin glow radiant wherever your travels lead.",
    "metaDescription": "Never miss a step with TSA-compliant Japanese travel sets and miniatures. Travel pouches with cleanser, toner, essence, and sunscreen.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760878/glorious_japan_skin_care/new_products_images/i2.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760837/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio_1.png",
    "icon": "ShoppingBag",
    "parentCategory": "Gifts & Kits",
    "subcategories": [
      "Travel Essentials",
      "Mini 4-Step Set",
      "Pouch Duos",
      "Weekend Minis"
    ],
    "popularTags": [
      "Travel Essentials",
      "Mini 4-Step Set",
      "Pouch Ready",
      "TSA Approved"
    ],
    "featured": true,
    "itemCount": 6,
    "id": "cat-17"
  },
  {
    "title": "Skin Care Collection",
    "slug": "skin-care",
    "japaneseTitle": "スキンケア · Tokyo Rituals",
    "tagline": "The Art of Gentle Layering & Barrier Reverence",
    "description": "Complete Tokyo multi-step skincare: gentle double cleansing, slow-fermented rice essences, hyaluronic moisture drenching, and SPF armor.",
    "metaDescription": "Explore our master collection of authentic Japanese skincare. Double cleansers, hydrating toners, serums, and barrier creams imported from Japan.",
    "image": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760872/glorious_japan_skin_care/new_products_images/i1.jpg",
    "bannerImage": "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
    "icon": "Sparkles",
    "parentCategory": "Skincare",
    "subcategories": [
      "Cleanser",
      "Face Wash",
      "Toner",
      "Essence",
      "Serum",
      "Moisturizer",
      "Face Mask",
      "Eye Care",
      "Lip Care",
      "Sunscreen"
    ],
    "popularTags": [
      "Double Cleanse",
      "Tokyo Rituals",
      "Fermented Rice",
      "Glass Skin",
      "Hyaluronic Acid"
    ],
    "featured": true,
    "itemCount": 48,
    "id": "cat-18"
  }
];

export const INITIAL_COLLECTIONS: AdminCollection[] = [
  {
    id: "col-1",
    slug: "bestsellers",
    title: "Best Sellers",
    japaneseTitle: "ベストセラー · Tokyo Most Loved",
    tagline: "Japan's Most Revered Skincare Formulas & Daily Icons",
    description:
      "Discover Bangladesh's most cherished Japanese beauty icons. Clinically verified Tokyo imports.",
    badgeText: "Verified Top Rated · 50,000+ Reviews",
    bannerImage:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760834/glorious_japan_skin_care/hero/Glorious_Japan_Skincare_Spring_Glow.png",
    themeColor: "text-amber-500",
    frequentlySearched: [
      "Sakura Radiance Serum",
      "Hada Labo Lotion",
      "Fino Hair Mask",
      "Anessa Perfect UV",
    ],
    featured: true,
    itemCount: 36,
  },
  {
    id: "col-2",
    slug: "new-arrivals",
    title: "New Arrivals",
    japaneseTitle: "新入荷 · Fresh Tokyo Formulations",
    tagline: "Just Landed from Tokyo: Next-Generation J-Beauty Innovations",
    description: "Fresh arrivals straight from Japanese laboratories in Tokyo and Kyoto.",
    badgeText: "Just Landed · Tokyo Fresh Batch",
    bannerImage:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760842/glorious_japan_skin_care/hero/Perfect_Whip_Fresh_Beauty_Ritual.png",
    themeColor: "text-emerald-500",
    frequentlySearched: ["Yuzu Glow Essence", "Opera Lip Tint", "Canmake Cream Cheek"],
    featured: true,
    itemCount: 22,
  },
  {
    id: "col-3",
    slug: "trending",
    title: "Trending Now",
    japaneseTitle: "トレンド · Viral Tokyo Sensations",
    tagline: "Formulas Winning Hearts Across Bangladesh This Week",
    description:
      "Explore the most-coveted Japanese beauty formulas currently captivating skincare lovers.",
    badgeText: "Viral Sensations · High Demand",
    bannerImage:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760853/glorious_japan_skin_care/hero/puja-sale.png",
    themeColor: "text-amber-500",
    frequentlySearched: [
      "Koji Ferment Moisture Cream",
      "Matcha Clarifying Toner",
      "Silk Rice Cleanser",
    ],
    featured: true,
    itemCount: 18,
  },
  {
    id: "col-4",
    slug: "combo-gift-sets",
    title: "Combo & Gift Sets",
    japaneseTitle: "ギフトセット · The Art of Japanese Omiyage",
    tagline: "Curated Complete Rituals & Luxurious Beauty Bundles",
    description:
      "Experience the Japanese tradition of Omiyage with our luxury gift sets with up to 25% savings.",
    badgeText: "Save up to 25% · Luxury Gift Boxed",
    bannerImage:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
    themeColor: "text-pink-500",
    frequentlySearched: ["Full Ritual Sets", "Hydration Discovery", "Double Cleansing Duo"],
    featured: true,
    itemCount: 12,
  },
];
