"use client";

import { Link } from "@/lib/navigation";
import { Sparkles } from "lucide-react";
import { useAdmin } from "@/context/admin-context";

interface ShopHeaderProps {
  headerTitle: string;
}

export function ShopHeader({ headerTitle }: ShopHeaderProps) {
  const { banners } = useAdmin();
  const shopBanner = (banners || []).find(
    (b) => b.pageKey === "shop" && b.active !== false,
  );

  return (
    <div className="relative overflow-hidden border-b border-border bg-linear-to-b from-primary/10 via-cream/40 to-background py-8 sm:py-12">
      {shopBanner?.imageUrl && (
        <div className="absolute inset-0 z-0">
          <picture>
            {shopBanner.mobileImageUrl && (
              <source media="(max-width: 640px)" srcSet={shopBanner.mobileImageUrl} />
            )}
            <img
              src={shopBanner.imageUrl}
              alt={shopBanner.title}
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40" />
        </div>
      )}
      <div className="container-lux relative z-10">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-3">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-foreground font-medium">Shop</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>{shopBanner?.badge || "100% Authentic Tokyo Imports"}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {shopBanner?.title || headerTitle || "All Japanese Skincare Formulations"}
            </h1>
            {shopBanner?.subtitle && (
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {shopBanner.subtitle}
              </p>
            )}
            {!shopBanner?.subtitle && (
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Slow-fermented rice essences, camellia barrier elixirs, and dermatologically verified J-Beauty formulations delivered across Bangladesh.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


