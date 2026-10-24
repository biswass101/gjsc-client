import { Suspense } from "react";
import type { Metadata } from "next";
import { BrandPageClient, getBrandMeta, BRAND_DEFINITIONS } from "@/features/brands";
import { BRANDS, slugify } from "@/lib/catalog";
import { LoadingScreen } from "@/components/common";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getBrandMeta(slug);

  return {
    title: `${meta.name} (${meta.kanji}) | Japanese Beauty in Bangladesh | Glorious Japan`,
    description: meta.description,
  };
}

export async function generateStaticParams() {
  const seen = new Set<string>();
  const params: { slug: string }[] = [];

  const addSlug = (s: string) => {
    const trimmed = s.trim();
    if (trimmed && !seen.has(trimmed)) {
      seen.add(trimmed);
      params.push({ slug: trimmed });
    }
  };

  BRAND_DEFINITIONS.forEach((brand) => {
    addSlug(brand.slug);
    addSlug(brand.name.toLowerCase());
    brand.aliases.forEach((alias) => {
      addSlug(alias);
    });
  });

  BRANDS.forEach((brand) => {
    addSlug(slugify(brand));
    addSlug(brand.toLowerCase());
  });

  return params;
}

export default async function BrandSingularPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<LoadingScreen message="Unveiling Japanese Brand Sanctuary..." />}>
      <BrandPageClient slug={slug} />
    </Suspense>
  );
}

