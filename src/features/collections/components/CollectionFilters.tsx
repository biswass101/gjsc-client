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

export interface CollectionFilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedConcerns: string[];
  selectedSkinTypes: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}

interface CollectionFiltersProps {
  filters: CollectionFilterState;
  onFilterChange: (updates: Partial<CollectionFilterState>) => void;
  onResetFilters: () => void;
  availableCategories: { name: string; count: number }[];
  availableBrands: { name: string; count: number }[];
  availableConcerns: { name: string; count: number }[];
  availableSkinTypes: { name: string; count: number }[];
  priceBounds: { min: number; max: number };
  activeFilterCount: number;
}

export function CollectionFilterSidebar(props: CollectionFiltersProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
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

export function CollectionFilterDrawer(props: CollectionFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden flex items-center gap-2 rounded-full border-border/80 bg-background text-xs font-semibold shadow-2xs"
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
            Collection Filters
          </SheetTitle>
          {props.activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={props.onResetFilters}
              className="text-xs text-muted-foreground hover:text-primary h-7 px-2"
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
            className="w-full rounded-full bg-primary text-xs font-semibold text-primary-foreground py-2.5 shadow-sm"
          >
            Apply Filters
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

function FilterBody(props: CollectionFiltersProps) {
  const {
    filters,
    onFilterChange,
    availableCategories,
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

  return (
    <div className="space-y-4">
      {/* 1. Keyword search inside collection */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Search Items</label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search by keyword..."
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
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">In Stock Only</span>
          <Switch
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => onFilterChange({ inStockOnly: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">On Sale / Discount</span>
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
        {/* Category / Subtype */}
        {availableCategories.length > 0 && (
          <AccordionItem value="categories" className="border-border/60">
            <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
              <span>Category ({availableCategories.length})</span>
            </AccordionTrigger>
            <AccordionContent className="pb-3 pt-1 space-y-2 max-h-48 overflow-y-auto pr-1">
              {availableCategories.map((cat) => {
                const checked = filters.selectedCategories.includes(cat.name);
                return (
                  <label
                    key={cat.name}
                    className="flex items-center justify-between gap-2 text-xs text-foreground/85 hover:text-foreground cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(c) => {
                          const next = c
                            ? [...filters.selectedCategories, cat.name]
                            : filters.selectedCategories.filter((i) => i !== cat.name);
                          onFilterChange({ selectedCategories: next });
                        }}
                      />
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-sans">
                      ({cat.count})
                    </span>
                  </label>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Price Range */}
        <AccordionItem value="price" className="border-border/60">
          <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
            <span>Price Range</span>
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
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <div className="rounded border border-border px-2 py-1 font-mono text-muted-foreground">
                {formatBDT(filters.minPrice)}
              </div>
              <span className="text-muted-foreground">to</span>
              <div className="rounded border border-border px-2 py-1 font-mono text-muted-foreground">
                {formatBDT(filters.maxPrice)}
              </div>
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
              {availableBrands.length > 5 && (
                <div className="mb-2">
                  <Input
                    placeholder="Search brand..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="h-7 text-[11px] rounded-md"
                  />
                </div>
              )}
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
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
                          onCheckedChange={(c) => {
                            const next = c
                              ? [...filters.selectedBrands, b.name]
                              : filters.selectedBrands.filter((brand) => brand !== b.name);
                            onFilterChange({ selectedBrands: next });
                          }}
                        />
                        <span className="truncate max-w-[130px]">{b.name}</span>
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
            <AccordionContent className="pb-3 pt-1 space-y-2 max-h-48 overflow-y-auto pr-1">
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
                        onCheckedChange={(c) => {
                          const next = c
                            ? [...filters.selectedConcerns, con.name]
                            : filters.selectedConcerns.filter((name) => name !== con.name);
                          onFilterChange({ selectedConcerns: next });
                        }}
                      />
                      <span>{con.name}</span>
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
            <AccordionContent className="pb-3 pt-1 space-y-2">
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
                        onCheckedChange={(c) => {
                          const next = c
                            ? [...filters.selectedSkinTypes, type.name]
                            : filters.selectedSkinTypes.filter((t) => t !== type.name);
                          onFilterChange({ selectedSkinTypes: next });
                        }}
                      />
                      <span>{type.name}</span>
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

        {/* Customer Rating */}
        <AccordionItem value="rating" className="border-border/60">
          <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
            <span>Customer Rating</span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-1 space-y-2">
            {[4.5, 4.0, 0].map((rating) => {
              const label = rating === 0 ? "All Ratings" : `${rating} Stars & Up`;
              const checked = filters.minRating === rating;
              return (
                <label
                  key={rating}
                  onClick={() => onFilterChange({ minRating: rating })}
                  className="flex items-center gap-2 text-xs text-foreground/85 hover:text-primary cursor-pointer"
                >
                  <div
                    className={`h-4 w-4 rounded-full border grid place-items-center ${
                      checked
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border"
                    }`}
                  >
                    {checked && <div className="h-1.5 w-1.5 rounded-full bg-background" />}
                  </div>
                  <span className="flex items-center gap-1">
                    {rating > 0 && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                    <span>{label}</span>
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

