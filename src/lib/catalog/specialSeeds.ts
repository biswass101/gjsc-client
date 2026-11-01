import i1 from "@/assets/new_products_images/i1.jpg";
import i2 from "@/assets/new_products_images/i2.jpg";
import i3 from "@/assets/new_products_images/i3.jpg";
import i4 from "@/assets/new_products_images/i4.jpg";
import i5 from "@/assets/new_products_images/i5.jpg";
import i6 from "@/assets/new_products_images/i6.jpg";
import i7 from "@/assets/new_products_images/i7.jpg";
import i8 from "@/assets/new_products_images/i8.jpg";
import i9 from "@/assets/new_products_images/i9.jpg";
import i10 from "@/assets/new_products_images/i10.jpg";
import i11 from "@/assets/new_products_images/i11.jpg";
import i12 from "@/assets/new_products_images/i12.jpg";
import type { DemoSeed } from "./seeds";

export const PRE_ORDER_SEEDS: DemoSeed[] = [
  {
    name: "Shiseido Ultimune Concentrate",
    brand: "Shiseido",
    category: "Serum",
    price: 9500,
    compareAt: 11200,
    image: i1.src,
    type: "pre-order-japan",
    rating: 4.8,
    reviews: 142,
    short: "Imuno-boosting serum for resilient, radiant skin.",
  },
  {
    name: "SK-II Facial Treatment Essence",
    brand: "SK-II",
    category: "Essence",
    price: 14500,
    image: i2.src,
    type: "pre-order-japan",
    rating: 4.9,
    reviews: 210,
    short: "The cult Pitera essence for crystal-clear skin.",
  },
  {
    name: "Hada Labo Gokujyun Lotion",
    brand: "Hada Labo",
    category: "Toner",
    price: 2350,
    compareAt: 2700,
    image: i3.src,
    type: "pre-order-japan",
    rating: 4.7,
    reviews: 98,
    short: "Triple hyaluronic acid for deep, weightless hydration.",
  },
  {
    name: "Kose Clear Turn Brightening Mask",
    brand: "Kose",
    category: "Face Mask",
    price: 1650,
    image: i4.src,
    type: "pre-order-japan",
    rating: 4.5,
    reviews: 64,
    short: "Sheet mask drenched in brightening essence.",
  },
  {
    name: "DHC Deep Cleansing Oil",
    brand: "DHC",
    category: "Cleanser",
    price: 3200,
    image: i5.src,
    type: "pre-order-japan",
    rating: 4.8,
    reviews: 176,
    short: "Olive-oil cleansing that dissolves makeup effortlessly.",
  },
  {
    name: "Biore UV Aqua Rich Watery Essence",
    brand: "Biore",
    category: "Sunscreen",
    price: 2450,
    compareAt: 2900,
    image: i6.src,
    type: "pre-order-japan",
    rating: 4.7,
    reviews: 188,
    short: "Weightless SPF50+ PA++++ daily protection.",
  },
];

export const SHEIN_SEEDS: DemoSeed[] = [
  {
    name: "SHEIN Glow Cushion Foundation",
    brand: "SHEIN",
    category: "Makeup",
    price: 1850,
    compareAt: 2400,
    image: i7.src,
    type: "shein",
    rating: 4.3,
    reviews: 74,
    short: "Dewy cushion base for a luminous, second-skin finish.",
    sizes: ["01 Porcelain", "02 Natural", "03 Honey"],
  },
  {
    name: "SHEIN Matte Liquid Lipstick",
    brand: "SHEIN",
    category: "Lip Care",
    price: 950,
    image: i8.src,
    type: "shein",
    rating: 4.4,
    reviews: 121,
    short: "Comfortable matte colour that lasts all day.",
    sizes: ["Rosewood", "Terracotta", "Berry"],
  },
  {
    name: "SHEIN Pearl Hair Claw Clip",
    brand: "SHEIN",
    category: "Beauty Accessories",
    price: 550,
    image: i9.src,
    type: "shein",
    rating: 4.6,
    reviews: 58,
    short: "Pearl-accented clip for an effortless updo.",
    sizes: ["Large"],
  },
  {
    name: "SHEIN Shimmer Body Glow Oil",
    brand: "SHEIN",
    category: "Body Care",
    price: 1250,
    image: i10.src,
    type: "shein",
    rating: 4.2,
    reviews: 47,
    short: "Lightweight oil for a soft, luminous glow.",
    sizes: ["50ml", "100ml"],
  },
  {
    name: "SHEIN Volumizing Lash Mascara",
    brand: "SHEIN",
    category: "Makeup",
    price: 780,
    compareAt: 990,
    image: i11.src,
    type: "shein",
    rating: 4.1,
    reviews: 63,
    short: "Buildable volume without clumps or flakes.",
    sizes: ["Black", "Brown"],
  },
  {
    name: "SHEIN Silk Scrunchie Trio",
    brand: "SHEIN",
    category: "Beauty Accessories",
    price: 650,
    image: i12.src,
    type: "shein",
    rating: 4.5,
    reviews: 39,
    short: "Gentle mulberry-silk scrunchies, set of three.",
    sizes: ["Set of 3"],
  },
];

