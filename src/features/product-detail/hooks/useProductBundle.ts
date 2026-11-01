"use client";

import { useState, useMemo, useEffect } from "react";
import { PRODUCTS } from "@/lib/catalog";
import type { Product } from "@/types";

export function useProductBundle(product: Product) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes?.[0] ?? "50ml");

  useEffect(() => {
    setQty(1);
    setSize(product.sizes?.[0] ?? "50ml");
  }, [product.slug, product.sizes]);

  const discountPct = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;
  const savingsAmount = product.compareAt ? product.compareAt - product.price : 0;

  // Complementary product for "Complete the Ritual" bundle
  const companionProduct = useMemo(() => {
    const fromSameBrand = PRODUCTS.find(
      (p) => p.brand === product.brand && p.slug !== product.slug,
    );
    if (fromSameBrand) return fromSameBrand;
    const fromCategory = PRODUCTS.find(
      (p) => p.category !== product.category && p.slug !== product.slug,
    );
    return fromCategory || PRODUCTS.find((p) => p.slug !== product.slug);
  }, [product]);

  // Bundle calculations (with extra 5% bundled discount)
  const bundleBaseTotal = product.price + (companionProduct ? companionProduct.price : 0);
  const bundleDiscountedTotal = Math.round(bundleBaseTotal * 0.95);
  const bundleSavings = bundleBaseTotal - bundleDiscountedTotal;

  return {
    qty,
    setQty,
    size,
    setSize,
    discountPct,
    savingsAmount,
    companionProduct,
    bundleBaseTotal,
    bundleDiscountedTotal,
    bundleSavings,
  };
}
