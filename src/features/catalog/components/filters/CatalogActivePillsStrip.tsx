import { Button } from "@/components/ui/button";
import { RotateCcw, X } from "lucide-react";
import type { ActivePill } from "../../hooks/useActiveFilterPills";

interface CatalogActivePillsStripProps {
  activePills: ActivePill[];
  onResetFilters: () => void;
}

export function CatalogActivePillsStrip({
  activePills,
  onResetFilters,
}: CatalogActivePillsStripProps) {
  if (activePills.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 animate-fade-in">
      <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1 mr-1">
        Active Filters ({activePills.length}):
      </span>

      {activePills.map((pill, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-foreground border border-border/70 hover:border-primary/40 transition-colors"
        >
          <span>{pill.label}</span>
          <button
            type="button"
            onClick={pill.onRemove}
            className="text-muted-foreground hover:text-destructive rounded-full cursor-pointer p-0.5"
            title="Remove filter"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={onResetFilters}
        className="text-[11px] h-6 px-2 text-primary hover:text-primary/80 font-semibold gap-1 cursor-pointer"
      >
        <RotateCcw className="h-2.5 w-2.5" />
        <span>Clear All</span>
      </Button>
    </div>
  );
}

