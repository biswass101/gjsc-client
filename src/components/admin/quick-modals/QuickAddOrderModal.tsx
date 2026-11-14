"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  Plus,
  Trash2,
  Minus,
  AlertCircle,
  Truck,
  CreditCard,
  User,
  Package,
  Search,
  Loader2,
  X,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/context/admin-context";
import { adminApi } from "@/lib/api";
import { POPULAR_DHAKA_AREAS } from "@/features/checkout/data/checkoutConstants";
import { toast } from "sonner";

interface QuickAddOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface OrderItemDraft {
  slug: string;
  name: string;
  brand: string;
  price: number;
  qty: number;
  size: string;
  image: string;
  stock: number;
}

const CITY_DIVISION_MAP: Record<string, string> = {
  Dhaka: "Dhaka",
  Gazipur: "Dhaka",
  Narayanganj: "Dhaka",
  Chattogram: "Chittagong",
  Sylhet: "Sylhet",
  Rajshahi: "Rajshahi",
  Khulna: "Khulna",
  Barishal: "Barishal",
  Rangpur: "Rangpur",
  Mymensingh: "Mymensingh",
  Cumilla: "Chittagong",
  Bogura: "Rajshahi",
};

function getSafeSizes(product: any): string[] {
  if (!product) return ["Standard"];
  const raw = product.sizes;
  if (Array.isArray(raw) && raw.length > 0) return raw.map(String);
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return ["Standard"];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed.map(String);
      if (typeof parsed === "string" && parsed.trim()) return [parsed.trim()];
    } catch {
      if (trimmed.includes(",")) return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
      return [trimmed];
    }
  }
  return ["Standard"];
}

