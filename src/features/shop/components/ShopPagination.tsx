import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ShopPaginationProps {
  safePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ShopPagination({ safePage, totalPages, onPageChange }: ShopPaginationProps) {
  const pageNumbers = useMemo(() => {
    const nums: number[] = [];
    const start = Math.max(1, safePage - 2);
    const end = Math.min(totalPages, safePage + 2);
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
  }, [safePage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex flex-col items-center gap-3">
      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, safePage - 1))}
          disabled={safePage === 1}
          className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-secondary disabled:opacity-30 cursor-pointer shadow-2xs"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pageNumbers[0]! > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="grid h-9 min-w-9 sm:h-10 sm:min-w-10 place-items-center rounded-full border border-border bg-card px-2 text-xs sm:text-sm transition-colors hover:bg-secondary cursor-pointer shadow-2xs"
            >
              1
            </button>
            {pageNumbers[0]! > 2 && <span className="text-muted-foreground px-1">…</span>}
          </>
        )}

        {pageNumbers.map((n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`grid h-9 min-w-9 sm:h-10 sm:min-w-10 place-items-center rounded-full border px-2 text-xs sm:text-sm transition-colors font-medium cursor-pointer shadow-2xs ${
              n === safePage
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card hover:bg-secondary"
            }`}
          >
            {n}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1]! < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1]! < totalPages - 1 && (
              <span className="text-muted-foreground px-1">…</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="grid h-9 min-w-9 sm:h-10 sm:min-w-10 place-items-center rounded-full border border-border bg-card px-2 text-xs sm:text-sm transition-colors hover:bg-secondary cursor-pointer shadow-2xs"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
          disabled={safePage === totalPages}
          className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-secondary disabled:opacity-30 cursor-pointer shadow-2xs"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground font-medium">
        Page {safePage} of {totalPages}
      </p>
    </div>
  );
}

