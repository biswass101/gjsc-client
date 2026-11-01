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
  {
    id: "ban-1",
    pageKey: "home_hero",
    pageTitle: "Homepage Main Hero",
    title: "Pure Japanese Beauty, Direct from Tokyo Sanctuary",
    subtitle:
      "Clinically proven barrier restoration, gentle double cleansing, and radiant essences imported fresh from Japan.",
    badge: "🌸 Tokyo Spring Shipment Arrived",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Explore Tokyo Best Sellers",
    ctaLink: "/collections/bestsellers",
    active: true,
    order: 1,
  },
  {
    id: "ban-2",
    pageKey: "shop",
    pageTitle: "Catalog Shop Page",
    title: "All Japanese Skincare Formulations",
    subtitle:
      "Browse over 800+ authentic imported cosmetics verified with Tokyo laboratory batch codes.",
    badge: "100% Authentic Japanese Formulations",
    imageUrl:
      "https://images.unsplash.com/photo-1608248597359-2f5b40cf302a?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Filter by Skin Concern",
    ctaLink: "/shop",
    active: true,
    order: 2,
  },
  {
    id: "ban-3",
    pageKey: "pre_order",
    pageTitle: "Pre-Order Direct From Japan",
    title: "Pre-Order Direct From Tokyo Laboratories",
    subtitle:
      "Reserve exclusive prestige formulations delivered by temperature-controlled air freight in 10-14 days.",
    badge: "Direct Ginza Procurement",
    imageUrl:
      "https://images.unsplash.com/photo-1512290900672-1f5be6b4f762?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Reserve Your Bottle",
    ctaLink: "/pre-order",
    active: true,
    order: 3,
  },
  {
    id: "ban-4",
    pageKey: "offers",
    pageTitle: "Seasonal Offers & BOGO",
    title: "Tokyo Seasonal Gift Specials & BOGO Savings",
    subtitle:
      "Exclusive Japanese skincare bundles, free gift discovery sets, and limited discount codes.",
    badge: "Save Up To 35% on Bundles",
    imageUrl:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Claim Exclusive Offers",
    ctaLink: "/offers",
    active: true,
    order: 4,
  },
];
