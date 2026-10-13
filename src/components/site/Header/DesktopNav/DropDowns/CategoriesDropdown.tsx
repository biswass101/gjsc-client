import {
  DropdownColumn,
} from "../shared/DropdownColumn";
import { categories, featured } from "../data";

export function CategoriesDropdown() {
  return (
    <div className="z-50 container-lux">
      <div className="rounded-2xl border border-border/20 bg-background/80 p-4 shadow-(--shadow-lift) backdrop-blur-2xl">
        <div className="grid grid-cols-12 gap-4">
          <DropdownColumn
            title="Categories"
            items={categories}
            to="/shop"
            searchParam="category"
          />

          <DropdownColumn
            title="Featured"
            items={featured}
            to="/shop"
            searchParam="category"
          />
        </div>
      </div>
    </div>
  );
}
