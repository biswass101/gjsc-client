"use client";

import { useMemo, useState, useEffect } from "react";
import { Layout, GoToTop } from "@/components/layout";
import { Search } from "lucide-react";
import { PRODUCTS, slugify } from "@/lib/catalog";
import {
  ALPHABET_NUMBER_KEYS,
  BRAND_DEFINITIONS,
  getBrandsByLetter,
  type BrandMeta,
} from "../data/brandMetadata";
import { BrandDirectoryCard } from "./BrandDirectoryCard";
import { BrandDirectoryHero } from "./BrandDirectoryHero";
import { BrandQuickJumpBar } from "./BrandQuickJumpBar";

export function BrandsDirectoryClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string>("1");

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    BRAND_DEFINITIONS.forEach((b) => {
      const match = PRODUCTS.filter(
        (p) =>
          p.brand.toLowerCase() === b.name.toLowerCase() ||
          slugify(p.brand).toLowerCase() === b.slug.toLowerCase() ||
          b.aliases.some((a) => a.toLowerCase() === slugify(p.brand).toLowerCase()),
      );
      counts[b.slug] = match.length > 0 ? match.length : 4;
    });
    return counts;
  }, []);

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
          b.tagline.toLowerCase().includes(query),
      );
    });

    return result;
  }, [searchQuery]);

  const totalMatching = useMemo(() => {
    return Object.values(filteredBrandsByLetter).reduce((sum, list) => sum + list.length, 0);
  }, [filteredBrandsByLetter]);

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
      <BrandDirectoryHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <BrandQuickJumpBar
        filteredBrandsByLetter={filteredBrandsByLetter}
        activeLetter={activeLetter}
        onScrollToChar={scrollToChar}
      />

      <main className="container-lux py-10 sm:py-16">
        {totalMatching === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border p-8">
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
                <section key={char} id={`section-${char}`} className="scroll-mt-36 transition-all">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {brands.map((brand) => (
                      <BrandDirectoryCard
                        key={brand.slug}
                        brand={brand}
                        count={productCounts[brand.slug] ?? 4}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      <GoToTop />
    </Layout>
  );
}
