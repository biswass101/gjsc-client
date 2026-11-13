import { apiClient } from '../api-client';

export const systemApi = {
  getBanners(pageKey?: string): Promise<any[]> {
    return apiClient.get('/banners', pageKey ? { pageKey } : undefined);
  },

  getFaqs(category?: string): Promise<any[]> {
    return apiClient.get('/faqs', category ? { category } : undefined);
  },

  getSettings(): Promise<Record<string, any>> {
    return apiClient.get('/settings');
  },
};

