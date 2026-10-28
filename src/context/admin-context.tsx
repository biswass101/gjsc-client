"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { PRODUCTS } from "@/lib/catalog";

// -------------------------------------------------------------
// CORE INTERFACES
// -------------------------------------------------------------

export interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  japaneseName?: string | undefined;
  brand: string;
  category: string;
  price: number;
  compareAt?: number | undefined;
  costPrice: number;
  stock: number;
  lowStockThreshold: number;
  sku: string;
  barcode?: string | undefined;
  badge?: "Best Seller" | "Flash Sale" | "Trending" | "New" | "Exclusive" | null | undefined;
  status: "active" | "draft" | "archived";
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  short: string;
  description: string;
  howTo: string;
  skinTypes: string[];
  concerns: string[];
  sizes: string[];
  createdAt: string;
  salesCount: number;
}

export interface AdminOrderItem {
  slug: string;
  name: string;
  brand: string;
  price: number;
  qty: number;
  size: string;
  image: string;
}

export interface AdminOrderTimelineEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  by: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  area: string;
  city: string;
  division: string;
  date: string;
  dateFormatted: string;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  paymentMethod: "COD" | "bKash" | "Nagad" | "Card";
  paymentStatus: "Paid" | "Pending" | "Refunded";
  trxId?: string | undefined;
  fulfillmentStatus:
    | "Pending"
    | "Processing"
    | "Quality Checked"
    | "Dispatched"
    | "In Transit"
    | "Delivered"
    | "Cancelled";
  courier: "Pathao Express" | "Steadfast" | "RedX" | "Paperfly" | "In-House" | "None";
  consignmentId?: string | undefined;
  trackingUrl?: string | undefined;
  items: AdminOrderItem[];
  notes?: string | undefined;
  timeline: AdminOrderTimelineEvent[];
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  division: string;
  ordersCount: number;
  totalSpent: number;
  avgOrderValue: number;
  tier: "Standard" | "VIP" | "Platinum" | "At Risk";
  status: "Active" | "Inactive" | "Blocked";
  joinedDate: string;
  lastOrderDate?: string | undefined;
  skinType: string;
  skinConcerns: string[];
  notes: string;
}

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

export interface AdminCategory {
  id: string;
  slug: string;
  title: string;
  japaneseTitle?: string | undefined;
  tagline: string;
  description: string;
  image: string;
  bannerImage?: string | undefined;
  parentCategory: string; // e.g. "Skincare", "Hair", "Body", "Makeup"
  subcategories: string[];
  featured: boolean;
  itemCount: number;
}

export interface AdminCollection {
  id: string;
  slug: string;
  title: string;
  japaneseTitle?: string | undefined;
  tagline: string;
  description: string;
  badgeText?: string | undefined;
  bannerImage: string;
  themeColor: string;
  frequentlySearched: string[];
  featured: boolean;
  itemCount: number;
}

export interface AdminBrand {
  id: string;
  slug: string;
  name: string;
  kanji?: string | undefined;
  origin: string;
  tagline: string;
  description: string;
  category: string;
  logo: string;
  bannerImage?: string | undefined;
  established?: string | undefined;
  featured: boolean;
  itemCount: number;
}

export interface AdminPreOrder {
  id: string;
  productName: string;
  japaneseName?: string | undefined;
  brand: string;
  category: string;
  price: number;
  depositPercent: number; // e.g. 50
  estimatedArrival: string; // e.g. "15 Nov 2026"
  slotsTotal: number;
  slotsBooked: number;
  batchStatus: "Booking Open" | "Tokyo Sourcing" | "Air-Freight" | "Customs Cleared" | "Ready for Delivery";
  image: string;
  active: boolean;
  notes?: string | undefined;
}

export interface AdminBanner {
  id: string;
  pageKey: "home_hero" | "home_middle" | "shop" | "collections" | "brands" | "categories" | "offers" | "pre_order" | "checkout";
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
  category: "Delivery & Shipping" | "Authenticity & Japan Sourcing" | "Payments & bKash" | "Returns & Exchanges";
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

export interface AdminSettings {
  storeName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  warehouseAddress: string;
  tokyoOfficeAddress: string;
  currency: string;
  insideDhakaRate: number;
  outsideDhakaRate: number;
  expressDeliveryRate: number;
  freeShippingMin: number;
  codEnabled: boolean;
  bkashEnabled: boolean;
  bkashMerchantNumber: string;
  nagadEnabled: boolean;
  nagadMerchantNumber: string;
  autoAssignCourier: boolean;
  defaultCourier: string;
  pathaoApiKey: string;
  steadfastApiKey: string;
  lowStockWarningQty: number;
  enableSmsAlerts: boolean;
  enableWhatsappUpdates: boolean;
  maintenanceMode: boolean;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "order" | "stock" | "payment" | "customer";
  link?: string | undefined;
}

export interface AdminActivityLog {
  id: string;
  adminUser: string;
  action: string;
  target: string;
  timestamp: string;
  details?: string | undefined;
}

// -------------------------------------------------------------
// INITIAL SEED DATA
// -------------------------------------------------------------

function generateInitialProducts(): AdminProduct[] {
  return PRODUCTS.slice(0, 36).map((p, idx) => {
    const cost = Math.round(p.price * 0.62);
    const sku = `${p.brand.slice(0, 3).toUpperCase()}-${String(100 + idx).padStart(4, "0")}`;
    return {
      id: p.id || `prod-${idx + 1}`,
      slug: p.slug,
      name: p.name,
      japaneseName: `${p.brand} 公式 プレミアム処方`,
      brand: p.brand,
      category: p.category,
      price: p.price,
      compareAt: p.compareAt || Math.round(p.price * 1.25),
      costPrice: cost,
      stock: p.stock ?? (idx % 7 === 0 ? 3 : idx % 11 === 0 ? 0 : 28 + (idx * 3) % 45),
      lowStockThreshold: 5,
      sku,
      barcode: `4580${String(10000000 + idx)}`,
      badge: (p.badge as AdminProduct["badge"]) ?? (idx % 4 === 0 ? "Best Seller" : idx % 6 === 0 ? "Trending" : null),
      status: "active",
      rating: p.rating || 4.8,
      reviewsCount: p.reviews || 42,
      image: p.image,
      images: [p.image],
      short: p.short || "Authentic Japanese formulation imported directly from Tokyo.",
      description: p.description || "Formulated with pure Japanese botanicals and cutting-edge barrier technologies.",
      howTo: p.howTo || "Dispense 2-3 drops onto clean fingertips. Gently press into face and neck until fully absorbed.",
      skinTypes: p.skinTypes || ["All Skin Types"],
      concerns: p.concerns || ["Hydration", "Barrier Support"],
      sizes: p.sizes || ["50ml"],
      createdAt: "2026-01-15",
      salesCount: 120 + (idx * 17) % 200,
    };
  });
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "GJ-2026-5431",
    customerName: "Nusrat Ahmed",
    customerEmail: "nusrat.ahmed@gmail.com",
    customerPhone: "01711-234567",
    address: "House 42, Road 9/A, Flat 4-B",
    area: "Dhanmondi",
    city: "Dhaka",
    division: "Dhaka",
    date: "2026-08-06",
    dateFormatted: "06 Aug 2026, 02:45 PM",
    subtotal: 8680,
    shippingFee: 60,
    discountAmount: 0,
    total: 8740,
    paymentMethod: "bKash",
    paymentStatus: "Paid",
    trxId: "BKH92019842",
    fulfillmentStatus: "Delivered",
    courier: "Pathao Express",
    consignmentId: "PTH-928190",
    trackingUrl: "https://pathao.com/track/PTH-928190",
    items: [
      {
        slug: "sakura-radiance-serum",
        name: "Sakura Radiance Serum",
        brand: "Shiseido",
        price: 3850,
        qty: 2,
        size: "50ml",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
      },
      {
        slug: "hada-labo-gokujyun",
        name: "Hada Labo Gokujyun Premium Lotion",
        brand: "Hada Labo",
        price: 980,
        qty: 1,
        size: "170ml",
        image: "https://images.unsplash.com/photo-1608248597359-2f5b40cf302a?auto=format&fit=crop&w=400&q=80",
      },
    ],
    notes: "Please pack with extra bubble wrap for fragile glass dropper bottles.",
    timeline: [
      { id: "tl-1", title: "Order Placed", description: "Customer completed checkout via bKash online.", time: "06 Aug 2026, 02:45 PM", by: "Customer" },
      { id: "tl-2", title: "bKash Payment Verified", description: "TrxID BKH92019842 auto-matched with bKash merchant ledger.", time: "06 Aug 2026, 02:46 PM", by: "System" },
      { id: "tl-3", title: "Quality Check & Packing", description: "Tokyo authenticity seal verified by Gulshan Hub staff.", time: "06 Aug 2026, 04:10 PM", by: "Sabbir (Hub Lead)" },
      { id: "tl-4", title: "Handed to Pathao Courier", description: "Consignment PTH-928190 assigned to Pathao Express rider.", time: "06 Aug 2026, 05:30 PM", by: "Logistics Team" },
      { id: "tl-5", title: "Delivered Successfully", description: "Recipient signed OTP verification.", time: "07 Aug 2026, 11:20 AM", by: "Pathao Express" },
    ],
  },
  {
    id: "GJ-2026-5412",
    customerName: "Farhana Khatun",
    customerEmail: "farhana.k@gmail.com",
    customerPhone: "01812-345678",
    address: "Plot 12, O.R. Nizam Road, Nasirabad",
    area: "Nasirabad",
    city: "Chattogram",
    division: "Chattogram",
    date: "2026-08-05",
    dateFormatted: "05 Aug 2026, 06:12 PM",
    subtotal: 4730,
    shippingFee: 120,
    discountAmount: 0,
    total: 4850,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    fulfillmentStatus: "In Transit",
    courier: "Steadfast",
    consignmentId: "STF-482019",
    trackingUrl: "https://steadfast.com.bd/track/STF-482019",
    items: [
      {
        slug: "anessa-perfect-uv-sunscreen",
        name: "Anessa Perfect UV Sunscreen Skincare Milk SPF50+",
        brand: "Anessa",
        price: 3500,
        qty: 1,
        size: "60ml",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80",
      },
    ],
    timeline: [
      { id: "tl-1", title: "Order Created", description: "COD order received from Chattogram.", time: "05 Aug 2026, 06:12 PM", by: "Customer" },
      { id: "tl-2", title: "Dispatched", description: "Consignment STF-482019 handed to Steadfast.", time: "06 Aug 2026, 10:00 AM", by: "Logistics Team" },
    ],
  },
];

