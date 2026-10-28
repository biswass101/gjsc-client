import { Suspense } from "react";
import type { Metadata } from "next";
import { Link } from "@/lib/navigation";
import { Layout } from "@/components/layout";
import {
  COLLECTION_DEFINITIONS,
  CollectionPageClient,
} from "@/features/collections";
import { LoadingScreen } from "@/components/common";
import {
  Star,
  Sparkles,
  Gift,
  Search,
  Shield,
  Globe,
  Package,
  Sun,
  Truck,
  Tag,
  Heart,
  Leaf,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Exclusive Collections | Japanese Beauty & Skincare | Glorious Japan",
  description:
    "Explore our specialized Japanese beauty collections: Bestsellers, New Arrivals, Combos, Skin Concerns, Pre-Orders from Tokyo, and Seasonal Essentials.",
  openGraph: {
    title: "Japanese Beauty Collections | Glorious Japan",
    description: "Browse curated Tokyo skincare collections in Bangladesh.",
    type: "website",
  },
};

const COLLECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  bestsellers: Star,
  "new-arrivals": Sparkles,
  "combo-gift-sets": Gift,
  "skin-concern": Search,
  shein: Shield,
  "pre-order-japan": Globe,
  "winter-essentials": Package,
  "summer-glow": Sun,
  "travel-size": Truck,
  "value-sets": Tag,
  "k-beauty": Heart,
  "j-beauty": Leaf,
};

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function CollectionsPage({ searchParams }: PageProps) {
  const { type } = await searchParams;

  // Backward compatibility: If ?type=bestsellers is visited, render the collection client directly!
  if (type) {
    return (
      <Suspense fallback={<LoadingScreen message="Curating Japanese Collection..." />}>
        <CollectionPageClient slug={type} />
      </Suspense>
    );
  }

  // All Collections Hub
  return (
    <Layout>
      <div className="border-b border-border/60 bg-gradient-to-b from-cream/60 via-background to-background py-8 sm:py-12">
        <div className="container-lux text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            <Sparkles className="h-3 w-3" />
            <span>特別コレクション · Curated Tokyo Editions</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Exclusive Collections
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            From iconic Tokyo bestsellers and seasonal barrier essentials to rare apothecary pre-orders and complete ritual gift sets, explore our specialized curations.
          </p>
        </div>
      </div>

      <div className="container-lux py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {COLLECTION_DEFINITIONS.map((col) => {
            const Icon = COLLECTION_ICONS[col.slug] ?? Sparkles;

            return (
              <Link
                key={col.slug}
                to={`/collections/${col.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card p-4 sm:p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-lift)]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${col.gradientClass} opacity-40 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-background/90 border border-border/80 shadow-2xs group-hover:border-primary/40 group-hover:text-primary transition-colors">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>

                    <span className="inline-flex items-center rounded-full bg-background/80 border border-border/60 px-2 py-0.5 text-[9.5px] font-semibold text-foreground/80">
                      {col.badgeText}
                    </span>
                  </div>

                  <p className="text-[10px] font-medium text-primary tracking-wide uppercase">
                    {col.japaneseTitle}
                  </p>

                  <h3 className="font-display text-lg font-bold text-foreground mt-0.5 group-hover:text-primary transition-colors">
                    {col.title}
                  </h3>

                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="relative z-10 mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Shop All Banner */}
        <div className="mt-14 rounded-xl border border-border/70 bg-gradient-to-r from-primary/10 via-sakura/10 to-champagne/20 p-8 sm:p-10 text-center">
          <p className="eyebrow text-xs">Full Catalog</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
            Looking for something specific?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-muted-foreground">
            Browse our entire inventory of authentic Japanese skincare with full multi-attribute filtering.
          </p>
          <Link
            to="/shop"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            <span>Shop All Products</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

