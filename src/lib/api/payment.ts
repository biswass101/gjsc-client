import { apiClient } from '../api-client';

export interface InitiateBkashResponse {
  paymentId: number;
  paymentID: string;
  bkashURL: string;
  expiresAt: string;
}

export interface PaymentDetails {
  id: number;
  orderId: number;
  gateway: 'bKash' | 'Nagad' | 'Card' | 'COD';
  currency: string;
  expectedAmount: number;
  capturedAmount: number;
  refundedAmount: number;
  status:
    | 'INITIALIZED'
    | 'PROCESSING'
    | 'COMPLETED'
    | 'FAILED'
    | 'CANCELLED'
    | 'REFUNDED'
    | 'PARTIALLY_REFUNDED';
  gatewayTrxId?: string;
  customerPhone?: string;
  createdAt: string;
  updatedAt: string;
  attempts?: Array<{
    id: number;
    attemptNumber: number;
    status: string;
    gatewayPaymentId?: string;
    createdAt: string;
  }>;
  refunds?: Array<{
    id: number;
    amount: number;
    reason: string;
    status: string;
    refundTrxId?: string;
    createdAt: string;
  }>;
}

export const paymentApi = {
  /**
   * Initiates a bKash Tokenized Checkout session.
   * Redirects customer to bkashURL upon success.
   */
  async initiateBkash(
    orderId: number,
    paymentAccessToken?: string
  ): Promise<InitiateBkashResponse> {
    return apiClient.post('/payments/bkash/initiate', {
      orderId,
      paymentAccessToken,
    });
  },

  /**
   * Fetches payment record and gateway transaction status for an order.
   */
  async getPaymentByOrder(orderId: number, token?: string): Promise<PaymentDetails> {
    const url = token
      ? `/payments/order/${encodeURIComponent(String(orderId))}?token=${encodeURIComponent(token)}`
      : `/payments/order/${encodeURIComponent(String(orderId))}`;
    return apiClient.get(url);
  },

  /**
   * Admin: Queries bKash and reconciles a payment.
   */
  async reconcilePayment(paymentId: number): Promise<any> {
    return apiClient.post(`/admin/payments/${encodeURIComponent(String(paymentId))}/reconcile`, {});
  },

  /**
   * Admin: Refunds a captured payment via bKash.
   */
  async refundPayment(paymentId: number, amount: number, reason: string): Promise<any> {
    return apiClient.post(`/admin/payments/${encodeURIComponent(String(paymentId))}/refund`, {
      amount,
      reason,
    });
  },

  /**
   * Admin: Runs background reconciliation sweep.
   */
  async runReconciliationSweep(): Promise<any> {
    return apiClient.post('/admin/payments/reconcile-sweep', {});
  },
};

