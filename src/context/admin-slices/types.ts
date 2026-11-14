import type {
  AdminProduct,
  AdminOrderItem,
  AdminOrderTimelineEvent,
  AdminOrder,
  AdminCustomer,
  AdminDiscount,
  AdminCategory,
  AdminCollection,
  AdminBrand,
  AdminPreOrder,
  AdminBanner,
  AdminFeaturedVideo,
  AdminPageMeta,
  AdminReview,
  AdminFaq,
  AdminMerchandising,
  AdminSettings,
  AdminNotification,
  AdminActivityLog,
} from "@/types";

export type AddActivityLogFn = (action: string, target: string, details?: string) => void;

export interface AdminContextType {
  // Data stores
  products: AdminProduct[];
  orders: AdminOrder[];
  customers: AdminCustomer[];
  discounts: AdminDiscount[];
  categories: AdminCategory[];
  collections: AdminCollection[];
  brands: AdminBrand[];
  preOrders: AdminPreOrder[];
  banners: AdminBanner[];
  featuredVideos: AdminFeaturedVideo[];
  pageMetas: AdminPageMeta[];
  reviews: AdminReview[];
  faqs: AdminFaq[];
  merchandising: AdminMerchandising;
  settings: AdminSettings;
  notifications: AdminNotification[];
  activityLogs: AdminActivityLog[];
  unreadNotifCount: number;

  // Product Operations
  addProduct: (
    product: Omit<AdminProduct, "id" | "slug" | "createdAt" | "salesCount">,
  ) => Promise<AdminProduct>;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  duplicateProduct: (id: string) => AdminProduct;
  bulkUpdateProducts: (ids: string[], updates: Partial<AdminProduct>) => void;
  bulkDeleteProducts: (ids: string[]) => void;
  adjustStock: (id: string, delta: number) => void;

  // Order Operations
  addOrder: (
    order: Omit<AdminOrder, "id" | "timeline" | "date" | "dateFormatted">
  ) => Promise<AdminOrder> | AdminOrder;
  updateOrderStatus: (
    orderId: string,
    status: AdminOrder["fulfillmentStatus"],
    note?: string,
  ) => void;
  updateOrderPayment: (
    orderId: string,
    status: AdminOrder["paymentStatus"],
    trxId?: string,
  ) => void;
  assignCourier: (orderId: string, courier: AdminOrder["courier"], consignmentId?: string) => void;
  addOrderNote: (orderId: string, note: string) => void;
  deleteOrder: (orderId: string) => void;

  // Customer Operations
  addCustomer: (
    customer: Omit<
      AdminCustomer,
      "id" | "joinedDate" | "ordersCount" | "totalSpent" | "avgOrderValue"
    >,
  ) => AdminCustomer;
  updateCustomer: (id: string, updates: Partial<AdminCustomer>) => void;
  deleteCustomer: (id: string) => void;

  // Discount Operations
  addDiscount: (discount: Omit<AdminDiscount, "id" | "usageCount">) => AdminDiscount;
  toggleDiscount: (id: string) => void;
  deleteDiscount: (id: string) => void;

  // Categories Operations
  addCategory: (cat: Omit<AdminCategory, "id">) => AdminCategory;
  updateCategory: (id: string, updates: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;

  // Collections Operations
  addCollection: (col: Omit<AdminCollection, "id">) => AdminCollection;
  updateCollection: (id: string, updates: Partial<AdminCollection>) => void;
  deleteCollection: (id: string) => void;

  // Brands Operations
  addBrand: (brand: Omit<AdminBrand, "id">) => AdminBrand;
  updateBrand: (id: string, updates: Partial<AdminBrand>) => void;
  deleteBrand: (id: string) => void;

  // Pre-Orders Operations
  addPreOrder: (po: Omit<AdminPreOrder, "id">) => AdminPreOrder;
  updatePreOrder: (id: string, updates: Partial<AdminPreOrder>) => void;
  deletePreOrder: (id: string) => void;

  // Banners Operations
  addBanner: (banner: Omit<AdminBanner, "id">) => AdminBanner;
  updateBanner: (id: string, updates: Partial<AdminBanner>) => void;
  deleteBanner: (id: string) => void;

  // Featured Videos Operations
  addFeaturedVideo: (video: Omit<AdminFeaturedVideo, "id" | "createdAt">) => AdminFeaturedVideo;
  updateFeaturedVideo: (id: string, updates: Partial<AdminFeaturedVideo>) => void;
  deleteFeaturedVideo: (id: string) => void;
  toggleFeaturedVideo: (id: string) => void;
  reorderFeaturedVideos: (orderedIds: string[]) => void;

  // Page Content & SEO Operations
  updatePageMeta: (id: string, updates: Partial<AdminPageMeta>) => void;

  // Reviews Moderation Operations
  updateReviewStatus: (id: string, status: AdminReview["status"]) => void;
  replyReview: (id: string, reply: string) => void;
  deleteReview: (id: string) => void;

  // FAQs Operations
  addFaq: (faq: Omit<AdminFaq, "id">) => AdminFaq;
  updateFaq: (id: string, updates: Partial<AdminFaq>) => void;
  deleteFaq: (id: string) => void;

  // Merchandising & Settings
  updateMerchandising: (updates: Partial<AdminMerchandising>) => void;
  updateSettings: (updates: Partial<AdminSettings>) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Factory Reset
  resetToDefaults: () => void;
}
