import { useState } from "react";
import { definePage, Link } from "@/lib/navigation";
import { CheckCircle2, Wallet, Banknote } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatBDT } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export const Route = definePage("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | Glorious Japan Skin Care" },
      { name: "description", content: "Checkout securely with Cash on Delivery or bKash. Free delivery over ৳5,000." },
      { property: "og:title", content: "Secure Checkout | Glorious Japan Skin Care" },
      { property: "og:description", content: "Cash on Delivery and bKash accepted nationwide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lines, subtotal, clearCart } = useShop();
  const [payment, setPayment] = useState("cod");
  const [done, setDone] = useState(false);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 80;

  if (done) {
    return (
      <Layout>
        <div className="container-lux flex flex-col items-center py-28 text-center">
          <CheckCircle2 className="h-14 w-14 text-primary" strokeWidth={1} />
          <h1 className="mt-6 font-display text-4xl md:text-5xl">Thank you, beautifully done</h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Your order <strong className="text-foreground">#GJ-2026-{Math.floor(Math.random() * 9000) + 1000}</strong> is
            confirmed. We'll message you on WhatsApp with tracking details shortly.
          </p>
          <div className="mt-8 flex gap-3">
            <Button asChild className="rounded-full px-8"><Link to="/track">Track order</Link></Button>
            <Button asChild variant="outline" className="rounded-full px-8"><Link to="/shop">Continue shopping</Link></Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-lux py-12">
        <h1 className="font-display text-4xl md:text-5xl">Checkout</h1>
        <form
          className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]"
          onSubmit={(e) => {
            e.preventDefault();
            clearCart();
            setDone(true);
          }}
        >
          <div className="space-y-10">
            <section className="surface-card p-6">
              <p className="eyebrow">Step 1 · Contact</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div><Label htmlFor="name">Full name</Label><Input id="name" required className="mt-2 rounded-full" /></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" required type="tel" className="mt-2 rounded-full" /></div>
                <div className="sm:col-span-2"><Label htmlFor="email">Email (optional)</Label><Input id="email" type="email" className="mt-2 rounded-full" /></div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Checking out as a guest. <Link to="/auth" className="text-primary hover:underline">Sign in</Link> for faster checkout.
              </p>
            </section>

            <section className="surface-card p-6">
              <p className="eyebrow">Step 2 · Shipping address</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><Label htmlFor="addr">Street address</Label><Input id="addr" required className="mt-2 rounded-full" /></div>
                <div><Label htmlFor="city">City</Label><Input id="city" required className="mt-2 rounded-full" /></div>
                <div><Label htmlFor="area">Area / Thana</Label><Input id="area" required className="mt-2 rounded-full" /></div>
                <div className="sm:col-span-2"><Label htmlFor="note">Delivery note</Label><Textarea id="note" className="mt-2 rounded-md" rows={3} /></div>
              </div>
            </section>

            <section className="surface-card p-6">
              <p className="eyebrow">Step 3 · Payment</p>
              <RadioGroup value={payment} onValueChange={setPayment} className="mt-5 grid gap-3">
                <label className={`flex cursor-pointer items-center gap-4 rounded-lg border p-5 transition-colors ${payment === "cod" ? "border-primary" : "border-border"}`}>
                  <RadioGroupItem value="cod" id="cod" />
                  <Banknote className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <span>
                    <span className="block text-sm font-semibold">Cash on Delivery</span>
                    <span className="block text-xs text-muted-foreground">Pay in cash when your parcel arrives.</span>
                  </span>
                </label>
                <label className={`flex cursor-pointer items-center gap-4 rounded-lg border p-5 transition-colors ${payment === "bkash" ? "border-primary" : "border-border"}`}>
                  <RadioGroupItem value="bkash" id="bkash" />
                  <Wallet className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <span>
                    <span className="block text-sm font-semibold">bKash</span>
                    <span className="block text-xs text-muted-foreground">Send payment to 01700-000000 and enter the TrxID.</span>
                  </span>
                </label>
              </RadioGroup>
              {payment === "bkash" && (
                <div className="mt-4"><Label htmlFor="trx">bKash Transaction ID</Label><Input id="trx" required className="mt-2 rounded-full" /></div>
              )}
            </section>
          </div>

          <aside className="h-fit surface-card p-6">
            <p className="font-display text-2xl">Order Summary</p>
            <div className="mt-5 space-y-4">
              {lines.map(({ product, qty }) => (
                <div key={product.slug} className="flex items-center gap-3 text-sm">
                  <img src={product.image} alt="" width={900} height={900} loading="lazy" className="h-14 w-12 rounded-md object-cover" />
                  <span className="flex-1">{product.name} <span className="text-muted-foreground">× {qty}</span></span>
                  <span>{formatBDT(product.price * qty)}</span>
                </div>
              ))}
              {lines.length === 0 && <p className="text-sm text-muted-foreground">Your bag is empty.</p>}
            </div>
            <Separator className="my-5" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatBDT(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{shipping === 0 ? "Free" : formatBDT(shipping)}</dd></div>
            </dl>
            <Separator className="my-5" />
            <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatBDT(subtotal + shipping)}</span></div>
            <Button type="submit" disabled={lines.length === 0} className="mt-6 w-full rounded-full py-6 text-xs uppercase tracking-[0.2em]">Place order</Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Secure checkout · 7-day returns</p>
          </aside>
        </form>
      </div>
    </Layout>
  );
}
