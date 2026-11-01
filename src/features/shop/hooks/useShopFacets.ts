import { useMemo } from "react";
import { PRODUCTS } from "@/lib/catalog";

export function useShopFacets() {
  const priceBounds = useMemo(() => {
    const prices = PRODUCTS.map((p) => p.price);
    const min = Math.floor(Math.min(...prices) / 100) * 100;
    const max = Math.ceil(Math.max(...prices) / 100) * 100;
    return { min: Math.max(0, min), max: Math.max(min + 1000, max) };
  }, []);

  const availableCategories = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.forEach((p) => {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const availableBrands = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.forEach((p) => {
      counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const availableConcerns = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.forEach((p) => {
      p.concerns?.forEach((c) => {
        counts.set(c, (counts.get(c) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const availableSkinTypes = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.forEach((p) => {
      p.skinTypes?.forEach((st) => {
        counts.set(st, (counts.get(st) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const availableBadges = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.forEach((p) => {
      if (p.badge) {
        counts.set(p.badge, (counts.get(p.badge) ?? 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return {
    priceBounds,
    availableCategories,
    availableBrands,
    availableConcerns,
    availableSkinTypes,
    availableBadges,
  };
}

