import { Link } from "@/lib/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import type { BrandMeta } from "../data/brandMetadata";

interface BrandDirectoryCardProps {
  brand: BrandMeta;
  count: number;
}

export function BrandDirectoryCard({ brand, count }: BrandDirectoryCardProps) {
  return (
    <Link
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
            <span className="text-[10px] text-muted-foreground shrink-0">{brand.established}</span>
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
}