const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: "cust-1",
    name: "Nusrat Ahmed",
    email: "nusrat.ahmed@gmail.com",
    phone: "+880 1711-234567",
    city: "Dhaka",
    division: "Dhaka",
    ordersCount: 4,
    totalSpent: 21480,
    avgOrderValue: 5370,
    tier: "VIP",
    status: "Active",
    joinedDate: "Jan 2026",
    lastOrderDate: "06 Aug 2026",
    skinType: "Combination Sensitive",
    skinConcerns: ["Brightening", "Barrier Repair"],
    notes: "Loves Shiseido formulations. Prefers delivery to Dhanmondi residence.",
  },
  {
    id: "cust-2",
    name: "Farhana Khatun",
    email: "farhana.k@gmail.com",
    phone: "+880 1812-345678",
    city: "Chattogram",
    division: "Chattogram",
    ordersCount: 2,
    totalSpent: 7740,
    avgOrderValue: 3870,
    tier: "Standard",
    status: "Active",
    joinedDate: "Mar 2026",
    lastOrderDate: "05 Aug 2026",
    skinType: "Oily Acne-Prone",
    skinConcerns: ["Pores", "Sun Protection"],
    notes: "Regular Anessa buyer. Prefers Steadfast courier delivery.",
  },
];

const INITIAL_DISCOUNTS: AdminDiscount[] = [
  {
    id: "disc-1",
    code: "TOKYO10",
    type: "percentage",
    value: 10,
    minSpend: 2000,
    usageLimit: 500,
    usageCount: 142,
    status: "active",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
  },
  {
    id: "disc-2",
    code: "SAKURA500",
    type: "fixed",
    value: 500,
    minSpend: 4000,
    usageLimit: 200,
    usageCount: 78,
    status: "active",
    startDate: "2026-08-01",
    endDate: "2026-09-30",
  },
];

// Initial Categories Seed
const INITIAL_CATEGORIES: AdminCategory[] = [
  {
    id: "cat-1",
    slug: "skin-care",
    title: "Skin Care",
    japaneseTitle: "スキンケア · Tokyo Rituals",
    tagline: "The Art of Gentle Layering & Barrier Reverence",
    description: "Gentle double cleansing, slow-fermented rice essences, and hyaluronic hydration.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    parentCategory: "Skincare",
    subcategories: ["Serum", "Essence", "Moisturizer", "Toner", "Cleanser", "Face Wash", "Face Mask", "Eye Care", "Lip Care"],
    featured: true,
    itemCount: 48,
  },
  {
    id: "cat-2",
    slug: "sunscreen",
    title: "Sunscreens & UV Defense",
    japaneseTitle: "日焼け止め · Broad Spectrum",
    tagline: "Weightless Tokyo Sun Milks with Zero White Cast",
    description: "Award-winning Japanese UV protection formulas with hyaluronic acid and sweat resistance.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80",
    parentCategory: "Skincare",
    subcategories: ["Sun Milk", "Gel Sunscreen", "Watery Essence", "Mineral Sunscreen"],
    featured: true,
    itemCount: 24,
  },
  {
    id: "cat-3",
    slug: "hair-care",
    title: "Japanese Hair Rituals",
    japaneseTitle: "ヘアケア · Tsubaki & Fino",
    tagline: "Repairing Masks, Camellia Oils & Scalp Tonics",
    description: "Transformative Japanese hair repair formulas with royal jelly and camellia seed extract.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80",
    parentCategory: "Hair",
    subcategories: ["Hair Masks", "Hair Oils", "Shampoo", "Conditioner", "Scalp Care"],
    featured: true,
    itemCount: 19,
  },
  {
    id: "cat-4",
    slug: "cleansers",
    title: "Double Cleansing & Toners",
    japaneseTitle: "クレンジング · Pure Botanicals",
    tagline: "Melt away makeup without stripping the acid mantle",
    description: "Silky cleansing oils, amino acid washes, and balancing skin softeners.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
    parentCategory: "Skincare",
    subcategories: ["Cleansing Oil", "Cleansing Balm", "Foaming Face Wash", "Micellar Water"],
    featured: true,
    itemCount: 32,
  },
  {
    id: "cat-5",
    slug: "gift-sets",
    title: "Combo & Gift Sets",
    japaneseTitle: "ギフトセット · Omiyage Vault",
    tagline: "Handcrafted Luxury Gift Boxes & Multi-Step Sets",
    description: "Complete Japanese beauty routines curated for deep hydration, anti-aging, and brightening.",
    image: "https://images.unsplash.com/photo-1512290900672-1f5be6b4f762?auto=format&fit=crop&w=400&q=80",
    parentCategory: "Gifts",
    subcategories: ["Hydration Sets", "Anti-Aging Trios", "Travel Kits", "Double Cleanse Duos"],
    featured: true,
    itemCount: 14,
  },
];

