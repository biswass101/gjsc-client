"use client";

import { Layout } from "@/components/layout";

export function ProductDetailSkeleton() {
  return (
    <Layout>
      <div className="w-full animate-pulse">
        {/* Top Breadcrumb Bar Skeleton */}
        <div className="border-b border-border/40 bg-muted/20 py-3 sm:py-4">
          <div className="container-lux flex items-center gap-2">
            <div className="h-3 w-12 rounded bg-muted/60" />
            <span className="text-muted-foreground/40">/</span>
            <div className="h-3 w-16 rounded bg-muted/60" />
            <span className="text-muted-foreground/40">/</span>
            <div className="h-3 w-28 rounded bg-muted/60" />
          </div>
        </div>

        {/* Main Product Hero / Gallery & Buybox Skeleton */}
        <section className="container-lux py-6 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl border border-border/60 bg-muted/40 overflow-hidden shadow-xs">
                <div className="absolute inset-0 bg-gradient-to-tr from-muted/30 via-muted/60 to-muted/20" />
                <div className="absolute top-4 left-4 h-6 w-20 rounded-full bg-muted/80" />
              </div>
              {/* Thumbnails Row */}
              <div className="flex items-center gap-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl border border-border/60 bg-muted/40 shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* Buy Box Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Brand & Kanji Badge */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-24 rounded-full bg-primary/10 border border-primary/20" />
                <div className="h-4 w-12 rounded bg-muted/50" />
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <div className="h-8 w-11/12 rounded-lg bg-muted/70" />
                <div className="h-8 w-3/5 rounded-lg bg-muted/70" />
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-28 rounded bg-muted/50" />
                <span className="text-muted-foreground/40">•</span>
                <div className="h-4 w-16 rounded bg-muted/50" />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <div className="h-9 w-32 rounded-lg bg-muted/80" />
                <div className="h-5 w-20 rounded bg-muted/40" />
                <div className="h-5 w-16 rounded-full bg-muted/50" />
              </div>

              {/* Short Description */}
              <div className="space-y-2 pt-2">
                <div className="h-3.5 w-full rounded bg-muted/50" />
                <div className="h-3.5 w-5/6 rounded bg-muted/50" />
                <div className="h-3.5 w-4/6 rounded bg-muted/50" />
              </div>

              {/* Size Selector Skeleton */}
              <div className="space-y-2 pt-2">
                <div className="h-3.5 w-24 rounded bg-muted/60" />
                <div className="flex gap-2">
                  <div className="h-10 w-20 rounded-xl border border-border/60 bg-muted/50" />
                  <div className="h-10 w-20 rounded-xl border border-border/60 bg-muted/30" />
                  <div className="h-10 w-20 rounded-xl border border-border/60 bg-muted/30" />
                </div>
              </div>

              {/* CTA Buttons Skeleton */}
              <div className="space-y-3 pt-4">
                <div className="h-13 w-full rounded-xl bg-primary/20 border border-primary/30" />
                <div className="h-13 w-full rounded-xl bg-muted/60 border border-border/60" />
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
                <div className="h-12 rounded-lg bg-muted/30 border border-border/40" />
                <div className="h-12 rounded-lg bg-muted/30 border border-border/40" />
                <div className="h-12 rounded-lg bg-muted/30 border border-border/40" />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs / Ritual Skeletons */}
        <section className="container-lux py-8 border-t border-border/40">
          <div className="flex gap-4 border-b border-border/60 pb-3">
            <div className="h-8 w-28 rounded-lg bg-muted/60" />
            <div className="h-8 w-28 rounded-lg bg-muted/40" />
            <div className="h-8 w-28 rounded-lg bg-muted/40" />
          </div>
          <div className="py-6 space-y-3">
            <div className="h-4 w-full rounded bg-muted/40" />
            <div className="h-4 w-11/12 rounded bg-muted/40" />
            <div className="h-4 w-4/5 rounded bg-muted/40" />
          </div>
        </section>
      </div>
    </Layout>
  );
}

