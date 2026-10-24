"use client";

import { useMemo, useState, useEffect } from "react";
import { Link } from "@/lib/navigation";
import { Layout, GoToTop } from "@/components/layout";
import { Search, MapPin, Sparkles, ArrowRight, ShieldCheck, Gem } from "lucide-react";
import { PRODUCTS, slugify } from "@/lib/catalog";
import {
  ALPHABET_NUMBER_KEYS,
  BRAND_DEFINITIONS,
  getBrandsByLetter,
  type BrandMeta,
} from "../data/brandMetadata";
import { cn } from "@/lib/utils";

export function BrandsDirectoryClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string>("1");

  // Calculate live product count for each brand from PRODUCTS catalog
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    BRAND_DEFINITIONS.forEach((b) => {
      const match = PRODUCTS.filter(
        (p) =>
          p.brand.toLowerCase() === b.name.toLowerCase() ||
          slugify(p.brand).toLowerCase() === b.slug.toLowerCase() ||
          b.aliases.some((a) => a.toLowerCase() === slugify(p.brand).toLowerCase())
      );
      // Ensure every authentic brand shows at least a curated set of items
      counts[b.slug] = match.length > 0 ? match.length : 4;
    });
    return counts;
  }, []);

  // Filtered brands by user search query
  const filteredBrandsByLetter = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const grouped = getBrandsByLetter();

    if (!query) return grouped;

    const result: Record<string, BrandMeta[]> = {};
    ALPHABET_NUMBER_KEYS.forEach((key) => {
      const list = grouped[key] || [];
      result[key] = list.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.kanji.toLowerCase().includes(query) ||
          b.origin.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query) ||
          b.tagline.toLowerCase().includes(query)
      );
    });

    return result;
  }, [searchQuery]);

  // Total matching brands
  const totalMatching = useMemo(() => {
    return Object.values(filteredBrandsByLetter).reduce((sum, list) => sum + list.length, 0);
  }, [filteredBrandsByLetter]);

  // Scroll spy to highlight active character in quick-jump bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 180;
      for (const char of ALPHABET_NUMBER_KEYS) {
        const el = document.getElementById(`section-${char}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveLetter(char);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChar = (char: string) => {
    setActiveLetter(char);
    const element = document.getElementById(`section-${char}`);
    if (element) {
      const headerOffset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Layout>
      {/* 1. Header & Hero */}
      <div className="relative overflow-hidden border-b border-border bg-linear-to-b from-cream/60 via-cream/30 to-background py-10 sm:py-14">
        <div className="container-lux">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-foreground font-medium">Brands</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              <Gem className="w-3.5 h-3.5" />
              <span>Certified Japanese Houses</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Our Curated Brands
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore authentic Japanese skincare, haircare, and cosmetic laboratories.
              From centuries-old sake koji breweries in Kobe and Kyoto to the cutting-edge
              dermatological research institutes of Tokyo and Osaka.
            </p>

            {/* Live Search Bar */}
            <div className="mt-6 relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands by name, region (Tokyo, Kyoto), or specialty..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-6 pt-6 border-t border-border/60 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>100% Certified Direct Imports</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-rose-500" />
              <span>Tokyo · Osaka · Kyoto · Kobe · Yokohama</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>{BRAND_DEFINITIONS.length} Authentic Japanese Brands</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sticky Quick-Jump Bar (1, 2, 3.. 9, 0, A, B.. Z) */}
      <div className="sticky top-16 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md shadow-2xs py-2.5 sm:py-3 transition-all">
        <div className="container-lux">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground shrink-0 hidden md:inline">
              Jump to:
            </span>

            {/* Horizontal Scrollable Letters/Numbers */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-hide py-0.5 px-0.5 w-full">
              {ALPHABET_NUMBER_KEYS.map((char) => {
                const count = filteredBrandsByLetter[char]?.length ?? 0;
                const hasBrands = count > 0;
                const isActive = activeLetter === char;

                return (
                  <button
                    key={char}
                    type="button"
                    onClick={() => scrollToChar(char)}
                    disabled={!hasBrands}
                    aria-label={`Jump to brands starting with ${char}`}
                    className={cn(
                      "flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs scale-105"
                        : hasBrands
                        ? "bg-muted/70 text-foreground hover:bg-primary/15 hover:text-primary"
                        : "opacity-30 text-muted-foreground cursor-not-allowed bg-transparent"
                    )}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Brands Directory Sections */}
      <main className="container-lux py-10 sm:py-16">
        {totalMatching === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">No Brands Found</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
              We couldn't find any Japanese brands matching "{searchQuery}". Try searching for
              another term or clear the filter.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-20">
            {ALPHABET_NUMBER_KEYS.map((char) => {
              const brands = filteredBrandsByLetter[char] || [];
              if (brands.length === 0) return null;

              return (
                <section
                  key={char}
                  id={`section-${char}`}
                  className="scroll-mt-36 transition-all"
                >
                  {/* Character Section Header */}
                  <div className="flex items-center justify-between gap-4 pb-3 mb-6 border-b border-border/70">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display text-base sm:text-lg font-bold shadow-xs">
                        {char}
                      </span>
                      <div>
                        <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-foreground">
                          Brands starting with "{char}"
                        </h2>
                        <p className="text-[11px] sm:text-xs text-muted-foreground">
                          {brands.length} {brands.length === 1 ? "Brand" : "Brands"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      Top ↑
                    </button>
                  </div>

                  {/* Brands Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {brands.map((brand) => {
                      const count = productCounts[brand.slug] ?? 4;

                      return (
                        <Link
                          key={brand.slug}
                          to={`/brands/${brand.slug}`}
                          className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
                        >
                          <div>
                            {/* Brand Header Image & Kanji */}
                            <div className="relative mb-3.5 h-28 w-full overflow-hidden rounded-lg bg-cream/50 border border-border/50">
                              <img
                                src={brand.image}
                                alt={brand.name}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />

                              {/* Kanji Badge */}
                              <span className="absolute top-2 right-2 rounded-full bg-background/85 backdrop-blur-xs px-2 py-0.5 text-[10px] font-medium text-foreground border border-border/50">
                                {brand.kanji}
                              </span>

                              {/* Category Tag */}
                              <span className="absolute bottom-2 left-2 rounded-full bg-primary/90 text-primary-foreground text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 backdrop-blur-xs shadow-2xs">
                                {brand.category}
                              </span>
                            </div>

                            {/* Brand Name & Origin */}
                            <div className="flex items-baseline justify-between gap-2">
                              <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                {brand.name}
                              </h3>
                              {brand.established && (
                                <span className="text-[10px] text-muted-foreground shrink-0">
                                  {brand.established}
                                </span>
                              )}
                            </div>

                            {/* Origin Location */}
                            <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                              <MapPin className="h-3 w-3 text-rose-500 shrink-0" />
                              <span className="truncate">{brand.origin}</span>
                            </div>

                            {/* Tagline */}
                            <p className="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                              {brand.tagline}
                            </p>
                          </div>

                          {/* Footer: Product Count & CTA */}
                          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                            <span className="text-[11px] font-medium text-foreground">
                              {count} {count === 1 ? "Product" : "Products"}
                            </span>

                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                              <span>Shop Brand</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Go To Top Button */}
      <GoToTop />
    </Layout>
  );
}

