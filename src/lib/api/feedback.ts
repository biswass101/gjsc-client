import { apiClient } from '../api-client';

export interface SubmitReviewPayload {
  productId?: number | undefined;
  productSlug?: string | undefined;
  name: string;
  email?: string | undefined;
  rating: number;
  title: string;
  comment: string;
  skinType?: string | undefined;
  images?: string[] | undefined;
}

export const feedbackApi = {
  getProductReviews(slug: string): Promise<any> {
    return apiClient.get(`/products/${slug}/reviews`);
  },

  submitReview(payload: SubmitReviewPayload): Promise<any> {
    return apiClient.post('/reviews', payload);
  },

  voteHelpful(reviewId: number): Promise<{ helpfulCount: number }> {
    return apiClient.post(`/reviews/${reviewId}/helpful`);
  },

  replyReview(reviewId: number, comment: string, name?: string): Promise<any> {
    return apiClient.post(`/reviews/${reviewId}/replies`, { comment, name });
  },

  getVideos(): Promise<any[]> {
    return apiClient.get('/videos');
  },
};
