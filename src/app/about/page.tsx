import story from "@/assets/story.jpg";
import { Layout } from "@/components/layout";
import { StorefrontPageBanner } from "@/components/common";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Glorious Japan Skin Care",
  description: "Founded in 2025, Glorious Japan Skin Care brings authentic Japanese beauty rituals to Bangladesh.",
  openGraph: {
    title: "Our Story | Glorious Japan Skin Care",
    description: "Authentic Japanese beauty, curated in Dhaka since 2025.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function AboutPage() {
  return (
    <Layout>
      <StorefrontPageBanner
        pageKey="about"
        defaultTitle="The Philosophy of Glorious Japan"
        defaultSubtitle="Bridging ancient Ginza apothecary traditions and modern Tokyo biochemistry directly to Dhaka."
        defaultBadge="私たちの哲学 · Our Heritage"
        centered
      />
      <div className="container-lux grid items-center gap-14 py-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Est. 2025</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Stay Glorious, Shine with Confidence</h1>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            We began with a simple frustration: authentic Japanese skincare was hard to find, and harder to trust. So we
            built direct relationships with Japanese suppliers and brought home a small, carefully edited collection —
            fermented essences, feather-light sunscreens, and creams that respect the skin barrier.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Every product is sealed, verified and dermatologist reviewed before it reaches your door. No exaggerated
            claims. No noise. Just quiet, consistent results.
          </p>
        </div>
        <img src={story.src} alt="Japanese skincare ritual" width={1200} height={1408} loading="lazy" className="rounded-lg object-cover shadow-[var(--shadow-card)]" />
      </div>
    </Layout>
  );
}
