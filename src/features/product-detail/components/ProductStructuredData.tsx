"use client";

import type { Product } from "@/types";

interface ProductStructuredDataProps {
  product: Product;
  galleryImages: string[];
  reviewsCount: number;
}

export function ProductStructuredData({
  product,
  galleryImages,
  reviewsCount,
}: ProductStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: galleryImages,
    brand: { "@type": "Brand", name: product.brand },
    description: product.short,
    sku: `GJ-${product.id}`,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BDT",
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Glorious Japan Skin Care" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: reviewsCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

