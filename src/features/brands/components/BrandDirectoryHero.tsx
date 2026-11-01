import { Link } from "@/lib/navigation";
import { Gem, MapPin, Search, ShieldCheck, Sparkles } from "lucide-react";
import { BRAND_DEFINITIONS } from "../data/brandMetadata";

interface BrandDirectoryHeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export function BrandDirectoryHero({ searchQuery, onSearchChange }: BrandDirectoryHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-linear-to-b from-cream/60 via-cream/30 to-background py-10 sm:py-14">
      <div className="container-lux">
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
            Explore authentic Japanese skincare, haircare, and cosmetic laboratories. From
            centuries-old sake koji breweries in Kobe and Kyoto to the cutting-edge dermatological
            research institutes of Tokyo and Osaka.
          </p>

          <div className="mt-6 relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search brands by name, region (Tokyo, Kyoto), or specialty..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

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
  );
}

