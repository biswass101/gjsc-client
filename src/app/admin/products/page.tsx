"use client";

import React from "react";
import { toast } from "sonner";
import { useAdmin } from "@/context/admin-context";
import {
  ProductHeader,
  ProductInventoryHealth,
  ProductFiltersToolbar,
  ProductBatchActionsBar,
  ProductTable,
  ProductPagination,
  ProductFormModal,
  useProductList,
  useProductModalForm,
} from "@/features/admin-products";

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

  // List, Search, Filter, Selection & Pagination Hook
  const {
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
    pageSize,
    setPageSize,
    setPage,
    selectedIds,
    totalStockUnits,
    inventoryValuation,
    lowStockCount,
    inStockPercentage,
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
  } = useProductList(products, adjustStock, bulkDeleteProducts);

  // Formulation Modal & Multi-Step Tab Form Hook
  const modal = useProductModalForm(
    async (input) => {
      const p = await addProduct(input);
      refetch();
      return p;
    },
    async (id, updates) => {
      await updateProduct(id, updates);
      refetch();
    },
  );

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Delete product "${name}"?`)) {
      await deleteProduct(id);
      refetch();
      toast.info(`Deleted "${name}"`);
    }
  };

  const handleDuplicateProduct = (id: string, name: string) => {
    duplicateProduct(id);
    refetch();
    toast.success(`Duplicated "${name}"`);
  };

  const handleTagFlashSale = () => {
    bulkUpdateProducts(selectedIds, { badge: "Flash Sale" });
    refetch();
    toast.success(`Applied 'Flash Sale' badge to ${selectedIds.length} products!`);
    handleSelectAll(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header & Quick Action */}
      <ProductHeader
        productsCount={totalCount || products.length}
        onExportCsv={handleExportFilteredCSV}
        onOpenAdd={modal.handleOpenAdd}
      />

      {/* Inventory Health Strip */}
      <ProductInventoryHealth
        productsCount={totalCount || products.length}
        inStockPercentage={inStockPercentage}
        totalStockUnits={totalStockUnits}
        lowStockCount={lowStockCount}
        inventoryValuation={inventoryValuation}
      />

      {/* Search, Filter Toolbar & Batch Actions */}
      <div className="surface-card p-4 space-y-3.5">
        <ProductFiltersToolbar
          q={q}
          onQChange={(val) => {
            setQ(val);
            setPage(1);
          }}
          selectedBrand={selectedBrand}
          onBrandChange={(val) => {
            setSelectedBrand(val);
            setPage(1);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={(val) => {
            setSelectedCategory(val);
            setPage(1);
          }}
          selectedStockStatus={selectedStockStatus}
          onStockStatusChange={(val) => {
            setSelectedStockStatus(val);
            setPage(1);
          }}
          selectedBadge={selectedBadge}
          onBadgeChange={(val) => {
            setSelectedBadge(val);
            setPage(1);
          }}
          sort={sort}
          onSortChange={setSort}
        />

        <ProductBatchActionsBar
          selectedCount={selectedIds.length}
          onBulkRestock={handleBulkRestock}
          onTagFlashSale={handleTagFlashSale}
          onBulkDelete={handleBulkDelete}
          onDeselectAll={() => handleSelectAll(false)}
        />
      </div>

      {/* Products Data Table & Pagination */}
      <div className="surface-card overflow-hidden">
        <ProductTable
          products={pagedProducts}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onToggleSelect={handleToggleSelect}
          onAdjustStock={handleAdjustStock}
          onEdit={modal.handleOpenEdit}
          onDuplicate={handleDuplicateProduct}
          onDelete={handleDeleteProduct}
        />

        <ProductPagination
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
          filteredCount={filteredCount}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
          onNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      </div>

      {/* Comprehensive Japanese Skincare Product Formulation Modal */}
      <ProductFormModal modal={modal} />
    </div>
  );
}
