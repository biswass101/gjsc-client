"use client";

import { CategoryMeta } from "../data/categoryMetadata";
import { CategoryBreadcrumb } from "./CategoryBreadcrumb";
import { Sparkles, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryHeroProps {
  meta: CategoryMeta;
  totalCount: number;
  selectedSubcategory: string;
  onSelectSubcategory: (sub: string) => void;
}

export function CategoryHero({
  meta,
  totalCount,
  selectedSubcategory,
  onSelectSubcategory,
}: CategoryHeroProps) {
  return (
    <div className="relative border-b border-border/60 bg-gradient-to-b from-cream/60 via-background to-background pt-2 pb-6 sm:pb-8">
      <div className="container-lux">
        {/* Breadcrumb Navigation */}
        <CategoryBreadcrumb title={meta.title} />

        {/* Header Content */}
        <div className="mt-2 max-w-4xl">
          {/* Japanese Kanji Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-0.5 text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            <span>{meta.japaneseTitle}</span>
          </div>

          {/* Category Title & Product Count */}
          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {meta.title}
            </h1>
            <span className="text-xs sm:text-sm font-sans font-medium text-muted-foreground">
              ({totalCount} {totalCount === 1 ? "Product" : "Products"})
            </span>
          </div>

          {/* Short Description */}
          <p className="mt-2.5 text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground max-w-3xl">
            {meta.description}
          </p>

          {/* Trust Highlights Strip (BeautyBooth Inspiration) */}
          <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>100% Genuine Japanese Import</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free Delivery Over ৳5,000</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <RefreshCw className="h-3.5 w-3.5 text-primary" />
              <span>Doorstep COD in Bangladesh</span>
            </span>
          </div>
        </div>

        {/* Subcategory Quick-Filter Pills */}
        {meta.subcategories.length > 1 && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mr-1 shrink-0 hidden sm:inline">
                Subcategories:
              </span>
              {meta.subcategories.map((sub) => {
                const isSelected =
                  sub === "All"
                    ? selectedSubcategory === "All" || !selectedSubcategory
                    : selectedSubcategory.toLowerCase() === sub.toLowerCase();

                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => onSelectSubcategory(sub)}
                    className={cn(
                      "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all active:scale-95",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-xs font-semibold ring-1 ring-primary"
                        : "bg-card border border-border/80 text-foreground hover:border-primary/50 hover:bg-secondary/60"
                    )}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

