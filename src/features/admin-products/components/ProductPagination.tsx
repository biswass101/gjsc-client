"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGE_SIZE_OPTIONS } from "../data/productConstants";

export interface ProductPaginationProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  filteredCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export function ProductPagination({
  pageSize,
  onPageSizeChange,
  filteredCount,
  totalCount,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: ProductPaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/70 p-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <span>Showing</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-md border border-border/80 bg-background px-2 py-0.5 text-xs text-foreground"
        >
          {PAGE_SIZE_OPTIONS.map((sz) => (
            <option key={sz} value={sz}>
              {sz}
            </option>
          ))}
        </select>
        <span>
          of {filteredCount} filtered products ({totalCount} total)
        </span>
      </div>

      <div className="flex items-center gap-1.5 self-end sm:self-auto">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={onPrevPage}
          className="h-7 w-7 p-0 rounded-md cursor-pointer"
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
          onClick={onNextPage}
          className="h-7 w-7 p-0 rounded-md cursor-pointer"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
