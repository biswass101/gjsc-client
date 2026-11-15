import React from "react";
import { Search, X, Filter, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminBanner } from "@/context/admin-context";
import { BANNER_PAGE_GROUPS, BANNER_PAGE_OPTIONS } from "../constants";

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
  const selectedOption = BANNER_PAGE_OPTIONS.find((p) => p.key === selectedPageFilter);

  return (
    <div className="flex flex-col gap-3 bg-card p-4 rounded-xl border border-border/70 shadow-xs">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search headline, target page, badge, or collection..."
            className="pl-9 pr-8 bg-background/60"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Grouped Page Target Select Filter */}
        <div className="flex items-center gap-2">
          <div className="w-full sm:w-72">
            <Select
              value={selectedPageFilter}
              onValueChange={(val) => setSelectedPageFilter(val)}
            >
              <SelectTrigger className="bg-background/80 text-xs h-9">
                <div className="flex items-center gap-2 truncate">
                  <Filter className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="truncate">
                    {selectedPageFilter === "all"
                      ? `All Pages (${banners.length} banners)`
                      : `${selectedOption?.label.split("—")[0]?.trim() || selectedPageFilter} (${banners.filter((b) => b.pageKey === selectedPageFilter).length})`}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-80 w-80 text-xs">
                <SelectItem value="all" className="font-semibold text-primary">
                  🌐 All Storefront Pages ({banners.length} Total)
                </SelectItem>
                {BANNER_PAGE_GROUPS.map((group) => {
                  const groupOptions = BANNER_PAGE_OPTIONS.filter((p) => p.group === group);
                  return (
                    <SelectGroup key={group}>
                      <SelectLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/40 py-1 px-2 my-1 rounded">
                        {group}
                      </SelectLabel>
                      {groupOptions.map((opt) => {
                        const count = banners.filter((b) => b.pageKey === opt.key).length;
                        return (
                          <SelectItem key={opt.key} value={opt.key} className="text-xs">
                            <span className="truncate">{opt.label}</span>
                            <span className="ml-1.5 text-[10px] text-muted-foreground">({count})</span>
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {(selectedPageFilter !== "all" || searchQuery) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedPageFilter("all");
                setSearchQuery("");
              }}
              className="text-xs h-9 px-2 text-muted-foreground hover:text-foreground shrink-0"
              title="Reset all filters"
            >
              <X className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
          )}
        </div>

        <span className="text-xs text-muted-foreground whitespace-nowrap self-end lg:self-center">
          Showing <strong>{filteredCount}</strong> of {banners.length} banners
        </span>
      </div>

      {/* Quick Group Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 border-t border-border/40">
        <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1 mr-1 shrink-0">
          <Layers className="h-3 w-3" /> Quick Filter:
        </span>
        <Button
          variant={selectedPageFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPageFilter("all")}
          className="text-xs h-7 shrink-0 px-2.5"
        >
          All ({banners.length})
        </Button>
        <Button
          variant={selectedPageFilter === "home_hero" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPageFilter("home_hero")}
          className="text-xs h-7 shrink-0 px-2.5"
        >
          Home Hero ({banners.filter((b) => b.pageKey === "home_hero").length})
        </Button>
        <Button
          variant={selectedPageFilter === "collections" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPageFilter("collections")}
          className="text-xs h-7 shrink-0 px-2.5"
        >
          Collections Hub ({banners.filter((b) => b.pageKey === "collections").length})
        </Button>
        <Button
          variant={selectedPageFilter === "brands" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPageFilter("brands")}
          className="text-xs h-7 shrink-0 px-2.5"
        >
          Brands Hub ({banners.filter((b) => b.pageKey === "brands").length})
        </Button>
        <Button
          variant={selectedPageFilter === "categories" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPageFilter("categories")}
          className="text-xs h-7 shrink-0 px-2.5"
        >
          Categories Hub ({banners.filter((b) => b.pageKey === "categories").length})
        </Button>
        <Button
          variant={selectedPageFilter === "shop" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPageFilter("shop")}
          className="text-xs h-7 shrink-0 px-2.5"
        >
          Shop All ({banners.filter((b) => b.pageKey === "shop").length})
        </Button>
        <Button
          variant={selectedPageFilter === "offers" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPageFilter("offers")}
          className="text-xs h-7 shrink-0 px-2.5"
        >
          Offers ({banners.filter((b) => b.pageKey === "offers").length})
        </Button>
      </div>
    </div>
  );
}

