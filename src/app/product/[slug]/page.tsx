import { notFound } from "next/navigation";
import { ProductPageClient } from "./ProductPageClient";
import { bySlug } from "@/lib/catalog";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) {
    return { title: "Product Not Found | Glorious Japan Skin Care" };
  }
  return {
    title: `${product.name} — ${product.brand} | Glorious Japan`,
    description: `${product.name} by ${product.brand}. ${product.short} 100% authentic Japanese import with nationwide express shipping.`,
    openGraph: {
      title: `${product.name} | Glorious Japan`,
      description: product.short,
      type: "website",
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
