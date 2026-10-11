import { Home } from "@/components/pages/Home";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glorious Japan Skin Care — Authentic Japanese Beauty in Bangladesh",
  description: "Premium Japanese skincare: fermented serums, essences and sunscreens. Cash on Delivery & bKash. Stay Glorious, Shine with Confidence.",
  openGraph: {
    title: "Glorious Japan Skin Care — Authentic Japanese Beauty",
    description: "Fermented Japanese serums, essences and rituals. Free delivery over ৳5,000.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="container-lux py-12">Loading...</div>}>
      <Home />
    </Suspense>
  );
}


