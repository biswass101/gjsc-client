export type PipelineStage =
  | "All"
  | "Pending"
  | "Processing"
  | "Quality Checked"
  | "Dispatched"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

export type CourierOption =
  "Pathao Express" | "Steadfast" | "RedX" | "Paperfly" | "In-House" | "None";

export type OrderSortOption = "newest" | "oldest" | "total_desc" | "total_asc";
