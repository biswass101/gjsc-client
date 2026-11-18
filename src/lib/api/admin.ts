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

  getPaymentSettings(): Promise<Record<string, any>> {
    return apiClient.get('/admin/settings/payment');
  },

  updatePaymentSettings(data: Record<string, any>): Promise<Record<string, any>> {
    return apiClient.put('/admin/settings/payment', data);
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

  // Orders & Customers
  getOrders(params?: Record<string, any>): Promise<any> {
    return apiClient.get('/admin/orders', params);
  },

  createOrder(orderData: any): Promise<any> {
    return apiClient.post('/admin/orders', orderData);
  },

  getCustomers(): Promise<any> {
    return apiClient.get('/admin/customers');
  },

  updateOrderStatus(id: number | string, statusData: any): Promise<any> {
    return apiClient.patch(`/admin/orders/${id}/status`, statusData);
  },

  assignCourier(id: number | string, courierData: any): Promise<any> {
    return apiClient.patch(`/admin/orders/${id}/courier`, courierData);
  },

  updateOrderPayment(id: number | string, paymentData: any): Promise<any> {
    return apiClient.patch(`/admin/orders/${id}/payment`, paymentData);
  },

  addOrderNote(id: number | string, note: string): Promise<any> {
    return apiClient.patch(`/admin/orders/${id}/notes`, { notes: note });
  },

  deleteOrder(id: number | string): Promise<any> {
    return apiClient.delete(`/admin/orders/${id}`);
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

  // Categories
  getCategories(): Promise<any[]> {
    return apiClient.get('/categories');
  },

  createCategory(data: any): Promise<any> {
    return apiClient.post('/admin/categories', data);
  },

  updateCategory(id: number | string, data: any): Promise<any> {
    return apiClient.patch(`/admin/categories/${id}`, data);
  },

  deleteCategory(id: number | string): Promise<any> {
    return apiClient.delete(`/admin/categories/${id}`);
  },

  // Collections
  getCollections(): Promise<any[]> {
    return apiClient.get('/collections');
  },

  createCollection(data: any): Promise<any> {
    return apiClient.post('/admin/collections', data);
  },

  updateCollection(id: number | string, data: any): Promise<any> {
    return apiClient.patch(`/admin/collections/${id}`, data);
  },

  deleteCollection(id: number | string): Promise<any> {
    return apiClient.delete(`/admin/collections/${id}`);
  },

  // Brands
  getBrands(): Promise<any[]> {
    return apiClient.get('/brands');
  },

  createBrand(data: any): Promise<any> {
    return apiClient.post('/admin/brands', data);
  },

  updateBrand(id: number | string, data: any): Promise<any> {
    return apiClient.patch(`/admin/brands/${id}`, data);
  },

  deleteBrand(id: number | string): Promise<any> {
    return apiClient.delete(`/admin/brands/${id}`);
  },

  // Pre-Orders
  getPreOrders(): Promise<any[]> {
    return apiClient.get('/pre-orders');
  },

  createPreOrder(data: any): Promise<any> {
    return apiClient.post('/admin/pre-orders', data);
  },

  updatePreOrder(id: number | string, data: any): Promise<any> {
    return apiClient.patch(`/admin/pre-orders/${id}`, data);
  },

  deletePreOrder(id: number | string): Promise<any> {
    return apiClient.delete(`/admin/pre-orders/${id}`);
  },

  // Banners
  getBanners(): Promise<any[]> {
    return apiClient.get('/admin/banners');
  },

  createBanner(data: any): Promise<any> {
    return apiClient.post('/admin/banners', data);
  },

  updateBanner(id: number | string, data: any): Promise<any> {
    return apiClient.patch(`/admin/banners/${id}`, data);
  },

  deleteBanner(id: number | string): Promise<any> {
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

  updateVideo(id: number | string, data: any): Promise<any> {
    return apiClient.patch(`/admin/videos/${id}`, data);
  },

  deleteVideo(id: number | string): Promise<any> {
    return apiClient.delete(`/admin/videos/${id}`);
  },

  uploadVideo(file: File): Promise<{
    url: string;
    publicId: string;
    duration?: string;
    format?: string;
    thumbnailUrl?: string;
    storage: string;
  }> {
    const formData = new FormData();
    formData.append('video', file);
    return apiClient.upload('/uploads/video', formData);
  },

  uploadImage(file: File): Promise<{
    url: string;
    publicId: string;
    storage: string;
  }> {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient.upload('/uploads/image', formData);
  },


  // System & Database Seeding
  seedDatabase(): Promise<{ message: string }> {
    return apiClient.post('/admin/seed', {});
  },
};

