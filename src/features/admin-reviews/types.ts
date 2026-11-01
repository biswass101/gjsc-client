import { AdminReview } from "@/context/admin-context";

export interface ReviewFilterState {
  searchQuery: string;
  selectedStatus: string;
  selectedRating: string;
}

