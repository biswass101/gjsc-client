"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Layout, GoToTop } from "@/components/layout";
import { useShop } from "@/context";
import { systemApi } from "@/lib/api";
import { toast } from "sonner";
import type { FlashSaleItem } from "@/types";
import { FlashSaleHero } from "./components/FlashSaleHero";
import { FlashSaleFilterSort } from "./components/FlashSaleFilterSort";
import { FlashSaleDealCard } from "./components/FlashSaleDealCard";
import { FlashSaleEmptyState } from "./components/FlashSaleEmptyState";
import { Loader2 } from "lucide-react";

export function FlashSalePageClient() {
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const [campaign, setCampaign] = useState<{
    id?: number | string;
    title: string;
    description: string;
    bannerUrl?: string | null | undefined;
    endsAt?: string | null | undefined;
    isActive: boolean;
    items: FlashSaleItem[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("discount");

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Load active flash sale from database
  useEffect(() => {
    let isMounted = true;
    async function loadSale() {
      try {
        setLoading(true);
        const data = await systemApi.getActiveFlashSale();
        if (!isMounted) return;

        if (data && data.isActive !== false && Array.isArray(data.items) && data.items.length > 0) {
          setCampaign({
            id: data.id,
            title: data.title || "Tokyo Luxury Flash Drop",
            description:
              data.description ||
              "Exclusive limited-quantity flash deals on authentic Japanese domestic skincare.",
            bannerUrl: data.bannerUrl || null,
            endsAt: data.endsAt || null,
            isActive: true,
            items: data.items,
          });
        } else {
          setCampaign(null);
        }
      } catch (err) {
        console.error("Failed to load active flash sale:", err);
        setCampaign(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSale();
    return () => {
      isMounted = false;
    };
  }, []);

  // Real-time Countdown timer
  useEffect(() => {
    if (!campaign?.endsAt) return;

    const target = new Date(campaign.endsAt).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [campaign?.endsAt]);

  // Unique Brands
  const availableBrands = useMemo(() => {
    if (!campaign?.items) return ["All"];
    const brandsSet = new Set<string>();
    campaign.items.forEach((it) => {
      if (it.brand) brandsSet.add(it.brand);
    });
    return ["All", ...Array.from(brandsSet)];
  }, [campaign?.items]);

  // Filter & Sort Items
  const displayedItems = useMemo(() => {
    if (!campaign?.items) return [];

    let filtered = campaign.items.filter((it) => {
      if (selectedBrand !== "All" && it.brand !== selectedBrand) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "discount") {
        return (b.discount || 0) - (a.discount || 0);
      }
      if (sortBy === "price-asc") {
        return a.price - b.price;
      }
      if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      if (sortBy === "claimed") {
        return (b.claimedPercent || 0) - (a.claimedPercent || 0);
      }
      return 0;
    });
  }, [campaign?.items, selectedBrand, sortBy]);

  // Handlers
  const handleClaimDeal = (item: FlashSaleItem) => {
    addToCart(item.slug, 1, "Standard", {
      id: String(item.productId || item.id),
      slug: item.slug,
      name: item.name,
      japaneseName: item.name,
      brand: item.brand,
      category: "Skincare",
      price: item.price,
      compareAt: item.compareAt || item.price,
      rating: item.rating || 4.9,
      reviews: 24,
      image: item.image,
      images: [item.image],
      short: `Exclusive Tokyo Flash Deal: ${item.discount}% OFF`,
      description: `Exclusive Tokyo Flash Deal: ${item.discount}% OFF limited allocation.`,
      badge: "Flash Sale",
      skinTypes: ["All Types"],
      concerns: ["Dryness", "Dullness"],
      benefits: ["Deep Hydration", "Radiance"],
      howTo: "Apply daily onto clean skin.",
      ingredients: ["Natural authentic botanical extracts"],
      sizes: ["Standard"],
      stock: item.stockLeft || 10,
    });
    toast.success(`Claimed Flash Deal for ${item.name}! 🌸`, {
      description: `Flash price ৳${item.price.toLocaleString()} (${item.discount}% savings) added to bag.`,
    });
  };

  const handleToggleWishlist = (slug: string) => {
    const isSaved = wishlist.includes(slug);
    toggleWishlist(slug);
    toast(isSaved ? "Removed from wishlist" : "Saved to your wishlist");
  };

  return (
    <Layout>
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-rose-500 mx-auto" />
          <p className="text-xs font-semibold text-foreground">
            Loading Tokyo Flash Drop Deals...
          </p>
        </div>
      ) : !campaign || displayedItems.length === 0 ? (
        <FlashSaleEmptyState />
      ) : (
        <>
          {/* 1. Hero Banner with Countdown Clock */}
          <FlashSaleHero
            title={campaign.title}
            description={campaign.description}
            bannerUrl={campaign.bannerUrl}
            timeLeft={timeLeft}
            itemCount={campaign.items.length}
          />

          {/* 2. Main Catalog Grid Section */}
          <section className="py-8 sm:py-12 bg-background">
            <div className="container-lux space-y-6">
              {/* Filter and Sorting Bar */}
              <FlashSaleFilterSort
                dealCount={displayedItems.length}
                brands={availableBrands}
                selectedBrand={selectedBrand}
                onSelectBrand={setSelectedBrand}
                sortBy={sortBy}
                onSortByChange={setSortBy}
              />

              {/* Grid of Deal Products */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
                {displayedItems.map((item) => (
                  <FlashSaleDealCard
                    key={item.id}
                    item={item}
                    saved={wishlist.includes(item.slug)}
                    onToggleWishlist={handleToggleWishlist}
                    onClaimDeal={handleClaimDeal}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <GoToTop />
    </Layout>
  );
}

