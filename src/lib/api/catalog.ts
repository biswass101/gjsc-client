import { apiClient } from '../api-client';
import type { Product } from '@/types';

export interface CatalogQuery {
  [key: string]: string | number | boolean | undefined | null;
  page?: number | undefined;
  limit?: number | undefined;
  search?: string | undefined;
  category?: string | undefined;
  brand?: string | undefined;
  collection?: string | undefined;
  skinType?: string | undefined;
  concern?: string | undefined;
  badge?: string | undefined;
  type?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  sortBy?: 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'bestseller' | undefined;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const catalogApi = {
  getProducts(params?: CatalogQuery): Promise<ProductsResponse> {
    return apiClient.get<ProductsResponse>('/products', params);
  },

  getProductBySlug(slug: string): Promise<{ product: Product; relatedProducts: Product[] }> {
    return apiClient.get<{ product: Product; relatedProducts: Product[] }>(`/products/${slug}`);
  },

  getBrands(): Promise<any[]> {
    return apiClient.get<any[]>('/brands');
  },

  getBrandBySlug(slug: string): Promise<any> {
    return apiClient.get<any>(`/brands/${slug}`);
  },

  getCategories(): Promise<any[]> {
    return apiClient.get<any[]>('/categories');
  },

  getCollections(): Promise<any[]> {
    return apiClient.get<any[]>('/collections');
  },

  getPreOrders(): Promise<any[]> {
    return apiClient.get<any[]>('/pre-orders');
  },
};
