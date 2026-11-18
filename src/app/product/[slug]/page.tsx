import { notFound } from "next/navigation";
import { ProductPageClient } from "./ProductPageClient";
import { PRODUCTS, bySlug } from "@/lib/catalog";
import { catalogApi } from "@/lib/api";

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

async function resolveProductBySlug(slug: string) {
  try {
    const res: any = await catalogApi.getProductBySlug(slug);
    const rawProduct = res?.product || (res?.id || res?.slug ? res : null);
    if (rawProduct) {
      return {
        ...rawProduct,
        id: String(rawProduct.id),
        brand: rawProduct.brandName || rawProduct.brand?.name || rawProduct.brand || "Authentic Japan",
        category: rawProduct.categoryName || rawProduct.category?.name || rawProduct.category || "Skincare",
        reviews: Number(rawProduct.reviewsCount ?? rawProduct.reviews ?? 0),
      };
    }
  } catch {
    /* fallback to static lookup if API is offline during static build */
  }
  return bySlug(slug) || null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await resolveProductBySlug(slug);

  if (!product) {
    return { title: "Authentic Japanese Skincare | Glorious Japan" };
  }

  return {
    title: `${product.name} — ${product.brand} | Glorious Japan`,
    description: `${product.name} by ${product.brand}. ${product.short || "100% authentic Japanese import with nationwide express shipping."}`,
    openGraph: {
      title: `${product.name} | Glorious Japan`,
      description: product.short || undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await resolveProductBySlug(slug);

  return <ProductPageClient slug={slug} initialProduct={product} />;
}
