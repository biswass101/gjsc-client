import { Link } from "@/lib/navigation";
import { Sparkles } from "lucide-react";

interface ShopHeaderProps {
  headerTitle: string;
}

export function ShopHeader({ headerTitle }: ShopHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-linear-to-b from-primary/10 via-cream/40 to-background py-8 sm:py-12">
      <div className="container-lux">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-3">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-foreground font-medium">Shop</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>100% Authentic Tokyo Imports</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {headerTitle}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Slow-fermented rice essences, camellia barrier elixirs, and dermatologically verified
              J-Beauty formulations delivered across Bangladesh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

