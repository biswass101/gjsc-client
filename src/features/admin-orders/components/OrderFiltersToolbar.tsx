"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { COURIER_OPTIONS } from "../data/orderConstants";
import type { OrderSortOption } from "../types";

interface OrderFiltersToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  methodFilter: string;
  onMethodChange: (m: string) => void;
  courierFilter: string;
  onCourierChange: (c: string) => void;
  sort: OrderSortOption;
  onSortChange: (s: OrderSortOption) => void;
}

export function OrderFiltersToolbar({
  searchQuery,
  onSearchChange,
  methodFilter,
  onMethodChange,
  courierFilter,
  onCourierChange,
  sort,
  onSortChange,
}: OrderFiltersToolbarProps) {
  return (
    <div className="surface-card p-4 space-y-3.5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Query input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by order ID, customer name, phone, or courier..."
            className="pl-9 h-9 rounded-full text-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Payment & Courier Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={methodFilter}
            onChange={(e) => onMethodChange(e.target.value)}
            className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
          >
            <option value="All">All Payment Methods</option>
            <option value="bKash">bKash</option>
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="Card">Card</option>
          </select>

          <select
            value={courierFilter}
            onChange={(e) => onCourierChange(e.target.value)}
            className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
          >
            <option value="All">All Couriers</option>
            {COURIER_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as OrderSortOption)}
            className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs font-semibold"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="total_desc">Total: High to Low</option>
            <option value="total_asc">Total: Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
}

