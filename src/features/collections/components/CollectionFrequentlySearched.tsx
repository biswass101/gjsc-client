"use client";

import { TrendingUp, Search, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollectionFrequentlySearchedProps {
  collectionTitle: string;
  items: string[];
  activeSearchQuery: string;
  onSelectQuery: (query: string) => void;
  onClearQuery: () => void;
}

export function CollectionFrequentlySearched({
  collectionTitle,
  items,
  activeSearchQuery,
  onSelectQuery,
  onClearQuery,
}: CollectionFrequentlySearchedProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-3.5 sm:p-4 my-4 backdrop-blur-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-border/40">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-primary">
            <TrendingUp className="h-3.5 w-3.5" />
          </div>
          <span>Frequently Searched in {collectionTitle}</span>
          <span className="hidden md:inline-block text-[11px] font-normal text-muted-foreground">
            · Popular Tokyo formulas people look for
          </span>
        </div>

        {activeSearchQuery && (
          <button
            onClick={onClearQuery}
            className="inline-flex items-center gap-1 self-start sm:self-auto text-[11px] font-medium text-primary hover:underline"
          >
            <X className="h-3 w-3" />
            <span>Clear search tag</span>
          </button>
        )}
      </div>

      {/* Query Pills */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
        {items.map((item) => {
          const isSelected =
            activeSearchQuery.trim().toLowerCase() === item.trim().toLowerCase();

          return (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (isSelected) {
                  onClearQuery();
                } else {
                  onSelectQuery(item);
                }
              }}
              className={cn(
                "group inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-xs ring-2 ring-primary/30"
                  : "border border-border/80 bg-background text-foreground/85 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              )}
            >
              <Search
                className={cn(
                  "h-3 w-3 transition-colors",
                  isSelected
                    ? "text-primary-foreground"
                    : "text-muted-foreground group-hover:text-primary"
                )}
              />
              <span>{item}</span>
              {isSelected && <X className="h-3 w-3 ml-0.5 opacity-80" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

