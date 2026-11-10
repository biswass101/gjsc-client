"use client";

import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/features/products";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/catalog";
import { customerApi, tokenStorage } from "@/lib/api";
import { useShop } from "@/context";
import type { Product } from "@/types";

function mapDbProduct(raw: any): Product {
  return {
    id: String(raw.id || raw.slug),
    slug: String(raw.slug),
    name: String(raw.name || ""),
    japaneseName: raw.japaneseName ?? undefined,
    brand: String(raw.brand || raw.brandName || "Glorious Japan"),
    category: String(raw.category || raw.categoryName || "Skincare"),
    price: Number(raw.price || 0),
    compareAt: raw.compareAt ? Number(raw.compareAt) : undefined,
    rating: Number(raw.rating || 5),
    reviews: Number(raw.reviews ?? raw.reviewsCount ?? 0),
    image: String(raw.image || ""),
    images: Array.isArray(raw.images) ? raw.images : undefined,
    short: String(raw.short || ""),
    description: String(raw.description || ""),
    ingredients: Array.isArray(raw.ingredients) ? raw.ingredients : [],
    benefits: Array.isArray(raw.benefits) ? raw.benefits : [],
    howTo: String(raw.howTo || ""),
    skinTypes: Array.isArray(raw.skinTypes) ? raw.skinTypes : [],
    concerns: Array.isArray(raw.concerns) ? raw.concerns : [],
    stock: Number(raw.stock ?? 0),
    badge: raw.badge ?? undefined,
    sizes: Array.isArray(raw.sizes) ? raw.sizes : ["Standard"],
    type: raw.type ?? raw.productType ?? undefined,
  };
}

export default function WishlistPage() {
  const { wishlist, user } = useShop();
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!user || !tokenStorage.get()) {
      setDbProducts([]);
      return;
    }
    let cancelled = false;
    customerApi
      .getWishlist()
      .then((list) => {
        if (!cancelled && Array.isArray(list)) {
          setDbProducts(list.map(mapDbProduct));
        }
      })
      .catch(() => {
        /* fallback gracefully */
      });
    return () => {
      cancelled = true;
    };
  }, [user, wishlist]);

  const items = useMemo(() => {
    if (wishlist.length > 0) {
      return wishlist
        .map((slug) => dbProducts.find((p) => p.slug === slug) || PRODUCTS.find((p) => p.slug === slug))
        .filter((p): p is Product => Boolean(p));
    }
    return dbProducts;
  }, [wishlist, dbProducts]);

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