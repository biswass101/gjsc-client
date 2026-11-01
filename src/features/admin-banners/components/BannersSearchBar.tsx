import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminBanner } from "@/context/admin-context";
import { PAGE_KEYS } from "../constants";

interface BannersSearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedPageFilter: string;
  setSelectedPageFilter: (val: string) => void;
  banners: AdminBanner[];
  filteredCount: number;
}

export function BannersSearchBar({
  searchQuery,
  setSearchQuery,
  selectedPageFilter,
  setSelectedPageFilter,
  banners,
  filteredCount,
}: BannersSearchBarProps) {
  return (
    <div className="flex flex-col gap-3 bg-card p-4 rounded-xl border border-border/70">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search banner headlines, subtitles, or page targets..."
            className="pl-9 bg-background/60"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          Displaying <strong>{filteredCount}</strong> banners
        </span>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1">
        <Button
          variant={selectedPageFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPageFilter("all")}
          className="text-xs shrink-0"
        >
          All Pages ({banners.length})
        </Button>
        {PAGE_KEYS.map((p) => {
          const count = banners.filter((b) => b.pageKey === p.key).length;
          return (
            <Button
              key={p.key}
              variant={selectedPageFilter === p.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPageFilter(p.key)}
              className="text-xs shrink-0"
            >
              {p.label.split("(")[0]?.trim()} ({count})
            </Button>
          );
        })}
      </div>
    </div>
  );
}

