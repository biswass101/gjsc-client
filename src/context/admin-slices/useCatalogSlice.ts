import { useState, useCallback } from "react";
import type { AdminCategory, AdminCollection, AdminBrand, AdminPreOrder } from "@/types";
import {
  INITIAL_CATEGORIES,
  INITIAL_COLLECTIONS,
  INITIAL_BRANDS,
  INITIAL_PREORDERS,
} from "../admin-seed";
import type { AddActivityLogFn } from "./types";

export function useCatalogSlice(addActivityLog: AddActivityLogFn) {
  const [categories, setCategories] = useState<AdminCategory[]>(INITIAL_CATEGORIES);
  const [collections, setCollections] = useState<AdminCollection[]>(INITIAL_COLLECTIONS);
  const [brands, setBrands] = useState<AdminBrand[]>(INITIAL_BRANDS);
  const [preOrders, setPreOrders] = useState<AdminPreOrder[]>(INITIAL_PREORDERS);

  // CATEGORIES ACTIONS
  const addCategory = useCallback(
    (cat: Omit<AdminCategory, "id">): AdminCategory => {
      const id = `cat-${Date.now()}`;
      const newCat: AdminCategory = { ...cat, id };
      setCategories((prev) => [newCat, ...prev]);
      addActivityLog("Created Category", newCat.title);
      return newCat;
    },
    [addActivityLog],
  );

  const updateCategory = useCallback(
    (id: string, updates: Partial<AdminCategory>) => {
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
      addActivityLog("Updated Category", id);
    },
    [addActivityLog],
  );

  const deleteCategory = useCallback(
    (id: string) => {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      addActivityLog("Deleted Category", id);
    },
    [addActivityLog],
  );

  // COLLECTIONS ACTIONS
  const addCollection = useCallback(
    (col: Omit<AdminCollection, "id">): AdminCollection => {
      const id = `col-${Date.now()}`;
      const newCol: AdminCollection = { ...col, id };
      setCollections((prev) => [newCol, ...prev]);
      addActivityLog("Created Collection", newCol.title);
      return newCol;
    },
    [addActivityLog],
  );

  const updateCollection = useCallback(
    (id: string, updates: Partial<AdminCollection>) => {
      setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
      addActivityLog("Updated Collection", id);
    },
    [addActivityLog],
  );

  const deleteCollection = useCallback(
    (id: string) => {
      setCollections((prev) => prev.filter((c) => c.id !== id));
      addActivityLog("Deleted Collection", id);
    },
    [addActivityLog],
  );

  // BRANDS ACTIONS
  const addBrand = useCallback(
    (brand: Omit<AdminBrand, "id">): AdminBrand => {
      const id = `br-${Date.now()}`;
      const newBrand: AdminBrand = { ...brand, id };
      setBrands((prev) => [newBrand, ...prev]);
      addActivityLog("Created Brand", newBrand.name);
      return newBrand;
    },
    [addActivityLog],
  );

  const updateBrand = useCallback(
    (id: string, updates: Partial<AdminBrand>) => {
      setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
      addActivityLog("Updated Brand", id);
    },
    [addActivityLog],
  );

  const deleteBrand = useCallback(
    (id: string) => {
      setBrands((prev) => prev.filter((b) => b.id !== id));
      addActivityLog("Deleted Brand", id);
    },
    [addActivityLog],
  );

  // PRE-ORDERS ACTIONS
  const addPreOrder = useCallback(
    (po: Omit<AdminPreOrder, "id">): AdminPreOrder => {
      const id = `po-${Date.now()}`;
      const newPO: AdminPreOrder = { ...po, id };
      setPreOrders((prev) => [newPO, ...prev]);
      addActivityLog("Created Pre-Order Campaign", newPO.productName);
      return newPO;
    },
    [addActivityLog],
  );

  const updatePreOrder = useCallback(
    (id: string, updates: Partial<AdminPreOrder>) => {
      setPreOrders((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
      addActivityLog("Updated Pre-Order", id);
    },
    [addActivityLog],
  );

  const deletePreOrder = useCallback(
    (id: string) => {
      setPreOrders((prev) => prev.filter((p) => p.id !== id));
      addActivityLog("Deleted Pre-Order", id);
    },
    [addActivityLog],
  );

  const resetCategories = useCallback(() => setCategories(INITIAL_CATEGORIES), []);
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
