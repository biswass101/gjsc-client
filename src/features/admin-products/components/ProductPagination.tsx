"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAGE_SIZE_OPTIONS, DEFAULT_PAGE_SIZE } from "../data/productConstants";

export interface ProductPaginationProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  filteredCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

function getPageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
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
  onPageChange,
  isLoading = false,
}: ProductPaginationProps) {
  const [isCustomLimit, setIsCustomLimit] = useState(false);
  const [customLimitInput, setCustomLimitInput] = useState(String(pageSize));
  const [jumpPageInput, setJumpPageInput] = useState("");

  const startRecord = filteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, filteredCount);

  const handlePageSelect = (p: number) => {
    if (onPageChange) {
      onPageChange(p);
    } else {
      if (p > currentPage) onNextPage();
      else if (p < currentPage) onPrevPage();
    }
  };

  const handleApplyCustomLimit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = parseInt(customLimitInput, 10);
    if (!isNaN(val) && val > 0 && val <= 250) {
      onPageSizeChange(val);
      setIsCustomLimit(false);
    }
  };

  const handleJumpPage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const p = parseInt(jumpPageInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      handlePageSelect(p);
      setJumpPageInput("");
    }
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-t border-border/70 p-4 text-xs text-muted-foreground bg-card/40">
      {/* Left: Limit Selection & Live Record Telemetry */}
      <div className="flex items-center flex-wrap gap-2.5">
        <span className="font-medium text-foreground">Showing</span>

        {isCustomLimit ? (
          <form onSubmit={handleApplyCustomLimit} className="flex items-center gap-1.5">
            <Input
              type="number"
              min={1}
              max={250}
              value={customLimitInput}
              onChange={(e) => setCustomLimitInput(e.target.value)}
              className="h-7 w-16 text-xs text-center font-mono rounded-md"
              autoFocus
            />
            <Button
              type="submit"
              size="sm"
              variant="secondary"
              className="h-7 px-2 text-[11px] font-semibold"
            >
              Set
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setIsCustomLimit(false)}
              className="h-7 px-1.5 text-[11px]"
            >
              Cancel
            </Button>
          </form>
        ) : (
          <div className="flex items-center gap-1.5">
            <select
              value={PAGE_SIZE_OPTIONS.includes(pageSize) ? pageSize : "custom"}
              onChange={(e) => {
                if (e.target.value === "custom") {
                  setIsCustomLimit(true);
                } else {
                  onPageSizeChange(Number(e.target.value));
                }
              }}
              className="h-7 rounded-md border border-border/80 bg-background px-2.5 text-xs text-foreground font-medium cursor-pointer"
            >
              {PAGE_SIZE_OPTIONS.map((sz) => (
                <option key={sz} value={sz}>
                  {sz} per page {sz === DEFAULT_PAGE_SIZE ? "(Default)" : ""}
                </option>
              ))}
              <option value="custom">Custom Limit...</option>
            </select>

            <button
              type="button"
              onClick={() => setIsCustomLimit(true)}
              className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-secondary transition-colors"
              title="Set custom page limit"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <span>
          <strong className="text-foreground font-mono font-semibold">
            {startRecord}–{endRecord}
          </strong>{" "}
          of <strong className="text-foreground font-mono">{filteredCount}</strong> filtered products
          {totalCount !== filteredCount && (
            <span className="text-muted-foreground/75 font-normal"> ({totalCount} total in catalog)</span>
          )}
        </span>

        {isLoading && (
          <div className="flex items-center gap-1 text-[11px] text-primary font-mono ml-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Fetching...</span>
          </div>
        )}
      </div>

      {/* Right: Customizable Pagination Controls with Page Numbers */}
      <div className="flex items-center flex-wrap gap-1.5 self-end lg:self-auto">
        {/* First Page Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1 || isLoading}
          onClick={() => handlePageSelect(1)}
          className="h-7 w-7 p-0 rounded-md cursor-pointer"
          title="First page"
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </Button>

        {/* Previous Page Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1 || isLoading}
          onClick={onPrevPage}
          className="h-7 w-7 p-0 rounded-md cursor-pointer"
          title="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((p, idx) => {
            if (p === "...") {
              return (
                <span key={`dots-${idx}`} className="px-1 text-muted-foreground select-none">
                  …
                </span>
              );
            }
            const pageNum = Number(p);
            const isActive = pageNum === currentPage;
            return (
              <Button
                key={`page-${pageNum}`}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageSelect(pageNum)}
                disabled={isLoading}
                className={`h-7 min-w-7 px-2 text-xs font-mono font-semibold cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages || isLoading}
          onClick={onNextPage}
          className="h-7 w-7 p-0 rounded-md cursor-pointer"
          title="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>

        {/* Last Page Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages || isLoading}
          onClick={() => handlePageSelect(totalPages)}
          className="h-7 w-7 p-0 rounded-md cursor-pointer"
          title="Last page"
        >
          <ChevronsRight className="h-3.5 w-3.5" />
        </Button>

        {/* Jump to Page Input */}
        {totalPages > 3 && (
          <form onSubmit={handleJumpPage} className="flex items-center gap-1 ml-1.5 pl-1.5 border-l border-border/60">
            <span className="text-[11px] text-muted-foreground">Go:</span>
            <Input
              type="number"
              min={1}
              max={totalPages}
              placeholder={String(currentPage)}
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              className="h-7 w-12 text-xs text-center font-mono rounded-md p-1"
            />
          </form>
        )}
      </div>
    </div>
  );
}
