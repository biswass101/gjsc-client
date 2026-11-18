"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useNavigate } from "@/lib/navigation";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PackageSearch } from "lucide-react";
import { PRODUCTS, adminProductToStorefront, mergeStorefrontProducts } from "@/lib/catalog";
import { useShop } from "@/context";
import { useAdmin } from "@/context/admin-context";
import { catalogApi } from "@/lib/api";
import type { Product, AdminProduct } from "@/types";
import {
  useProductGallery,
  useProductBundle,
  useProductReviews,
  ProductStructuredData,
  ProductBreadcrumb,
  ProductGallery,
  ProductBuyBox,
  ProductBundleDeal,
  ProductTabs,
  ProductRecommendations,
  ProductStickyMobileBar,
  ProductLightboxModal,
  ProductWriteReviewModal,
  ProductDetailSkeleton,
} from "@/features/product-detail";

interface ProductPageClientProps {
  slug: string;
  initialProduct?: Product | null;
}

export function ProductPageClient({ slug, initialProduct }: ProductPageClientProps) {
  const { products: adminProducts, isLoadingProducts } = useAdmin();
  const [apiProduct, setApiProduct] = useState<Product | null>(null);
  const [isFetchingApi, setIsFetchingApi] = useState<boolean>(!initialProduct);

  // Client-side fallback fetch for dynamic or newly created products
  useEffect(() => {
    if (initialProduct) {
      setIsFetchingApi(false);
      return;
    }

    let isMounted = true;
    setIsFetchingApi(true);

    catalogApi
      .getProductBySlug(slug)
      .then((res: any) => {
        if (!isMounted) return;
        const raw = res?.product || (res?.id || res?.slug ? res : null);
        if (raw) {
          const formatted: Product = {
            ...raw,
            id: String(raw.id),
            brand: raw.brandName || raw.brand?.name || raw.brand || "Authentic Japan",
            category: raw.categoryName || raw.category?.name || raw.category || "Skincare",
          };
          setApiProduct(formatted);
        }
      })
      .catch((err) => {
        console.warn("Client fetch for product slug failed:", slug, err);
      })
      .finally(() => {
        if (isMounted) setIsFetchingApi(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug, initialProduct]);

  // Dynamically resolve product strictly by slug: Admin Context (live CRUD) > API > SSR initialProduct
  const product = useMemo<Product | null>(() => {
    const normalizedSlug = slug.toLowerCase();
    const initialSlug = initialProduct?.slug?.toLowerCase();

    if (adminProducts && adminProducts.length > 0) {
      const exactSlugMatch = adminProducts.find(
        (ap) =>
          ap.slug.toLowerCase() === normalizedSlug ||
          (initialSlug ? ap.slug.toLowerCase() === initialSlug : false),
      );
      if (exactSlugMatch) {
        return adminProductToStorefront(exactSlugMatch);
      }

      // Only match by numeric ID if the URL slug itself is numeric and no slug matched
      if (/^\d+$/.test(normalizedSlug)) {
        const idMatch = adminProducts.find((ap) => ap.id.toLowerCase() === normalizedSlug);
        if (idMatch) {
          return adminProductToStorefront(idMatch);
        }
      }
    }
    if (apiProduct) return apiProduct;
    return initialProduct || null;
  }, [adminProducts, apiProduct, initialProduct, slug]);

  const isLoading = !product && (isFetchingApi || Boolean(isLoadingProducts));

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <ProductNotFoundView slug={slug} />;
  }

  return <ProductDetailContent product={product} adminProducts={adminProducts} />;
}

function ProductNotFoundView({ slug }: { slug: string }) {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container-lux py-16 sm:py-24 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Formulation Not Found
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          The Japanese skincare formulation &ldquo;{slug}&rdquo; could not be located in our active inventory. It may have been updated, renamed, or is currently awaiting restock from Tokyo laboratories.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => navigate({ to: "/shop" })}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full"
          >
            Explore All Formulations
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </Layout>
  );
}

