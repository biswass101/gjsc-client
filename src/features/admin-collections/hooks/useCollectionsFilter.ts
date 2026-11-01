import { useState, useMemo } from "react";
import type { AdminCollection } from "@/types";

export function useCollectionsFilter(collections: AdminCollection[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCollections = useMemo(() => {
    return collections.filter((col) => {
      const q = searchQuery.toLowerCase();
      return (
        col.title.toLowerCase().includes(q) ||
        col.tagline.toLowerCase().includes(q) ||
        (col.japaneseTitle && col.japaneseTitle.toLowerCase().includes(q)) ||
        col.frequentlySearched.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [collections, searchQuery]);

  const featuredCount = useMemo(() => collections.filter((c) => c.featured).length, [collections]);

  const totalKeywords = useMemo(
    () => collections.reduce((sum, c) => sum + c.frequentlySearched.length, 0),
    [collections],
  );

  const totalBundledSkus = useMemo(
    () => collections.reduce((sum, c) => sum + c.itemCount, 0),
    [collections],
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredCollections,
    featuredCount,
    totalKeywords,
    totalBundledSkus,
  };
}