export function QuickAddOrderModal({ open, onOpenChange }: QuickAddOrderModalProps) {
  const { addOrder } = useAdmin();

  // Customer Details
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [custArea, setCustArea] = useState("");
  const [custCity, setCustCity] = useState("Dhaka");
  const [custDivision, setCustDivision] = useState("Dhaka");
  const [orderNotes, setOrderNotes] = useState("Manual order placed via admin console.");

  // Payment & Delivery
  const [orderPayMethod, setOrderPayMethod] = useState<"COD" | "bKash" | "Card" | "Nagad">("COD");
  const [orderPayStatus, setOrderPayStatus] = useState<"Pending" | "Paid">("Pending");
  const [fulfillmentStatus, setFulfillmentStatus] = useState<
    "Pending" | "Processing" | "Quality Checked" | "Dispatched" | "Delivered"
  >("Pending");
  const [courier, setCourier] = useState<"Pathao Express" | "Steadfast" | "In-House" | "None">("Pathao Express");
  const [orderShipping, setOrderShipping] = useState("60");

  // Server-side Product Search State (300ms Debounce, 15 items per request)
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Standard");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Multi-Product Line Items in Parcel
  const [orderItems, setOrderItems] = useState<OrderItemDraft[]>([]);

  // 1. Debounce Search Input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 2. Server-Side Search for Available Products from Database (Limit 15 per request)
  useEffect(() => {
    if (!open) return;
    let isCancelled = false;
    setIsSearching(true);

    adminApi
      .getProducts({
        search: debouncedSearch.trim() || undefined,
        limit: 15,
        inStock: true,
      })
      .then((res) => {
        if (!isCancelled && res && Array.isArray(res.products)) {
          setSearchResults(res.products);
          setSelectedProduct((prev: any) => {
            if (prev && res.products.some((p: any) => p.slug === prev.slug)) {
              return prev;
            }
            return res.products[0] || null;
          });
        }
      })
      .catch((err) => {
        console.warn("Product search failed:", err);
      })
      .finally(() => {
        if (!isCancelled) setIsSearching(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearch, open]);

  // 3. Sync Sizes when selected product changes
  useEffect(() => {
    if (selectedProduct) {
      const sizes = getSafeSizes(selectedProduct);
      setSelectedSize(sizes[0] || "Standard");
      setSelectedQty(1);
    }
  }, [selectedProduct]);

  // 4. Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCityChange = (city: string) => {
    setCustCity(city);
    const div = CITY_DIVISION_MAP[city] || "Dhaka";
    setCustDivision(div);
    const isDhakaMetro = city.toLowerCase() === "dhaka";
    setOrderShipping(isDhakaMetro ? "60" : "120");
    setCourier(isDhakaMetro ? "Pathao Express" : "Steadfast");
  };

  const handleAddProduct = () => {
    if (!selectedProduct) {
      toast.error("Please select a product to add.");
      return;
    }

    if (selectedProduct.stock < selectedQty) {
      toast.error(`Only ${selectedProduct.stock} units available in inventory.`);
      return;
    }

    const sizes = getSafeSizes(selectedProduct);
    const chosenSize = selectedSize || sizes[0] || "Standard";

    setOrderItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.slug === selectedProduct.slug && it.size === chosenSize,
      );

      if (existingIdx >= 0) {
        const existing = prev[existingIdx];
        if (existing) {
          const newQty = existing.qty + selectedQty;
          if (newQty > selectedProduct.stock) {
            toast.error(`Cannot exceed current stock of ${selectedProduct.stock}.`);
            return prev;
          }
          const updated = [...prev];
          updated[existingIdx] = { ...existing, qty: newQty };
          toast.success(`Updated ${selectedProduct.name} quantity to ${newQty}.`);
          return updated;
        }
      }

      toast.success(`Added ${selectedProduct.name} to order.`);
      return [
        ...prev,
        {
          slug: selectedProduct.slug,
          name: selectedProduct.name,
          brand: selectedProduct.brandName || selectedProduct.brand?.name || selectedProduct.brand || "Authentic Japan",
          price: Number(selectedProduct.price),
          qty: selectedQty,
          size: chosenSize,
          image: selectedProduct.image || "",
          stock: Number(selectedProduct.stock),
        },
      ];
    });

    setSelectedQty(1);
  };

  const handleUpdateItemQty = (index: number, delta: number) => {
    setOrderItems((prev) => {
      const updated = [...prev];
      const target = updated[index];
      if (!target) return prev;

      const newQty = target.qty + delta;
      if (newQty <= 0) {
        return prev.filter((_, idx) => idx !== index);
      }
      if (newQty > target.stock) {
        toast.error(`Cannot exceed available stock of ${target.stock}.`);
        return prev;
      }
      target.qty = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, idx) => idx !== index));
    toast.info("Item removed from order.");
  };

  const itemsSubtotal = orderItems.reduce((acc, it) => acc + it.price * it.qty, 0);
  const shippingNum = parseFloat(orderShipping) || 0;
  const grandTotal = itemsSubtotal + shippingNum;

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!custName.trim() || !custPhone.trim() || !custAddress.trim()) {
      toast.error("Please fill in Customer Name, Phone, and Delivery Address.");
      return;
    }

    if (orderItems.length === 0) {
      toast.error("Please add at least 1 product item to the order.");
      return;
    }

    try {
      setIsSubmitting(true);

      const zone = custCity.toLowerCase() === "dhaka" ? "dhaka_metro" : "outside_dhaka";
      const finalArea = custArea.trim() || custAddress.split(",")[0] || "Area";

      const created = await addOrder({
        customerName: custName.trim(),
        customerPhone: custPhone.trim(),
        customerEmail: custEmail.trim() || `${custPhone.replace(/[^0-9]/g, "")}@phone.customer`,
        address: custAddress.trim(),
        area: finalArea,
        city: custCity,
        division: custDivision,
        deliveryZone: zone,
        subtotal: itemsSubtotal,
        shippingFee: shippingNum,
        discountAmount: 0,
        total: grandTotal,
        paymentMethod: orderPayMethod,
        paymentStatus: orderPayStatus,
        fulfillmentStatus,
        courier,
        items: orderItems.map((it) => ({
          slug: it.slug,
          name: it.name,
          brand: it.brand,
          price: it.price,
          qty: it.qty,
          size: it.size,
          image: it.image,
        })),
        notes: orderNotes.trim(),
      });

      toast.success(`Order ${created.id} created and persisted to database! 📦`);
      onOpenChange(false);

      // Reset Form
      setCustName("");
      setCustPhone("");
      setCustEmail("");
      setCustAddress("");
      setCustArea("");
      setCustCity("Dhaka");
      setCustDivision("Dhaka");
      setOrderItems([]);
      setSearchQuery("");
      setDebouncedSearch("");
      setOrderPayMethod("COD");
      setOrderPayStatus("Pending");
      setFulfillmentStatus("Pending");
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create order. Please check that products exist in catalog.";
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
        <DialogHeader className="border-b border-border/60 pb-3">
          <DialogTitle className="flex items-center gap-2 font-display text-xl text-foreground">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Create Manual Customer Order
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Record direct phone, WhatsApp, showroom, or VIP orders with multi-product line items synced to MySQL.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateOrder} className="space-y-5 pt-3">
          {/* Section 1: Customer Contact & Delivery Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <User className="h-3.5 w-3.5 text-primary" />
              <span>Customer & Delivery Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Customer Full Name *</Label>
                <Input
                  required
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  placeholder="e.g. Sabrina Karim"
                  className="mt-1 h-9 rounded-lg text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Mobile Phone Number *</Label>
                <Input
                  required
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  placeholder="017XX-XXXXXX"
                  className="mt-1 h-9 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label className="text-xs font-semibold">Customer Email (Optional)</Label>
                <Input
                  type="email"
                  value={custEmail}
                  onChange={(e) => setCustEmail(e.target.value)}
                  placeholder="customer@gmail.com"
                  className="mt-1 h-9 rounded-lg text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">City / District</Label>
                <select
                  value={custCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-input bg-background px-3 text-xs"
                >
                  <option value="Dhaka">Dhaka (Metro)</option>
                  <option value="Gazipur">Gazipur</option>
                  <option value="Narayanganj">Narayanganj</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                  <option value="Cumilla">Cumilla</option>
                  <option value="Bogura">Bogura</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold">Area (My Choice) *</Label>
                <Input
                  value={custArea}
                  onChange={(e) => setCustArea(e.target.value)}
                  list="admin-order-areas"
                  placeholder="Type or pick (e.g. Dhanmondi, Savar, Banani)"
                  className="mt-1 h-9 rounded-lg text-xs"
                />
                <datalist id="admin-order-areas">
                  {POPULAR_DHAKA_AREAS.map((a) => (
                    <option key={a} value={a} />
                  ))}
                </datalist>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Delivery Address in Bangladesh *</Label>
              <Input
                required
                value={custAddress}
                onChange={(e) => setCustAddress(e.target.value)}
                placeholder="House, Road, Block, Sector (e.g. House 42, Road 9/A)"
                className="mt-1 h-9 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Section 2: Multi-Product Builder with Server-Side Search */}
          <div className="space-y-3 rounded-xl border border-border/80 bg-secondary/15 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Package className="h-3.5 w-3.5 text-primary" />
                <span>Search & Add Available Products (Live from DB)</span>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                {orderItems.length} {orderItems.length === 1 ? "Item" : "Items"} in Parcel
              </Badge>
            </div>

            {/* Server-side Search Input with 300ms Debounce */}
            <div className="relative" ref={dropdownRef}>
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Search products by title, Japanese name, brand, or SKU (15 results/request)..."
                  className="pl-9 pr-9 h-9 rounded-lg text-xs bg-background"
                />
                {isSearching ? (
                  <Loader2 className="absolute right-3 h-4 w-4 text-primary animate-spin" />
                ) : searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setDebouncedSearch("");
                    }}
                    className="absolute right-2.5 h-4 w-4 text-muted-foreground hover:text-foreground grid place-items-center"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>

              {/* Floating Server Search Results Dropdown (15 results per request) */}
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-border/80 bg-popover text-popover-foreground shadow-2xl max-h-72 overflow-y-auto divide-y divide-border/40">
                  <div className="px-3 py-1.5 bg-muted/40 text-[10px] font-semibold text-muted-foreground flex justify-between items-center sticky top-0 backdrop-blur-sm">
                    <span>
                      {searchResults.length} available {searchResults.length === 1 ? "product" : "products"} from database
                    </span>
                    {isSearching && <span className="text-primary font-mono text-[9px]">Querying MySQL...</span>}
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-muted-foreground">
                      {isSearching ? "Searching database..." : `No available products found matching "${searchQuery}"`}
                    </div>
                  ) : (
                    searchResults.map((prod: any) => {
                      const isSelected = selectedProduct?.slug === prod.slug;
                      return (
                        <div
                          key={prod.slug}
                          onClick={() => {
                            setSelectedProduct(prod);
                            setIsDropdownOpen(false);
                          }}
                          className={`p-2.5 flex items-center justify-between gap-3 cursor-pointer transition-colors text-xs hover:bg-secondary/60 ${
                            isSelected ? "bg-primary/10 border-l-2 border-primary" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="h-9 w-9 rounded-md object-cover border border-border/60 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-foreground truncate">{prod.name}</p>
                              <p className="text-[11px] text-muted-foreground">
                                {prod.brandName || prod.brand?.name || "Authentic Japan"}
                                {prod.japaneseName ? ` • ${prod.japaneseName}` : ""}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 text-right">
                            <div>
                              <p className="font-mono font-bold text-foreground">
                                ৳{Number(prod.price).toLocaleString("en-BD")}
                              </p>
                              <span
                                className={`inline-block text-[10px] font-medium px-1.5 py-0.2 rounded-full ${
                                  prod.stock > 10
                                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                    : prod.stock > 0
                                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                                      : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                                }`}
                              >
                                {prod.stock > 0 ? `${prod.stock} in stock` : "Out of stock"}
                              </span>
                            </div>
                            {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Currently Selected Product Configuration Card */}
            {selectedProduct && (
              <div className="rounded-lg border border-border/80 bg-background p-3 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="h-10 w-10 rounded-md object-cover border border-border/60 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          Selected Product
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          (Stock: {selectedProduct.stock})
                        </span>
                      </div>
                      <p className="font-semibold text-xs text-foreground truncate">{selectedProduct.name}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-sm text-foreground">
                      ৳{Number(selectedProduct.price).toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1 border-t border-border/40">
                  <div className="sm:col-span-5">
                    <Label className="text-[10px] font-semibold text-muted-foreground">Select Size / Variant</Label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="mt-1 h-8 w-full rounded-md border border-input bg-background px-2 text-xs"
                    >
                      {getSafeSizes(selectedProduct).map((sz) => (
                        <option key={sz} value={sz}>
                          {sz}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <Label className="text-[10px] font-semibold text-muted-foreground">Quantity</Label>
                    <div className="mt-1 flex items-center rounded-md border border-border bg-secondary/20 h-8">
                      <button
                        type="button"
                        onClick={() => setSelectedQty((prev) => Math.max(1, prev - 1))}
                        className="h-8 w-7 grid place-items-center hover:bg-secondary text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <Input
                        type="number"
                        min="1"
                        max={selectedProduct.stock || 10}
                        value={selectedQty}
                        onChange={(e) =>
                          setSelectedQty(
                            Math.min(
                              selectedProduct.stock || 99,
                              Math.max(1, parseInt(e.target.value, 10) || 1),
                            ),
                          )
                        }
                        className="h-8 border-0 bg-transparent text-center font-mono text-xs p-0 focus-visible:ring-0 shadow-none"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedQty((prev) =>
                            Math.min(selectedProduct.stock || 99, prev + 1),
                          )
                        }
                        className="h-8 w-7 grid place-items-center hover:bg-secondary text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-4 flex items-end">
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAddProduct}
                      className="h-8 w-full rounded-md text-xs font-semibold gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add to Order (৳{(Number(selectedProduct.price) * selectedQty).toLocaleString("en-BD")})
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Added Order Items Table */}
            {orderItems.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border/80 p-5 text-center bg-background/50">
                <AlertCircle className="h-6 w-6 text-muted-foreground/60 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-foreground">No products added yet</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Select a product above and click &quot;Add Item&quot; to build this order.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border/60 rounded-lg border border-border/80 bg-background overflow-hidden">
                {orderItems.map((item, idx) => (
                  <div key={`${item.slug}-${item.size}-${idx}`} className="p-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded-md object-cover border border-border/50 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {item.brand} • <span className="font-medium text-foreground">{item.size}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center rounded-md border border-border bg-secondary/30">
                        <button
                          type="button"
                          onClick={() => handleUpdateItemQty(idx, -1)}
                          className="h-6 w-6 grid place-items-center hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center font-mono font-bold text-xs">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateItemQty(idx, 1)}
                          className="h-6 w-6 grid place-items-center hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="text-right w-20">
                        <p className="font-bold text-foreground font-mono">
                          ৳{(item.price * item.qty).toLocaleString("en-BD")}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          ৳{item.price} each
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="h-7 w-7 rounded-md grid place-items-center text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                        title="Remove product"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Payment, Logistics & Dispatch Controls */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <Truck className="h-3.5 w-3.5 text-primary" />
              <span>Logistics & Payment Configuration</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <Label className="text-xs font-semibold">Payment Channel</Label>
                <select
                  value={orderPayMethod}
                  onChange={(e) => setOrderPayMethod(e.target.value as any)}
                  className="mt-1 h-9 w-full rounded-lg border border-input bg-background px-3 text-xs"
                >
                  <option value="COD">Cash on Delivery (COD)</option>
                  <option value="bKash">bKash MFS</option>
                  <option value="Nagad">Nagad MFS</option>
                  <option value="Card">Visa / Mastercard</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold">Payment Status</Label>
                <select
                  value={orderPayStatus}
                  onChange={(e) => setOrderPayStatus(e.target.value as any)}
                  className="mt-1 h-9 w-full rounded-lg border border-input bg-background px-3 text-xs"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid / Confirmed</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold">Courier Provider</Label>
                <select
                  value={courier}
                  onChange={(e) => setCourier(e.target.value as any)}
                  className="mt-1 h-9 w-full rounded-lg border border-input bg-background px-3 text-xs"
                >
                  <option value="Pathao Express">Pathao Express</option>
                  <option value="Steadfast">Steadfast Courier</option>
                  <option value="In-House">In-House Rider</option>
                  <option value="None">Unassigned</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold">Delivery Fee (৳)</Label>
                <Input
                  type="number"
                  min="0"
                  value={orderShipping}
                  onChange={(e) => setOrderShipping(e.target.value)}
                  className="mt-1 h-9 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Fulfillment Stage</Label>
                <select
                  value={fulfillmentStatus}
                  onChange={(e) => setFulfillmentStatus(e.target.value as any)}
                  className="mt-1 h-9 w-full rounded-lg border border-input bg-background px-3 text-xs"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Quality Checked">Quality Checked</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold">Internal Admin Note</Label>
                <Input
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Special instructions or notes"
                  className="mt-1 h-9 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Live Invoice Bill Summary */}
          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Items Subtotal ({orderItems.reduce((acc, it) => acc + it.qty, 0)} items)</span>
              <span className="font-mono text-foreground">৳{itemsSubtotal.toLocaleString("en-BD")}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Delivery Fee ({custCity})</span>
              <span className="font-mono text-foreground">৳{shippingNum.toLocaleString("en-BD")}</span>
            </div>
            <div className="border-t border-border/60 pt-2 flex justify-between text-sm font-bold text-foreground">
              <span>Grand Total</span>
              <span className="font-mono text-primary text-base">
                ৳{grandTotal.toLocaleString("en-BD")} BDT
              </span>
            </div>
          </div>

          <DialogFooter className="pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="rounded-full text-xs"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="rounded-full text-xs px-6 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting || orderItems.length === 0}
            >
              {isSubmitting ? "Persisting Order..." : `Place Manual Order (৳${grandTotal.toLocaleString("en-BD")})`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
