"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Accordion } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, RotateCcw, Search, X } from "lucide-react";
import type { CatalogFilterProps } from "../types";
import { CategoryFilterSection } from "./filters/CategoryFilterSection";
import { PriceFilterSection } from "./filters/PriceFilterSection";
import { BrandFilterSection } from "./filters/BrandFilterSection";
import { FacetListSection } from "./filters/FacetListSection";

export function CatalogFilterSidebar(props: CatalogFilterProps) {
  return (
    <aside className="hidden lg:block w-64 lg:w-72 shrink-0">
      <div className="sticky top-24 rounded-xl border border-border/80 bg-card p-5 shadow-xs space-y-5">
        <FilterHeader
          activeCount={props.activeFilterCount}
          onReset={props.onResetFilters}
          title={props.title || "Filters"}
        />
        <FilterBody {...props} />
      </div>
    </aside>
  );
}

export function CatalogFilterDrawer(props: CatalogFilterProps) {
  const [open, setOpen] = useState(false);
  const title = props.title || "Filters";

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

      <SheetContent side="left" className="w-[86vw] sm:w-[380px] p-0 flex flex-col bg-background">
        <div className="border-b border-border/60 px-5 py-4 flex items-center justify-between">
          <SheetTitle className="text-base font-display font-bold flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <span>{title}</span>
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
  title,
}: {
  activeCount: number;
  onReset: () => void;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-3">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-primary" />
        <h3 className="font-display text-sm font-bold text-foreground">{title}</h3>
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

function FilterBody(props: CatalogFilterProps) {
  const {
    filters,
    onFilterChange,
    availableCategories = [],
    availableBrands = [],
    availableConcerns = [],
    availableSkinTypes = [],
    availableBadges = [],
    availableSubcategories = [],
    priceBounds,
    hideCategories = false,
    hideBrands = false,
    hideConcerns = false,
    hideSkinTypes = false,
    hideBadges = false,
  } = props;

  const toggleArrayItem = (list: string[] | undefined, item: string) => {
    const safeList = list || [];
    return safeList.includes(item) ? safeList.filter((i) => i !== item) : [...safeList, item];
  };

  return (
    <div className="space-y-4">
      {/* 1. Keyword search */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Search Catalog</label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={filters.searchQuery || ""}
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
        defaultValue={["subcategories", "categories", "price", "brands", "concerns"]}
        className="w-full text-xs"
      >
        <CategoryFilterSection
          availableSubcategories={availableSubcategories}
          availableCategories={availableCategories}
          hideCategories={hideCategories}
          filters={filters}
          onFilterChange={onFilterChange}
          toggleArrayItem={toggleArrayItem}
        />

        <PriceFilterSection
          priceBounds={priceBounds}
          filters={filters}
          onFilterChange={onFilterChange}
        />

        <BrandFilterSection
          availableBrands={availableBrands}
          hideBrands={hideBrands}
          filters={filters}
          onFilterChange={onFilterChange}
          toggleArrayItem={toggleArrayItem}
        />

        <FacetListSection
          availableConcerns={availableConcerns}
          availableSkinTypes={availableSkinTypes}
          availableBadges={availableBadges}
          hideConcerns={hideConcerns}
          hideSkinTypes={hideSkinTypes}
          hideBadges={hideBadges}
          filters={filters}
          onFilterChange={onFilterChange}
          toggleArrayItem={toggleArrayItem}
        />
      </Accordion>
    </div>
  );
}
