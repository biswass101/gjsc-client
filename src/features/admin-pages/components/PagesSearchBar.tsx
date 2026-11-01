import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PagesSearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filteredCount: number;
}

export function PagesSearchBar({
  searchQuery,
  setSearchQuery,
  filteredCount,
}: PagesSearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-card p-3 rounded-xl border border-border/70">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search page route, headline, or title..."
          className="pl-9 bg-background/60"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Showing <strong>{filteredCount}</strong> configured pages
      </p>
    </div>
  );
}

