import type { AdminCustomer } from "@/types";

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  division: string;
  skinType: string;
  tier: AdminCustomer["tier"];
  notes: string;
}

