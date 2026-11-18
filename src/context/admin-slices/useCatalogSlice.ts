import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import type { AdminCategory, AdminCollection, AdminBrand, AdminPreOrder } from "@/types";
import {
  INITIAL_CATEGORIES,
  INITIAL_COLLECTIONS,
  INITIAL_BRANDS,
  INITIAL_PREORDERS,
} from "../admin-seed";
import type { AddActivityLogFn } from "./types";
import { adminApi } from "@/lib/api";

export function formatApiCategory(cat: any): AdminCategory {
  let subcategories: string[] = [];
  if (Array.isArray(cat.subcategories)) {
    subcategories = cat.subcategories;
  } else if (typeof cat.subcategories === "string") {
    try {
      const parsed = JSON.parse(cat.subcategories);
      if (Array.isArray(parsed)) subcategories = parsed;
    } catch {
      subcategories = [];
    }
  }

  subcategories = subcategories.filter(
    (s: any) => typeof s === "string" && s.trim().length > 0
  );

  let popularTags: string[] = [];
  if (Array.isArray(cat.popularTags)) {
    popularTags = cat.popularTags;
  } else if (typeof cat.popularTags === "string") {
    try {
      const parsed = JSON.parse(cat.popularTags);
      if (Array.isArray(parsed)) popularTags = parsed;
    } catch {
      popularTags = [];
    }
  }
  popularTags = popularTags.filter(
    (s: any) => typeof s === "string" && s.trim().length > 0
  );

  let ritualStep = cat.ritualStep || null;
  if (typeof ritualStep === "string") {
    try {
      ritualStep = JSON.parse(ritualStep);
    } catch {
      ritualStep = null;
    }
  }

  return {
    id: String(cat.id),
    slug: cat.slug || "",
    title: cat.title || "",
    japaneseTitle: cat.japaneseTitle || undefined,
    tagline: cat.tagline || "",
    description: cat.description || "",
    metaDescription: cat.metaDescription || undefined,
    image: cat.image || "",
    bannerImage: cat.bannerImage || undefined,
    icon: cat.icon || undefined,
    parentCategory: cat.parentCategory || "Skincare",
    subcategories,
    popularTags,
    ritualStep,
    featured: Boolean(cat.featured),
    itemCount: Number(cat.itemCount || 0),
  };
}

export function formatApiCollection(col: any): AdminCollection {
  let frequentlySearched: string[] = [];
  if (Array.isArray(col.frequentlySearched)) {
    frequentlySearched = col.frequentlySearched;
  } else if (typeof col.frequentlySearched === "string") {
    try {
      const parsed = JSON.parse(col.frequentlySearched);
      if (Array.isArray(parsed)) frequentlySearched = parsed;
    } catch {
      frequentlySearched = [];
    }
  }

  frequentlySearched = frequentlySearched.filter(
    (s: any) => typeof s === "string" && s.trim().length > 0
  );

  return {
    id: String(col.id),
    slug: col.slug || "",
    title: col.title || "",
    japaneseTitle: col.japaneseTitle || undefined,
    tagline: col.tagline || "",
    description: col.description || "",
    badgeText: col.badgeText || undefined,
    bannerImage: col.bannerImage || "",
    themeColor: col.themeColor || "#c93d56",
    frequentlySearched,
    featured: Boolean(col.featured),
    itemCount: Number(col.itemCount || 0),
  };
}

export function formatApiBrand(brand: any): AdminBrand {
  return {
    id: String(brand.id),
    slug: brand.slug || "",
    name: brand.name || "",
    kanji: brand.kanji || undefined,
    origin: brand.origin || "Tokyo, Japan",
    tagline: brand.tagline || "",
    description: brand.description || "",
    category: brand.category || "Prestige Skincare",
    logo: brand.logo || "",
    bannerImage: brand.bannerImage || undefined,
    established: brand.established || undefined,
    featured: Boolean(brand.featured),
    itemCount: Number(brand.itemCount || 0),
  };
}

