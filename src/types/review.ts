/**
 * Product Review & Feedback Types for Glorious Japan Skin Care Platform
 */

export interface ReviewReply {
  id: string;
  name: string;
  role?: "customer" | "brand" | "verified";
  date: string;
  comment: string;
}

export interface UserReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  verified: boolean;
  skinType?: string;
  title: string;
  comment: string;
  helpfulCount: number;
  replies?: ReviewReply[];
}