interface ProductDetailContentProps {
  product: Product;
  adminProducts: AdminProduct[];
}

function ProductDetailContent({ product, adminProducts }: ProductDetailContentProps) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, addRecent, recent } = useShop();
  const [dbCatalog, setDbCatalog] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;
    catalogApi
      .getProducts({ limit: 50 })
      .then((res: any) => {
        if (!active || !Array.isArray(res?.products)) return;
        setDbCatalog(
          res.products.map((p: any) => ({
            ...p,
            id: String(p.id),
            brand: p.brandName || p.brand?.name || p.brand || "Authentic Japan",
            category: p.categoryName || p.category?.name || p.category || "Skincare",
            reviews: Number(p.reviewsCount ?? p.reviews ?? 0),
          })),
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Synchronized catalog for recommendations and cross-sells (live DB first)
  const allCatalogProducts = useMemo(() => {
    const base = dbCatalog.length > 0 ? dbCatalog : PRODUCTS;
    return mergeStorefrontProducts(adminProducts, base);
  }, [adminProducts, dbCatalog]);

  const gallery = useProductGallery(product);
  const bundle = useProductBundle(product, allCatalogProducts);
  const reviews = useProductReviews(product.slug);

  useEffect(() => {
    addRecent(product.slug);
  }, [product.slug, addRecent]);

  const isWishlisted = wishlist.includes(product.slug);

  // Recommendations & Recently Viewed
  const related = useMemo(
    () =>
      allCatalogProducts
        .filter((p) => p.category === product.category && p.slug !== product.slug)
        .slice(0, 4),
    [allCatalogProducts, product],
  );
  const fallbackRelated = useMemo(
    () => allCatalogProducts.filter((p) => p.slug !== product.slug).slice(0, 4),
    [allCatalogProducts, product],
  );
  const alsoLike = related.length ? related : fallbackRelated;

  const recentlyViewed = useMemo(
    () =>
      recent
        .map((s) => allCatalogProducts.find((p) => p.slug === s))
        .filter((p): p is Product => Boolean(p) && p?.slug !== product.slug)
        .slice(0, 4),
    [recent, allCatalogProducts, product.slug],
  );

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `${product.name} — Authentic Japanese Skincare on Glorious Japan`,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard", {
      description: "You can now share this Japanese skincare ritual with friends.",
    });
  };

  const handleAddToCart = () => {
    addToCart(product.slug, bundle.qty, bundle.size, product);
    toast.success("Added to shopping bag", {
      description: `${bundle.qty}× ${product.name} (${bundle.size}) is now in your bag.`,
      action: {
        label: "View Bag",
        onClick: () => navigate({ to: "/cart" }),
      },
    });
  };

  const handleBuyNow = () => {
    addToCart(product.slug, bundle.qty, bundle.size, product);
    navigate({ to: "/checkout" });
  };

  const handleAddBundleToCart = () => {
    if (!bundle.companionProduct) return;
    addToCart(product.slug, 1, bundle.size, product);
    addToCart(
      bundle.companionProduct.slug,
      1,
      bundle.companionProduct.sizes?.[0] ?? "Standard",
      bundle.companionProduct,
    );
    toast.success("Ritual Bundle added to bag!", {
      description: `${product.name} + ${bundle.companionProduct.name} added with exclusive bundle discount.`,
      action: {
        label: "Checkout",
        onClick: () => navigate({ to: "/checkout" }),
      },
    });
  };

  const scrollToReviews = () => {
    if (typeof document !== "undefined") {
      document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalReviewsCount = product.reviews + reviews.reviewsList.length - 3;

  return (
    <Layout>
      <ProductStructuredData
        product={product}
        galleryImages={gallery.galleryImages}
        reviewsCount={totalReviewsCount}
      />

      {/* Top Provenance & Breadcrumb Bar */}
      <ProductBreadcrumb product={product} />

      {/* Main Product Hero / Buy Section */}
      <section className="container-lux py-6 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          <ProductGallery
            product={product}
            galleryImages={gallery.galleryImages}
            activeImageIndex={gallery.activeImageIndex}
            discountPct={bundle.discountPct}
            onSelectImage={gallery.setActiveImageIndex}
            onPrevImage={gallery.handlePrevImage}
            onNextImage={gallery.handleNextImage}
            onOpenLightbox={() => gallery.setIsLightboxOpen(true)}
          />

          <ProductBuyBox
            product={product}
            qty={bundle.qty}
            setQty={bundle.setQty}
            size={bundle.size}
            setSize={bundle.setSize}
            discountPct={bundle.discountPct}
            savingsAmount={bundle.savingsAmount}
            reviewsCount={totalReviewsCount}
            isWishlisted={isWishlisted}
            onToggleWishlist={() => {
              toggleWishlist(product.slug);
              toast(isWishlisted ? "Removed from wishlist" : "Saved to your wishlist");
            }}
            onShare={handleShare}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onScrollToReviews={scrollToReviews}
          />
        </div>
      </section>

      {/* "Complete the Ritual" / "Frequently Bought Together" Bundle Card */}
      <ProductBundleDeal
        product={product}
        companionProduct={bundle.companionProduct}
        bundleBaseTotal={bundle.bundleBaseTotal}
        bundleDiscountedTotal={bundle.bundleDiscountedTotal}
        bundleSavings={bundle.bundleSavings}
        onAddBundleToCart={handleAddBundleToCart}
      />

      {/* Structured Skincare Accordions & Tabs */}
      <ProductTabs
        product={product}
        reviewsList={reviews.reviewsList}
        helpfulClicked={reviews.helpfulClicked}
        replyingToId={reviews.replyingToId}
        replyName={reviews.replyName}
        setReplyName={reviews.setReplyName}
        replyText={reviews.replyText}
        setReplyText={reviews.setReplyText}
        expandedReplies={reviews.expandedReplies}
        onOpenReviewModal={() => reviews.setIsReviewModalOpen(true)}
        onHelpfulClick={reviews.handleHelpfulClick}
        onStartReply={reviews.handleStartReply}
        onCancelReply={reviews.handleCancelReply}
        onSubmitReply={reviews.handleSubmitReply}
        onToggleReplies={reviews.toggleRepliesExpanded}
      />

      {/* Recommendations & Recently Viewed */}
      <ProductRecommendations
        product={product}
        alsoLike={alsoLike}
        recentlyViewed={recentlyViewed}
      />

      {/* Sticky Mobile Add-To-Bag Bottom Bar */}
      <ProductStickyMobileBar product={product} qty={bundle.qty} onAddToCart={handleAddToCart} />

      {/* Lightbox Zoom Dialog */}
      <ProductLightboxModal
        product={product}
        galleryImages={gallery.galleryImages}
        activeImageIndex={gallery.activeImageIndex}
        isOpen={gallery.isLightboxOpen}
        onOpenChange={gallery.setIsLightboxOpen}
        onSelectImage={gallery.setActiveImageIndex}
        onPrevImage={gallery.handlePrevImage}
        onNextImage={gallery.handleNextImage}
      />

      {/* Write a Review Modal */}
      <ProductWriteReviewModal
        isOpen={reviews.isReviewModalOpen}
        onOpenChange={reviews.setIsReviewModalOpen}
        reviewRating={reviews.reviewRating}
        setReviewRating={reviews.setReviewRating}
        reviewName={reviews.reviewName}
        setReviewName={reviews.setReviewName}
        reviewSkinType={reviews.reviewSkinType}
        setReviewSkinType={reviews.setReviewSkinType}
        reviewTitle={reviews.reviewTitle}
        setReviewTitle={reviews.setReviewTitle}
        reviewComment={reviews.reviewComment}
        setReviewComment={reviews.setReviewComment}
        onSubmit={reviews.handleSubmitReview}
      />
    </Layout>
  );
}
