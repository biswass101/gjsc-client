"use client";

import { Check, Plus, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { POPULAR_BENEFITS } from "../../../data/productConstants";

export interface ProductBenefitsEditorProps {
  benefits: string[];
  newBenefitInput: string;
  onNewBenefitInputChange: (val: string) => void;
  onAddBenefit: (val?: string) => void;
  onRemoveBenefit: (val: string) => void;
}

export function ProductBenefitsEditor({
  benefits,
  newBenefitInput,
  onNewBenefitInputChange,
  onAddBenefit,
  onRemoveBenefit,
}: ProductBenefitsEditorProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          Key Dermatological Benefits (PDP Bullet Points)
        </Label>
        <span className="text-[10px] text-muted-foreground">{benefits.length} Bullet Points</span>
      </div>

      {/* Current benefits */}
      <div className="space-y-1.5">
        {benefits.map((ben) => (
          <div
            key={ben}
            className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 text-xs"
          >
            <span className="flex items-center gap-2 text-foreground font-medium">
              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              {ben}
            </span>
            <button
              type="button"
              onClick={() => onRemoveBenefit(ben)}
              className="text-muted-foreground hover:text-rose p-1 transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Input */}
      <div className="flex gap-2">
        <Input
          value={newBenefitInput}
          onChange={(e) => onNewBenefitInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddBenefit();
            }
          }}
          placeholder="Type custom benefit (e.g. 72h Moisture Lock) and press Add..."
          className="h-9 rounded-xl text-xs"
        />
        <Button
          type="button"
          size="sm"
          onClick={() => onAddBenefit()}
          className="rounded-xl text-xs h-9 px-4 shrink-0 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Add
        </Button>
      </div>

      {/* Quick-add popular suggestions */}
      <div>
        <span className="block text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
          Suggested Clinical Benefits:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_BENEFITS.filter((item) => !benefits.includes(item))
            .slice(0, 5)
            .map((ben) => (
              <button
                key={ben}
                type="button"
                onClick={() => onAddBenefit(ben)}
                className="rounded-md border border-border/80 bg-card px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:border-emerald-500/50 transition-colors cursor-pointer"
              >
                + {ben}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
