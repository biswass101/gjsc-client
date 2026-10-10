import { Link } from "@/lib/navigation";
import { Minus, Plus, Trash2, Truck } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatBDT } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, setQty, removeFromCart, subtotal } = useShop();
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 80;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-2xl font-normal">Your Bag</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="gold-rule" />
            <p className="font-display text-2xl">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">Discover our fermented Japanese rituals.</p>
            <Button asChild className="rounded-full px-8" onClick={() => setCartOpen(false)}>
              <Link to="/shop">Shop all</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {lines.map(({ product, qty, size }) => (
                <div key={product.slug} className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={900}
                    height={900}
                    loading="lazy"
                    className="h-24 w-20 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-display text-lg leading-tight">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{size}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button
                          aria-label="Decrease quantity"
                          className="grid h-7 w-7 place-items-center rounded-full hover:bg-secondary"
                          onClick={() => setQty(product.slug, qty - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{qty}</span>
                        <button
                          aria-label="Increase quantity"
                          className="grid h-7 w-7 place-items-center rounded-full hover:bg-secondary"
                          onClick={() => setQty(product.slug, qty + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold">{formatBDT(product.price * qty)}</span>
                    </div>
                  </div>
                  <button
                    aria-label={`Remove ${product.name}`}
                    onClick={() => removeFromCart(product.slug)}
                    className="self-start text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border bg-cream px-6 py-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" strokeWidth={1.5} />
                {shipping === 0 ? "Free nationwide delivery unlocked" : "Free delivery over ৳5,000"}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatBDT(subtotal)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span>{shipping === 0 ? "Free" : formatBDT(shipping)}</span>
              </div>
              <Button asChild className="mt-5 w-full rounded-full py-6 text-xs uppercase tracking-[0.2em]">
                <Link to="/checkout" onClick={() => setCartOpen(false)}>
                  Checkout · {formatBDT(subtotal + shipping)}
                </Link>
              </Button>
              <Button asChild variant="ghost" className="mt-2 w-full rounded-full text-xs uppercase tracking-[0.18em]">
                <Link to="/cart" onClick={() => setCartOpen(false)}>
                  View full bag
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
