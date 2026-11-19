"use client";

import React from "react";
import { ShieldCheck, Smartphone, Zap, CheckCircle2, FlaskConical } from "lucide-react";
import { formatBDT } from "@/lib/catalog";

export interface BkashInstructionsProps {
  grandTotal: number;
}

export function BkashInstructions({ grandTotal }: BkashInstructionsProps) {
  return (
    <div className="mt-4 rounded-xl border border-[#E2136E]/30 bg-[#E2136E]/5 p-4 sm:p-5 text-xs space-y-3.5 transition-all animate-in fade-in-50 duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#E2136E]/20 pb-2.5">
        <div className="flex items-center gap-2 font-semibold text-[#E2136E]">
          <Smartphone className="h-4 w-4" />
          bKash Direct Gateway Checkout
        </div>
        <span className="rounded-full bg-[#E2136E]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#E2136E]">
          Instant & Automated
        </span>
      </div>

      {/* Main Instruction Box */}
      <div className="rounded-xl bg-card border border-[#E2136E]/20 p-4 space-y-2.5 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E2136E]/10 text-[#E2136E]">
            <Zap className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-foreground text-xs">
              Fast, Seamless & 100% Secure Checkout
            </h4>
            <p className="text-[11.5px] text-muted-foreground leading-relaxed">
              When you click <strong>Pay with bKash</strong> below, you will be smoothly redirected to the official bKash secure payment screen to authorize payment with your bKash mobile number, OTP, and PIN.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Instant automatic order verification</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#E2136E] shrink-0" />
            <span>Official bKash 256-bit encrypted gateway</span>
          </div>
        </div>
      </div>

      {/* Official Sandbox Testing Demo Credentials */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-3.5 text-[11px] space-y-2">
        <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
          <FlaskConical className="h-4 w-4 text-amber-600" />
          <span>bKash Sandbox Simulation Demo Credentials:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
          <div className="bg-background/90 p-2 rounded-lg border border-amber-500/20 shadow-2xs">
            <span className="text-muted-foreground block text-[9.5px] font-sans">Test Wallet Number</span>
            <strong className="text-foreground">01770618575</strong>
          </div>
          <div className="bg-background/90 p-2 rounded-lg border border-amber-500/20 shadow-2xs">
            <span className="text-muted-foreground block text-[9.5px] font-sans">Universal Test OTP</span>
            <strong className="text-foreground">123456</strong>
          </div>
          <div className="bg-background/90 p-2 rounded-lg border border-amber-500/20 shadow-2xs">
            <span className="text-muted-foreground block text-[9.5px] font-sans">Universal Test PIN</span>
            <strong className="text-foreground">12121</strong>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-center text-muted-foreground">
        Payable Amount: <strong className="text-foreground font-semibold">{formatBDT(grandTotal)}</strong> · No extra transaction fees
      </p>
    </div>
  );
}
