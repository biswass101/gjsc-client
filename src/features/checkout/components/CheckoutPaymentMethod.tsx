"use client";

import React, { useEffect, useMemo } from "react";
import { Banknote, CreditCard, Wallet, AlertCircle, ShieldCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/context/admin-context";
import { formatBDT } from "@/lib/catalog";
import type { PaymentMethod } from "../types";
import { BkashInstructions } from "./payment/BkashInstructions";
import { NagadInstructions } from "./payment/NagadInstructions";
import { CardInstructions } from "./payment/CardInstructions";

export interface CheckoutPaymentMethodProps {
  payment: PaymentMethod;
  onPaymentChange: (method: PaymentMethod) => void;
  grandTotal: number;
  bkashPhone: string;
  onBkashPhoneChange: (val: string) => void;
  bkashTrxId: string;
  onBkashTrxIdChange: (val: string) => void;
  nagadPhone: string;
  onNagadPhoneChange: (val: string) => void;
  nagadTrxId: string;
  onNagadTrxIdChange: (val: string) => void;
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

export function CheckoutPaymentMethod({
  payment,
  onPaymentChange,
  grandTotal,
  bkashPhone,
  onBkashPhoneChange,
  bkashTrxId,
  onBkashTrxIdChange,
  nagadPhone,
  onNagadPhoneChange,
  nagadTrxId,
  onNagadTrxIdChange,
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
}: CheckoutPaymentMethodProps) {
  const { settings } = useAdmin();

  // Validate COD amount range
  const codMin = settings.codMinAmount ?? 0;
  const codMax = settings.codMaxAmount ?? 50000;
  const isCodAmountValid = (codMin === 0 || grandTotal >= codMin) && (codMax === 0 || grandTotal <= codMax);
  const isCodAvailable = settings.codEnabled && isCodAmountValid;

  // Active payment methods list
  const availableMethods = useMemo(() => {
    const list: PaymentMethod[] = [];
    if (isCodAvailable) list.push("cod");
    if (settings.bkashEnabled) list.push("bkash");
    if (settings.nagadEnabled) list.push("nagad");
    if (settings.cardEnabled) list.push("card");
    return list;
  }, [isCodAvailable, settings.bkashEnabled, settings.nagadEnabled, settings.cardEnabled]);

  // If the currently selected payment method is not available, switch automatically
  useEffect(() => {
    if (availableMethods.length > 0 && !availableMethods.includes(payment)) {
      const first = availableMethods[0];
      if (first) {
        onPaymentChange(first);
      }
    }
  }, [availableMethods, payment, onPaymentChange]);

  const hasAnyPaymentMethod =
    settings.codEnabled || settings.bkashEnabled || settings.nagadEnabled || settings.cardEnabled;

  return (
    <section className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            3
          </span>
          <h2 className="font-display text-lg sm:text-xl font-medium">Payment Method</h2>
        </div>
        <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          Verified Channels
        </span>
      </div>

      {!hasAnyPaymentMethod ? (
        <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-center text-xs">
          <AlertCircle className="mx-auto h-6 w-6 text-amber-600 mb-2" />
          <h3 className="font-bold text-foreground text-sm">Online Payments Temporarily Unavailable</h3>
          <p className="mt-1 text-muted-foreground">
            Our payment gateways are undergoing scheduled maintenance. Please reach our customer support at{" "}
            <strong>{settings.contactPhone || "+880 1700-000000"}</strong> to place your order via telephone.
          </p>
        </div>
      ) : (
        <RadioGroup
          value={payment}
          onValueChange={(v) => onPaymentChange(v as PaymentMethod)}
          className="mt-5 grid gap-3"
        >
          {/* Option 1: Cash on Delivery (COD) */}
          {settings.codEnabled && (
            <label
              className={cn(
                "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
                !isCodAmountValid && "opacity-60 cursor-not-allowed bg-muted/20",
                payment === "cod" && isCodAmountValid
                  ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                  : "border-border hover:border-primary/50",
              )}
            >
              <RadioGroupItem
                value="cod"
                id="cod"
                disabled={!isCodAmountValid}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Banknote className="h-4 w-4 text-primary" />
                    Cash on Delivery (COD)
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Pay at Doorstep
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {settings.codInstructions ||
                    "Pay with cash to our courier partner upon inspecting the parcel seal at your doorstep."}
                </p>
                {!isCodAmountValid && (
                  <p className="mt-1.5 text-[11px] font-medium text-rose-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    COD is only available for orders between {formatBDT(codMin)} and {formatBDT(codMax)}.
                  </p>
                )}
              </div>
            </label>
          )}

          {/* Option 2: bKash Mobile Payment */}
          {settings.bkashEnabled && (
            <label
              className={cn(
                "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
                payment === "bkash"
                  ? "border-[#E2136E] bg-[#E2136E]/10 ring-1 ring-[#E2136E]/30"
                  : "border-border hover:border-[#E2136E]/50",
              )}
            >
              <RadioGroupItem value="bkash" id="bkash" className="mt-1 text-[#E2136E]" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-[#E2136E]" />
                    bKash Mobile Payment
                  </span>
                  <span className="rounded-full bg-[#E2136E]/15 px-2 py-0.5 text-[10px] font-bold text-[#E2136E]">
                    {settings.bkashAccountType || "Merchant"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {settings.bkashInstructions ||
                    "Pay directly using your bKash app or dial *247# to our verified account."}
                </p>
              </div>
            </label>
          )}

          {/* Option 3: Nagad Mobile Payment */}
          {settings.nagadEnabled && (
            <label
              className={cn(
                "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
                payment === "nagad"
                  ? "border-[#F7941D] bg-[#F7941D]/10 ring-1 ring-[#F7941D]/30"
                  : "border-border hover:border-[#F7941D]/50",
              )}
            >
              <RadioGroupItem value="nagad" id="nagad" className="mt-1 text-[#F7941D]" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-[#F7941D]" />
                    Nagad Mobile Payment
                  </span>
                  <span className="rounded-full bg-[#F7941D]/15 px-2 py-0.5 text-[10px] font-bold text-[#F7941D]">
                    {settings.nagadAccountType || "Merchant"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {settings.nagadInstructions ||
                    "Instant confirmation via your Nagad mobile wallet or *167#."}
                </p>
              </div>
            </label>
          )}

          {/* Option 4: Debit / Credit Card / Internet Banking */}
          {settings.cardEnabled && (
            <label
              className={cn(
                "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
                payment === "card"
                  ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                  : "border-border hover:border-primary/50",
              )}
            >
              <RadioGroupItem value="card" id="card" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Debit / Credit Card / Internet Banking
                  </span>
                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    Visa · Master · AMEX · NetBanking
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {settings.cardInstructions ||
                    "Pay securely via 256-bit encrypted gateway. Supports Bangladesh debit/credit cards and online banking."}
                </p>
              </div>
            </label>
          )}
        </RadioGroup>
      )}

      {/* Dynamic Payment Instruction Panels */}
      {payment === "bkash" && settings.bkashEnabled && (
        <BkashInstructions
          grandTotal={grandTotal}
          bkashPhone={bkashPhone}
          onBkashPhoneChange={onBkashPhoneChange}
          bkashTrxId={bkashTrxId}
          onBkashTrxIdChange={onBkashTrxIdChange}
          merchantNumber={settings.bkashMerchantNumber}
          accountType={settings.bkashAccountType}
          instructions={settings.bkashInstructions}
        />
      )}

      {payment === "nagad" && settings.nagadEnabled && (
        <NagadInstructions
          grandTotal={grandTotal}
          nagadPhone={nagadPhone}
          onNagadPhoneChange={onNagadPhoneChange}
          nagadTrxId={nagadTrxId}
          onNagadTrxIdChange={onNagadTrxIdChange}
          merchantNumber={settings.nagadMerchantNumber}
          accountType={settings.nagadAccountType}
          instructions={settings.nagadInstructions}
        />
      )}

      {payment === "card" && settings.cardEnabled && (
        <CardInstructions
          grandTotal={grandTotal}
          cardGateway={settings.cardGateway}
          cardInstructions={settings.cardInstructions}
          cardTestMode={settings.cardTestMode}
          cardholderName={cardholderName}
          onCardholderNameChange={onCardholderNameChange}
          cardNumber={cardNumber}
          onCardNumberChange={onCardNumberChange}
          cardExpiry={cardExpiry}
          onCardExpiryChange={onCardExpiryChange}
          cardCvc={cardCvc}
          onCardCvcChange={onCardCvcChange}
          cardPaymentType={cardPaymentType}
          onCardPaymentTypeChange={onCardPaymentTypeChange}
          selectedBank={selectedBank}
          onSelectedBankChange={onSelectedBankChange}
        />
      )}
    </section>
  );
}
