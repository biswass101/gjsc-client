import { useState, useMemo } from "react";
import { AdminBrand } from "@/context/admin-context";

export function useBrandsFilter(brands: AdminBrand[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("all");

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        brand.name.toLowerCase().includes(q) ||
        (brand.kanji && brand.kanji.toLowerCase().includes(q)) ||
        brand.tagline.toLowerCase().includes(q) ||
        brand.origin.toLowerCase().includes(q);

      const matchesOrigin =
        selectedOrigin === "all" ||
        brand.origin.toLowerCase().includes(selectedOrigin.toLowerCase());

      return matchesSearch && matchesOrigin;
    });
  }, [brands, searchQuery, selectedOrigin]);

  const featuredCount = useMemo(() => brands.filter((b) => b.featured).length, [brands]);

  const tokyoBrandsCount = useMemo(
    () => brands.filter((b) => b.origin.toLowerCase().includes("tokyo")).length,
    [brands],
  );

  const totalProducts = useMemo(() => brands.reduce((sum, b) => sum + b.itemCount, 0), [brands]);

  return {
    searchQuery,
    setSearchQuery,
    selectedOrigin,
    setSelectedOrigin,
    filteredBrands,
    featuredCount,
    tokyoBrandsCount,
    totalProducts,
  };
}
