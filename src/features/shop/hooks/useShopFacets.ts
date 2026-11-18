import { useMemo } from "react";
import { PRODUCTS, adminProductToStorefront } from "@/lib/catalog";
import { useAdmin } from "@/context/admin-context";
import type { Product } from "@/types";

export function useShopFacets(customProducts?: Product[]) {
  const { products: adminProducts } = useAdmin();

  const targetProducts = useMemo(() => {
    if (customProducts && customProducts.length > 0) return customProducts;
    if (adminProducts && adminProducts.length > 0) {
      return adminProducts.map(adminProductToStorefront);
    }
    return PRODUCTS;
  }, [customProducts, adminProducts]);

  const priceBounds = useMemo(() => {
    if (targetProducts.length === 0) return { min: 0, max: 15000 };
    const prices = targetProducts.map((p) => p.price);
    const min = Math.floor(Math.min(...prices) / 100) * 100;
    const max = Math.ceil(Math.max(...prices) / 100) * 100;
    return { min: Math.max(0, min), max: Math.max(min + 1000, max) };
  }, [targetProducts]);

  const availableCategories = useMemo(() => {
    const counts = new Map<string, number>();
    targetProducts.forEach((p) => {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [targetProducts]);

  const availableBrands = useMemo(() => {
    const counts = new Map<string, number>();
    targetProducts.forEach((p) => {
      counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [targetProducts]);

  const availableConcerns = useMemo(() => {
    const counts = new Map<string, number>();
    targetProducts.forEach((p) => {
      p.concerns?.forEach((c) => {
        counts.set(c, (counts.get(c) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [targetProducts]);

  const availableSkinTypes = useMemo(() => {
    const counts = new Map<string, number>();
    targetProducts.forEach((p) => {
      p.skinTypes?.forEach((st) => {
        counts.set(st, (counts.get(st) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [targetProducts]);

  const availableBadges = useMemo(() => {
    const counts = new Map<string, number>();
    targetProducts.forEach((p) => {
      if (p.badge) {
        counts.set(p.badge, (counts.get(p.badge) ?? 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [targetProducts]);

  return {
    priceBounds,
    availableCategories,
    availableBrands,
    availableConcerns,
    availableSkinTypes,
    availableBadges,
  };
}

