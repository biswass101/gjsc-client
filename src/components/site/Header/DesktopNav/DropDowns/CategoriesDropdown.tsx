import {
  DropdownColumn,
} from "../shared/DropdownColumn";
import { categories, featured } from "../data";

export function CategoriesDropdown() {
  return (
    
    <div className="absolute left-0 top-full z-50 w-full min-w-[48rem]">
      <div className="mt-1 rounded-lg border border-border bg-popover p-4 shadow-[var(--shadow-lift)]">
        <div className="grid grid-cols-12 gap-6">
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
