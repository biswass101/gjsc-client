import { Layout } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Glorious Japan Skin Care",
  description: "Terms of sale, delivery, returns and website use for Glorious Japan Skin Care.",
  openGraph: {
    title: "Terms & Conditions | Glorious Japan Skin Care",
    description: "Terms of sale and website use.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function TermsPage() {
  return (
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
  );
}
