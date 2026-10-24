export interface User {
  name: string;
  email: string;
  role: "customer" | "admin";
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "order" | "promo" | "system";
}

