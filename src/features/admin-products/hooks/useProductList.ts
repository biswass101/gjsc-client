"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import type { AdminProduct } from "@/context/admin-context";
import { DEFAULT_PAGE_SIZE } from "../data/productConstants";
import { adminApi } from "@/lib/api";
import { formatApiProduct } from "@/context/admin-slices/useProductSlice";

interface ProductAdminQueryParams {
  page: number;
  limit: number;
  search?: string;
  brand?: string;
  category?: string;
  badge?: string;
  stockStatus?: string;
  sortBy?: string;
}

export function useProductList(
  products: AdminProduct[],
  adjustStock: (id: string, delta: number) => void,
  bulkDeleteProducts: (ids: string[]) => void,
) {
  // Search & Filters State
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStockStatus, setSelectedStockStatus] = useState<"All" | "in" | "low" | "out">(
    "All",
  );
  const [selectedBadge, setSelectedBadge] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // Server-side State
  const [serverProducts, setServerProducts] = useState<AdminProduct[] | null>(null);
  const [serverTotal, setServerTotal] = useState<number | null>(null);
  const [serverTotalCatalog, setServerTotalCatalog] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Selection state for Batch Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Ref tracking pending stock adjustments and debounce timers
  const pendingStockRef = useRef<Record<string, number>>({});
  const stockTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Flush any pending stock updates on unmount
  useEffect(() => {
    return () => {
      Object.entries(stockTimersRef.current).forEach(([productId, timer]) => {
        clearTimeout(timer);
        const finalStock = pendingStockRef.current[productId];
        if (finalStock !== undefined) {
          adminApi.updateProduct(productId, { stock: finalStock }).catch(() => {});
        }
      });
    };
  }, []);

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQ(q);
    }, 300);
    return () => clearTimeout(timer);
  }, [q]);

  // Server-side product query
  const fetchServerProducts = useCallback(async () => {
    setIsLoading(true);

    const params: ProductAdminQueryParams = {
      page,
      limit: pageSize,
    };

    if (debouncedQ.trim()) params.search = debouncedQ.trim();
    if (selectedBrand !== "All") params.brand = selectedBrand;
    if (selectedCategory !== "All") params.category = selectedCategory;
    if (selectedBadge !== "All") params.badge = selectedBadge;
    if (selectedStockStatus !== "All") params.stockStatus = selectedStockStatus;

    if (sort === "price_asc") params.sortBy = "price_asc";
    else if (sort === "price_desc") params.sortBy = "price_desc";
    else if (sort === "stock_asc") params.sortBy = "stock_asc";
    else if (sort === "stock_desc") params.sortBy = "stock_desc";
    else if (sort === "name_asc") params.sortBy = "name_asc";
    else if (sort === "velocity") params.sortBy = "velocity";

    try {
      const res = await adminApi.getProducts(params);
      if (res && Array.isArray(res.products)) {
        const formatted: AdminProduct[] = res.products.map(formatApiProduct);
        setServerProducts(formatted);
        if (res.pagination) {
          setServerTotal(res.pagination.total);
          setServerTotalCatalog(res.pagination.totalCatalog ?? res.pagination.total);
        }
      }
    } catch (err) {
      console.warn("Could not query server products for admin table:", err);
      // Fallback remains active via client calculations
    } finally {
      setIsLoading(false);
    }
  }, [
    page,
    pageSize,
    debouncedQ,
    selectedBrand,
    selectedCategory,
    selectedStockStatus,
    selectedBadge,
    sort,
  ]);

  useEffect(() => {
    fetchServerProducts();
  }, [fetchServerProducts, refreshKey]);

  const refetch = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  // Health Metrics Calculations (using all catalog products)
  const metricSource = products;
  const totalStockUnits = useMemo(
    () => metricSource.reduce((acc, p) => acc + p.stock, 0),
    [metricSource],
  );

  const inventoryValuation = useMemo(
    () => metricSource.reduce((acc, p) => acc + p.stock * p.costPrice, 0),
    [metricSource],
  );

  const lowStockCount = useMemo(
    () => metricSource.filter((p) => p.stock <= p.lowStockThreshold).length,
    [metricSource],
  );

  const inStockPercentage = useMemo(() => {
    if (metricSource.length === 0) return 0;
    const inStock = metricSource.filter((p) => p.stock > 0).length;
    return Math.round((inStock / metricSource.length) * 100);
  }, [metricSource]);

  // Client-side Fallback Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchQ =
        !debouncedQ ||
        p.name.toLowerCase().includes(debouncedQ.toLowerCase()) ||
        p.brand.toLowerCase().includes(debouncedQ.toLowerCase()) ||
        p.sku.toLowerCase().includes(debouncedQ.toLowerCase());

      const matchBrand = selectedBrand === "All" || p.brand === selectedBrand;
      const matchCategory = selectedCategory === "All" || p.category === selectedCategory;

      let matchStock = true;
      if (selectedStockStatus === "in") matchStock = p.stock > p.lowStockThreshold;
      else if (selectedStockStatus === "low")
        matchStock = p.stock > 0 && p.stock <= p.lowStockThreshold;
      else if (selectedStockStatus === "out") matchStock = p.stock === 0;

      const matchBadge =
        selectedBadge === "All" ||
        (selectedBadge === "None" ? !p.badge : p.badge === selectedBadge);

      return matchQ && matchBrand && matchCategory && matchStock && matchBadge;
    });
  }, [products, debouncedQ, selectedBrand, selectedCategory, selectedStockStatus, selectedBadge]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sort === "price_asc") return list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") return list.sort((a, b) => b.price - a.price);
    if (sort === "stock_asc") return list.sort((a, b) => a.stock - b.stock);
    if (sort === "stock_desc") return list.sort((a, b) => b.stock - a.stock);
    if (sort === "name_asc") return list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "velocity") return list.sort((a, b) => b.salesCount - a.salesCount);
    return list; // newest / default
  }, [filteredProducts, sort]);

  // Determine Active Paged Products and Telemetry
  const isServerReady = serverProducts !== null;

  const filteredCount = isServerReady ? (serverTotal ?? sortedProducts.length) : sortedProducts.length;
  const totalCount = isServerReady
    ? (serverTotalCatalog ?? serverTotal ?? products.length)
    : products.length;

  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pagedProducts = useMemo(() => {
    if (isServerReady && serverProducts) {
      return serverProducts;
    }
    const start = (currentPage - 1) * pageSize;
    return sortedProducts.slice(start, start + pageSize);
  }, [isServerReady, serverProducts, sortedProducts, currentPage, pageSize]);

  // Stock Adjustment for both local and server state with optimistic update & debounced backend persistence
  const handleAdjustStock = useCallback(
    (id: string, delta: number) => {
      const strId = String(id);

      // Determine baseline current stock (respecting pending rapid clicks)
      let baselineStock: number;
      if (pendingStockRef.current[strId] !== undefined) {
        baselineStock = pendingStockRef.current[strId];
      } else {
        const found =
          serverProducts?.find((p) => String(p.id) === strId) ||
          products.find((p) => String(p.id) === strId);
        baselineStock = Number(found?.stock || 0);
      }

      const nextStock = Math.max(0, baselineStock + delta);
      pendingStockRef.current[strId] = nextStock;

      // 1. Optimistically update server products in current page view
      setServerProducts((prev) =>
        prev
          ? prev.map((p) =>
              String(p.id) === strId ? { ...p, stock: nextStock } : p,
            )
          : null,
      );

      // 2. Also update context products so inventory telemetry & fallback update
      adjustStock(strId, delta);

      // 3. Debounce the backend API sync (350ms) to consolidate rapid clicks
      if (stockTimersRef.current[strId]) {
        clearTimeout(stockTimersRef.current[strId]);
      }

      stockTimersRef.current[strId] = setTimeout(async () => {
        delete stockTimersRef.current[strId];
        const finalStock = pendingStockRef.current[strId];
        delete pendingStockRef.current[strId];

        if (finalStock === undefined) return;

        try {
          await adminApi.updateProduct(strId, { stock: finalStock });
        } catch (err) {
          console.error("Failed to sync stock adjustment to server:", err);
          toast.error("Failed to update stock in database");
          refetch();
        }
      }, 350);
    },
    [adjustStock, products, serverProducts, refetch],
  );

  // Bulk Actions
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(pagedProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleBulkRestock = (qty: number) => {
    selectedIds.forEach((id) => handleAdjustStock(id, qty));
    toast.success(`Added +${qty} units to ${selectedIds.length} products! 📦`);
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} selected products permanently?`)) {
      bulkDeleteProducts(selectedIds);
      if (serverProducts) {
        setServerProducts((prev) =>
          prev ? prev.filter((p) => !selectedIds.includes(p.id)) : null,
        );
        setServerTotal((prev) => (prev !== null ? Math.max(0, prev - selectedIds.length) : null));
        setServerTotalCatalog((prev) =>
          prev !== null ? Math.max(0, prev - selectedIds.length) : null,
        );
      }
      toast.info(`Deleted ${selectedIds.length} products.`);
      setSelectedIds([]);
    }
  };

  const handleExportFilteredCSV = () => {
    const listToExport = sortedProducts.length > 0 ? sortedProducts : (serverProducts || []);
    const rows = [
      [
        "ID",
        "Name",
        "Brand",
        "Category",
        "SKU",
        "Price BDT",
        "Cost BDT",
        "Stock",
        "Badge",
        "Status",
      ],
      ...listToExport.map((p) => [
        p.id,
        p.name,
        p.brand,
        p.category,
        p.sku,
        p.price.toString(),
        p.costPrice.toString(),
        p.stock.toString(),
        p.badge || "None",
        p.status,
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GJSC_Products_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Products catalog exported to CSV! 📑");
  };

  return {
    q,
    setQ,
    selectedBrand,
    setSelectedBrand,
    selectedCategory,
    setSelectedCategory,
    selectedStockStatus,
    setSelectedStockStatus,
    selectedBadge,
    setSelectedBadge,
    sort,
    setSort,
    page,
    setPage,
    pageSize,
    setPageSize,
    selectedIds,
    totalStockUnits,
    inventoryValuation,
    lowStockCount,
    inStockPercentage,
    filteredProducts,
    sortedProducts,
    pagedProducts,
    totalPages,
    currentPage,
    filteredCount,
    totalCount,
    isLoading,
    refetch,
    handleAdjustStock,
    handleSelectAll,
    handleToggleSelect,
    handleBulkRestock,
    handleBulkDelete,
    handleExportFilteredCSV,
  };
}
