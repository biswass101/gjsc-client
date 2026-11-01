import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/catalog";

export function usePreOrderProducts() {
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("popular");

  // Select all pre-order products + premium prestige Japanese imports
  const preOrderProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) =>
        p.type === "pre-order-japan" ||
        p.price >= 8000 ||
        p.brand === "SK-II" ||
        p.brand === "Shiseido" ||
        p.badge === "Best Seller",
    );
  }, []);

  // Unique brands
  const brands = useMemo(() => {
    const list = new Set<string>();
    preOrderProducts.forEach((p) => list.add(p.brand));
    return ["All", ...Array.from(list)];
  }, [preOrderProducts]);

  // Unique categories
  const categories = useMemo(() => {
    const list = new Set<string>();
    preOrderProducts.forEach((p) => list.add(p.category));
    return ["All", ...Array.from(list)];
  }, [preOrderProducts]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return preOrderProducts.filter((product) => {
      if (selectedBrand !== "All" && product.brand !== selectedBrand) return false;
      if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
      return true;
    });
  }, [preOrderProducts, selectedBrand, selectedCategory]);

  // Sorted products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price_asc":
        return list.sort((a, b) => a.price - b.price);
      case "price_desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case "popular":
      default:
        return list.sort((a, b) => b.reviews - a.reviews);
    }
  }, [filteredProducts, sortBy]);

  return {
    selectedBrand,
    setSelectedBrand,
    selectedCategory,
    setSelectedCategory,
    view,
    setView,
    sortBy,
    setSortBy,
    brands,
    categories,
    sortedProducts,
  };
}

