import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmail("");
    toast.success("Welcome to the Glorious Japan Beauty Circle!", {
      description: "Check your inbox for your 10% welcome privilege code.",
    });
  };

  return (
    <div className="border-b border-border/60 py-8 sm:py-12 bg-background/50">
      <div className="container-lux">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-8 rounded-lg sm:rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-cream to-primary/5 p-5 sm:p-8 lg:p-10 shadow-xs">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-primary text-[9px] sm:text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>MEMBERSHIP PRIVILEGE</span>
            </div>
            <h3 className="font-display text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
              Join the Glorious Japan Circle
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Receive private ritual guides, early access to Tokyo pre-orders, and enjoy{" "}
              <strong className="text-foreground font-semibold">10% off</strong> your first order.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-md flex-col sm:flex-row gap-2"
          >
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="footer-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="h-10 sm:h-11 rounded-xl bg-background px-3.5 text-xs sm:text-sm shadow-xs border-border/80 focus-visible:ring-primary"
            />
            <Button
              type="submit"
              className="h-10 sm:h-11 w-full sm:w-auto rounded-xl bg-primary px-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-xs transition-all hover:bg-primary/90 shrink-0 active:scale-98"
            >
              Join Circle
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

