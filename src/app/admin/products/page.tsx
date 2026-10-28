"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
  Copy,
  ExternalLink,
  Download,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Package,
  Layers,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { BRANDS, CATEGORIES, CONCERNS, SKIN_TYPES } from "@/lib/catalog";
import { useAdmin, AdminProduct } from "@/context/admin-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const PAGE_SIZE_OPTIONS = [8, 16, 24, 48];

function stockBadge(stock: number, threshold = 5) {
  if (stock === 0)
    return {
      label: "Out of Stock",
      cls: "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200",
    };
  if (stock <= threshold)
    return {
      label: `Low: ${stock} left`,
      cls: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200",
    };
  return {
    label: `${stock} in stock`,
    cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200",
  };
}

export default function AdminProductsPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    bulkUpdateProducts,
    bulkDeleteProducts,
    adjustStock,
  } = useAdmin();

  // Search & Filters State
  const [q, setQ] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStockStatus, setSelectedStockStatus] = useState<"All" | "in" | "low" | "out">("All");
  const [selectedBadge, setSelectedBadge] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Selection state for Batch Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Form State inside Modal
  const [formName, setFormName] = useState("");
  const [formBrand, setFormBrand] = useState<string>(BRANDS[0] || "Shiseido");
  const [formCategory, setFormCategory] = useState<string>(CATEGORIES[0] || "Serum");
  const [formPrice, setFormPrice] = useState("2500");
  const [formCompareAt, setFormCompareAt] = useState("3200");
  const [formCostPrice, setFormCostPrice] = useState("1550");
  const [formStock, setFormStock] = useState("25");
  const [formSku, setFormSku] = useState("");
  const [formBadge, setFormBadge] = useState<AdminProduct["badge"] | "">("");
  const [formStatus, setFormStatus] = useState<AdminProduct["status"]>("active");
  const [formImage, setFormImage] = useState("");
  const [formShort, setFormShort] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formHowTo, setFormHowTo] = useState("");
  const [formSkinType, setFormSkinType] = useState<string[]>(["All Skin Types"]);
  const [formConcern, setFormConcern] = useState<string[]>(["Hydration"]);
  const [formSizes, setFormSizes] = useState("50ml");

  // Health Metrics Calculations
  const totalStockUnits = useMemo(
    () => products.reduce((acc, p) => acc + p.stock, 0),
    [products]
  );

  const inventoryValuation = useMemo(
    () => products.reduce((acc, p) => acc + p.stock * p.costPrice, 0),
    [products]
  );

  const lowStockCount = useMemo(
    () => products.filter((p) => p.stock <= p.lowStockThreshold).length,
    [products]
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
      else if (selectedStockStatus === "low") matchStock = p.stock > 0 && p.stock <= p.lowStockThreshold;
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

  // Open Modal for Add
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName("");
    setFormBrand(BRANDS[0] || "Shiseido");
    setFormCategory(CATEGORIES[0] || "Serum");
    setFormPrice("2500");
    setFormCompareAt("3200");
    setFormCostPrice("1550");
    setFormStock("30");
    setFormSku(`JP-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormBadge("");
    setFormStatus("active");
    setFormImage("https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80");
    setFormShort("Authentic Japanese formulation imported directly from Tokyo.");
    setFormDesc("Rich in active botanical and hyaluronic acid complexes to fortify moisture barrier.");
    setFormHowTo("Dispense 2-3 drops after cleansing.");
    setFormSkinType(["All Skin Types"]);
    setFormConcern(["Hydration"]);
    setFormSizes("50ml");
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (p: AdminProduct) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormBrand(p.brand);
    setFormCategory(p.category);
    setFormPrice(p.price.toString());
    setFormCompareAt(p.compareAt ? p.compareAt.toString() : "");
    setFormCostPrice(p.costPrice.toString());
    setFormStock(p.stock.toString());
    setFormSku(p.sku);
    setFormBadge(p.badge || "");
    setFormStatus(p.status);
    setFormImage(p.image);
    setFormShort(p.short);
    setFormDesc(p.description);
    setFormHowTo(p.howTo);
    setFormSkinType(p.skinTypes);
    setFormConcern(p.concerns);
    setFormSizes(p.sizes.join(", "));
    setIsModalOpen(true);
  };

  // Save Modal Form
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error("Please enter a product title.");
      return;
    }

    const priceNum = parseFloat(formPrice) || 0;
    const costNum = parseFloat(formCostPrice) || Math.round(priceNum * 0.6);
    const stockNum = parseInt(formStock, 10) || 0;
    const compareAtNum = formCompareAt ? parseFloat(formCompareAt) : undefined;
    const sizesArray = formSizes.split(",").map((s) => s.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName.trim(),
        brand: formBrand,
        category: formCategory,
        price: priceNum,
        compareAt: compareAtNum,
        costPrice: costNum,
        stock: stockNum,
        sku: formSku.trim() || editingProduct.sku,
        badge: (formBadge as AdminProduct["badge"]) || null,
        status: formStatus,
        image: formImage.trim() || editingProduct.image,
        short: formShort,
        description: formDesc,
        howTo: formHowTo,
        sizes: sizesArray.length > 0 ? sizesArray : ["50ml"],
      });
      toast.success(`Updated "${formName}" successfully! ✨`);
    } else {
      addProduct({
        name: formName.trim(),
        japaneseName: `${formBrand} 公式処方`,
        brand: formBrand,
        category: formCategory,
        price: priceNum,
        compareAt: compareAtNum,
        costPrice: costNum,
        stock: stockNum,
        lowStockThreshold: 5,
        sku: formSku.trim() || `${formBrand.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        badge: (formBadge as AdminProduct["badge"]) || null,
        status: formStatus,
        rating: 5.0,
        reviewsCount: 1,
        image: formImage.trim(),
        images: [formImage.trim()],
        short: formShort,
        description: formDesc,
        howTo: formHowTo,
        skinTypes: formSkinType,
        concerns: formConcern,
        sizes: sizesArray.length > 0 ? sizesArray : ["50ml"],
      });
      toast.success(`Product "${formName}" added to catalog! 🌸`);
    }

    setIsModalOpen(false);
  };

  // Bulk Actions
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(pagedProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
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
      ["ID", "Name", "Brand", "Category", "SKU", "Price BDT", "Cost BDT", "Stock", "Badge", "Status"],
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

  // Profit Margin calculation in form
  const computedMargin = useMemo(() => {
    const p = parseFloat(formPrice) || 0;
    const c = parseFloat(formCostPrice) || 0;
    if (p <= 0) return { percent: 0, profit: 0 };
    const profit = p - c;
    const percent = Math.round((profit / p) * 100);
    return { percent, profit };
  }, [formPrice, formCostPrice]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-primary">Tokyo Inventory Management</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              Live Catalog ({products.length} SKUs)
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
            Product Catalog & Multi-Variant SKUs
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Full lifecycle control over pricing, profit margins, batch stock replenishment, and merchandising badges.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportFilteredCSV}
            className="rounded-full text-xs h-8 px-3.5 gap-1.5"
          >
            <Download className="h-3.5 w-3.5 text-primary" />
            Export CSV
          </Button>

          <Button
            size="sm"
            onClick={handleOpenAdd}
            className="rounded-full text-xs h-8 px-4 gap-1.5 shadow-2xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Inventory Health Strip */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="surface-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Total Active SKUs
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">
            {products.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Across {BRANDS.length} Japanese Brands
          </p>
        </div>

        <div className="surface-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            In-Stock Fill Rate
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-emerald-600">
            {inStockPercentage}%
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {totalStockUnits.toLocaleString()} total units on hand
          </p>
        </div>

        <div className="surface-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Low Stock Alerts
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-amber-600">
            {lowStockCount}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Items requiring Tokyo air restock
          </p>
        </div>

        <div className="surface-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Inventory Valuation (Cost)
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">
            ৳{inventoryValuation.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
            +38% avg gross margin
          </p>
        </div>
      </div>

      {/* Search & Comprehensive Filter Controls */}
      <div className="surface-card p-4 space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search by title, brand, or SKU code..."
              className="pl-9 h-9 rounded-full text-xs"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setPage(1);
              }}
              className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
            >
              <option value="All">All Brands ({BRANDS.length})</option>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Stock Status Filter */}
            <select
              value={selectedStockStatus}
              onChange={(e) => {
                setSelectedStockStatus(e.target.value as any);
                setPage(1);
              }}
              className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
            >
              <option value="All">All Stock Levels</option>
              <option value="in">In Stock (&gt; 5)</option>
              <option value="low">Low Stock (≤ 5)</option>
              <option value="out">Out of Stock (0)</option>
            </select>

            {/* Badges Filter */}
            <select
              value={selectedBadge}
              onChange={(e) => {
                setSelectedBadge(e.target.value);
                setPage(1);
              }}
              className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
            >
              <option value="All">All Badges</option>
              <option value="Best Seller">Best Seller</option>
              <option value="Flash Sale">Flash Sale</option>
              <option value="Trending">Trending</option>
              <option value="New">New</option>
              <option value="Exclusive">Exclusive</option>
              <option value="None">No Badge</option>
            </select>

            {/* Sort Selector */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs font-semibold"
            >
              <option value="newest">Sort: Newest</option>
              <option value="velocity">Sort: Sales Velocity</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="stock_asc">Stock: Low to High</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Multi-Selection Batch Actions Bar (Reveals when items selected) */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/40 bg-primary/10 p-3 text-xs animate-rise">
            <div className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-[10px]">
                {selectedIds.length}
              </span>
              <span className="font-semibold text-foreground">
                Products Selected
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkRestock(25)}
                className="rounded-full text-xs h-7 px-3 bg-card"
              >
                +25 Restock All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  bulkUpdateProducts(selectedIds, { badge: "Flash Sale" });
                  toast.success(`Applied 'Flash Sale' badge to ${selectedIds.length} products!`);
                  setSelectedIds([]);
                }}
                className="rounded-full text-xs h-7 px-3 bg-card"
              >
                Tag Flash Sale
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                className="rounded-full text-xs h-7 px-3"
              >
                Delete Selected
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedIds([])}
                className="rounded-full text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
              >
                Deselect
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Products Data Table */}
      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/70 bg-secondary/30 text-muted-foreground font-semibold">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      pagedProducts.length > 0 &&
                      selectedIds.length === pagedProducts.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-border"
                  />
                </th>
                <th className="py-3 px-4">Product Formulation</th>
                <th className="py-3 px-4">Brand & Category</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4 text-right">Retail (BDT)</th>
                <th className="py-3 px-4 text-center">Profit Margin</th>
                <th className="py-3 px-4 text-center">Inventory Stock</th>
                <th className="py-3 px-4 text-center">Badge</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {pagedProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-muted-foreground">
                    No Japanese skincare products found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                pagedProducts.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  const st = stockBadge(p.stock, p.lowStockThreshold);
                  const marginPct = Math.round(((p.price - p.costPrice) / p.price) * 100);

                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-secondary/20 transition-colors ${
                        isSelected ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(p.id)}
                          className="rounded border-border"
                        />
                      </td>

                      {/* Product Formulation & Image */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-11 w-11 rounded-lg object-cover border border-border/70 shrink-0"
                          />
                          <div className="space-y-0.5">
                            <p className="font-semibold text-foreground text-xs line-clamp-1">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {p.sizes?.join(", ") || "50ml"} • ★ {p.rating.toFixed(1)} ({p.reviewsCount})
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Brand & Category */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-foreground">{p.brand}</p>
                        <p className="text-[11px] text-muted-foreground">{p.category}</p>
                      </td>

                      {/* SKU */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-muted-foreground">
                        {p.sku}
                      </td>

                      {/* Retail Price */}
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-foreground">
                        ৳{p.price.toLocaleString()}
                        {p.compareAt && (
                          <span className="block text-[10px] text-muted-foreground/70 line-through">
                            ৳{p.compareAt.toLocaleString()}
                          </span>
                        )}
                      </td>

                      {/* Profit Margin */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                          +{marginPct}%
                        </span>
                      </td>

                      {/* Stock Level with Quick Adjust Controls */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => adjustStock(p.id, -1)}
                            className="h-5 w-5 rounded bg-secondary grid place-items-center text-muted-foreground hover:text-foreground font-bold"
                            title="Decrement 1"
                          >
                            -
                          </button>

                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${st.cls}`}
                          >
                            {st.label}
                          </span>

                          <button
                            type="button"
                            onClick={() => adjustStock(p.id, 1)}
                            className="h-5 w-5 rounded bg-secondary grid place-items-center text-muted-foreground hover:text-foreground font-bold"
                            title="Increment 1"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Badge */}
                      <td className="py-3.5 px-4 text-center">
                        {p.badge ? (
                          <span className="rounded-full bg-primary/15 text-primary border border-primary/20 px-2 py-0.5 text-[10px] font-bold">
                            {p.badge}
                          </span>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/60">—</span>
                        )}
                      </td>

                      {/* Actions Menu */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            title="Edit Product"
                            className="h-7 w-7 rounded-lg grid place-items-center text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              duplicateProduct(p.id);
                              toast.success(`Duplicated "${p.name}"`);
                            }}
                            title="Duplicate SKU"
                            className="h-7 w-7 rounded-lg grid place-items-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>

                          <a
                            href={`/product/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Preview on Store"
                            className="h-7 w-7 rounded-lg grid place-items-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete product "${p.name}"?`)) {
                                deleteProduct(p.id);
                                toast.info(`Deleted "${p.name}"`);
                              }
                            }}
                            title="Delete"
                            className="h-7 w-7 rounded-lg grid place-items-center text-muted-foreground hover:bg-rose/10 hover:text-rose transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/70 p-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Showing</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="rounded-md border border-border/80 bg-background px-2 py-0.5 text-xs text-foreground"
            >
              {PAGE_SIZE_OPTIONS.map((sz) => (
                <option key={sz} value={sz}>
                  {sz}
                </option>
              ))}
            </select>
            <span>of {sortedProducts.length} filtered products ({products.length} total)</span>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-7 w-7 p-0 rounded-md"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>

            <span className="px-2 font-medium text-foreground">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-7 w-7 p-0 rounded-md"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Comprehensive Product Edit / Add Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <Package className="h-5 w-5 text-primary" />
              {editingProduct ? `Edit: ${editingProduct.name}` : "Create New Japanese Skincare Product"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Configure formulation details, Tokyo imported batch attributes, pricing margins, and imagery.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveForm} className="space-y-5 pt-3">
            {/* Section 1: General Info */}
            <div className="rounded-xl border border-border/70 p-4 space-y-3 bg-secondary/10">
              <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                1. General Formulation Details
              </h3>

              <div>
                <Label className="text-xs font-semibold">Product Title *</Label>
                <Input
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Shiseido Ultimune Power Infusing Concentrate"
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Japanese Brand</Label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
                  >
                    {BRANDS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-xs font-semibold">Category</Label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Pricing & Gross Margin Calculator */}
            <div className="rounded-xl border border-border/70 p-4 space-y-3 bg-secondary/10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                  2. Pricing & Profit Margin Analysis
                </h3>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                  Estimated Profit: ৳{computedMargin.profit.toLocaleString()} ({computedMargin.percent}%)
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Retail Price (৳) *</Label>
                  <Input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="mt-1 h-9 rounded-full text-xs font-semibold"
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold">Compare-at Price (৳)</Label>
                  <Input
                    type="number"
                    value={formCompareAt}
                    onChange={(e) => setFormCompareAt(e.target.value)}
                    placeholder="Optional strike"
                    className="mt-1 h-9 rounded-full text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold">Cost of Goods (৳)</Label>
                  <Input
                    type="number"
                    value={formCostPrice}
                    onChange={(e) => setFormCostPrice(e.target.value)}
                    className="mt-1 h-9 rounded-full text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Inventory & SKU Tracking */}
            <div className="rounded-xl border border-border/70 p-4 space-y-3 bg-secondary/10">
              <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                3. Warehouse Inventory & SKU
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs font-semibold">SKU Code</Label>
                  <Input
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="mt-1 h-9 rounded-full text-xs font-mono"
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold">Stock Quantity</Label>
                  <Input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="mt-1 h-9 rounded-full text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold">Sizes (comma-separated)</Label>
                  <Input
                    value={formSizes}
                    onChange={(e) => setFormSizes(e.target.value)}
                    placeholder="30ml, 50ml, 100ml"
                    className="mt-1 h-9 rounded-full text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Imagery & Merchandising Badge */}
            <div className="rounded-xl border border-border/70 p-4 space-y-3 bg-secondary/10">
              <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                4. Imagery & Badges
              </h3>

              <div className="flex items-center gap-4">
                {formImage ? (
                  <img
                    src={formImage}
                    alt="Preview"
                    className="h-16 w-16 rounded-lg object-cover border border-border shrink-0"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg border-2 border-dashed border-border grid place-items-center text-muted-foreground text-[10px]">
                    No Image
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <Label className="text-xs font-semibold">Image URL</Label>
                  <Input
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://..."
                    className="h-9 rounded-full text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <Label className="text-xs font-semibold">Merchandising Badge</Label>
                  <select
                    value={formBadge || ""}
                    onChange={(e) => setFormBadge(e.target.value as any)}
                    className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
                  >
                    <option value="">No Badge</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="Flash Sale">Flash Sale</option>
                    <option value="Trending">Trending</option>
                    <option value="New">New Arrival</option>
                    <option value="Exclusive">Exclusive</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs font-semibold">Catalog Status</Label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 5: Story & Instructions */}
            <div className="rounded-xl border border-border/70 p-4 space-y-3 bg-secondary/10">
              <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                5. Product Ritual & Copy
              </h3>

              <div>
                <Label className="text-xs font-semibold">Short Synopsis</Label>
                <Input
                  value={formShort}
                  onChange={(e) => setFormShort(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Application Ritual (How to Use)</Label>
                <Input
                  value={formHowTo}
                  onChange={(e) => setFormHowTo(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="rounded-full text-xs px-6">
                {editingProduct ? "Save Changes" : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
