"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Box,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Droplets,
  Edit2,
  ExternalLink,
  Eye,
  Heart,
  KeyRound,
  Leaf,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Plus,
  RefreshCw,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "@/lib/navigation";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/features/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { PRODUCTS, formatBDT, slugify } from "@/lib/catalog";
import { useShop } from "@/context";
import { cn } from "@/lib/utils";

interface SavedAddress {
  id: string;
  label: "Home" | "Office" | "Other";
  isDefault: boolean;
  name: string;
  phone: string;
  division: string;
  city: string;
  area: string;
  street: string;
}

interface BuyerOrder {
  id: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing" | "Quality Checked";
  total: number;
  paymentMethod: string;
  courier: string;
  consignmentId: string;
  items: {
    slug: string;
    name: string;
    brand: string;
    size: string;
    qty: number;
    price: number;
    image: string;
  }[];
}

const INITIAL_ORDERS: BuyerOrder[] = [
  {
    id: "GJ-2026-4821",
    date: "24 Oct 2026",
    status: "In Transit",
    total: 8740,
    paymentMethod: "Cash on Delivery (COD)",
    courier: "Pathao Express",
    consignmentId: "PT-DH-9482104",
    items: [
      {
        slug: PRODUCTS[0]?.slug || "sakura-radiance-serum",
        name: PRODUCTS[0]?.name || "Sakura Radiance Serum",
        brand: PRODUCTS[0]?.brand || "Sakura Lab",
        size: "50ml",
        qty: 1,
        price: PRODUCTS[0]?.price || 4850,
        image: PRODUCTS[0]?.image || "",
      },
      {
        slug: PRODUCTS[3]?.slug || "koji-ferment-cream",
        name: PRODUCTS[3]?.name || "Koji Ferment Cream",
        brand: PRODUCTS[3]?.brand || "Kyoto Botanicals",
        size: "50ml",
        qty: 1,
        price: PRODUCTS[3]?.price || 5600,
        image: PRODUCTS[3]?.image || "",
      },
    ],
  },
  {
    id: "GJ-2026-3192",
    date: "12 Oct 2026",
    status: "Delivered",
    total: 3950,
    paymentMethod: "bKash Mobile Payment",
    courier: "Steadfast Courier",
    consignmentId: "SF-DHK-48201",
    items: [
      {
        slug: PRODUCTS[1]?.slug || "yuzu-glow-essence",
        name: PRODUCTS[1]?.name || "Yuzu Glow Essence",
        brand: PRODUCTS[1]?.brand || "Yuzu No Mori",
        size: "100ml",
        qty: 1,
        price: PRODUCTS[1]?.price || 3950,
        image: PRODUCTS[1]?.image || "",
      },
    ],
  },
  {
    id: "GJ-2026-1804",
    date: "28 Sep 2026",
    status: "Delivered",
    total: 2890,
    paymentMethod: "Cash on Delivery",
    courier: "Pathao Express",
    consignmentId: "PT-DHK-18290",
    items: [
      {
        slug: PRODUCTS[5]?.slug || "hikari-uv-shield-spf50",
        name: PRODUCTS[5]?.name || "Hikari UV Shield SPF50",
        brand: PRODUCTS[5]?.brand || "Hikari Beauty",
        size: "50ml",
        qty: 1,
        price: PRODUCTS[5]?.price || 2890,
        image: PRODUCTS[5]?.image || "",
      },
    ],
  },
];

