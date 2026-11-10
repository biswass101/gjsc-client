import { apiClient } from '../api-client';

export const adminApi = {
  // Dashboard & Analytics
  getAnalytics(): Promise<any> {
    return apiClient.get('/admin/analytics');
  },

  getActivityLogs(): Promise<any[]> {
    return apiClient.get('/admin/activity-logs');
  },

  // Settings
  getSettings(): Promise<Record<string, any>> {
    return apiClient.get('/admin/settings');
  },

  updateSettings(data: Record<string, any>): Promise<Record<string, any>> {
    return apiClient.put('/admin/settings', data);
  },

  // Products
  getProducts(params?: Record<string, any>): Promise<any> {
    return apiClient.get('/admin/products', params);
  },

  createProduct(data: any): Promise<any> {
    return apiClient.post('/admin/products', data);
  },

  updateProduct(id: number | string, data: any): Promise<any> {
    return apiClient.patch(`/admin/products/${id}`, data);
  },

  deleteProduct(id: number | string): Promise<any> {
    return apiClient.delete(`/admin/products/${id}`);
  },

  // Orders
  getOrders(params?: Record<string, any>): Promise<any> {
    return apiClient.get('/admin/orders', params);
  },

  updateOrderStatus(id: number | string, statusData: any): Promise<any> {
    return apiClient.patch(`/admin/orders/${id}/status`, statusData);
  },

  assignCourier(id: number | string, courierData: any): Promise<any> {
    return apiClient.patch(`/admin/orders/${id}/courier`, courierData);
  },

  // Discounts
  getDiscounts(): Promise<any[]> {
    return apiClient.get('/admin/discounts');
  },

  createDiscount(data: any): Promise<any> {
    return apiClient.post('/admin/discounts', data);
  },

  updateDiscount(id: number, data: any): Promise<any> {
    return apiClient.patch(`/admin/discounts/${id}`, data);
  },

  deleteDiscount(id: number): Promise<any> {
    return apiClient.delete(`/admin/discounts/${id}`);
  },

  // Banners
  getBanners(): Promise<any[]> {
    return apiClient.get('/admin/banners');
  },

  createBanner(data: any): Promise<any> {
    return apiClient.post('/admin/banners', data);
  },

  updateBanner(id: number, data: any): Promise<any> {
    return apiClient.patch(`/admin/banners/${id}`, data);
  },

  deleteBanner(id: number): Promise<any> {
    return apiClient.delete(`/admin/banners/${id}`);
  },

  // FAQs
  getFaqs(): Promise<any[]> {
    return apiClient.get('/admin/faqs');
  },

  createFaq(data: any): Promise<any> {
    return apiClient.post('/admin/faqs', data);
  },

  updateFaq(id: number, data: any): Promise<any> {
    return apiClient.patch(`/admin/faqs/${id}`, data);
  },

  deleteFaq(id: number): Promise<any> {
    return apiClient.delete(`/admin/faqs/${id}`);
  },

  // Reviews
  getReviews(): Promise<any[]> {
    return apiClient.get('/admin/reviews');
  },

  moderateReview(id: number, data: any): Promise<any> {
    return apiClient.patch(`/admin/reviews/${id}`, data);
  },

  deleteReview(id: number): Promise<any> {
    return apiClient.delete(`/admin/reviews/${id}`);
  },

  // UGC Videos
  getVideos(): Promise<any[]> {
    return apiClient.get('/admin/videos');
  },

  createVideo(data: any): Promise<any> {
    return apiClient.post('/admin/videos', data);
  },

  updateVideo(id: number, data: any): Promise<any> {
    return apiClient.patch(`/admin/videos/${id}`, data);
  },

  deleteVideo(id: number): Promise<any> {
    return apiClient.delete(`/admin/videos/${id}`);
  },
};

