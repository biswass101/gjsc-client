import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminFaq } from "@/context/admin-context";
import { FAQ_CATEGORIES } from "../constants";

interface FaqsFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  faqs: AdminFaq[];
}

export function FaqsFiltersBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  faqs,
}: FaqsFiltersBarProps) {
  return (
    <div className="flex flex-col gap-3 bg-card p-4 rounded-xl border border-border/70">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search question or answer keywords..."
            className="pl-9 bg-background/60"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="text-xs shrink-0"
          >
            All ({faqs.length})
          </Button>
          {FAQ_CATEGORIES.map((cat) => {
            const count = faqs.filter((f) => f.category === cat).length;
            return (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="text-xs shrink-0"
              >
                {cat} ({count})
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

