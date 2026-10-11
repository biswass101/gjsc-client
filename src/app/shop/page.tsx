import { Suspense } from "react";
import { ShopClient } from "./ShopClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Japanese Skincare | Glorious Japan Skin Care",
  description: "Browse serums, essences, cleansers, sunscreens and gift sets. Filter by category, skin type, concern, brand and price.",
  openGraph: {
    title: "Shop All Japanese Skincare | Glorious Japan",
    description: "Filter premium Japanese skincare by skin type, concern and price.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-lux py-12">Loading shop...</div>}>
      <ShopClient />
    </Suspense>
  );
}