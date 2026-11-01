import { Truck, ShieldCheck, CheckCircle2, Headphones } from "lucide-react";

export const TRUST_PERKS = [
  {
    icon: Truck,
    title: "Free Nationwide Delivery",
    desc: "Complimentary shipping on orders above ৳5,000 across all 64 districts.",
  },
  {
    icon: ShieldCheck,
    title: "100% Tokyo Authentic",
    desc: "Imported directly from certified Japanese laboratories with batch seals.",
  },
  {
    icon: CheckCircle2,
    title: "Cash On Delivery (COD)",
    desc: "Safe doorstep inspection and payment anywhere in Bangladesh.",
  },
  {
    icon: Headphones,
    title: "Skincare Advisory",
    desc: "Personalized routine consultation via WhatsApp daily from 10 AM – 10 PM.",
  },
];

export const SHOP_LINKS = [
  { label: "Cleansers & Face Wash", to: "/shop", search: { category: "Cleanser" } },
  { label: "Hydrating Essences & Toners", to: "/shop", search: { category: "Essence" } },
  { label: "Ferment Active Serums", to: "/shop", search: { category: "Serum" } },
  { label: "Barrier Moisture Creams", to: "/shop", search: { category: "Moisturizer" } },
  { label: "Japanese Sunscreens SPF50+", to: "/shop", search: { category: "Sunscreen" } },
  { label: "Curated Routine Bundles", to: "/shop", search: { category: "Gift Sets" } },
];

export const CONCERN_LINKS = [
  { label: "Glass Skin & Radiance", to: "/shop", search: { concern: "Brightening" } },
  { label: "Acne & Pore Clarifying", to: "/shop", search: { concern: "Acne" } },
  { label: "Deep Hyaluronic Hydration", to: "/shop", search: { concern: "Hydration" } },
  { label: "Sensitive & Barrier Repair", to: "/shop", search: { skinType: "Sensitive" } },
  { label: "Anti-Aging & Firming", to: "/shop", search: { concern: "Anti Aging" } },
  { label: "Pre-Order from Tokyo", to: "/shop", search: { type: "pre-order-japan" } },
];

export const CARE_LINKS = [
  { label: "Track Your Order", to: "/track" },
  { label: "Frequently Asked Questions", to: "/faq" },
  { label: "Authenticity Guarantee", to: "/about" },
  { label: "Contact Us & Advisory", to: "/contact" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
];

