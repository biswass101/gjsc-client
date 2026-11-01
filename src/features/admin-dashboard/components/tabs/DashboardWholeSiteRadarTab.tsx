import React from "react";
import Link from "next/link";
import {
  Package,
  FolderTree,
  Sparkles,
  Award,
  Plane,
  ImageIcon,
  Video,
  FileText,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { useAdmin } from "@/context/admin-context";

export function DashboardWholeSiteRadarTab() {
  const {
    products,
    categories,
    collections,
    brands,
    preOrders,
    banners,
    featuredVideos,
    pageMetas,
    faqs,
  } = useAdmin();

  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;
  const subcatsCount = categories.reduce((s, c) => s + c.subcategories.length, 0);
  const featuredCollectionsCount = collections.filter((c) => c.featured).length;
  const preOrdersBooked = preOrders.reduce((s, p) => s + p.slotsBooked, 0);
  const activeBannersCount = banners.filter((b) => b.active).length;
  const activeVideosCount = (featuredVideos || []).filter((v) => v.active !== false).length;

  return (
    <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
      <div className="border-b border-border/60 pb-3">
        <h2 className="font-display text-lg font-bold text-foreground">
          360° Site-Wide Atomic Architecture
        </h2>
        <p className="text-xs text-muted-foreground">
          Zero-code executive observation across all managed dynamic elements of the Glorious Japan
          ecosystem
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Box 1: Products */}
        <Link
          href="/admin/products"
          className="group p-4 rounded-xl border border-border/80 hover:border-primary/50 bg-secondary/15 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Catalog SKUs</span>
            <Package className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{products.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>{lowStockCount} low stock</span>
            <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
          </p>
        </Link>

        {/* Box 2: Categories */}
        <Link
          href="/admin/categories"
          className="group p-4 rounded-xl border border-border/80 hover:border-primary/50 bg-secondary/15 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Categories & Subcats</span>
            <FolderTree className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{categories.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>{subcatsCount} subcategories</span>
            <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
          </p>
        </Link>

        {/* Box 3: Collections */}
        <Link
          href="/admin/collections"
          className="group p-4 rounded-xl border border-border/80 hover:border-primary/50 bg-secondary/15 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Curated Collections</span>
            <Sparkles className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{collections.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>{featuredCollectionsCount} featured rituals</span>
            <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
          </p>
        </Link>

        {/* Box 4: Brand House */}
        <Link
          href="/admin/brands"
          className="group p-4 rounded-xl border border-border/80 hover:border-primary/50 bg-secondary/15 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Brand Houses</span>
            <Award className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{brands.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>Tokyo & Osaka origins</span>
            <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
          </p>
        </Link>

        {/* Box 5: Pre-Orders */}
        <Link
          href="/admin/pre-orders"
          className="group p-4 rounded-xl border border-border/80 hover:border-primary/50 bg-secondary/15 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Air-Cargo Pre-Orders</span>
            <Plane className="h-4 w-4 text-sky-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{preOrders.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>{preOrdersBooked} slots reserved</span>
            <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
          </p>
        </Link>

        {/* Box 6: Page Banners */}
        <Link
          href="/admin/banners"
          className="group p-4 rounded-xl border border-border/80 hover:border-primary/50 bg-secondary/15 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Site Banners</span>
            <ImageIcon className="h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{banners.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>{activeBannersCount} live banners</span>
            <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
          </p>
        </Link>

        {/* Box 6.5: Featured Videos & Reels */}
        <Link
          href="/admin/videos"
          className="group p-4 rounded-xl border border-border/80 hover:border-primary/50 bg-secondary/15 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Featured Videos & Reels</span>
            <Video className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{(featuredVideos || []).length}</p>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>{activeVideosCount} live on homepage</span>
            <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
          </p>
        </Link>

        {/* Box 7: Page Content & SEO */}
        <Link
          href="/admin/pages"
          className="group p-4 rounded-xl border border-border/80 hover:border-primary/50 bg-secondary/15 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Page Content & SEO</span>
            <FileText className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{pageMetas.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>100% SEO index meta</span>
            <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
          </p>
        </Link>

        {/* Box 8: Support FAQs */}
        <Link
          href="/admin/faqs"
          className="group p-4 rounded-xl border border-border/80 hover:border-primary/50 bg-secondary/15 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>FAQ Knowledge Base</span>
            <HelpCircle className="h-4 w-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{faqs.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>Self-service answers</span>
            <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
          </p>
        </Link>
      </div>
    </div>
  );
}
