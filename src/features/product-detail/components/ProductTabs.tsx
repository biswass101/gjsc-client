"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/types";
import type { UserReview } from "../types";
import { ProductRitualTab } from "./tabs/ProductRitualTab";
import { ProductIngredientsTab } from "./tabs/ProductIngredientsTab";
import { ProductReviewsTab } from "./tabs/ProductReviewsTab";
import { ProductShippingTab } from "./tabs/ProductShippingTab";

interface ProductTabsProps {
  product: Product;
  reviewsList: UserReview[];
  helpfulClicked: Record<string, boolean>;
  replyingToId: string | null;
  replyName: string;
  setReplyName: (v: string) => void;
  replyText: string;
  setReplyText: (v: string) => void;
  expandedReplies: Record<string, boolean>;
  onOpenReviewModal: () => void;
  onHelpfulClick: (reviewId: string) => void;
  onStartReply: (reviewId: string) => void;
  onCancelReply: () => void;
  onSubmitReply: (reviewId: string) => void;
  onToggleReplies: (reviewId: string) => void;
}

export function ProductTabs({
  product,
  reviewsList,
  helpfulClicked,
  replyingToId,
  replyName,
  setReplyName,
  replyText,
  setReplyText,
  expandedReplies,
  onOpenReviewModal,
  onHelpfulClick,
  onStartReply,
  onCancelReply,
  onSubmitReply,
  onToggleReplies,
}: ProductTabsProps) {
  return (
    <section id="reviews-section" className="container-lux pb-16">
      <Tabs defaultValue="ritual" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto rounded-full border border-border/60 bg-secondary/40 p-1">
          <TabsTrigger
            value="ritual"
            className="rounded-full px-5 py-2 text-xs font-medium cursor-pointer"
          >
            The Layering Ritual
          </TabsTrigger>
          <TabsTrigger
            value="ingredients"
            className="rounded-full px-5 py-2 text-xs font-medium cursor-pointer"
          >
            Hero Botanicals & INCI
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-full px-5 py-2 text-xs font-medium cursor-pointer"
          >
            Verified Reviews ({reviewsList.length})
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="rounded-full px-5 py-2 text-xs font-medium cursor-pointer"
          >
            Shipping & Authenticity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ritual" className="mt-8">
          <ProductRitualTab product={product} />
        </TabsContent>

        <TabsContent value="ingredients" className="mt-8">
          <ProductIngredientsTab product={product} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-8">
          <ProductReviewsTab
            product={product}
            reviewsList={reviewsList}
            helpfulClicked={helpfulClicked}
            replyingToId={replyingToId}
            replyName={replyName}
            setReplyName={setReplyName}
            replyText={replyText}
            setReplyText={setReplyText}
            expandedReplies={expandedReplies}
            onOpenReviewModal={onOpenReviewModal}
            onHelpfulClick={onHelpfulClick}
            onStartReply={onStartReply}
            onCancelReply={onCancelReply}
            onSubmitReply={onSubmitReply}
            onToggleReplies={onToggleReplies}
          />
        </TabsContent>

        <TabsContent value="shipping" className="mt-8">
          <ProductShippingTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
