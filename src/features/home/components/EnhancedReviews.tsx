"use client";

import { useState } from "react";
import { Link } from "@/lib/navigation";
import {
  CheckCircle2,
  Heart,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewItem {
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

const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Nusrat Ahmed",
    city: "Gulshan 2, Dhaka",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
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
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
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
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
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
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
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

export function EnhancedReviews() {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  const handleHelpful = (id: string, initialCount: number) => {
    if (voted[id]) return;
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
    setVoted((prev) => ({ ...prev, [id]: true }));
  };

  const filteredReviews =
    selectedTag === "all"
      ? REVIEWS
      : REVIEWS.filter((r) => r.tag === selectedTag);

  return (
    <section className="bg-cream/40 py-8 sm:py-12 lg:py-16 border-t border-border/40">
      <div className="container-lux space-y-6 sm:space-y-8">
        {/* Header & Trust Metrics Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-1.5 text-primary text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>COMMUNITY STORIES</span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Loved in Bangladesh
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
              Real results from verified customers using authentic Japanese skincare across Bangladesh.
            </p>
          </div>

          {/* Rating Summary Box: Fully responsive on mobile */}
          <div className="flex items-center gap-3.5 bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs self-stretch sm:self-start lg:self-auto">
            <div className="text-center pr-3.5 border-r border-border shrink-0">
              <span className="font-display text-2xl sm:text-4xl font-bold text-foreground block leading-none">
                4.9
              </span>
              <div className="flex items-center justify-center gap-0.5 mt-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="space-y-0.5 text-[10px] sm:text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">1,850+ Verified 5-Star Reviews</p>
              <div className="flex items-center gap-2.5 text-[10px]">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-3 w-3" /> 100% Genuine
                </span>
                <span className="flex items-center gap-1 text-primary font-medium">
                  <Truck className="h-3 w-3" /> 64 Districts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills: Horizontal scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          <span className="text-xs font-medium text-muted-foreground mr-1 shrink-0">Filter:</span>
          {[
            { id: "all", label: "All Reviews (1,850+)" },
            { id: "radiance", label: "Glass Skin & Radiance" },
            { id: "acne", label: "Acne & Pore Care" },
            { id: "sensitive", label: "Sensitive & Barrier" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedTag(tab.id)}
              className={cn(
                "rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-all whitespace-nowrap shrink-0",
                selectedTag === tab.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-background border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-3.5 sm:gap-6 md:grid-cols-2">
          {filteredReviews.map((rev) => {
            const currentHelpful = helpfulVotes[rev.id] ?? rev.helpfulCount;
            const hasVoted = voted[rev.id] ?? false;

            return (
              <div
                key={rev.id}
                className="flex flex-col justify-between rounded-md sm:rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-primary/40"
              >
                <div>
                  {/* Top: Reviewer Info & Rating */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover border border-border shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-semibold text-xs sm:text-sm text-foreground">
                            {rev.name}
                          </h4>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-1.5 py-0.2 text-[8px] sm:text-[9px] font-semibold text-emerald-600">
                              <CheckCircle2 className="h-2.5 w-2.5" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          {rev.city} · {rev.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Verified Purchased Product Pill */}
                  <div className="mt-3 inline-block">
                    <Link
                      to="/product/$slug"
                      params={{ slug: rev.productSlug }}
                      className="inline-flex items-center gap-1 rounded-lg bg-muted/60 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-medium text-foreground hover:bg-muted hover:text-primary transition-colors line-clamp-1"
                    >
                      <span className="text-muted-foreground">Purchased:</span>
                      <span className="font-semibold underline decoration-primary/40 underline-offset-2 truncate">
                        {rev.productName}
                      </span>
                    </Link>
                  </div>

                  {/* Headline & Body */}
                  <h3 className="mt-2 font-display text-xs sm:text-base font-bold leading-snug text-foreground">
                    "{rev.headline}"
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {rev.content}
                  </p>
                </div>

                {/* Bottom Helpful Button */}
                <div className="mt-3.5 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs">
                  <span className="text-[10px] sm:text-[11px] text-muted-foreground">
                    Helpful review?
                  </span>
                  <button
                    type="button"
                    onClick={() => handleHelpful(rev.id, rev.helpfulCount)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-medium transition-all active:scale-95",
                      hasVoted
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "bg-muted/50 border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    )}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span>{hasVoted ? "Thank you!" : `Helpful (${currentHelpful})`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
