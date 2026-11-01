import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AdminPreOrder } from "@/types";
import { BATCH_STATUSES } from "../constants";

interface PreOrdersFiltersBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  allPreOrders: AdminPreOrder[];
}

export function PreOrdersFiltersBar({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onSelectStatus,
  allPreOrders,
}: PreOrdersFiltersBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-card p-3 rounded-xl border border-border/70">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search pre-order product, Japanese kanji, brand..."
          className="pl-9 bg-background/60"
        />
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
        <Button
          variant={selectedStatus === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectStatus("all")}
          className="text-xs shrink-0"
        >
          All ({allPreOrders.length})
        </Button>
        {BATCH_STATUSES.map((b) => {
          const count = allPreOrders.filter((p) => p.batchStatus === b.status).length;
          return (
            <Button
              key={b.status}
              variant={selectedStatus === b.status ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectStatus(b.status)}
              className="text-xs shrink-0"
            >
              {b.status} ({count})
            </Button>
          );
        })}
      </div>
    </div>
  );
}

