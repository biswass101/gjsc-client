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

export interface BrandFilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedConcerns: string[];
  selectedSkinTypes: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}

interface BrandFiltersProps {
  filters: BrandFilterState;
  onFilterChange: (updates: Partial<BrandFilterState>) => void;
  onResetFilters: () => void;
  availableCategories: { name: string; count: number }[];
  availableConcerns: { name: string; count: number }[];
  availableSkinTypes: { name: string; count: number }[];
  priceBounds: { min: number; max: number };
  activeFilterCount: number;
  filteredCount?: number;
}

export function BrandFilterSidebar(props: BrandFiltersProps) {
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

export function BrandFilterDrawer(props: BrandFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden flex items-center gap-2 rounded-full border-border/80 bg-background text-xs font-semibold shadow-2xs cursor-pointer"
        >
          <Filter className="h-3.5 w-3.5 text-primary" />
          <span>Filters</span>
          {props.activeFilterCount > 0 && (
            <span className="grid h-4 min-w-[16px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {props.activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[86vw] sm:w-[380px] p-0 flex flex-col bg-background"
      >
        <div className="border-b border-border/60 px-5 py-4 flex items-center justify-between">
          <SheetTitle className="text-base font-display font-bold">
            Brand Filters
          </SheetTitle>
          {props.activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={props.onResetFilters}
              className="text-xs text-muted-foreground hover:text-primary h-7 px-2 cursor-pointer"
            >
              Reset All
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          <FilterBody {...props} />
        </div>

        <div className="border-t border-border/60 p-4 bg-background/95 backdrop-blur-xs">
          <Button
            className="w-full rounded-full bg-primary text-primary-foreground font-semibold text-xs h-10 shadow-sm cursor-pointer"
            onClick={() => setOpen(false)}
          >
            {props.filteredCount !== undefined
              ? `View ${props.filteredCount} Results`
              : "Apply Filters"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
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
    <div className="flex items-center justify-between pb-3 border-b border-border/60">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-primary" />
        <h3 className="font-display text-sm font-semibold tracking-wide uppercase">
          Filters
        </h3>
        {activeCount > 0 && (
          <span className="grid h-4 min-w-[16px] place-items-center rounded-full bg-primary/10 px-1.5 text-[10px] font-bold text-primary">
            {activeCount}
          </span>
        )}
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}

function FilterBody({
  filters,
  onFilterChange,
  availableCategories,
  availableConcerns,
  availableSkinTypes,
  priceBounds,
}: BrandFiltersProps) {
  const [catSearch, setCatSearch] = useState("");
  const [concernSearch, setConcernSearch] = useState("");

  const filteredCategories = useMemo(() => {
    if (!catSearch) return availableCategories;
    return availableCategories.filter((c) =>
      c.name.toLowerCase().includes(catSearch.toLowerCase())
    );
  }, [availableCategories, catSearch]);

  const filteredConcerns = useMemo(() => {
    if (!concernSearch) return availableConcerns;
    return availableConcerns.filter((c) =>
      c.name.toLowerCase().includes(concernSearch.toLowerCase())
    );
  }, [availableConcerns, concernSearch]);

  const toggleCategory = (cat: string) => {
    const next = filters.selectedCategories.includes(cat)
      ? filters.selectedCategories.filter((c) => c !== cat)
      : [...filters.selectedCategories, cat];
    onFilterChange({ selectedCategories: next });
  };

  const toggleConcern = (concern: string) => {
    const next = filters.selectedConcerns.includes(concern)
      ? filters.selectedConcerns.filter((c) => c !== concern)
      : [...filters.selectedConcerns, concern];
    onFilterChange({ selectedConcerns: next });
  };

  const toggleSkinType = (skinType: string) => {
    const next = filters.selectedSkinTypes.includes(skinType)
      ? filters.selectedSkinTypes.filter((st) => st !== skinType)
      : [...filters.selectedSkinTypes, skinType];
    onFilterChange({ selectedSkinTypes: next });
  };

  return (
    <div className="space-y-4">
      {/* 1. Quick In-Brand Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
          placeholder="Search this brand..."
          className="h-8 pl-8 pr-7 text-xs rounded-lg"
        />
        {filters.searchQuery && (
          <button
            type="button"
            onClick={() => onFilterChange({ searchQuery: "" })}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* 2. Availability & Offers Switches */}
      <div className="space-y-2.5 pt-2 pb-3 border-b border-border/60">
        <div className="flex items-center justify-between">
          <label
            htmlFor="brand-instock"
            className="text-xs font-medium cursor-pointer"
          >
            In Stock Only
          </label>
          <Switch
            id="brand-instock"
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => onFilterChange({ inStockOnly: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="brand-onsale"
            className="text-xs font-medium cursor-pointer"
          >
            On Sale / Discounted
          </label>
          <Switch
            id="brand-onsale"
            checked={filters.onSaleOnly}
            onCheckedChange={(checked) => onFilterChange({ onSaleOnly: checked })}
          />
        </div>
      </div>

      {/* 3. Price Range Slider */}
      <div className="space-y-3 pb-4 border-b border-border/60">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-foreground">
            Price Range (BDT)
          </span>
        </div>

        <Slider
          min={priceBounds.min}
          max={priceBounds.max}
          step={50}
          value={[filters.minPrice, filters.maxPrice]}
          onValueChange={([min, max]) =>
            onFilterChange({
              minPrice: min ?? priceBounds.min,
              maxPrice: max ?? priceBounds.max,
            })
          }
          className="py-1"
        />

        {/* Min and Max input fields */}
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
                  maxPrice: Math.min(
                    priceBounds.max,
                    Number(e.target.value) || priceBounds.max
                  ),
                })
              }
              className="h-8 pl-5 text-xs"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Quick Price Presets */}
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
              className="rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-medium text-foreground hover:bg-secondary cursor-pointer transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Accordion Facets */}
      <Accordion
        type="multiple"
        defaultValue={["categories", "concerns"]}
        className="w-full space-y-1"
      >
        {/* Categories Facet */}
        {availableCategories.length > 0 && (
          <AccordionItem value="categories" className="border-b border-border/60">
            <AccordionTrigger className="py-2.5 text-xs font-semibold uppercase tracking-wider hover:no-underline">
              <span>Category ({availableCategories.length})</span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-3 space-y-2">
              {availableCategories.length > 6 && (
                <div className="relative mb-2">
                  <Input
                    type="text"
                    value={catSearch}
                    onChange={(e) => setCatSearch(e.target.value)}
                    placeholder="Search categories..."
                    className="h-7 text-[11px] rounded-md"
                  />
                </div>
              )}
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                {filteredCategories.map((cat) => {
                  const checked = filters.selectedCategories.includes(cat.name);
                  return (
                    <label
                      key={cat.name}
                      className="flex items-center justify-between text-xs py-0.5 px-1 rounded-md hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggleCategory(cat.name)}
                        />
                        <span className={checked ? "font-semibold text-primary" : ""}>
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {cat.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Skin Concerns Facet */}
        {availableConcerns.length > 0 && (
          <AccordionItem value="concerns" className="border-b border-border/60">
            <AccordionTrigger className="py-2.5 text-xs font-semibold uppercase tracking-wider hover:no-underline">
              <span>Skin Concern ({availableConcerns.length})</span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-3 space-y-2">
              {availableConcerns.length > 6 && (
                <div className="relative mb-2">
                  <Input
                    type="text"
                    value={concernSearch}
                    onChange={(e) => setConcernSearch(e.target.value)}
                    placeholder="Search concerns..."
                    className="h-7 text-[11px] rounded-md"
                  />
                </div>
              )}
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                {filteredConcerns.map((concern) => {
                  const checked = filters.selectedConcerns.includes(concern.name);
                  return (
                    <label
                      key={concern.name}
                      className="flex items-center justify-between text-xs py-0.5 px-1 rounded-md hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggleConcern(concern.name)}
                        />
                        <span className={checked ? "font-semibold text-primary" : ""}>
                          {concern.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {concern.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Skin Types Facet */}
        {availableSkinTypes.length > 0 && (
          <AccordionItem value="skintypes" className="border-b border-border/60">
            <AccordionTrigger className="py-2.5 text-xs font-semibold uppercase tracking-wider hover:no-underline">
              <span>Skin Type ({availableSkinTypes.length})</span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-3 space-y-1.5">
              {availableSkinTypes.map((st) => {
                const checked = filters.selectedSkinTypes.includes(st.name);
                return (
                  <label
                    key={st.name}
                    className="flex items-center justify-between text-xs py-0.5 px-1 rounded-md hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleSkinType(st.name)}
                      />
                      <span className={checked ? "font-semibold text-primary" : ""}>
                        {st.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {st.count}
                    </span>
                  </label>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Rating Facet */}
        <AccordionItem value="rating" className="border-none">
          <AccordionTrigger className="py-2.5 text-xs font-semibold uppercase tracking-wider hover:no-underline">
            <span>Customer Rating</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-2 space-y-1">
            {[4, 4.5, 3].map((r) => {
              const active = filters.minRating === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => onFilterChange({ minRating: active ? 0 : r })}
                  className={`w-full flex items-center justify-between text-xs px-2 py-1 rounded-md transition-colors cursor-pointer ${
                    active ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted/50 text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(r) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                    <span>{r}★ & above</span>
                  </div>
                </button>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

