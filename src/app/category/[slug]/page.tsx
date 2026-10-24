import { Suspense } from "react";
import type { Metadata } from "next";
import { CategoryPageClient, getCategoryMeta, CATEGORY_DEFINITIONS } from "@/features/categories";
import { CATEGORIES, slugify } from "@/lib/catalog";
import { LoadingScreen } from "@/components/common";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCategoryMeta(slug);

  return {
    title: `${meta.title} | Japanese Beauty & Skincare | Glorious Japan`,
    description: meta.metaDescription,
    openGraph: {
      title: `${meta.title} | Authentic Japanese Beauty in Bangladesh`,
      description: meta.metaDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} | Glorious Japan Skin Care`,
      description: meta.metaDescription,
    },
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

  CATEGORY_DEFINITIONS.forEach((cat) => {
    // Canonical slug e.g. "skin-care"
    addSlug(cat.slug);
    // URL-decoded space slug e.g. "skin care"
    addSlug(cat.title.toLowerCase());
    // Any other aliases
    cat.aliases.forEach((alias) => {
      addSlug(alias);
    });
  });

  CATEGORIES.forEach((cat) => {
    addSlug(slugify(cat));
    addSlug(cat.toLowerCase());
  });

  return params;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<LoadingScreen message="Curating Japanese Category..." />}>
      <CategoryPageClient slug={slug} />
    </Suspense>
  );
}

