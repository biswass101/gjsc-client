"use client";

import { Plus, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { POPULAR_INGREDIENTS } from "../../../data/productConstants";

export interface ProductIngredientsEditorProps {
  ingredients: string[];
  newIngredientInput: string;
  onNewIngredientInputChange: (val: string) => void;
  onAddIngredient: (val?: string) => void;
  onRemoveIngredient: (val: string) => void;
}

export function ProductIngredientsEditor({
  ingredients,
  newIngredientInput,
  onNewIngredientInputChange,
  onAddIngredient,
  onRemoveIngredient,
}: ProductIngredientsEditorProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Key Japanese Active Botanicals & Bio-Ferments
        </Label>
        <span className="text-[10px] text-muted-foreground">
          {ingredients.length} Active Actives
        </span>
      </div>

      {/* Active tags */}
      <div className="flex flex-wrap gap-2 min-h-8">
        {ingredients.map((ing) => (
          <span
            key={ing}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-foreground"
          >
            {ing}
            <button
              type="button"
              onClick={() => onRemoveIngredient(ing)}
              className="h-3.5 w-3.5 rounded-full hover:bg-rose hover:text-white inline-flex items-center justify-center text-muted-foreground transition-colors cursor-pointer"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </span>
        ))}
      </div>

      {/* Add Input */}
      <div className="flex gap-2">
        <Input
          value={newIngredientInput}
          onChange={(e) => onNewIngredientInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddIngredient();
            }
          }}
          placeholder="Type custom active ingredient (e.g. Fermented Sake Lees) and press Add..."
          className="h-9 rounded-xl text-xs"
        />
        <Button
          type="button"
          size="sm"
          onClick={() => onAddIngredient()}
          className="rounded-xl text-xs h-9 px-4 shrink-0 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Add
        </Button>
      </div>

      {/* Quick-add popular suggestions */}
      <div>
        <span className="block text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
          Quick Add Authentic J-Beauty Actives:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_INGREDIENTS.filter((item) => !ingredients.includes(item))
            .slice(0, 8)
            .map((rec) => (
              <button
                key={rec}
                type="button"
                onClick={() => onAddIngredient(rec)}
                className="rounded-md border border-border/80 bg-card px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
              >
                + {rec}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
