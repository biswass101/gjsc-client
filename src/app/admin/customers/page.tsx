"use client";

import React, { useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { useAdmin, AdminCustomer } from "@/context/admin-context";
import {
  useCustomersFilter,
  useAddCustomerForm,
  CustomersHeader,
  CustomersKpiCards,
  CustomersFiltersBar,
  CustomersTable,
  CustomerProfileDrawer,
  AddCustomerModal,
} from "@/features/admin-customers";

export default function AdminCustomersPage() {
  const { customers, orders, addCustomer, updateCustomer } = useAdmin();

  const filterState = useCustomersFilter(customers);
  const addForm = useAddCustomerForm({ addCustomer });

  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);
  const [editNote, setEditNote] = useState("");

  const handleOpenCustomer = useCallback((c: AdminCustomer) => {
    setSelectedCustomer(c);
    setEditNote(c.notes || "");
  }, []);

  const handleSaveNote = useCallback(() => {
    if (!selectedCustomer) return;
    updateCustomer(selectedCustomer.id, { notes: editNote });
    setSelectedCustomer((prev) => (prev ? { ...prev, notes: editNote } : null));
    toast.success("CRM customer note saved!");
  }, [selectedCustomer, editNote, updateCustomer]);

  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return orders.filter(
      (o) =>
        o.customerEmail.toLowerCase() === selectedCustomer.email.toLowerCase() ||
        o.customerPhone === selectedCustomer.phone ||
        o.customerName.toLowerCase() === selectedCustomer.name.toLowerCase(),
    );
  }, [orders, selectedCustomer]);

  const handleExportCSV = useCallback(() => {
    const rows = [
      [
        "ID",
        "Name",
        "Email",
        "Phone",
        "City",
        "Orders",
        "Total Spent BDT",
        "AOV",
        "Tier",
        "Joined",
        "Skin Type",
      ],
      ...filterState.filteredCustomers.map((c) => [
        c.id,
        c.name,
        c.email,
        c.phone,
        c.city,
        c.ordersCount.toString(),
        c.totalSpent.toString(),
        c.avgOrderValue.toString(),
        c.tier,
        c.joinedDate,
        c.skinType,
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GJSC_Customers_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Customers directory exported to CSV! 👥");
  }, [filterState.filteredCustomers]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <CustomersHeader
        totalAccounts={customers.length}
        onExportCsv={handleExportCSV}
        onOpenAdd={() => addForm.setIsAddOpen(true)}
      />

      <CustomersKpiCards
        totalLTV={filterState.totalLTV}
        vipCount={filterState.vipCount}
        avgLtv={filterState.avgLtv}
      />

      <CustomersFiltersBar
        q={filterState.q}
        onSearchChange={(val) => {
          filterState.setQ(val);
          filterState.setPage(1);
        }}
        tierFilter={filterState.tierFilter}
        onTierChange={(val) => {
          filterState.setTierFilter(val);
          filterState.setPage(1);
        }}
        cityFilter={filterState.cityFilter}
        onCityChange={(val) => {
          filterState.setCityFilter(val);
          filterState.setPage(1);
        }}
        sort={filterState.sort}
        onSortChange={filterState.setSort}
        citiesList={filterState.citiesList}
      />

      <CustomersTable
        customers={filterState.pagedCustomers}
        totalFilteredCount={filterState.sortedCustomers.length}
        currentPage={filterState.currentPage}
        totalPages={filterState.totalPages}
        onPageChange={filterState.setPage}
        onSelectCustomer={handleOpenCustomer}
      />

      <CustomerProfileDrawer
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customerOrders={customerOrders}
        editNote={editNote}
        onEditNoteChange={setEditNote}
        onSaveNote={handleSaveNote}
      />

      <AddCustomerModal
        isOpen={addForm.isAddOpen}
        onOpenChange={addForm.setIsAddOpen}
        onSubmit={addForm.handleCreateCustomer}
        addName={addForm.addName}
        setAddName={addForm.setAddName}
        addPhone={addForm.addPhone}
        setAddPhone={addForm.setAddPhone}
        addEmail={addForm.addEmail}
        setAddEmail={addForm.setAddEmail}
        addCity={addForm.addCity}
        setAddCity={addForm.setAddCity}
        addTier={addForm.addTier}
        setAddTier={addForm.setAddTier}
        addSkinType={addForm.addSkinType}
        setAddSkinType={addForm.setAddSkinType}
      />
    </div>
  );
}
