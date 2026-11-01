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
  codEnabled: boolean;
  bkashEnabled: boolean;
  bkashMerchantNumber: string;
  nagadEnabled: boolean;
  nagadMerchantNumber: string;
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

