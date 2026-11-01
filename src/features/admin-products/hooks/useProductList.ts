"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import type { AdminProduct } from "@/context/admin-context";

export function useProductList(
  products: AdminProduct[],
  adjustStock: (id: string, delta: number) => void,
  bulkDeleteProducts: (ids: string[]) => void,
) {
  // Search & Filters State
  const [q, setQ] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStockStatus, setSelectedStockStatus] = useState<"All" | "in" | "low" | "out">(
    "All",
  );
  const [selectedBadge, setSelectedBadge] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Selection state for Batch Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Health Metrics Calculations
  const totalStockUnits = useMemo(() => products.reduce((acc, p) => acc + p.stock, 0), [products]);

  const inventoryValuation = useMemo(
    () => products.reduce((acc, p) => acc + p.stock * p.costPrice, 0),
    [products],
  );

  const lowStockCount = useMemo(
    () => products.filter((p) => p.stock <= p.lowStockThreshold).length,
    [products],
  );

  const inStockPercentage = useMemo(() => {
    if (products.length === 0) return 0;
    const inStock = products.filter((p) => p.stock > 0).length;
    return Math.round((inStock / products.length) * 100);
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.brand.toLowerCase().includes(q.toLowerCase()) ||
        p.sku.toLowerCase().includes(q.toLowerCase());

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
  }, [products, q, selectedBrand, selectedCategory, selectedStockStatus, selectedBadge]);

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

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProducts.slice(start, start + pageSize);
  }, [sortedProducts, currentPage, pageSize]);

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
    selectedIds.forEach((id) => adjustStock(id, qty));
    toast.success(`Added +${qty} units to ${selectedIds.length} products! 📦`);
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} selected products permanently?`)) {
      bulkDeleteProducts(selectedIds);
      toast.info(`Deleted ${selectedIds.length} products.`);
      setSelectedIds([]);
    }
  };

  const handleExportFilteredCSV = () => {
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
      ...filteredProducts.map((p) => [
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
    handleSelectAll,
    handleToggleSelect,
    handleBulkRestock,
    handleBulkDelete,
    handleExportFilteredCSV,
  };
}
