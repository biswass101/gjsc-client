"use client";

import React, { useState } from "react";
import {
  Store,
  Truck,
  CreditCard,
  Bell,
  ShieldCheck,
  Save,
  RefreshCw,
  Download,
  AlertTriangle,
  Lock,
  Globe,
  Smartphone,
} from "lucide-react";
import { useAdmin, AdminSettings } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetToDefaults, products, orders, customers, discounts } = useAdmin();

  // Form states
  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [warehouseAddress, setWarehouseAddress] = useState(settings.warehouseAddress);
  const [tokyoOfficeAddress, setTokyoOfficeAddress] = useState(settings.tokyoOfficeAddress);

  // Delivery
  const [insideDhakaRate, setInsideDhakaRate] = useState(settings.insideDhakaRate.toString());
  const [outsideDhakaRate, setOutsideDhakaRate] = useState(settings.outsideDhakaRate.toString());
  const [expressDeliveryRate, setExpressDeliveryRate] = useState(settings.expressDeliveryRate.toString());
  const [freeShippingMin, setFreeShippingMin] = useState(settings.freeShippingMin.toString());
  const [defaultCourier, setDefaultCourier] = useState(settings.defaultCourier);
  const [autoAssignCourier, setAutoAssignCourier] = useState(settings.autoAssignCourier);
  const [pathaoApiKey, setPathaoApiKey] = useState(settings.pathaoApiKey);
  const [steadfastApiKey, setSteadfastApiKey] = useState(settings.steadfastApiKey);

  // Payment
  const [codEnabled, setCodEnabled] = useState(settings.codEnabled);
  const [bkashEnabled, setBkashEnabled] = useState(settings.bkashEnabled);
  const [bkashMerchantNumber, setBkashMerchantNumber] = useState(settings.bkashMerchantNumber);
  const [nagadEnabled, setNagadEnabled] = useState(settings.nagadEnabled);
  const [nagadMerchantNumber, setNagadMerchantNumber] = useState(settings.nagadMerchantNumber);

  // Notifications & Alerts
  const [lowStockWarningQty, setLowStockWarningQty] = useState(settings.lowStockWarningQty.toString());
  const [enableSmsAlerts, setEnableSmsAlerts] = useState(settings.enableSmsAlerts);
  const [enableWhatsappUpdates, setEnableWhatsappUpdates] = useState(settings.enableWhatsappUpdates);
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenanceMode);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      tagline,
      contactEmail,
      contactPhone,
      warehouseAddress,
      tokyoOfficeAddress,
      insideDhakaRate: parseFloat(insideDhakaRate) || 60,
      outsideDhakaRate: parseFloat(outsideDhakaRate) || 120,
      expressDeliveryRate: parseFloat(expressDeliveryRate) || 150,
      freeShippingMin: parseFloat(freeShippingMin) || 5000,
      defaultCourier,
      autoAssignCourier,
      pathaoApiKey,
      steadfastApiKey,
      codEnabled,
      bkashEnabled,
      bkashMerchantNumber,
      nagadEnabled,
      nagadMerchantNumber,
      lowStockWarningQty: parseInt(lowStockWarningQty, 10) || 5,
      enableSmsAlerts,
      enableWhatsappUpdates,
      maintenanceMode,
    });
    toast.success("Enterprise store & logistics settings saved successfully! ⚙️");
  };

  // Full Database Export
  const handleExportDatabase = () => {
    const fullDatabase = {
      exportTimestamp: new Date().toISOString(),
      store: settings,
      productsCount: products.length,
      ordersCount: orders.length,
      customersCount: customers.length,
      discountsCount: discounts.length,
      products,
      orders,
      customers,
      discounts,
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullDatabase, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute(
      "download",
      `GJSC_Store_Backup_${new Date().toISOString().split("T")[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Full Store Database exported to JSON! 💾");
  };

  const handleReset = () => {
    if (window.confirm("Restore factory demo state? This will reinitialize all sample products, orders, and settings.")) {
      resetToDefaults();
      toast.success("Store factory settings restored!");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-primary">System Administration</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              Enterprise v2.6
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
            Store Logistics, Courier Gateways & System Settings
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Configure delivery tariffs across Bangladesh, bKash Merchant credentials, automated SMS dispatch, and warehouse addresses.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportDatabase}
            className="rounded-full text-xs h-8 px-3.5 gap-1.5"
          >
            <Download className="h-3.5 w-3.5 text-primary" />
            Backup Database
          </Button>

          <Button
            size="sm"
            onClick={handleSave}
            className="rounded-full text-xs h-8 px-5 gap-1.5 shadow-2xs font-semibold"
          >
            <Save className="h-3.5 w-3.5" />
            Save Settings
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Section 1: Store Details */}
        <div className="surface-card p-5 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Store className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-foreground">
                Store Identity & Sourcing Offices
              </h2>
              <p className="text-[11px] text-muted-foreground">Brand headers and concierge contact lines</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-semibold">Store Brand Name</Label>
              <Input
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Brand Tagline</Label>
              <Input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Concierge Support Email</Label>
              <Input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Hotline / WhatsApp Number</Label>
              <Input
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Dhaka Warehouse Hub Address</Label>
              <Input
                value={warehouseAddress}
                onChange={(e) => setWarehouseAddress(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Tokyo Sourcing Office Address (Japan)</Label>
              <Input
                value={tokyoOfficeAddress}
                onChange={(e) => setTokyoOfficeAddress(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Courier & Shipping Logistics */}
        <div className="surface-card p-5 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/10 text-blue-600">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-foreground">
                Bangladesh Logistics Tariffs & Courier API
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Automated Pathao Express & Steadfast dispatch configurations
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <Label className="text-xs font-semibold">Inside Dhaka Delivery (৳)</Label>
              <Input
                type="number"
                value={insideDhakaRate}
                onChange={(e) => setInsideDhakaRate(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs font-semibold"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Outside Dhaka Delivery (৳)</Label>
              <Input
                type="number"
                value={outsideDhakaRate}
                onChange={(e) => setOutsideDhakaRate(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs font-semibold"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Express Same-Day Dhaka (৳)</Label>
              <Input
                type="number"
                value={expressDeliveryRate}
                onChange={(e) => setExpressDeliveryRate(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs font-semibold"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Free Shipping Threshold (৳)</Label>
              <Input
                type="number"
                value={freeShippingMin}
                onChange={(e) => setFreeShippingMin(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs font-semibold"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/50">
            <div>
              <Label className="text-xs font-semibold">Default Courier Partner</Label>
              <select
                value={defaultCourier}
                onChange={(e) => setDefaultCourier(e.target.value)}
                className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
              >
                <option value="Pathao Express">Pathao Express</option>
                <option value="Steadfast">Steadfast Courier</option>
                <option value="RedX">RedX Logistics</option>
                <option value="Paperfly">Paperfly</option>
              </select>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/80 p-3 bg-secondary/15 mt-1">
              <div>
                <p className="font-semibold text-foreground text-xs">Auto-Assign Courier on Checkout</p>
                <p className="text-[11px] text-muted-foreground">Directly generate consignment upon order</p>
              </div>
              <Switch checked={autoAssignCourier} onCheckedChange={setAutoAssignCourier} />
            </div>

            <div>
              <Label className="text-xs font-semibold">Pathao API Secret Key</Label>
              <Input
                type="password"
                value={pathaoApiKey}
                onChange={(e) => setPathaoApiKey(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs font-mono"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Steadfast Client API Key</Label>
              <Input
                type="password"
                value={steadfastApiKey}
                onChange={(e) => setSteadfastApiKey(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Payments & Mobile Financial Services (bKash/Nagad/COD) */}
        <div className="surface-card p-5 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-foreground">
                Payment Gateways & Mobile Wallets (MFS)
              </h2>
              <p className="text-[11px] text-muted-foreground">Cash on Delivery, bKash Merchant, Nagad settings</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border/80 p-3 bg-secondary/10">
              <div>
                <p className="font-semibold text-foreground">Enable Cash on Delivery (COD)</p>
                <p className="text-[11px] text-muted-foreground">Buyers pay courier upon receiving Japanese parcel</p>
              </div>
              <Switch checked={codEnabled} onCheckedChange={setCodEnabled} />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 rounded-xl border border-border/80 p-3 bg-secondary/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">bKash Merchant Gateway</p>
                  <p className="text-[11px] text-muted-foreground">Online MFS Checkout & TrxID verification</p>
                </div>
                <Switch checked={bkashEnabled} onCheckedChange={setBkashEnabled} />
              </div>
              <div>
                <Label className="text-[11px] font-semibold">bKash Merchant Account Number</Label>
                <Input
                  value={bkashMerchantNumber}
                  onChange={(e) => setBkashMerchantNumber(e.target.value)}
                  className="mt-1 h-8 rounded-full text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 rounded-xl border border-border/80 p-3 bg-secondary/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Nagad Mobile Payment</p>
                  <p className="text-[11px] text-muted-foreground">Direct Nagad Payment URL & QR Code</p>
                </div>
                <Switch checked={nagadEnabled} onCheckedChange={setNagadEnabled} />
              </div>
              <div>
                <Label className="text-[11px] font-semibold">Nagad Merchant Account Number</Label>
                <Input
                  value={nagadMerchantNumber}
                  onChange={(e) => setNagadMerchantNumber(e.target.value)}
                  className="mt-1 h-8 rounded-full text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Inventory Alerts & Notifications */}
        <div className="surface-card p-5 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-foreground">
                Alerts, Customer SMS & System Flags
              </h2>
              <p className="text-[11px] text-muted-foreground">Low-stock notifications and transactional SMS triggers</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label className="text-xs font-semibold">Low-Stock Alert Threshold (Units)</Label>
              <Input
                type="number"
                value={lowStockWarningQty}
                onChange={(e) => setLowStockWarningQty(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Triggers admin alert when stock reaches this level</p>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/80 p-3 bg-secondary/10">
              <div>
                <p className="font-semibold text-foreground">Courier Dispatch SMS</p>
                <p className="text-[10px] text-muted-foreground">Notify customer via SMS when rider assigned</p>
              </div>
              <Switch checked={enableSmsAlerts} onCheckedChange={setEnableSmsAlerts} />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/80 p-3 bg-secondary/10">
              <div>
                <p className="font-semibold text-foreground">WhatsApp Order Updates</p>
                <p className="text-[10px] text-muted-foreground">Send direct live tracking link on WhatsApp</p>
              </div>
              <Switch checked={enableWhatsappUpdates} onCheckedChange={setEnableWhatsappUpdates} />
            </div>
          </div>
        </div>

        {/* Section 5: Disaster Recovery & Factory Reset */}
        <div className="surface-card p-5 space-y-4 border border-rose/30">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-rose/10 text-rose">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-display text-base font-semibold text-foreground">
                  Database Management & Factory Reset
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  Backup entire system dataset or restore default factory demonstration state
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="rounded-full text-xs h-8 px-4 text-rose border-rose/30 hover:bg-rose/10 gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Factory State
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            All modifications made across Products, Orders, Customers, Coupons, and Settings are persisted in your browser's persistent storage. You can backup your database to JSON anytime or reinitialize to the clean factory state.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" size="sm" className="rounded-full text-xs px-8 h-9 shadow-sm">
            Save All Configurations
          </Button>
        </div>
      </form>
    </div>
  );
}
