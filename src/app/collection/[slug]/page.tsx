import { Suspense } from "react";
import type { Metadata } from "next";
import {
  CollectionPageClient,
  getCollectionMeta,
  COLLECTION_DEFINITIONS,
} from "@/features/collections";
import { LoadingScreen } from "@/components/common";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCollectionMeta(slug);

  return {
    title: `${meta.title} Collection | Japanese Beauty | Glorious Japan`,
    description: meta.metaDescription,
    openGraph: {
      title: `${meta.title} Collection | Authentic Japanese Skincare in Bangladesh`,
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

  COLLECTION_DEFINITIONS.forEach((col) => {
    addSlug(col.slug);
    addSlug(col.title.toLowerCase());
    col.aliases.forEach((alias) => {
      addSlug(alias);
    });
  });

  return params;
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<LoadingScreen message="Curating Japanese Collection..." />}>
      <CollectionPageClient slug={slug} />
    </Suspense>
  );
}

