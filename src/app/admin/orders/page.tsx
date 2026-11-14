"use client";

import { useState } from "react";
import { useAdmin } from "@/context/admin-context";
import { QuickAddOrderModal } from "@/components/admin/quick-modals";
import {
  useOrderManagement,
  OrderHeader,
  OrderStageTabs,
  OrderFiltersToolbar,
  OrderTable,
  OrderPagination,
  OrderDetailModal,
  OrderInvoiceModal,
} from "@/features/admin-orders";

export default function AdminOrdersPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const {
    orders = [],
    updateOrderStatus,
    updateOrderPayment,
    assignCourier,
    addOrderNote,
    deleteOrder,
  } = useAdmin();

  const mgmt = useOrderManagement(
    orders,
    updateOrderStatus,
    updateOrderPayment,
    assignCourier,
    addOrderNote,
    deleteOrder,
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header with Logistics Overview & Export */}
      <OrderHeader
        totalParcels={orders.length}
        onExportCSV={mgmt.handleExportCSV}
        onCreateOrder={() => setIsCreateOpen(true)}
      />

      {/* Pipeline Status Filter Tabs */}
      <OrderStageTabs
        orders={orders}
        activeStage={mgmt.activeStage}
        onSelectStage={(stage) => {
          mgmt.setActiveStage(stage);
          mgmt.setPage(1);
        }}
      />

      {/* Search & Filter Bar */}
      <OrderFiltersToolbar
        searchQuery={mgmt.q}
        onSearchChange={(q) => {
          mgmt.setQ(q);
          mgmt.setPage(1);
        }}
        methodFilter={mgmt.methodFilter}
        onMethodChange={(m) => {
          mgmt.setMethodFilter(m);
          mgmt.setPage(1);
        }}
        courierFilter={mgmt.courierFilter}
        onCourierChange={(c) => {
          mgmt.setCourierFilter(c);
          mgmt.setPage(1);
        }}
        sort={mgmt.sort}
        onSortChange={mgmt.setSort}
      />

      {/* Orders Data Table */}
      <OrderTable
        orders={mgmt.pagedOrders}
        onOpenDetails={mgmt.handleOpenDetails}
        onUpdateStatus={mgmt.updateOrderStatus}
      />

      {/* Pagination Controls */}
      <OrderPagination
        pagedCount={mgmt.pagedOrders.length}
        totalFilteredCount={mgmt.sortedOrders.length}
        currentPage={mgmt.currentPage}
        totalPages={mgmt.totalPages}
        onPageChange={mgmt.setPage}
      />

      {/* Comprehensive Order Detail & Logistics Drawer/Modal */}
      <OrderDetailModal
        order={mgmt.selectedOrder}
        onClose={() => mgmt.setSelectedOrder(null)}
        onOpenInvoice={() => mgmt.setIsInvoiceOpen(true)}
        modalCourier={mgmt.modalCourier}
        setModalCourier={mgmt.setModalCourier}
        modalConsignment={mgmt.modalConsignment}
        setModalConsignment={mgmt.setModalConsignment}
        modalNote={mgmt.modalNote}
        setModalNote={mgmt.setModalNote}
        onSaveCourier={mgmt.handleSaveCourier}
        onSaveNote={mgmt.handleSaveNote}
        onTogglePayment={mgmt.handleTogglePayment}
      />

      {/* Printable Invoice / Packing Slip Modal */}
      <OrderInvoiceModal
        order={mgmt.selectedOrder}
        isOpen={mgmt.isInvoiceOpen}
        onOpenChange={mgmt.setIsInvoiceOpen}
      />

      {/* Manual Order Creation Modal */}
      <QuickAddOrderModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
}
