"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Search,
  SlidersHorizontal,
  X,
  User,
  Users,
  Award,
  Sparkles,
  MessageCircle,
  Plus,
  Download,
  Trash2,
  Edit2,
  Droplets,
  Calendar,
} from "lucide-react";
import { useAdmin, AdminCustomer } from "@/context/admin-context";
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

const TIER_STYLES: Record<string, string> = {
  Platinum: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300",
  VIP: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300",
  Standard: "bg-secondary text-foreground border-border/80",
  "At Risk": "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300",
};

export default function AdminCustomersPage() {
  const { customers, orders, addCustomer, updateCustomer, deleteCustomer } = useAdmin();

  // Filters State
  const [q, setQ] = useState("");
  const [tierFilter, setTierFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [sort, setSort] = useState("spent_desc");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Modals
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Add Customer Form
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [addCity, setAddCity] = useState("Dhaka");
  const [addDivision, setAddDivision] = useState("Dhaka");
  const [addSkinType, setAddSkinType] = useState("Combination");
  const [addTier, setAddTier] = useState<AdminCustomer["tier"]>("Standard");
  const [addNotes, setAddNotes] = useState("");

  // Customer Note editing inside drawer
  const [editNote, setEditNote] = useState("");

  // CRM Analytics
  const totalLTV = useMemo(
    () => customers.reduce((sum, c) => sum + c.totalSpent, 0),
    [customers]
  );

  const vipCount = useMemo(
    () => customers.filter((c) => c.tier === "VIP" || c.tier === "Platinum").length,
    [customers]
  );

  const citiesList = useMemo(() => {
    return ["All", ...Array.from(new Set(customers.map((c) => c.city)))];
  }, [customers]);

  // Filtered
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.email.toLowerCase().includes(q.toLowerCase()) ||
        c.phone.includes(q);

      const matchTier = tierFilter === "All" || c.tier === tierFilter;
      const matchCity = cityFilter === "All" || c.city === cityFilter;

      return matchQ && matchTier && matchCity;
    });
  }, [customers, q, tierFilter, cityFilter]);

  // Sorted
  const sortedCustomers = useMemo(() => {
    const list = [...filteredCustomers];
    if (sort === "spent_desc") return list.sort((a, b) => b.totalSpent - a.totalSpent);
    if (sort === "orders_desc") return list.sort((a, b) => b.ordersCount - a.ordersCount);
    if (sort === "name_asc") return list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filteredCustomers, sort]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedCustomers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedCustomers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedCustomers.slice(start, start + pageSize);
  }, [sortedCustomers, currentPage, pageSize]);

  // Handle Create Customer
  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim() || !addPhone.trim()) {
      toast.error("Please provide customer name and phone.");
      return;
    }

    addCustomer({
      name: addName.trim(),
      email: addEmail.trim() || `${addName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: addPhone.trim(),
      city: addCity,
      division: addDivision,
      tier: addTier,
      status: "Active",
      skinType: addSkinType,
      skinConcerns: ["Hydration", "Brightening"],
      notes: addNotes.trim() || "Customer added via CRM.",
    });

    toast.success(`Customer ${addName} added to CRM! 🌸`);
    setIsAddOpen(false);
    setAddName("");
    setAddPhone("");
    setAddEmail("");
  };

  // Open detail drawer
  const handleOpenCustomer = (c: AdminCustomer) => {
    setSelectedCustomer(c);
    setEditNote(c.notes || "");
  };

  // Save note in drawer
  const handleSaveNote = () => {
    if (!selectedCustomer) return;
    updateCustomer(selectedCustomer.id, { notes: editNote });
    setSelectedCustomer((prev) => (prev ? { ...prev, notes: editNote } : null));
    toast.success("CRM customer note saved!");
  };

  // Export CSV
  const handleExportCSV = () => {
    const rows = [
      ["ID", "Name", "Email", "Phone", "City", "Orders", "Total Spent BDT", "AOV", "Tier", "Joined", "Skin Type"],
      ...filteredCustomers.map((c) => [
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
  };

  // Customer's matching orders
  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return orders.filter(
      (o) =>
        o.customerEmail.toLowerCase() === selectedCustomer.email.toLowerCase() ||
        o.customerPhone === selectedCustomer.phone ||
        o.customerName.toLowerCase() === selectedCustomer.name.toLowerCase()
    );
  }, [orders, selectedCustomer]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-primary">Customer Relationship Management</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              {customers.length} Accounts
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
            Customer Profiles & Japanese Skincare CRM
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Lifetime value analysis, skin diagnostic history, repeat order velocity, and direct WhatsApp engagement.
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
            Export CSV
          </Button>

          <Button
            size="sm"
            onClick={() => setIsAddOpen(true)}
            className="rounded-full text-xs h-8 px-4 gap-1.5 shadow-2xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* CRM Health Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="surface-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Total Customer LTV
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">
            ৳{totalLTV.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
            +18.4% YoY spend growth
          </p>
        </div>

        <div className="surface-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            VIP & Platinum Ritualists
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-purple-600">
            {vipCount}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Top tier Japanese skincare devotees
          </p>
        </div>

        <div className="surface-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Average LTV per Buyer
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">
            ৳{customers.length > 0 ? Math.round(totalLTV / customers.length).toLocaleString() : 0}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Across Dhaka & divisions
          </p>
        </div>

        <div className="surface-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Active Repeat Rate
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-emerald-600">
            46.8%
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Highest in serums & cleansers
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="surface-card p-4 space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email, or mobile number..."
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

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={tierFilter}
              onChange={(e) => {
                setTierFilter(e.target.value);
                setPage(1);
              }}
              className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
            >
              <option value="All">All Tiers</option>
              <option value="Platinum">Platinum VIP</option>
              <option value="VIP">VIP</option>
              <option value="Standard">Standard</option>
            </select>

            <select
              value={cityFilter}
              onChange={(e) => {
                setCityFilter(e.target.value);
                setPage(1);
              }}
              className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs"
            >
              {citiesList.map((city) => (
                <option key={city} value={city}>
                  {city === "All" ? "All Locations" : city}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-8 rounded-full border border-border/80 bg-background px-3 text-xs font-semibold"
            >
              <option value="spent_desc">Sort: Highest LTV</option>
              <option value="orders_desc">Sort: Most Orders</option>
              <option value="name_asc">Sort: Name A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/70 bg-secondary/30 text-muted-foreground font-semibold">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Skin Profile</th>
                <th className="py-3 px-4 text-center">Orders</th>
                <th className="py-3 px-4 text-right">Lifetime Spend (BDT)</th>
                <th className="py-3 px-4 text-center">VIP Tier</th>
                <th className="py-3 px-4 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {pagedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    No customers found matching the search criteria.
                  </td>
                </tr>
              ) : (
                pagedCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    onClick={() => handleOpenCustomer(cust)}
                    className="hover:bg-secondary/20 transition-colors cursor-pointer"
                  >
                    {/* Customer Name & Email */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0">
                          {cust.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-xs">{cust.name}</p>
                          <p className="text-[11px] text-muted-foreground">{cust.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-foreground">{cust.city}</span>
                      <span className="block text-[11px] text-muted-foreground">{cust.division}</span>
                    </td>

                    {/* Skin Profile */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 rounded-md bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-foreground">
                        <Droplets className="h-2.5 w-2.5 text-primary" />
                        {cust.skinType}
                      </span>
                    </td>

                    {/* Orders count */}
                    <td className="py-3.5 px-4 text-center font-bold text-foreground font-mono">
                      {cust.ordersCount}
                    </td>

                    {/* Total Spent */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-foreground">
                      ৳{cust.totalSpent.toLocaleString()}
                    </td>

                    {/* Tier Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                          TIER_STYLES[cust.tier] || "bg-secondary"
                        }`}
                      >
                        {cust.tier}
                      </span>
                    </td>

                    {/* Contact Actions */}
                    <td
                      className="py-3.5 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${cust.phone}`}
                          title="Call Mobile"
                          className="h-7 w-7 rounded-lg grid place-items-center border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                        </a>

                        <a
                          href={`https://wa.me/88${cust.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Message on WhatsApp"
                          className="h-7 w-7 rounded-lg grid place-items-center bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/70 p-4 text-xs text-muted-foreground">
          <span>
            Showing {pagedCustomers.length} of {sortedCustomers.length} filtered customers
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

      {/* Customer Profile & Skincare Diagnostics Drawer */}
      {selectedCustomer && (
        <Dialog
          open={Boolean(selectedCustomer)}
          onOpenChange={(open) => {
            if (!open) setSelectedCustomer(null);
          }}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="border-b border-border/60 pb-3">
              <div className="flex items-center justify-between">
                <DialogTitle className="font-display text-xl flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  {selectedCustomer.name}
                </DialogTitle>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                    TIER_STYLES[selectedCustomer.tier]
                  }`}
                >
                  {selectedCustomer.tier} Member
                </span>
              </div>
              <DialogDescription className="text-xs">
                Customer since {selectedCustomer.joinedDate} • {selectedCustomer.city}, Bangladesh
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pt-2 text-xs">
              {/* LTV & Metric Strip */}
              <div className="grid grid-cols-3 gap-3 rounded-xl border border-border/80 bg-secondary/15 p-4 text-center">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Total Spend</p>
                  <p className="text-base font-bold text-foreground mt-0.5">
                    ৳{selectedCustomer.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Orders Count</p>
                  <p className="text-base font-bold text-foreground mt-0.5">
                    {selectedCustomer.ordersCount} Completed
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Avg Basket</p>
                  <p className="text-base font-bold text-foreground mt-0.5">
                    ৳{selectedCustomer.avgOrderValue.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Contact & Diagnostics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Contact Phone & WhatsApp</Label>
                  <p className="font-mono text-foreground font-semibold">{selectedCustomer.phone}</p>
                  <div className="flex gap-2 pt-1">
                    <a
                      href={`tel:${selectedCustomer.phone}`}
                      className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold hover:bg-secondary"
                    >
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/88${selectedCustomer.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-emerald-700"
                    >
                      Chat WhatsApp
                    </a>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Skin Type & Diagnostics</Label>
                  <p className="text-foreground font-medium">{selectedCustomer.skinType}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Concerns: {selectedCustomer.skinConcerns?.join(", ") || "Hydration"}
                  </p>
                </div>
              </div>

              {/* Order History */}
              <div className="rounded-xl border border-border/80 bg-card p-4 space-y-2">
                <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                  Order History for this Customer ({customerOrders.length})
                </h4>

                {customerOrders.length === 0 ? (
                  <p className="text-muted-foreground text-xs py-2">
                    No orders linked to this profile yet.
                  </p>
                ) : (
                  <div className="divide-y divide-border/40">
                    {customerOrders.map((o) => (
                      <div key={o.id} className="py-2 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono font-bold text-primary">{o.id}</span>
                          <span className="text-muted-foreground ml-2">({o.date})</span>
                          <p className="text-[11px] text-muted-foreground">
                            {o.items.length} items • {o.courier}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-foreground">
                            ৳{o.total.toLocaleString()}
                          </span>
                          <span className="block text-[10px] text-emerald-600 font-semibold">
                            {o.fulfillmentStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Internal Notes */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Staff Internal CRM Notes</Label>
                <div className="flex gap-2">
                  <Input
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    placeholder="e.g. Sensitive skin. Prefers fragrance-free formulas."
                    className="h-8 rounded-md text-xs flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleSaveNote}
                    className="rounded-md text-xs h-8 px-3"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-border/60">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedCustomer(null)}
                className="rounded-full text-xs"
              >
                Close Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Customer Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <Users className="h-5 w-5 text-primary" />
              Add Customer Account
            </DialogTitle>
            <DialogDescription className="text-xs">
              Manually register a customer for telephone orders or VIP showroom visits.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateCustomer} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-semibold">Customer Full Name *</Label>
              <Input
                required
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                placeholder="e.g. Mahia Mahi"
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Mobile Phone *</Label>
                <Input
                  required
                  value={addPhone}
                  onChange={(e) => setAddPhone(e.target.value)}
                  placeholder="017XX-XXXXXX"
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Email Address</Label>
                <Input
                  type="email"
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">City</Label>
                <Input
                  value={addCity}
                  onChange={(e) => setAddCity(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">VIP Tier</Label>
                <select
                  value={addTier}
                  onChange={(e) => setAddTier(e.target.value as any)}
                  className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
                >
                  <option value="Standard">Standard</option>
                  <option value="VIP">VIP</option>
                  <option value="Platinum">Platinum VIP</option>
                </select>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Primary Skin Concern</Label>
              <Input
                value={addSkinType}
                onChange={(e) => setAddSkinType(e.target.value)}
                placeholder="e.g. Oily / Dehydrated"
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddOpen(false)}
                className="rounded-full text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="rounded-full text-xs px-5">
                Register Customer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
