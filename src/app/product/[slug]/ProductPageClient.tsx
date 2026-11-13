"use client";

import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useNavigate } from "@/lib/navigation";
import { Layout } from "@/components/layout";
import { PRODUCTS } from "@/lib/catalog";
import { useShop } from "@/context";
import type { Product } from "@/types";
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
} from "@/features/product-detail";

interface ProductPageClientProps {
  product: Product;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, addRecent, recent } = useShop();

  const gallery = useProductGallery(product);
  const bundle = useProductBundle(product);
  const reviews = useProductReviews(product.slug);

  useEffect(() => {
    addRecent(product.slug);
  }, [product.slug, addRecent]);

  const isWishlisted = wishlist.includes(product.slug);

  // Recommendations & Recently Viewed
  const related = useMemo(
    () =>
      PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(
        0,
        4,
      ),
    [product],
  );
  const fallbackRelated = useMemo(
    () => PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4),
    [product],
  );
  const alsoLike = related.length ? related : fallbackRelated;

  const recentlyViewed = useMemo(
    () =>
      recent
        .map((s) => PRODUCTS.find((p) => p.slug === s))
        .filter((p): p is Product => Boolean(p) && p?.slug !== product.slug)
        .slice(0, 4),
    [recent, product.slug],
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
    addToCart(product.slug, bundle.qty, bundle.size);
    toast.success("Added to shopping bag", {
      description: `${bundle.qty}× ${product.name} (${bundle.size}) is now in your bag.`,
      action: {
        label: "View Bag",
        onClick: () => navigate({ to: "/cart" }),
      },
    });
  };

  const handleBuyNow = () => {
    addToCart(product.slug, bundle.qty, bundle.size);
    navigate({ to: "/checkout" });
  };

  const handleAddBundleToCart = () => {
    if (!bundle.companionProduct) return;
    addToCart(product.slug, 1, bundle.size);
    addToCart(bundle.companionProduct.slug, 1, bundle.companionProduct.sizes?.[0] ?? "50ml");
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
