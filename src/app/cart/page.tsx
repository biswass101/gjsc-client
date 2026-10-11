"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS, formatBDT } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export default function CartPage() {
  const { lines, setQty, removeFromCart, subtotal } = useShop();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [gift, setGift] = useState(false);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 80;
  const total = subtotal - discount + shipping + (gift ? 150 : 0);

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
                <div key={product.slug} className="surface-card flex gap-5 p-5">
                  <img src={product.image} alt={product.name} width={900} height={900} loading="lazy" className="h-28 w-24 rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.brand}</p>
                    <p className="font-display text-xl">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{size}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button aria-label="Decrease quantity" className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary" onClick={() => setQty(product.slug, qty - 1)}><Minus className="h-3 w-3" /></button>
                        <span className="w-7 text-center text-sm">{qty}</span>
                        <button aria-label="Increase quantity" className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary" onClick={() => setQty(product.slug, qty + 1)}><Plus className="h-3 w-3" /></button>
                      </div>
                      <span className="font-semibold">{formatBDT(product.price * qty)}</span>
                    </div>
                  </div>
                  <button aria-label={`Remove ${product.name}`} onClick={() => removeFromCart(product.slug)} className="self-start text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" strokeWidth={1.5} /></button>
                </div>
              ))}
            </div>

            <aside className="h-fit surface-card p-6">
              <p className="font-display text-2xl">Order Summary</p>
              <div className="mt-5 flex gap-2">
                <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="rounded-full" />
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    if (coupon.trim().toUpperCase() === "GLORIOUS10") {
                      setDiscount(Math.round(subtotal * 0.1));
                      toast.success("Coupon applied — 10% off");
                    } else {
                      toast.error("Invalid coupon code");
                    }
                  }}
                >
                  Apply
                </Button>
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

        <section className="mt-20">
          <h2 className="mb-8 font-display text-3xl">Recommended for you</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </Layout>
  );
}
