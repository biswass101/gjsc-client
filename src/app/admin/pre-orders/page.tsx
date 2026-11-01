"use client";

import React, { useState, useCallback } from "react";
import { toast } from "sonner";
import { useAdmin, AdminPreOrder } from "@/context/admin-context";
import {
  usePreOrdersFilter,
  usePreOrderModalForm,
  PreOrdersHeader,
  PreOrdersKpiCards,
  PreOrdersFiltersBar,
  PreOrdersList,
  PreOrderFormModal,
  PreOrderDeleteDialog,
} from "@/features/admin-pre-orders";

export default function AdminPreOrdersPage() {
  const { preOrders, addPreOrder, updatePreOrder, deletePreOrder, brands } = useAdmin();

  const filterState = usePreOrdersFilter(preOrders);
  const modalForm = usePreOrderModalForm({ brands, addPreOrder, updatePreOrder });

  const [poToDelete, setPoToDelete] = useState<AdminPreOrder | null>(null);

  const handleConfirmDelete = useCallback(() => {
    if (!poToDelete) return;
    deletePreOrder(poToDelete.id);
    toast.success(`Pre-order batch "${poToDelete.productName}" removed.`);
    setPoToDelete(null);
  }, [poToDelete, deletePreOrder]);

  const handleQuickStatusChange = useCallback(
    (po: AdminPreOrder, newStatus: AdminPreOrder["batchStatus"]) => {
      updatePreOrder(po.id, { batchStatus: newStatus });
      toast.success(`Batch status updated to "${newStatus}" for ${po.productName}!`);
    },
    [updatePreOrder],
  );

  const handleToggleActive = useCallback(
    (po: AdminPreOrder) => {
      updatePreOrder(po.id, { active: !po.active });
      toast.success(
        `Pre-order booking ${!po.active ? "reopened" : "paused"} for ${po.productName}.`,
      );
    },
    [updatePreOrder],
  );

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <PreOrdersHeader onOpenCreate={modalForm.openCreateModal} />

      <PreOrdersKpiCards
        totalCampaigns={preOrders.length}
        totalBookedRevenue={filterState.totalBookedRevenue}
        totalSlotsBooked={filterState.totalSlotsBooked}
        totalSlots={filterState.totalSlots}
        inFlightBatchesCount={filterState.inFlightBatchesCount}
      />

      <PreOrdersFiltersBar
        searchQuery={filterState.searchQuery}
        onSearchChange={filterState.setSearchQuery}
        selectedStatus={filterState.selectedStatus}
        onSelectStatus={filterState.setSelectedStatus}
        allPreOrders={preOrders}
      />

      <PreOrdersList
        preOrders={filterState.filteredPreOrders}
        onEdit={modalForm.openEditModal}
        onDeleteRequest={setPoToDelete}
        onStatusChange={handleQuickStatusChange}
        onToggleActive={handleToggleActive}
        onOpenCreate={modalForm.openCreateModal}
      />

      <PreOrderFormModal
        isOpen={modalForm.isModalOpen}
        onOpenChange={modalForm.setIsModalOpen}
        editingPreOrder={modalForm.editingPreOrder}
        brands={brands}
        onSubmit={modalForm.handleSave}
        productName={modalForm.productName}
        setProductName={modalForm.setProductName}
        japaneseName={modalForm.japaneseName}
        setJapaneseName={modalForm.setJapaneseName}
        brand={modalForm.brand}
        setBrand={modalForm.setBrand}
        category={modalForm.category}
        setCategory={modalForm.setCategory}
        price={modalForm.price}
        setPrice={modalForm.setPrice}
        depositPercent={modalForm.depositPercent}
        setDepositPercent={modalForm.setDepositPercent}
        estimatedArrival={modalForm.estimatedArrival}
        setEstimatedArrival={modalForm.setEstimatedArrival}
        slotsTotal={modalForm.slotsTotal}
        setSlotsTotal={modalForm.setSlotsTotal}
        slotsBooked={modalForm.slotsBooked}
        setSlotsBooked={modalForm.setSlotsBooked}
        batchStatus={modalForm.batchStatus}
        setBatchStatus={modalForm.setBatchStatus}
        image={modalForm.image}
        setImage={modalForm.setImage}
        active={modalForm.active}
        setActive={modalForm.setActive}
        notes={modalForm.notes}
        setNotes={modalForm.setNotes}
      />

      <PreOrderDeleteDialog
        poToDelete={poToDelete}
        onOpenChange={(open) => !open && setPoToDelete(null)}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