// Initial Collections Seed
const INITIAL_COLLECTIONS: AdminCollection[] = [
  {
    id: "col-1",
    slug: "bestsellers",
    title: "Best Sellers",
    japaneseTitle: "ベストセラー · Tokyo Most Loved",
    tagline: "Japan's Most Revered Skincare Formulas & Daily Icons",
    description: "Discover Bangladesh's most cherished Japanese beauty icons. Clinically verified Tokyo imports.",
    badgeText: "Verified Top Rated · 50,000+ Reviews",
    bannerImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
    themeColor: "text-amber-500",
    frequentlySearched: ["Sakura Radiance Serum", "Hada Labo Lotion", "Fino Hair Mask", "Anessa Perfect UV"],
    featured: true,
    itemCount: 36,
  },
  {
    id: "col-2",
    slug: "new-arrivals",
    title: "New Arrivals",
    japaneseTitle: "新入荷 · Fresh Tokyo Formulations",
    tagline: "Just Landed from Tokyo: Next-Generation J-Beauty Innovations",
    description: "Fresh arrivals straight from Japanese laboratories in Tokyo and Kyoto.",
    badgeText: "Just Landed · Tokyo Fresh Batch",
    bannerImage: "https://images.unsplash.com/photo-1608248597359-2f5b40cf302a?auto=format&fit=crop&w=1200&q=80",
    themeColor: "text-emerald-500",
    frequentlySearched: ["Yuzu Glow Essence", "Opera Lip Tint", "Canmake Cream Cheek"],
    featured: true,
    itemCount: 22,
  },
  {
    id: "col-3",
    slug: "trending",
    title: "Trending Now",
    japaneseTitle: "トレンド · Viral Tokyo Sensations",
    tagline: "Formulas Winning Hearts Across Bangladesh This Week",
    description: "Explore the most-coveted Japanese beauty formulas currently captivating skincare lovers.",
    badgeText: "Viral Sensations · High Demand",
    bannerImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80",
    themeColor: "text-amber-500",
    frequentlySearched: ["Koji Ferment Moisture Cream", "Matcha Clarifying Toner", "Silk Rice Cleanser"],
    featured: true,
    itemCount: 18,
  },
  {
    id: "col-4",
    slug: "combo-gift-sets",
    title: "Combo & Gift Sets",
    japaneseTitle: "ギフトセット · The Art of Japanese Omiyage",
    tagline: "Curated Complete Rituals & Luxurious Beauty Bundles",
    description: "Experience the Japanese tradition of Omiyage with our luxury gift sets with up to 25% savings.",
    badgeText: "Save up to 25% · Luxury Gift Boxed",
    bannerImage: "https://images.unsplash.com/photo-1512290900672-1f5be6b4f762?auto=format&fit=crop&w=1200&q=80",
    themeColor: "text-pink-500",
    frequentlySearched: ["Full Ritual Sets", "Hydration Discovery", "Double Cleansing Duo"],
    featured: true,
    itemCount: 12,
  },
];

// Initial Brands Seed
const INITIAL_BRANDS: AdminBrand[] = [
  {
    id: "br-1",
    name: "Shiseido",
    slug: "shiseido",
    kanji: "資生堂",
    origin: "Ginza, Tokyo",
    tagline: "Over 150 Years of Scientific Mastery & Modern Japanese Aesthetics",
    description: "Founded in 1872 in Tokyo's Ginza district, Shiseido combines Western scientific expertise with Eastern beauty traditions.",
    category: "Prestige Skincare",
    logo: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80",
    established: "Est. 1872",
    featured: true,
    itemCount: 42,
  },
  {
    id: "br-2",
    name: "Hada Labo",
    slug: "hada-labo",
    kanji: "肌ラボ",
    origin: "Osaka, Japan",
    tagline: "Perfect & Simple: Multi-Molecular Hyaluronic Acid Hydration",
    description: "Formulated by Rohto Pharmaceutical in Osaka, Japan's #1 hydrating lotion for deep barrier restoration.",
    category: "Hydration Science",
    logo: "https://images.unsplash.com/photo-1608248597359-2f5b40cf302a?auto=format&fit=crop&w=300&q=80",
    established: "Est. 2004",
    featured: true,
    itemCount: 28,
  },
  {
    id: "br-3",
    name: "Anessa",
    slug: "anessa",
    kanji: "アネッサ",
    origin: "Tokyo, Japan",
    tagline: "Japan's #1 UV Sunscreen for 21 Consecutive Years",
    description: "Shiseido's sun-care powerhouse utilizing Auto-Booster and Aqua Booster technologies for extreme humidity protection.",
    category: "Sun Defense",
    logo: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=300&q=80",
    established: "Est. 1992",
    featured: true,
    itemCount: 16,
  },
  {
    id: "br-4",
    name: "SK-II",
    slug: "sk-ii",
    kanji: "エスケーツー",
    origin: "Shiga, Japan",
    tagline: "The Miracle of Pitera: Crystal Clear Skin Transformation",
    description: "Born in a sake brewery in Japan, SK-II's signature bio-ferment Pitera contains over 50 micronutrients.",
    category: "Luxury Anti-Aging",
    logo: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80",
    established: "Est. 1980",
    featured: true,
    itemCount: 12,
  },
  {
    id: "br-5",
    name: "Curel",
    slug: "curel",
    kanji: "キュレル",
    origin: "Tokyo, Japan",
    tagline: "Ceramide Science for Dry, Sensitive Japanese Skin",
    description: "Kao's dermatological brand replenishing natural ceramide function to soothe inflammation.",
    category: "Barrier Repair",
    logo: "https://images.unsplash.com/photo-1512290900672-1f5be6b4f762?auto=format&fit=crop&w=300&q=80",
    established: "Est. 1999",
    featured: true,
    itemCount: 15,
  },
];

