import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";
import type { CatalogFilterState, CatalogFacetItem } from "../../types";

interface CategoryFilterSectionProps {
  availableSubcategories?: string[] | undefined;
  availableCategories?: CatalogFacetItem[] | undefined;
  hideCategories?: boolean | undefined;
  filters: CatalogFilterState;
  onFilterChange: (updates: Partial<CatalogFilterState>) => void;
  toggleArrayItem: (list: string[] | undefined, item: string) => string[];
}

export function CategoryFilterSection({
  availableSubcategories = [],
  availableCategories = [],
  hideCategories = false,
  filters,
  onFilterChange,
  toggleArrayItem,
}: CategoryFilterSectionProps) {
  const [categorySearch, setCategorySearch] = useState("");

  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return availableCategories;
    return availableCategories.filter((c) =>
      c.name.toLowerCase().includes(categorySearch.toLowerCase()),
    );
  }, [availableCategories, categorySearch]);

  return (
    <>
      {/* Subcategories Facet (e.g. for Category Page) */}
      {availableSubcategories.length > 1 && (
        <AccordionItem value="subcategories" className="border-border/60">
          <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
            <span>Category Type</span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-1 space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin pr-1">
            {availableSubcategories.map((sub) => {
              const checked =
                sub === "All"
                  ? filters.selectedSubcategory === "All" || !filters.selectedSubcategory
                  : filters.selectedSubcategory?.toLowerCase() === sub.toLowerCase();

              return (
                <label
                  key={sub}
                  className="flex items-center gap-2 text-xs text-foreground/85 hover:text-foreground cursor-pointer"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() =>
                      onFilterChange({
                        selectedSubcategory: sub,
                      })
                    }
                  />
                  <span className={checked ? "font-semibold text-primary" : ""}>{sub}</span>
                </label>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Category Facet */}
      {!hideCategories && availableCategories.length > 0 && (
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
                const checked = (filters.selectedCategories || []).includes(cat.name);
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
                              cat.name,
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
    </>
  );
}
