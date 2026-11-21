"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "@/lib/navigation";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/features/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { formatBDT } from "@/lib/catalog";
import { catalogApi, ordersApi } from "@/lib/api";
import { useShop } from "@/context";
import type { Product } from "@/types";

export default function CartPage() {
  const { lines, setQty, removeFromCart, subtotal } = useShop();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    label: string;
    amount: number;
    isFreeShipping: boolean;
  } | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [gift, setGift] = useState(false);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const shipping = subtotal > 5000 || subtotal === 0 || appliedCoupon?.isFreeShipping ? 0 : 80;
  const discount = appliedCoupon?.amount || 0;
  const total = Math.max(0, subtotal - discount + shipping + (gift ? 150 : 0));

  const handleApplyCoupon = async () => {
    const clean = coupon.trim().toUpperCase();
    if (!clean) return;

    setIsApplying(true);
    try {
      const cartItems = lines.map((l) => ({
        productId: Number(l.product.id) || undefined,
        slug: l.product.slug,
        price: l.product.price,
        qty: l.qty,
        category: l.product.category,
      }));

      const res = await ordersApi.validateCoupon(clean, subtotal, cartItems);
      if (res?.valid) {
        const isFree = res.type === "free_shipping";
        setAppliedCoupon({
          code: res.code,
          label: res.description || `${res.code}: ৳${res.discountAmount} off`,
          amount: isFree ? 0 : res.discountAmount,
          isFreeShipping: isFree,
        });
        setCoupon("");
        toast.success("Coupon code applied!", {
          description: res.message || `${res.code}: ৳${res.discountAmount} off`,
        });
      }
    } catch (err: any) {
      toast.error("Invalid coupon code", {
        description: err?.message || "Please check your code or try 'TOKYO10'.",
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  useEffect(() => {
    let active = true;
    catalogApi
      .getProducts({ limit: 4 })
      .then((res: any) => {
        if (!active || !Array.isArray(res?.products)) return;
        setRecommended(
          res.products.map((p: any) => ({
            ...p,
            id: String(p.id),
            brand: p.brandName || p.brand?.name || p.brand || "Authentic Japan",
            category: p.categoryName || p.category?.name || p.category || "Skincare",
            reviews: Number(p.reviewsCount ?? p.reviews ?? 0),
          })),
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <Layout>
      <div className="border-b border-border bg-cream py-12">
        <div className="container-lux">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <a href="/" className="hover:text-primary">Home</a> <span className="mx-2">/</span> Bag
          </nav>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Shopping Bag</h1>
        </div>
      </div>

      <div className="container-lux py-12">
        {lines.length === 0 ? (
          <div className="surface-card flex flex-col items-center gap-4 py-24 text-center">
            <p className="font-display text-3xl">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">Begin your ritual with a best seller.</p>
            <Button asChild className="rounded-full px-8"><a href="/shop">Shop now</a></Button>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              {lines.map(({ product, qty, size }) => (
                <div key={`${product.slug}-${size}`} className="surface-card flex gap-5 p-5">
                  <Link to="/product/$slug" params={{ slug: product.slug }} className="shrink-0 overflow-hidden rounded-md group">
                    <img src={product.image} alt={product.name} width={900} height={900} loading="lazy" className="h-28 w-24 rounded-md object-cover transition-transform duration-300 group-hover:scale-105" />
                  </Link>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.brand}</p>
                    <Link to="/product/$slug" params={{ slug: product.slug }} className="font-display text-xl transition-colors hover:text-primary">
                      {product.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-muted-foreground">{size}</p>
                      {product.badge === "Flash Sale" && (
                        <span className="rounded bg-rose-500/10 px-1.5 py-0.5 text-[9.5px] font-bold text-rose-600 uppercase tracking-wider">
                          ⚡ Flash Deal Applied
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button aria-label="Decrease quantity" className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary" onClick={() => setQty(product.slug, qty - 1, size)}><Minus className="h-3 w-3" /></button>
                        <span className="w-7 text-center text-sm">{qty}</span>
                        <button aria-label="Increase quantity" className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary" onClick={() => setQty(product.slug, qty + 1, size)}><Plus className="h-3 w-3" /></button>
                      </div>
                      <div className="flex flex-col items-end">
                        {product.compareAt && product.compareAt > product.price && (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatBDT(product.compareAt * qty)}
                          </span>
                        )}
                        <span className="font-semibold text-foreground">
                          {formatBDT(product.price * qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button aria-label={`Remove ${product.name}`} onClick={() => removeFromCart(product.slug, size)} className="self-start text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" strokeWidth={1.5} /></button>
                </div>
              ))}
            </div>

            <aside className="h-fit surface-card p-6">
              <p className="font-display text-2xl">Order Summary</p>
              <div className="mt-5 space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code (e.g. TOKYO10)"
                    className="rounded-full text-xs"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleApplyCoupon();
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="rounded-full text-xs px-4 font-semibold"
                    disabled={isApplying || !coupon.trim()}
                    onClick={handleApplyCoupon}
                  >
                    {isApplying ? "Checking..." : "Apply"}
                  </Button>
                </div>

                {appliedCoupon && (
                  <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs text-emerald-700 dark:text-emerald-400">
                    <span className="font-medium">✓ {appliedCoupon.code} applied ({appliedCoupon.label})</span>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-[11px] font-semibold underline hover:opacity-80 cursor-pointer ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
                <Checkbox checked={gift} onCheckedChange={(v) => setGift(Boolean(v))} /> Add gift wrapping (৳150)
              </label>
              <Separator className="my-5" />
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatBDT(subtotal)}</dd></div>
                {discount > 0 && <div className="flex justify-between text-primary"><dt>Discount</dt><dd>-{formatBDT(discount)}</dd></div>}
                <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{shipping === 0 ? "Free" : formatBDT(shipping)}</dd></div>
              </dl>
              <Separator className="my-5" />
              <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatBDT(total)}</span></div>
              <Button asChild className="mt-6 w-full rounded-full py-6 text-xs uppercase tracking-[0.2em]"><a href="/checkout">Proceed to checkout</a></Button>
            </aside>
          </div>
        )}

        {recommended.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 font-display text-3xl">Recommended for you</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recommended.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