// Initial Pre-Orders Seed
const INITIAL_PREORDERS: AdminPreOrder[] = [
  {
    id: "po-1",
    productName: "SK-II LXP Ultimate Perfecting Serum (Limited Batch)",
    japaneseName: "SK-II 最高峰 LXP 究極セラム",
    brand: "SK-II",
    category: "Prestige Serum",
    price: 32500,
    depositPercent: 50,
    estimatedArrival: "15 Nov 2026",
    slotsTotal: 25,
    slotsBooked: 18,
    batchStatus: "Tokyo Sourcing",
    image: "https://images.unsplash.com/photo-1608248597359-2f5b40cf302a?auto=format&fit=crop&w=400&q=80",
    active: true,
    notes: "Direct procurement from Ginza Flagship. Temperature-controlled air shipping.",
  },
  {
    id: "po-2",
    productName: "Shiseido Future Solution LX Legendary Enmei Ultimate Cream",
    japaneseName: "資生堂 フューチャーソリューション 伝説の延命草",
    brand: "Shiseido",
    category: "Night Cream",
    price: 45000,
    depositPercent: 50,
    estimatedArrival: "20 Nov 2026",
    slotsTotal: 20,
    slotsBooked: 12,
    batchStatus: "Air-Freight",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    active: true,
    notes: "In air transit on flight JL-741 Tokyo Narita to Dhaka Hazrat Shahjalal.",
  },
  {
    id: "po-3",
    productName: "Decorté Liposome Advanced Repair Serum 100ml Special Size",
    japaneseName: "コスメデコルテ リポソーム アドバンスト 100ml",
    brand: "Decorté",
    category: "Serum",
    price: 18500,
    depositPercent: 40,
    estimatedArrival: "28 Nov 2026",
    slotsTotal: 30,
    slotsBooked: 9,
    batchStatus: "Booking Open",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
    active: true,
    notes: "Rare domestic Tokyo 100ml jumbo pump bottle.",
  },
];

// Initial Banners Seed
const INITIAL_BANNERS: AdminBanner[] = [
  {
    id: "ban-1",
    pageKey: "home_hero",
    pageTitle: "Homepage Main Hero",
    title: "Pure Japanese Beauty, Direct from Tokyo Sanctuary",
    subtitle: "Clinically proven barrier restoration, gentle double cleansing, and radiant essences imported fresh from Japan.",
    badge: "🌸 Tokyo Spring Shipment Arrived",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Explore Tokyo Best Sellers",
    ctaLink: "/collections/bestsellers",
    active: true,
    order: 1,
  },
  {
    id: "ban-2",
    pageKey: "shop",
    pageTitle: "Catalog Shop Page",
    title: "All Japanese Skincare Formulations",
    subtitle: "Browse over 800+ authentic imported cosmetics verified with Tokyo laboratory batch codes.",
    badge: "100% Authentic Japanese Formulations",
    imageUrl: "https://images.unsplash.com/photo-1608248597359-2f5b40cf302a?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Filter by Skin Concern",
    ctaLink: "/shop",
    active: true,
    order: 2,
  },
  {
    id: "ban-3",
    pageKey: "pre_order",
    pageTitle: "Pre-Order Direct From Japan",
    title: "Pre-Order Direct From Tokyo Laboratories",
    subtitle: "Reserve exclusive prestige formulations delivered by temperature-controlled air freight in 10-14 days.",
    badge: "Direct Ginza Procurement",
    imageUrl: "https://images.unsplash.com/photo-1512290900672-1f5be6b4f762?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Reserve Your Bottle",
    ctaLink: "/pre-order",
    active: true,
    order: 3,
  },
  {
    id: "ban-4",
    pageKey: "offers",
    pageTitle: "Seasonal Offers & BOGO",
    title: "Tokyo Seasonal Gift Specials & BOGO Savings",
    subtitle: "Exclusive Japanese skincare bundles, free gift discovery sets, and limited discount codes.",
    badge: "Save Up To 35% on Bundles",
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Claim Exclusive Offers",
    ctaLink: "/offers",
    active: true,
    order: 4,
  },
];

// Initial Page Metas Seed
const INITIAL_PAGE_METAS: AdminPageMeta[] = [
  {
    id: "pm-1",
    route: "/",
    pageName: "Homepage",
    title: "Glorious Japan Skin Care | Authentic Japanese Skincare in Bangladesh",
    metaDescription: "100% authentic Japanese beauty imports in Bangladesh. Clinically proven Tokyo skincare, serums, moisturizers, and sunscreens with Cash on Delivery nationwide.",
    heroHeading: "Stay Glorious, Shine with Confidence",
    heroSubheading: "Authentic Tokyo skincare routines tailored for deep hydration, brightening, and radiant barrier care.",
    badgeText: "🌸 Tokyo Direct • Authenticity Guaranteed",
    lastUpdated: "2026-10-26",
  },
  {
    id: "pm-2",
    route: "/shop",
    pageName: "Catalog Shop",
    title: "Shop Authentic Japanese Skincare | Glorious Japan",
    metaDescription: "Explore our full catalog of 800+ authentic Japanese skincare products imported directly from Tokyo, Japan.",
    heroHeading: "Complete Japanese Beauty Sanctuary",
    heroSubheading: "Find your ideal skincare formulation matched by Japanese dermatological principles.",
    lastUpdated: "2026-10-26",
  },
  {
    id: "pm-3",
    route: "/pre-order",
    pageName: "Pre-Order Direct Japan",
    title: "Pre-Order Direct From Japan | Glorious Japan Skin Care",
    metaDescription: "Reserve rare, fresh-batch Japanese beauty formulas directly from certified Tokyo laboratories. 10-14 days guaranteed air-freight delivery to Bangladesh.",
    heroHeading: "Exclusive Tokyo Domestic Reserve",
    heroSubheading: "Limited prestige batches flown in fresh directly upon reservation.",
    badgeText: "Air-Freight Guarantee",
    lastUpdated: "2026-10-26",
  },
  {
    id: "pm-4",
    route: "/offers",
    pageName: "Special Offers & BOGO",
    title: "Exclusive Japanese Beauty Offers & Bundles | Glorious Japan",
    metaDescription: "Special seasonal discounts, Buy-1-Get-1 Tokyo deals, and discounted routine sets in Bangladesh.",
    heroHeading: "Seasonal Japanese Beauty Festival",
    heroSubheading: "Curated bundles with complimentary luxury samples and free delivery inside Dhaka.",
    lastUpdated: "2026-10-26",
  },
];

// Initial Customer Reviews Seed
const INITIAL_REVIEWS: AdminReview[] = [
  {
    id: "rev-1",
    productName: "Sakura Radiance Serum",
    productSlug: "sakura-radiance-serum",
    customerName: "Nusrat Jahan",
    rating: 5,
    date: "24 Oct 2026",
    comment: "This transformed my skin texture completely! Non-greasy, absorbs within seconds, and gives that coveted glass-skin dewy finish.",
    verified: true,
    status: "approved",
    adminReply: "Arigatou gozaimasu Nusrat! We are delighted the Sakura ferment is providing such radiant hydration for you! 🌸",
  },
  {
    id: "rev-2",
    productName: "Anessa Perfect UV Sunscreen Skincare Milk",
    productSlug: "anessa-perfect-uv-sunscreen",
    customerName: "Farhana Khatun",
    rating: 5,
    date: "20 Oct 2026",
    comment: "The holy grail sunscreen for Dhaka's hot weather! Zero white cast, water-resistant, and keeps my makeup matte all day.",
    verified: true,
    status: "approved",
  },
  {
    id: "rev-3",
    productName: "Hada Labo Gokujyun Premium Lotion",
    productSlug: "hada-labo-gokujyun",
    customerName: "Tasnim Rahman",
    rating: 5,
    date: "18 Oct 2026",
    comment: "My dry patches vanished within 3 days. 5 types of hyaluronic acid really make a noticeable difference.",
    verified: true,
    status: "approved",
  },
  {
    id: "rev-4",
    productName: "Melano CC Vitamin C Brightening Essence",
    productSlug: "melano-cc-essence",
    customerName: "Sadia Islam",
    rating: 4,
    date: "15 Oct 2026",
    comment: "Very effective at fading post-acne dark spots. Gentle on sensitive skin.",
    verified: true,
    status: "approved",
  },
];

