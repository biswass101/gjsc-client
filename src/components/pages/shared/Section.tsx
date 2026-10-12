import { Button } from "@/components/ui/button";
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
    <section className="container-lux py-4 sm:py-6 lg:py-8">
      <div className="mb-4 sm:mb-6 lg:mb-8 flex flex-col items-center text-center">
        <p className="eyebrow text-[10px] sm:text-xs">{eyebrow}</p>
        <h2 className="mt-1 sm:mt-2 font-display text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">{title}</h2>
        {subtitle && <p className="mt-1 sm:mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground">{subtitle}</p>}
        <div className="gold-rule mt-3 sm:mt-4" />
      </div>
      {children}
      {to && (
        <div className="mt-4 sm:mt-6 lg:mt-8 text-center">
          <Button asChild variant="outline" className="rounded-full px-6 sm:px-8 py-2 sm:py-6 text-[9px] sm:text-xs uppercase tracking-[0.2em]">
            <Link to={to as "/shop"} search={search}>
              View all <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" strokeWidth={1.5} />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}