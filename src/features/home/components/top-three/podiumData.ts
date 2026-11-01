import p1Img from "@/assets/new_products_images/i1.jpg";
import p2Img from "@/assets/new_products_images/i3.jpg";
import p3Img from "@/assets/new_products_images/i5.jpg";

export interface PodiumProduct {
  rank: 1 | 2 | 3;
  name: string;
  slug: string;
  brand: string;
  award: string;
  accolade: string;
  rating: number;
  reviews: number;
  price: number;
  compareAt?: number;
  image: string;
  volume: string;
  quote: string;
  features: string[];
}

export const PODIUM: PodiumProduct[] = [
  {
    rank: 2,
    name: "Koji Ferment Moisture Cream",
    slug: "koji-ferment-cream",
    brand: "Kyoto Botanicals",
    award: "Best Barrier Moisturizer 2026",
    accolade: "Silver Medal",
    rating: 4.8,
    reviews: 245,
    price: 5600,
    compareAt: 6900,
    image: p2Img.src,
    volume: "50g",
    features: [
      "Traditional sake koji ferment extract",
      "72-hour deep moisture barrier repair",
    ],
    quote: "Deep hydration that melts in weightlessly.",
  },
  {
    rank: 1,
    name: "Sakura Radiance Serum",
    slug: "sakura-radiance-serum",
    brand: "Glorious Japan",
    award: "Cult Favorite Skincare Hero",
    accolade: "Grand Gold Winner",
    rating: 4.9,
    reviews: 380,
    price: 4850,
    compareAt: 5900,
    image: p1Img.src,
    volume: "50ml",
    features: [
      "Bio-engineered cherry blossom actives",
      "Transformative luminous glass-skin glow",
      "Triple hyaluronic acid & niacinamide",
    ],
    quote: "Chosen by 2,500+ women for glass skin.",
  },
  {
    rank: 3,
    name: "Silk Rice Gentle Cleanser",
    slug: "silk-rice-cleanser",
    brand: "Hikari Beauty",
    award: "Best Gentle Daily Wash 2026",
    accolade: "Bronze Medal",
    rating: 4.8,
    reviews: 310,
    price: 1990,
    image: p3Img.src,
    volume: "150ml",
    features: [
      "Low-pH micro-dense amino acid foam",
      "100% Japanese rice water nutrients",
    ],
    quote: "Cloud-like foam with zero barrier tightness.",
  },
];

