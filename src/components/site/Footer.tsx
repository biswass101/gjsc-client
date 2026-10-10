import { Link } from "@/lib/navigation";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "Best Sellers", to: "/shop" },
      { label: "Gift Sets", to: "/shop" },
      { label: "Wishlist", to: "/wishlist" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track Order", to: "/track" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "My Account", to: "/account" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", to: "/about" },
      { label: "Journal", to: "/blog" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="container-lux grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <img src="/glorious-japan-skin-care-logo.jpeg" alt="Glorious Japan Skin Care" width={72} height={72} loading="lazy" className="h-16 w-16 rounded-full object-cover shadow-sm border border-primary/30" />
          <p className="mt-4 font-display text-2xl leading-snug">Stay Glorious,<br />Shine with Confidence</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Authentic Japanese beauty rituals, curated in Dhaka since 2025.
          </p>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" strokeWidth={1.5} /> Gulshan 2, Dhaka 1212</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" strokeWidth={1.5} /> +880 1700 000000</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" strokeWidth={1.5} /> hello@gloriousjapan.com</p>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to as "/shop"} className="text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-lux flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-2xl">Join the Glorious Letter</p>
            <p className="text-sm text-muted-foreground">Rituals, launches and quiet offers. No noise.</p>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              setEmail("");
              toast.success("Welcome to the Glorious Letter");
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <Input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="rounded-full bg-background px-5"
            />
            <Button type="submit" className="rounded-full px-7 text-xs uppercase tracking-[0.18em]">Subscribe</Button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-lux flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Glorious Japan Skin Care. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="rounded-full border border-border px-3 py-1">Cash on Delivery</span>
            <span className="rounded-full border border-border px-3 py-1">bKash</span>
          </div>
          <div className="flex gap-3">
            <a href="https://instagram.com" aria-label="Instagram" className="transition-colors hover:text-primary"><Instagram className="h-4 w-4" strokeWidth={1.5} /></a>
            <a href="https://facebook.com" aria-label="Facebook" className="transition-colors hover:text-primary"><Facebook className="h-4 w-4" strokeWidth={1.5} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