const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    isDefault: true,
    name: "Nusrat Jahan",
    phone: "01712-849201",
    division: "Dhaka",
    city: "Dhaka",
    area: "Dhanmondi",
    street: "House 42, Road 9/A, Flat 4-B",
  },
  {
    id: "addr-2",
    label: "Office",
    isDefault: false,
    name: "Nusrat Jahan",
    phone: "01712-849201",
    division: "Dhaka",
    city: "Dhaka",
    area: "Gulshan 1",
    street: "Level 6, Bay's Galleria, 57 Gulshan Avenue",
  },
];

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, logout, wishlist, addToCart } = useShop();

  const [activeTab, setActiveTab] = useState("overview");

  // Profile Information State
  const [name, setName] = useState(user?.name || "Nusrat Jahan");
  const [email, setEmail] = useState(user?.email || "nusrat.jahan@gmail.com");
  const [phone, setPhone] = useState("01712-849201");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Address Book State
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressLabel, setAddressLabel] = useState<"Home" | "Office" | "Other">("Home");
  const [addressName, setAddressName] = useState("");
  const [addressPhone, setAddressPhone] = useState("");
  const [addressDivision, setAddressDivision] = useState("Dhaka");
  const [addressCity, setAddressCity] = useState("Dhaka");
  const [addressArea, setAddressArea] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressIsDefault, setAddressIsDefault] = useState(false);

  // Orders State
  const [orders, setOrders] = useState<BuyerOrder[]>(INITIAL_ORDERS);
  const [orderFilter, setOrderFilter] = useState<"all" | "In Transit" | "Delivered">("all");
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState<BuyerOrder | null>(null);

  // Skincare Profile Diagnostics
  const [skinType, setSkinType] = useState("Combination");
  const [concerns, setConcerns] = useState<string[]>(["Hydration", "Brightening", "Barrier Repair"]);

  // Notification Preferences
  const [notifSms, setNotifSms] = useState(true);
  const [notifWhatsapp, setNotifWhatsapp] = useState(true);
  const [notifPromos, setNotifPromos] = useState(true);

  // Security password state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Wishlist mapped products
  const wishlistProducts = useMemo(() => {
    return wishlist
      .map((slug) => PRODUCTS.find((p) => p.slug === slug))
      .filter((p): p is typeof PRODUCTS[number] => Boolean(p));
  }, [wishlist]);

  const filteredOrders = useMemo(() => {
    if (orderFilter === "all") return orders;
    return orders.filter((o) => o.status === orderFilter);
  }, [orders, orderFilter]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    toast.success("Profile updated successfully!");
  };

  const handleOpenAddressModal = (existing?: SavedAddress) => {
    if (existing) {
      setEditingAddressId(existing.id);
      setAddressLabel(existing.label);
      setAddressName(existing.name);
      setAddressPhone(existing.phone);
      setAddressDivision(existing.division);
      setAddressCity(existing.city);
      setAddressArea(existing.area);
      setAddressStreet(existing.street);
      setAddressIsDefault(existing.isDefault);
    } else {
      setEditingAddressId(null);
      setAddressLabel("Home");
      setAddressName(name);
      setAddressPhone(phone);
      setAddressDivision("Dhaka");
      setAddressCity("Dhaka");
      setAddressArea("");
      setAddressStreet("");
      setAddressIsDefault(addresses.length === 0);
    }
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressStreet.trim() || !addressArea.trim()) {
      toast.error("Please fill in the full street address and area.");
      return;
    }

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((a) => {
          if (a.id === editingAddressId) {
            return {
              ...a,
              label: addressLabel,
              name: addressName,
              phone: addressPhone,
              division: addressDivision,
              city: addressCity,
              area: addressArea,
              street: addressStreet,
              isDefault: addressIsDefault,
            };
          }
          return addressIsDefault ? { ...a, isDefault: false } : a;
        }),
      );
      toast.success("Address updated successfully!");
    } else {
      const newAddr: SavedAddress = {
        id: `addr-${Date.now()}`,
        label: addressLabel,
        isDefault: addressIsDefault || addresses.length === 0,
        name: addressName || name,
        phone: addressPhone || phone,
        division: addressDivision,
        city: addressCity,
        area: addressArea,
        street: addressStreet,
      };

      setAddresses((prev) => [
        ...(addressIsDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev),
        newAddr,
      ]);
      toast.success("New address added to your address book!");
    }

    setIsAddressModalOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed from address book.");
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    );
    toast.success("Default shipping address updated.");
  };

  const handleBuyAgain = (order: BuyerOrder) => {
    order.items.forEach((item) => {
      addToCart(item.slug, item.qty, item.size);
    });
    toast.success(`Items from #${order.id} added to bag!`, {
      action: {
        label: "View Bag",
        onClick: () => navigate({ to: "/cart" }),
      },
    });
  };

  const handleToggleConcern = (concern: string) => {
    setConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern],
    );
  };

  const handleSaveSkincareProfile = () => {
    toast.success("Skincare diagnostics profile saved!", {
      description: "Our recommendations across the shop are now personalized for your barrier.",
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      toast.error("Please enter both current and new password.");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("New passwords do not match.");
      return;
    }
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    toast.success("Password changed successfully!");
  };

  const handleSignOut = () => {
    logout();
    toast.info("Signed out of your account.");
    navigate({ to: "/auth" });
  };

  return (
    <Layout>
      {/* Account Hero Banner */}
      <div className="border-b border-border/50 bg-gradient-to-b from-cream to-background">
        <div className="container-lux py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-primary/30 bg-primary/10 text-primary font-display text-2xl font-bold shadow-xs">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "NJ"}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="eyebrow text-primary">Customer Sanctuary</span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                    🌸 VIP Ritual Member
                  </span>
                </div>
                <h1 className="mt-1 font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                  Hello, {name}
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {email} • Member since 2025
                </p>
              </div>
            </div>

            {/* Quick Metrics Header */}
            <div className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto pb-1 sm:pb-0">
              <div className="rounded-xl border border-border/60 bg-card p-3 min-w-[110px] shadow-xs">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                  <Sparkles className="h-3 w-3 text-primary" /> Ritual Points
                </span>
                <p className="mt-0.5 text-base font-bold text-foreground">500 Pts</p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  ৳200 Credit
                </span>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-3 min-w-[110px] shadow-xs">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                  <Package className="h-3 w-3 text-primary" /> Total Orders
                </span>
                <p className="mt-0.5 text-base font-bold text-foreground">{orders.length}</p>
                <span className="text-[10px] text-primary font-semibold">1 In Transit</span>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-3 min-w-[110px] shadow-xs">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                  <Heart className="h-3 w-3 text-rose" /> Wishlist
                </span>
                <p className="mt-0.5 text-base font-bold text-foreground">
                  {wishlistProducts.length}
                </p>
                <span className="text-[10px] text-muted-foreground font-medium">Saved Items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Account Management Tabs Area */}
      <div className="container-lux py-8 sm:py-12">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="grid gap-8 lg:grid-cols-12 items-start"
        >
          {/* Navigation Sidebar (3 cols) */}
          <aside className="lg:col-span-3">
            <div className="rounded-2xl border border-border/80 bg-card p-3 shadow-xs sticky top-24">
              <TabsList className="flex flex-row lg:flex-col h-auto w-full gap-1 bg-transparent p-0 overflow-x-auto justify-start">
                <TabsTrigger
                  value="overview"
                  className="w-full justify-start gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Overview</span>
                </TabsTrigger>

                <TabsTrigger
                  value="orders"
                  className="w-full justify-start gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  <Package className="h-3.5 w-3.5" />
                  <span>Orders & History</span>
                  <span className="ml-auto rounded-full bg-secondary px-1.5 py-0.2 text-[10px] font-bold text-foreground group-data-[state=active]:text-foreground">
                    {orders.length}
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="addresses"
                  className="w-full justify-start gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Saved Addresses</span>
                </TabsTrigger>

                <TabsTrigger
                  value="wishlist"
                  className="w-full justify-start gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  <Heart className="h-3.5 w-3.5" />
                  <span>Saved Wishlist</span>
                  {wishlistProducts.length > 0 && (
                    <span className="ml-auto rounded-full bg-rose/15 px-1.5 py-0.2 text-[10px] font-bold text-rose">
                      {wishlistProducts.length}
                    </span>
                  )}
                </TabsTrigger>

                <TabsTrigger
                  value="skincare"
                  className="w-full justify-start gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  <Droplets className="h-3.5 w-3.5" />
                  <span>Skincare Profile</span>
                </TabsTrigger>

                <TabsTrigger
                  value="settings"
                  className="w-full justify-start gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span>Account & Security</span>
                </TabsTrigger>
              </TabsList>

              <Separator className="my-3" />

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-rose/10 hover:text-rose transition-all"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Main Content Area (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            {/* ========================================================= */}
            {/* TAB 1: OVERVIEW & DASHBOARD */}
            {/* ========================================================= */}
            <TabsContent value="overview" className="m-0 space-y-6">
              {/* Active Parcel Alert Banner */}
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-cream via-secondary/20 to-cream p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/20 text-primary shrink-0 mt-0.5">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        Active Delivery
                      </span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.2 text-[10px] font-semibold text-primary">
                        #GJ-2026-4821
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold mt-0.5">
                      Your Japanese Parcel is Out for Delivery Today
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Assigned to Pathao Express rider. Estimated arrival in Dhanmondi by 6:00 PM.
                    </p>
                  </div>
                </div>

                <Button asChild size="sm" className="rounded-full text-xs px-5 shrink-0 gap-1.5">
                  <Link to="/track">
                    Track Live
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>

              {/* Personal Details Card */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <h3 className="font-display text-xl font-medium">Customer Profile</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="rounded-full text-xs h-8 px-3 gap-1.5"
                  >
                    <Edit2 className="h-3 w-3" />
                    {isEditingProfile ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="prof-name" className="text-xs font-semibold">
                        Full Name
                      </Label>
                      <Input
                        id="prof-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 h-9 rounded-full text-xs"
                      />
                    </div>

                    <div>
                      <Label htmlFor="prof-phone" className="text-xs font-semibold">
                        Mobile Phone Number
                      </Label>
                      <Input
                        id="prof-phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 h-9 rounded-full text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="prof-email" className="text-xs font-semibold">
                        Email Address
                      </Label>
                      <Input
                        id="prof-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 h-9 rounded-full text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2 flex justify-end">
                      <Button type="submit" size="sm" className="rounded-full text-xs px-5">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <dl className="mt-4 grid gap-4 text-xs sm:grid-cols-2">
                    <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
                      <dt className="text-muted-foreground font-medium">Full Name</dt>
                      <dd className="font-semibold text-foreground text-sm mt-0.5">{name}</dd>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
                      <dt className="text-muted-foreground font-medium">Email Address</dt>
                      <dd className="font-semibold text-foreground text-sm mt-0.5">{email}</dd>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
                      <dt className="text-muted-foreground font-medium">Primary Contact</dt>
                      <dd className="font-semibold text-foreground text-sm mt-0.5">{phone}</dd>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
                      <dt className="text-muted-foreground font-medium">Default Delivery Hub</dt>
                      <dd className="font-semibold text-foreground text-sm mt-0.5">
                        Dhanmondi, Dhaka Metropolitan
                      </dd>
                    </div>
                  </dl>
                )}
              </div>

              {/* Skin Diagnostics Summary */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <div>
                    <h3 className="font-display text-xl font-medium">Your Japanese Skin Profile</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Personalized formulation matching based on your Tokyo barrier diagnostics.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("skincare")}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Adjust Profile →
                  </Button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                    Skin Type: {skinType}
                  </span>
                  {concerns.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-border px-3 py-1 text-muted-foreground"
                    >
                      Target: {c}
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* ========================================================= */}
            {/* TAB 2: ORDERS & PURCHASE HISTORY */}
            {/* ========================================================= */}
            <TabsContent value="orders" className="m-0 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight">
                    Order History & Receipts
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Track packages, download VAT invoices, or reorder your favorite Japanese botanicals.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/30 p-1">
                  {(["all", "In Transit", "Delivered"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setOrderFilter(status)}
                      className={cn(
                        "rounded-full px-3 py-1 text-[11px] font-semibold transition-all capitalize",
                        orderFilter === status
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {status === "all" ? "All Orders" : status}
                    </button>
                  ))}
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="rounded-2xl border border-border/80 bg-card p-10 text-center space-y-3">
                  <Package className="mx-auto h-10 w-10 text-muted-foreground/40" />
                  <p className="font-display text-lg font-medium">No orders found</p>
                  <p className="text-xs text-muted-foreground">
                    You don't have any orders matching the "{orderFilter}" filter.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-4"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-3">
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="font-display text-lg font-bold text-foreground">
                              #{order.id}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              Placed on {order.date} • {order.paymentMethod}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-semibold",
                              order.status === "Delivered"
                                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                                : "bg-primary/15 text-primary",
                            )}
                          >
                            {order.status === "In Transit" && (
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
                            )}
                            {order.status}
                          </span>

                          <span className="font-display text-base font-bold text-foreground">
                            {formatBDT(order.total)}
                          </span>
                        </div>
                      </div>

                      {/* Items in this Order */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-3 min-w-0">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  width={48}
                                  height={48}
                                  className="h-12 w-11 rounded-md object-cover border border-border bg-cream shrink-0"
                                />
                              )}
                              <div className="truncate">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                                  {item.brand}
                                </span>
                                <Link
                                  to="/product/$slug"
                                  params={{ slug: item.slug }}
                                  className="font-display text-xs font-semibold text-foreground truncate block hover:text-primary transition-colors"
                                >
                                  {item.name}
                                </Link>
                                <span className="text-muted-foreground text-[11px]">
                                  {item.size} • Qty: {item.qty}
                                </span>
                              </div>
                            </div>

                            <span className="font-semibold text-foreground shrink-0 text-xs">
                              {formatBDT(item.price * item.qty)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/40 text-xs">
                        <span className="text-muted-foreground text-[11px]">
                          Courier: <strong>{order.courier}</strong> ({order.consignmentId})
                        </span>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full text-xs h-8 px-3.5"
                            onClick={() => setSelectedOrderReceipt(order)}
                          >
                            View Receipt
                          </Button>

                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="rounded-full text-xs h-8 px-3.5"
                          >
                            <Link to="/track">Track Parcel</Link>
                          </Button>

                          <Button
                            size="sm"
                            className="rounded-full text-xs h-8 px-3.5"
                            onClick={() => handleBuyAgain(order)}
                          >
                            Buy Again
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* ========================================================= */}
            {/* TAB 3: SAVED ADDRESSES (BANGLADESH CONTEXT) */}
            {/* ========================================================= */}
            <TabsContent value="addresses" className="m-0 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight">
                    Delivery Address Book
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Manage your shipping locations across Dhaka and all 64 districts of Bangladesh.
                  </p>
                </div>

                <Button
                  onClick={() => handleOpenAddressModal()}
                  className="rounded-full text-xs px-4 h-9 gap-1.5 font-semibold shrink-0"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add New Address
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={cn(
                      "rounded-2xl border p-5 shadow-xs space-y-3 relative flex flex-col justify-between",
                      addr.isDefault
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border/80 bg-card",
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10.5px] font-bold text-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-primary" />
                          {addr.label}
                        </span>

                        {addr.isDefault && (
                          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                            Default Address
                          </span>
                        )}
                      </div>

                      <div className="mt-3 text-xs space-y-1">
                        <strong className="text-foreground text-sm font-semibold block">
                          {addr.name}
                        </strong>
                        <p className="text-muted-foreground">{addr.phone}</p>
                        <p className="text-foreground leading-relaxed pt-1">{addr.street}</p>
                        <p className="text-muted-foreground">
                          {addr.area}, {addr.city}, {addr.division} Division
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                      {!addr.isDefault ? (
                        <button
                          type="button"
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="text-primary hover:underline font-medium text-[11px]"
                        >
                          Set as Default
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-semibold">
                          ✓ Primary Shipping
                        </span>
                      )}

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenAddressModal(addr)}
                          className="h-7 w-7 p-0 rounded-full text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        {addresses.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="h-7 w-7 p-0 rounded-full text-muted-foreground hover:text-rose"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* ========================================================= */}
            {/* TAB 4: SAVED WISHLIST */}
            {/* ========================================================= */}
            <TabsContent value="wishlist" className="m-0 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight">
                    Saved Skincare Rituals
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your personal vault of Japanese beauty formulas to purchase next.
                  </p>
                </div>

                <Button asChild variant="outline" size="sm" className="rounded-full text-xs">
                  <Link to="/wishlist">Full Wishlist Page →</Link>
                </Button>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="rounded-2xl border border-border/80 bg-card p-12 text-center space-y-3">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground/30 stroke-[1.5]" />
                  <p className="font-display text-xl font-medium">Your wishlist is currently empty</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Save items you adore by clicking the heart icon on any product page or catalog card.
                  </p>
                  <Button asChild className="rounded-full px-6 mt-2 text-xs">
                    <Link to="/shop">Discover Japanese Bestsellers</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* ========================================================= */}
            {/* TAB 5: SKINCARE DIAGNOSTICS & PROFILE */}
            {/* ========================================================= */}
            <TabsContent value="skincare" className="m-0 space-y-6">
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-6">
                <div>
                  <span className="eyebrow text-primary">Tokyo Skin Consultation</span>
                  <h3 className="font-display text-2xl font-medium tracking-tight mt-0.5">
                    My Skin Profile & Diagnostic Needs
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Select your primary skin attributes to tailor your product recommendations and layering advice.
                  </p>
                </div>

                {/* Skin Type Selector */}
                <div>
                  <Label className="text-xs font-semibold">Your Primary Skin Type</Label>
                  <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {["Dry", "Oily", "Combination", "Sensitive", "Normal"].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setSkinType(st)}
                        className={cn(
                          "rounded-full border py-2 text-xs font-semibold transition-all",
                          skinType === st
                            ? "border-primary bg-primary text-primary-foreground shadow-xs"
                            : "border-border bg-background text-muted-foreground hover:border-primary/50",
                        )}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Concerns Checklist */}
                <div>
                  <Label className="text-xs font-semibold">Target Concerns (Select all that apply)</Label>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {[
                      "Hydration",
                      "Brightening",
                      "Barrier Repair",
                      "Acne / Blemishes",
                      "Dark Spots",
                      "Anti-Aging",
                      "Large Pores",
                      "Redness & Calm",
                    ].map((c) => {
                      const isSelected = concerns.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleToggleConcern(c)}
                          className={cn(
                            "rounded-full px-4 py-1.5 text-xs font-medium border transition-all flex items-center gap-1.5",
                            isSelected
                              ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/30"
                              : "border-border bg-background text-muted-foreground hover:border-primary/50",
                          )}
                        >
                          {isSelected && <Check className="h-3 w-3 text-primary" />}
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Aesthetician Notes Advice Card */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Recommended Japanese Protocol for {skinType} Skin
                  </p>
                  Focus on water-light hydrating lotions followed by fermented rice or ceramide barrier repair to lock moisture without congestion in Bangladesh humidity.
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={handleSaveSkincareProfile}
                    className="rounded-full text-xs px-6 font-semibold"
                  >
                    Save Skin Profile
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* ========================================================= */}
            {/* TAB 6: SETTINGS & SECURITY */}
            {/* ========================================================= */}
            <TabsContent value="settings" className="m-0 space-y-6">
              {/* Notifications Card */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
                <h3 className="font-display text-xl font-medium border-b border-border/50 pb-2.5">
                  Notification Preferences
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">SMS Delivery Alerts</p>
                      <p className="text-muted-foreground">
                        Receive instant SMS when your parcel is out with courier rider.
                      </p>
                    </div>
                    <Switch checked={notifSms} onCheckedChange={setNotifSms} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">WhatsApp Order Updates</p>
                      <p className="text-muted-foreground">
                        Direct tracking links and support assistance on WhatsApp.
                      </p>
                    </div>
                    <Switch checked={notifWhatsapp} onCheckedChange={setNotifWhatsapp} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Tokyo Launch & Promo Alerts</p>
                      <p className="text-muted-foreground">
                        Exclusive early access to seasonal Japanese beauty imports and discounts.
                      </p>
                    </div>
                    <Switch checked={notifPromos} onCheckedChange={setNotifPromos} />
                  </div>
                </div>
              </div>

              {/* Password Management */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
                <h3 className="font-display text-xl font-medium border-b border-border/50 pb-2.5">
                  Change Password
                </h3>

                <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                  <div>
                    <Label htmlFor="cur-pass" className="text-xs font-semibold">
                      Current Password
                    </Label>
                    <Input
                      id="cur-pass"
                      type="password"
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="••••••••"
                      className="mt-1 h-9 rounded-full text-xs"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="new-pass" className="text-xs font-semibold">
                        New Password
                      </Label>
                      <Input
                        id="new-pass"
                        type="password"
                        required
                        minLength={6}
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="mt-1 h-9 rounded-full text-xs"
                      />
                    </div>

                    <div>
                      <Label htmlFor="conf-pass" className="text-xs font-semibold">
                        Confirm New Password
                      </Label>
                      <Input
                        id="conf-pass"
                        type="password"
                        required
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        placeholder="••••••••"
                        className="mt-1 h-9 rounded-full text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <Button type="submit" size="sm" className="rounded-full text-xs px-5">
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>

              {/* Account Privacy & Actions */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Sign Out of All Sessions</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Clear stored credentials and session tokens on this device.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="rounded-full text-xs text-rose border-rose/30 hover:bg-rose/5"
                >
                  Sign Out
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Add / Edit Address Dialog */}
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Provide delivery location details for Pathao & Steadfast courier riders.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveAddress} className="mt-4 space-y-3.5 text-xs">
            {/* Label Selector */}
            <div>
              <Label className="text-xs font-semibold">Address Label</Label>
              <div className="mt-1.5 flex gap-2">
                {(["Home", "Office", "Other"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setAddressLabel(l)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-xs font-semibold border transition-all",
                      addressLabel === l
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50",
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="m-name" className="text-xs font-semibold">
                  Recipient Name
                </Label>
                <Input
                  id="m-name"
                  required
                  value={addressName}
                  onChange={(e) => setAddressName(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>

              <div>
                <Label htmlFor="m-phone" className="text-xs font-semibold">
                  Recipient Phone
                </Label>
                <Input
                  id="m-phone"
                  required
                  value={addressPhone}
                  onChange={(e) => setAddressPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="m-div" className="text-xs font-semibold">
                  Division
                </Label>
                <select
                  id="m-div"
                  value={addressDivision}
                  onChange={(e) => setAddressDivision(e.target.value)}
                  className="mt-1 w-full rounded-full border border-border bg-background px-3 py-2 text-xs"
                >
                  {[
                    "Dhaka",
                    "Chattogram",
                    "Rajshahi",
                    "Khulna",
                    "Sylhet",
                    "Barishal",
                    "Rangpur",
                    "Mymensingh",
                  ].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="m-area" className="text-xs font-semibold">
                  Thana / Area
                </Label>
                <Input
                  id="m-area"
                  required
                  value={addressArea}
                  onChange={(e) => setAddressArea(e.target.value)}
                  placeholder="e.g. Dhanmondi, Gulshan"
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="m-street" className="text-xs font-semibold">
                House & Street Details
              </Label>
              <Input
                id="m-street"
                required
                value={addressStreet}
                onChange={(e) => setAddressStreet(e.target.value)}
                placeholder="House 24, Road 11, Flat 4-B"
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="m-def"
                checked={addressIsDefault}
                onChange={(e) => setAddressIsDefault(e.target.checked)}
                className="rounded border-border text-primary focus:ring-0"
              />
              <label htmlFor="m-def" className="text-xs text-muted-foreground cursor-pointer">
                Set as my default shipping address
              </label>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
                onClick={() => setIsAddressModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="rounded-full text-xs px-5">
                Save Address
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Order Receipt Dialog */}
      <Dialog
        open={Boolean(selectedOrderReceipt)}
        onOpenChange={(open) => !open && setSelectedOrderReceipt(null)}
      >
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Receipt #{selectedOrderReceipt?.id}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Official Glorious Japan Skin Care Order Summary & Tax Invoice.
            </DialogDescription>
          </DialogHeader>

          {selectedOrderReceipt && (
            <div className="mt-4 space-y-4 text-xs">
              <div className="rounded-xl border border-border/70 bg-secondary/30 p-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Date:</span>
                  <span className="font-semibold text-foreground">
                    {selectedOrderReceipt.date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-primary">
                    {selectedOrderReceipt.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Courier:</span>
                  <span className="font-medium">
                    {selectedOrderReceipt.courier} ({selectedOrderReceipt.consignmentId})
                  </span>
                </div>
              </div>

              <div className="space-y-2 border-t border-b border-border/50 py-3">
                {selectedOrderReceipt.items.map((it, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-foreground">{it.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {it.size} × {it.qty}
                      </p>
                    </div>
                    <span className="font-semibold">{formatBDT(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-primary font-display text-base">
                  {formatBDT(selectedOrderReceipt.total)}
                </span>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  size="sm"
                  className="rounded-full text-xs px-5"
                  onClick={() => {
                    toast.success("Receipt downloaded as PDF (demo)");
                    setSelectedOrderReceipt(null);
                  }}
                >
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Download Invoice
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
