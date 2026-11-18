"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProductCardSkeleton({
  view = "grid",
  className,
}: {
  view?: "grid" | "list";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-md sm:rounded-lg border border-border/70 bg-card",
        view === "grid" && "w-full",
        view === "list" && "sm:flex sm:flex-row",
        className,
      )}
    >
      <div className={view === "list" ? "sm:flex sm:flex-1" : ""}>
        {/* Product Image Skeleton */}
        <div
          className={cn(
            "relative aspect-[4/3.25] w-full overflow-hidden bg-muted/40 animate-pulse",
            view === "list" && "sm:w-52 sm:shrink-0",
          )}
        >
          <div className="absolute left-2 top-2 h-4 w-12 rounded bg-muted/60" />
        </div>

        {/* Product Details Skeleton */}
        <div className="p-2.5 sm:p-3.5 space-y-2 flex-1">
          <Skeleton className="h-3 w-16 bg-muted/60 rounded" />
          <Skeleton className="h-4 w-4/5 bg-muted/70 rounded" />
          <Skeleton className="h-3 w-3/5 bg-muted/50 rounded hidden sm:block" />
        </div>
      </div>

      {/* Rating & Price Bottom Bar Skeleton */}
      <div className="px-2.5 pb-2.5 sm:px-3.5 sm:pb-3.5 pt-0">
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <Skeleton className="h-3.5 w-12 bg-muted/50 rounded" />
          <Skeleton className="h-4 w-16 bg-muted/70 rounded" />
        </div>
      </div>
    </article>
  );
}

