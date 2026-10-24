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

export interface ShopFilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedConcerns: string[];
  selectedSkinTypes: string[];
  selectedBadges: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}

export interface FacetItem {
  name: string;
  count: number;
}

export interface ShopFiltersProps {
  filters: ShopFilterState;
  onFilterChange: (updates: Partial<ShopFilterState>) => void;
  onResetFilters: () => void;
  availableCategories: FacetItem[];
  availableBrands: FacetItem[];
  availableConcerns: FacetItem[];
  availableSkinTypes: FacetItem[];
  availableBadges: FacetItem[];
  priceBounds: { min: number; max: number };
  activeFilterCount: number;
  filteredCount?: number;
}

export function ShopFilterSidebar(props: ShopFiltersProps) {
  return (
    <aside className="hidden lg:block w-64 lg:w-72 shrink-0">
      <div className="sticky top-24 rounded-2xl border border-border/80 bg-card p-5 shadow-xs space-y-5">
        <FilterHeader
          activeCount={props.activeFilterCount}
          onReset={props.onResetFilters}
        />
        <FilterBody {...props} />
      </div>
    </aside>
  );
}

export function ShopFilterDrawer(props: ShopFiltersProps) {
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
          <SheetTitle className="text-base font-display font-bold flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <span>Shop Filters</span>
            {props.activeFilterCount > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                {props.activeFilterCount} active
              </span>
            )}
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
            onClick={() => setOpen(false)}
            className="w-full rounded-full bg-primary text-xs font-semibold text-primary-foreground py-2.5 shadow-sm cursor-pointer"
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
    <div className="flex items-center justify-between border-b border-border/60 pb-3">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-primary" />
        <h3 className="font-display text-sm font-bold text-foreground">Filters</h3>
        {activeCount > 0 && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
            {activeCount} active
          </span>
        )}
      </div>

      {activeCount > 0 && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}

