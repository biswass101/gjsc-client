"use client";

import { Link } from "@/lib/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import dryImg from "@/assets/skin/dry.jpg";
import oilyImg from "@/assets/skin/oily.jpg";
import combImg from "@/assets/skin/combination.jpg";
import sensImg from "@/assets/skin/sensitive.jpg";
import normImg from "@/assets/skin/normal.jpg";
import acneImg from "@/assets/skin/acne.jpg";
import spotsImg from "@/assets/skin/dark-spots.jpg";
import pigmImg from "@/assets/skin/pigmentation.jpg";
import agingImg from "@/assets/skin/anti-aging.jpg";
import hydrImg from "@/assets/skin/hydration.jpg";

interface SkinCardItem {
  name: string;
  kanji: string;
  tagline: string;
  image: string;
  queryParam: { skinType?: string; concern?: string };
}

const SKIN_TYPES_DATA: SkinCardItem[] = [
  {
    name: "Dry",
    kanji: "乾燥肌",
    tagline: "Deep Nourishment & Lipids",
    image: dryImg.src,
    queryParam: { skinType: "Dry" },
  },
  {
    name: "Oily",
    kanji: "脂性肌",
    tagline: "Sebum Control & Purity",
    image: oilyImg.src,
    queryParam: { skinType: "Oily" },
  },
  {
    name: "Combination",
    kanji: "混合肌",
    tagline: "T-Zone Balance & Hydration",
    image: combImg.src,
    queryParam: { skinType: "Combination" },
  },
  {
    name: "Sensitive",
    kanji: "敏感肌",
    tagline: "Calming Barrier & Gentle Care",
    image: sensImg.src,
    queryParam: { skinType: "Sensitive" },
  },
  {
    name: "Normal",
    kanji: "普通肌",
    tagline: "Radiant Harmony & Glow",
    image: normImg.src,
    queryParam: { skinType: "Normal" },
  },
];

const CONCERNS_DATA: SkinCardItem[] = [
  {
    name: "Acne",
    kanji: "ニキビ",
    tagline: "Gentle Clarifying & Calming",
    image: acneImg.src,
    queryParam: { concern: "Acne" },
  },
  {
    name: "Dark Spots",
    kanji: "シミケア",
    tagline: "Tone Brightening & Fade",
    image: spotsImg.src,
    queryParam: { concern: "Dark Spots" },
  },
  {
    name: "Pigmentation",
    kanji: "美白",
    tagline: "Niacinamide & Rice Ferment",
    image: pigmImg.src,
    queryParam: { concern: "Pigmentation" },
  },
  {
    name: "Anti Aging",
    kanji: "エイジング",
    tagline: "Firming Peptides & Youth Glow",
    image: agingImg.src,
    queryParam: { concern: "Anti Aging" },
  },
  {
    name: "Hydration",
    kanji: "高保湿",
    tagline: "72h Multi-Hyaluronic Plump",
    image: hydrImg.src,
    queryParam: { concern: "Hydration" },
  },
];

function CardGrid({
  items,
  eyebrow,
  title,
  subtitle,
}: {
  items: SkinCardItem[];
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <span className="eyebrow text-[10px] sm:text-xs text-primary font-medium tracking-[0.2em]">
            {eyebrow}
          </span>
          <h3 className="mt-0.5 font-display text-lg sm:text-2xl md:text-3xl text-foreground font-bold tracking-tight">
            {title}
          </h3>
          <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground hidden sm:block">{subtitle}</p>
        </div>
        <Link
          to="/collections/skin-concern"
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-primary hover:underline shrink-0"
        >
          <span>All concerns</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Responsive Layout: Smooth swipe carousel on mobile with snap and peek; clean 5-col grid on sm/md */}
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-5 sm:gap-4 lg:gap-5">
        {items.map((item) => (
          <Link
            key={item.name}
            to="/collections/skin-concern"
            search={{ q: item.name }}
            className="group relative h-48 sm:h-56 md:h-64 lg:h-72 w-36 sm:w-auto shrink-0 snap-start overflow-hidden rounded-md sm:rounded-lg border border-border/70 shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg focus:outline-none"
          >
            {/* Background Image with Zoom Effect */}
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/45" />

            {/* Top Japanese Kanji Tag */}
            <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[8px] sm:text-[9px] font-medium text-foreground backdrop-blur-md border border-white/10 shadow-xs">
                <Sparkles className="h-2.5 w-2.5 text-primary" />
                <span>{item.kanji}</span>
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5 flex flex-col justify-end text-white">
              <h4 className="font-display text-sm sm:text-base lg:text-lg font-bold tracking-wide text-white group-hover:text-primary transition-colors">
                {item.name}
              </h4>
              <p className="mt-0.5 text-[9px] sm:text-[11px] text-white/80 line-clamp-1 leading-relaxed">
                {item.tagline}
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-[9px] sm:text-[11px] font-semibold text-primary opacity-90 transition-all duration-300 group-hover:translate-x-1">
                <span>Explore</span>
                <ArrowRight className="h-2.5 w-2.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SkinConcernSection() {
  return (
    <section className="bg-cream/60 py-6 sm:py-10 lg:py-14 border-y border-border/40">
      <div className="container-lux space-y-8 sm:space-y-12">
        {/* Know Your Skin */}
        <CardGrid
          items={SKIN_TYPES_DATA}
          eyebrow="TAILORED BEAUTY"
          title="Know Your Skin"
          subtitle="Discover curated Japanese rituals formulated for your exact skin profile."
        />

        {/* Divider with subtle gold touch */}
        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border/80" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-cream px-3 py-0.5 rounded-full text-[9px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Targeted Care
            </span>
          </div>
        </div>

        {/* Target The Concern */}
        <CardGrid
          items={CONCERNS_DATA}
          eyebrow="TARGETED CARE"
          title="Target The Concern"
          subtitle="Clinically proven botanical solutions for blemishes, pigmentation, and fine lines."
        />
      </div>
    </section>
  );
}
