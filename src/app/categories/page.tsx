import {
  Beaker, Droplets, Eye, Gift, Layers, Leaf, Package, Palette,
  Scissors, Shield, ShoppingBag, Smile, Sparkles, Sunrise, Wind, Zap,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories | Glorious Japan Skin Care",
  description: "Explore all Japanese skincare categories — serums, moisturisers, cleansers, sunscreens, gift sets and more.",
  openGraph: {
    title: "All Categories | Glorious Japan",
    description: "Browse the full range of Japanese beauty categories.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "Face Wash": Droplets,
  "Cleanser": Beaker,
  "Serum": Zap,
  "Essence": Sparkles,
  "Moisturizer": Smile,
  "Toner": Layers,
  "Sunscreen": Sunrise,
  "Eye Care": Eye,
  "Lip Care": Leaf,
  "Face Mask": Palette,
  "Hair Care": Wind,
  "Body Care": Shield,
  "Beauty Accessories": Scissors,
  "Makeup": Package,
  "Gift Sets": Gift,
  "Travel Kits": ShoppingBag,
};

const CATEGORY_COLORS: string[] = [
  "from-rose/20 to-sakura/10",
  "from-champagne/30 to-gold/10",
  "from-lavender/20 to-sakura/10",
  "from-primary/10 to-champagne/20",
  "from-sakura/15 to-rose/10",
  "from-gold/20 to-champagne/15",
  "from-primary/15 to-lavender/10",
  "from-rose/15 to-champagne/10",
];

export default function CategoriesPage() {
  const counts = Object.fromEntries(
    CATEGORIES.map((cat) => [cat, PRODUCTS.filter((p) => p.category === cat).length])
  );

  return (
    <Layout>
      {/* Page header */}
      <div className="border-b border-border bg-cream py-12">
        <div className="container-lux">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <a href="/" className="hover:text-primary">Home</a>
            <span className="mx-2">/</span>
            Categories
          </nav>
          <p className="eyebrow mt-4">Discover</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Shop by Category</h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Explore our curated range of authentic Japanese beauty — from targeted serums to everyday essentials.
          </p>
        </div>
      </div>

      {/* Categories grid */}
      <div className="container-lux py-16">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat] ?? Package;
            const colorClass = CATEGORY_COLORS[i % CATEGORY_COLORS.length]!;
            const count = counts[cat] ?? 0;
            const bgImages = [p1, p2, p3, p4, p5, p6];
            const bgImage = bgImages[i % bgImages.length]!;

            return (
              <a
                key={cat}
                href="/shop"
                className="group hover-lift surface-card relative overflow-hidden p-6 text-left transition-all min-h-64"
              >
                {/* Background image */}
                <img
                  src={bgImage.src}
                  alt={cat}
                  className="absolute inset-0 h-full w-full object-cover opacity-30 group-hover:opacity-45 transition-opacity duration-300"
                />

                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 transition-opacity duration-300 group-hover:opacity-80`} />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm transition-colors duration-300 group-hover:bg-primary/30">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>

                  {/* Name + count */}
                  <p className="mt-4 font-display text-xl leading-snug text-foreground drop-shadow-md">{cat}</p>
                  <p className="mt-1 text-xs text-muted-foreground drop-shadow-sm">
                    {count} product{count !== 1 ? "s" : ""}
                  </p>

                  {/* Arrow hint */}
                  <div className="mt-4 flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Browse <span aria-hidden>→</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Featured banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 via-sakura/10 to-champagne/20 p-10 text-center">
          <p className="eyebrow">Can't decide?</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Browse All Products</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Explore the complete collection with advanced filters by skin type, concern, brand and price.
          </p>
          <a
            href="/shop"
            className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Shop All
          </a>
        </div>
      </div>
    </Layout>
  );
}
