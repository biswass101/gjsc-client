import { definePage } from "@/lib/navigation";
import { Layout } from "@/components/site/Layout";

export const Route = definePage("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Glorious Japan Skin Care" },
      { name: "description", content: "Terms of sale, delivery, returns and website use for Glorious Japan Skin Care." },
      { property: "og:title", content: "Terms & Conditions | Glorious Japan Skin Care" },
      { property: "og:description", content: "Terms of sale and website use." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Layout>
      <div className="container-lux max-w-3xl py-20">
        <h1 className="font-display text-4xl md:text-5xl">Terms & Conditions</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>Orders are confirmed once we verify your phone number. Cash on Delivery orders may be cancelled before dispatch.</p>
          <p>Prices are in Bangladeshi Taka and include applicable taxes. Promotional prices apply while stocks last.</p>
          <p>Unopened products may be returned within 7 days. Opened skincare cannot be returned for hygiene reasons.</p>
        </div>
      </div>
    </Layout>
  ),
});
