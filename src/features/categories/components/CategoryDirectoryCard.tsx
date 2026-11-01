import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import { slugify } from "@/lib/catalog";
import type { CategoryDetail } from "../data/categoryDirectoryData";

interface CategoryDirectoryCardProps {
  item: CategoryDetail;
  count: number;
}

export function CategoryDirectoryCard({ item, count }: CategoryDirectoryCardProps) {
  const Icon = item.icon;
  const categorySlug = slugify(item.name);

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md">
      <div>
        {/* Visual Card Banner Image */}
        <div className="relative aspect-16/9 w-full overflow-hidden bg-cream/70 border-b border-border/50">
          <Link to={`/category/${categorySlug}`} className="block h-full w-full">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          <span className="absolute top-2 right-2 rounded-full bg-background/85 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold text-foreground border border-border/50">
            {item.kanji}
          </span>

          <span className="absolute bottom-2 left-2 rounded-full bg-primary/90 text-primary-foreground text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 backdrop-blur-xs shadow-2xs">
            {item.department}
          </span>

          {item.ritualStep && (
            <span className="absolute top-2 left-2 rounded-full bg-background/90 text-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 backdrop-blur-xs border border-border/60">
              {item.ritualStep.step}
            </span>
          )}
        </div>

        {/* Card Content Area */}
        <div className="p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </div>

            <div className="min-w-0">
              <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                <Link to={`/category/${categorySlug}`}>{item.name}</Link>
              </h3>
              <span className="text-[11px] text-muted-foreground font-medium">
                {count} Products
              </span>
            </div>
          </div>

          <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {item.tagline}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-border/50">
            {item.popularTags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                to={`/category/${categorySlug}`}
                className="rounded-md bg-secondary/80 hover:bg-primary/10 hover:text-primary border border-border/60 px-2 py-0.5 text-[10px] font-medium text-foreground transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link
          to={`/category/${categorySlug}`}
          className="w-full flex items-center justify-between rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground px-3 py-2 text-xs font-semibold text-foreground transition-all duration-200 group/btn"
        >
          <span>Explore Category</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

