"use client";

import { Banknote, CreditCard, Wallet } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "../types";
import { BkashInstructions } from "./payment/BkashInstructions";
import { NagadInstructions } from "./payment/NagadInstructions";

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
}: CheckoutPaymentMethodProps) {
  return (
    <section className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
      <div className="flex items-center gap-2 border-b border-border/50 pb-3">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          3
        </span>
        <h2 className="font-display text-lg sm:text-xl font-medium">Payment Method</h2>
      </div>

      <RadioGroup
        value={payment}
        onValueChange={(v) => onPaymentChange(v as PaymentMethod)}
        className="mt-5 grid gap-3"
      >
        {/* Option 1: Cash on Delivery */}
        <label
          className={cn(
            "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
            payment === "cod"
              ? "border-primary bg-primary/10 ring-1 ring-primary/30"
              : "border-border hover:border-primary/50",
          )}
        >
          <RadioGroupItem value="cod" id="cod" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Banknote className="h-4 w-4 text-primary" />
                Cash on Delivery (COD)
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Recommended
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Pay in cash or bKash when courier hands over your sealed Japanese skincare parcel. You
              can inspect the outer packaging before payment.
            </p>
          </div>
        </label>

        {/* Option 2: bKash */}
        <label
          className={cn(
            "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
            payment === "bkash"
              ? "border-[#E2136E] bg-[#E2136E]/10 ring-1 ring-[#E2136E]/30"
              : "border-border hover:border-primary/50",
          )}
        >
          <RadioGroupItem value="bkash" id="bkash" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Wallet className="h-4 w-4 text-[#E2136E]" />
                bKash Mobile Payment
              </span>
              <span className="rounded-full bg-[#E2136E]/15 px-2 py-0.5 text-[10px] font-bold text-[#E2136E]">
                Fast MFS
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Send payment directly from your bKash app to our verified Merchant / Personal account.
            </p>
          </div>
        </label>

        {/* Option 3: Nagad */}
        <label
          className={cn(
            "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
            payment === "nagad"
              ? "border-[#F7941D] bg-[#F7941D]/10 ring-1 ring-[#F7941D]/30"
              : "border-border hover:border-primary/50",
          )}
        >
          <RadioGroupItem value="nagad" id="nagad" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Wallet className="h-4 w-4 text-[#F7941D]" />
                Nagad Mobile Payment
              </span>
              <span className="rounded-full bg-[#F7941D]/15 px-2 py-0.5 text-[10px] font-bold text-[#F7941D]">
                0% Fee
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Pay using your Nagad account for seamless instant confirmation.
            </p>
          </div>
        </label>

        {/* Option 4: Debit / Credit Card */}
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
              <span className="text-[10px] font-medium text-muted-foreground">
                Visa · Master · AMEX
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Pay securely with your Bangladeshi or international card via SSLCommerz gateway.
            </p>
          </div>
        </label>
      </RadioGroup>

      {payment === "bkash" && (
        <BkashInstructions
          grandTotal={grandTotal}
          bkashPhone={bkashPhone}
          onBkashPhoneChange={onBkashPhoneChange}
          bkashTrxId={bkashTrxId}
          onBkashTrxIdChange={onBkashTrxIdChange}
        />
      )}

      {payment === "nagad" && (
        <NagadInstructions
          grandTotal={grandTotal}
          nagadPhone={nagadPhone}
          onNagadPhoneChange={onNagadPhoneChange}
          nagadTrxId={nagadTrxId}
          onNagadTrxIdChange={onNagadTrxIdChange}
        />
      )}
    </section>
  );
}
