import { useState, useMemo } from "react";
import { AdminBanner } from "@/context/admin-context";

export function useBannersFilter(banners: AdminBanner[]) {
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBanners = useMemo(() => {
    return banners.filter((b) => {
      const matchesPage = selectedPageFilter === "all" || b.pageKey === selectedPageFilter;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        b.title.toLowerCase().includes(q) ||
        (b.subtitle && b.subtitle.toLowerCase().includes(q)) ||
        b.pageTitle.toLowerCase().includes(q);

      return matchesPage && matchesSearch;
    });
  }, [banners, selectedPageFilter, searchQuery]);

  const activeCount = useMemo(() => banners.filter((b) => b.active).length, [banners]);

  const coveredPagesCount = useMemo(() => new Set(banners.map((b) => b.pageKey)).size, [banners]);

  return {
    selectedPageFilter,
    setSelectedPageFilter,
    searchQuery,
    setSearchQuery,
    filteredBanners,
    activeCount,
    coveredPagesCount,
  };
}