export function formatApiPreOrder(po: any): AdminPreOrder {
  return {
    id: String(po.id),
    productId: po.productId || po.product?.id || null,
    productName: po.productName || po.name || "Tokyo Skincare Pre-Order",
    japaneseName: po.japaneseName || undefined,
    brand: po.brand || "Shiseido",
    category: po.category || "Prestige Skincare",
    price: Number(po.price || 0),
    depositPercent: Number(po.depositPercent || 50),
    estimatedArrival: po.estimatedArrival || "TBA",
    slotsTotal: Number(po.slotsTotal || 0),
    slotsBooked: Number(po.slotsBooked || 0),
    batchStatus: po.batchStatus || "Booking Open",
    image:
      po.image ||
      po.product?.image ||
      "https://res.cloudinary.com/soakj9w7/image/upload/v1794760872/glorious_japan_skin_care/new_products_images/i1.jpg",
    active: po.active !== undefined ? Boolean(po.active) : true,
    notes: po.notes || "",
  };
}

export function useCatalogSlice(addActivityLog: AddActivityLogFn) {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [collections, setCollections] = useState<AdminCollection[]>(INITIAL_COLLECTIONS);
  const [brands, setBrands] = useState<AdminBrand[]>(INITIAL_BRANDS);
  const [preOrders, setPreOrders] = useState<AdminPreOrder[]>(INITIAL_PREORDERS);

  useEffect(() => {
    adminApi
      .getCategories()
      .then((res) => {
        if (Array.isArray(res)) {
          setCategories(res.map(formatApiCategory));
        } else {
          setCategories([]);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch categories from API:", err);
        setCategories([]);
      });

    adminApi
      .getCollections()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setCollections(res.map(formatApiCollection));
        }
      })
      .catch((err) => {
        console.warn("Could not fetch collections from API:", err);
      });

    adminApi
      .getBrands()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setBrands(res.map(formatApiBrand));
        }
      })
      .catch((err) => {
        console.warn("Could not fetch brands from API:", err);
      });

    adminApi
      .getPreOrders()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setPreOrders(res.map(formatApiPreOrder));
        }
      })
      .catch((err) => {
        console.warn("Could not fetch pre-orders from API:", err);
      });
  }, []);

  // CATEGORIES ACTIONS
  const addCategory = useCallback(
    async (cat: Omit<AdminCategory, "id">): Promise<AdminCategory> => {
      const tempId = `cat-${Date.now()}`;
      const optimisticCat: AdminCategory = { ...cat, id: tempId };
      setCategories((prev) => [optimisticCat, ...prev]);
      addActivityLog("Created Category", optimisticCat.title);

      try {
        const payload: Record<string, any> = {
          title: cat.title,
          slug: cat.slug,
          parentCategory: cat.parentCategory,
          subcategories: cat.subcategories,
          featured: cat.featured,
          itemCount: cat.itemCount,
        };
        if (cat.japaneseTitle) payload["japaneseTitle"] = cat.japaneseTitle;
        if (cat.tagline) payload["tagline"] = cat.tagline;
        if (cat.description) payload["description"] = cat.description;
        if (cat.metaDescription) payload["metaDescription"] = cat.metaDescription;
        if (cat.image) payload["image"] = cat.image;
        if (cat.bannerImage) payload["bannerImage"] = cat.bannerImage;
        if (cat.icon) payload["icon"] = cat.icon;
        if (cat.popularTags) payload["popularTags"] = cat.popularTags;
        if (cat.ritualStep) payload["ritualStep"] = cat.ritualStep;

        const created = await adminApi.createCategory(payload);
        const formatted = formatApiCategory(created);
        setCategories((prev) => prev.map((c) => (c.id === tempId ? formatted : c)));
        return formatted;
      } catch (error) {
        console.error("Failed to persist category to backend:", error);
        toast.error("Failed to save category to database.");
        return optimisticCat;
      }
    },
    [addActivityLog],
  );

  const updateCategory = useCallback(
    async (id: string, updates: Partial<AdminCategory>): Promise<void> => {
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
      addActivityLog("Updated Category", id);

      try {
        const payload: Record<string, any> = {};
        if (updates.title !== undefined) payload["title"] = updates.title;
        if (updates.slug !== undefined) payload["slug"] = updates.slug;
        if (updates.japaneseTitle !== undefined) payload["japaneseTitle"] = updates.japaneseTitle;
        if (updates.tagline !== undefined) payload["tagline"] = updates.tagline;
        if (updates.description !== undefined) payload["description"] = updates.description;
        if (updates.metaDescription !== undefined) payload["metaDescription"] = updates.metaDescription;
        if (updates.image !== undefined) payload["image"] = updates.image;
        if (updates.bannerImage !== undefined) payload["bannerImage"] = updates.bannerImage;
        if (updates.icon !== undefined) payload["icon"] = updates.icon;
        if (updates.parentCategory !== undefined) payload["parentCategory"] = updates.parentCategory;
        if (updates.subcategories !== undefined) payload["subcategories"] = updates.subcategories;
        if (updates.popularTags !== undefined) payload["popularTags"] = updates.popularTags;
        if (updates.ritualStep !== undefined) payload["ritualStep"] = updates.ritualStep;
        if (updates.featured !== undefined) payload["featured"] = updates.featured;
        if (updates.itemCount !== undefined) payload["itemCount"] = updates.itemCount;

        const updated = await adminApi.updateCategory(id, payload);
        if (updated) {
          const formatted = formatApiCategory(updated);
          setCategories((prev) => prev.map((c) => (c.id === id ? formatted : c)));
        }
      } catch (error) {
        console.error("Failed to update category on backend:", error);
        toast.error("Failed to sync category changes with database.");
      }
    },
    [addActivityLog],
  );

  const deleteCategory = useCallback(
    async (id: string): Promise<void> => {
      const existing = categories.find((c) => c.id === id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      addActivityLog("Deleted Category", id);

      try {
        await adminApi.deleteCategory(id);
      } catch (error) {
        console.error("Failed to delete category on backend:", error);
        toast.error("Failed to delete category from database.");
        if (existing) {
          setCategories((prev) => [...prev, existing]);
        }
      }
    },
    [addActivityLog, categories],
  );

  // COLLECTIONS ACTIONS
  const addCollection = useCallback(
    async (col: Omit<AdminCollection, "id">): Promise<AdminCollection> => {
      const tempId = `col-${Date.now()}`;
      const optimisticCol: AdminCollection = { ...col, id: tempId };
      setCollections((prev) => [optimisticCol, ...prev]);
      addActivityLog("Created Collection", optimisticCol.title);

      try {
        const payload: Record<string, any> = {
          title: col.title,
          slug: col.slug,
          themeColor: col.themeColor || "#c93d56",
          frequentlySearched: col.frequentlySearched || [],
          featured: col.featured,
          itemCount: col.itemCount,
        };
        if (col.japaneseTitle) payload["japaneseTitle"] = col.japaneseTitle;
        if (col.tagline) payload["tagline"] = col.tagline;
        if (col.description) payload["description"] = col.description;
        if (col.badgeText) payload["badgeText"] = col.badgeText;
        if (col.bannerImage) payload["bannerImage"] = col.bannerImage;

        const created = await adminApi.createCollection(payload);
        const formatted = formatApiCollection(created);
        setCollections((prev) => prev.map((c) => (c.id === tempId ? formatted : c)));
        return formatted;
      } catch (error) {
        console.error("Failed to persist collection to backend:", error);
        toast.error("Failed to save collection to database.");
        return optimisticCol;
      }
    },
    [addActivityLog],
  );

  const updateCollection = useCallback(
    async (id: string, updates: Partial<AdminCollection>): Promise<void> => {
      setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
      addActivityLog("Updated Collection", id);

      try {
        const payload: Record<string, any> = {};
        if (updates.title !== undefined) payload["title"] = updates.title;
        if (updates.slug !== undefined) payload["slug"] = updates.slug;
        if (updates.japaneseTitle !== undefined) payload["japaneseTitle"] = updates.japaneseTitle;
        if (updates.tagline !== undefined) payload["tagline"] = updates.tagline;
        if (updates.description !== undefined) payload["description"] = updates.description;
        if (updates.badgeText !== undefined) payload["badgeText"] = updates.badgeText;
        if (updates.bannerImage !== undefined) payload["bannerImage"] = updates.bannerImage;
        if (updates.themeColor !== undefined) payload["themeColor"] = updates.themeColor;
        if (updates.frequentlySearched !== undefined)
          payload["frequentlySearched"] = updates.frequentlySearched;
        if (updates.featured !== undefined) payload["featured"] = updates.featured;
        if (updates.itemCount !== undefined) payload["itemCount"] = updates.itemCount;

        const updated = await adminApi.updateCollection(id, payload);
        if (updated) {
          const formatted = formatApiCollection(updated);
          setCollections((prev) => prev.map((c) => (c.id === id ? formatted : c)));
        }
      } catch (error) {
        console.error("Failed to update collection on backend:", error);
        toast.error("Failed to sync collection changes with database.");
      }
    },
    [addActivityLog],
  );

  const deleteCollection = useCallback(
    async (id: string): Promise<void> => {
      const existing = collections.find((c) => c.id === id);
      setCollections((prev) => prev.filter((c) => c.id !== id));
      addActivityLog("Deleted Collection", id);

      try {
        await adminApi.deleteCollection(id);
      } catch (error) {
        console.error("Failed to delete collection on backend:", error);
        toast.error("Failed to delete collection from database.");
        if (existing) {
          setCollections((prev) => [...prev, existing]);
        }
      }
    },
    [addActivityLog, collections],
  );

  // BRANDS ACTIONS
  const addBrand = useCallback(
    async (brand: Omit<AdminBrand, "id">): Promise<AdminBrand> => {
      const tempId = `br-${Date.now()}`;
      const optimisticBrand: AdminBrand = { ...brand, id: tempId };
      setBrands((prev) => [optimisticBrand, ...prev]);
      addActivityLog("Created Brand", optimisticBrand.name);

      try {
        const payload: Record<string, any> = {
          name: brand.name,
          slug: brand.slug,
          origin: brand.origin || "Tokyo, Japan",
          category: brand.category || "Prestige Skincare",
          featured: brand.featured,
          itemCount: brand.itemCount,
        };
        if (brand.kanji) payload["kanji"] = brand.kanji;
        if (brand.tagline) payload["tagline"] = brand.tagline;
        if (brand.description) payload["description"] = brand.description;
        if (brand.logo) payload["logo"] = brand.logo;
        if (brand.bannerImage) payload["bannerImage"] = brand.bannerImage;
        if (brand.established) payload["established"] = brand.established;

        const created = await adminApi.createBrand(payload);
        const formatted = formatApiBrand(created);
        setBrands((prev) => prev.map((b) => (b.id === tempId ? formatted : b)));
        return formatted;
      } catch (error) {
        console.error("Failed to persist brand to backend:", error);
        toast.error("Failed to save brand to database.");
        return optimisticBrand;
      }
    },
    [addActivityLog],
  );

  const updateBrand = useCallback(
    async (id: string, updates: Partial<AdminBrand>): Promise<void> => {
      setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
      addActivityLog("Updated Brand", id);

      try {
        const payload: Record<string, any> = {};
        if (updates.name !== undefined) payload["name"] = updates.name;
        if (updates.slug !== undefined) payload["slug"] = updates.slug;
        if (updates.kanji !== undefined) payload["kanji"] = updates.kanji;
        if (updates.origin !== undefined) payload["origin"] = updates.origin;
        if (updates.tagline !== undefined) payload["tagline"] = updates.tagline;
        if (updates.description !== undefined) payload["description"] = updates.description;
        if (updates.category !== undefined) payload["category"] = updates.category;
        if (updates.logo !== undefined) payload["logo"] = updates.logo;
        if (updates.bannerImage !== undefined) payload["bannerImage"] = updates.bannerImage;
        if (updates.established !== undefined) payload["established"] = updates.established;
        if (updates.featured !== undefined) payload["featured"] = updates.featured;
        if (updates.itemCount !== undefined) payload["itemCount"] = updates.itemCount;

        const updated = await adminApi.updateBrand(id, payload);
        if (updated) {
          const formatted = formatApiBrand(updated);
          setBrands((prev) => prev.map((b) => (b.id === id ? formatted : b)));
        }
      } catch (error) {
        console.error("Failed to update brand on backend:", error);
        toast.error("Failed to sync brand changes with database.");
      }
    },
    [addActivityLog],
  );

  const deleteBrand = useCallback(
    async (id: string): Promise<void> => {
      const existing = brands.find((b) => b.id === id);
      setBrands((prev) => prev.filter((b) => b.id !== id));
      addActivityLog("Deleted Brand", id);

      try {
        await adminApi.deleteBrand(id);
      } catch (error) {
        console.error("Failed to delete brand on backend:", error);
        toast.error("Failed to delete brand from database.");
        if (existing) {
          setBrands((prev) => [...prev, existing]);
        }
      }
    },
    [addActivityLog, brands],
  );

  // PRE-ORDERS ACTIONS
  const addPreOrder = useCallback(
    async (po: Omit<AdminPreOrder, "id">): Promise<AdminPreOrder> => {
      const tempId = `po-${Date.now()}`;
      const optimisticPO: AdminPreOrder = { ...po, id: tempId };
      setPreOrders((prev) => [optimisticPO, ...prev]);

      try {
        const payload = {
          productId: po.productId || null,
          productName: po.productName,
          japaneseName: po.japaneseName || null,
          brand: po.brand,
          category: po.category,
          price: Number(po.price),
          depositPercent: Number(po.depositPercent || 50),
          estimatedArrival: po.estimatedArrival,
          batchStatus: po.batchStatus || "Booking Open",
          image: po.image || "",
          active: po.active !== false,
          notes: po.notes || null,
        };
        const res = await adminApi.createPreOrder(payload);
        if (res) {
          const formatted = formatApiPreOrder(res);
          setPreOrders((prev) =>
            prev.map((item) => (item.id === tempId ? formatted : item)),
          );
          addActivityLog("Created Pre-Order Campaign", formatted.productName);
          return formatted;
        }
      } catch (err) {
        console.error("API createPreOrder failed:", err);
      }
      addActivityLog("Created Pre-Order Campaign", optimisticPO.productName);
      return optimisticPO;
    },
    [addActivityLog],
  );

  const updatePreOrder = useCallback(
    async (id: string, updates: Partial<AdminPreOrder>): Promise<void> => {
      setPreOrders((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? { ...p, ...updates } : p)),
      );

      try {
        const payload: Record<string, any> = {};
        if (updates.productName !== undefined) payload["productName"] = updates.productName;
        if (updates.japaneseName !== undefined) payload["japaneseName"] = updates.japaneseName || null;
        if (updates.brand !== undefined) payload["brand"] = updates.brand;
        if (updates.category !== undefined) payload["category"] = updates.category;
        if (updates.price !== undefined) payload["price"] = Number(updates.price);
        if (updates.depositPercent !== undefined) payload["depositPercent"] = Number(updates.depositPercent);
        if (updates.estimatedArrival !== undefined) payload["estimatedArrival"] = updates.estimatedArrival;
        if (updates.batchStatus !== undefined) payload["batchStatus"] = updates.batchStatus;
        if (updates.image !== undefined) payload["image"] = updates.image;
        if (updates.active !== undefined) payload["active"] = updates.active;
        if (updates.notes !== undefined) payload["notes"] = updates.notes || null;

        await adminApi.updatePreOrder(id, payload);
        addActivityLog("Updated Pre-Order", id);
      } catch (err) {
        console.error("API updatePreOrder failed:", err);
      }
    },
    [addActivityLog],
  );

  const deletePreOrder = useCallback(
    async (id: string): Promise<void> => {
      setPreOrders((prev) => prev.filter((p) => String(p.id) !== String(id)));
      try {
        await adminApi.deletePreOrder(id);
        addActivityLog("Deleted Pre-Order", id);
      } catch (err) {
        console.error("API deletePreOrder failed:", err);
      }
    },
    [addActivityLog],
  );

  const resetCategories = useCallback(() => {
    adminApi
      .getCategories()
      .then((res) => {
        if (Array.isArray(res)) {
          setCategories(res.map(formatApiCategory));
        } else {
          setCategories([]);
        }
      })
      .catch(() => setCategories([]));
  }, []);
  const resetCollections = useCallback(() => setCollections(INITIAL_COLLECTIONS), []);
  const resetBrands = useCallback(() => setBrands(INITIAL_BRANDS), []);
  const resetPreOrders = useCallback(() => setPreOrders(INITIAL_PREORDERS), []);

  return {
    categories,
    setCategories,
    collections,
    setCollections,
    brands,
    setBrands,
    preOrders,
    setPreOrders,
    addCategory,
    updateCategory,
    deleteCategory,
    addCollection,
    updateCollection,
    deleteCollection,
    addBrand,
    updateBrand,
    deleteBrand,
    addPreOrder,
    updatePreOrder,
    deletePreOrder,
    resetCategories,
    resetCollections,
    resetBrands,
    resetPreOrders,
  };
}
