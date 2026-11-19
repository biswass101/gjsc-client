import type { Metadata } from "next";
import { FlashSalePageClient } from "@/features/flash-sale";

export const metadata: Metadata = {
  title: "Tokyo Flash Drop & Limited Deals | Glorious Japan Skin Care",
  description:
    "Exclusive limited-time Tokyo flash drops with deep discounts and authentic Japanese domestic formulations air-freighted directly from Tokyo.",
  openGraph: {
    title: "Tokyo Flash Drop & Limited Deals | Glorious Japan",
    description:
      "Deep discounts on authentic Japanese domestic skincare favorites. Limited stock quotas.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tokyo Flash Drop | Glorious Japan Skin Care",
    description: "Limited-time flash discounts on authentic Tokyo skincare drops.",
  },
};

export default function FlashSalePage() {
  return <FlashSalePageClient />;
}

