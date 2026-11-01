import { useState, useCallback } from "react";
import type { AdminProduct } from "@/types";
import { generateInitialProducts } from "../admin-seed";
import type { AddActivityLogFn } from "./types";

export function useProductSlice(addActivityLog: AddActivityLogFn) {
  const [products, setProducts] = useState<AdminProduct[]>(generateInitialProducts);

  const addProduct = useCallback(
    (input: Omit<AdminProduct, "id" | "slug" | "createdAt" | "salesCount">): AdminProduct => {
      const id = `prod-${Date.now()}`;
      const slug = input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const newProduct: AdminProduct = {
        ...input,
        id,
        slug,
        createdAt: new Date().toISOString().slice(0, 10),
        salesCount: 0,
      };
      setProducts((prev) => [newProduct, ...prev]);
      addActivityLog(
        "Created Product",
        newProduct.name,
        `Initial stock: ${newProduct.stock}, Price: ৳${newProduct.price}`,
      );
      return newProduct;
    },
    [addActivityLog],
  );

  const updateProduct = useCallback(
    (id: string, updates: Partial<AdminProduct>) => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            const updated = { ...p, ...updates };
            addActivityLog("Updated Product", p.name, `Fields: ${Object.keys(updates).join(", ")}`);
            return updated;
          }
          return p;
        }),
      );
    },
    [addActivityLog],
  );

  const deleteProduct = useCallback(
    (id: string) => {
      setProducts((prev) => {
        const found = prev.find((p) => p.id === id);
        if (found) addActivityLog("Deleted Product", found.name, `SKU: ${found.sku}`);
        return prev.filter((p) => p.id !== id);
      });
    },
    [addActivityLog],
  );

  const duplicateProduct = useCallback(
    (id: string): AdminProduct => {
      const found = products.find((p) => p.id === id);
      const newId = `prod-${Date.now()}`;
      const clone: AdminProduct = found
        ? {
            ...found,
            id: newId,
            name: `${found.name} (Copy)`,
            slug: `${found.slug}-copy-${Date.now().toString().slice(-4)}`,
            sku: `${found.sku}-CPY`,
            createdAt: new Date().toISOString().slice(0, 10),
            salesCount: 0,
          }
        : {
            id: newId,
            slug: `new-product-${newId}`,
            name: "New Cloned Product",
            brand: "Shiseido",
            category: "Serum",
            price: 2500,
            costPrice: 1500,
            stock: 20,
            lowStockThreshold: 5,
            sku: `GEN-${Date.now().toString().slice(-4)}`,
            status: "draft",
            rating: 5,
            reviewsCount: 0,
            image:
              "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
            images: [
              "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
            ],
            short: "Japanese skincare formulation.",
            description: "Authentic imported formula.",
            ingredients: ["Sakura Extract", "Rice Ferment Filtrate", "Hyaluronic Acid"],
            benefits: ["Deep 72-hour hydration", "Moisture barrier repair"],
            howTo: "Apply daily.",
            skinTypes: ["All Skin Types"],
            concerns: ["Hydration"],
            sizes: ["50ml"],
            productType: "in-stock",
            origin: "Tokyo, Japan",
            texture: "Lightweight Essence",
            pao: "12M",
            createdAt: new Date().toISOString().slice(0, 10),
            salesCount: 0,
          };
      setProducts((prev) => [clone, ...prev]);
      addActivityLog("Duplicated Product", clone.name);
      return clone;
    },
    [products, addActivityLog],
  );

  const bulkUpdateProducts = useCallback(
    (ids: string[], updates: Partial<AdminProduct>) => {
      setProducts((prev) => prev.map((p) => (ids.includes(p.id) ? { ...p, ...updates } : p)));
      addActivityLog("Bulk Updated Products", `${ids.length} products updated`);
    },
    [addActivityLog],
  );

  const bulkDeleteProducts = useCallback(
    (ids: string[]) => {
      setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
      addActivityLog("Bulk Deleted Products", `${ids.length} products removed`);
    },
    [addActivityLog],
  );

  const adjustStock = useCallback((id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStock = Math.max(0, p.stock + delta);
          return { ...p, stock: nextStock };
        }
        return p;
      }),
    );
  }, []);

  const resetProducts = useCallback(() => {
    setProducts(generateInitialProducts());
  }, []);

  return {
    products,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    bulkUpdateProducts,
    bulkDeleteProducts,
    adjustStock,
    resetProducts,
  };
}
