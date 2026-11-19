"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Smartphone, ShieldCheck, ArrowRight, X, Lock, CheckCircle2, RefreshCw } from "lucide-react";
import { formatBDT } from "@/lib/catalog";

function BkashSandboxContent() {
  const searchParams = useSearchParams();
  const paymentID = searchParams.get("paymentID") || "SB_SIM_DEMO";
  const amountStr = searchParams.get("amount") || "1060.00";
  const amount = Number(amountStr) || 1060;
  const invoice = searchParams.get("invoice") || "GJ-2026-DEMO";
  const callbackURL = searchParams.get("callbackURL") || "http://localhost:4000/api/v1/payments/bkash/callback";

  const [step, setStep] = useState<"phone" | "otp" | "pin" | "processing">("phone");
  const [phone, setPhone] = useState("01770618575");
  const [otp, setOtp] = useState("123456");
  const [pin, setPin] = useState("12121");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleConfirmPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 11) return;
    setStep("otp");
  };

  const handleConfirmOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) return;
    setStep("pin");
  };

  const handleConfirmPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin || pin.length < 4) return;
    setStep("processing");

    // Simulate gateway processing delay then redirect to server callback URL
    setTimeout(() => {
      const targetUrl = new URL(callbackURL, window.location.origin);
      targetUrl.searchParams.set("paymentID", paymentID);
      targetUrl.searchParams.set("status", "success");
      window.location.href = targetUrl.toString();
    }, 1500);
  };

  const handleCancel = () => {
    const targetUrl = new URL(callbackURL, window.location.origin);
    targetUrl.searchParams.set("paymentID", paymentID);
    targetUrl.searchParams.set("status", "cancel");
    window.location.href = targetUrl.toString();
  };

  return (
    <div className="min-h-screen bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in zoom-in-95 duration-200">
        {/* bKash Pink Header */}
        <div className="bg-[#E2136E] text-white p-5 relative">
          <button
            type="button"
            onClick={handleCancel}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            title="Cancel and return"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center font-black text-[#E2136E] text-xl shadow-xs">
              b
            </div>
            <div>
              <h3 className="font-bold text-base tracking-wide flex items-center gap-1.5">
                bKash Payment Gateway
                <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">
                  Sandbox Simulation
                </span>
              </h3>
              <p className="text-xs text-white/80 font-medium">Glorious Japan Skin Care</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
            <div>
              <span className="text-white/70 block text-[10px]">Merchant Invoice</span>
              <span className="font-mono font-bold">{invoice}</span>
            </div>
            <div className="text-right">
              <span className="text-white/70 block text-[10px]">Total Amount</span>
              <span className="text-lg font-bold">{formatBDT(amount)}</span>
            </div>
          </div>
        </div>

        {/* Sandbox Test Credentials Bar */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2.5 text-[11px] text-amber-900 flex items-center justify-between">
          <span className="font-semibold flex items-center gap-1">
            🧪 Demo Test Credentials:
          </span>
          <span className="font-mono text-[10.5px]">
            Wallet: <strong>01770618575</strong> · OTP: <strong>123456</strong> · PIN: <strong>12121</strong>
          </span>
        </div>

        {/* Step Body */}
        <div className="p-6">
          {step === "phone" && (
            <form onSubmit={handleConfirmPhone} className="space-y-4">
              <div className="space-y-1.5 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-[#E2136E]/10 flex items-center justify-center text-[#E2136E] mb-2">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Enter Your bKash Account Number
                </h4>
                <p className="text-xs text-slate-500">
                  Pre-filled with official bKash sandbox demo test number.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  bKash Mobile Number
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 017XXXXXXXX"
                  className="w-full h-11 px-3.5 text-sm font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E2136E] focus:border-transparent text-center font-bold tracking-widest"
                />
              </div>

              <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded text-[#E2136E] focus:ring-[#E2136E]"
                />
                <span>
                  I agree to the <strong className="text-[#E2136E]">terms and conditions</strong> of bKash payment gateway.
                </span>
              </label>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 h-11 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={!agreeTerms}
                  className="flex-1 h-11 rounded-lg bg-[#E2136E] hover:bg-[#E2136E]/90 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  Confirm <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleConfirmOtp} className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1.5 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Enter Verification Code (OTP)
                </h4>
                <p className="text-xs text-slate-500">
                  A verification code has been simulated for <strong className="font-mono text-slate-700">{phone}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  6-Digit bKash OTP
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full h-11 px-3.5 text-base font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E2136E] focus:border-transparent text-center font-bold tracking-widest"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Didn't get code?</span>
                <button
                  type="button"
                  onClick={() => setOtp("123456")}
                  className="text-[#E2136E] font-semibold hover:underline"
                >
                  Resend Code
                </button>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 h-11 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-lg bg-[#E2136E] hover:bg-[#E2136E]/90 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  Confirm <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {step === "pin" && (
            <form onSubmit={handleConfirmPin} className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1.5 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-[#E2136E]/10 flex items-center justify-center text-[#E2136E] mb-2">
                  <Lock className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Enter Your 5-Digit bKash PIN
                </h4>
                <p className="text-xs text-slate-500">
                  Universal Sandbox PIN is <strong className="font-mono text-slate-700">12121</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  bKash Account PIN
                </label>
                <input
                  type="password"
                  required
                  maxLength={5}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="•••••"
                  className="w-full h-11 px-3.5 text-lg font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E2136E] focus:border-transparent text-center font-bold tracking-widest"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 h-11 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-lg bg-[#E2136E] hover:bg-[#E2136E]/90 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          )}

          {step === "processing" && (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
              <div className="h-12 w-12 rounded-full border-3 border-[#E2136E] border-t-transparent animate-spin mx-auto" />
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  Authorizing Transaction...
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Connecting to bKash financial network and confirming payment.
                </p>
              </div>
              <p className="text-[11px] text-slate-400">
                Please do not close or refresh this window...
              </p>
            </div>
          )}
        </div>

        {/* Footer Security Badge */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="h-4 w-4 text-[#E2136E]" />
          <span>256-bit SSL Encrypted • Official bKash Tokenized Checkout</span>
        </div>
      </div>
    </div>
  );
}

export default function BkashSandboxPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900/60 flex items-center justify-center p-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E2136E] border-t-transparent" />
        </div>
      }
    >
      <BkashSandboxContent />
    </Suspense>
  );
}

