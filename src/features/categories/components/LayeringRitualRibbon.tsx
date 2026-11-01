import { Link } from "@/lib/navigation";
import { ChevronRight, Sparkle } from "lucide-react";
import { J_BEAUTY_STEPS } from "../data/categoryDirectoryData";

export function LayeringRitualRibbon() {
  return (
    <section className="border-b border-border/80 bg-cream/25 py-6 sm:py-8">
      <div className="container-lux">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
              <Sparkle className="h-3.5 w-3.5 text-primary" />
              <span>TRADITIONAL JAPANESE METHOD</span>
            </div>
            <h2 className="mt-0.5 font-display text-lg sm:text-xl font-bold tracking-tight text-foreground">
              The 5-Step J-Beauty Layering Ritual
            </h2>
          </div>
          <p className="text-xs text-muted-foreground max-w-sm">
            Japanese beauty emphasizes gentle layering from lightest watery lotions to protective UV
            barriers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {J_BEAUTY_STEPS.map((s) => (
            <Link
              key={s.step}
              to={`/category/${s.categorySlug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/70 bg-card p-3 sm:p-3.5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold text-primary tracking-wider">
                    {s.step}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {s.japanese}
                  </span>
                </div>

                <h3 className="font-display text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {s.name}
                </h3>

                <span className="inline-block mt-1 text-[9px] font-semibold text-primary uppercase tracking-wider bg-primary/10 px-1.5 py-0.2 rounded-md">
                  {s.action}
                </span>

                <p className="mt-1.5 text-[10.5px] text-muted-foreground leading-tight line-clamp-2">
                  {s.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[10.5px] font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                <span>Explore Step</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

