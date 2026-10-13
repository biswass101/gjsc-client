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
    <div className="z-50 container-lux">
      <div className="rounded-2xl border border-border/20 bg-background/80 p-4 shadow-(--shadow-lift) backdrop-blur-2xl">
        <div className="grid grid-cols-12 gap-4">
          <DropdownColumn
            title="Our Brands"
            items={brands}
            to="/shop"
            searchParam="category"
            getHref={(item) => brandRoutes[item.category as keyof typeof brandRoutes]}
          />

          <div className="col-span-12 px-2 lg:col-span-6">
            <p className="eyebrow mb-3 text-[11px] tracking-[0.2em] text-primary/80">Featured</p>

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
