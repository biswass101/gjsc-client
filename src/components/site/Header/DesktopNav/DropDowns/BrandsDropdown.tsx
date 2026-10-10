// 1. Imports
import { ChevronDown } from "lucide-react";
import { DropdownColumn } from "../shared/DropdownColumn";
import { DropdownLink } from "../shared/DropdownLink";
import { brands, featuredBrands } from "../data";

// 4. Declare brandRoutes
const brandRoutes = {
  "glorious-japan": "/brands/glorious-japan",
  "sakura-lab": "/brands/sakura-lab",
  "kyoto-botanicals": "/brands/kyoto-botanicals",
  "yuzu-no-mori": "/brands/yuzu-no-mori",
  "hikari-beauty": "/brands/hikari-beauty",
} as const;

// 5. Export the component here
export function BrandsDropdown() {
  return (
    <div className="absolute left-0 top-full z-50 w-full min-w-[48rem]">
      <div className="mt-1 rounded-lg border border-border bg-popover p-4 shadow-[var(--shadow-lift)]">
        <div className="grid grid-cols-12 gap-6">
          <DropdownColumn
            title="Our Brands"
            items={brands}
            to="/shop"
            searchParam="category"
            getHref={(item) => brandRoutes[item.category as keyof typeof brandRoutes]}
          />

          <div className="col-span-12 px-4 lg:col-span-6">
            <p className="eyebrow mb-2">Featured</p>

            <div className="space-y-1 text-[13px] normal-case tracking-normal">
              {featuredBrands.map((brand) => (
                <DropdownLink
                  key={brand.label}
                  {...brand}
                  href={brandRoutes[brand.category as keyof typeof brandRoutes]}
                />
              ))}
              <DropdownLink
                label="View All Brands"
                category="all-brands"
                icon={ChevronDown}
                href="/brands"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
