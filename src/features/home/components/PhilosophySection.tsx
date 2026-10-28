"use client";

import { Link } from "@/lib/navigation";
import story from "@/assets/story.jpg";
import {
  ArrowRight,
  CheckCircle2,
  Droplets,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const PILLARS = [
  {
    icon: Leaf,
    title: "Slow Fermentation Science",
    kanji: "伝統発酵",
    text: "Micro-filtered rice and koji ferments that deeply absorb without heaviness or irritation.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Compromise Authenticity",
    kanji: "東京直輸入",
    text: "Sourced through certified Tokyo laboratories with verifiable manufacturer batch codes.",
  },
  {
    icon: Droplets,
    title: "Barrier-First Gentle Care",
    kanji: "肌バリア保護",
    text: "Formulated without parabens, mineral oils, or harsh drying alcohols to honor your skin.",
  },
  {
    icon: Sparkles,
    title: "Dermatologist Approved",
    kanji: "皮膚科学検証",
    text: "Rigorously tested for humid South Asian climates to ensure clear, luminous, clog-free pores.",
  },
];

const RITUAL_STEPS = [
  { num: "01", name: "Purify", desc: "Low-pH rice water cleanse" },
  { num: "02", name: "Hydrate", desc: "Multi-weight essence patting" },
  { num: "03", name: "Treat", desc: "Bio-ferment active serum" },
  { num: "04", name: "Lock", desc: "Ceramide moisture seal" },
];

export function PhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-cream/70 py-8 sm:py-14 lg:py-20 border-y border-border/50">
      {/* Subtle Japanese water ripple accent */}
      <div className="absolute right-0 top-0 -mt-16 -mr-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container-lux">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-12">
          {/* Left Column: Visual Collage (5 cols on lg) */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Main Image with Luxury Framing */}
              <div className="relative overflow-hidden rounded-md sm:rounded-xl border border-primary/20 shadow-lg bg-card">
                <img
                  src={story.src}
                  alt="Japanese skincare ritual with sakura petals"
                  width={1200}
                  height={1408}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                  <span className="rounded-full bg-black/50 px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-semibold backdrop-blur-md border border-white/20">
                    Tokyo Heritage · 東京の美学
                  </span>
                  <p className="mt-1 font-display text-xs sm:text-base font-medium text-white/95 leading-snug">
                    "Every bottle is crafted with respect for natural time and ancient Japanese botanical wisdom."
                  </p>
                </div>
              </div>

              {/* Floating Verification Badge - Responsive positioning */}
              <div className="absolute -bottom-3 right-2 sm:-right-3 sm:-bottom-4 rounded-md sm:rounded-lg border border-border bg-card/95 p-2.5 sm:p-4 shadow-xl backdrop-blur-md max-w-[180px] sm:max-w-[210px]">
                <div className="flex items-center gap-2">
                  <div className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-primary text-primary-foreground shrink-0 shadow-xs">
                    <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-bold text-foreground">100% Genuine</p>
                    <p className="text-[8px] sm:text-[9px] text-muted-foreground">Sealed in Japan</p>
                  </div>
                </div>
                <div className="mt-1.5 pt-1.5 border-t border-border/60 flex items-center gap-1 text-[8px] sm:text-[9px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span>Doorstep Inspection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 mt-4 sm:mt-0">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-primary text-[9px] sm:text-xs font-semibold tracking-wider">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>OUR PHILOSOPHY · 理念</span>
              </div>

              <h2 className="mt-2 font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Beauty as a quiet daily ritual, <br className="hidden sm:inline" />
                <span className="text-primary italic font-normal">not an aggressive chore.</span>
              </h2>

              <p className="mt-2.5 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                Glorious Japan Skin Care was founded in 2025 with an uncompromising standard: Japanese beauty is rooted in patience, balance, and reverence for the skin barrier. While conventional routines strip and irritate, our slow-fermented botanicals nourish and restore your natural dewy luminescence.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-md sm:rounded-lg border border-border/80 bg-card/60 p-3 sm:p-4 shadow-xs transition-all duration-300 hover:border-primary/50 hover:bg-card"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg sm:rounded-xl bg-primary/15 text-primary">
                      <p.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[9px] sm:text-[10px] text-primary/70">{p.kanji}</span>
                  </div>

                  <h3 className="mt-2 font-display text-xs sm:text-base font-bold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Japanese 4-Step Layering Process Strip */}
            <div className="rounded-md sm:rounded-lg border border-primary/20 bg-primary/5 p-3 sm:p-4">
              <span className="text-[9px] sm:text-xs uppercase tracking-wider font-semibold text-primary block mb-2">
                The 4-Step Japanese Layering Ritual
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                {RITUAL_STEPS.map((step) => (
                  <div key={step.num} className="border-l-2 border-primary/40 pl-2">
                    <span className="font-mono text-[9px] sm:text-[10px] font-bold text-primary">
                      Step {step.num}
                    </span>
                    <p className="text-[11px] sm:text-xs font-semibold text-foreground mt-0.5">{step.name}</p>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: Stretched touch targets on mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              <Link
                to="/collections/j-beauty"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-98 text-center"
              >
                <span>Discover The Rituals</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-foreground hover:border-primary transition-colors text-center"
              >
                <span>Read Full Story</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
