export interface AdminSettings {
  storeName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  warehouseAddress: string;
  tokyoOfficeAddress: string;
  currency: string;
  insideDhakaRate: number;
  outsideDhakaRate: number;
  expressDeliveryRate: number;
  freeShippingMin: number;
  // Payment Gateways & MFS Options
  codEnabled: boolean;
  codMinAmount?: number | undefined;
  codMaxAmount?: number | undefined;
  codInstructions?: string | undefined;

  bkashEnabled: boolean;
  bkashMerchantNumber: string;
  bkashAccountType?: "Merchant" | "Personal" | "Send Money" | undefined;
  bkashInstructions?: string | undefined;

  nagadEnabled: boolean;
  nagadMerchantNumber: string;
  nagadAccountType?: "Merchant" | "Personal" | "Send Money" | undefined;
  nagadInstructions?: string | undefined;

  cardEnabled: boolean;
  cardGateway?: string | undefined;
  cardStoreId?: string | undefined;
  cardInstructions?: string | undefined;
  cardTestMode?: boolean | undefined;
  autoAssignCourier: boolean;
  defaultCourier: string;
  pathaoApiKey: string;
  steadfastApiKey: string;
  lowStockWarningQty: number;
  enableSmsAlerts: boolean;
  enableWhatsappUpdates: boolean;
  maintenanceMode: boolean;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "order" | "stock" | "payment" | "customer";
  link?: string | undefined;
}

export interface AdminActivityLog {
  id: string;
  adminUser: string;
  action: string;
  target: string;
  timestamp: string;
  details?: string | undefined;
}

