import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminBrand } from "@/context/admin-context";

interface BrandsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedOrigin: string;
  setSelectedOrigin: (val: string) => void;
  brands: AdminBrand[];
}

export function BrandsSearchBar({
  searchQuery,
  setSearchQuery,
  selectedOrigin,
  setSelectedOrigin,
  brands,
}: BrandsSearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-card p-3 rounded-xl border border-border/70">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search brand name, kanji, origin city..."
          className="pl-9 bg-background/60"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
        <Button
          variant={selectedOrigin === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedOrigin("all")}
          className="text-xs shrink-0"
        >
          All Origins ({brands.length})
        </Button>
        {["Tokyo", "Osaka", "Kyoto"].map((city) => {
          const count = brands.filter((b) =>
            b.origin.toLowerCase().includes(city.toLowerCase()),
          ).length;
          return (
            <Button
              key={city}
              variant={selectedOrigin.toLowerCase() === city.toLowerCase() ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOrigin(city)}
              className="text-xs shrink-0"
            >
              {city} ({count})
            </Button>
          );
        })}
      </div>
    </div>
  );
}
