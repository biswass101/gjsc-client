import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Tag,
  Megaphone,
  Plane,
  FolderTree,
  Sparkles,
  Award,
  Image as ImageIcon,
  FileText,
  Star,
  HelpCircle,
  Video,
  LucideIcon,
} from "lucide-react";

export interface NavCommandItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const CATALOG_NAV_ITEMS: NavCommandItem[] = [
  {
    label: "Executive Dashboard & Analytics",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Orders & Bangladesh Courier Fulfillment",
    path: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "Products & Tokyo Inventory Catalog",
    path: "/admin/products",
    icon: Package,
  },
  {
    label: "Pre-Orders & Tokyo Air-Cargo Batches",
    path: "/admin/pre-orders",
    icon: Plane,
  },
  {
    label: "Categories & Subcategory Hierarchy",
    path: "/admin/categories",
    icon: FolderTree,
  },
  {
    label: "Curated Themed Collections",
    path: "/admin/collections",
    icon: Sparkles,
  },
  {
    label: "Japanese Brand House & Origins",
    path: "/admin/brands",
    icon: Award,
  },
  {
    label: "Customers & Skincare CRM",
    path: "/admin/customers",
    icon: Users,
  },
];

export const MARKETING_NAV_ITEMS: NavCommandItem[] = [
  {
    label: "Featured Videos & Creator Reels",
    path: "/admin/videos",
    icon: Video,
  },
  {
    label: "Site-Wide Page Banners Manager",
    path: "/admin/banners",
    icon: ImageIcon,
  },
  {
    label: "Page Content, Hero Headlines & SEO",
    path: "/admin/pages",
    icon: FileText,
  },
  {
    label: "Store Merchandising & Live Announcements",
    path: "/admin/merchandising",
    icon: Megaphone,
  },
  {
    label: "Discounts, Coupons & Flash Offers",
    path: "/admin/discounts",
    icon: Tag,
  },
  {
    label: "Product Reviews Moderation",
    path: "/admin/reviews",
    icon: Star,
  },
  {
    label: "FAQ Knowledge Base Manager",
    path: "/admin/faqs",
    icon: HelpCircle,
  },
  {
    label: "Store Logistics & Courier Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

