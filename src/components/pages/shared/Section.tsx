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
    <section className="container-lux py-6 sm:py-8 lg:py-12">
      <div className="mb-6 sm:mb-8 lg:mb-10 flex flex-col items-center text-center">
        <p className="eyebrow text-[10px] sm:text-xs">{eyebrow}</p>
        <h2 className="mt-2 sm:mt-3 font-display text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{title}</h2>
        {subtitle && <p className="mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm text-muted-foreground">{subtitle}</p>}
        <div className="gold-rule mt-4 sm:mt-6" />
      </div>
      {children}
      {to && (
        <div className="mt-6 sm:mt-8 lg:mt-12 text-center">
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