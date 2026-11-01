"use client";

import { LayoutGrid, Search, Table as TableIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { VideoStatusFilter, VideoViewMode } from "../types";

export interface VideoToolbarProps {
  searchQuery: string;
  onSearchQueryChange: (val: string) => void;
  statusFilter: VideoStatusFilter;
  onStatusFilterChange: (val: VideoStatusFilter) => void;
  sortBy: "order" | "views" | "newest";
  onSortByChange: (val: "order" | "views" | "newest") => void;
  viewMode: VideoViewMode;
  onViewModeChange: (val: VideoViewMode) => void;
}

export function VideoToolbar({
  searchQuery,
  onSearchQueryChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
}: VideoToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card/40">
      <div className="flex flex-1 items-center gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search by title, creator, handle, or product..."
            className="pl-8 h-9 text-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchQueryChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Status Filter */}
        <Select
          value={statusFilter}
          onValueChange={(val: VideoStatusFilter) => onStatusFilterChange(val)}
        >
          <SelectTrigger className="h-9 text-xs w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Videos</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="inactive">Hidden / Inactive</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select
          value={sortBy}
          onValueChange={(val: "order" | "views" | "newest") => onSortByChange(val)}
        >
          <SelectTrigger className="h-9 text-xs w-[140px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="order">Carousel Priority</SelectItem>
            <SelectItem value="views">Most Viewed</SelectItem>
            <SelectItem value="newest">Recently Added</SelectItem>
          </SelectContent>
        </Select>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-lg border border-border p-0.5 bg-background">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "p-1.5 rounded-md transition-colors cursor-pointer",
              viewMode === "grid"
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground",
            )}
            title="Reel Card Grid"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={cn(
              "p-1.5 rounded-md transition-colors cursor-pointer",
              viewMode === "table"
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground",
            )}
            title="Table View"
          >
            <TableIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
