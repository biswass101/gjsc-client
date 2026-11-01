"use client";

import { Button } from "@/components/ui/button";

export interface ProductBatchActionsBarProps {
  selectedCount: number;
  onBulkRestock: (qty: number) => void;
  onTagFlashSale: () => void;
  onBulkDelete: () => void;
  onDeselectAll: () => void;
}

export function ProductBatchActionsBar({
  selectedCount,
  onBulkRestock,
  onTagFlashSale,
  onBulkDelete,
  onDeselectAll,
}: ProductBatchActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/40 bg-primary/10 p-3 text-xs animate-rise">
      <div className="flex items-center gap-2">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-[10px]">
          {selectedCount}
        </span>
        <span className="font-semibold text-foreground">Products Selected</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onBulkRestock(25)}
          className="rounded-full text-xs h-7 px-3 bg-card cursor-pointer"
        >
          +25 Restock All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onTagFlashSale}
          className="rounded-full text-xs h-7 px-3 bg-card cursor-pointer"
        >
          Tag Flash Sale
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onBulkDelete}
          className="rounded-full text-xs h-7 px-3 cursor-pointer"
        >
          Delete Selected
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDeselectAll}
          className="rounded-full text-xs h-7 px-2 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          Deselect
        </Button>
      </div>
    </div>
  );
}
