import { notFound } from "next/navigation";
import { ProductPageClient } from "./ProductPageClient";
import { PRODUCTS, bySlug } from "@/lib/catalog";

export const dynamicParams = true;

export async function generateStaticParams() {
  const seen = new Set<string>();
  const params: { slug: string }[] = [];

  const addSlug = (s?: string) => {
    const trimmed = s?.trim();
    if (trimmed && !seen.has(trimmed)) {
      seen.add(trimmed);
      params.push({ slug: trimmed });
    }
  };

  PRODUCTS.forEach((product) => {
    addSlug(product.slug);
    addSlug(product.id);
  });

  return params;
}

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