// Initial FAQs Seed
const INITIAL_FAQS: AdminFaq[] = [
  {
    id: "faq-1",
    category: "Authenticity & Japan Sourcing",
    question: "How do I know that all products are 100% authentic from Japan?",
    answer: "Every single product is sourced directly from authorized brand laboratories and flagship department distributors in Ginza, Tokyo and Osaka. We do not source from gray markets or third-party wholesalers. Each package carries its original Japanese batch code and tamper-evident authentication seal.",
    order: 1,
    active: true,
  },
  {
    id: "faq-2",
    category: "Delivery & Shipping",
    question: "What are the courier delivery timelines and shipping fees across Bangladesh?",
    answer: "Inside Dhaka Metropolitan, deliveries arrive within 24 to 48 hours via Pathao Express rider (৳60 delivery charge, or FREE for orders over ৳3,000). For Chittagong, Sylhet, Rajshahi, and all other divisional districts, delivery takes 2 to 4 business days via Steadfast Courier (৳120 delivery charge).",
    order: 2,
    active: true,
  },
  {
    id: "faq-3",
    category: "Payments & bKash",
    question: "Which payment methods are accepted?",
    answer: "We accept Cash on Delivery (COD) nationwide across Bangladesh, direct bKash Merchant payment, Nagad MFS, and all Visa, Mastercard, and Amex credit/debit cards with instant verification.",
    order: 3,
    active: true,
  },
  {
    id: "faq-4",
    category: "Authenticity & Japan Sourcing",
    question: "How does the Japan Pre-Order air-freight service work?",
    answer: "Pre-order items are collected fresh from Tokyo flagships and flown to Dhaka via temperature-controlled air freight. Delivery takes 10 to 14 days with full SMS tracking and zero surprise customs charges.",
    order: 4,
    active: true,
  },
];

const INITIAL_MERCHANDISING: AdminMerchandising = {
  announcementText: "🌸 Tokyo Spring Shipment Arrived: 100% Authentic Japanese Skincare • Free Dhaka Delivery over ৳3,000",
  announcementActive: true,
  announcementLink: "/shop",
  flashSaleActive: true,
  flashSaleTitle: "Ginza Luxury 48h Flash Festival",
  flashSaleEndsAt: "2026-10-31T23:59:59",
  heroHeadline: "Pure Japanese Beauty, Direct from Tokyo Sanctuary",
  heroSubheadline: "Clinically proven barrier restoration, gentle double cleansing, and radiant essences imported fresh from Japan.",
  freeShippingThreshold: 5000,
};

const INITIAL_SETTINGS: AdminSettings = {
  storeName: "Glorious Japan Skin Care",
  tagline: "Stay Glorious, Shine with Confidence",
  contactEmail: "concierge@gloriousjapan.com",
  contactPhone: "+880 1700-000000",
  warehouseAddress: "House 14, Road 11, Block C, Banani, Dhaka 1213",
  tokyoOfficeAddress: "Ginza 6-Chome, Chuo-ku, Tokyo 104-0061, Japan",
  currency: "BDT (৳)",
  insideDhakaRate: 60,
  outsideDhakaRate: 120,
  expressDeliveryRate: 150,
  freeShippingMin: 5000,
  codEnabled: true,
  bkashEnabled: true,
  bkashMerchantNumber: "01700-000000",
  nagadEnabled: true,
  nagadMerchantNumber: "01800-000000",
  autoAssignCourier: true,
  defaultCourier: "Pathao Express",
  pathaoApiKey: "pth_live_secret_99812401",
  steadfastApiKey: "stf_live_secret_7721834",
  lowStockWarningQty: 5,
  enableSmsAlerts: true,
  enableWhatsappUpdates: true,
  maintenanceMode: false,
};

const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif-1",
    title: "New High-Value Order (#GJ-2026-5361)",
    message: "Sadia Islam placed an order for SK-II Essence (৳11,340) via Card.",
    time: "10 mins ago",
    read: false,
    type: "order",
    link: "/admin/orders",
  },
  {
    id: "notif-2",
    title: "Low Stock Alert: Melano CC",
    message: "Melano CC Vitamin C has only 2 units remaining in Banani warehouse.",
    time: "45 mins ago",
    read: false,
    type: "stock",
    link: "/admin/products",
  },
];

const INITIAL_LOGS: AdminActivityLog[] = [
  {
    id: "log-1",
    adminUser: "Super Admin",
    action: "Updated Stock",
    target: "Sakura Radiance Serum",
    timestamp: "Today at 02:30 PM",
    details: "Restocked +25 units from Tokyo air shipment.",
  },
];

// -------------------------------------------------------------
// CONTEXT INTERFACE
// -------------------------------------------------------------

interface AdminContextType {
  // Data stores
  products: AdminProduct[];
  orders: AdminOrder[];
  customers: AdminCustomer[];
  discounts: AdminDiscount[];
  categories: AdminCategory[];
  collections: AdminCollection[];
  brands: AdminBrand[];
  preOrders: AdminPreOrder[];
  banners: AdminBanner[];
  pageMetas: AdminPageMeta[];
  reviews: AdminReview[];
  faqs: AdminFaq[];
  merchandising: AdminMerchandising;
  settings: AdminSettings;
  notifications: AdminNotification[];
  activityLogs: AdminActivityLog[];
  unreadNotifCount: number;

  // Product Operations
  addProduct: (product: Omit<AdminProduct, "id" | "slug" | "createdAt" | "salesCount">) => AdminProduct;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => AdminProduct;
  bulkUpdateProducts: (ids: string[], updates: Partial<AdminProduct>) => void;
  bulkDeleteProducts: (ids: string[]) => void;
  adjustStock: (id: string, delta: number) => void;

  // Order Operations
  addOrder: (order: Omit<AdminOrder, "id" | "timeline" | "date" | "dateFormatted">) => AdminOrder;
  updateOrderStatus: (orderId: string, status: AdminOrder["fulfillmentStatus"], note?: string) => void;
  updateOrderPayment: (orderId: string, status: AdminOrder["paymentStatus"], trxId?: string) => void;
  assignCourier: (orderId: string, courier: AdminOrder["courier"], consignmentId?: string) => void;
  addOrderNote: (orderId: string, note: string) => void;
  deleteOrder: (orderId: string) => void;

  // Customer Operations
  addCustomer: (customer: Omit<AdminCustomer, "id" | "joinedDate" | "ordersCount" | "totalSpent" | "avgOrderValue">) => AdminCustomer;
  updateCustomer: (id: string, updates: Partial<AdminCustomer>) => void;
  deleteCustomer: (id: string) => void;

  // Discount Operations
  addDiscount: (discount: Omit<AdminDiscount, "id" | "usageCount">) => AdminDiscount;
  toggleDiscount: (id: string) => void;
  deleteDiscount: (id: string) => void;

