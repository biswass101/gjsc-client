import { Checkbox } from "@/components/ui/checkbox";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star } from "lucide-react";
import type { CatalogFilterState, CatalogFacetItem } from "../../types";

interface FacetListSectionProps {
  availableConcerns?: CatalogFacetItem[] | undefined;
  availableSkinTypes?: CatalogFacetItem[] | undefined;
  availableBadges?: CatalogFacetItem[] | undefined;
  hideConcerns?: boolean | undefined;
  hideSkinTypes?: boolean | undefined;
  hideBadges?: boolean | undefined;
  filters: CatalogFilterState;
  onFilterChange: (updates: Partial<CatalogFilterState>) => void;
  toggleArrayItem: (list: string[] | undefined, item: string) => string[];
}

export function FacetListSection({
  availableConcerns = [],
  availableSkinTypes = [],
  availableBadges = [],
  hideConcerns = false,
  hideSkinTypes = false,
  hideBadges = false,
  filters,
  onFilterChange,
  toggleArrayItem,
}: FacetListSectionProps) {
  return (
    <>
      {/* Skin Concern */}
      {!hideConcerns && availableConcerns.length > 0 && (
        <AccordionItem value="concerns" className="border-border/60">
          <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
            <span>Skin Concern ({availableConcerns.length})</span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-1 space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
            {availableConcerns.map((con) => {
              const checked = (filters.selectedConcerns || []).includes(con.name);
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
                          selectedConcerns: toggleArrayItem(filters.selectedConcerns, con.name),
                        })
                      }
                    />
                    <span className={checked ? "font-semibold text-primary" : ""}>{con.name}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-sans">({con.count})</span>
                </label>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Skin Type */}
      {!hideSkinTypes && availableSkinTypes.length > 0 && (
        <AccordionItem value="skintype" className="border-border/60">
          <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
            <span>Skin Type ({availableSkinTypes.length})</span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-1 space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
            {availableSkinTypes.map((type) => {
              const checked = (filters.selectedSkinTypes || []).includes(type.name);
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
                          selectedSkinTypes: toggleArrayItem(filters.selectedSkinTypes, type.name),
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
      {!hideBadges && availableBadges.length > 0 && (
        <AccordionItem value="badges" className="border-border/60">
          <AccordionTrigger className="py-2.5 text-xs font-bold text-foreground hover:no-underline">
            <span>Badge / Status ({availableBadges.length})</span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-1 space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
            {availableBadges.map((badge) => {
              const checked = (filters.selectedBadges || []).includes(badge.name);
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
                          selectedBadges: toggleArrayItem(filters.selectedBadges, badge.name),
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
    </>
  );
}
