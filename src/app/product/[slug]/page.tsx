import { notFound } from "next/navigation";
import { ProductPageClient } from "./ProductPageClient";
import { PRODUCTS, bySlug } from "@/lib/catalog";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: `${product.name} | Glorious Japan Skin Care`,
    description: `${product.name} — ${product.short} ${product.price}.`,
    openGraph: {
      title: `${product.name} | Glorious Japan`,
      description: product.short,
      type: "product",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) {
    notFound();
  }
  return <ProductPageClient product={product} />;
}