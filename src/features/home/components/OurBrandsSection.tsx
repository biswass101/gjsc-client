"use client";

import { Link } from "@/lib/navigation";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import bGlorious from "@/assets/brands/glorious-japan.jpg";
import bSakura from "@/assets/brands/sakura-lab.jpg";
import bKyoto from "@/assets/brands/kyoto-botanicals.jpg";
import bYuzu from "@/assets/brands/yuzu-no-mori.jpg";
import bHikari from "@/assets/brands/hikari-beauty.jpg";
import bShiseido from "@/assets/brands/shiseido.jpg";
import bSkii from "@/assets/brands/sk-ii.jpg";
import bHada from "@/assets/brands/hada-labo.jpg";

interface BrandItem {
  name: string;
  kanji: string;
  origin: string;
  tagline: string;
  category: string;
  image: string;
}

const BRANDS_LIST: BrandItem[] = [
  {
    name: "Glorious Japan",
    kanji: "栄光日本",
    origin: "Tokyo",
    tagline: "Slow-fermented rice and sakura botanicals crafted for daily calm.",
    category: "Signature House",
    image: bGlorious.src,
  },
  {
    name: "Sakura Lab",
    kanji: "桜ラボ",
    origin: "Yokohama",
    tagline: "Bio-engineered cherry blossom actives and gentle peptide brightening.",
    category: "Clinical Botanicals",
    image: bSakura.src,
  },
  {
    name: "Kyoto Botanicals",
    kanji: "京都本舗",
    origin: "Kyoto",
    tagline: "Time-honoured Uji matcha, sake koji ferment, and camellia seed oils.",
    category: "Heritage Care",
    image: bKyoto.src,
  },
  {
    name: "Yuzu No Mori",
    kanji: "柚子の森",
    origin: "Kochi",
    tagline: "Cold-pressed citrus vitamin C and antioxidant mountain honey.",
    category: "Radiance Essentials",
    image: bYuzu.src,
  },
  {
    name: "Hikari Beauty",
    kanji: "光美研",
    origin: "Osaka",
    tagline: "Featherlight sun shields and modern multi-barrier repair toners.",
    category: "Sun & Barrier",
    image: bHikari.src,
  },
  {
    name: "Shiseido",
    kanji: "資生堂",
    origin: "Ginza, Tokyo",
    tagline: "150 years of world-leading dermatological science and prestige formulas.",
    category: "Prestige Science",
    image: bShiseido.src,
  },
  {
    name: "SK-II",
    kanji: "エスケーツー",
    origin: "Shiga",
    tagline: "Cult-favourite Pitera fermentation for crystal clear, resilient skin.",
    category: "Bio-Ferment",
    image: bSkii.src,
  },
  {
    name: "Hada Labo",
    kanji: "肌ラボ",
    origin: "Osaka",
    tagline: "Gold-standard multi-molecular hyaluronic acid hydration for all skin.",
    category: "Hydration Pioneer",
    image: bHada.src,
  },
];

export function OurBrandsSection() {
  return (
    <section className="bg-background py-8 sm:py-12 lg:py-16">
      <div className="container-lux">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-primary">
              <Compass className="h-3.5 w-3.5" />
              <span className="eyebrow text-[10px] sm:text-xs tracking-[0.25em] font-semibold">
                PROVENANCE & INTEGRITY
              </span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              Our Brands
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Formulated in Tokyo, Kyoto, and Osaka. Sourced exclusively from certified Japanese partner laboratories.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline self-start sm:self-auto"
          >
            <span>Explore All Brands</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 8 Brands Grid with Photos */}
        <div className="grid gap-3.5 sm:gap-4 grid-cols-2 md:grid-cols-4">
          {BRANDS_LIST.map((brand) => (
            <Link
              key={brand.name}
              to="/shop"
              search={{ brand: brand.name }}
              className="group flex flex-col justify-between overflow-hidden rounded-md sm:rounded-lg border border-border bg-card shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[var(--shadow-lift)]"
            >
              <div>
                {/* Brand Visual Header Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-cream">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="rounded-full bg-background/90 px-2 py-0.5 text-[9px] font-medium text-foreground backdrop-blur-xs border border-border/40">
                      {brand.origin}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="rounded-full bg-black/60 px-2 py-0.5 font-mono text-[9px] font-semibold text-white/90 backdrop-blur-xs">
                      {brand.kanji}
                    </span>
                  </div>

                  {/* Brand Category Tag */}
                  <div className="absolute bottom-2 left-2.5 z-10">
                    <span className="rounded-md bg-primary/90 px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-primary-foreground backdrop-blur-xs">
                      {brand.category}
                    </span>
                  </div>
                </div>

                {/* Brand Details */}
                <div className="p-3 sm:p-3">
                  <h3 className="font-display text-base sm:text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>

                  <p className="mt-1 text-[11px] sm:text-[11.5px] text-muted-foreground leading-relaxed line-clamp-2">
                    {brand.tagline}
                  </p>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="p-3 sm:p-3 pt-0">
                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] font-semibold text-primary">
                  <span>Explore Collection</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
