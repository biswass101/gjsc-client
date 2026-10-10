import { definePage, Link } from "@/lib/navigation";
import { Bell, Heart, MapPin, Package, Settings, Star, User } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatBDT } from "@/lib/catalog";

export const Route = definePage("/account")({
  head: () => ({
    meta: [
      { title: "My Account | Glorious Japan Skin Care" },
      { name: "description", content: "Manage your profile, orders, addresses, reviews and notifications." },
      { property: "og:title", content: "My Account | Glorious Japan Skin Care" },
      { property: "og:description", content: "Orders, addresses, reviews and settings in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Account,
});

const ORDERS = [
  { id: "GJ-2026-4821", date: "12 Jul 2026", total: 8740, status: "Delivered" },
  { id: "GJ-2026-5192", date: "28 Jul 2026", total: 4850, status: "In transit" },
  { id: "GJ-2026-5310", date: "03 Aug 2026", total: 2890, status: "Processing" },
];

function Account() {
  return (
    <Layout>
      <div className="border-b border-border bg-cream py-12">
        <div className="container-lux">
          <p className="eyebrow">My Account</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Hello, Nusrat</h1>
        </div>
      </div>

      <div className="container-lux py-12">
        <Tabs defaultValue="orders" className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <TabsList className="h-fit w-full flex-col gap-1 bg-transparent p-0">
            {[
              ["profile", "Profile", User],
              ["orders", "Orders", Package],
              ["wishlist", "Wishlist", Heart],
              ["addresses", "Addresses", MapPin],
              ["reviews", "Reviews", Star],
              ["notifications", "Notifications", Bell],
              ["settings", "Settings", Settings],
            ].map(([v, label, Icon]) => {
              const I = Icon as typeof User;
              return (
                <TabsTrigger key={v as string} value={v as string} className="w-full justify-start gap-3 rounded-full px-5 py-3 text-sm data-[state=active]:bg-secondary">
                  <I className="h-4 w-4" strokeWidth={1.5} /> {label as string}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div>
            <TabsContent value="profile" className="surface-card p-8">
              <h2 className="font-display text-2xl">Profile</h2>
              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                <div><dt className="text-muted-foreground">Name</dt><dd>Nusrat Ahmed</dd></div>
                <div><dt className="text-muted-foreground">Email</dt><dd>nusrat@example.com</dd></div>
                <div><dt className="text-muted-foreground">Phone</dt><dd>+880 1700 000000</dd></div>
                <div><dt className="text-muted-foreground">Member since</dt><dd>2025</dd></div>
              </dl>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              {ORDERS.map((o) => (
                <div key={o.id} className="surface-card flex flex-wrap items-center justify-between gap-4 p-6">
                  <div>
                    <p className="font-display text-xl">{o.id}</p>
                    <p className="text-xs text-muted-foreground">{o.date}</p>
                  </div>
                  <Badge variant="secondary" className="rounded-full px-4 py-1">{o.status}</Badge>
                  <p className="font-semibold">{formatBDT(o.total)}</p>
                  <Button asChild variant="outline" className="rounded-full"><Link to="/track">Track</Link></Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="wishlist" className="surface-card p-8">
              <h2 className="font-display text-2xl">Wishlist</h2>
              <p className="mt-3 text-sm text-muted-foreground">Your saved products live on the wishlist page.</p>
              <Button asChild className="mt-6 rounded-full px-8"><Link to="/wishlist">Open wishlist</Link></Button>
            </TabsContent>

            <TabsContent value="addresses" className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Home", text: "House 24, Road 11, Gulshan 2, Dhaka 1212" },
                { label: "Office", text: "Level 6, Bay's Galleria, Gulshan 1, Dhaka" },
              ].map((a) => (
                <div key={a.label} className="surface-card p-6">
                  <p className="eyebrow">{a.label}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{a.text}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="reviews" className="surface-card p-8">
              <h2 className="font-display text-2xl">My Reviews</h2>
              <p className="mt-3 text-sm text-muted-foreground">You have written 2 reviews. Thank you for sharing your ritual.</p>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-3">
              {["Your order GJ-2026-5192 is out for delivery.", "Flash sale ends Sunday — up to 20% off.", "Aurora Barrier Serum is back in stock."].map((n) => (
                <div key={n} className="surface-card p-5 text-sm text-muted-foreground">{n}</div>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="surface-card p-8">
              <h2 className="font-display text-2xl">Settings</h2>
              <p className="mt-3 text-sm text-muted-foreground">Manage newsletter preferences, password and account deletion.</p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}
