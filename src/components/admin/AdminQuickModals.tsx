"use client";

import React, { useState } from "react";
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
import { BRANDS, CATEGORIES } from "@/lib/catalog";
import { useAdmin } from "@/context/admin-context";
import { toast } from "sonner";
import { Package, ShoppingBag, Tag, Plus, Trash2 } from "lucide-react";

interface QuickModalsProps {
  productOpen: boolean;
  onProductOpenChange: (open: boolean) => void;
  orderOpen: boolean;
  onOrderOpenChange: (open: boolean) => void;
  discountOpen: boolean;
  onDiscountOpenChange: (open: boolean) => void;
}

export function AdminQuickModals({
  productOpen,
  onProductOpenChange,
  orderOpen,
  onOrderOpenChange,
  discountOpen,
  onDiscountOpenChange,
}: QuickModalsProps) {
  const { addProduct, addOrder, addDiscount, products } = useAdmin();

  // QUICK PRODUCT STATE
  const [prodName, setProdName] = useState("");
  const [prodBrand, setProdBrand] = useState<string>(BRANDS[0] || "Shiseido");
  const [prodCat, setProdCat] = useState<string>(CATEGORIES[0] || "Serum");
  const [prodPrice, setProdPrice] = useState("2800");
  const [prodCost, setProdCost] = useState("1750");
  const [prodStock, setProdStock] = useState("30");
  const [prodSku, setProdSku] = useState("");
  const [prodImage, setProdImage] = useState(
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80"
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      toast.error("Please enter a product title.");
      return;
    }
    const priceNum = parseFloat(prodPrice) || 0;
    const costNum = parseFloat(prodCost) || Math.round(priceNum * 0.6);
    const stockNum = parseInt(prodStock, 10) || 0;
    const generatedSku = prodSku.trim() || `${prodBrand.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    addProduct({
      name: prodName.trim(),
      japaneseName: `${prodBrand} プレミアム処方`,
      brand: prodBrand,
      category: prodCat,
      price: priceNum,
      compareAt: Math.round(priceNum * 1.25),
      costPrice: costNum,
      stock: stockNum,
      lowStockThreshold: 5,
      sku: generatedSku,
      status: "active",
      rating: 5.0,
      reviewsCount: 1,
      image: prodImage,
      images: [prodImage],
      short: "Imported authentic Japanese formulation.",
      description: "Authentic Tokyo formulation with skin-soothing botanical extracts.",
      howTo: "Dispense appropriate amount and massage gently.",
      skinTypes: ["All Skin Types"],
      concerns: ["Hydration"],
      sizes: ["50ml"],
    });

    toast.success(`Product "${prodName}" added to catalog! 🌸`);
    onProductOpenChange(false);
    setProdName("");
  };

  // QUICK ORDER STATE
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [custCity, setCustCity] = useState("Dhaka");
  const [custDivision, setCustDivision] = useState("Dhaka");
  const [orderPayMethod, setOrderPayMethod] = useState<"COD" | "bKash" | "Card">("COD");
  const [selectedProdSlug, setSelectedProdSlug] = useState(products[0]?.slug || "");
  const [orderQty, setOrderQty] = useState(1);
  const [orderShipping, setOrderShipping] = useState("60");

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custPhone.trim() || !custAddress.trim()) {
      toast.error("Please provide customer name, phone, and delivery address.");
      return;
    }

    const targetProduct = products.find((p) => p.slug === selectedProdSlug) || products[0];
    if (!targetProduct) {
      toast.error("No valid product selected.");
      return;
    }

    const shipNum = parseFloat(orderShipping) || 60;
    const subtotal = targetProduct.price * orderQty;
    const total = subtotal + shipNum;

    addOrder({
      customerName: custName.trim(),
      customerPhone: custPhone.trim(),
      customerEmail: custEmail.trim() || "customer@gloriousjapan.com",
      address: custAddress.trim(),
      area: custAddress.split(",")[0] || "Area",
      city: custCity,
      division: custDivision,
      subtotal,
      shippingFee: shipNum,
      discountAmount: 0,
      total,
      paymentMethod: orderPayMethod,
      paymentStatus: orderPayMethod === "COD" ? "Pending" : "Paid",
      fulfillmentStatus: "Pending",
      courier: custCity.toLowerCase() === "dhaka" ? "Pathao Express" : "Steadfast",
      items: [
        {
          slug: targetProduct.slug,
          name: targetProduct.name,
          brand: targetProduct.brand,
          price: targetProduct.price,
          qty: orderQty,
          size: targetProduct.sizes?.[0] || "50ml",
          image: targetProduct.image,
        },
      ],
      notes: "Manual order placed via admin console.",
    });

    toast.success(`Manual Order created for ${custName}! 📦`);
    onOrderOpenChange(false);
    setCustName("");
    setCustPhone("");
    setCustAddress("");
  };

  // QUICK DISCOUNT STATE
  const [discCode, setDiscCode] = useState("");
  const [discType, setDiscType] = useState<"percentage" | "fixed" | "free_shipping">("percentage");
  const [discValue, setDiscValue] = useState("15");
  const [discMinSpend, setDiscMinSpend] = useState("2500");
  const [discLimit, setDiscLimit] = useState("200");

  const handleCreateDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discCode.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }

    addDiscount({
      code: discCode.trim().toUpperCase(),
      type: discType,
      value: parseFloat(discValue) || 10,
      minSpend: parseFloat(discMinSpend) || 0,
      usageLimit: parseInt(discLimit, 10) || 100,
      status: "active",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: "2026-12-31",
    });

    toast.success(`Coupon code ${discCode.toUpperCase()} activated! 🎉`);
    onDiscountOpenChange(false);
    setDiscCode("");
  };

  return (
    <>
      {/* 1. Quick Add Product Dialog */}
      <Dialog open={productOpen} onOpenChange={onProductOpenChange}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <Package className="h-5 w-5 text-primary" />
              Add Product to Tokyo Catalog
            </DialogTitle>
            <DialogDescription className="text-xs">
              Quickly create a new Japanese skincare SKU with instant inventory tracking.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateProduct} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-semibold">Product Title *</Label>
              <Input
                required
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                placeholder="e.g. Rohto Melano CC Intensive Anti-Spot Essence"
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Japanese Brand</Label>
                <select
                  value={prodBrand}
                  onChange={(e) => setProdBrand(e.target.value)}
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
                  value={prodCat}
                  onChange={(e) => setProdCat(e.target.value)}
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

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs font-semibold">Retail Price (৳)</Label>
                <Input
                  type="number"
                  required
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Cost Price (৳)</Label>
                <Input
                  type="number"
                  value={prodCost}
                  onChange={(e) => setProdCost(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Initial Stock</Label>
                <Input
                  type="number"
                  required
                  value={prodStock}
                  onChange={(e) => setProdStock(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Image URL (Unsplash or direct asset)</Label>
              <Input
                value={prodImage}
                onChange={(e) => setProdImage(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onProductOpenChange(false)}
                className="rounded-full text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="rounded-full text-xs px-5">
                Save & Publish
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. Quick Manual Order Dialog */}
      <Dialog open={orderOpen} onOpenChange={onOrderOpenChange}>
        <DialogContent className="max-w-md sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Create Manual Customer Order
            </DialogTitle>
            <DialogDescription className="text-xs">
              Record a direct phone, WhatsApp, or showroom customer parcel.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateOrder} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Customer Full Name *</Label>
                <Input
                  required
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  placeholder="e.g. Sumaiya Akter"
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Mobile Phone Number *</Label>
                <Input
                  required
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  placeholder="017XX-XXXXXX"
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Delivery Address in Bangladesh *</Label>
              <Input
                required
                value={custAddress}
                onChange={(e) => setCustAddress(e.target.value)}
                placeholder="House, Road, Area (e.g. House 5, Road 2, Dhanmondi)"
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">City / District</Label>
                <select
                  value={custCity}
                  onChange={(e) => {
                    const c = e.target.value;
                    setCustCity(c);
                    setOrderShipping(c.toLowerCase() === "dhaka" ? "60" : "120");
                  }}
                  className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold">Payment Method</Label>
                <select
                  value={orderPayMethod}
                  onChange={(e) => setOrderPayMethod(e.target.value as any)}
                  className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
                >
                  <option value="COD">Cash on Delivery (COD)</option>
                  <option value="bKash">bKash Mobile Payment</option>
                  <option value="Card">Credit / Debit Card</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-border/80 bg-secondary/15 p-3 space-y-2">
              <Label className="text-xs font-semibold">Select Japanese Product</Label>
              <div className="flex gap-2">
                <select
                  value={selectedProdSlug}
                  onChange={(e) => setSelectedProdSlug(e.target.value)}
                  className="h-9 flex-1 rounded-full border border-input bg-background px-3 text-xs"
                >
                  {products.slice(0, 20).map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name} — ৳{p.price} ({p.stock} in stock)
                    </option>
                  ))}
                </select>

                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={orderQty}
                  onChange={(e) => setOrderQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="h-9 w-20 rounded-full text-xs text-center"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOrderOpenChange(false)}
                className="rounded-full text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="rounded-full text-xs px-5">
                Place Manual Order
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 3. Quick Discount Dialog */}
      <Dialog open={discountOpen} onOpenChange={onDiscountOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <Tag className="h-5 w-5 text-primary" />
              Create Promo Coupon
            </DialogTitle>
            <DialogDescription className="text-xs">
              Generate a high-converting promotional voucher for campaigns or VIP buyers.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateDiscount} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-semibold">Coupon Code *</Label>
              <Input
                required
                value={discCode}
                onChange={(e) => setDiscCode(e.target.value.toUpperCase())}
                placeholder="e.g. SAKURA15"
                className="mt-1 h-9 rounded-full text-xs uppercase font-mono tracking-wider font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Discount Type</Label>
                <select
                  value={discType}
                  onChange={(e) => setDiscType(e.target.value as any)}
                  className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
                >
                  <option value="percentage">Percentage Off (%)</option>
                  <option value="fixed">Fixed Amount (৳)</option>
                  <option value="free_shipping">Free Shipping</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold">
                  {discType === "percentage" ? "Percentage (%)" : "Value (৳)"}
                </Label>
                <Input
                  type="number"
                  required
                  value={discValue}
                  onChange={(e) => setDiscValue(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Min Spend (৳)</Label>
                <Input
                  type="number"
                  value={discMinSpend}
                  onChange={(e) => setDiscMinSpend(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Max Uses Limit</Label>
                <Input
                  type="number"
                  value={discLimit}
                  onChange={(e) => setDiscLimit(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onDiscountOpenChange(false)}
                className="rounded-full text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="rounded-full text-xs px-5">
                Create & Activate
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
