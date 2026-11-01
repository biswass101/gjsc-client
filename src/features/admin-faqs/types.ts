import { AdminFaq } from "@/context/admin-context";

export interface FaqFilterState {
  searchQuery: string;
  selectedCategory: string;
}

export interface FaqFormData {
  category: AdminFaq["category"];
  question: string;
  answer: string;
  order: string;
  active: boolean;
}

