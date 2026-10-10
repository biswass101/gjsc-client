import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({ value, count, className }: { value: number; count?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-label={`Rated ${value} out of 5`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn("h-3.5 w-3.5", i <= Math.round(value) ? "fill-gold text-gold" : "text-border")}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {value.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </span>
    </div>
  );
}
