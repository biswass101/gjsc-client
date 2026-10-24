import {
  DropdownColumn,
} from "../shared/DropdownColumn";
import { categories, featured } from "../data";
import { slugify } from "@/lib/catalog";

export function CategoriesDropdown() {
  return (
    <div className="z-50 container-lux">
      <div className="rounded-2xl border border-border bg-background p-4 shadow-2xl">
        <div className="grid grid-cols-12 gap-4">
          <DropdownColumn
            title="Categories"
            items={categories}
            to="/shop"
            searchParam="category"
            getHref={(item) => `/category/${slugify(item.category)}`}
            imageOffset={0}
          />

          <DropdownColumn
            title="Featured"
            items={featured}
            to="/shop"
            searchParam="category"
            getHref={(item) => `/category/${slugify(item.category)}`}
            imageOffset={6}
          />
        </div>
      </div>
    </div>
  );
}
