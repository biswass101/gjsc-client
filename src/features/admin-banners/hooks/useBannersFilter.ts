import { useState, useMemo } from "react";
import { AdminBanner } from "@/context/admin-context";

export function useBannersFilter(banners: AdminBanner[]) {
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBanners = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return banners.filter((b) => {
      const matchesPage = selectedPageFilter === "all" || b.pageKey === selectedPageFilter;

      if (!q) return matchesPage;

      const pageKeyReadable = b.pageKey.replace(/_/g, " ").toLowerCase();
      const pageKeyHyphenated = b.pageKey.replace(/_/g, "-").toLowerCase();

      const matchesSearch =
        (b.title && b.title.toLowerCase().includes(q)) ||
        (b.subtitle && b.subtitle.toLowerCase().includes(q)) ||
        (b.pageTitle && b.pageTitle.toLowerCase().includes(q)) ||
        (b.pageKey && b.pageKey.toLowerCase().includes(q)) ||
        pageKeyReadable.includes(q) ||
        pageKeyHyphenated.includes(q) ||
        (b.badge && b.badge.toLowerCase().includes(q)) ||
        (b.ctaText && b.ctaText.toLowerCase().includes(q)) ||
        (b.ctaLink && b.ctaLink.toLowerCase().includes(q));

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
