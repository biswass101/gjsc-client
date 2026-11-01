import { Link } from "@/lib/navigation";
import { CheckCircle2, Star, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReviewItem } from "./reviewsData";

interface ReviewCardProps {
  rev: ReviewItem;
  currentHelpful: number;
  hasVoted: boolean;
  onHelpful: (id: string, initialCount: number) => void;
}

export function ReviewCard({ rev, currentHelpful, hasVoted, onHelpful }: ReviewCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-md sm:rounded-lg border border-border bg-card p-4 sm:p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-primary/40">
      <div>
        {/* Top: Reviewer Info & Rating */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img
              src={rev.avatar}
              alt={rev.name}
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover border border-border shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="font-semibold text-xs sm:text-sm text-foreground">{rev.name}</h4>
                {rev.verified && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-1.5 py-0.2 text-[8px] sm:text-[9px] font-semibold text-emerald-600">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {rev.city} · {rev.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
            {[...Array(rev.rating)].map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
        </div>

        {/* Verified Purchased Product Pill */}
        <div className="mt-3 inline-block">
          <Link
            to="/product/$slug"
            params={{ slug: rev.productSlug }}
            className="inline-flex items-center gap-1 rounded-lg bg-muted/60 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-medium text-foreground hover:bg-muted hover:text-primary transition-colors line-clamp-1"
          >
            <span className="text-muted-foreground">Purchased:</span>
            <span className="font-semibold underline decoration-primary/40 underline-offset-2 truncate">
              {rev.productName}
            </span>
          </Link>
        </div>

        {/* Headline & Body */}
        <h3 className="mt-2 font-display text-xs sm:text-base font-bold leading-snug text-foreground">
          "{rev.headline}"
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {rev.content}
        </p>
      </div>

      {/* Bottom Helpful Button */}
      <div className="mt-3.5 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs">
        <span className="text-[10px] sm:text-[11px] text-muted-foreground">Helpful review?</span>
        <button
          type="button"
          onClick={() => onHelpful(rev.id, rev.helpfulCount)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-medium transition-all active:scale-95 cursor-pointer",
            hasVoted
              ? "bg-primary/15 text-primary border border-primary/30"
              : "bg-muted/50 border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
          )}
        >
          <ThumbsUp className="h-3 w-3" />
          <span>{hasVoted ? "Thank you!" : `Helpful (${currentHelpful})`}</span>
        </button>
      </div>
    </div>
  );
}

