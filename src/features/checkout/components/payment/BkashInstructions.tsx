"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, Smartphone } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatBDT } from "@/lib/catalog";
import { toast } from "sonner";

export interface BkashInstructionsProps {
  grandTotal: number;
  bkashPhone: string;
  onBkashPhoneChange: (val: string) => void;
  bkashTrxId: string;
  onBkashTrxIdChange: (val: string) => void;
  merchantNumber?: string | undefined;
  accountType?: "Merchant" | "Personal" | "Send Money" | undefined;
  instructions?: string | undefined;
}

export function BkashInstructions({
  grandTotal,
  bkashPhone,
  onBkashPhoneChange,
  bkashTrxId,
  onBkashTrxIdChange,
  merchantNumber = "01788-990011",
  accountType = "Merchant",
  instructions,
}: BkashInstructionsProps) {
  const [copied, setCopied] = useState(false);
  const targetNumber = merchantNumber.trim() || "01788-990011";

  const handleCopy = () => {
    navigator.clipboard.writeText(targetNumber.replace(/[\s-]/g, ""));
    setCopied(true);
    toast.success("bKash number copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  const actionText =
    accountType === "Merchant"
      ? "Make Payment"
      : accountType === "Personal"
        ? "Send Money"
        : "Send Money";

  return (
    <div className="mt-4 rounded-xl border border-[#E2136E]/30 bg-[#E2136E]/5 p-4 sm:p-5 text-xs space-y-3.5">
      <div className="flex items-center justify-between border-b border-[#E2136E]/20 pb-2.5">
        <div className="flex items-center gap-2 font-semibold text-[#E2136E]">
          <Smartphone className="h-4 w-4" />
          bKash Direct {actionText}
        </div>
        <span className="rounded-full bg-[#E2136E]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#E2136E]">
          Account Type: {accountType}
        </span>
      </div>

      <ol className="list-decimal pl-4 space-y-1.5 text-muted-foreground leading-relaxed">
        <li>
          Open your bKash App or dial <strong className="text-foreground">*247#</strong>.
        </li>
        <li className="flex flex-wrap items-center gap-1.5">
          <span>
            Select <strong>{actionText}</strong> to our verified {accountType} number:
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-background px-2 py-0.5 font-mono font-bold text-foreground border border-border">
            {targetNumber}
            <button
              type="button"
              onClick={handleCopy}
              className="text-[#E2136E] hover:opacity-80 p-0.5 transition-opacity"
              title="Copy Number"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
            </button>
          </span>
        </li>
        <li>
          Enter Amount: <strong className="text-foreground font-semibold">{formatBDT(grandTotal)}</strong>.
        </li>
        <li>
          Reference: <strong className="text-foreground">GLORIOUS</strong> (or your phone number).
        </li>
        <li>
          Enter your bKash PIN to confirm transaction. Once confirmed, fill out the form below:
        </li>
      </ol>

      {instructions && (
        <div className="rounded-lg bg-background/60 p-2.5 border border-[#E2136E]/20 text-[11px] text-muted-foreground flex items-start gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[#E2136E] shrink-0 mt-0.5" />
          <p className="leading-relaxed">{instructions}</p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 pt-1 border-t border-[#E2136E]/15">
        <div>
          <Label htmlFor="bkashPhone" className="text-[11px] font-semibold text-foreground">
            Your Sender bKash Number <span className="text-rose">*</span>
          </Label>
          <Input
            id="bkashPhone"
            required
            value={bkashPhone}
            onChange={(e) => onBkashPhoneChange(e.target.value)}
            placeholder="017XXXXXXXX"
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>
        <div>
          <Label htmlFor="bkashTrx" className="text-[11px] font-semibold text-foreground">
            Transaction ID (TrxID) <span className="text-rose">*</span>
          </Label>
          <Input
            id="bkashTrx"
            required
            value={bkashTrxId}
            onChange={(e) => onBkashTrxIdChange(e.target.value.toUpperCase())}
            placeholder="e.g. BL9A8BC71D"
            className="mt-1 h-9 rounded-full text-xs font-mono uppercase"
          />
        </div>
      </div>
    </div>
  );
}
