import { apiClient } from '../api-client';

export interface CheckoutPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  area: string;
  city: string;
  division: string;
  deliveryZone: 'dhaka_metro' | 'dhaka_suburbs' | 'outside_dhaka';
  paymentMethod: 'COD' | 'bKash' | 'Nagad' | 'Card';
  trxId?: string | undefined;
  couponCode?: string | undefined;
  notes?: string | undefined;
  items?: {
    slug: string;
    qty: number;
    size: string;
  }[] | undefined;
}

export interface CouponValidationResult {
  valid: boolean;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  discountAmount: number;
  newSubtotal: number;
  message: string;
}

export const ordersApi = {
  createOrder(payload: CheckoutPayload): Promise<any> {
    return apiClient.post('/orders', payload);
  },

  trackOrder(key: string): Promise<any> {
    return apiClient.get(`/orders/track/${encodeURIComponent(key)}`);
  },

  getMyOrders(): Promise<any[]> {
    return apiClient.get('/customer/orders');
  },

  getOrderById(id: number | string): Promise<any> {
    return apiClient.get(`/customer/orders/${encodeURIComponent(String(id))}`);
  },

  validateCoupon(code: string, subtotal: number): Promise<CouponValidationResult> {
    return apiClient.post('/discounts/validate', { code, subtotal });
  },
};
