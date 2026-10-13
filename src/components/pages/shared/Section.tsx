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
    <section className="pt-2 sm:pt-4 lg:pt-6">
      <div className="mb-2 sm:mb-4 lg:mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 text-center sm:text-left">
        <h2 className="font-display text-sm sm:text-lg md:text-xl lg:text-2xl">
          {title} <span className="text-muted-foreground">— {eyebrow.toUpperCase()}</span>
        </h2>
{to && (
          <div className="flex justify-center sm:justify-end">
            <Button asChild variant="outline" className="rounded-full px-4 sm:px-6 py-1.5 sm:py-3 text-[8px] sm:text-[9px] uppercase tracking-[0.15em] whitespace-nowrap">
              <Link to={to as "/shop"} search={search}>
                View all <ArrowRight className="ml-1.5 sm:ml-2 h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
        )}
      </div>
      {children}
    </section>
  );
}