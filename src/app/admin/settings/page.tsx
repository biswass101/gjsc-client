"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Bell, CreditCard, Globe, Lock, Save, ShieldCheck, Store, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

function SectionCard({ icon: Icon, title, subtitle, children }: {
  icon: typeof Store;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="flex items-start gap-4 border-b border-border p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="font-display text-lg">{title}</h2>
          <p className="text-[12px] text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border p-4 transition-colors hover:bg-secondary/30">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-[12px] text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export default function AdminSettings() {
  const [storeName, setStoreName] = useState("Glorious Japan Skin Care");
  const [tagline, setTagline] = useState("Stay Glorious, Shine with Confidence");
  const [email, setEmail] = useState("hello@gloriousjapan.com");
  const [phone, setPhone] = useState("+880 1700 000000");
  const [address, setAddress] = useState("Gulshan 2, Dhaka 1212");
  const [website, setWebsite] = useState("www.gloriousjapan.com");
  const [codEnabled, setCodEnabled] = useState(true);
  const [bkashEnabled, setBkashEnabled] = useState(true);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("5000");
  const [insideDhaka, setInsideDhaka] = useState("60");
  const [outsideDhaka, setOutsideDhaka] = useState("120");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);
  const [notifNewOrder, setNotifNewOrder] = useState(true);
  const [notifLowStock, setNotifLowStock] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <p className="eyebrow">Configuration</p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your store preferences and configuration.</p>
        </div>
        <Button onClick={handleSave} className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[11px] uppercase tracking-[0.2em]">
          <Save className="h-4 w-4" /> Save All Settings
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* 2-column grid for top sections */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Store Information */}
          <SectionCard icon={Store} title="Store Information" subtitle="Basic details about your brand">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="s-name" className="text-[10px] uppercase tracking-[0.15em]">Store Name</Label>
                  <Input id="s-name" className="mt-1.5 rounded-full" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="s-website" className="text-[10px] uppercase tracking-[0.15em]">Website</Label>
                  <Input id="s-website" className="mt-1.5 rounded-full" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="s-tagline" className="text-[10px] uppercase tracking-[0.15em]">Tagline</Label>
                <Input id="s-tagline" className="mt-1.5 rounded-full" value={tagline} onChange={(e) => setTagline(e.target.value)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="s-email" className="text-[10px] uppercase tracking-[0.15em]">Contact Email</Label>
                  <Input id="s-email" type="email" className="mt-1.5 rounded-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="s-phone" className="text-[10px] uppercase tracking-[0.15em]">Phone</Label>
                  <Input id="s-phone" type="tel" className="mt-1.5 rounded-full" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="s-address" className="text-[10px] uppercase tracking-[0.15em]">Address</Label>
                <Textarea id="s-address" className="mt-1.5 rounded-2xl" rows={2} value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
          </SectionCard>

          {/* Payment Methods */}
          <SectionCard icon={CreditCard} title="Payment Methods" subtitle="Configure accepted payment gateways">
            <div className="space-y-3">
              <ToggleRow label="Cash on Delivery (COD)" desc="Allow customers to pay on delivery" checked={codEnabled} onChange={setCodEnabled} />
              <ToggleRow label="bKash" desc="Mobile banking payment gateway" checked={bkashEnabled} onChange={setBkashEnabled} />
            </div>
          </SectionCard>
        </div>

        {/* Shipping section — full width */}
        <SectionCard icon={Truck} title="Shipping & Delivery" subtitle="Set delivery charges and free shipping thresholds">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <Label htmlFor="s-free-ship" className="text-[10px] uppercase tracking-[0.15em]">Free Shipping Threshold (৳)</Label>
              <Input id="s-free-ship" type="number" min="0" step="100" className="mt-1.5 rounded-full" value={freeShippingThreshold} onChange={(e) => setFreeShippingThreshold(e.target.value)} />
              <p className="mt-1.5 text-[11px] text-muted-foreground">Orders above this get free delivery.</p>
            </div>
            <div>
              <Label htmlFor="s-inside" className="text-[10px] uppercase tracking-[0.15em]">Inside Dhaka Charge (৳)</Label>
              <Input id="s-inside" type="number" min="0" step="10" className="mt-1.5 rounded-full" value={insideDhaka} onChange={(e) => setInsideDhaka(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="s-outside" className="text-[10px] uppercase tracking-[0.15em]">Outside Dhaka Charge (৳)</Label>
              <Input id="s-outside" type="number" min="0" step="10" className="mt-1.5 rounded-full" value={outsideDhaka} onChange={(e) => setOutsideDhaka(e.target.value)} />
            </div>
          </div>
        </SectionCard>

        {/* Notifications + Security in 2-col */}
        <div className="grid gap-8 lg:grid-cols-2">
          <SectionCard icon={Bell} title="Notifications" subtitle="Control how you receive alerts and updates">
            <div className="space-y-3">
              <ToggleRow label="Order Email Notifications" desc="Send confirmation emails to customers" checked={notifEmail} onChange={setNotifEmail} />
              <ToggleRow label="SMS Notifications" desc="Send order status SMS updates" checked={notifSMS} onChange={setNotifSMS} />
              <ToggleRow label="New Order Alerts" desc="Get notified when new orders arrive" checked={notifNewOrder} onChange={setNotifNewOrder} />
              <ToggleRow label="Low Stock Alerts" desc="Get notified when product stock is low" checked={notifLowStock} onChange={setNotifLowStock} />
            </div>
          </SectionCard>

          <SectionCard icon={ShieldCheck} title="Security" subtitle="Admin account and store security settings">
            <div className="space-y-3">
              <ToggleRow label="Two-Factor Authentication" desc="Add an extra layer of security to admin login" checked={twoFactor} onChange={setTwoFactor} />
              <div className="flex items-center justify-between rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
                <div>
                  <p className="text-sm font-medium text-destructive">Maintenance Mode</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">Temporarily disable the store for customers</p>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
            </div>
          </SectionCard>
        </div>

        {/* SEO / Meta — full width */}
        <SectionCard icon={Globe} title="SEO & Meta" subtitle="Search engine visibility settings">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-[10px] uppercase tracking-[0.15em]">Meta Title</Label>
              <Input className="mt-1.5 rounded-full" defaultValue="Glorious Japan Skin Care — Authentic Japanese Beauty in Bangladesh" />
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-[0.15em]">Meta Description</Label>
              <Textarea className="mt-1.5 rounded-2xl" rows={2} defaultValue="Premium Japanese skincare: fermented serums, essences and sunscreens. Cash on Delivery & bKash." />
            </div>
          </div>
        </SectionCard>

        {/* Admin Access — full width */}
        <SectionCard icon={Lock} title="Admin Access" subtitle="Manage administrator account credentials">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="a-old-pw" className="text-[10px] uppercase tracking-[0.15em]">Current Password</Label>
              <Input id="a-old-pw" type="password" className="mt-1.5 rounded-full" placeholder="••••••••" />
            </div>
            <div>
              <Label htmlFor="a-new-pw" className="text-[10px] uppercase tracking-[0.15em]">New Password</Label>
              <Input id="a-new-pw" type="password" className="mt-1.5 rounded-full" placeholder="••••••••" />
            </div>
            <div>
              <Label htmlFor="a-confirm-pw" className="text-[10px] uppercase tracking-[0.15em]">Confirm New Password</Label>
              <Input id="a-confirm-pw" type="password" className="mt-1.5 rounded-full" placeholder="••••••••" />
            </div>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">Leave blank to keep your current password.</p>
        </SectionCard>

        <div className="flex justify-end gap-3 pt-2 border-t border-border">
          <button type="button" onClick={() => toast("No changes discarded (demo)")} className="rounded-full border border-border px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-secondary">
            Discard
          </button>
          <Button type="submit" className="rounded-full px-8 py-2.5 text-[11px] uppercase tracking-[0.2em]">
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}