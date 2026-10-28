"use client";

import React, { useState, useMemo } from "react";
import {
  Plane,
  Plus,
  Search,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2,
  Package,
  Layers,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Percent,
  Sparkles,
} from "lucide-react";
import { useAdmin, AdminPreOrder } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const BATCH_STATUSES: Array<{
  status: AdminPreOrder["batchStatus"];
  label: string;
  color: string;
  bgColor: string;
}> = [
  {
    status: "Booking Open",
    label: "Booking Open",
    color: "text-emerald-700 dark:text-emerald-300",
    bgColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800",
  },
  {
    status: "Tokyo Sourcing",
    label: "Tokyo Sourcing",
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800",
  },
  {
    status: "Air-Freight",
    label: "Air-Freight in Transit",
    color: "text-indigo-700 dark:text-indigo-300",
    bgColor: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800",
  },
  {
    status: "Customs Cleared",
    label: "Dhaka Customs Cleared",
    color: "text-amber-700 dark:text-amber-300",
    bgColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800",
  },
  {
    status: "Ready for Delivery",
    label: "Ready for Delivery",
    color: "text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:border-purple-800",
  },
];

const DEFAULT_PREORDER_IMAGES = [
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1608248597359-299318b7623a?w=800&auto=format&fit=crop&q=80",
];

