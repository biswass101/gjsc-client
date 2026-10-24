import type { Metadata } from "next";
import { CategoriesDirectoryClient } from "@/features/categories";

export const metadata: Metadata = {
  title: "All Categories & Japanese Rituals | Glorious Japan Skin Care",
  description:
    "Explore authentic Japanese skincare, haircare, and cosmetic categories. Curated by formula type and traditional J-Beauty layering steps.",
  openGraph: {
    title: "All Japanese Beauty Categories | Glorious Japan",
    description:
      "Browse Japanese cleansers, serums, sunscreens, toners, and full ritual sets.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Categories | Glorious Japan Skin Care",
    description: "Explore authentic Japanese skincare and beauty categories.",
  },
};

export default function CategoriesPage() {
  return <CategoriesDirectoryClient />;
}
