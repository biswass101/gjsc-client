"use client";

import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatBDT } from "@/lib/catalog";
import { Filter, RotateCcw, Search, Star, X } from "lucide-react";

export interface CategoryFilterState {
  selectedSubcategory: string;
  selectedBrands: string[];
  selectedConcerns: string[];
  selectedSkinTypes: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}

interface CategoryFiltersProps {
  filters: CategoryFilterState;
  onFilterChange: (updates: Partial<CategoryFilterState>) => void;
  onResetFilters: () => void;
  availableSubcategories: string[];
  availableBrands: { name: string; count: number }[];
  availableConcerns: { name: string; count: number }[];
  availableSkinTypes: { name: string; count: number }[];
  priceBounds: { min: number; max: number };
  activeFilterCount: number;
  filteredCount?: number;
}

export function CategoryFilterSidebar(props: CategoryFiltersProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 rounded-xl border border-border/80 bg-card p-5 shadow-xs space-y-5">
        <FilterHeader
          activeCount={props.activeFilterCount}
          onReset={props.onResetFilters}
        />
        <FilterBody {...props} />
      </div>
    </aside>
  );
}

export function CategoryFilterDrawer(props: CategoryFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 rounded-full border-border/80 bg-card px-4 text-xs font-semibold shadow-xs"
          >
            <Filter className="h-3.5 w-3.5 text-primary" />
            <span>Filters</span>
            {props.activeFilterCount > 0 && (
              <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {props.activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[90vw] sm:w-[380px] max-w-sm overflow-y-auto bg-background p-0 border-r border-border"
        >
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4 bg-cream/40">
            <SheetTitle className="font-display text-lg font-bold flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <span>Filters</span>
              {props.activeFilterCount > 0 && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {props.activeFilterCount} active
                </span>
              )}
            </SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={props.onResetFilters}
              className="text-xs text-muted-foreground hover:text-foreground h-8 px-2"
            >
              Reset
            </Button>
          </div>

          <div className="p-5 space-y-5">
            <FilterBody {...props} />
          </div>

          <div className="border-t border-border/60 p-4 bg-background/95 backdrop-blur-xs">
            <Button
              className="w-full rounded-full bg-primary text-xs font-semibold text-primary-foreground py-2.5 shadow-sm cursor-pointer"
              onClick={() => setOpen(false)}
            >
              {props.filteredCount !== undefined
                ? `View ${props.filteredCount} Results`
                : "Apply Filters"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function FilterHeader({
  activeCount,
  onReset,
}: {
  activeCount: number;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-3">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-primary" />
        <h3 className="font-display text-base font-bold text-foreground">Filters</h3>
        {activeCount > 0 && (
          <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {activeCount}
          </span>
        )}
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}

function FilterBody(props: CategoryFiltersProps) {
  const {
    filters,
    onFilterChange,
    availableSubcategories,
    availableBrands,
    availableConcerns,
    availableSkinTypes,
    priceBounds,
  } = props;

  const [brandSearch, setBrandSearch] = useState("");

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    return availableBrands.filter((b) =>
      b.name.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [availableBrands, brandSearch]);

  const toggleItem = (list: string[], item: string): string[] => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={["subcategories", "price", "brands", "concerns"]}
      className="space-y-3"
    >
      {/* 1. Quick In-Stock & On-Sale Toggles */}
      <div className="space-y-2.5 pb-3 border-b border-border/60">
        <label className="flex items-center justify-between text-xs font-medium text-foreground cursor-pointer select-none">
          <span>In Stock Only</span>
          <Switch
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => onFilterChange({ inStockOnly: checked })}
          />
        </label>
        <label className="flex items-center justify-between text-xs font-medium text-foreground cursor-pointer select-none">
          <span>On Sale & Offers</span>
          <Switch
            checked={filters.onSaleOnly}
            onCheckedChange={(checked) => onFilterChange({ onSaleOnly: checked })}
          />
        </label>
      </div>

      {/* 2. Subcategory Filter */}
      {availableSubcategories.length > 1 && (
        <AccordionItem value="subcategories" className="border-border/60">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider py-2 hover:no-underline">
            Category Type
          </AccordionTrigger>
          <AccordionContent className="pt-1">
            <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-hide pr-1">
              {availableSubcategories.map((sub) => {
                const checked =
                  sub === "All"
                    ? filters.selectedSubcategory === "All" || !filters.selectedSubcategory
                    : filters.selectedSubcategory.toLowerCase() === sub.toLowerCase();

                return (
                  <label
                    key={sub}
                    className="flex items-center gap-2.5 py-1 text-xs text-foreground/90 hover:text-primary transition-colors cursor-pointer select-none"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() =>
                        onFilterChange({
                          selectedSubcategory: sub === "All" ? "All" : sub,
                        })
                      }
                    />
                    <span className="truncate">{sub}</span>
                  </label>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* 3. Price Range Filter */}
      <AccordionItem value="price" className="border-border/60">
        <AccordionTrigger className="text-xs font-bold uppercase tracking-wider py-2 hover:no-underline">
          Price Range (BDT)
        </AccordionTrigger>
        <AccordionContent className="pt-2 space-y-3">
          <Slider
            min={priceBounds.min}
            max={priceBounds.max}
            step={100}
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={([min, max]) => {
              if (min !== undefined && max !== undefined) {
                onFilterChange({ minPrice: min, maxPrice: max });
              }
            }}
          />

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2 top-2 text-[10px] text-muted-foreground">৳</span>
              <Input
                type="number"
                value={filters.minPrice}
                onChange={(e) =>
                  onFilterChange({
                    minPrice: Math.max(priceBounds.min, Number(e.target.value) || 0),
                  })
                }
                className="h-8 pl-5 text-xs"
                placeholder="Min"
              />
            </div>
            <span className="text-xs text-muted-foreground">–</span>
            <div className="relative flex-1">
              <span className="absolute left-2 top-2 text-[10px] text-muted-foreground">৳</span>
              <Input
                type="number"
                value={filters.maxPrice}
                onChange={(e) =>
                  onFilterChange({
                    maxPrice: Math.min(priceBounds.max, Number(e.target.value) || priceBounds.max),
                  })
                }
                className="h-8 pl-5 text-xs"
                placeholder="Max"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              { label: "Under ৳2k", max: 2000 },
              { label: "৳2k - ৳5k", min: 2000, max: 5000 },
              { label: "Above ৳5k", min: 5000 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  onFilterChange({
                    minPrice: preset.min ?? priceBounds.min,
                    maxPrice: preset.max ?? priceBounds.max,
                  })
                }
                className="rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-medium text-foreground hover:bg-secondary"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 4. Brand Filter */}
      {availableBrands.length > 0 && (
        <AccordionItem value="brands" className="border-border/60">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider py-2 hover:no-underline">
            Brands ({availableBrands.length})
          </AccordionTrigger>
          <AccordionContent className="pt-1 space-y-2">
            {availableBrands.length > 5 && (
              <div className="relative">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Search brands..."
                  className="h-7.5 pl-8 text-[11px]"
                />
              </div>
            )}

            <div className="space-y-1.5 max-h-44 overflow-y-auto scrollbar-hide pr-1">
              {filteredBrands.map((brand) => (
                <label
                  key={brand.name}
                  className="flex items-center justify-between gap-2 py-1 text-xs text-foreground/90 hover:text-primary transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Checkbox
                      checked={filters.selectedBrands.includes(brand.name)}
                      onCheckedChange={() =>
                        onFilterChange({
                          selectedBrands: toggleItem(filters.selectedBrands, brand.name),
                        })
                      }
                    />
                    <span className="truncate">{brand.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {brand.count}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* 5. Skin Concern Filter */}
      {availableConcerns.length > 0 && (
        <AccordionItem value="concerns" className="border-border/60">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider py-2 hover:no-underline">
            Skin Concern
          </AccordionTrigger>
          <AccordionContent className="pt-1">
            <div className="space-y-1.5 max-h-44 overflow-y-auto scrollbar-hide pr-1">
              {availableConcerns.map((c) => (
                <label
                  key={c.name}
                  className="flex items-center justify-between gap-2 py-1 text-xs text-foreground/90 hover:text-primary transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Checkbox
                      checked={filters.selectedConcerns.includes(c.name)}
                      onCheckedChange={() =>
                        onFilterChange({
                          selectedConcerns: toggleItem(filters.selectedConcerns, c.name),
                        })
                      }
                    />
                    <span className="truncate">{c.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">{c.count}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* 6. Skin Type Filter */}
      {availableSkinTypes.length > 0 && (
        <AccordionItem value="skintypes" className="border-border/60">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider py-2 hover:no-underline">
            Skin Type
          </AccordionTrigger>
          <AccordionContent className="pt-1">
            <div className="space-y-1.5">
              {availableSkinTypes.map((st) => (
                <label
                  key={st.name}
                  className="flex items-center justify-between gap-2 py-1 text-xs text-foreground/90 hover:text-primary transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Checkbox
                      checked={filters.selectedSkinTypes.includes(st.name)}
                      onCheckedChange={() =>
                        onFilterChange({
                          selectedSkinTypes: toggleItem(filters.selectedSkinTypes, st.name),
                        })
                      }
                    />
                    <span className="truncate">{st.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">{st.count}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* 7. Rating Filter */}
      <AccordionItem value="rating" className="border-border/60">
        <AccordionTrigger className="text-xs font-bold uppercase tracking-wider py-2 hover:no-underline">
          Customer Rating
        </AccordionTrigger>
        <AccordionContent className="pt-1 space-y-1.5">
          {[
            { label: "4.5 Stars & above", val: 4.5 },
            { label: "4.0 Stars & above", val: 4.0 },
            { label: "3.5 Stars & above", val: 3.5 },
          ].map((r) => (
            <label
              key={r.val}
              className="flex items-center gap-2 py-1 text-xs text-foreground/90 hover:text-primary transition-colors cursor-pointer select-none"
            >
              <Checkbox
                checked={filters.minRating === r.val}
                onCheckedChange={() =>
                  onFilterChange({
                    minRating: filters.minRating === r.val ? 0 : r.val,
                  })
                }
              />
              <div className="flex items-center gap-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(r.val)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">({r.val}+)</span>
              </div>
            </label>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

