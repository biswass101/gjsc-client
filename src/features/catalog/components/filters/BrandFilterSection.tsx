import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";
import type { CatalogFilterState, CatalogFacetItem } from "../../types";

interface BrandFilterSectionProps {
  availableBrands?: CatalogFacetItem[] | undefined;
  hideBrands?: boolean | undefined;
  filters: CatalogFilterState;
  onFilterChange: (updates: Partial<CatalogFilterState>) => void;
  toggleArrayItem: (list: string[] | undefined, item: string) => string[];
}

export function BrandFilterSection({
  availableBrands = [],
  hideBrands = false,
  filters,
  onFilterChange,
  toggleArrayItem,
}: BrandFilterSectionProps) {
  const [brandSearch, setBrandSearch] = useState("");

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    return availableBrands.filter((b) => b.name.toLowerCase().includes(brandSearch.toLowerCase()));
  }, [availableBrands, brandSearch]);

  if (hideBrands || availableBrands.length === 0) return null;

  return (
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
            const checked = (filters.selectedBrands || []).includes(b.name);
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
                        selectedBrands: toggleArrayItem(filters.selectedBrands, b.name),
                      })
                    }
                  />
                  <span
                    className={`truncate max-w-[130px] ${checked ? "font-semibold text-primary" : ""}`}
                  >
                    {b.name}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground font-sans">({b.count})</span>
              </label>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
