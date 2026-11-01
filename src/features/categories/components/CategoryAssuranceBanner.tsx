import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";

export function CategoryAssuranceBanner() {
  return (
    <div className="mt-16 rounded-xl border border-border bg-linear-to-r from-cream via-background to-cream p-8 sm:p-12 text-center relative overflow-hidden shadow-xs">
      <div className="max-w-xl mx-auto relative z-10">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">
          100% AUTHENTIC JAPANESE GUARANTEE
        </span>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Looking For A Customized Routine?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Every formula in our directory is imported fresh from certified partner laboratories in
          Tokyo, Kyoto, and Osaka. Use our comprehensive catalog filters to find products tailored
          to your exact skin concern.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground uppercase tracking-wider hover:bg-primary/90 transition-all shadow-xs"
          >
            <span>Shop Full Catalog</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <Link
            to="/collections/skin-concern"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-xs font-bold text-foreground uppercase tracking-wider hover:bg-muted transition-all"
          >
            <span>Shop By Skin Concern</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

