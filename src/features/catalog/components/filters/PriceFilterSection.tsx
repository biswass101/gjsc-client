import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { CatalogFilterState } from "../../types";

interface PriceFilterSectionProps {
  priceBounds: { min: number; max: number };
  filters: CatalogFilterState;
  onFilterChange: (updates: Partial<CatalogFilterState>) => void;
}

export function PriceFilterSection({
  priceBounds,
  filters,
  onFilterChange,
}: PriceFilterSectionProps) {
  return (
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
                  maxPrice: Math.min(priceBounds.max, Number(e.target.value) || priceBounds.max),
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
  );
}

