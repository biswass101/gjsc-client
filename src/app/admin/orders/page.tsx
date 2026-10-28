"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ShoppingBag,
  Truck,
  Phone,
  MessageCircle,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Printer,
  Download,
  DollarSign,
  User,
  MapPin,
  Package,
} from "lucide-react";
import { useAdmin, AdminOrder } from "@/context/admin-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const PIPELINE_STAGES = [
  "All",
  "Pending",
  "Processing",
  "Quality Checked",
  "Dispatched",
  "In Transit",
  "Delivered",
  "Cancelled",
] as const;

const STATUS_STYLES: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300",
  "In Transit": "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300",
  Dispatched: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300",
  "Quality Checked": "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300",
  Processing: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300",
  Pending: "bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-300",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300",
};

const COURIER_OPTIONS = ["Pathao Express", "Steadfast", "RedX", "Paperfly", "In-House", "None"] as const;

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, updateOrderPayment, assignCourier, addOrderNote, deleteOrder } = useAdmin();

  // Filters State
  const [activeStage, setActiveStage] = useState<string>("All");
  const [q, setQ] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
  const [courierFilter, setCourierFilter] = useState("All");
  const [sort, setSort] = useState("newest");
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
      const matchQ =
        !q ||
        o.id.toLowerCase().includes(q.toLowerCase()) ||
        o.customerName.toLowerCase().includes(q.toLowerCase()) ||
        o.customerPhone.includes(q) ||
        (o.consignmentId && o.consignmentId.toLowerCase().includes(q.toLowerCase()));

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
    const finalConsignment = modalConsignment.trim() || `${modalCourier.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    assignCourier(selectedOrder.id, modalCourier, finalConsignment);
    setSelectedOrder((prev) =>
      prev ? { ...prev, courier: modalCourier, consignmentId: finalConsignment } : null
    );
    toast.success(`Consignment ${finalConsignment} assigned with ${modalCourier}! 🚚`);
  };

  // Sync notes update
  const handleSaveNote = () => {
    if (!selectedOrder) return;
    addOrderNote(selectedOrder.id, modalNote);
    toast.success("Internal warehouse note saved!");
  };

  // Export filtered orders
  const handleExportCSV = () => {
    const rows = [
      ["Order ID", "Customer", "Phone", "Email", "Address", "City", "Date", "Payment", "Payment Status", "TrxID", "Status", "Courier", "Consignment", "Total BDT"],
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

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-primary">Bangladesh Logistics Operations</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              {orders.length} Total Parcels
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
            Order Lifecycle & Courier Dispatch Center
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Pathao Express & Steadfast API integration, bKash TrxID verification, and digital packing slips.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="rounded-full text-xs h-8 px-3.5 gap-1.5"
          >
            <Download className="h-3.5 w-3.5 text-primary" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Pipeline Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {PIPELINE_STAGES.map((stage) => {
          const count =
            stage === "All"
              ? orders.length
              : orders.filter((o) => o.fulfillmentStatus === stage).length;
          const isActive = activeStage === stage;

          return (
            <button
              key={stage}
              type="button"
              onClick={() => {
                setActiveStage(stage);
                setPage(1);
              }}
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span>{stage}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-card text-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="surface-card p-4 space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Query input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search by order ID, customer name, phone, or courier..."
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

          {/* Payment & Courier Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={methodFilter}
              onChange={(e) => {
                setMethodFilter(e.target.value);
                setPage(1);
              }}
              className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
            >
              <option value="All">All Payment Methods</option>
              <option value="bKash">bKash</option>
              <option value="COD">Cash on Delivery (COD)</option>
              <option value="Card">Card</option>
            </select>

            <select
              value={courierFilter}
              onChange={(e) => {
                setCourierFilter(e.target.value);
                setPage(1);
              }}
              className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
            >
              <option value="All">All Couriers</option>
              {COURIER_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs font-semibold"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="total_desc">Total: High to Low</option>
              <option value="total_asc">Total: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/70 bg-secondary/30 text-muted-foreground font-semibold">
                <th className="py-3 px-4">Order Reference</th>
                <th className="py-3 px-4">Customer & Location</th>
                <th className="py-3 px-4">Items / SKUs</th>
                <th className="py-3 px-4">Payment & Trx</th>
                <th className="py-3 px-4">Courier Partner</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-center">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {pagedOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    No orders found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                pagedOrders.map((order) => {
                  const itemsCount = order.items.reduce((acc, i) => acc + i.qty, 0);

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-secondary/20 transition-colors cursor-pointer"
                      onClick={() => handleOpenDetails(order)}
                    >
                      {/* Order Reference & Date */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-primary text-xs">
                          {order.id}
                        </span>
                        <span className="block text-[11px] text-muted-foreground mt-0.5">
                          {order.dateFormatted || order.date}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-foreground text-xs">
                          {order.customerName}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {order.customerPhone} • {order.city}
                        </p>
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground">
                            {itemsCount} {itemsCount === 1 ? "unit" : "units"}
                          </span>
                          <span className="text-[11px] text-muted-foreground truncate max-w-[150px]">
                            {order.items[0]?.name || "Skincare product"}
                          </span>
                        </div>
                      </td>

                      {/* Payment */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <span className="inline-block rounded border border-border/80 px-2 py-0.2 text-[10px] font-semibold">
                            {order.paymentMethod}
                          </span>
                          <span
                            className={`block text-[10px] font-bold ${
                              order.paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600"
                            }`}
                          >
                            ● {order.paymentStatus}
                          </span>
                        </div>
                      </td>

                      {/* Courier */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-foreground text-xs">
                          {order.courier !== "None" ? order.courier : "Not Booked"}
                        </p>
                        {order.consignmentId && (
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {order.consignmentId}
                          </span>
                        )}
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-foreground text-sm">
                        ৳{order.total.toLocaleString()}
                      </td>

                      {/* Fulfillment Status Selector */}
                      <td
                        className="py-3.5 px-4 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={order.fulfillmentStatus}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className={`rounded-full px-3 py-1 text-[11px] font-bold border cursor-pointer ${
                            STATUS_STYLES[order.fulfillmentStatus] || "bg-secondary text-foreground"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Quality Checked">Quality Checked</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td
                        className="py-3.5 px-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDetails(order)}
                          className="rounded-full text-xs h-7 px-3 text-primary hover:bg-primary/10"
                        >
                          Inspect
                        </Button>
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
          <span>
            Showing {pagedOrders.length} of {sortedOrders.length} filtered parcels
          </span>

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

      {/* Comprehensive Order Detail & Logistics Drawer/Modal */}
      {selectedOrder && (
        <Dialog
          open={Boolean(selectedOrder)}
          onOpenChange={(open) => {
            if (!open) setSelectedOrder(null);
          }}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="border-b border-border/60 pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <DialogTitle className="font-display text-xl flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Order #{selectedOrder.id}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsInvoiceOpen(true)}
                    className="rounded-full text-xs h-7 px-3 gap-1.5"
                  >
                    <Printer className="h-3 w-3 text-primary" />
                    Print Packing Slip
                  </Button>
                </div>
              </div>
              <DialogDescription className="text-xs">
                Placed on {selectedOrder.dateFormatted || selectedOrder.date} • Recorded by System
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pt-3 text-xs">
              {/* Row 1: Customer Contact & Delivery Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer card */}
                <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-2">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-primary" /> Customer Info
                    </span>
                    <span className="text-[10px] text-muted-foreground">ID: Verified Buyer</span>
                  </div>

                  <p className="font-bold text-foreground text-sm">{selectedOrder.customerName}</p>
                  <p className="text-muted-foreground">{selectedOrder.customerEmail}</p>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`tel:${selectedOrder.customerPhone}`}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground hover:bg-secondary"
                    >
                      <Phone className="h-3 w-3 text-emerald-600" />
                      {selectedOrder.customerPhone}
                    </a>

                    <a
                      href={`https://wa.me/88${selectedOrder.customerPhone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-emerald-700"
                    >
                      <MessageCircle className="h-3 w-3" />
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Delivery Address & Hub */}
                <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-2">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary" /> Delivery Destination
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold">
                      {selectedOrder.city}, {selectedOrder.division}
                    </span>
                  </div>

                  <p className="text-foreground leading-relaxed mt-1 font-medium">
                    {selectedOrder.address}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Area Hub: {selectedOrder.area || selectedOrder.city} • Bangladesh
                  </p>
                </div>
              </div>

              {/* Row 2: Courier Dispatch & Payment Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Courier Assignment */}
                <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Truck className="h-3.5 w-3.5 text-primary" /> Courier Integration
                    </span>
                    {selectedOrder.trackingUrl && (
                      <a
                        href={selectedOrder.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-primary hover:underline flex items-center gap-0.5"
                      >
                        Track Live <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-[11px] font-medium text-muted-foreground">Courier</Label>
                      <select
                        value={modalCourier}
                        onChange={(e) => setModalCourier(e.target.value as any)}
                        className="mt-1 h-8 w-full rounded-md border border-input bg-background px-2 text-xs"
                      >
                        {COURIER_OPTIONS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label className="text-[11px] font-medium text-muted-foreground">Consignment ID</Label>
                      <Input
                        value={modalConsignment}
                        onChange={(e) => setModalConsignment(e.target.value)}
                        placeholder="e.g. PTH-982104"
                        className="mt-1 h-8 rounded-md text-xs font-mono"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleSaveCourier}
                    className="w-full rounded-full text-xs h-7"
                  >
                    Assign / Book Courier Rider
                  </Button>
                </div>

                {/* Payment Verification */}
                <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-primary" /> Payment Ledger
                    </span>
                    <span className="font-semibold">{selectedOrder.paymentMethod}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-muted-foreground">Status</p>
                      <span
                        className={`inline-block font-bold text-xs ${
                          selectedOrder.paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600"
                        }`}
                      >
                        ● {selectedOrder.paymentStatus}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] text-muted-foreground">Transaction ID</p>
                      <span className="font-mono font-semibold text-foreground">
                        {selectedOrder.trxId || "COD Settlement"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      type="button"
                      size="sm"
                      variant={selectedOrder.paymentStatus === "Paid" ? "outline" : "default"}
                      onClick={() => {
                        const next = selectedOrder.paymentStatus === "Paid" ? "Pending" : "Paid";
                        updateOrderPayment(selectedOrder.id, next, selectedOrder.trxId || "BKH-VERIFIED");
                        setSelectedOrder((prev) => (prev ? { ...prev, paymentStatus: next } : null));
                        toast.success(`Payment status toggled to ${next}!`);
                      }}
                      className="flex-1 rounded-full text-xs h-7"
                    >
                      {selectedOrder.paymentStatus === "Paid" ? "Mark Pending" : "Mark as Paid"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Row 3: Itemized Breakdown */}
              <div className="rounded-xl border border-border/80 bg-card p-4 space-y-3">
                <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                  Itemized Japanese Skincare Products ({selectedOrder.items.length})
                </h4>

                <div className="divide-y divide-border/50">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded-lg object-cover border border-border/70"
                        />
                        <div>
                          <p className="font-semibold text-foreground text-xs">{item.name}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {item.brand} • Size: {item.size} • Qty: {item.qty}
                          </p>
                        </div>
                      </div>

                      <div className="text-right font-mono">
                        <p className="font-semibold text-foreground">
                          ৳{(item.price * item.qty).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          ৳{item.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1 text-right">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal:</span>
                    <span className="font-mono">৳{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee:</span>
                    <span className="font-mono">৳{selectedOrder.shippingFee}</span>
                  </div>
                  {selectedOrder.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Voucher Discount:</span>
                      <span className="font-mono">-৳{selectedOrder.discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-foreground font-bold text-sm pt-1 border-t border-border/50">
                    <span>Total Amount (BDT):</span>
                    <span className="font-mono text-primary">
                      ৳{selectedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 4: Chronological Audit Trail Timeline */}
              <div className="rounded-xl border border-border/80 bg-secondary/10 p-4 space-y-3">
                <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                  Chronological Audit Trail & Status History
                </h4>

                <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/80">
                  {selectedOrder.timeline.map((event) => (
                    <div key={event.id} className="relative space-y-0.5">
                      <span className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{event.title}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {event.time}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-[11px]">{event.description}</p>
                      <p className="text-[10px] text-muted-foreground/60 italic">by {event.by}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 5: Internal Warehouse Notes */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Internal Warehouse / Courier Notes</Label>
                <div className="flex gap-2">
                  <Input
                    value={modalNote}
                    onChange={(e) => setModalNote(e.target.value)}
                    placeholder="e.g. Call recipient 30 mins prior to delivery."
                    className="h-8 rounded-md text-xs flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleSaveNote}
                    className="rounded-md text-xs h-8 px-3"
                  >
                    Save Note
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-border/60">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedOrder(null)}
                className="rounded-full text-xs"
              >
                Close Details
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Printable Invoice / Packing Slip Modal */}
      {selectedOrder && isInvoiceOpen && (
        <Dialog open={isInvoiceOpen} onOpenChange={setIsInvoiceOpen}>
          <DialogContent className="max-w-2xl bg-white text-black p-8 font-sans">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-black">
                    GLORIOUS JAPAN
                  </h2>
                  <p className="text-[11px] text-gray-500">
                    Premium Tokyo Skincare • Banani Hub, Dhaka
                  </p>
                  <p className="text-[11px] text-gray-500">Hotline: +880 1700-000000</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-black text-white text-xs font-bold px-2 py-0.5 rounded">
                    PACKING SLIP
                  </span>
                  <p className="font-mono font-bold mt-1 text-sm">{selectedOrder.id}</p>
                  <p className="text-[11px] text-gray-500">{selectedOrder.date}</p>
                </div>
              </div>

              {/* Recipient & Courier */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-bold uppercase tracking-wider text-gray-500">Deliver To:</p>
                  <p className="font-bold text-sm mt-0.5">{selectedOrder.customerName}</p>
                  <p>{selectedOrder.address}</p>
                  <p>
                    {selectedOrder.city}, {selectedOrder.division}
                  </p>
                  <p className="font-semibold mt-1">Phone: {selectedOrder.customerPhone}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold uppercase tracking-wider text-gray-500">Logistics Courier:</p>
                  <p className="font-bold text-sm mt-0.5">{selectedOrder.courier}</p>
                  <p className="font-mono">Consignment: {selectedOrder.consignmentId || "N/A"}</p>
                  <p className="font-semibold mt-1">Payment: {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-black text-black font-bold">
                    <th className="py-2">Item Description</th>
                    <th className="py-2">Brand</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Price</th>
                    <th className="py-2 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-2 font-semibold">{it.name} ({it.size})</td>
                      <td className="py-2 text-gray-600">{it.brand}</td>
                      <td className="py-2 text-center font-bold">{it.qty}</td>
                      <td className="py-2 text-right">৳{it.price.toLocaleString()}</td>
                      <td className="py-2 text-right font-bold">৳{(it.price * it.qty).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="border-t pt-3 space-y-1 text-right text-xs">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>৳{selectedOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee:</span>
                  <span>৳{selectedOrder.shippingFee}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Discount:</span>
                    <span>-৳{selectedOrder.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm border-t pt-1">
                  <span>TOTAL AMOUNT:</span>
                  <span>৳{selectedOrder.total.toLocaleString()} BDT</span>
                </div>
              </div>

              <div className="border-t pt-4 text-center text-[10px] text-gray-500">
                Thank you for choosing authentic Japanese Skincare. 🌸 • www.gloriousjapan.com
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="rounded-full text-xs"
              >
                Send to Printer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