export default function AdminPreOrdersPage() {
  const { preOrders, addPreOrder, updatePreOrder, deletePreOrder, brands } = useAdmin();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPreOrder, setEditingPreOrder] = useState<AdminPreOrder | null>(null);

  // Form states
  const [productName, setProductName] = useState("");
  const [japaneseName, setJapaneseName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Prestige Skincare");
  const [price, setPrice] = useState("2800");
  const [depositPercent, setDepositPercent] = useState("50");
  const [estimatedArrival, setEstimatedArrival] = useState("15 Nov 2026");
  const [slotsTotal, setSlotsTotal] = useState("30");
  const [slotsBooked, setSlotsBooked] = useState("0");
  const [batchStatus, setBatchStatus] = useState<AdminPreOrder["batchStatus"]>("Booking Open");
  const [image, setImage] = useState(DEFAULT_PREORDER_IMAGES[0] || "");
  const [active, setActive] = useState(true);
  const [notes, setNotes] = useState("");

  // Delete Alert
  const [poToDelete, setPoToDelete] = useState<AdminPreOrder | null>(null);

  // Filtered Pre-Orders
  const filteredPreOrders = useMemo(() => {
    return preOrders.filter((po) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        po.productName.toLowerCase().includes(q) ||
        po.brand.toLowerCase().includes(q) ||
        (po.japaneseName && po.japaneseName.toLowerCase().includes(q));

      const matchesStatus =
        selectedStatus === "all" || po.batchStatus === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [preOrders, searchQuery, selectedStatus]);

  // Statistics
  const totalBookedRevenue = useMemo(() => {
    return preOrders.reduce((sum, po) => {
      const depositVal = (po.price * (po.depositPercent / 100)) * po.slotsBooked;
      return sum + depositVal;
    }, 0);
  }, [preOrders]);

  const totalSlotsBooked = useMemo(
    () => preOrders.reduce((s, p) => s + p.slotsBooked, 0),
    [preOrders]
  );
  const totalSlots = useMemo(
    () => preOrders.reduce((s, p) => s + p.slotsTotal, 0),
    [preOrders]
  );
  const inFlightBatchesCount = useMemo(
    () =>
      preOrders.filter(
        (p) => p.batchStatus === "Tokyo Sourcing" || p.batchStatus === "Air-Freight"
      ).length,
    [preOrders]
  );

  const openCreateModal = () => {
    setEditingPreOrder(null);
    setProductName("");
    setJapaneseName("");
    setBrand(brands[0]?.name || "Shiseido");
    setCategory("Prestige Skincare");
    setPrice("3200");
    setDepositPercent("50");
    setEstimatedArrival("20 Nov 2026");
    setSlotsTotal("25");
    setSlotsBooked("0");
    setBatchStatus("Booking Open");
    setImage(DEFAULT_PREORDER_IMAGES[Math.floor(Math.random() * DEFAULT_PREORDER_IMAGES.length)] || "");
    setActive(true);
    setNotes("Direct Tokyo Ginza flagship purchase with verified manufacturer seal.");
    setIsModalOpen(true);
  };

  const openEditModal = (po: AdminPreOrder) => {
    setEditingPreOrder(po);
    setProductName(po.productName);
    setJapaneseName(po.japaneseName || "");
    setBrand(po.brand);
    setCategory(po.category);
    setPrice(String(po.price));
    setDepositPercent(String(po.depositPercent));
    setEstimatedArrival(po.estimatedArrival);
    setSlotsTotal(String(po.slotsTotal));
    setSlotsBooked(String(po.slotsBooked));
    setBatchStatus(po.batchStatus);
    setImage(po.image);
    setActive(po.active);
    setNotes(po.notes || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) {
      toast.error("Product name is required.");
      return;
    }

    if (editingPreOrder) {
      updatePreOrder(editingPreOrder.id, {
        productName: productName.trim(),
        japaneseName: japaneseName.trim() || undefined,
        brand: brand || "Glorious Japan",
        category,
        price: parseFloat(price) || 2500,
        depositPercent: parseInt(depositPercent, 10) || 50,
        estimatedArrival: estimatedArrival.trim() || "TBA",
        slotsTotal: parseInt(slotsTotal, 10) || 20,
        slotsBooked: parseInt(slotsBooked, 10) || 0,
        batchStatus,
        image: image.trim() || DEFAULT_PREORDER_IMAGES[0] || "",
        active,
        notes: notes.trim() || undefined,
      });
      toast.success(`Pre-order "${productName}" updated! 🌸`);
    } else {
      addPreOrder({
        productName: productName.trim(),
        japaneseName: japaneseName.trim() || undefined,
        brand: brand || "Glorious Japan",
        category,
        price: parseFloat(price) || 2500,
        depositPercent: parseInt(depositPercent, 10) || 50,
        estimatedArrival: estimatedArrival.trim() || "TBA",
        slotsTotal: parseInt(slotsTotal, 10) || 20,
        slotsBooked: parseInt(slotsBooked, 10) || 0,
        batchStatus,
        image: image.trim() || DEFAULT_PREORDER_IMAGES[0] || "",
        active,
        notes: notes.trim() || undefined,
      });
      toast.success(`Pre-order campaign launched for "${productName}"! 🌸`);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!poToDelete) return;
    deletePreOrder(poToDelete.id);
    toast.success(`Pre-order batch "${poToDelete.productName}" removed.`);
    setPoToDelete(null);
  };

  const handleQuickStatusChange = (po: AdminPreOrder, newStatus: AdminPreOrder["batchStatus"]) => {
    updatePreOrder(po.id, { batchStatus: newStatus });
    toast.success(`Batch status updated to "${newStatus}" for ${po.productName}!`);
  };

  const handleToggleActive = (po: AdminPreOrder) => {
    updatePreOrder(po.id, { active: !po.active });
    toast.success(`Pre-order booking ${!po.active ? "reopened" : "paused"} for ${po.productName}.`);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            <span>Air Cargo Pipeline</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary font-bold">Tokyo Direct Pre-Orders</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1 flex items-center gap-2.5">
            <Plane className="h-7 w-7 text-primary" />
            <span>Pre-Order Flights & Quota Management</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage advance Japanese skin care bookings, Tokyo warehouse arrival ETAs, 50% deposit tracking, and air-freight batch progress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={openCreateModal}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Launch Pre-Order Campaign</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Active Pre-Orders</span>
            <Plane className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {preOrders.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Tokyo flight allocation SKUs
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Booked Deposits</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            ৳{totalBookedRevenue.toLocaleString("en-BD")}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Collected via bKash / Card
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Quota Reserved</span>
            <Layers className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {totalSlots > 0 ? Math.round((totalSlotsBooked / totalSlots) * 100) : 0}%
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            {totalSlotsBooked} of {totalSlots} seats booked
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>In-Flight / Sourcing</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {inFlightBatchesCount}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Active air-transit shipments
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-card p-3 rounded-xl border border-border/70">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pre-order product, Japanese kanji, brand..."
            className="pl-9 bg-background/60"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <Button
            variant={selectedStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("all")}
            className="text-xs shrink-0"
          >
            All ({preOrders.length})
          </Button>
          {BATCH_STATUSES.map((b) => {
            const count = preOrders.filter((p) => p.batchStatus === b.status).length;
            return (
              <Button
                key={b.status}
                variant={selectedStatus === b.status ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus(b.status)}
                className="text-xs shrink-0"
              >
                {b.status} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Pre-Orders List */}
      <div className="space-y-4">
        {filteredPreOrders.map((po) => {
          const bookedPercent = Math.min(
            100,
            Math.round((po.slotsBooked / po.slotsTotal) * 100)
          );
          const currentBatchConfig =
            BATCH_STATUSES.find((b) => b.status === po.batchStatus) || BATCH_STATUSES[0];
          const depositAmount = (po.price * (po.depositPercent / 100)).toFixed(0);

          return (
            <div
              key={po.id}
              className="rounded-xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                {/* Product info with thumbnail */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative h-20 w-20 rounded-xl border border-border/80 overflow-hidden bg-muted shrink-0 shadow-2xs">
                    <img
                      src={po.image}
                      alt={po.productName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80";
                      }}
                    />
                    {!po.active && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                          Paused
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-[10px] font-bold">
                        {po.brand}
                      </Badge>
                      {po.japaneseName && (
                        <span className="font-mono text-xs text-muted-foreground font-semibold">
                          {po.japaneseName}
                        </span>
                      )}
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                        {po.category}
                      </Badge>
                    </div>

                    <h3 className="text-base font-bold text-foreground">
                      {po.productName}
                    </h3>

                    {po.notes && (
                      <p className="text-xs text-muted-foreground line-clamp-1 italic">
                        {po.notes}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs pt-1">
                      <span className="font-bold text-foreground text-sm">
                        ৳{po.price.toLocaleString("en-BD")}
                      </span>
                      <span className="text-muted-foreground">
                        Required Deposit: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{po.depositPercent}% (৳{depositAmount})</strong>
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        ETA: <strong>{po.estimatedArrival}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quota reservation progress */}
                <div className="w-full lg:w-64 space-y-2 p-3 rounded-lg bg-secondary/30 border border-border/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground">Quota Reserved</span>
                    <span className="font-bold text-foreground">
                      {po.slotsBooked} / {po.slotsTotal} slots ({bookedPercent}%)
                    </span>
                  </div>
                  <Progress value={bookedPercent} className="h-2" />
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{po.slotsTotal - po.slotsBooked} slots remaining</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      ৳{(parseFloat(depositAmount) * po.slotsBooked).toLocaleString("en-BD")} collected
                    </span>
                  </div>
                </div>

                {/* Batch status dropdown & actions */}
                <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-border/60">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Batch Stage
                    </span>
                    <Select
                      value={po.batchStatus}
                      onValueChange={(val) =>
                        handleQuickStatusChange(po, val as AdminPreOrder["batchStatus"])
                      }
                    >
                      <SelectTrigger className={`h-8 text-xs font-semibold ${currentBatchConfig?.bgColor}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BATCH_STATUSES.map((b) => (
                          <SelectItem key={b.status} value={b.status} className="text-xs">
                            {b.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-muted-foreground">Booking</span>
                      <Switch
                        checked={po.active}
                        onCheckedChange={() => handleToggleActive(po)}
                        title={po.active ? "Pause Pre-Orders" : "Open Pre-Orders"}
                      />
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(po)}
                      className="h-8 gap-1.5 text-xs"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Edit</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPoToDelete(po)}
                      className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPreOrders.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
          <Plane className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
          <h3 className="font-bold text-foreground text-lg">No Pre-Orders Found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search filters or launch a new Tokyo air-freight pre-order campaign.
          </p>
          <Button onClick={openCreateModal} className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            <span>Launch Pre-Order Campaign</span>
          </Button>
        </div>
      )}

      {/* Add / Edit Pre-Order Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display text-xl">
                <Plane className="h-5 w-5 text-primary" />
                <span>{editingPreOrder ? "Edit Pre-Order Campaign" : "Launch Tokyo Pre-Order Campaign"}</span>
              </DialogTitle>
              <DialogDescription>
                Configure Tokyo direct air-cargo arrival dates, quota reservation limits, and required customer advance deposits.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Product Name & Japanese Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="po-name" className="text-xs font-semibold">
                    Product Title <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="po-name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. SK-II Facial Treatment Essence Limited Tokyo Edition"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="po-japanese" className="text-xs font-semibold">
                    Japanese Name (Kanji/Kana)
                  </Label>
                  <Input
                    id="po-japanese"
                    value={japaneseName}
                    onChange={(e) => setJapaneseName(e.target.value)}
                    placeholder="e.g. フェイシャルトリートメントエッセンス"
                  />
                </div>
              </div>

              {/* Brand & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="po-brand" className="text-xs font-semibold">
                    Brand Partner
                  </Label>
                  <Select value={brand} onValueChange={setBrand}>
                    <SelectTrigger id="po-brand">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => (
                        <SelectItem key={b.name} value={b.name}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="po-cat" className="text-xs font-semibold">
                    Skincare Category
                  </Label>
                  <Input
                    id="po-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Prestige Essence, Sunscreen"
                  />
                </div>
              </div>

              {/* Price & Deposit Percent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="po-price" className="text-xs font-semibold">
                    Full Retail Price (BDT ৳) <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="po-price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min={1}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="po-deposit" className="text-xs font-semibold">
                    Advance Booking Deposit (% of Price)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="po-deposit"
                      type="number"
                      value={depositPercent}
                      onChange={(e) => setDepositPercent(e.target.value)}
                      min={10}
                      max={100}
                    />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      = ৳{((parseFloat(price) || 0) * ((parseInt(depositPercent, 10) || 50) / 100)).toFixed(0)} deposit
                    </span>
                  </div>
                </div>
              </div>

              {/* Estimated Arrival Date & Batch Stage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="po-eta" className="text-xs font-semibold">
                    Estimated Arrival in Dhaka (ETA) <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="po-eta"
                    value={estimatedArrival}
                    onChange={(e) => setEstimatedArrival(e.target.value)}
                    placeholder="e.g. 15 Nov 2026"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="po-stage" className="text-xs font-semibold">
                    Current Air-Freight Batch Stage
                  </Label>
                  <Select
                    value={batchStatus}
                    onValueChange={(val) => setBatchStatus(val as AdminPreOrder["batchStatus"])}
                  >
                    <SelectTrigger id="po-stage">
                      <SelectValue placeholder="Select batch stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {BATCH_STATUSES.map((b) => (
                        <SelectItem key={b.status} value={b.status}>
                          {b.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Slots Total & Slots Booked */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="po-total-slots" className="text-xs font-semibold">
                    Total Flight Quota Allocation (Slots)
                  </Label>
                  <Input
                    id="po-total-slots"
                    type="number"
                    value={slotsTotal}
                    onChange={(e) => setSlotsTotal(e.target.value)}
                    min={1}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="po-booked-slots" className="text-xs font-semibold">
                    Currently Booked Slots
                  </Label>
                  <Input
                    id="po-booked-slots"
                    type="number"
                    value={slotsBooked}
                    onChange={(e) => setSlotsBooked(e.target.value)}
                    min={0}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="po-image" className="text-xs font-semibold">
                  Pre-Order Product Image URL <span className="text-rose-500">*</span>
                </Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="po-image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="flex-1"
                  />
                  {image && (
                    <div className="relative h-10 w-14 rounded-md border border-border overflow-hidden bg-muted shrink-0">
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label htmlFor="po-notes" className="text-xs font-semibold">
                  Tokyo Sourcing / Logistics Notes
                </Label>
                <Textarea
                  id="po-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Sourced fresh from Ginza flagship store; comes with official batch code verification..."
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <Label htmlFor="po-active" className="text-xs font-semibold">
                    Pre-Order Booking Active
                  </Label>
                  <p className="text-[11px] text-muted-foreground">
                    When active, customers can pay advance deposit and reserve their quota slot
                  </p>
                </div>
                <Switch
                  id="po-active"
                  checked={active}
                  onCheckedChange={setActive}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
                {editingPreOrder ? "Save Pre-Order Changes" : "Launch Pre-Order Batch"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog
        open={!!poToDelete}
        onOpenChange={(open) => !open && setPoToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              <span>Delete Pre-Order Campaign</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{poToDelete?.productName}</strong>?
              This will remove the pre-order campaign and customer reservation quota.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

