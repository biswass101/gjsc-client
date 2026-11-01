import type { UserReview } from "../types";

export const INITIAL_REVIEWS: UserReview[] = [
  {
    id: "rev-1",
    name: "Sadia H.",
    rating: 5,
    date: "3 days ago",
    verified: true,
    skinType: "Combination / Sensitive",
    title: "Crystal-clear skin in just one week!",
    comment:
      "Absorbs beautifully with zero stickiness. The subtle natural scent is so calming. My skin barrier feels nourished and radiant even under Dhaka humidity.",
    helpfulCount: 14,
    replies: [
      {
        id: "rep-1",
        name: "Glorious Japan Beauty Expert",
        role: "brand",
        date: "2 days ago",
        comment:
          "Arigato gozaimasu, Sadia! To maximize morning radiance, we recommend pressing 2–3 drops into damp skin immediately following your hydrating lotion or essence.",
      },
      {
        id: "rep-2",
        name: "Farhana K.",
        role: "verified",
        date: "1 day ago",
        comment:
          "Did you notice quick brightening on acne spots? Thinking about ordering a bottle today!",
      },
    ],
  },
  {
    id: "rev-2",
    name: "Farhana Karim",
    rating: 5,
    date: "1 week ago",
    verified: true,
    skinType: "Dry Skin",
    title: "100% authentic Japanese import",
    comment:
      "Arrived in pristine packaging with authentic Tokyo batch codes. Far superior to anything I previously purchased from local shops. Worth every single taka.",
    helpfulCount: 9,
    replies: [
      {
        id: "rep-3",
        name: "Aesthetician Support",
        role: "brand",
        date: "5 days ago",
        comment:
          "Thank you Farhana! All our bottles are directly imported from Tokyo and stored in climate-controlled facilities so the live fermented actives remain at peak potency.",
      },
    ],
  },
  {
    id: "rev-3",
    name: "Nusrat Ahmed",
    rating: 4,
    date: "2 weeks ago",
    verified: true,
    skinType: "Normal",
    title: "Exceptional texture and layering",
    comment:
      "Layers flawlessly underneath my moisturizer and Japanese SPF. Does not pill or cause congestion. Truly a luxury staple in my morning ritual.",
    helpfulCount: 6,
    replies: [],
  },
];

