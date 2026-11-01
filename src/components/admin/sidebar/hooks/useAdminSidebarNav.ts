import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Tag,
  Megaphone,
  FolderTree,
  Sparkles,
  Award,
  Plane,
  Image as ImageIcon,
  FileText,
  Star,
  HelpCircle,
  Video,
} from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { SidebarNavGroup } from "../types";

export function useAdminSidebarNav(): SidebarNavGroup[] {
  const { orders, products, discounts, preOrders, reviews, featuredVideos } = useAdmin();

  const pendingOrdersCount = orders.filter(
    (o) => o.fulfillmentStatus === "Pending" || o.fulfillmentStatus === "Processing",
  ).length;

  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;

  const activeDiscountsCount = discounts.filter((d) => d.status === "active").length;

  const activePreOrdersCount = preOrders.filter((p) => p.active).length;

  const pendingReviewsCount = reviews.filter((r) => r.status === "pending").length;

  const activeVideosCount = (featuredVideos || []).filter((v) => v.active !== false).length;

  return [
    {
      group: "Intelligence",
      items: [
        {
          label: "Executive Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
          badge: null,
        },
      ],
    },
    {
      group: "Catalog & Fulfillment",
      items: [
        {
          label: "Orders & Shipments",
          href: "/admin/orders",
          icon: ShoppingBag,
          badge:
            pendingOrdersCount > 0 ? { text: `${pendingOrdersCount}`, variant: "amber" } : null,
        },
        {
          label: "Products & SKUs",
          href: "/admin/products",
          icon: Package,
          badge: lowStockCount > 0 ? { text: `${lowStockCount} low`, variant: "rose" } : null,
        },
        {
          label: "Pre-Orders & Cargo",
          href: "/admin/pre-orders",
          icon: Plane,
          badge:
            activePreOrdersCount > 0
              ? { text: `${activePreOrdersCount}`, variant: "emerald" }
              : null,
        },
        {
          label: "Categories & Subcats",
          href: "/admin/categories",
          icon: FolderTree,
          badge: null,
        },
        {
          label: "Curated Collections",
          href: "/admin/collections",
          icon: Sparkles,
          badge: null,
        },
        {
          label: "Japanese Brand House",
          href: "/admin/brands",
          icon: Award,
          badge: null,
        },
        {
          label: "Customers & CRM",
          href: "/admin/customers",
          icon: Users,
          badge: null,
        },
      ],
    },
    {
      group: "Marketing & Atomic Content",
      items: [
        {
          label: "Featured Videos & Reels",
          href: "/admin/videos",
          icon: Video,
          badge:
            activeVideosCount > 0
              ? { text: `${activeVideosCount} live`, variant: "emerald" }
              : null,
        },
        {
          label: "Page Banners & Hero",
          href: "/admin/banners",
          icon: ImageIcon,
          badge: null,
        },
        {
          label: "Page Content & SEO",
          href: "/admin/pages",
          icon: FileText,
          badge: null,
        },
        {
          label: "Store Merchandising",
          href: "/admin/merchandising",
          icon: Megaphone,
          badge: null,
        },
        {
          label: "Discounts & Vouchers",
          href: "/admin/discounts",
          icon: Tag,
          badge:
            activeDiscountsCount > 0
              ? { text: `${activeDiscountsCount}`, variant: "emerald" }
              : null,
        },
        {
          label: "Reviews Moderation",
          href: "/admin/reviews",
          icon: Star,
          badge:
            pendingReviewsCount > 0 ? { text: `${pendingReviewsCount}`, variant: "amber" } : null,
        },
        {
          label: "FAQ Knowledge Base",
          href: "/admin/faqs",
          icon: HelpCircle,
          badge: null,
        },
      ],
    },
    {
      group: "System & Operations",
      items: [
        {
          label: "Store & Courier Logistics",
          href: "/admin/settings",
          icon: Settings,
          badge: null,
        },
      ],
    },
  ];
}
