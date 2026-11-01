import type { CouponRule } from "../types";

export const BD_DIVISIONS = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

export const POPULAR_DHAKA_AREAS = [
  "Dhanmondi",
  "Gulshan 1",
  "Gulshan 2",
  "Banani",
  "Uttara",
  "Mirpur",
  "Mohammadpur",
  "Bashundhara R/A",
  "Badda / Rampura",
  "Motijheel / Dilkusha",
  "Khilgaon",
  "Malibagh / Shantinagar",
  "Baridhara DOHS",
  "Mirpur DOHS",
  "Mohakhali DOHS",
  "Lalmatia",
  "Wari / Old Dhaka",
  "Tejgaon Industrial Area",
];

export const VALID_COUPONS: Record<string, CouponRule> = {
  GLORIOUS10: { type: "percent", value: 10, label: "10% Off Entire Ritual" },
  SAKURA200: { type: "fixed", value: 200, label: "৳200 Tokyo Welcome Voucher" },
  FREESHIP: { type: "free_shipping", value: 0, label: "Free Nationwide Shipping" },
};

