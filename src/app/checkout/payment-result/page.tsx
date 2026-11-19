"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  PackageCheck,
  RefreshCw,
  Home,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "unknown";
  const orderNumber = searchParams.get("orderNumber") || "";
  const trxId = searchParams.get("trxId") || "";
  const errorMessage = searchParams.get("error") || "";

  const isSuccess = status === "success";
  const isCancel = status === "cancel";
  const isFailure = status === "failure";

  return (
    <div className="container-lux max-w-2xl py-12 sm:py-20">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Status Header Banner */}
        <div
          className={`px-6 py-8 text-center sm:px-10 ${
            isSuccess
              ? "bg-gradient-to-b from-emerald-50 to-emerald-50/20 dark:from-emerald-950/30 dark:to-transparent"
              : isCancel
              ? "bg-gradient-to-b from-amber-50 to-amber-50/20 dark:from-amber-950/30 dark:to-transparent"
              : "bg-gradient-to-b from-rose-50 to-rose-50/20 dark:from-rose-950/30 dark:to-transparent"
          }`}
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm border">
            {isSuccess ? (
              <CheckCircle2 className="h-9 w-9 text-emerald-600" />
            ) : isCancel ? (
              <AlertTriangle className="h-9 w-9 text-amber-500" />
            ) : (
              <XCircle className="h-9 w-9 text-rose-500" />
            )}
          </div>

          <h1 className="mt-4 font-display text-2xl font-normal sm:text-3xl text-foreground">
            {isSuccess
              ? "Payment Successful!"
              : isCancel
              ? "Payment Cancelled"
              : "Payment Failed"}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            {isSuccess
              ? "Your bKash transaction has been verified and your order is confirmed for fast dispatch."
              : isCancel
              ? "You cancelled the bKash checkout session. No money was deducted from your account."
              : errorMessage ||
                "Your payment could not be processed by the payment gateway. Please try again."}
          </p>
        </div>

        {/* Transaction Summary Card */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="rounded-xl border border-border/80 bg-muted/30 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-border/60">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium text-foreground inline-flex items-center gap-1.5">
                <Smartphone className="h-3.5 w-3.5 text-[#E2136E]" />
                bKash Tokenized Checkout
              </span>
            </div>

            {orderNumber && (
              <div className="flex items-center justify-between text-xs pb-3 border-b border-border/60">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-mono font-semibold text-foreground">
                  {orderNumber}
                </span>
              </div>
            )}

            {trxId && (
              <div className="flex items-center justify-between text-xs pb-3 border-b border-border/60">
                <span className="text-muted-foreground">Verified TrxID</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {trxId}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Payment Status</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  isSuccess
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : isCancel
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                }`}
              >
                {isSuccess ? "Paid & Verified" : isCancel ? "Cancelled" : "Failed"}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {isSuccess ? (
              <>
                {orderNumber && (
                  <Button asChild className="flex-1 bg-brand-primary text-white hover:bg-brand-primary/90">
                    <Link href={`/order-tracking?key=${encodeURIComponent(orderNumber)}`}>
                      <PackageCheck className="mr-2 h-4 w-4" />
                      Track Your Order
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/shop">
                    Continue Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="flex-1 bg-[#E2136E] text-white hover:bg-[#E2136E]/90">
                  <Link href="/checkout">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry Payment
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-muted-foreground text-center">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>256-bit SSL encrypted • Official bKash Financial Integration</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="container-lux max-w-2xl py-24 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-primary border-t-transparent mx-auto" />
            <p className="mt-4 text-xs text-muted-foreground">Verifying payment details...</p>
          </div>
        }
      >
        <PaymentResultContent />
      </Suspense>
    </Layout>
  );
}

