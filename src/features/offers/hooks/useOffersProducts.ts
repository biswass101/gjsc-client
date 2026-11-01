import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/catalog";
import type { Product } from "@/types";

export function useOffersProducts() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDealType, setSelectedDealType] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("discount");

  // Extract all discounted products (compareAt > price or badge === "Flash Sale")
  const offerProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => (p.compareAt && p.compareAt > p.price) || p.badge === "Flash Sale",
    );
  }, []);

  // Available categories with discounts
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    offerProducts.forEach((p) => cats.add(p.category));
    return ["All", ...Array.from(cats)];
  }, [offerProducts]);

  // Filter products by selected category and deal type
  const filteredProducts = useMemo(() => {
    return offerProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      // Deal type filter
      if (selectedDealType === "flash" && product.badge !== "Flash Sale") {
        return false;
      }
      if (selectedDealType === "under2000" && product.price >= 2000) {
        return false;
      }
      if (selectedDealType === "under4000" && product.price >= 4000) {
        return false;
      }
      if (selectedDealType === "bigsavings") {
        const off = product.compareAt ? product.compareAt - product.price : 0;
        if (off < 500) return false;
      }

      return true;
    });
  }, [offerProducts, selectedCategory, selectedDealType]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price_asc":
        return list.sort((a, b) => a.price - b.price);
      case "price_desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case "discount":
      default:
        return list.sort((a, b) => {
          const discountA = a.compareAt ? (a.compareAt - a.price) / a.compareAt : 0;
          const discountB = b.compareAt ? (b.compareAt - b.price) / b.compareAt : 0;
          return discountB - discountA;
        });
    }
  }, [filteredProducts, sortBy]);

  return {
    selectedCategory,
    setSelectedCategory,
    selectedDealType,
    setSelectedDealType,
    view,
    setView,
    sortBy,
    setSortBy,
    offerProducts,
    availableCategories,
    filteredProducts,
    sortedProducts,
  };
}

