import { useState, useMemo } from "react";
import type { AdminCategory } from "@/types";

export function useCategoriesFilter(categories: AdminCategory[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParent, setSelectedParent] = useState<string>("all");

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        cat.title.toLowerCase().includes(q) ||
        cat.tagline.toLowerCase().includes(q) ||
        (cat.japaneseTitle && cat.japaneseTitle.toLowerCase().includes(q)) ||
        cat.subcategories.some((s) => s.toLowerCase().includes(q));

      const matchesParent =
        selectedParent === "all" ||
        cat.parentCategory.toLowerCase() === selectedParent.toLowerCase();

      return matchesSearch && matchesParent;
    });
  }, [categories, searchQuery, selectedParent]);

  const totalSubcats = useMemo(
    () => categories.reduce((sum, c) => sum + c.subcategories.length, 0),
    [categories],
  );

  const featuredCount = useMemo(() => categories.filter((c) => c.featured).length, [categories]);

  const avgProductsPerCat = useMemo(
    () =>
      categories.length > 0
        ? Math.round(categories.reduce((s, c) => s + c.itemCount, 0) / categories.length)
        : 0,
    [categories],
  );

  return {
    searchQuery,
    setSearchQuery,
    selectedParent,
    setSelectedParent,
    filteredCategories,
    totalSubcats,
    featuredCount,
    avgProductsPerCat,
  };
}
