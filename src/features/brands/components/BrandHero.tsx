import { BrandBreadcrumb } from "./BrandBreadcrumb";
import type { BrandMeta } from "../data/brandMetadata";
import { ShieldCheck, MapPin, Sparkles, Building2 } from "lucide-react";

interface BrandHeroProps {
  meta: BrandMeta;
  totalProducts: number;
}

export function BrandHero({ meta, totalProducts }: BrandHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-linear-to-b from-cream/60 via-cream/30 to-background">
      <div className="container-lux py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="mb-4">
          <BrandBreadcrumb brandName={meta.name} />
        </div>

        {/* Hero Card Banner */}
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
          {/* Background Banner with Gradient */}
          <div className="relative h-44 sm:h-56 md:h-64 w-full overflow-hidden">
            <img
              src={meta.bannerImage}
              alt={meta.name}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/40 to-transparent" />
          </div>

          {/* Floating Brand Info Content */}
          <div className="relative px-5 sm:px-8 pb-6 sm:pb-8 -mt-20 sm:-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              {/* Left Column: Brand Logo + Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
                {/* Brand Logo / Avatar */}
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-xl border-2 border-background bg-card shadow-md shrink-0">
                  <img
                    src={meta.image}
                    alt={meta.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 rounded-md bg-background/90 px-1.5 py-0.5 text-[9px] font-semibold text-foreground border border-border/60">
                    {meta.kanji}
                  </span>
                </div>

                {/* Name & Origin */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      <ShieldCheck className="h-3 w-3" />
                      100% Authentic Japan
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {meta.category}
                    </span>
                  </div>

                  <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {meta.name}
                  </h1>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      <span>{meta.origin}</span>
                    </div>
                    {meta.established && (
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>{meta.established}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: In-Stock Products Counter */}
              <div className="flex items-center gap-3 self-start md:self-end">
                <div className="rounded-xl border border-border/80 bg-muted/50 px-4 py-2.5 text-center">
                  <p className="font-display text-lg sm:text-xl font-bold text-foreground">
                    {totalProducts}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Products Available
                  </p>
                </div>
              </div>
            </div>

            {/* Tagline & Short Description */}
            <div className="mt-5 max-w-3xl pt-4 border-t border-border/60">
              <p className="font-medium text-sm sm:text-base text-foreground leading-snug">
                {meta.tagline}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {meta.description}
              </p>

              {/* Key Ingredients or Philosophies Pills */}
              {meta.keyIngredients && meta.keyIngredients.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mr-1">
                    Signature Actives:
                  </span>
                  {meta.keyIngredients.map((ing) => (
                    <span
                      key={ing}
                      className="inline-flex items-center gap-1 rounded-md bg-secondary/80 border border-border px-2 py-0.5 text-[11px] text-foreground font-medium"
                    >
                      <Sparkles className="h-2.5 w-2.5 text-primary" />
                      {ing}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

