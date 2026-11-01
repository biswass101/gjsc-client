"use client";

import { Lock, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatBDT } from "@/lib/catalog";
import type { CheckoutCartItem, DeliveryZone } from "../types";
import { VALID_COUPONS } from "../data/checkoutConstants";

export interface CheckoutOrderSummaryProps {
  lines: CheckoutCartItem[];
  subtotal: number;
  couponInput: string;
  onCouponInputChange: (val: string) => void;
  appliedCoupon: string | null;
  onApplyCoupon: (e: React.FormEvent) => void;
  onRemoveCoupon: () => void;
  couponDiscount: number;
  baseShippingFee: number;
  zone: DeliveryZone;
  giftWrap: boolean;
  grandTotal: number;
  isSubmitting: boolean;
}

export function CheckoutOrderSummary({
  lines,
  subtotal,
  couponInput,
  onCouponInputChange,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  couponDiscount,
  baseShippingFee,
  zone,
  giftWrap,
  grandTotal,
  isSubmitting,
}: CheckoutOrderSummaryProps) {
  const freeShippingProgress = Math.min(100, Math.round((subtotal / 5000) * 100));
  const amountToFreeShipping = Math.max(0, 5000 - subtotal);
  const totalItemCount = lines.reduce((acc, l) => acc + l.qty, 0);

  const zoneLabel =
    zone === "dhaka_metro"
      ? "Inside Dhaka"
      : zone === "dhaka_suburbs"
        ? "Dhaka Suburbs"
        : "Outside Dhaka";

  return (
    <aside className="lg:col-span-5 sticky top-24 space-y-4">
      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="font-display text-xl font-medium">Order Summary</h2>
          <span className="text-xs font-semibold text-muted-foreground">
            {totalItemCount} Items
          </span>
        </div>

        {/* Free Delivery Threshold Progress */}
        <div className="mt-4 rounded-xl border border-border/60 bg-secondary/30 p-3 text-xs space-y-1.5">
          <div className="flex justify-between items-center text-[11.5px]">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-primary" />
              {subtotal >= 5000 || appliedCoupon === "FREESHIP"
                ? "🎉 Free Nationwide Shipping Unlocked!"
                : `Add ${formatBDT(amountToFreeShipping)} more for FREE Delivery`}
            </span>
            <span className="text-muted-foreground">{freeShippingProgress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${appliedCoupon === "FREESHIP" ? 100 : freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Line Items List with thumbnail & size */}
        <div className="mt-5 space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
          {lines.map(({ product, qty, size }) => (
            <div key={product.slug} className="flex items-center gap-3 text-xs">
              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                className="shrink-0 overflow-hidden rounded-md border border-border bg-cream"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="h-14 w-12 object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="font-display text-sm font-semibold text-foreground truncate block hover:text-primary transition-colors"
                >
                  {product.name}
                </Link>
                <p className="text-[11px] text-muted-foreground">
                  {size} • Qty: {qty}
                </p>
              </div>

              <span className="font-semibold text-foreground shrink-0 text-sm">
                {formatBDT(product.price * qty)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Promo Code Input */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={couponInput}
              onChange={(e) => onCouponInputChange(e.target.value)}
              placeholder="Coupon Code (e.g. GLORIOUS10)"
              className="rounded-full text-xs h-9 uppercase"
            />
            <Button
              type="button"
              variant="outline"
              onClick={onApplyCoupon}
              className="rounded-full text-xs px-4 h-9 font-semibold shrink-0"
            >
              Apply
            </Button>
          </div>

          {appliedCoupon && (
            <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-700 dark:text-emerald-400">
              <span>✓ {VALID_COUPONS[appliedCoupon]?.label}</span>
              <button
                type="button"
                onClick={onRemoveCoupon}
                className="text-[11px] font-semibold underline hover:opacity-80"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        {/* Price Breakdown */}
        <dl className="space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-medium text-foreground">{formatBDT(subtotal)}</dd>
          </div>

          {couponDiscount > 0 && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
              <dt>Voucher Discount</dt>
              <dd>-{formatBDT(couponDiscount)}</dd>
            </div>
          )}

          <div className="flex justify-between">
            <dt className="flex items-center gap-1">
              <span>Delivery Fee</span>
              <span className="text-[10.5px] text-muted-foreground">({zoneLabel})</span>
            </dt>
            <dd className="font-medium text-foreground">
              {baseShippingFee === 0 ? (
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">FREE</span>
              ) : (
                formatBDT(baseShippingFee)
              )}
            </dd>
          </div>

          {giftWrap && (
            <div className="flex justify-between">
              <dt>Japanese Gift Wrap</dt>
              <dd className="font-medium text-foreground">{formatBDT(150)}</dd>
            </div>
          )}
        </dl>

        <Separator className="my-4" />

        {/* Grand Total */}
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold text-foreground">Total Payable:</span>
          <span className="font-display text-2xl font-bold text-primary">
            {formatBDT(grandTotal)}
          </span>
        </div>

        <p className="mt-1 text-[10.5px] text-muted-foreground text-right">
          Includes all VAT and Japanese customs tariffs.
        </p>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || lines.length === 0}
          className="mt-5 w-full rounded-full py-6 text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Confirming Order...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Lock className="h-3.5 w-3.5" />
              Place Order · {formatBDT(grandTotal)}
            </span>
          )}
        </Button>

        {/* Courier trust note */}
        <div className="mt-4 pt-3 border-t border-border/50 grid grid-cols-2 gap-2 text-[10.5px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>Pathao / Steadfast</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>7-Day Return Policy</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
