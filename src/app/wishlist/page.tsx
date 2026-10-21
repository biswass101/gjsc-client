"use client";

import { Layout } from "@/components/layout";
import { ProductCard } from "@/features/products";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/catalog";
import { useShop } from "@/context";

export default function WishlistPage() {
  const { wishlist } = useShop();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  return (
    <Layout>
      <div className="border-b border-border bg-cream py-12">
        <div className="container-lux">
          <h1 className="font-display text-4xl md:text-5xl">Wishlist</h1>
          <p className="mt-2 text-sm text-muted-foreground">{items.length} saved products</p>
        </div>
      </div>
      <div className="container-lux py-12">
        {items.length === 0 ? (
          <div className="surface-card flex flex-col items-center gap-4 py-24 text-center">
            <p className="font-display text-3xl">Nothing saved yet</p>
            <p className="text-sm text-muted-foreground">Tap the heart on any product to keep it here.</p>
            <Button asChild className="rounded-full px-8"><a href="/shop">Browse products</a></Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </Layout>
  );
}