function FilterBody(props: ShopFiltersProps) {
  const {
    filters,
    onFilterChange,
    availableCategories,
    availableBrands,
    availableConcerns,
    availableSkinTypes,
    availableBadges,
    priceBounds,
  } = props;

  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return availableCategories;
    return availableCategories.filter((c) =>
      c.name.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [availableCategories, categorySearch]);

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    return availableBrands.filter((b) =>
      b.name.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [availableBrands, brandSearch]);

  const toggleArrayItem = (list: string[], item: string) => {
    return list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
  };

  return (
    <div className="space-y-4">
      {/* 1. Keyword search inside shop */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Search Catalog</label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search by keyword, brand..."
            className="h-8.5 pl-8 pr-7 text-xs rounded-lg"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: "" })}
              className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Availability & Offers (Switches) */}
      <div className="space-y-2.5 pt-1 pb-3 border-b border-border/60">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">In Stock Only</span>
          <Switch
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => onFilterChange({ inStockOnly: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">On Sale & Deals</span>
          <Switch
            checked={filters.onSaleOnly}
            onCheckedChange={(checked) => onFilterChange({ onSaleOnly: checked })}
          />
        </div>
      </div>

      {/* Accordion Filters */}
      <Accordion
        type="multiple"
        defaultValue={["categories", "price", "brands", "concerns"]}
        className="w-full text-xs"
      >
        {/* Category Facet */}
        {availableCategories.length > 0 && (
          <AccordionItem value="categories" className="border-border/60">
            <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
              <span>Category ({availableCategories.length})</span>
            </AccordionTrigger>
            <AccordionContent className="pb-3 pt-1 space-y-2">
              {availableCategories.length > 6 && (
                <div className="relative mb-2">
                  <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search category..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="h-7.5 pl-7 text-[11px] rounded-md"
                  />
                </div>
              )}
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {filteredCategories.map((cat) => {
                  const checked = filters.selectedCategories.includes(cat.name);
                  return (
                    <label
                      key={cat.name}
                      className="flex items-center justify-between gap-2 text-xs text-foreground/85 hover:text-foreground cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() =>
                            onFilterChange({
                              selectedCategories: toggleArrayItem(
                                filters.selectedCategories,
                                cat.name
                              ),
                            })
                          }
                        />
                        <span className={checked ? "font-semibold text-primary" : ""}>
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground font-sans">
                        ({cat.count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Price Range */}
        <AccordionItem value="price" className="border-border/60">
          <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
            <span>Price Range (BDT)</span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-1 space-y-3">
            <Slider
              min={priceBounds.min}
              max={priceBounds.max}
              step={50}
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) => {
                if (min !== undefined && max !== undefined) {
                  onFilterChange({ minPrice: min, maxPrice: max });
                }
              }}
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
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        {availableBrands.length > 0 && (
          <AccordionItem value="brands" className="border-border/60">
            <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
              <span>Brand ({availableBrands.length})</span>
            </AccordionTrigger>
            <AccordionContent className="pb-3 pt-1 space-y-2">
              {availableBrands.length > 6 && (
                <div className="relative mb-2">
                  <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search brand..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="h-7.5 pl-7 text-[11px] rounded-md"
                  />
                </div>
              )}
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {filteredBrands.map((b) => {
                  const checked = filters.selectedBrands.includes(b.name);
                  return (
                    <label
                      key={b.name}
                      className="flex items-center justify-between gap-2 text-xs text-foreground/85 hover:text-foreground cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() =>
                            onFilterChange({
                              selectedBrands: toggleArrayItem(
                                filters.selectedBrands,
                                b.name
                              ),
                            })
                          }
                        />
                        <span className={`truncate max-w-[130px] ${checked ? "font-semibold text-primary" : ""}`}>
                          {b.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground font-sans">
                        ({b.count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Skin Concern */}
        {availableConcerns.length > 0 && (
          <AccordionItem value="concerns" className="border-border/60">
            <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
              <span>Skin Concern ({availableConcerns.length})</span>
            </AccordionTrigger>
            <AccordionContent className="pb-3 pt-1 space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
              {availableConcerns.map((con) => {
                const checked = filters.selectedConcerns.includes(con.name);
                return (
                  <label
                    key={con.name}
                    className="flex items-center justify-between gap-2 text-xs text-foreground/85 hover:text-foreground cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() =>
                          onFilterChange({
                            selectedConcerns: toggleArrayItem(
                              filters.selectedConcerns,
                              con.name
                            ),
                          })
                        }
                      />
                      <span className={checked ? "font-semibold text-primary" : ""}>
                        {con.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-sans">
                      ({con.count})
                    </span>
                  </label>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Skin Type */}
        {availableSkinTypes.length > 0 && (
          <AccordionItem value="skintype" className="border-border/60">
            <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
              <span>Skin Type ({availableSkinTypes.length})</span>
            </AccordionTrigger>
            <AccordionContent className="pb-3 pt-1 space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
              {availableSkinTypes.map((type) => {
                const checked = filters.selectedSkinTypes.includes(type.name);
                return (
                  <label
                    key={type.name}
                    className="flex items-center justify-between gap-2 text-xs text-foreground/85 hover:text-foreground cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() =>
                          onFilterChange({
                            selectedSkinTypes: toggleArrayItem(
                              filters.selectedSkinTypes,
                              type.name
                            ),
                          })
                        }
                      />
                      <span className={checked ? "font-semibold text-primary" : ""}>
                        {type.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-sans">
                      ({type.count})
                    </span>
                  </label>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Special Collections / Badges */}
        {availableBadges.length > 0 && (
          <AccordionItem value="badges" className="border-border/60">
            <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
              <span>Badge / Status ({availableBadges.length})</span>
            </AccordionTrigger>
            <AccordionContent className="pb-3 pt-1 space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
              {availableBadges.map((badge) => {
                const checked = filters.selectedBadges.includes(badge.name);
                return (
                  <label
                    key={badge.name}
                    className="flex items-center justify-between gap-2 text-xs text-foreground/85 hover:text-foreground cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() =>
                          onFilterChange({
                            selectedBadges: toggleArrayItem(
                              filters.selectedBadges,
                              badge.name
                            ),
                          })
                        }
                      />
                      <span className={checked ? "font-semibold text-primary" : ""}>
                        {badge.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-sans">
                      ({badge.count})
                    </span>
                  </label>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Customer Rating */}
        <AccordionItem value="rating" className="border-border/60">
          <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
            <span>Customer Rating</span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-1 space-y-2">
            {[
              { val: 4.5, label: "4.5 Stars & Up" },
              { val: 4.0, label: "4.0 Stars & Up" },
              { val: 3.5, label: "3.5 Stars & Up" },
              { val: 0, label: "All Ratings" },
            ].map((rating) => {
              const checked = filters.minRating === rating.val;
              return (
                <label
                  key={rating.val}
                  onClick={() => onFilterChange({ minRating: rating.val })}
                  className="flex items-center gap-2 text-xs text-foreground/85 hover:text-primary cursor-pointer select-none"
                >
                  <div
                    className={`h-4 w-4 rounded-full border grid place-items-center transition-colors ${
                      checked
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border"
                    }`}
                  >
                    {checked && <div className="h-1.5 w-1.5 rounded-full bg-background" />}
                  </div>
                  <span className="flex items-center gap-1">
                    {rating.val > 0 && (
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(rating.val)
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    <span>{rating.label}</span>
                  </span>
                </label>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

