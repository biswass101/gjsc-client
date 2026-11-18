import type { AdminFeaturedVideo } from "@/types";

export const INITIAL_FEATURED_VIDEOS: AdminFeaturedVideo[] = [
  {
    id: "vid-1",
    creatorName: "Tasnim Rahman",
    creatorHandle: "@tasnim.glows",
    creatorAvatar:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    duration: "0:45",
    views: "48.2K",
    title: "My 3-Step Glass Skin Morning Routine in Dhaka",
    caption:
      "Honestly the Sakura Radiance Serum is the only formula that doesn't feel sticky in humid weather. My skin feels so plump and hydrated!",
    thumbnail: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-woman-applying-moisturizer-to-her-face-41133-large.mp4",
    product: {
      name: "Sakura Radiance Serum",
      slug: "sakura-radiance-serum",
      brand: "Glorious Japan",
      price: 4850,
      compareAt: 5900,
      image: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
    },
    active: true,
    order: 1,
    featured: true,
    createdAt: "2026-10-20",
  },
  {
    id: "vid-2",
    creatorName: "Meghla Chowdhury",
    creatorHandle: "@meghla_skincare",
    creatorAvatar:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    duration: "1:10",
    views: "62.4K",
    title: "How I cleared stubborn acne marks in 3 weeks",
    caption:
      "Matcha toner + low pH rice cleanser combo completely calmed my active breakouts and faded my pigmentation without drying out my cheeks.",
    thumbnail: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-young-woman-touching-her-soft-skin-after-a-spa-treatment-41316-large.mp4",
    product: {
      name: "Matcha Clarifying Toner",
      slug: "matcha-clarifying-toner",
      brand: "Kyoto Botanicals",
      price: 2450,
      compareAt: 2990,
      image: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png",
    },
    active: true,
    order: 2,
    featured: false,
    createdAt: "2026-10-21",
  },
  {
    id: "vid-3",
    creatorName: "Dr. Sultana Derma",
    creatorHandle: "@dr.sultana_derma",
    creatorAvatar:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    duration: "1:32",
    views: "89.1K",
    title: "Dermatologist Review: Japanese Ferments vs Western Actives",
    caption:
      "Fermented rice filtrate and sake koji provide micro-molecular barrier support. Gentle, non-comedogenic, and suitable for sensitized Asian skin.",
    thumbnail: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-woman-smiling-with-a-skincare-product-in-her-hand-41300-large.mp4",
    product: {
      name: "Koji Ferment Moisture Cream",
      slug: "koji-ferment-cream",
      brand: "Kyoto Botanicals",
      price: 5600,
      compareAt: 6900,
      image: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png",
    },
    active: true,
    order: 3,
    featured: true,
    createdAt: "2026-10-22",
  },
  {
    id: "vid-4",
    creatorName: "Nafisa Kamal",
    creatorHandle: "@nafisa_beauty",
    creatorAvatar:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    duration: "0:58",
    views: "35.8K",
    title: "Zero White-Cast UV Shield Test Under Direct Sun",
    caption:
      "Tested this Hikari UV Shield under the Dhaka afternoon sun. Absorbed like a water essence with no sticky residue or flashback!",
    thumbnail: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760851/glorious_japan_skin_care/hero/japanese-inspired-foaming-skincare-ritual.png",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-applying-sunscreen-cream-on-her-nose-41132-large.mp4",
    product: {
      name: "Hikari UV Shield SPF50",
      slug: "hikari-uv-shield-spf50",
      brand: "Hikari Beauty",
      price: 2890,
      compareAt: 3400,
      image: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760851/glorious_japan_skin_care/hero/japanese-inspired-foaming-skincare-ritual.png",
    },
    active: true,
    order: 4,
    featured: false,
    createdAt: "2026-10-23",
  },
  {
    id: "vid-5",
    creatorName: "Anika Tabassum",
    creatorHandle: "@anika_tokyobeauty",
    creatorAvatar:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    duration: "1:15",
    views: "54.7K",
    title: "Double Cleansing: Melting Waterproof Sunscreen Easily",
    caption:
      "Low pH rice foam that doesn't strip or tighten. The absolute best first step in any Japanese skincare routine.",
    thumbnail: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760837/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio_1.png",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-woman-washing-her-face-with-cleansing-foam-41134-large.mp4",
    product: {
      name: "Silk Rice Gentle Cleanser",
      slug: "silk-rice-cleanser",
      brand: "Hikari Beauty",
      price: 1990,
      image: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760837/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio_1.png",
    },
    active: true,
    order: 5,
    featured: false,
    createdAt: "2026-10-24",
  },
  {
    id: "vid-6",
    creatorName: "Samira Haque",
    creatorHandle: "@samira.skincare",
    creatorAvatar:
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png",
    duration: "0:50",
    views: "41.3K",
    title: "Japanese Rice Ferment Night Repair Ritual",
    caption:
      "Woke up with zero redness and cushioned skin. The barrier repair serum works wonders overnight in air-conditioned rooms.",
    thumbnail: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760831/glorious_japan_skin_care/hero/Cozy_Japanese_Skincare_Routine.png",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-clean-face-looking-in-mirror-41129-large.mp4",
    product: {
      name: "Aurora Barrier Repair Serum",
      slug: "aurora-barrier-serum",
      brand: "Glorious Japan",
      price: 5250,
      compareAt: 6100,
      image: "https://res.cloudinary.com/soakj9w7/image/upload/v1794760831/glorious_japan_skin_care/hero/Cozy_Japanese_Skincare_Routine.png",
    },
    active: true,
    order: 6,
    featured: true,
    createdAt: "2026-10-25",
  },
];
