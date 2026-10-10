import { definePage } from "@/lib/navigation";
import { toast } from "sonner";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = definePage("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Glorious Japan Skin Care" },
      { name: "description", content: "Questions about a product or order? Our Dhaka team replies within one business day." },
      { property: "og:title", content: "Contact Us | Glorious Japan Skin Care" },
      { property: "og:description", content: "Reach the Glorious Japan Skin Care team in Dhaka." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Layout>
      <div className="container-lux max-w-2xl py-20">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">We'd love to hear from you</h1>
        <form
          className="surface-card mt-8 space-y-4 p-8"
          onSubmit={(e) => { e.preventDefault(); toast.success("Message sent — we'll reply within a day"); }}
        >
          <div><Label htmlFor="c-name">Name</Label><Input id="c-name" required className="mt-2 rounded-full" /></div>
          <div><Label htmlFor="c-email">Email</Label><Input id="c-email" type="email" required className="mt-2 rounded-full" /></div>
          <div><Label htmlFor="c-msg">Message</Label><Textarea id="c-msg" required rows={5} className="mt-2 rounded-md" /></div>
          <Button type="submit" className="w-full rounded-full py-6 text-xs uppercase tracking-[0.2em]">Send message</Button>
        </form>
      </div>
    </Layout>
  ),
});
