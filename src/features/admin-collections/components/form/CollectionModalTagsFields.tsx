import React from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CollectionModalTagsFieldsProps {
  frequentlySearched: string[];
  newTagInput: string;
  setNewTagInput: (val: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  featured: boolean;
  setFeatured: (val: boolean) => void;
  itemCount: string;
  setItemCount: (val: string) => void;
}

export function CollectionModalTagsFields({
  frequentlySearched,
  newTagInput,
  setNewTagInput,
  onAddTag,
  onRemoveTag,
  featured,
  setFeatured,
  itemCount,
  setItemCount,
}: CollectionModalTagsFieldsProps) {
  return (
    <>
      {/* Associated Search Tags */}
      <div className="space-y-2 rounded-xl border border-border/80 bg-secondary/30 p-3.5">
        <Label className="text-xs font-semibold flex items-center justify-between">
          <span>Frequently Searched Keywords ({frequentlySearched.length})</span>
          <span className="text-[10px] font-normal text-muted-foreground">
            Connects search bar queries to this collection
          </span>
        </Label>

        <div className="flex gap-2">
          <Input
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            placeholder="e.g. Hyaluronic Acid, Glow, Sunscreen..."
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
          {frequentlySearched.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-2.5 py-1 text-xs font-medium text-foreground shadow-2xs"
            >
              <span>#{tag}</span>
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="text-muted-foreground hover:text-rose-600 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Options: Featured & Stock count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div>
            <Label htmlFor="col-feat" className="text-xs font-semibold">
              Featured Collection
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Display in prominent homepage carousels
            </p>
          </div>
          <Switch id="col-feat" checked={featured} onCheckedChange={setFeatured} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="col-count" className="text-xs font-semibold">
            Product Count
          </Label>
          <Input
            id="col-count"
            type="number"
            value={itemCount}
            onChange={(e) => setItemCount(e.target.value)}
            min={0}
          />
        </div>
      </div>
    </>
  );
}
