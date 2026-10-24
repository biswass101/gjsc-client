import type { Metadata } from "next";
import { OffersPageClient } from "@/features/offers/OffersPageClient";

export const metadata: Metadata = {
  title: "Special Offers & Deals | Glorious Japan Skin Care",
  description:
    "Exclusive Japanese skincare discounts, seasonal bundle promotions, free delivery offers, and active coupon codes across Bangladesh.",
  openGraph: {
    title: "Special Offers & Beauty Deals | Glorious Japan",
    description:
      "Save on authentic Japanese serums, moisturizers, sunscreens, and luxury gift sets.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Special Offers & Deals | Glorious Japan",
    description: "Limited-time discounts on authentic Japanese beauty.",
  },
};

export default function OffersPage() {
  return <OffersPageClient />;
}

