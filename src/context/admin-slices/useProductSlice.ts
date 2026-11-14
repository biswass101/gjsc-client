import { useState, useCallback, useEffect } from "react";
import type { AdminProduct } from "@/types";
import { generateInitialProducts } from "../admin-seed";
import type { AddActivityLogFn } from "./types";
import { adminApi } from "@/lib/api";

function toSafeArray(val: any, fallback: string[] = []): string[] {
  if (Array.isArray(val)) return val.map(String);
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (!trimmed) return fallback;
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.map(String);
      if (typeof parsed === "string" && parsed.trim()) return [parsed.trim()];
    } catch {
      if (trimmed.includes(",")) {
        return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
      }
      return [trimmed];
    }
  }
  return fallback;
}

export function formatApiProduct(p: any): AdminProduct {
  return {
    id: String(p.id),
    slug: p.slug,
    name: p.name,
    japaneseName: p.japaneseName || undefined,
    brand: p.brandName || p.brand?.name || p.brand || "Authentic Japan",
    category: p.categoryName || p.category?.name || p.category || "Skincare",
    price: Number(p.price || 0),
    costPrice: Number(p.costPrice || p.price * 0.58 || 1200),
    compareAt: p.compareAt ? Number(p.compareAt) : undefined,
    stock: Number(p.stock || 0),
    lowStockThreshold: typeof p.lowStockThreshold === "number" ? p.lowStockThreshold : 5,
    sku: p.sku || `GJ-${p.slug?.slice(0, 4).toUpperCase()}`,
    image: p.image || "",
    images: toSafeArray(p.images, [p.image || ""]),
    rating: Number(p.rating || 5),
    reviewsCount: Number(p.reviewsCount || 0),
    salesCount: Number(p.salesCount || 0),
    badge: p.badge || undefined,
    short: p.short || "",
    description: p.description || "",
    sizes: toSafeArray(p.sizes, ["Standard"]),
    skinTypes: toSafeArray(p.skinTypes, []),
    concerns: toSafeArray(p.concerns, []),
    ingredients: toSafeArray(p.ingredients, []),
    benefits: toSafeArray(p.benefits, []),
    howTo: p.howTo || "",
    origin: p.origin || "Tokyo, Japan",
    productType: p.productType || "in-stock",
    texture: p.texture || "Silky Essence / Milk",
    pao: p.pao || "12M",
    status: p.status === "archived" || p.status === "draft" ? p.status : "active",
    createdAt: p.createdAt ? String(p.createdAt).slice(0, 10) : new Date().toISOString().slice(0, 10),
  };
}

export function useProductSlice(addActivityLog: AddActivityLogFn) {
  const [products, setProducts] = useState<AdminProduct[]>(generateInitialProducts);

  useEffect(() => {
    adminApi
      .getProducts({ limit: 25 })
      .then((res) => {
        if (res && Array.isArray(res.products)) {
          const formatted: AdminProduct[] = res.products.map(formatApiProduct);
          setProducts(formatted);
        }
      })
      .catch(() => {});
  }, []);

  const addProduct = useCallback(
    async (
      input: Omit<AdminProduct, "id" | "slug" | "createdAt" | "salesCount">,
    ): Promise<AdminProduct> => {
      const tempId = `prod-${Date.now()}`;
      const tempSlug = input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const optimisticProduct: AdminProduct = {
        ...input,
        id: tempId,
        slug: tempSlug,
        createdAt: new Date().toISOString().slice(0, 10),
        salesCount: 0,
      };

      try {
        const payload: Record<string, any> = {
          name: input.name,
          japaneseName: input.japaneseName || null,
          brand: input.brand,
          brandName: input.brand,
          category: input.category,
          categoryName: input.category,
          productType: input.productType || "in-stock",
          price: Number(input.price || 0),
          compareAt: input.compareAt ? Number(input.compareAt) : null,
          costPrice: Number(input.costPrice || 0),
          stock: Number(input.stock || 0),
          lowStockThreshold: Number(input.lowStockThreshold || 5),
          sku: input.sku,
          barcode: input.barcode || null,
          badge: input.badge || null,
          status: input.status || "active",
          image: input.image,
          images: input.images && input.images.length > 0 ? input.images : [input.image],
          short: input.short || "",
          description: input.description || "",
          howTo: input.howTo || "",
          skinTypes: input.skinTypes || [],
          concerns: input.concerns || [],
          ingredients: input.ingredients || [],
          benefits: input.benefits || [],
          sizes: input.sizes || ["50ml"],
          origin: input.origin || "Tokyo, Japan",
          texture: input.texture || null,
          spf: input.spf || null,
          pao: input.pao || null,
          rating: input.rating !== undefined ? Number(input.rating) : 5.0,
          reviewsCount: input.reviewsCount !== undefined ? Number(input.reviewsCount) : 1,
        };

        const res = await adminApi.createProduct(payload);
        const saved = res ? formatApiProduct(res) : optimisticProduct;
        setProducts((prev) => [saved, ...prev.filter((p) => p.id !== saved.id && p.id !== tempId)]);
        addActivityLog(
          "Created Product",
          saved.name,
          `Initial stock: ${saved.stock}, Price: ৳${saved.price}`,
        );
        return saved;
      } catch (err) {
        console.warn("API createProduct error, keeping optimistic fallback:", err);
        setProducts((prev) => [optimisticProduct, ...prev]);
        addActivityLog(
          "Created Product (Local)",
          optimisticProduct.name,
          `Initial stock: ${optimisticProduct.stock}, Price: ৳${optimisticProduct.price}`,
        );
        throw err;
      }
    },
    [addActivityLog],
  );

  const updateProduct = useCallback(
    async (id: string, updates: Partial<AdminProduct>): Promise<void> => {
      // Optimistic update
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            return { ...p, ...updates };
          }
          return p;
        }),
      );

      try {
        const payload: Record<string, any> = { ...updates };
        if (updates.brand) {
          payload["brandName"] = updates.brand;
        }
        if (updates.category) {
          payload["categoryName"] = updates.category;
        }
        const res = await adminApi.updateProduct(id, payload);
        if (res) {
          const updated = formatApiProduct(res);
          setProducts((prev) =>
            prev.map((p) => (p.id === id || p.id === updated.id ? updated : p)),
          );
        }
        addActivityLog(
          "Updated Product",
          updates.name || id,
          `Fields: ${Object.keys(updates).join(", ")}`,
        );
      } catch (err) {
        console.warn("API updateProduct error:", err);
        throw err;
      }
    },
    [addActivityLog],
  );

  const deleteProduct = useCallback(
    async (id: string): Promise<void> => {
      setProducts((prev) => {
        const found = prev.find((p) => p.id === id);
        if (found) addActivityLog("Deleted Product", found.name, `SKU: ${found.sku}`);
        return prev.filter((p) => p.id !== id);
      });

      try {
        await adminApi.deleteProduct(id);
      } catch (err) {
        console.warn("API deleteProduct error:", err);
      }
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
        if (String(p.id) === String(id)) {
          const nextStock = Math.max(0, (Number(p.stock) || 0) + delta);
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
