import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AdminCategory } from "@/types";
import { PARENT_CATEGORIES } from "../constants";

interface CategoriesFiltersBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedParent: string;
  onSelectParent: (parent: string) => void;
  allCategories: AdminCategory[];
}

export function CategoriesFiltersBar({
  searchQuery,
  onSearchChange,
  selectedParent,
  onSelectParent,
  allCategories,
}: CategoriesFiltersBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-card p-3 rounded-xl border border-border/70">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search categories, Japanese kanji, subcategories..."
          className="pl-9 bg-background/60"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
        <Button
          variant={selectedParent === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectParent("all")}
          className="text-xs shrink-0"
        >
          All Groups ({allCategories.length})
        </Button>
        {PARENT_CATEGORIES.map((group) => {
          const count = allCategories.filter(
            (c) => c.parentCategory.toLowerCase() === group.toLowerCase(),
          ).length;
          return (
            <Button
              key={group}
              variant={selectedParent.toLowerCase() === group.toLowerCase() ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectParent(group)}
              className="text-xs shrink-0"
            >
              {group} ({count})
            </Button>
          );
        })}
      </div>
    </div>
  );
}
