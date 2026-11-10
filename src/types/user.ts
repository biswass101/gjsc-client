export interface User {
  name: string;
  email: string;
  role: "customer" | "admin";
  avatar?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  authProvider?: "email" | "google" | "facebook" | undefined;
  hasPassword?: boolean | undefined;
  skinType?: string | null | undefined;
  skinConcerns?: string[] | undefined;
  notifSms?: boolean | undefined;
  notifWhatsapp?: boolean | undefined;
  notifPromos?: boolean | undefined;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "order" | "promo" | "system";
}
