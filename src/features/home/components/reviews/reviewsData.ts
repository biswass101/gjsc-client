export interface ReviewItem {
  id: string;
  name: string;
  city: string;
  avatar: string;
  rating: number;
  date: string;
  verified: boolean;
  productName: string;
  productSlug: string;
  headline: string;
  content: string;
  helpfulCount: number;
  tag: "radiance" | "acne" | "sensitive" | "all";
}

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Nusrat Ahmed",
    city: "Gulshan 2, Dhaka",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    date: "3 days ago",
    verified: true,
    productName: "Sakura Radiance Serum (50ml)",
    productSlug: "sakura-radiance-serum",
    headline: "My skin tone is visibly brighter and dry patches are gone!",
    content:
      "I was skeptical because many serums feel sticky in Dhaka's humidity, but this Japanese formula absorbs within seconds. After two weeks my stubborn post-acne marks started fading and my skin has that natural dewy glass finish without looking oily. The packaging arrived sealed and pristine with COD.",
    helpfulCount: 42,
    tag: "radiance",
  },
  {
    id: "rev-2",
    name: "Farhana Karim",
    city: "Panchlaish, Chattogram",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    date: "1 week ago",
    verified: true,
    productName: "Silk Rice Gentle Cleanser",
    productSlug: "silk-rice-cleanser",
    headline: "Finally a cleanser that doesn't strip my sensitive skin",
    content:
      "Most cleansers leave my cheeks tight and red. The Silk Rice Cleanser creates the softest micro-foam I've ever experienced. It effortlessly removes daily sunscreen and grime while leaving my barrier plumped and calm. Verified authentic Tokyo batch number printed on the box.",
    helpfulCount: 31,
    tag: "sensitive",
  },
  {
    id: "rev-3",
    name: "Tasnim Rahman",
    city: "Kumarpara, Sylhet",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    productName: "Koji Ferment Moisture Cream",
    productSlug: "koji-ferment-cream",
    headline: "Holy grail moisturizer for combination skin",
    content:
      "The sake ferment in this cream is pure magic. It cushions my dry cheeks without causing breakouts on my T-zone. It sits beautifully under sunscreen and makeup. Express courier reached Sylhet in 48 hours. 10/10 recommend Glorious Japan!",
    helpfulCount: 27,
    tag: "radiance",
  },
  {
    id: "rev-4",
    name: "Raisa Mahbub",
    city: "Uttara, Dhaka",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    productName: "Matcha Clarifying Toner",
    productSlug: "matcha-clarifying-toner",
    headline: "Unclogged my pores and controlled afternoon oiliness",
    content:
      "I struggle with open pores and breakouts during summer. This toner calmed my active redness within 3 days. It doesn't sting at all, smells subtly of pure green tea, and keeps sebum in check the entire workday. Excellent customer service on WhatsApp too.",
    helpfulCount: 19,
    tag: "acne",
  },
];

