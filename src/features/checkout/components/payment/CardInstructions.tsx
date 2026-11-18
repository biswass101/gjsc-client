"use client";

import React, { useMemo } from "react";
import {
  CreditCard,
  Building2,
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatBDT } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export interface CardInstructionsProps {
  grandTotal: number;
  cardGateway?: string | undefined;
  cardInstructions?: string | undefined;
  cardTestMode?: boolean | undefined;
  cardholderName: string;
  onCardholderNameChange: (val: string) => void;
  cardNumber: string;
  onCardNumberChange: (val: string) => void;
  cardExpiry: string;
  onCardExpiryChange: (val: string) => void;
  cardCvc: string;
  onCardCvcChange: (val: string) => void;
  cardPaymentType: "card" | "netbanking";
  onCardPaymentTypeChange: (val: "card" | "netbanking") => void;
  selectedBank: string;
  onSelectedBankChange: (val: string) => void;
}

const POPULAR_BANKS = [
  { id: "city_touch", name: "City Touch", bank: "City Bank Limited", color: "from-red-500/20 to-rose-500/10" },
  { id: "ebl_skybanking", name: "EBL Skybanking", bank: "Eastern Bank PLC", color: "from-blue-500/20 to-sky-500/10" },
  { id: "dbbl_nexus", name: "DBBL NexusPay", bank: "Dutch-Bangla Bank", color: "from-emerald-500/20 to-teal-500/10" },
  { id: "ibbl_cellfin", name: "Cellfin / IBBL", bank: "Islami Bank Bangladesh", color: "from-green-500/20 to-emerald-500/10" },
  { id: "brac_astha", name: "BRAC Astha", bank: "BRAC Bank PLC", color: "from-amber-500/20 to-orange-500/10" },
  { id: "scb_online", name: "SC Mobile", bank: "Standard Chartered BD", color: "from-cyan-500/20 to-blue-500/10" },
];

