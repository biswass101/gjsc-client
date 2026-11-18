import React from "react";
import { Plus, X, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryModalSubcatFieldsProps {
  subcategories: string[];
  newSubcatInput: string;
  setNewSubcatInput: (val: string) => void;
  onAddSubcat: () => void;
  onRemoveSubcat: (sub: string) => void;
  popularTags?: string[];
  newTagInput?: string;
  setNewTagInput?: (val: string) => void;
  onAddTag?: () => void;
  onRemoveTag?: (tag: string) => void;
}

export function CategoryModalSubcatFields({
  subcategories,
  newSubcatInput,
  setNewSubcatInput,
  onAddSubcat,
  onRemoveSubcat,
  popularTags = [],
  newTagInput = "",
  setNewTagInput,
  onAddTag,
  onRemoveTag,
}: CategoryModalSubcatFieldsProps) {
  return (
    <div className="space-y-4">
      {/* 1. Subcategories Section */}
      <div className="space-y-2 rounded-xl border border-border/80 bg-secondary/30 p-3.5">
        <Label className="text-xs font-semibold flex items-center justify-between">
          <span>Subcategories Filter Pills ({subcategories.length})</span>
          <span className="text-[10px] font-normal text-muted-foreground">
            Type name and press Add
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
              No subcategories yet. Add specific formula types like &quot;Balm Cleanser&quot;,
              &quot;Foam&quot;, &quot;Gel&quot;.
            </p>
          )}
        </div>
      </div>

      {/* 2. Popular Tags Section */}
      {setNewTagInput && onAddTag && onRemoveTag && (
        <div className="space-y-2 rounded-xl border border-border/80 bg-secondary/20 p-3.5">
          <Label className="text-xs font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Tag className="h-3 w-3 text-primary" />
              Popular Search Tags & Highlights ({popularTags.length})
            </span>
            <span className="text-[10px] font-normal text-muted-foreground">
              Shown on Directory Cards
            </span>
          </Label>

          <div className="flex gap-2">
            <Input
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              placeholder="e.g. Low-pH, Double Cleanse, Rice Ferment..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddTag();
                }
              }}
              className="bg-background text-xs"
            />
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={onAddTag}
              className="text-xs shrink-0"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {popularTags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-medium text-primary shadow-2xs"
              >
                <span>#{tag}</span>
                <button
                  type="button"
                  onClick={() => onRemoveTag(tag)}
                  className="text-primary/70 hover:text-rose-600 transition-colors"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            ))}
            {popularTags.length === 0 && (
              <p className="text-xs italic text-muted-foreground">
                No popular tags configured. E.g. &quot;Niacinamide&quot;, &quot;Vitamin C&quot;.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
