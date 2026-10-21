import { Layout } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Glorious Japan Skin Care",
  description: "How Glorious Japan Skin Care collects, uses and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | Glorious Japan Skin Care",
    description: "Our approach to your data and privacy.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="container-lux max-w-3xl py-20">
        <h1 className="font-display text-4xl md:text-5xl">Privacy Policy</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>We collect only the information required to process and deliver your order: name, phone number, delivery address and, optionally, your email.</p>
          <p>We never sell your data. Payment details for bKash transactions are verified manually and are not stored on our servers.</p>
          <p>You may request deletion of your account and data at any time by contacting hello@gloriousjapan.com.</p>
        </div>
      </div>
    </Layout>
  );
}
