"use client";

import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { CONCERNS, SKIN_TYPES } from "@/lib/catalog";

export interface ProductSkinTypesConcernsProps {
  skinTypes: string[];
  onToggleSkinType: (st: string) => void;
  concerns: string[];
  onToggleConcern: (c: string) => void;
}

export function ProductSkinTypesConcerns({
  skinTypes,
  onToggleSkinType,
  concerns,
  onToggleConcern,
}: ProductSkinTypesConcernsProps) {
  return (
    <>
      {/* Target Skin Types */}
      <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold text-foreground">
            Target Skin Types (Click to Toggle)
          </Label>
          <span className="text-[10px] text-muted-foreground">Select all that apply</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["All Skin Types", ...SKIN_TYPES].map((st) => {
            const isSelected = skinTypes.includes(st);
            return (
              <button
                key={st}
                type="button"
                onClick={() => onToggleSkinType(st)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 border cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {isSelected && <Check className="h-3 w-3" />}
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Skin Concerns */}
      <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold text-foreground">
            Primary Skin Concerns Targeted (Click to Toggle)
          </Label>
          <span className="text-[10px] text-muted-foreground">
            Select relevant dermatological concerns
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CONCERNS.map((c) => {
            const isSelected = concerns.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => onToggleConcern(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 border cursor-pointer ${
                  isSelected
                    ? "bg-accent text-accent-foreground border-accent shadow-xs"
                    : "bg-card text-muted-foreground border-border hover:border-accent/50"
                }`}
              >
                {isSelected && <Check className="h-3 w-3" />}
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