export function CardInstructions({
  grandTotal,
  cardGateway = "SSLCommerz / Shurjopay Enterprise",
  cardInstructions,
  cardTestMode = false,
  cardholderName,
  onCardholderNameChange,
  cardNumber,
  onCardNumberChange,
  cardExpiry,
  onCardExpiryChange,
  cardCvc,
  onCardCvcChange,
  cardPaymentType,
  onCardPaymentTypeChange,
  selectedBank,
  onSelectedBankChange,
}: CardInstructionsProps) {
  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    const parts = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.substring(i, i + 4));
    }
    onCardNumberChange(parts.join(" "));
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      onCardExpiryChange(`${digits.slice(0, 2)}/${digits.slice(2, 4)}`);
    } else {
      onCardExpiryChange(digits);
    }
  };

  // Detect card brand
  const cardBrand = useMemo(() => {
    const clean = cardNumber.replace(/\D/g, "");
    if (!clean) return "Card";
    if (clean.startsWith("4")) return "Visa";
    if (/^(5[1-5]|2[2-7])/.test(clean)) return "Mastercard";
    if (/^3[47]/.test(clean)) return "American Express";
    if (/^62/.test(clean)) return "UnionPay";
    return "Card";
  }, [cardNumber]);

  return (
    <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4 sm:p-5 text-xs space-y-4">
      {/* Header with Gateway and Security Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
            <CreditCard className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">
              Secure Online Payment Gateway
            </h4>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <span>Powered by {cardGateway}</span>
              <span>•</span>
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                <Lock className="h-3 w-3 mr-0.5 inline" /> 256-bit TLS Encrypted
              </span>
            </p>
          </div>
        </div>

        {cardTestMode && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <AlertCircle className="h-3 w-3" /> Sandbox Mode Active
          </span>
        )}
      </div>

      {/* Tabs: Debit/Credit Card vs Internet Banking */}
      <div className="flex rounded-lg border border-border/80 bg-background/80 p-1">
        <button
          type="button"
          onClick={() => onCardPaymentTypeChange("card")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-xs font-semibold transition-all",
            cardPaymentType === "card"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <CreditCard className="h-3.5 w-3.5" />
          Debit / Credit Card
        </button>
        <button
          type="button"
          onClick={() => onCardPaymentTypeChange("netbanking")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-xs font-semibold transition-all",
            cardPaymentType === "netbanking"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Building2 className="h-3.5 w-3.5" />
          Internet / Net Banking
        </button>
      </div>

      {/* CARD PAYMENT FORM */}
      {cardPaymentType === "card" && (
        <div className="space-y-3.5 pt-1">
          {/* Card Preview Banner */}
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Glorious Japan Skincare Direct Pay
              </span>
              <span className="rounded-md bg-background/80 px-2 py-0.5 text-[10px] font-bold text-primary border border-primary/20">
                {cardBrand}
              </span>
            </div>
            <div className="my-2.5 font-mono text-sm tracking-wider text-foreground">
              {cardNumber || "•••• •••• •••• ••••"}
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <div>
                <span className="text-[9px] uppercase tracking-wider block">Cardholder</span>
                <span className="font-semibold text-foreground uppercase">
                  {cardholderName || "YOUR NAME"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider block">Expires</span>
                <span className="font-semibold text-foreground">
                  {cardExpiry || "MM/YY"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div>
              <Label htmlFor="cardholderName" className="text-[11px] font-semibold">
                Cardholder Name <span className="text-rose">*</span>
              </Label>
              <Input
                id="cardholderName"
                value={cardholderName}
                onChange={(e) => onCardholderNameChange(e.target.value)}
                placeholder="e.g. SADIA RAHMAN"
                className="mt-1 h-9 rounded-full text-xs uppercase"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="cardNumber" className="text-[11px] font-semibold">
                  Card Number <span className="text-rose">*</span>
                </Label>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span>Visa</span>
                  <span>•</span>
                  <span>Mastercard</span>
                  <span>•</span>
                  <span>AMEX</span>
                  <span>•</span>
                  <span>UnionPay</span>
                </div>
              </div>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                placeholder="4532 0123 4567 8910"
                className="mt-1 h-9 rounded-full text-xs font-mono tracking-wider"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="cardExpiry" className="text-[11px] font-semibold">
                  Expiry Date <span className="text-rose">*</span>
                </Label>
                <Input
                  id="cardExpiry"
                  value={cardExpiry}
                  onChange={(e) => handleExpiryChange(e.target.value)}
                  placeholder="MM/YY"
                  className="mt-1 h-9 rounded-full text-xs font-mono"
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cardCvc" className="text-[11px] font-semibold">
                  Security Code (CVV/CVC) <span className="text-rose">*</span>
                </Label>
                <Input
                  id="cardCvc"
                  type="password"
                  value={cardCvc}
                  onChange={(e) => onCardCvcChange(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="•••"
                  className="mt-1 h-9 rounded-full text-xs font-mono"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERNET BANKING SELECTOR */}
      {cardPaymentType === "netbanking" && (
        <div className="space-y-3 pt-1">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Select your preferred Bangladesh internet banking portal. Upon placing your order, an instant verified payment token will be authorized for <strong>{formatBDT(grandTotal)}</strong>:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {POPULAR_BANKS.map((b) => {
              const isSelected = selectedBank === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => onSelectedBankChange(b.id)}
                  className={cn(
                    "flex flex-col items-start p-3 rounded-xl border text-left transition-all relative overflow-hidden",
                    isSelected
                      ? "border-primary bg-primary/10 ring-1 ring-primary/40 shadow-xs"
                      : "border-border/70 bg-card hover:border-primary/40 hover:bg-secondary/40",
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                      <Building className="h-3 w-3 text-primary" />
                      {b.name}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground leading-tight">
                    {b.bank}
                  </span>
                </button>
              );
            })}
          </div>

          {!selectedBank && (
            <p className="text-[10px] text-rose-500 font-medium">
              * Please click on one of the above banking portals to proceed.
            </p>
          )}
        </div>
      )}

      {/* Instructions footer from admin settings */}
      {cardInstructions && (
        <div className="rounded-lg bg-background/60 p-2.5 border border-border/50 text-[11px] text-muted-foreground flex items-start gap-2">
          <Sparkles className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed">{cardInstructions}</p>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border/50 pt-2.5 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          PCI-DSS Level 1 Compliant Checkout
        </span>
        <span className="font-semibold text-foreground">
          Payable Now: {formatBDT(grandTotal)}
        </span>
      </div>
    </div>
  );
}
