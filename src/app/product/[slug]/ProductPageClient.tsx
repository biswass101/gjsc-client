"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  CornerDownRight,
  Droplets,
  Flame,
  Heart,
  Leaf,
  Maximize2,
  MessageSquare,
  Minus,
  Plus,
  RotateCcw,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "@/lib/navigation";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/features/products";
import { Rating } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCTS, PRODUCT_IMAGES, formatBDT, slugify } from "@/lib/catalog";
import { useShop } from "@/context";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductPageClientProps {
  product: Product;
}

interface ReviewReply {
  id: string;
  name: string;
  role?: "customer" | "brand" | "verified";
  date: string;
  comment: string;
}

interface UserReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  verified: boolean;
  skinType?: string;
  title: string;
  comment: string;
  helpfulCount: number;
  replies?: ReviewReply[];
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, addRecent, recent } = useShop();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes?.[0] ?? "50ml");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewSkinType, setReviewSkinType] = useState("Combination");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});

  // Inline reply state for threaded review discussions
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyText, setReplyText] = useState("");
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({
    "rev-1": true,
    "rev-2": false,
  });

  // Dynamic reviews state starting with rich initial verified buyer reviews & replies
  const [reviewsList, setReviewsList] = useState<UserReview[]>([
    {
      id: "rev-1",
      name: "Sadia H.",
      rating: 5,
      date: "3 days ago",
      verified: true,
      skinType: "Combination / Sensitive",
      title: "Crystal-clear skin in just one week!",
      comment:
        "Absorbs beautifully with zero stickiness. The subtle natural scent is so calming. My skin barrier feels nourished and radiant even under Dhaka humidity.",
      helpfulCount: 14,
      replies: [
        {
          id: "rep-1",
          name: "Glorious Japan Beauty Expert",
          role: "brand",
          date: "2 days ago",
          comment:
            "Arigato gozaimasu, Sadia! To maximize morning radiance, we recommend pressing 2–3 drops into damp skin immediately following your hydrating lotion or essence.",
        },
        {
          id: "rep-2",
          name: "Farhana K.",
          role: "verified",
          date: "1 day ago",
          comment:
            "Did you notice quick brightening on acne spots? Thinking about ordering a bottle today!",
        },
      ],
    },
    {
      id: "rev-2",
      name: "Farhana Karim",
      rating: 5,
      date: "1 week ago",
      verified: true,
      skinType: "Dry Skin",
      title: "100% authentic Japanese import",
      comment:
        "Arrived in pristine packaging with authentic Tokyo batch codes. Far superior to anything I previously purchased from local shops. Worth every single taka.",
      helpfulCount: 9,
      replies: [
        {
          id: "rep-3",
          name: "Aesthetician Support",
          role: "brand",
          date: "5 days ago",
          comment:
            "Thank you Farhana! All our bottles are directly imported from Tokyo and stored in climate-controlled facilities so the live fermented actives remain at peak potency.",
        },
      ],
    },
    {
      id: "rev-3",
      name: "Nusrat Ahmed",
      rating: 4,
      date: "2 weeks ago",
      verified: true,
      skinType: "Normal",
      title: "Exceptional texture and layering",
      comment:
        "Layers flawlessly underneath my moisturizer and Japanese SPF. Does not pill or cause congestion. Truly a luxury staple in my morning ritual.",
      helpfulCount: 6,
      replies: [],
    },
  ]);

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
    addRecent(product.slug);
    setQty(1);
    setSize(product.sizes?.[0] ?? "50ml");
    setActiveImageIndex(0);
  }, [product.slug, product.sizes, addRecent]);

  const saved = wishlist.includes(product.slug);
  const discountPct = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;
  const savingsAmount = product.compareAt ? product.compareAt - product.price : 0;

  // Complementary product for "Complete the Ritual" bundle
  const companionProduct = useMemo(() => {
    const fromSameBrand = PRODUCTS.find(
      (p) => p.brand === product.brand && p.slug !== product.slug,
    );
    if (fromSameBrand) return fromSameBrand;
    const fromCategory = PRODUCTS.find(
      (p) => p.category !== product.category && p.slug !== product.slug,
    );
    return fromCategory || PRODUCTS.find((p) => p.slug !== product.slug);
  }, [product]);

  // Bundle calculations (with extra 5% bundled discount)
  const bundleBaseTotal = product.price + (companionProduct ? companionProduct.price : 0);
  const bundleDiscountedTotal = Math.round(bundleBaseTotal * 0.95);
  const bundleSavings = bundleBaseTotal - bundleDiscountedTotal;

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
    addToCart(product.slug, qty, size);
    toast.success("Added to shopping bag", {
      description: `${qty}× ${product.name} (${size}) is now in your bag.`,
      action: {
        label: "View Bag",
        onClick: () => navigate({ to: "/cart" }),
      },
    });
  };

  const handleBuyNow = () => {
    addToCart(product.slug, qty, size);
    navigate({ to: "/checkout" });
  };

  const handleAddBundleToCart = () => {
    if (!companionProduct) return;
    addToCart(product.slug, 1, size);
    addToCart(companionProduct.slug, 1, companionProduct.sizes?.[0] ?? "50ml");
    toast.success("Ritual Bundle added to bag!", {
      description: `${product.name} + ${companionProduct.name} added with exclusive bundle discount.`,
      action: {
        label: "Checkout",
        onClick: () => navigate({ to: "/checkout" }),
      },
    });
  };

  const handleHelpfulClick = (reviewId: string) => {
    if (helpfulClicked[reviewId]) return;
    setReviewsList((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)),
    );
    setHelpfulClicked((prev) => ({ ...prev, [reviewId]: true }));
    toast.success("Thank you for your feedback!");
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error("Please fill in your name and review message.");
      return;
    }
    const newRev: UserReview = {
      id: `rev-${Date.now()}`,
      name: reviewName.trim(),
      rating: reviewRating,
      date: "Just now",
      verified: true,
      skinType: reviewSkinType,
      title: reviewTitle.trim() || "Exceptional product",
      comment: reviewComment.trim(),
      helpfulCount: 0,
    };
    setReviewsList((prev) => [newRev, ...prev]);
    setIsReviewModalOpen(false);
    setReviewName("");
    setReviewTitle("");
    setReviewComment("");
    toast.success("Review submitted!", {
      description: "Thank you for sharing your Japanese ritual experience with our community.",
    });
  };

  const handleStartReply = (reviewId: string) => {
    setReplyingToId(reviewId);
    setExpandedReplies((prev) => ({ ...prev, [reviewId]: true }));
  };

  const handleCancelReply = () => {
    setReplyingToId(null);
    setReplyText("");
  };

  const handleSubmitReply = (reviewId: string) => {
    if (!replyName.trim() || !replyText.trim()) {
      toast.error("Please enter your name and reply message.");
      return;
    }
    const newReply: ReviewReply = {
      id: `rep-${Date.now()}`,
      name: replyName.trim(),
      role: "customer",
      date: "Just now",
      comment: replyText.trim(),
    };
    setReviewsList((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? { ...r, replies: [...(r.replies || []), newReply] }
          : r,
      ),
    );
    setReplyingToId(null);
    setReplyText("");
    toast.success("Reply posted!", {
      description: "Your comment has been added to this review discussion.",
    });
  };

  const toggleRepliesExpanded = (reviewId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  // Structured Data Schema
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
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Glorious Japan Skin Care" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews + reviewsList.length - 3,
    },
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Provenance & Breadcrumb Bar */}
      <div className="border-b border-border/40 bg-secondary/30">
        <div className="container-lux flex flex-wrap items-center justify-between gap-3 py-3 text-xs text-muted-foreground">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <Link to="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <Link
              to={`/category/${slugify(product.category)}`}
              className="hover:text-primary transition-colors font-medium text-foreground/80"
            >
              {product.category}
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="truncate max-w-[200px] sm:max-w-xs text-foreground font-medium">
              {product.name}
            </span>
          </nav>

          <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium tracking-wide">
            <span className="flex items-center gap-1.5 text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              100% Genuine Tokyo Import
            </span>
            <span className="text-muted-foreground/40">|</span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Truck className="h-3.5 w-3.5" />
              Direct from Tokyo & Dhaka Hub
            </span>
          </div>
        </div>
      </div>

      {/* Main Product Hero / Buy Section */}
      <section className="container-lux py-6 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Interactive Image Gallery (Balanced & Elegant Size) */}
          <div className="lg:col-span-5 space-y-3.5 max-w-[440px] mx-auto w-full">
            <div className="relative group overflow-hidden rounded-xl border border-border/70 bg-cream shadow-xs aspect-square max-h-[420px] w-full flex items-center justify-center">
              {/* Top Badges */}
              <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
                <span className="rounded-full bg-primary/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-xs shadow-xs">
                  {product.badge || "Authentic Japan"}
                </span>
                {discountPct > 0 && (
                  <span className="rounded-full bg-rose px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                    Save {discountPct}%
                  </span>
                )}
              </div>

              {/* Japanese Provenance Stamp */}
              <div className="absolute right-3 top-3 z-10 hidden sm:flex items-center gap-1.5 rounded-full border border-border/60 bg-background/90 px-2.5 py-1 text-[9.5px] font-semibold tracking-wider text-foreground backdrop-blur-md shadow-xs pointer-events-none">
                <span className="inline-block h-2 w-2 rounded-full bg-rose animate-pulse" />
                東京正規輸入 · TOKYO AUTHENTIC
              </div>

              {/* Left / Right Navigation Arrow Buttons */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-border/80 bg-background/90 text-foreground backdrop-blur-md shadow-md transition-all hover:bg-background hover:scale-105 active:scale-95 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-border/80 bg-background/90 text-foreground backdrop-blur-md shadow-md transition-all hover:bg-background hover:scale-105 active:scale-95 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </button>
                </>
              )}

              {/* Main Photo with sleek contained padding */}
              <div
                className="cursor-zoom-in h-full w-full flex items-center justify-center p-3 sm:p-5"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={galleryImages[activeImageIndex] || product.image}
                  alt={`${product.name} - View ${activeImageIndex + 1}`}
                  width={900}
                  height={900}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Zoom pill trigger */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full border border-border/60 bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-md transition-all hover:bg-background hover:scale-105 shadow-sm"
              >
                <Maximize2 className="h-3 w-3 text-primary" />
                <span>Tap to zoom</span>
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-2.5">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-lg border-2 bg-cream p-1 transition-all hover:opacity-100 flex items-center justify-center",
                    activeImageIndex === idx
                      ? "border-primary ring-2 ring-primary/20 shadow-xs opacity-100 scale-[1.02]"
                      : "border-border/60 opacity-70 hover:border-primary/40",
                  )}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={200}
                    height={200}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                  {activeImageIndex === idx && (
                    <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Visual Skincare Attributes Highlights */}
            <div className="hidden sm:grid grid-cols-3 gap-2 pt-1">
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/30 p-2 text-center sm:text-left">
                <Leaf className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-[10.5px] font-medium leading-tight">
                  Fermented Botanicals
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/30 p-2">
                <Droplets className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-[10.5px] font-medium leading-tight">
                  72h Deep Hydration
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/30 p-2">
                <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-[10.5px] font-medium leading-tight">
                  Dermatologist Tested
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Buy Box & Product Info */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* Brand Eyebrow with Brand Link */}
            <div className="flex items-center justify-between gap-2">
              <Link
                to={`/brands/${slugify(product.brand)}`}
                className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary hover:text-primary/80 transition-colors"
              >
                <span>{product.brand}</span>
                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>

              {/* Action buttons: Share & Wishlist */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share product"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border/70 bg-background text-muted-foreground hover:border-primary hover:text-foreground transition-all active:scale-95 shadow-xs"
                >
                  <Share2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toggleWishlist(product.slug);
                    toast(saved ? "Removed from wishlist" : "Saved to your wishlist");
                  }}
                  aria-label="Toggle wishlist"
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full border border-border/70 bg-background transition-all active:scale-95 shadow-xs",
                    saved
                      ? "border-rose/50 bg-rose/10 text-rose"
                      : "text-muted-foreground hover:border-primary hover:text-foreground",
                  )}
                >
                  <Heart
                    className={cn("h-3.5 w-3.5", saved && "fill-rose text-rose")}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground leading-[1.15]">
              {product.name}
            </h1>

            {/* Japanese Subtitle */}
            <p className="mt-1 text-xs font-serif tracking-widest text-muted-foreground/80">
              伝統と科学の調和 · Authentic Japanese Botanical Formula
            </p>

            {/* Rating & Social Proof Bar */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <Rating value={product.rating} count={product.reviews} />
                <button
                  type="button"
                  onClick={() => {
                    if (typeof document !== "undefined") {
                      document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="ml-1 text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  ({product.reviews + reviewsList.length - 3} reviews)
                </button>
              </div>

              <span className="text-muted-foreground/40">•</span>

              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                <Flame className="h-3.5 w-3.5 fill-current" />
                <span>28 people viewed this hour</span>
              </div>
            </div>

            {/* Price Block */}
            <div className="mt-5 rounded-lg border border-border/70 bg-secondary/20 p-4">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold tracking-tight text-foreground">
                  {formatBDT(product.price)}
                </span>
                {product.compareAt && (
                  <span className="text-base text-muted-foreground line-through">
                    {formatBDT(product.compareAt)}
                  </span>
                )}
                {discountPct > 0 && (
                  <span className="rounded-full bg-rose/15 px-2.5 py-0.5 text-xs font-semibold text-rose">
                    Save {formatBDT(savingsAmount)} ({discountPct}% OFF)
                  </span>
                )}
              </div>

              <p className="mt-2 text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                All taxes included. Cash on Delivery & bKash available nationwide.
              </p>
            </div>

            {/* Short Description */}
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.short}
            </p>

            {/* Skin Types & Concerns Match */}
            <div className="mt-4 space-y-2 border-t border-b border-border/50 py-3 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-foreground/80 shrink-0">Best For:</span>
                {product.skinTypes?.map((st) => (
                  <span
                    key={st}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground"
                  >
                    {st} Skin
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-foreground/80 shrink-0">Concerns:</span>
                {product.concerns?.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Variant / Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="eyebrow font-semibold">Select Size</span>
                  <span className="text-muted-foreground">Selected: {size}</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all",
                        s === size
                          ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/40 font-semibold"
                          : "border-border/80 text-muted-foreground hover:border-primary/60 hover:text-foreground",
                      )}
                    >
                      <span>{s}</span>
                      {s === size && <Check className="h-3 w-3 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Urgency & Countdown */}
            <div className="mt-5 space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-block h-2.5 w-2.5 rounded-full",
                    product.stock === 0
                      ? "bg-rose"
                      : product.stock < 10
                        ? "bg-amber-500 animate-pulse"
                        : "bg-emerald-500 animate-pulse",
                  )}
                />
                <span className="font-medium text-foreground">
                  {product.stock === 0
                    ? "Currently out of stock"
                    : product.stock < 10
                      ? `Only ${product.stock} bottles remaining in stock — order soon!`
                      : "In stock · Dispatched from Dhaka hub within 24 hours"}
                </span>
              </div>

              {product.stock > 0 && (
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground pl-4">
                  <Clock className="h-3 w-3 text-primary" />
                  Order within <strong>03h 24m</strong> for immediate priority dispatch.
                </p>
              )}
            </div>

            {/* Stepper & CTAs (Dual "Add to Bag" & "Buy Now") */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center gap-1 rounded-full border border-border/80 bg-background px-2 py-1 shadow-xs">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    disabled={qty <= 1 || product.stock === 0}
                    className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary disabled:opacity-40 transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    disabled={qty >= product.stock || product.stock === 0}
                    className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary disabled:opacity-40 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Primary Add to Bag */}
                <Button
                  className="flex-1 rounded-full py-6 text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all"
                  disabled={product.stock === 0}
                  onClick={handleAddToCart}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Bag"}
                </Button>
              </div>

              {/* Direct "Buy Now" CTA for Instant Checkout */}
              {product.stock > 0 && (
                <Button
                  variant="secondary"
                  className="w-full rounded-full border border-primary/40 bg-primary/10 py-5 text-xs uppercase tracking-[0.2em] font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={handleBuyNow}
                >
                  Buy Now · Instant Checkout
                </Button>
              )}
            </div>

            {/* Delivery & Authentic Guarantees (4-Card Matrix) */}
            <div className="mt-8 grid grid-cols-2 gap-3 rounded-xl border border-border/70 bg-cream/70 p-4 text-xs text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <p className="font-semibold text-foreground">Express Delivery</p>
                  <p className="text-[11px]">1–2 days Dhaka, 2–3 days nationwide</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <p className="font-semibold text-foreground">100% Authentic</p>
                  <p className="text-[11px]">Direct import from Tokyo authorized makers</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <RotateCcw className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <p className="font-semibold text-foreground">7-Day Easy Returns</p>
                  <p className="text-[11px]">Hassle-free guarantee on sealed items</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <p className="font-semibold text-foreground">COD & bKash</p>
                  <p className="text-[11px]">Inspect product upon delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Complete the Ritual" / "Frequently Bought Together" Bundle Card */}
      {companionProduct && (
        <section className="container-lux pb-12">
          <div className="overflow-hidden rounded-xl border border-border/80 bg-gradient-to-r from-cream via-background to-cream p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
              <div>
                <span className="eyebrow text-primary">Synergistic Skincare Routine</span>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-medium">
                  Complete The Japanese Ritual
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Pair this formula with {companionProduct.name} for 2× hydration retention and enhanced luminous barrier repair.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Save 5% on Routine Duo</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              {/* Product Duo Display */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 flex-1">
                {/* Current Product */}
                <div className="flex items-center gap-3.5 w-full sm:w-auto">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="h-20 w-20 rounded-lg object-cover border border-border bg-cream"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-primary tracking-wider">
                      Step 1 · This Item
                    </span>
                    <h3 className="font-display text-sm font-semibold line-clamp-1">{product.name}</h3>
                    <p className="text-xs font-bold text-foreground">{formatBDT(product.price)}</p>
                  </div>
                </div>

                <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-muted-foreground font-bold text-sm shrink-0">
                  +
                </div>

                {/* Companion Product */}
                <Link
                  to="/product/$slug"
                  params={{ slug: companionProduct.slug }}
                  className="group flex items-center gap-3.5 w-full sm:w-auto hover:opacity-95"
                >
                  <img
                    src={companionProduct.image}
                    alt={companionProduct.name}
                    width={100}
                    height={100}
                    className="h-20 w-20 rounded-lg object-cover border border-border bg-cream transition-transform group-hover:scale-105"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-primary tracking-wider">
                      Step 2 · Companion
                    </span>
                    <h3 className="font-display text-sm font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                      {companionProduct.name}
                    </h3>
                    <p className="text-xs font-bold text-foreground">{formatBDT(companionProduct.price)}</p>
                  </div>
                </Link>
              </div>

              {/* Bundle Pricing & One-Click Add */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:border-l lg:border-border/60 lg:pl-8">
                <div>
                  <p className="text-xs text-muted-foreground">Ritual Bundle Total:</p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-display text-2xl font-bold text-foreground">
                      {formatBDT(bundleDiscountedTotal)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatBDT(bundleBaseTotal)}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    You save {formatBDT(bundleSavings)}
                  </p>
                </div>

                <Button
                  className="rounded-full px-6 py-6 text-xs uppercase tracking-wider font-bold shadow-sm"
                  onClick={handleAddBundleToCart}
                >
                  Add Both to Bag
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Structured Skincare Accordions & Tabs */}
      <section id="reviews-section" className="container-lux pb-16">
        <Tabs defaultValue="ritual" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto rounded-full border border-border/60 bg-secondary/40 p-1">
            <TabsTrigger value="ritual" className="rounded-full px-5 py-2 text-xs font-medium">
              The Layering Ritual
            </TabsTrigger>
            <TabsTrigger value="ingredients" className="rounded-full px-5 py-2 text-xs font-medium">
              Hero Botanicals & INCI
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-full px-5 py-2 text-xs font-medium">
              Verified Reviews ({reviewsList.length})
            </TabsTrigger>
            <TabsTrigger value="shipping" className="rounded-full px-5 py-2 text-xs font-medium">
              Shipping & Authenticity
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: The Japanese Layering Ritual */}
          <TabsContent value="ritual" className="mt-8">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="eyebrow text-primary">Time-Honoured J-Beauty Philosophy</span>
                  <h3 className="mt-1 font-display text-2xl font-medium">
                    The Order of Application Matters
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    In traditional Japanese skincare, layering moves strictly from lightest viscosity to richest seal. This ensures botanical ferments penetrate the stratum corneum without evaporative moisture loss.
                  </p>
                </div>

                {/* 4-Step Diagram */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                  <div className="rounded-xl border border-border/60 bg-cream/50 p-4">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      Step 01
                    </span>
                    <h4 className="font-display text-sm font-semibold mt-1">Cleanse</h4>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Purify skin without stripping natural lipids.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-cream/50 p-4">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      Step 02
                    </span>
                    <h4 className="font-display text-sm font-semibold mt-1">Hydrate</h4>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Lotion essence to soften and prepare the barrier.
                    </p>
                  </div>

                  <div
                    className={cn(
                      "rounded-xl border-2 p-4 shadow-xs",
                      product.category === "Serum" || product.category === "Essence"
                        ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                        : "border-border/60 bg-cream/50",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                        Step 03
                      </span>
                      {(product.category === "Serum" || product.category === "Essence") && (
                        <span className="rounded-full bg-primary text-[9px] px-1.5 py-0.2 text-primary-foreground font-semibold">
                          This Product
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-sm font-semibold mt-1">Treat</h4>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Concentrated actives and ferment bio-nutrients.
                    </p>
                  </div>

                  <div
                    className={cn(
                      "rounded-xl border-2 p-4 shadow-xs",
                      product.category === "Moisturizer" || product.category === "Sunscreen"
                        ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                        : "border-border/60 bg-cream/50",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                        Step 04
                      </span>
                      {(product.category === "Moisturizer" || product.category === "Sunscreen") && (
                        <span className="rounded-full bg-primary text-[9px] px-1.5 py-0.2 text-primary-foreground font-semibold">
                          This Product
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-sm font-semibold mt-1">Seal & Protect</h4>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Lock hydration in and shield against UV & oxidation.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm text-foreground/90">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    How to Apply — Expert Ritual Guide
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {product.howTo}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-xl border border-border/70 bg-secondary/30 p-6 space-y-4">
                <h4 className="font-display text-lg font-semibold">Morning vs Evening Ritual</h4>
                <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                  <div className="border-l-2 border-primary pl-3">
                    <p className="font-semibold text-foreground">🌅 Morning Protocol</p>
                    <p className="mt-0.5">
                      Apply after a gentle splash of lukewarm water or light toner. Pat gently until fully absorbed before applying sunscreen and makeup.
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <p className="font-semibold text-foreground">🌙 Evening Recovery Protocol</p>
                    <p className="mt-0.5">
                      Apply generously after double-cleansing. Allow the bio-ferments to work synergistically with overnight cellular skin renewal.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60">
                  <p className="text-xs text-muted-foreground">
                    💡 <strong>Pro aesthetician tip:</strong> Warm 2–3 drops between your palms for 5 seconds before pressing gently onto the face and neck using upward sweeping motions.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Hero Botanicals & INCI */}
          <TabsContent value="ingredients" className="mt-8 space-y-8">
            <div>
              <span className="eyebrow text-primary">Conscious Formulation</span>
              <h3 className="mt-1 font-display text-2xl font-medium">
                Key Japanese Botanicals & Ferments
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Sustainably harvested across Kyoto, Hokkaido, and Okinawa, fermented according to centuries-old Japanese precision.
              </p>
            </div>

            {/* Botanical Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.ingredients?.map((ing) => (
                <div
                  key={ing}
                  className="rounded-xl border border-border/70 bg-card p-5 shadow-xs transition-all hover:border-primary/50"
                >
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-primary" />
                    <h4 className="font-display text-base font-semibold">{ing}</h4>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    Rich in natural bio-polyphenols and amino acids to calm oxidative stress and reinforce cellular moisture bonds.
                  </p>
                </div>
              ))}
            </div>

            {/* Clean Beauty Checklist */}
            <div className="rounded-xl border border-border/70 bg-cream p-6">
              <h4 className="font-display text-base font-semibold text-foreground">
                The Japanese Pure Standard Guarantee
              </h4>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Paraben-Free
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Mineral Oil-Free
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Artificial Color-Free
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Cruelty-Free
                </span>
              </div>
            </div>

            {/* Full INCI Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="inci" className="border-border/70">
                <AccordionTrigger className="font-display text-base hover:text-primary">
                  View Full INCI Ingredients List
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
                  Water/Aqua/Eau, Glycerin, Butylene Glycol, Dipropylene Glycol, {product.ingredients?.join(", ")},
                  Sodium Hyaluronate, Hydrolyzed Collagen, Betaine, Trehalose, Carbomer, Phenoxyethanol, Ethylhexylglycerin,
                  Disodium EDTA, Potassium Hydroxide, Tocopherol (Vitamin E).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Tab 3: Customer Reviews */}
          <TabsContent value="reviews" className="mt-8 space-y-8">
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Rating Summary Breakdown Card */}
              <div className="lg:col-span-4 rounded-xl border border-border/80 bg-cream p-6 space-y-6">
                <div>
                  <h4 className="font-display text-xl font-semibold">Customer Ratings</h4>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-display text-5xl font-bold">{product.rating}</span>
                    <div>
                      <Rating value={product.rating} />
                      <p className="mt-1 text-xs text-muted-foreground">
                        Based on {product.reviews + reviewsList.length - 3} verified purchases
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rating Distribution Bars */}
                <div className="space-y-2 text-xs">
                  {[
                    { stars: 5, pct: 82 },
                    { stars: 4, pct: 14 },
                    { stars: 3, pct: 3 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 0 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2.5">
                      <span className="w-12 text-muted-foreground">{row.stars} Stars</span>
                      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-muted-foreground">{row.pct}%</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/60">
                  <p className="text-xs text-muted-foreground mb-4">
                    Have you experienced this Japanese formula? Share your thoughts with our skincare community.
                  </p>
                  <Button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="w-full rounded-full py-5 text-xs uppercase tracking-wider font-semibold"
                  >
                    Write a Review
                  </Button>
                </div>
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xl font-medium">
                    Verified Customer Feedback ({reviewsList.length})
                  </h4>
                  <span className="text-xs text-muted-foreground">Sorted by most recent</span>
                </div>

                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="rounded-xl border border-border/70 bg-card p-6 shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Rating value={rev.rating} />
                            <span className="font-semibold text-sm text-foreground">{rev.title}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">{rev.name}</span>
                            <span>•</span>
                            <span>{rev.date}</span>
                            {rev.skinType && (
                              <>
                                <span>•</span>
                                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px]">
                                  {rev.skinType}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {rev.verified && (
                          <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
                            <Check className="h-3 w-3" />
                            Verified Buyer
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {rev.comment}
                      </p>

                      {/* Review Actions: Helpful & Reply */}
                      <div className="pt-2.5 flex items-center justify-between text-xs text-muted-foreground border-t border-border/40">
                        <span className="hidden sm:inline">Was this feedback helpful?</span>
                        <div className="flex items-center gap-2 ml-auto sm:ml-0">
                          <button
                            type="button"
                            onClick={() => handleHelpfulClick(rev.id)}
                            className={cn(
                              "rounded-full px-3 py-1 border text-xs transition-colors",
                              helpfulClicked[rev.id]
                                ? "border-primary bg-primary/10 text-primary font-semibold"
                                : "border-border hover:border-primary hover:text-primary",
                            )}
                          >
                            Helpful ({rev.helpfulCount})
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStartReply(rev.id)}
                            className="flex items-center gap-1.5 rounded-full px-3 py-1 border border-border text-xs transition-colors hover:border-primary hover:text-primary font-medium"
                          >
                            <MessageSquare className="h-3 w-3" />
                            Reply {rev.replies && rev.replies.length > 0 ? `(${rev.replies.length})` : ""}
                          </button>
                        </div>
                      </div>

                      {/* Threaded Discussion Replies */}
                      {rev.replies && rev.replies.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border/30">
                          <button
                            type="button"
                            onClick={() => toggleRepliesExpanded(rev.id)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-2.5"
                          >
                            {expandedReplies[rev.id] ? (
                              <>
                                <ChevronUp className="h-3.5 w-3.5" />
                                Hide replies ({rev.replies.length})
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-3.5 w-3.5" />
                                View replies ({rev.replies.length})
                              </>
                            )}
                          </button>

                          {expandedReplies[rev.id] && (
                            <div className="ml-2 sm:ml-6 pl-3 sm:pl-4 border-l-2 border-primary/30 space-y-2.5">
                              {rev.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className={cn(
                                    "rounded-xl p-3 sm:p-3.5 text-xs leading-relaxed",
                                    reply.role === "brand"
                                      ? "border border-primary/25 bg-primary/5 shadow-xs"
                                      : "border border-border/60 bg-secondary/30",
                                  )}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="font-semibold text-foreground">{reply.name}</span>
                                      {reply.role === "brand" && (
                                        <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold text-primary-foreground">
                                          Official · Glorious Japan Expert
                                        </span>
                                      )}
                                      {reply.role === "verified" && (
                                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-600 dark:text-emerald-400">
                                          Verified Buyer
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground shrink-0">{reply.date}</span>
                                  </div>
                                  <p className="mt-1.5 text-muted-foreground">{reply.comment}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Interactive Inline Reply Form */}
                      {replyingToId === rev.id && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmitReply(rev.id);
                          }}
                          className="mt-3 rounded-xl border border-primary/40 bg-secondary/20 p-4 space-y-3 shadow-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                              <CornerDownRight className="h-3.5 w-3.5 text-primary" />
                              Replying to {rev.name}
                            </span>
                            <button
                              type="button"
                              onClick={handleCancelReply}
                              className="text-xs text-muted-foreground hover:text-foreground"
                            >
                              Cancel
                            </button>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-2">
                            <Input
                              required
                              value={replyName}
                              onChange={(e) => setReplyName(e.target.value)}
                              placeholder="Your Name (e.g. Ayesha)"
                              className="h-8 rounded-full text-xs"
                            />
                          </div>

                          <Textarea
                            required
                            rows={2}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply or ask ${rev.name} about their experience...`}
                            className="rounded-xl text-xs"
                          />

                          <div className="flex justify-end gap-2 pt-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="rounded-full text-xs h-7 px-3"
                              onClick={handleCancelReply}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              size="sm"
                              className="rounded-full text-xs h-7 px-4 gap-1.5 font-semibold"
                            >
                              <Send className="h-3 w-3" />
                              Post Reply
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 4: Shipping & Authenticity */}
          <TabsContent value="shipping" className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border/70 bg-card p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <Truck className="h-4 w-4" /> Nationwide Delivery Details
                </div>
                <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                  <div>
                    <p className="font-semibold text-foreground">Dhaka Metropolitan Area</p>
                    <p>Delivered within 24–48 hours. Standard fee: ৳80 (Free on orders above ৳5,000).</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Outside Dhaka (All 64 Districts)</p>
                    <p>Delivered within 48–72 hours via Steadfast, RedX, or Pathao Courier. Standard fee: ৳130.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Cash on Delivery (COD)</p>
                    <p>Available everywhere. You may inspect the outer tamper-evident seal before payment.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/70 bg-card p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4" /> Authenticity & Return Guarantee
                </div>
                <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                  <div>
                    <p className="font-semibold text-foreground">Tokyo Batch Direct Import</p>
                    <p>Every bottle is imported directly from authorized Tokyo distributors with verified batch codes and customs documentation.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">7-Day Easy Returns</p>
                    <p>If you receive an incorrect or damaged item, or wish to return an unopened product with seal intact, notify us within 7 days for a hassle-free refund or exchange.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* You May Also Like */}
      <section className="container-lux pb-16 sm:pb-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="eyebrow text-primary">Curated Recommendations</span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium mt-1">
              You May Also Like
            </h2>
          </div>
          <Link
            to="/shop"
            search={{ category: product.category }}
            className="text-xs uppercase tracking-wider font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>View All {product.category}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {alsoLike.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="container-lux pb-24 sm:pb-20">
          <div className="mb-6">
            <span className="eyebrow text-primary">Your History</span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium mt-1">
              Recently Viewed
            </h2>
          </div>
          <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewed.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Add-To-Bag Bottom Bar */}
      <aside
        aria-label="Mobile quick add to bag"
        className="fixed bottom-0 inset-x-0 z-40 border-t border-border/80 bg-background/95 p-3.5 backdrop-blur-md lg:hidden shadow-lg"
      >
        <div className="flex items-center justify-between gap-3 pr-14">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={product.image}
              alt=""
              width={60}
              height={60}
              className="h-10 w-10 rounded-md object-cover border border-border shrink-0"
            />
            <div className="truncate">
              <p className="truncate text-xs font-semibold text-foreground">{product.name}</p>
              <p className="text-xs font-bold text-primary">{formatBDT(product.price * qty)}</p>
            </div>
          </div>

          <Button
            className="rounded-full px-5 py-5 text-[11px] uppercase tracking-wider font-bold shrink-0 shadow-sm"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            {product.stock === 0 ? "Sold Out" : "Add to Bag"}
          </Button>
        </div>
      </aside>

      {/* Lightbox Zoom Dialog */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-border/80">
          <DialogHeader className="p-4 border-b border-border/50 flex flex-row items-center justify-between">
            <DialogTitle className="font-display text-lg font-normal">
              {product.name} — Authentic Tokyo View
            </DialogTitle>
          </DialogHeader>

          <div className="relative aspect-square max-h-[75vh] w-full flex items-center justify-center bg-cream p-4">
            <img
              src={galleryImages[activeImageIndex] || product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />

            {/* Lightbox arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? galleryImages.length - 1 : prev - 1,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md hover:bg-background"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === galleryImages.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md hover:bg-background"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox thumbnail bar */}
          <div className="p-4 border-t border-border/50 flex items-center justify-center gap-3">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImageIndex(i)}
                className={cn(
                  "h-12 w-12 rounded-md overflow-hidden border-2 transition-all",
                  activeImageIndex === i ? "border-primary scale-105" : "border-border opacity-70",
                )}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Write a Review Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Write a Customer Review</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitReview} className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Rating
              </label>
              <div className="mt-1.5 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        star <= reviewRating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/40",
                      )}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-medium text-foreground">
                  {reviewRating} of 5 Stars
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Full Name
              </label>
              <Input
                required
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="e.g. Nusrat Jahan"
                className="mt-1 rounded-full text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Skin Type
              </label>
              <select
                value={reviewSkinType}
                onChange={(e) => setReviewSkinType(e.target.value)}
                className="mt-1 w-full rounded-full border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Combination">Combination</option>
                <option value="Dry">Dry Skin</option>
                <option value="Oily">Oily Skin</option>
                <option value="Sensitive">Sensitive</option>
                <option value="Normal">Normal</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Headline / Title
              </label>
              <Input
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="e.g. My absolute holy grail serum!"
                className="mt-1 rounded-full text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Detailed Review
              </label>
              <Textarea
                required
                rows={4}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share how this product felt on your skin, absorption, and results..."
                className="mt-1 rounded-xl text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-full text-xs"
                onClick={() => setIsReviewModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="rounded-full text-xs px-6">
                Submit Review
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
