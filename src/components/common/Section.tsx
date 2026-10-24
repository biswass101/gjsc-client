import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  to,
  search,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  to?: string;
  search?: any;
}) {
  return (
    <section className="pt-4 sm:pt-6 lg:pt-8 pb-2">
      {/* Mobile-Friendly Header: Title on Left, View All on Right */}
      <div className="mb-3 sm:mb-4 lg:mb-6 flex items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-foreground flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span>{title}</span>
            <span className="text-[10px] sm:text-xs font-sans font-medium text-muted-foreground uppercase tracking-wider">
              — {eyebrow}
            </span>
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {to && (
            <Link
              to={to as "/shop"}
              search={search}
              className="group inline-flex items-center gap-1 rounded-full border border-border/80 bg-card px-2.5 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all shrink-0 active:scale-95"
            >
              <span>View all</span>
              <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}