import React from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryModalSubcatFieldsProps {
  subcategories: string[];
  newSubcatInput: string;
  setNewSubcatInput: (val: string) => void;
  onAddSubcat: () => void;
  onRemoveSubcat: (sub: string) => void;
}

export function CategoryModalSubcatFields({
  subcategories,
  newSubcatInput,
  setNewSubcatInput,
  onAddSubcat,
  onRemoveSubcat,
}: CategoryModalSubcatFieldsProps) {
  return (
    <div className="space-y-2 rounded-xl border border-border/80 bg-secondary/30 p-3.5">
      <Label className="text-xs font-semibold flex items-center justify-between">
        <span>Subcategories Pills ({subcategories.length})</span>
        <span className="text-[10px] font-normal text-muted-foreground">
          Type name and click Add
        </span>
      </Label>

      <div className="flex gap-2">
        <Input
          value={newSubcatInput}
          onChange={(e) => setNewSubcatInput(e.target.value)}
          placeholder="e.g. Foam Cleansers, Oil Cleansers..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddSubcat();
            }
          }}
          className="bg-background text-xs"
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={onAddSubcat}
          className="text-xs shrink-0"
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {subcategories.map((sub, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-2.5 py-1 text-xs font-medium text-foreground shadow-2xs"
          >
            <span>{sub}</span>
            <button
              type="button"
              onClick={() => onRemoveSubcat(sub)}
              className="text-muted-foreground hover:text-rose-600 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {subcategories.length === 0 && (
          <p className="text-xs italic text-muted-foreground">
            No subcategories yet. Add specific filters like &quot;Balm Cleanser&quot;,
            &quot;Foam&quot;, &quot;Gel&quot;.
          </p>
        )}
      </div>
    </div>
  );
}
