import type { DiscountTemplate } from "../types";

export const DISCOUNT_TEMPLATES: DiscountTemplate[] = [
  {
    code: "TOKYO15",
    type: "percentage",
    val: "15",
    min: "3000",
    limit: "300",
    label: "15% Off Tokyo Weekend (Min ৳3,000)",
  },
  {
    code: "DHAKAFREE",
    type: "free_shipping",
    val: "60",
    min: "2500",
    limit: "1000",
    label: "Free Dhaka Shipping (Min ৳2,500)",
  },
  {
    code: "VIP500",
    type: "fixed",
    val: "500",
    min: "4500",
    limit: "150",
    label: "৳500 Instant Cashback (Min ৳4,500)",
  },
];

