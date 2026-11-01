import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CustomersFiltersBarProps {
  q: string;
  onSearchChange: (val: string) => void;
  tierFilter: string;
  onTierChange: (val: string) => void;
  cityFilter: string;
  onCityChange: (val: string) => void;
  sort: string;
  onSortChange: (val: string) => void;
  citiesList: string[];
}

export function CustomersFiltersBar({
  q,
  onSearchChange,
  tierFilter,
  onTierChange,
  cityFilter,
  onCityChange,
  sort,
  onSortChange,
  citiesList,
}: CustomersFiltersBarProps) {
  return (
    <div className="surface-card p-4 space-y-3.5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, email, or mobile number..."
            className="pl-9 h-9 rounded-full text-xs"
          />
          {q && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={tierFilter}
            onChange={(e) => onTierChange(e.target.value)}
            className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
          >
            <option value="All">All Tiers</option>
            <option value="Platinum">Platinum VIP</option>
            <option value="VIP">VIP</option>
            <option value="Standard">Standard</option>
          </select>

          <select
            value={cityFilter}
            onChange={(e) => onCityChange(e.target.value)}
            className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
          >
            {citiesList.map((city) => (
              <option key={city} value={city}>
                {city === "All" ? "All Locations" : city}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs font-semibold"
          >
            <option value="spent_desc">Sort: Highest LTV</option>
            <option value="orders_desc">Sort: Most Orders</option>
            <option value="name_asc">Sort: Name A to Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}

