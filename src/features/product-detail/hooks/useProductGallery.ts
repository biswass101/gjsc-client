"use client";

import { useState, useMemo, useEffect } from "react";
import { PRODUCT_IMAGES } from "@/lib/catalog";
import type { Product } from "@/types";

export function useProductGallery(product: Product) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Multi-angle gallery images
  const galleryImages = useMemo(() => {
    const list = [product.image];
    const pIndex = Math.abs(
      (product.slug || "").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0),
    );
    for (let i = 1; i <= 3; i++) {
      const candidate = PRODUCT_IMAGES[(pIndex + i) % PRODUCT_IMAGES.length];
      if (candidate && !list.includes(candidate)) {
        list.push(candidate);
      }
    }
    return list;
  }, [product.image, product.slug]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [product.slug]);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return {
    galleryImages,
    activeImageIndex,
    setActiveImageIndex,
    isLightboxOpen,
    setIsLightboxOpen,
    handlePrevImage,
    handleNextImage,
  };
}
