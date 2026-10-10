import { definePage } from "@/lib/navigation";
import { Layout } from "@/components/site/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  ["Are your products authentic?", "Yes. Every item is sourced through verified Japanese suppliers and arrives sealed."],
  ["Which payment methods do you accept?", "Cash on Delivery and bKash."],
  ["How long does delivery take?", "1–2 days inside Dhaka, 2–4 days nationwide. Free above ৳5,000."],
  ["Can I return a product?", "Unopened products can be returned within 7 days of delivery."],
  ["How do I track my order?", "Use the Track Order page with your order ID, or check your account dashboard."],
];

export const Route = definePage("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Shipping, Returns & Payments | Glorious Japan Skin Care" },
      { name: "description", content: "Answers about authenticity, Cash on Delivery, bKash, delivery times and returns." },
      { property: "og:title", content: "FAQ | Glorious Japan Skin Care" },
      { property: "og:description", content: "Shipping, returns and payment questions answered." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
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
  ),
});
