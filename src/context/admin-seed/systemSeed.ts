import type {
  AdminMerchandising,
  AdminSettings,
  AdminNotification,
  AdminActivityLog,
} from "@/types";

export const INITIAL_MERCHANDISING: AdminMerchandising = {
  announcementText:
    "🌸 Tokyo Spring Shipment Arrived: 100% Authentic Japanese Skincare • Free Dhaka Delivery over ৳3,000",
  announcementActive: true,
  announcementLink: "/shop",
  flashSaleActive: true,
  flashSaleTitle: "Ginza Luxury 48h Flash Festival",
  flashSaleEndsAt: "2026-10-31T23:59:59",
  heroHeadline: "Pure Japanese Beauty, Direct from Tokyo Sanctuary",
  heroSubheadline:
    "Clinically proven barrier restoration, gentle double cleansing, and radiant essences imported fresh from Japan.",
  freeShippingThreshold: 5000,
};

export const INITIAL_SETTINGS: AdminSettings = {
  storeName: "Glorious Japan Skin Care",
  tagline: "Stay Glorious, Shine with Confidence",
  contactEmail: "concierge@gloriousjapan.com",
  contactPhone: "+880 1700-000000",
  warehouseAddress: "House 14, Road 11, Block C, Banani, Dhaka 1213",
  tokyoOfficeAddress: "Ginza 6-Chome, Chuo-ku, Tokyo 104-0061, Japan",
  currency: "BDT (৳)",
  insideDhakaRate: 60,
  outsideDhakaRate: 120,
  expressDeliveryRate: 150,
  freeShippingMin: 5000,
  codEnabled: true,
  bkashEnabled: true,
  bkashMerchantNumber: "01700-000000",
  nagadEnabled: true,
  nagadMerchantNumber: "01800-000000",
  autoAssignCourier: true,
  defaultCourier: "Pathao Express",
  pathaoApiKey: "pth_live_secret_99812401",
  steadfastApiKey: "stf_live_secret_7721834",
  lowStockWarningQty: 5,
  enableSmsAlerts: true,
  enableWhatsappUpdates: true,
  maintenanceMode: false,
};

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif-1",
    title: "New High-Value Order (#GJ-2026-5361)",
    message: "Sadia Islam placed an order for SK-II Essence (৳11,340) via Card.",
    time: "10 mins ago",
    read: false,
    type: "order",
    link: "/admin/orders",
  },
  {
    id: "notif-2",
    title: "Low Stock Alert: Melano CC",
    message: "Melano CC Vitamin C has only 2 units remaining in Banani warehouse.",
    time: "45 mins ago",
    read: false,
    type: "stock",
    link: "/admin/products",
  },
];

export const INITIAL_LOGS: AdminActivityLog[] = [
  {
    id: "log-1",
    adminUser: "Super Admin",
    action: "Updated Stock",
    target: "Sakura Radiance Serum",
    timestamp: "Today at 02:30 PM",
    details: "Restocked +25 units from Tokyo air shipment.",
  },
];
