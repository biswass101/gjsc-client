export interface User {
  name: string;
  email: string;
  role: "customer" | "admin";
  avatar?: string | undefined;
  phone?: string | undefined;
  authProvider?: "email" | "google" | undefined;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "order" | "promo" | "system";
}

