"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import type { AdminOrder } from "@/context/admin-context";
import type { PipelineStage, OrderSortOption } from "../types";

export function useOrderManagement(
  orders: AdminOrder[],
  updateOrderStatus: (id: string, status: AdminOrder["fulfillmentStatus"]) => void,
  updateOrderPayment: (id: string, status: AdminOrder["paymentStatus"], trxId?: string) => void,
  assignCourier: (id: string, courier: AdminOrder["courier"], consignmentId?: string) => void,
  addOrderNote: (id: string, note: string) => void,
  deleteOrder: (id: string) => void,
) {
  // Filters State
  const [activeStage, setActiveStage] = useState<PipelineStage>("All");
  const [q, setQ] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
  const [courierFilter, setCourierFilter] = useState("All");
  const [sort, setSort] = useState<OrderSortOption>("newest");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Detail Modal State
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // Edit fields inside modal
  const [modalCourier, setModalCourier] = useState<AdminOrder["courier"]>("Pathao Express");
  const [modalConsignment, setModalConsignment] = useState("");
  const [modalNote, setModalNote] = useState("");

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStage = activeStage === "All" || o.fulfillmentStatus === activeStage;
      const matchMethod = methodFilter === "All" || o.paymentMethod === methodFilter;
      const matchCourier = courierFilter === "All" || o.courier === courierFilter;
      const query = q.toLowerCase().trim();
      const matchQ =
        !query ||
        (o.id || "").toLowerCase().includes(query) ||
        (o.customerName || "").toLowerCase().includes(query) ||
        (o.customerPhone || "").includes(query) ||
        Boolean(o.consignmentId && o.consignmentId.toLowerCase().includes(query));

      return matchStage && matchMethod && matchCourier && matchQ;
    });
  }, [orders, activeStage, methodFilter, courierFilter, q]);

  // Sorted orders
  const sortedOrders = useMemo(() => {
    const list = [...filteredOrders];
    if (sort === "oldest") return list.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "total_desc") return list.sort((a, b) => b.total - a.total);
    if (sort === "total_asc") return list.sort((a, b) => a.total - b.total);
    return list.sort((a, b) => b.date.localeCompare(a.date)); // newest default
  }, [filteredOrders, sort]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedOrders.slice(start, start + pageSize);
  }, [sortedOrders, currentPage, pageSize]);

  // Handle open order details modal
  const handleOpenDetails = (order: AdminOrder) => {
    setSelectedOrder(order);
    setModalCourier(order.courier);
    setModalConsignment(order.consignmentId || "");
    setModalNote(order.notes || "");
  };

  // Sync courier update
  const handleSaveCourier = () => {
    if (!selectedOrder) return;
    const finalConsignment =
      modalConsignment.trim() ||
      `${modalCourier.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    assignCourier(selectedOrder.id, modalCourier, finalConsignment);
    setSelectedOrder((prev) =>
      prev ? { ...prev, courier: modalCourier, consignmentId: finalConsignment } : null,
    );
    toast.success(`Consignment ${finalConsignment} assigned with ${modalCourier}! 🚚`);
  };

  // Sync notes update
  const handleSaveNote = () => {
    if (!selectedOrder) return;
    addOrderNote(selectedOrder.id, modalNote);
    toast.success("Internal warehouse note saved!");
  };

  // Toggle payment status
  const handleTogglePayment = (order: AdminOrder) => {
    const next = order.paymentStatus === "Paid" ? "Pending" : "Paid";
    updateOrderPayment(order.id, next, order.trxId || "BKH-VERIFIED");
    setSelectedOrder((prev) => (prev ? { ...prev, paymentStatus: next } : null));
    toast.success(`Payment status toggled to ${next}!`);
  };

  // Export filtered orders to CSV
  const handleExportCSV = () => {
    const rows = [
      [
        "Order ID",
        "Customer",
        "Phone",
        "Email",
        "Address",
        "City",
        "Date",
        "Payment",
        "Payment Status",
        "TrxID",
        "Status",
        "Courier",
        "Consignment",
        "Total BDT",
      ],
      ...filteredOrders.map((o) => [
        o.id,
        o.customerName,
        o.customerPhone,
        o.customerEmail,
        o.address,
        o.city,
        o.date,
        o.paymentMethod,
        o.paymentStatus,
        o.trxId || "N/A",
        o.fulfillmentStatus,
        o.courier,
        o.consignmentId || "N/A",
        o.total.toString(),
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GJSC_Orders_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Orders exported to CSV! 📋");
  };

  return {
    activeStage,
    setActiveStage,
    q,
    setQ,
    methodFilter,
    setMethodFilter,
    courierFilter,
    setCourierFilter,
    sort,
    setSort,
    page,
    setPage,
    pageSize,
    selectedOrder,
    setSelectedOrder,
    isInvoiceOpen,
    setIsInvoiceOpen,
    modalCourier,
    setModalCourier,
    modalConsignment,
    setModalConsignment,
    modalNote,
    setModalNote,
    filteredOrders,
    sortedOrders,
    totalPages,
    currentPage,
    pagedOrders,
    handleOpenDetails,
    handleSaveCourier,
    handleSaveNote,
    handleTogglePayment,
    handleExportCSV,
    updateOrderStatus,
    deleteOrder,
  };
}
