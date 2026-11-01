import type { AdminPageMeta, AdminReview, AdminFaq } from "@/types";

export const INITIAL_PAGE_METAS: AdminPageMeta[] = [
  {
    id: "pm-1",
    route: "/",
    pageName: "Homepage",
    title: "Glorious Japan Skin Care | Authentic Japanese Skincare in Bangladesh",
    metaDescription:
      "100% authentic Japanese beauty imports in Bangladesh. Clinically proven Tokyo skincare, serums, moisturizers, and sunscreens with Cash on Delivery nationwide.",
    heroHeading: "Stay Glorious, Shine with Confidence",
    heroSubheading:
      "Authentic Tokyo skincare routines tailored for deep hydration, brightening, and radiant barrier care.",
    badgeText: "🌸 Tokyo Direct • Authenticity Guaranteed",
    lastUpdated: "2026-10-26",
  },
  {
    id: "pm-2",
    route: "/shop",
    pageName: "Catalog Shop",
    title: "Shop Authentic Japanese Skincare | Glorious Japan",
    metaDescription:
      "Explore our full catalog of 800+ authentic Japanese skincare products imported directly from Tokyo, Japan.",
    heroHeading: "Complete Japanese Beauty Sanctuary",
    heroSubheading:
      "Find your ideal skincare formulation matched by Japanese dermatological principles.",
    lastUpdated: "2026-10-26",
  },
  {
    id: "pm-3",
    route: "/pre-order",
    pageName: "Pre-Order Direct Japan",
    title: "Pre-Order Direct From Japan | Glorious Japan Skin Care",
    metaDescription:
      "Reserve rare, fresh-batch Japanese beauty formulas directly from certified Tokyo laboratories. 10-14 days guaranteed air-freight delivery to Bangladesh.",
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
    metaDescription:
      "Special seasonal discounts, Buy-1-Get-1 Tokyo deals, and discounted routine sets in Bangladesh.",
    heroHeading: "Seasonal Japanese Beauty Festival",
    heroSubheading:
      "Curated bundles with complimentary luxury samples and free delivery inside Dhaka.",
    lastUpdated: "2026-10-26",
  },
];

export const INITIAL_REVIEWS: AdminReview[] = [
  {
    id: "rev-1",
    productName: "Sakura Radiance Serum",
    productSlug: "sakura-radiance-serum",
    customerName: "Nusrat Jahan",
    rating: 5,
    date: "24 Oct 2026",
    comment:
      "This transformed my skin texture completely! Non-greasy, absorbs within seconds, and gives that coveted glass-skin dewy finish.",
    verified: true,
    status: "approved",
    adminReply:
      "Arigatou gozaimasu Nusrat! We are delighted the Sakura ferment is providing such radiant hydration for you! 🌸",
  },
  {
    id: "rev-2",
    productName: "Anessa Perfect UV Sunscreen Skincare Milk",
    productSlug: "anessa-perfect-uv-sunscreen",
    customerName: "Farhana Khatun",
    rating: 5,
    date: "20 Oct 2026",
    comment:
      "The holy grail sunscreen for Dhaka's hot weather! Zero white cast, water-resistant, and keeps my makeup matte all day.",
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
    comment:
      "My dry patches vanished within 3 days. 5 types of hyaluronic acid really make a noticeable difference.",
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

export const INITIAL_FAQS: AdminFaq[] = [
  {
    id: "faq-1",
    category: "Authenticity & Japan Sourcing",
    question: "How do I know that all products are 100% authentic from Japan?",
    answer:
      "Every single product is sourced directly from authorized brand laboratories and flagship department distributors in Ginza, Tokyo and Osaka. We do not source from gray markets or third-party wholesalers. Each package carries its original Japanese batch code and tamper-evident authentication seal.",
    order: 1,
    active: true,
  },
  {
    id: "faq-2",
    category: "Delivery & Shipping",
    question: "What are the courier delivery timelines and shipping fees across Bangladesh?",
    answer:
      "Inside Dhaka Metropolitan, deliveries arrive within 24 to 48 hours via Pathao Express rider (৳60 delivery charge, or FREE for orders over ৳3,000). For Chittagong, Sylhet, Rajshahi, and all other divisional districts, delivery takes 2 to 4 business days via Steadfast Courier (৳120 delivery charge).",
    order: 2,
    active: true,
  },
  {
    id: "faq-3",
    category: "Payments & bKash",
    question: "Which payment methods are accepted?",
    answer:
      "We accept Cash on Delivery (COD) nationwide across Bangladesh, direct bKash Merchant payment, Nagad MFS, and all Visa, Mastercard, and Amex credit/debit cards with instant verification.",
    order: 3,
    active: true,
  },
  {
    id: "faq-4",
    category: "Authenticity & Japan Sourcing",
    question: "How does the Japan Pre-Order air-freight service work?",
    answer:
      "Pre-order items are collected fresh from Tokyo flagships and flown to Dhaka via temperature-controlled air freight. Delivery takes 10 to 14 days with full SMS tracking and zero surprise customs charges.",
    order: 4,
    active: true,
  },
];
