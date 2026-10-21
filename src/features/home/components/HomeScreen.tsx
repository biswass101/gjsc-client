"use client";

import { PRODUCTS } from "@/lib/catalog";
import { Layout, GoToTop } from "@/components/layout";
import { Section } from "@/components/common";
import { ProductCard } from "@/features/products";

import { Hero } from "./Hero";
import { TopCategories } from "./TopCategories";
import { TrendingShowcase } from "./TrendingShowcase";
import { OffersToSayYes } from "./OffersToSayYes";
import { TopThreeBeauty } from "./TopThreeBeauty";
import { FreeDeliveryBanner } from "./FreeDeliveryBanner";
import { BestOfSkincare } from "./BestOfSkincare";
import { FeaturedInVideos } from "./FeaturedInVideos";
import { ExclusiveAccessories } from "./ExclusiveAccessories";
import { BogoSection } from "./BogoSection";
import { FlashSaleSection } from "./FlashSaleSection";
import { SkinConcernSection } from "./SkinConcernSection";
import { OurBrandsSection } from "./OurBrandsSection";
import { PhilosophySection } from "./PhilosophySection";
import { EnhancedReviews } from "./EnhancedReviews";
import { BeautyJournalSection } from "./BeautyJournalSection";

export function HomeScreen() {
  const best = PRODUCTS.filter((p) => p.badge === "Best Seller").slice(0, 4);
  const trending = PRODUCTS.filter((p) => p.badge === "Trending");
  const flash = PRODUCTS.filter((p) => p.compareAt).slice(0, 4);
  const fresh = PRODUCTS.filter((p) => p.badge === "New").slice(0, 4);
  const preOrder = PRODUCTS.filter((p) => p.type === "pre-order-japan").slice(0, 4);
  const shein = PRODUCTS.filter((p) => p.type === "shein").slice(0, 4);

  return (
    <Layout>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Top Categories */}
      <div className="container-lux">
        <TopCategories />
      </div>

      {/* 3. Trending 3D Featured Showcase (Directly after Top Categories) */}
      <TrendingShowcase products={trending} />

      {/* 4. Bestsellers - Full Width Row */}
      <div className="bg-background">
        <div className="container-lux">
          <Section eyebrow="Loved Most" title="Bestsellers" to="/shop" search={{ badge: "Best Seller" }}>
            <div className="flex gap-2.5 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {best.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* 5. Offers To Say Yes - Value Bundles */}
      <OffersToSayYes />

      {/* 6. New Arrivals - Full Width Row */}
      <div className="bg-background">
        <div className="container-lux">
          <Section eyebrow="Just Landed" title="New Arrivals" to="/shop" search={{ badge: "New" }}>
            <div className="flex gap-2.5 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {fresh.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* 7. Top 3 Of Beauty - Podium Awards */}
      <TopThreeBeauty />

      {/* 8. Free Delivery Available - Nationwide Shipping Banner */}
      <FreeDeliveryBanner />

      {/* 9. Offers & Discounts - Full Width Row */}
      <div className="bg-background">
        <div className="container-lux">
          <Section eyebrow="Limited Time" title="Offers & Discounts" to="/shop" search={{ onSale: true }}>
            <div className="flex gap-2.5 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {flash.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* 10. Flash Sale - Urgency Countdown & Limited Stock Drops */}
      <FlashSaleSection />

      {/* 11. Know Your Skin & Target The Concern - Visual Background Cards */}
      <SkinConcernSection />

      {/* 12. Best Of Skincare - Fermented Botanicals */}
      <BestOfSkincare />

      {/* 13. Featured In Videos - Creator Short Video Reviews & Preview Modal */}
      <FeaturedInVideos />

      {/* 14. Buy One Get One - BOGO Offers with Free Gifts */}
      <BogoSection />

      {/* 15. Combo & Gift Sets - Full Width */}
      <div className="bg-background">
        <div className="container-lux">
          <Section eyebrow="Curated Collections" title="Combo & Gift Sets" to="/shop" search={{ category: "Gift Sets" }}>
            <div className="flex gap-2.5 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {PRODUCTS.filter((p) => p.category === "Gift Sets" || p.category === "Travel Kits")
                .slice(0, 4)
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </Section>
        </div>
      </div>

      {/* 16. Exclusive Accessories - Beauty Tools & Silk Essentials */}
      <ExclusiveAccessories />

      {/* 17. Pre-Order from Japan - Full Width */}
      <div className="bg-background">
        <div className="container-lux">
          <Section eyebrow="Authentic Imports" title="Pre-Order from Japan" to="/shop" search={{ type: "pre-order-japan" }}>
            <div className="flex gap-2.5 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {preOrder.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* 18. SHEIN Products - Full Width */}
      <div className="bg-background">
        <div className="container-lux">
          <Section eyebrow="Global Selection" title="SHEIN Products" to="/shop" search={{ type: "shein" }}>
            <div className="flex gap-2.5 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {shein.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* 19. Our Brands - Japanese Heritage Partner Houses with Photos */}
      <OurBrandsSection />

      {/* 20. Brand Philosophy & Story - Redesigned Luxury Editorial Section */}
      <PhilosophySection />

      {/* 21. Loved in Bangladesh - Enhanced Reviews & Trust Metrics */}
      <EnhancedReviews />

      {/* 22. The Journal - Redesigned Beauty Notes & Magazine Guides */}
      <BeautyJournalSection />

      {/* Go to top button — appears when scrolled near bottom */}
      <GoToTop />
    </Layout>
  );
}

export { HomeScreen as Home };
