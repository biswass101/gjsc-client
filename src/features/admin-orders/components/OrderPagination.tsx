"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderPaginationProps {
  pagedCount: number;
  totalFilteredCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export function OrderPagination({
  pagedCount,
  totalFilteredCount,
  currentPage,
  totalPages,
  onPageChange,
}: OrderPaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/70 p-4 text-xs text-muted-foreground">
      <span>
        Showing {pagedCount} of {totalFilteredCount} filtered parcels
      </span>

      <div className="flex items-center gap-1.5 self-end sm:self-auto">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="h-7 w-7 p-0 rounded-md"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>

        <span className="px-2 font-medium text-foreground">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="h-7 w-7 p-0 rounded-md"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

