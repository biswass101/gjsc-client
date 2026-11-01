import { PRODUCTS } from "@/lib/catalog";
import type { SavedAddress, BuyerOrder, PresetAvatar } from "../types";

export const INITIAL_ORDERS: BuyerOrder[] = [
  {
    id: "GJ-2026-4821",
    date: "24 Oct 2026",
    status: "In Transit",
    total: 8740,
    paymentMethod: "Cash on Delivery (COD)",
    courier: "Pathao Express",
    consignmentId: "PT-DH-9482104",
    items: [
      {
        slug: PRODUCTS[0]?.slug || "sakura-radiance-serum",
        name: PRODUCTS[0]?.name || "Sakura Radiance Serum",
        brand: PRODUCTS[0]?.brand || "Sakura Lab",
        size: "50ml",
        qty: 1,
        price: PRODUCTS[0]?.price || 4850,
        image: PRODUCTS[0]?.image || "",
      },
      {
        slug: PRODUCTS[3]?.slug || "koji-ferment-cream",
        name: PRODUCTS[3]?.name || "Koji Ferment Cream",
        brand: PRODUCTS[3]?.brand || "Kyoto Botanicals",
        size: "50ml",
        qty: 1,
        price: PRODUCTS[3]?.price || 5600,
        image: PRODUCTS[3]?.image || "",
      },
    ],
  },
  {
    id: "GJ-2026-3192",
    date: "12 Oct 2026",
    status: "Delivered",
    total: 3950,
    paymentMethod: "bKash Mobile Payment",
    courier: "Steadfast Courier",
    consignmentId: "SF-DHK-48201",
    items: [
      {
        slug: PRODUCTS[1]?.slug || "yuzu-glow-essence",
        name: PRODUCTS[1]?.name || "Yuzu Glow Essence",
        brand: PRODUCTS[1]?.brand || "Yuzu No Mori",
        size: "100ml",
        qty: 1,
        price: PRODUCTS[1]?.price || 3950,
        image: PRODUCTS[1]?.image || "",
      },
    ],
  },
  {
    id: "GJ-2026-1804",
    date: "28 Sep 2026",
    status: "Delivered",
    total: 2890,
    paymentMethod: "Cash on Delivery",
    courier: "Pathao Express",
    consignmentId: "PT-DHK-18290",
    items: [
      {
        slug: PRODUCTS[5]?.slug || "hikari-uv-shield-spf50",
        name: PRODUCTS[5]?.name || "Hikari UV Shield SPF50",
        brand: PRODUCTS[5]?.brand || "Hikari Beauty",
        size: "50ml",
        qty: 1,
        price: PRODUCTS[5]?.price || 2890,
        image: PRODUCTS[5]?.image || "",
      },
    ],
  },
];

export const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    isDefault: true,
    name: "Nusrat Jahan",
    phone: "01712-849201",
    division: "Dhaka",
    city: "Dhaka",
    area: "Dhanmondi",
    street: "House 42, Road 9/A, Flat 4-B",
  },
  {
    id: "addr-2",
    label: "Office",
    isDefault: false,
    name: "Nusrat Jahan",
    phone: "01712-849201",
    division: "Dhaka",
    city: "Dhaka",
    area: "Gulshan 1",
    street: "Level 6, Bay's Galleria, 57 Gulshan Avenue",
  },
];

export const PRESET_AVATARS: PresetAvatar[] = [
  {
    id: "sakura",
    label: "Sakura Radiance",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "matcha",
    label: "Kyoto Calm",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dewy",
    label: "Dewy Glow",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "zen",
    label: "Tokyo Zen",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
];

export const AVAILABLE_SKIN_TYPES = ["Dry", "Oily", "Combination", "Sensitive", "Normal"];

export const AVAILABLE_SKIN_CONCERNS = [
  "Hydration",
  "Brightening",
  "Acne & Blemishes",
  "Pore Minimizing",
  "Barrier Repair",
  "Anti-Aging",
  "Dark Spots & Hyperpigmentation",
  "Sun Protection",
];

