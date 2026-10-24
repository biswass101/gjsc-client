import type { Metadata } from "next";
import { BrandsDirectoryClient } from "@/features/brands";

export const metadata: Metadata = {
  title: "All Japanese Brands | Glorious Japan Skin Care",
  description:
    "Explore our complete directory of authentic Japanese skincare, haircare, and cosmetic brands. From Tokyo labs to Kyoto botanicals.",
  openGraph: {
    title: "All Japanese Beauty Brands | Glorious Japan",
    description:
      "Browse authentic Japanese beauty houses, clinical derma laboratories, and centuries-old sake koji breweries.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Japanese Brands | Glorious Japan",
    description: "Explore authentic Japanese skincare and beauty brands.",
  },
};

export default function BrandsPage() {
  return <BrandsDirectoryClient />;
}

