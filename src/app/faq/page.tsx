import { Layout } from "@/components/layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Metadata } from "next";

const FAQS = [
  ["Are your products authentic?", "Yes. Every item is sourced through verified Japanese suppliers and arrives sealed."],
  ["Which payment methods do you accept?", "Cash on Delivery and bKash."],
  ["How long does delivery take?", "1–2 days inside Dhaka, 2–4 days nationwide. Free above ৳5,000."],
  ["Can I return a product?", "Unopened products can be returned within 7 days of delivery."],
  ["How do I track my order?", "Use the Track Order page with your order ID, or check your account dashboard."],
];

export const metadata: Metadata = {
  title: "FAQ — Shipping, Returns & Payments | Glorious Japan Skin Care",
  description: "Answers about authenticity, Cash on Delivery, bKash, delivery times and returns.",
  openGraph: {
    title: "FAQ | Glorious Japan Skin Care",
    description: "Shipping, returns and payment questions answered.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function FAQPage() {
  return (
    <Layout>
      <div className="container-lux max-w-3xl py-20">
        <p className="eyebrow">Help Centre</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Frequently Asked</h1>
        <Accordion type="single" collapsible className="mt-8">
          {FAQS.map(([q, a]) => (
            <AccordionItem key={q} value={q as string}>
              <AccordionTrigger className="text-left font-display text-lg">{q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
