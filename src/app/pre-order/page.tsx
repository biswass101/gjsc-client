import type { Metadata } from "next";
import { PreOrderPageClient } from "@/features/pre-order/PreOrderPageClient";

export const metadata: Metadata = {
  title: "Pre-Order Direct From Japan | Glorious Japan Skin Care",
  description:
    "Reserve rare, fresh-batch Japanese beauty formulas directly from certified Tokyo laboratories. 10-14 days guaranteed air-freight delivery to Bangladesh.",
  openGraph: {
    title: "Pre-Order Japanese Skincare Direct from Tokyo | Glorious Japan",
    description:
      "Reserve exclusive Japanese formulations, limited seasonal editions, and cult-favorite serums with guaranteed authenticity.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pre-Order Direct From Japan | Glorious Japan",
    description: "Reserve rare Japanese skincare delivered in 10-14 days.",
  },
};

export default function PreOrderPage() {
  return <PreOrderPageClient />;
}