  // Categories Operations
  addCategory: (cat: Omit<AdminCategory, "id">) => AdminCategory;
  updateCategory: (id: string, updates: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;

  // Collections Operations
  addCollection: (col: Omit<AdminCollection, "id">) => AdminCollection;
  updateCollection: (id: string, updates: Partial<AdminCollection>) => void;
  deleteCollection: (id: string) => void;

  // Brands Operations
  addBrand: (brand: Omit<AdminBrand, "id">) => AdminBrand;
  updateBrand: (id: string, updates: Partial<AdminBrand>) => void;
  deleteBrand: (id: string) => void;

  // Pre-Orders Operations
  addPreOrder: (po: Omit<AdminPreOrder, "id">) => AdminPreOrder;
  updatePreOrder: (id: string, updates: Partial<AdminPreOrder>) => void;
  deletePreOrder: (id: string) => void;

  // Banners Operations
  addBanner: (banner: Omit<AdminBanner, "id">) => AdminBanner;
  updateBanner: (id: string, updates: Partial<AdminBanner>) => void;
  deleteBanner: (id: string) => void;

  // Page Content & SEO Operations
  updatePageMeta: (id: string, updates: Partial<AdminPageMeta>) => void;

  // Reviews Moderation Operations
  updateReviewStatus: (id: string, status: AdminReview["status"]) => void;
  replyReview: (id: string, reply: string) => void;
  deleteReview: (id: string) => void;

  // FAQs Operations
  addFaq: (faq: Omit<AdminFaq, "id">) => AdminFaq;
  updateFaq: (id: string, updates: Partial<AdminFaq>) => void;
  deleteFaq: (id: string) => void;

  // Merchandising & Settings
  updateMerchandising: (updates: Partial<AdminMerchandising>) => void;
  updateSettings: (updates: Partial<AdminSettings>) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Factory Reset
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEY = "gjsc_admin_state_v3";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<AdminProduct[]>(generateInitialProducts);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);
  const [discounts, setDiscounts] = useState<AdminDiscount[]>(INITIAL_DISCOUNTS);
  const [categories, setCategories] = useState<AdminCategory[]>(INITIAL_CATEGORIES);
  const [collections, setCollections] = useState<AdminCollection[]>(INITIAL_COLLECTIONS);
  const [brands, setBrands] = useState<AdminBrand[]>(INITIAL_BRANDS);
  const [preOrders, setPreOrders] = useState<AdminPreOrder[]>(INITIAL_PREORDERS);
  const [banners, setBanners] = useState<AdminBanner[]>(INITIAL_BANNERS);
  const [pageMetas, setPageMetas] = useState<AdminPageMeta[]>(INITIAL_PAGE_METAS);
  const [reviews, setReviews] = useState<AdminReview[]>(INITIAL_REVIEWS);
  const [faqs, setFaqs] = useState<AdminFaq[]>(INITIAL_FAQS);
  const [merchandising, setMerchandising] = useState<AdminMerchandising>(INITIAL_MERCHANDISING);
  const [settings, setSettings] = useState<AdminSettings>(INITIAL_SETTINGS);
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS);
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(INITIAL_LOGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.products) setProducts(parsed.products);
        if (parsed.orders) setOrders(parsed.orders);
        if (parsed.customers) setCustomers(parsed.customers);
        if (parsed.discounts) setDiscounts(parsed.discounts);
        if (parsed.categories) setCategories(parsed.categories);
        if (parsed.collections) setCollections(parsed.collections);
        if (parsed.brands) setBrands(parsed.brands);
        if (parsed.preOrders) setPreOrders(parsed.preOrders);
        if (parsed.banners) setBanners(parsed.banners);
        if (parsed.pageMetas) setPageMetas(parsed.pageMetas);
        if (parsed.reviews) setReviews(parsed.reviews);
        if (parsed.faqs) setFaqs(parsed.faqs);
        if (parsed.merchandising) setMerchandising(parsed.merchandising);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.activityLogs) setActivityLogs(parsed.activityLogs);
      }
    } catch (e) {
      console.warn("Could not load admin state from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          products,
          orders,
          customers,
          discounts,
          categories,
          collections,
          brands,
          preOrders,
          banners,
          pageMetas,
          reviews,
          faqs,
          merchandising,
          settings,
          notifications,
          activityLogs,
        })
      );
    } catch (e) {
      console.warn("Could not persist admin state", e);
    }
  }, [
    products,
    orders,
    customers,
    discounts,
    categories,
    collections,
    brands,
    preOrders,
    banners,
    pageMetas,
    reviews,
    faqs,
    merchandising,
    settings,
    notifications,
    activityLogs,
    isLoaded,
  ]);

  const addActivityLog = useCallback((action: string, target: string, details?: string) => {
    const newLog: AdminActivityLog = {
      id: `log-${Date.now()}`,
      adminUser: "Super Admin",
      action,
      target,
      timestamp: "Just now",
      details,
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  }, []);

  // PRODUCT ACTIONS
  const addProduct = useCallback(
    (input: Omit<AdminProduct, "id" | "slug" | "createdAt" | "salesCount">): AdminProduct => {
      const id = `prod-${Date.now()}`;
      const slug = input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const newProduct: AdminProduct = {
        ...input,
        id,
        slug,
        createdAt: new Date().toISOString().slice(0, 10),
        salesCount: 0,
      };
      setProducts((prev) => [newProduct, ...prev]);
      addActivityLog("Created Product", newProduct.name, `Initial stock: ${newProduct.stock}, Price: ৳${newProduct.price}`);
      return newProduct;
    },
    [addActivityLog]
  );

  const updateProduct = useCallback(
    (id: string, updates: Partial<AdminProduct>) => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            const updated = { ...p, ...updates };
            addActivityLog("Updated Product", p.name, `Fields: ${Object.keys(updates).join(", ")}`);
            return updated;
          }
          return p;
        })
      );
    },
    [addActivityLog]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      setProducts((prev) => {
        const found = prev.find((p) => p.id === id);
        if (found) addActivityLog("Deleted Product", found.name, `SKU: ${found.sku}`);
        return prev.filter((p) => p.id !== id);
      });
    },
    [addActivityLog]
  );

  const duplicateProduct = useCallback(
    (id: string): AdminProduct => {
      const found = products.find((p) => p.id === id);
      const newId = `prod-${Date.now()}`;
      const clone: AdminProduct = found
        ? {
            ...found,
            id: newId,
            name: `${found.name} (Copy)`,
            slug: `${found.slug}-copy-${Date.now().toString().slice(-4)}`,
            sku: `${found.sku}-CPY`,
            createdAt: new Date().toISOString().slice(0, 10),
            salesCount: 0,
          }
        : {
            id: newId,
            slug: `new-product-${newId}`,
            name: "New Cloned Product",
            brand: "Shiseido",
            category: "Serum",
            price: 2500,
            costPrice: 1500,
            stock: 20,
            lowStockThreshold: 5,
            sku: `GEN-${Date.now().toString().slice(-4)}`,
            status: "draft",
            rating: 5,
            reviewsCount: 0,
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
            images: [],
            short: "Japanese skincare formulation.",
            description: "Authentic imported formula.",
            howTo: "Apply daily.",
            skinTypes: ["All Skin Types"],
            concerns: ["Hydration"],
            sizes: ["50ml"],
            createdAt: new Date().toISOString().slice(0, 10),
            salesCount: 0,
          };
      setProducts((prev) => [clone, ...prev]);
      addActivityLog("Duplicated Product", clone.name);
      return clone;
    },
    [products, addActivityLog]
  );

  const bulkUpdateProducts = useCallback(
    (ids: string[], updates: Partial<AdminProduct>) => {
      setProducts((prev) => prev.map((p) => (ids.includes(p.id) ? { ...p, ...updates } : p)));
      addActivityLog("Bulk Updated Products", `${ids.length} products updated`);
    },
    [addActivityLog]
  );

  const bulkDeleteProducts = useCallback(
    (ids: string[]) => {
      setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
      addActivityLog("Bulk Deleted Products", `${ids.length} products removed`);
    },
    [addActivityLog]
  );

  const adjustStock = useCallback((id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStock = Math.max(0, p.stock + delta);
          return { ...p, stock: nextStock };
        }
        return p;
      })
    );
  }, []);

  // ORDER ACTIONS
  const addOrder = useCallback(
    (input: Omit<AdminOrder, "id" | "timeline" | "date" | "dateFormatted">): AdminOrder => {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const dateFormatted =
        now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
        `, ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
      const id = `GJ-2026-${Math.floor(5500 + Math.random() * 500)}`;
      const newOrder: AdminOrder = {
        ...input,
        id,
        date: dateStr,
        dateFormatted,
        timeline: [
          {
            id: `tl-${Date.now()}`,
            title: "Order Placed",
            description: `Manual order created by Admin via ${input.paymentMethod}.`,
            time: dateFormatted,
            by: "Admin",
          },
        ],
      };
      setOrders((prev) => [newOrder, ...prev]);
      addActivityLog("Created Manual Order", id, `Customer: ${newOrder.customerName}, Total: ৳${newOrder.total}`);
      return newOrder;
    },
    [addActivityLog]
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: AdminOrder["fulfillmentStatus"], note?: string) => {
      const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setOrders((prev) =>
        prev.map((o) => {
          if (o.id === orderId) {
            const newTimelineEvent: AdminOrderTimelineEvent = {
              id: `tl-${Date.now()}`,
              title: `Status Changed to ${status}`,
              description: note || `Status updated from ${o.fulfillmentStatus} to ${status}.`,
              time: `Today, ${timeNow}`,
              by: "Admin",
            };
            return {
              ...o,
              fulfillmentStatus: status,
              timeline: [...o.timeline, newTimelineEvent],
            };
          }
          return o;
        })
      );
      addActivityLog("Updated Order Status", orderId, `New status: ${status}`);
    },
    [addActivityLog]
  );

  const updateOrderPayment = useCallback(
    (orderId: string, status: AdminOrder["paymentStatus"], trxId?: string) => {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.id === orderId) {
            return { ...o, paymentStatus: status, ...(trxId ? { trxId } : {}) };
          }
          return o;
        })
      );
      addActivityLog("Updated Payment Status", orderId, `Status set to ${status}`);
    },
    [addActivityLog]
  );

  const assignCourier = useCallback(
    (orderId: string, courier: AdminOrder["courier"], consignmentId?: string) => {
      const trackingUrl =
        courier === "Pathao Express"
          ? `https://pathao.com/track/${consignmentId || "DEMO"}`
          : courier === "Steadfast"
          ? `https://steadfast.com.bd/track/${consignmentId || "DEMO"}`
          : undefined;

      setOrders((prev) =>
        prev.map((o) => {
          if (o.id === orderId) {
            return {
              ...o,
              courier,
              consignmentId: consignmentId ?? o.consignmentId,
              trackingUrl: trackingUrl ?? o.trackingUrl,
              fulfillmentStatus: o.fulfillmentStatus === "Pending" ? "Processing" : o.fulfillmentStatus,
            };
          }
          return o;
        })
      );
      addActivityLog("Assigned Courier", orderId, `${courier} (${consignmentId || "Pending"})`);
    },
    [addActivityLog]
  );

  const addOrderNote = useCallback((orderId: string, note: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, notes: note } : o)));
  }, []);

  const deleteOrder = useCallback(
    (orderId: string) => {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      addActivityLog("Deleted Order", orderId);
    },
    [addActivityLog]
  );

  // CUSTOMER ACTIONS
  const addCustomer = useCallback(
    (input: Omit<AdminCustomer, "id" | "joinedDate" | "ordersCount" | "totalSpent" | "avgOrderValue">): AdminCustomer => {
      const id = `cust-${Date.now()}`;
      const newCustomer: AdminCustomer = {
        ...input,
        id,
        joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        lastOrderDate: input.lastOrderDate || "Never",
        ordersCount: 0,
        totalSpent: 0,
        avgOrderValue: 0,
      };
      setCustomers((prev) => [newCustomer, ...prev]);
      addActivityLog("Added Customer", newCustomer.name, newCustomer.phone);
      return newCustomer;
    },
    [addActivityLog]
  );

  const updateCustomer = useCallback(
    (id: string, updates: Partial<AdminCustomer>) => {
      setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
      addActivityLog("Updated Customer", id);
    },
    [addActivityLog]
  );

  const deleteCustomer = useCallback(
    (id: string) => {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      addActivityLog("Deleted Customer", id);
    },
    [addActivityLog]
  );

  // DISCOUNT ACTIONS
  const addDiscount = useCallback(
    (input: Omit<AdminDiscount, "id" | "usageCount">): AdminDiscount => {
      const id = `disc-${Date.now()}`;
      const newDiscount: AdminDiscount = {
        ...input,
        id,
        code: input.code.toUpperCase().trim(),
        usageCount: 0,
      };
      setDiscounts((prev) => [newDiscount, ...prev]);
      addActivityLog("Created Coupon", newDiscount.code, `Value: ${newDiscount.value}`);
      return newDiscount;
    },
    [addActivityLog]
  );

  const toggleDiscount = useCallback((id: string) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: d.status === "active" ? "expired" : "active" } : d))
    );
  }, []);

  const deleteDiscount = useCallback(
    (id: string) => {
      setDiscounts((prev) => prev.filter((d) => d.id !== id));
      addActivityLog("Deleted Coupon", id);
    },
    [addActivityLog]
  );

  // CATEGORIES ACTIONS
  const addCategory = useCallback(
    (cat: Omit<AdminCategory, "id">): AdminCategory => {
      const id = `cat-${Date.now()}`;
      const newCat: AdminCategory = { ...cat, id };
      setCategories((prev) => [newCat, ...prev]);
      addActivityLog("Created Category", newCat.title);
      return newCat;
    },
    [addActivityLog]
  );

  const updateCategory = useCallback(
    (id: string, updates: Partial<AdminCategory>) => {
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
      addActivityLog("Updated Category", id);
    },
    [addActivityLog]
  );

  const deleteCategory = useCallback(
    (id: string) => {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      addActivityLog("Deleted Category", id);
    },
    [addActivityLog]
  );

  // COLLECTIONS ACTIONS
  const addCollection = useCallback(
    (col: Omit<AdminCollection, "id">): AdminCollection => {
      const id = `col-${Date.now()}`;
      const newCol: AdminCollection = { ...col, id };
      setCollections((prev) => [newCol, ...prev]);
      addActivityLog("Created Collection", newCol.title);
      return newCol;
    },
    [addActivityLog]
  );

  const updateCollection = useCallback(
    (id: string, updates: Partial<AdminCollection>) => {
      setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
      addActivityLog("Updated Collection", id);
    },
    [addActivityLog]
  );

  const deleteCollection = useCallback(
    (id: string) => {
      setCollections((prev) => prev.filter((c) => c.id !== id));
      addActivityLog("Deleted Collection", id);
    },
    [addActivityLog]
  );

  // BRANDS ACTIONS
  const addBrand = useCallback(
    (brand: Omit<AdminBrand, "id">): AdminBrand => {
      const id = `br-${Date.now()}`;
      const newBrand: AdminBrand = { ...brand, id };
      setBrands((prev) => [newBrand, ...prev]);
      addActivityLog("Created Brand", newBrand.name);
      return newBrand;
    },
    [addActivityLog]
  );

  const updateBrand = useCallback(
    (id: string, updates: Partial<AdminBrand>) => {
      setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
      addActivityLog("Updated Brand", id);
    },
    [addActivityLog]
  );

  const deleteBrand = useCallback(
    (id: string) => {
      setBrands((prev) => prev.filter((b) => b.id !== id));
      addActivityLog("Deleted Brand", id);
    },
    [addActivityLog]
  );

  // PRE-ORDERS ACTIONS
  const addPreOrder = useCallback(
    (po: Omit<AdminPreOrder, "id">): AdminPreOrder => {
      const id = `po-${Date.now()}`;
      const newPO: AdminPreOrder = { ...po, id };
      setPreOrders((prev) => [newPO, ...prev]);
      addActivityLog("Created Pre-Order Campaign", newPO.productName);
      return newPO;
    },
    [addActivityLog]
  );

  const updatePreOrder = useCallback(
    (id: string, updates: Partial<AdminPreOrder>) => {
      setPreOrders((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
      addActivityLog("Updated Pre-Order", id);
    },
    [addActivityLog]
  );

  const deletePreOrder = useCallback(
    (id: string) => {
      setPreOrders((prev) => prev.filter((p) => p.id !== id));
      addActivityLog("Deleted Pre-Order", id);
    },
    [addActivityLog]
  );

  // BANNERS ACTIONS
  const addBanner = useCallback(
    (banner: Omit<AdminBanner, "id">): AdminBanner => {
      const id = `ban-${Date.now()}`;
      const newBanner: AdminBanner = { ...banner, id };
      setBanners((prev) => [newBanner, ...prev]);
      addActivityLog("Created Banner", newBanner.title);
      return newBanner;
    },
    [addActivityLog]
  );

  const updateBanner = useCallback(
    (id: string, updates: Partial<AdminBanner>) => {
      setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
      addActivityLog("Updated Banner", id);
    },
    [addActivityLog]
  );

  const deleteBanner = useCallback(
    (id: string) => {
      setBanners((prev) => prev.filter((b) => b.id !== id));
      addActivityLog("Deleted Banner", id);
    },
    [addActivityLog]
  );

  // PAGE META ACTIONS
  const updatePageMeta = useCallback(
    (id: string, updates: Partial<AdminPageMeta>) => {
      setPageMetas((prev) =>
        prev.map((pm) =>
          pm.id === id
            ? { ...pm, ...updates, lastUpdated: new Date().toISOString().slice(0, 10) }
            : pm
        )
      );
      addActivityLog("Updated Page SEO/Content", id);
    },
    [addActivityLog]
  );

  // REVIEWS ACTIONS
  const updateReviewStatus = useCallback(
    (id: string, status: AdminReview["status"]) => {
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      addActivityLog("Moderated Review", id, `Status: ${status}`);
    },
    [addActivityLog]
  );

  const replyReview = useCallback(
    (id: string, reply: string) => {
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, adminReply: reply } : r)));
      addActivityLog("Replied to Review", id);
    },
    [addActivityLog]
  );

  const deleteReview = useCallback(
    (id: string) => {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      addActivityLog("Deleted Review", id);
    },
    [addActivityLog]
  );

  // FAQS ACTIONS
  const addFaq = useCallback(
    (faq: Omit<AdminFaq, "id">): AdminFaq => {
      const id = `faq-${Date.now()}`;
      const newFaq: AdminFaq = { ...faq, id };
      setFaqs((prev) => [newFaq, ...prev]);
      addActivityLog("Created FAQ", newFaq.question);
      return newFaq;
    },
    [addActivityLog]
  );

  const updateFaq = useCallback(
    (id: string, updates: Partial<AdminFaq>) => {
      setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
      addActivityLog("Updated FAQ", id);
    },
    [addActivityLog]
  );

  const deleteFaq = useCallback(
    (id: string) => {
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      addActivityLog("Deleted FAQ", id);
    },
    [addActivityLog]
  );

  // MERCHANDISING & SETTINGS
  const updateMerchandising = useCallback(
    (updates: Partial<AdminMerchandising>) => {
      setMerchandising((prev) => ({ ...prev, ...updates }));
      addActivityLog("Updated Merchandising", "Banners & Tickers");
    },
    [addActivityLog]
  );

  const updateSettings = useCallback(
    (updates: Partial<AdminSettings>) => {
      setSettings((prev) => ({ ...prev, ...updates }));
      addActivityLog("Updated Settings", "Logistics & Payments");
    },
    [addActivityLog]
  );

  // NOTIFICATIONS
  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // FACTORY RESET
  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProducts(generateInitialProducts());
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setDiscounts(INITIAL_DISCOUNTS);
    setCategories(INITIAL_CATEGORIES);
    setCollections(INITIAL_COLLECTIONS);
    setBrands(INITIAL_BRANDS);
    setPreOrders(INITIAL_PREORDERS);
    setBanners(INITIAL_BANNERS);
    setPageMetas(INITIAL_PAGE_METAS);
    setReviews(INITIAL_REVIEWS);
    setFaqs(INITIAL_FAQS);
    setMerchandising(INITIAL_MERCHANDISING);
    setSettings(INITIAL_SETTINGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActivityLogs(INITIAL_LOGS);
    addActivityLog("Factory Reset", "Restored complete store demo dataset");
  }, [addActivityLog]);

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <AdminContext.Provider
      value={{
        products,
        orders,
        customers,
        discounts,
        categories,
        collections,
        brands,
        preOrders,
        banners,
        pageMetas,
        reviews,
        faqs,
        merchandising,
        settings,
        notifications,
        activityLogs,
        unreadNotifCount,

        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        bulkUpdateProducts,
        bulkDeleteProducts,
        adjustStock,

        addOrder,
        updateOrderStatus,
        updateOrderPayment,
        assignCourier,
        addOrderNote,
        deleteOrder,

        addCustomer,
        updateCustomer,
        deleteCustomer,

        addDiscount,
        toggleDiscount,
        deleteDiscount,

        addCategory,
        updateCategory,
        deleteCategory,

        addCollection,
        updateCollection,
        deleteCollection,

        addBrand,
        updateBrand,
        deleteBrand,

        addPreOrder,
        updatePreOrder,
        deletePreOrder,

        addBanner,
        updateBanner,
        deleteBanner,

        updatePageMeta,

        updateReviewStatus,
        replyReview,
        deleteReview,

        addFaq,
        updateFaq,
        deleteFaq,

        updateMerchandising,
        updateSettings,

        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,

        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
