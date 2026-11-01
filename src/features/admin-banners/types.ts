import { AdminBanner } from "@/context/admin-context";

export interface PageKeyConfig {
  key: AdminBanner["pageKey"];
  label: string;
  route: string;
}

export interface BannerFormData {
  pageKey: AdminBanner["pageKey"];
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  mobileImageUrl: string;
  ctaText: string;
  ctaLink: string;
  active: boolean;
  order: string;
}

