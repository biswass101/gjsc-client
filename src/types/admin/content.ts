export interface AdminDiscount {
  id: string;
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  minSpend: number;
  usageLimit: number;
  usageCount: number;
  status: "active" | "expired" | "scheduled";
  startDate: string;
  endDate: string;
}

export interface AdminBanner {
  id: string;
  pageKey:
    | "home_hero"
    | "home_middle"
    | "shop"
    | "collections"
    | "brands"
    | "categories"
    | "offers"
    | "pre_order"
    | "checkout";
  pageTitle: string;
  title: string;
  subtitle?: string | undefined;
  badge?: string | undefined;
  imageUrl: string;
  mobileImageUrl?: string | undefined;
  ctaText?: string | undefined;
  ctaLink?: string | undefined;
  active: boolean;
  order: number;
}

export interface AdminFeaturedVideo {
  id: string;
  title: string;
  caption: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl?: string | undefined;
  product: {
    name: string;
    slug: string;
    brand: string;
    price: number;
    compareAt?: number | undefined;
    image: string;
  };
  active: boolean;
  order: number;
  featured?: boolean | undefined;
  createdAt?: string | undefined;
}

export interface AdminPageMeta {
  id: string;
  route: string;
  pageName: string;
  title: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  badgeText?: string | undefined;
  lastUpdated: string;
}

export interface AdminReview {
  id: string;
  productName: string;
  productSlug: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  status: "approved" | "pending" | "hidden";
  adminReply?: string | undefined;
}

export interface AdminFaq {
  id: string;
  category:
    | "Delivery & Shipping"
    | "Authenticity & Japan Sourcing"
    | "Payments & bKash"
    | "Returns & Exchanges";
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

export interface AdminMerchandising {
  announcementText: string;
  announcementActive: boolean;
  announcementLink: string;
  flashSaleActive: boolean;
  flashSaleTitle: string;
  flashSaleEndsAt: string;
  heroHeadline: string;
  heroSubheadline: string;
  freeShippingThreshold: number;
}

