import f1Img from "@/assets/new_products_images/i6.jpg";
import f2Img from "@/assets/new_products_images/i10.jpg";
import f3Img from "@/assets/new_products_images/i4.jpg";
import f4Img from "@/assets/new_products_images/i14.jpg";

export interface FlashItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  compareAt: number;
  discount: number;
  stockLeft: number;
  claimedPercent: number;
  rating: number;
  image: string;
}

export const FLASH_ITEMS: FlashItem[] = [
  {
    id: "flash-1",
    slug: "hikari-uv-shield-spf50",
    name: "Hikari UV Shield SPF50+ PA++++",
    brand: "Hikari Beauty",
    price: 2890,
    compareAt: 3600,
    discount: 20,
    stockLeft: 4,
    claimedPercent: 82,
    rating: 4.8,
    image: f1Img.src,
  },
  {
    id: "flash-2",
    slug: "gold-infusion-face-mask",
    name: "Gold Infusion Revitalizing Mask",
    brand: "Glorious Japan",
    price: 1290,
    compareAt: 1750,
    discount: 26,
    stockLeft: 3,
    claimedPercent: 88,
    rating: 4.7,
    image: f2Img.src,
  },
  {
    id: "flash-3",
    slug: "pearl-bright-eye-cream",
    name: "Pearl Bright Caffeine Eye Cream",
    brand: "Kyoto Botanicals",
    price: 3290,
    compareAt: 4200,
    discount: 22,
    stockLeft: 6,
    claimedPercent: 74,
    rating: 4.9,
    image: f3Img.src,
  },
  {
    id: "flash-4",
    slug: "aurora-barrier-serum",
    name: "Aurora Barrier Repair Serum (50ml)",
    brand: "Glorious Japan",
    price: 5250,
    compareAt: 6800,
    discount: 23,
    stockLeft: 2,
    claimedPercent: 92,
    rating: 4.9,
    image: f4Img.src,
  },
];

