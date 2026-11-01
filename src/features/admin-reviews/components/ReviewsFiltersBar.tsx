import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ReviewsFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  totalReviews: number;
  pendingCount: number;
  approvedCount: number;
  hiddenCount: number;
}

export function ReviewsFiltersBar({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  totalReviews,
  pendingCount,
  approvedCount,
  hiddenCount,
}: ReviewsFiltersBarProps) {
  return (
    <div className="flex flex-col gap-3 bg-card p-4 rounded-xl border border-border/70">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search product, customer name, review contents..."
            className="pl-9 bg-background/60"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Button
            variant={selectedStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("all")}
            className="text-xs shrink-0"
          >
            All ({totalReviews})
          </Button>
          <Button
            variant={selectedStatus === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("pending")}
            className="text-xs shrink-0 text-amber-600 dark:text-amber-400"
          >
            Pending ({pendingCount})
          </Button>
          <Button
            variant={selectedStatus === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("approved")}
            className="text-xs shrink-0"
          >
            Approved ({approvedCount})
          </Button>
          <Button
            variant={selectedStatus === "hidden" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("hidden")}
            className="text-xs shrink-0"
          >
            Hidden ({hiddenCount})
          </Button>
        </div>
      </div>
    </div>
  );
}

