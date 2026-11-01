"use client";

import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
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
import { useAdmin } from "@/context/admin-context";
import { toast } from "sonner";

interface QuickAddOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickAddOrderModal({ open, onOpenChange }: QuickAddOrderModalProps) {
  const { addOrder, products } = useAdmin();

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
    onOpenChange(false);
    setCustName("");
    setCustPhone("");
    setCustAddress("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                onChange={(e) => setOrderPayMethod(e.target.value as "COD" | "bKash" | "Card")}
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
              onClick={() => onOpenChange(false)}
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
  );
}
