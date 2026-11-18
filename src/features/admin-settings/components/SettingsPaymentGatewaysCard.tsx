"use client";

import React from "react";
import {
  Banknote,
  CreditCard,
  Wallet,
  ShieldCheck,
  Building2,
  Lock,
  Sparkles,
  Save,
  CheckCircle2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface SettingsPaymentGatewaysCardProps {
  // COD
  codEnabled: boolean;
  setCodEnabled: (val: boolean) => void;
  codMinAmount: string;
  setCodMinAmount: (val: string) => void;
  codMaxAmount: string;
  setCodMaxAmount: (val: string) => void;
  codInstructions: string;
  setCodInstructions: (val: string) => void;

  // bKash
  bkashEnabled: boolean;
  setBkashEnabled: (val: boolean) => void;
  bkashMerchantNumber: string;
  setBkashMerchantNumber: (val: string) => void;
  bkashAccountType: "Merchant" | "Personal" | "Send Money";
  setBkashAccountType: (val: "Merchant" | "Personal" | "Send Money") => void;
  bkashInstructions: string;
  setBkashInstructions: (val: string) => void;

  // Nagad
  nagadEnabled: boolean;
  setNagadEnabled: (val: boolean) => void;
  nagadMerchantNumber: string;
  setNagadMerchantNumber: (val: string) => void;
  nagadAccountType: "Merchant" | "Personal" | "Send Money";
  setNagadAccountType: (val: "Merchant" | "Personal" | "Send Money") => void;
  nagadInstructions: string;
  setNagadInstructions: (val: string) => void;

  // Card & Online Banking
  cardEnabled: boolean;
  setCardEnabled: (val: boolean) => void;
  cardGateway: string;
  setCardGateway: (val: string) => void;
  cardStoreId: string;
  setCardStoreId: (val: string) => void;
  cardInstructions: string;
  setCardInstructions: (val: string) => void;
  cardTestMode: boolean;
  setCardTestMode: (val: boolean) => void;

  // Real-time API & DB operations
  onSavePaymentGateways?: () => Promise<void>;
  isSavingPayment?: boolean;
  onToggleGateway?: (gatewayKey: string, enabled: boolean) => Promise<void>;
}

export function SettingsPaymentGatewaysCard({
  codEnabled,
  setCodEnabled,
  codMinAmount,
  setCodMinAmount,
  codMaxAmount,
  setCodMaxAmount,
  codInstructions,
  setCodInstructions,
  bkashEnabled,
  setBkashEnabled,
  bkashMerchantNumber,
  setBkashMerchantNumber,
  bkashAccountType,
  setBkashAccountType,
  bkashInstructions,
  setBkashInstructions,
  nagadEnabled,
  setNagadEnabled,
  nagadMerchantNumber,
  setNagadMerchantNumber,
  nagadAccountType,
  setNagadAccountType,
  nagadInstructions,
  setNagadInstructions,
  cardEnabled,
  setCardEnabled,
  cardGateway,
  setCardGateway,
  cardStoreId,
  setCardStoreId,
  cardInstructions,
  setCardInstructions,
  cardTestMode,
  setCardTestMode,
  onSavePaymentGateways,
  isSavingPayment = false,
  onToggleGateway,
}: SettingsPaymentGatewaysCardProps) {
  const activeCount = [codEnabled, bkashEnabled, nagadEnabled, cardEnabled].filter(Boolean).length;

  return (
    <div className="surface-card p-5 sm:p-6 space-y-6">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base font-semibold text-foreground">
                Payment Gateways & Payment Methods Management
              </h2>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                {activeCount} of 4 Active
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Configure Cash on Delivery (COD), bKash, Nagad, and Card / NetBanking options with direct MySQL sync to /checkout
            </p>
          </div>
        </div>

        {onSavePaymentGateways && (
          <Button
            type="button"
            onClick={onSavePaymentGateways}
            disabled={isSavingPayment}
            size="sm"
            className="rounded-full text-xs px-4 h-8 gap-1.5 shadow-sm self-start sm:self-center shrink-0"
          >
            <Save className="h-3.5 w-3.5" />
            {isSavingPayment ? "Saving..." : "Save Payment Gateways"}
          </Button>
        )}
      </div>

      <div className="space-y-5">
        {/* ========================================================= */}
        {/* 1. Cash on Delivery (COD) */}
        {/* ========================================================= */}
        <div className="rounded-xl border border-border/80 p-4 bg-secondary/10 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <Banknote className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-foreground flex items-center gap-2 text-xs sm:text-sm">
                  Cash on Delivery (COD)
                  {codEnabled ? (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Active at Checkout
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Disabled
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Customers pay courier upon inspecting and receiving Japanese skincare parcel
                </p>
              </div>
            </div>
            <Switch
              checked={codEnabled}
              onCheckedChange={(val) => {
                setCodEnabled(val);
                onToggleGateway?.("codEnabled", val);
              }}
            />
          </div>

          {codEnabled && (
            <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-border/50">
              <div>
                <Label className="text-[11px] font-semibold">Min Order Limit (৳)</Label>
                <Input
                  type="number"
                  min={0}
                  value={codMinAmount}
                  onChange={(e) => setCodMinAmount(e.target.value)}
                  placeholder="0 (No Minimum)"
                  className="mt-1 h-8 rounded-full text-xs font-mono"
                />
              </div>
              <div>
                <Label className="text-[11px] font-semibold">Max Order Limit for COD (৳)</Label>
                <Input
                  type="number"
                  min={0}
                  value={codMaxAmount}
                  onChange={(e) => setCodMaxAmount(e.target.value)}
                  placeholder="30000"
                  className="mt-1 h-8 rounded-full text-xs font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-[11px] font-semibold">Customer Instructions / Advisory Note</Label>
                <Textarea
                  value={codInstructions}
                  onChange={(e) => setCodInstructions(e.target.value)}
                  rows={2}
                  className="mt-1 text-xs rounded-xl"
                  placeholder="Instructions displayed to customers when Cash on Delivery is selected"
                />
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 2. bKash Mobile Payment */}
        {/* ========================================================= */}
        <div className="rounded-xl border border-border/80 p-4 bg-secondary/10 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#E2136E]/10 text-[#E2136E]">
                <Wallet className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-foreground flex items-center gap-2 text-xs sm:text-sm">
                  bKash Mobile Payment
                  {bkashEnabled ? (
                    <span className="rounded-full bg-[#E2136E]/15 px-2 py-0.5 text-[10px] font-semibold text-[#E2136E]">
                      Active at Checkout
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Disabled
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Direct wallet transfers via bKash App or USSD *247#
                </p>
              </div>
            </div>
            <Switch
              checked={bkashEnabled}
              onCheckedChange={(val) => {
                setBkashEnabled(val);
                onToggleGateway?.("bkashEnabled", val);
              }}
            />
          </div>

          {bkashEnabled && (
            <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-border/50">
              <div>
                <Label className="text-[11px] font-semibold">bKash Account / Merchant Number</Label>
                <Input
                  value={bkashMerchantNumber}
                  onChange={(e) => setBkashMerchantNumber(e.target.value)}
                  placeholder="01788-990011"
                  className="mt-1 h-8 rounded-full text-xs font-mono"
                />
              </div>
              <div>
                <Label className="text-[11px] font-semibold">Account Type</Label>
                <select
                  value={bkashAccountType}
                  onChange={(e) =>
                    setBkashAccountType(e.target.value as "Merchant" | "Personal" | "Send Money")
                  }
                  className="mt-1 h-8 w-full rounded-full border border-input bg-background px-3 text-xs"
                >
                  <option value="Merchant">Merchant (Make Payment)</option>
                  <option value="Personal">Personal (Send Money)</option>
                  <option value="Send Money">Agent / Cash-In</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label className="text-[11px] font-semibold">Payment Instructions shown to Customer</Label>
                <Textarea
                  value={bkashInstructions}
                  onChange={(e) => setBkashInstructions(e.target.value)}
                  rows={2}
                  className="mt-1 text-xs rounded-xl"
                  placeholder="Instructions guiding customer on how to pay and submit TrxID"
                />
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 3. Nagad Mobile Payment */}
        {/* ========================================================= */}
        <div className="rounded-xl border border-border/80 p-4 bg-secondary/10 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#F7941D]/10 text-[#F7941D]">
                <Wallet className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-foreground flex items-center gap-2 text-xs sm:text-sm">
                  Nagad Mobile Payment
                  {nagadEnabled ? (
                    <span className="rounded-full bg-[#F7941D]/15 px-2 py-0.5 text-[10px] font-semibold text-[#F7941D]">
                      Active at Checkout
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Disabled
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Bangladesh Post Office MFS wallet via Nagad App or USSD *167#
                </p>
              </div>
            </div>
            <Switch
              checked={nagadEnabled}
              onCheckedChange={(val) => {
                setNagadEnabled(val);
                onToggleGateway?.("nagadEnabled", val);
              }}
            />
          </div>

          {nagadEnabled && (
            <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-border/50">
              <div>
                <Label className="text-[11px] font-semibold">Nagad Account / Merchant Number</Label>
                <Input
                  value={nagadMerchantNumber}
                  onChange={(e) => setNagadMerchantNumber(e.target.value)}
                  placeholder="01988-990022"
                  className="mt-1 h-8 rounded-full text-xs font-mono"
                />
              </div>
              <div>
                <Label className="text-[11px] font-semibold">Account Type</Label>
                <select
                  value={nagadAccountType}
                  onChange={(e) =>
                    setNagadAccountType(e.target.value as "Merchant" | "Personal" | "Send Money")
                  }
                  className="mt-1 h-8 w-full rounded-full border border-input bg-background px-3 text-xs"
                >
                  <option value="Merchant">Merchant (Merchant Pay)</option>
                  <option value="Personal">Personal (Send Money)</option>
                  <option value="Send Money">Agent / Cash-In</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label className="text-[11px] font-semibold">Payment Instructions shown to Customer</Label>
                <Textarea
                  value={nagadInstructions}
                  onChange={(e) => setNagadInstructions(e.target.value)}
                  rows={2}
                  className="mt-1 text-xs rounded-xl"
                  placeholder="Instructions guiding customer on how to pay via Nagad and submit TrxID"
                />
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 4. Debit / Credit Card / Internet Banking */}
        {/* ========================================================= */}
        <div className="rounded-xl border border-border/80 p-4 bg-secondary/10 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-foreground flex items-center gap-2 text-xs sm:text-sm">
                  Debit / Credit Card & Internet Banking
                  {cardEnabled ? (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      Active at Checkout
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Disabled
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Visa, Mastercard, AMEX, DBBL NexusPay, and Direct NetBanking (City Touch, EBL, Islami Bank)
                </p>
              </div>
            </div>
            <Switch
              checked={cardEnabled}
              onCheckedChange={(val) => {
                setCardEnabled(val);
                onToggleGateway?.("cardEnabled", val);
              }}
            />
          </div>

          {cardEnabled && (
            <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-border/50">
              <div>
                <Label className="text-[11px] font-semibold">Gateway Provider</Label>
                <select
                  value={cardGateway}
                  onChange={(e) => setCardGateway(e.target.value)}
                  className="mt-1 h-8 w-full rounded-full border border-input bg-background px-3 text-xs"
                >
                  <option value="SSLCommerz">SSLCommerz (Recommended for BD)</option>
                  <option value="AamarPay">AamarPay Multi-Channel</option>
                  <option value="Shurjopay">Shurjopay Gateway</option>
                  <option value="PortPos">PortPos Direct Gateway</option>
                  <option value="Custom Direct">Custom Merchant Direct</option>
                </select>
              </div>

              <div>
                <Label className="text-[11px] font-semibold">Store ID / Merchant ID</Label>
                <Input
                  value={cardStoreId}
                  onChange={(e) => setCardStoreId(e.target.value)}
                  placeholder="GLORIOUS_JAPAN_STORE"
                  className="mt-1 h-8 rounded-full text-xs font-mono"
                />
              </div>

              {/* Sandbox / Test Mode Switch */}
              <div className="sm:col-span-2 flex items-center justify-between p-3 rounded-xl border border-border/80 bg-background">
                <div>
                  <Label className="text-xs font-semibold text-foreground">
                    Sandbox / Test Simulation Mode
                  </Label>
                  <p className="text-[11px] text-muted-foreground">
                    Enable test environment for sandbox credentials and mock authorization before going live
                  </p>
                </div>
                <Switch
                  checked={cardTestMode}
                  onCheckedChange={(val) => {
                    setCardTestMode(val);
                    onToggleGateway?.("cardTestMode", val);
                  }}
                />
              </div>

              <div className="sm:col-span-2">
                <Label className="text-[11px] font-semibold">Customer Notice & Card Security Info</Label>
                <Textarea
                  value={cardInstructions}
                  onChange={(e) => setCardInstructions(e.target.value)}
                  rows={2}
                  className="mt-1 text-xs rounded-xl"
                  placeholder="Security and card usage notice displayed to buyers selecting Card or Internet Banking"
                />
              </div>

              {/* Supported Networks Badge Row */}
              <div className="sm:col-span-2 flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-muted-foreground mr-1">Supported Channels:</span>
                {["Visa", "Mastercard", "American Express", "DBBL Nexus", "City Touch", "EBL Skybanking", "Islami Bank", "Upay"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-md bg-background border border-border/60 px-2 py-0.5 text-[10px] font-medium text-foreground"
                  >
                    <Lock className="h-2.5 w-2.5 text-muted-foreground" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        {onSavePaymentGateways && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/60">
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>Toggling switches auto-syncs with database instantly. Click button to persist custom numbers & instructions.</span>
            </div>
            <Button
              type="button"
              onClick={onSavePaymentGateways}
              disabled={isSavingPayment}
              size="sm"
              className="rounded-full text-xs px-6 h-9 gap-2 shadow-xs shrink-0"
            >
              <Save className="h-4 w-4" />
              {isSavingPayment ? "Saving to Database..." : "Save Payment Gateways & Sync Checkout"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
