// 1. Imports
import { ChevronDown } from "lucide-react";
import { DropdownColumn } from "../shared/DropdownColumn";
import { DropdownLink } from "../shared/DropdownLink";
import { brands, featuredBrands } from "../data";
import { PRODUCT_IMAGES } from "@/lib/catalog";

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
      <div className="rounded-2xl border border-border bg-background p-4 shadow-2xl">
        <div className="grid grid-cols-12 gap-4">
          <DropdownColumn
            title="Our Brands"
            items={brands}
            to="/shop"
            searchParam="category"
            imageOffset={4}
            getHref={(item) => brandRoutes[item.category as keyof typeof brandRoutes]}
          />

          <div className="col-span-12 px-2 lg:col-span-6">
            <p className="eyebrow mb-3 text-[11px] tracking-[0.2em] text-primary/80">Featured</p>

            <div className="space-y-1 text-[13px] normal-case tracking-normal">
              {featuredBrands.map((brand, idx) => (
                <DropdownLink
                  key={brand.label}
                  {...brand}
                  image={brand.image ?? PRODUCT_IMAGES[(idx + 10) % PRODUCT_IMAGES.length]!}
                  href={brandRoutes[brand.category as keyof typeof brandRoutes]}
                />
              ))}
              <DropdownLink
                label="View All Brands"
                category="all-brands"
                image={PRODUCT_IMAGES[0]!}
                href="/brands"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
