"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Bike,
  Box,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  HelpCircle,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "@/lib/navigation";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS, formatBDT } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface TrackingEvent {
  title: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
  active?: boolean;
}

interface OrderTrackingData {
  orderId: string;
  customerName: string;
  phone: string;
  destination: string;
  zone: string;
  courier: string;
  consignmentId: string;
  riderName?: string;
  riderPhone?: string;
  paymentMethod: string;
  paymentStatus: "Paid via bKash" | "Cash on Delivery (Unpaid)" | "Paid via Card";
  estimatedDelivery: string;
  statusText: string;
  currentStepIndex: number; // 0 to 4
  items: {
    name: string;
    brand: string;
    image: string;
    slug: string;
    size: string;
    qty: number;
    price: number;
  }[];
  events: TrackingEvent[];
}

// Pre-configured realistic demo orders
const DEMO_ORDERS: Record<string, OrderTrackingData> = {
  "GJ-2026-4821": {
    orderId: "GJ-2026-4821",
    customerName: "Farhana Yasmin",
    phone: "01712-849201",
    destination: "House 42, Road 9/A, Dhanmondi, Dhaka",
    zone: "Inside Dhaka Metropolitan",
    courier: "Pathao Express",
    consignmentId: "PT-DH-9482104",
    riderName: "Md. Tanvir Hossain",
    riderPhone: "01823-456789",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Cash on Delivery (Unpaid)",
    estimatedDelivery: "Today, by 6:00 PM",
    statusText: "Out for Delivery — Rider En Route",
    currentStepIndex: 3,
    items: [
      {
        name: PRODUCTS[0]?.name || "Sakura Radiance Serum",
        brand: PRODUCTS[0]?.brand || "Sakura Lab",
        image: PRODUCTS[0]?.image || "",
        slug: PRODUCTS[0]?.slug || "sakura-radiance-serum",
        size: "50ml",
        qty: 1,
        price: PRODUCTS[0]?.price || 4850,
      },
      {
        name: PRODUCTS[3]?.name || "Koji Ferment Cream",
        brand: PRODUCTS[3]?.brand || "Kyoto Botanicals",
        image: PRODUCTS[3]?.image || "",
        slug: PRODUCTS[3]?.slug || "koji-ferment-cream",
        size: "50ml",
        qty: 1,
        price: PRODUCTS[3]?.price || 5600,
      },
    ],
    events: [
      {
        title: "Order Placed & Verified",
        location: "Glorious Japan Dispatch System",
        timestamp: "Oct 24, 2026 · 11:20 AM",
        description: "Order confirmed by customer service via phone verification.",
        completed: true,
      },
      {
        title: "Quality Inspected & Furoshiki Packed",
        location: "Dhaka Central Temperature-Controlled Hub",
        timestamp: "Oct 24, 2026 · 02:45 PM",
        description: "Tokyo authenticity batch codes verified. Tamper-evident seal applied.",
        completed: true,
      },
      {
        title: "Handed Over to Courier Hub",
        location: "Pathao Central Sorting Center, Tejgaon",
        timestamp: "Oct 24, 2026 · 08:30 PM",
        description: "Parcel barcode scanned and sorted for Dhanmondi local distribution hub.",
        completed: true,
      },
      {
        title: "Out for Delivery",
        location: "Dhanmondi Local Hub, Dhaka",
        timestamp: "Today · 09:15 AM",
        description: "Assigned to delivery rider Md. Tanvir Hossain. Cash on Delivery collection ready.",
        completed: false,
        active: true,
      },
      {
        title: "Delivered to Customer",
        location: "House 42, Road 9/A, Dhanmondi",
        timestamp: "Expected Today by 6:00 PM",
        description: "Package handed over and customer seal inspection completed.",
        completed: false,
      },
    ],
  },
  "GJ-2026-8314": {
    orderId: "GJ-2026-8314",
    customerName: "Sadia Chowdhury",
    phone: "01911-394820",
    destination: "Quarter 14, GEC Circle, Chattogram",
    zone: "Outside Dhaka (Chattogram)",
    courier: "Steadfast Courier",
    consignmentId: "SF-CTG-104928",
    paymentMethod: "bKash Mobile Payment",
    paymentStatus: "Paid via bKash",
    estimatedDelivery: "Tomorrow, Oct 26",
    statusText: "In Transit — Arrived at Regional Hub",
    currentStepIndex: 2,
    items: [
      {
        name: PRODUCTS[1]?.name || "Yuzu Glow Essence",
        brand: PRODUCTS[1]?.brand || "Yuzu No Mori",
        image: PRODUCTS[1]?.image || "",
        slug: PRODUCTS[1]?.slug || "yuzu-glow-essence",
        size: "100ml",
        qty: 1,
        price: PRODUCTS[1]?.price || 3950,
      },
    ],
    events: [
      {
        title: "Order Placed & bKash Verified",
        location: "Dhaka Online Gateway",
        timestamp: "Oct 23, 2026 · 04:10 PM",
        description: "bKash TrxID confirmed and order scheduled for regional dispatch.",
        completed: true,
      },
      {
        title: "Packed with Japanese Bubble Cushioning",
        location: "Dhaka Central Distribution Warehouse",
        timestamp: "Oct 24, 2026 · 10:00 AM",
        description: "Tokyo genuine authenticity seal applied with fragile transit label.",
        completed: true,
      },
      {
        title: "In Transit to Chattogram",
        location: "Steadfast Regional Hub, Chattogram",
        timestamp: "Today · 06:45 AM",
        description: "Inter-district highway transit completed. Arrived at GEC delivery hub.",
        completed: false,
        active: true,
      },
      {
        title: "Out for Delivery",
        location: "GEC Circle Local Hub, Chattogram",
        timestamp: "Expected Tomorrow Morning",
        description: "Will be assigned to local area delivery partner.",
        completed: false,
      },
      {
        title: "Delivered to Customer",
        location: "Chattogram Delivery Address",
        timestamp: "Expected Tomorrow Afternoon",
        description: "Delivery completion and receipt acknowledgment.",
        completed: false,
      },
    ],
  },
  "GJ-2026-1940": {
    orderId: "GJ-2026-1940",
    customerName: "Nusrat Jahan",
    phone: "01844-592014",
    destination: "Sector 4, Uttara, Dhaka",
    zone: "Inside Dhaka Metropolitan",
    courier: "Pathao Express",
    consignmentId: "PT-UT-849201",
    riderName: "Kamrul Islam",
    riderPhone: "01733-112233",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Cash on Delivery (Unpaid)",
    estimatedDelivery: "Delivered on Oct 23",
    statusText: "Delivered Successfully",
    currentStepIndex: 4,
    items: [
      {
        name: PRODUCTS[4]?.name || "Silk Rice Cleanser",
        brand: PRODUCTS[4]?.brand || "Glorious Japan",
        image: PRODUCTS[4]?.image || "",
        slug: PRODUCTS[4]?.slug || "silk-rice-cleanser",
        size: "100ml",
        qty: 2,
        price: PRODUCTS[4]?.price || 1990,
      },
    ],
    events: [
      {
        title: "Order Placed & Verified",
        location: "Glorious Japan Online",
        timestamp: "Oct 22, 2026 · 09:30 AM",
        description: "Order confirmed via SMS and customer dispatch queue.",
        completed: true,
      },
      {
        title: "Package Quality Checked & Sealed",
        location: "Dhaka Central Warehouse",
        timestamp: "Oct 22, 2026 · 02:00 PM",
        description: "Authenticity QR code verified.",
        completed: true,
      },
      {
        title: "Dispatched to Uttara Sorting Hub",
        location: "Pathao Sorting Hub",
        timestamp: "Oct 22, 2026 · 07:00 PM",
        description: "Transferred to Sector 4 delivery center.",
        completed: true,
      },
      {
        title: "Out for Delivery",
        location: "Uttara Sector 4 Local Hub",
        timestamp: "Oct 23, 2026 · 10:15 AM",
        description: "Rider Kamrul Islam dispatched with parcel.",
        completed: true,
      },
      {
        title: "Delivered to Customer",
        location: "Sector 4, Uttara, Dhaka",
        timestamp: "Oct 23, 2026 · 01:45 PM",
        description: "Received by recipient. Payment collected and receipt signed.",
        completed: true,
      },
    ],
  },
};

export default function TrackPage() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeOrder, setActiveOrder] = useState<OrderTrackingData | null>(
    DEMO_ORDERS["GJ-2026-4821"] || null,
  );

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = orderIdInput.trim().toUpperCase().replace("#", "");

    if (!cleanId) {
      toast.error("Please enter an Order ID", {
        description: "Example: GJ-2026-4821 or GJ-2026-8314",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Check if it matches our pre-configured orders
      if (DEMO_ORDERS[cleanId]) {
        setActiveOrder(DEMO_ORDERS[cleanId]);
        toast.success("Parcel tracking loaded", {
          description: `Tracking details for order #${cleanId}`,
        });
      } else {
        // Dynamically build a realistic active tracking status for ANY user order ID
        const dynamicOrder: OrderTrackingData = {
          orderId: cleanId.startsWith("GJ-") ? cleanId : `GJ-2026-${cleanId}`,
          customerName: "Valued Skincare Customer",
          phone: phoneInput.trim() || "017XXXXXXXX",
          destination: "Dhaka Central Delivery Hub",
          zone: "Inside Dhaka Metropolitan",
          courier: "Pathao Express",
          consignmentId: `PT-${Math.floor(1000000 + Math.random() * 9000000)}`,
          paymentMethod: "Cash on Delivery",
          paymentStatus: "Cash on Delivery (Unpaid)",
          estimatedDelivery: "Within 24–48 Hours",
          statusText: "Processing & Quality Inspection in Dhaka Hub",
          currentStepIndex: 1,
          items: [
            {
              name: PRODUCTS[0]?.name || "Authentic Japanese Skincare Formulation",
              brand: PRODUCTS[0]?.brand || "Glorious Japan",
              image: PRODUCTS[0]?.image || "",
              slug: PRODUCTS[0]?.slug || "sakura-radiance-serum",
              size: "50ml",
              qty: 1,
              price: PRODUCTS[0]?.price || 4850,
            },
          ],
          events: [
            {
              title: "Order Placed & Confirmed",
              location: "Glorious Japan Dispatch Queue",
              timestamp: "Today · Recent",
              description: "Order received in system and queued for Tokyo authenticity batch scan.",
              completed: true,
            },
            {
              title: "Inspection & Furoshiki Packaging",
              location: "Dhaka Central Temperature-Controlled Hub",
              timestamp: "In Progress",
              description: "Items being packed with shock-resistant cushioning and genuine import seal.",
              completed: false,
              active: true,
            },
            {
              title: "Courier Transfer",
              location: "Pathao / Steadfast Sorting Center",
              timestamp: "Scheduled for Today",
              description: "Consignment barcode generation and dispatch manifest creation.",
              completed: false,
            },
            {
              title: "Out for Delivery",
              location: "Local Delivery Hub",
              timestamp: "Expected Tomorrow Morning",
              description: "Rider assignment and final doorstep delivery route.",
              completed: false,
            },
            {
              title: "Delivered to Customer",
              location: "Customer Destination",
              timestamp: "Expected Tomorrow",
              description: "Parcel inspection and COD settlement.",
              completed: false,
            },
          ],
        };
        setActiveOrder(dynamicOrder);
        toast.success("Parcel tracking found", {
          description: `Tracking details for order #${dynamicOrder.orderId}`,
        });
      }
      setIsLoading(false);
    }, 500);
  };

  const handleSelectPreset = (id: string) => {
    setOrderIdInput(id);
    if (DEMO_ORDERS[id]) {
      setActiveOrder(DEMO_ORDERS[id]);
      toast.info(`Viewing sample parcel #${id}`);
    }
  };

  // WhatsApp hotline helper
  const whatsappHelpUrl = useMemo(() => {
    if (!activeOrder) return "https://wa.me/8801700000000";
    const text = encodeURIComponent(
      `Hello Glorious Japan! I'm checking the delivery status of order #${activeOrder.orderId} (${activeOrder.statusText}). Could you please update me?`,
    );
    return `https://wa.me/8801700000000?text=${text}`;
  }, [activeOrder]);

  return (
    <Layout>
      {/* Header Banner */}
      <div className="border-b border-border/50 bg-secondary/30">
        <div className="container-lux py-8 sm:py-12 text-center">
          <span className="eyebrow text-primary">
            荷物追跡 · Tokyo To Doorstep Logistics
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            Track Your Japanese Parcel
          </h1>
          <p className="mt-2.5 max-w-xl mx-auto text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Real-time tracking for all imported skincare orders. Monitor customs clearance, temperature-controlled packaging, and Pathao / Steadfast courier dispatch.
          </p>

          {/* Quick Tracking Form */}
          <form
            onSubmit={handleTrackSubmit}
            className="mt-6 sm:mt-8 mx-auto max-w-xl flex flex-col sm:flex-row items-center gap-2.5 rounded-xl border border-border/80 bg-background/95 p-2 shadow-sm"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                required
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="Enter Order ID (e.g. GJ-2026-4821)"
                className="h-11 rounded-full border-0 bg-transparent pl-10 text-xs sm:text-sm shadow-none focus-visible:ring-0"
              />
            </div>

            <div className="relative w-full sm:w-44 border-t sm:border-t-0 sm:border-l border-border/60">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="Phone (optional)"
                className="h-11 rounded-full border-0 bg-transparent pl-9 text-xs shadow-none focus-visible:ring-0"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto h-11 rounded-full px-7 text-xs font-bold uppercase tracking-wider shrink-0 gap-2 shadow-xs"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Locating...
                </>
              ) : (
                <>
                  <Search className="h-3.5 w-3.5" />
                  Track Parcel
                </>
              )}
            </Button>
          </form>

          {/* Quick Demo Order Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-muted-foreground text-[11px] font-medium">Quick Demo Samples:</span>
            {Object.keys(DEMO_ORDERS).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handleSelectPreset(id)}
                className={cn(
                  "rounded-full px-3 py-1 border text-[11px] font-medium transition-all",
                  activeOrder?.orderId === id
                    ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/30"
                    : "border-border/80 bg-background/80 text-muted-foreground hover:border-primary hover:text-foreground",
                )}
              >
                #{id} (
                {id === "GJ-2026-4821"
                  ? "Out for Delivery"
                  : id === "GJ-2026-8314"
                    ? "In Transit"
                    : "Delivered"}
                )
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tracking Details Area */}
      {activeOrder && (
        <div className="container-lux py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left 8 Columns: Live Status & Visual Stepper Timeline */}
            <div className="lg:col-span-8 space-y-6">
              {/* Primary Live Status Banner Card */}
              <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                        Live Tracking
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        #{activeOrder.orderId}
                      </span>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {activeOrder.statusText}
                      </span>
                    </div>

                    <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                      {activeOrder.statusText}
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      Estimated Arrival:{" "}
                      <strong className="text-foreground font-semibold">
                        {activeOrder.estimatedDelivery}
                      </strong>
                    </p>
                  </div>

                  {/* Courier Partner Info */}
                  <div className="rounded-xl border border-border/60 bg-secondary/30 p-3 sm:text-right text-xs shrink-0">
                    <p className="text-[11px] text-muted-foreground">Courier Partner</p>
                    <p className="font-bold text-foreground text-sm flex items-center sm:justify-end gap-1.5 mt-0.5">
                      <Truck className="h-4 w-4 text-primary" />
                      {activeOrder.courier}
                    </p>
                    <p className="text-[10.5px] text-muted-foreground font-mono mt-0.5">
                      CN: {activeOrder.consignmentId}
                    </p>
                  </div>
                </div>

                {/* Assigned Rider Info (When Out for Delivery) */}
                {activeOrder.riderName && (
                  <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/20 text-primary shrink-0">
                        <Bike className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          Delivery Rider: {activeOrder.riderName}
                        </p>
                        <p className="text-muted-foreground text-[11.5px]">
                          Your parcel is in the delivery van. Keep cash/bKash ready for verification.
                        </p>
                      </div>
                    </div>

                    {activeOrder.riderPhone && (
                      <a
                        href={`tel:${activeOrder.riderPhone}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/40 bg-background px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all shrink-0"
                      >
                        <Phone className="h-3 w-3" />
                        Call Rider
                      </a>
                    )}
                  </div>
                )}

                {/* Horizontal Progress Stepper for Large Screens */}
                <div className="mt-8 pt-4 border-t border-border/50 hidden md:block">
                  <div className="relative flex items-center justify-between">
                    {/* Connecting line */}
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-secondary z-0">
                      <div
                        className="h-full bg-primary transition-all duration-700"
                        style={{
                          width: `${(activeOrder.currentStepIndex / 4) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Step circles */}
                    {[
                      { label: "Order Placed", icon: Box },
                      { label: "Tokyo Packed", icon: ShieldCheck },
                      { label: "In Transit", icon: Truck },
                      { label: "Out for Delivery", icon: Bike },
                      { label: "Delivered", icon: CheckCircle2 },
                    ].map((step, idx) => {
                      const Icon = step.icon;
                      const isPast = idx < activeOrder.currentStepIndex;
                      const isCurrent = idx === activeOrder.currentStepIndex;

                      return (
                        <div key={idx} className="relative z-10 flex flex-col items-center">
                          <div
                            className={cn(
                              "grid h-10 w-10 place-items-center rounded-full border-2 transition-all shadow-xs",
                              isPast
                                ? "border-primary bg-primary text-primary-foreground"
                                : isCurrent
                                  ? "border-primary bg-background text-primary ring-4 ring-primary/20 animate-pulse"
                                  : "border-border bg-background text-muted-foreground",
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span
                            className={cn(
                              "mt-2 text-xs text-center font-medium max-w-[80px]",
                              isCurrent
                                ? "text-primary font-bold"
                                : isPast
                                  ? "text-foreground"
                                  : "text-muted-foreground",
                            )}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Vertical Detailed Journey Log Timeline */}
              <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <h3 className="font-display text-xl font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Milestone Activity & Transit Logs
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Verified Tokyo Logistics
                  </span>
                </div>

                <div className="mt-6 space-y-6 relative before:absolute before:left-3.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-border/60">
                  {activeOrder.events.map((ev, i) => (
                    <div key={i} className="relative flex items-start gap-4 sm:gap-5 pl-1">
                      {/* Milestone marker */}
                      <div
                        className={cn(
                          "relative z-10 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border-2 shrink-0 transition-all",
                          ev.completed
                            ? "border-primary bg-primary text-primary-foreground shadow-xs"
                            : ev.active
                              ? "border-primary bg-background text-primary ring-4 ring-primary/20 animate-pulse shadow-sm"
                              : "border-border bg-background text-muted-foreground/50",
                        )}
                      >
                        {ev.completed ? (
                          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-current" />
                        )}
                      </div>

                      {/* Content block */}
                      <div className="flex-1 rounded-xl border border-border/60 bg-secondary/20 p-4 transition-all hover:bg-secondary/40">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                            {ev.title}
                            {ev.active && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.2 text-[9px] font-bold uppercase tracking-wider text-primary">
                                Current Stage
                              </span>
                            )}
                          </h4>
                          <span className="text-xs text-muted-foreground font-medium">
                            {ev.timestamp}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-primary font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {ev.location}
                        </p>

                        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                          {ev.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Destination, Package Contents & WhatsApp Support */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Delivery Destination & Payment Snapshot */}
              <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
                <h3 className="font-display text-lg font-medium border-b border-border/50 pb-2.5">
                  Shipment Details
                </h3>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Recipient</span>
                    <strong className="text-foreground font-semibold text-sm">
                      {activeOrder.customerName}
                    </strong>
                    <p className="text-muted-foreground">{activeOrder.phone}</p>
                  </div>

                  <div>
                    <span className="text-muted-foreground block text-[11px]">Delivery Address</span>
                    <p className="font-medium text-foreground">{activeOrder.destination}</p>
                    <span className="inline-block mt-0.5 rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                      {activeOrder.zone}
                    </span>
                  </div>

                  <div className="border-t border-border/50 pt-2.5">
                    <span className="text-muted-foreground block text-[11px]">Payment Terms</span>
                    <p className="font-semibold text-foreground">{activeOrder.paymentMethod}</p>
                    <span
                      className={cn(
                        "inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        activeOrder.paymentStatus.includes("Paid")
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      )}
                    >
                      {activeOrder.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items in this Parcel */}
              <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                  <h3 className="font-display text-lg font-medium">Parcel Contents</h3>
                  <span className="text-xs text-muted-foreground">
                    {activeOrder.items.length} item{activeOrder.items.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      {item.image && (
                        <Link
                          to="/product/$slug"
                          params={{ slug: item.slug }}
                          className="shrink-0 overflow-hidden rounded-md border border-border bg-cream"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            width={54}
                            height={54}
                            className="h-12 w-11 object-cover"
                          />
                        </Link>
                      )}

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {item.brand}
                        </span>
                        <Link
                          to="/product/$slug"
                          params={{ slug: item.slug }}
                          className="font-display text-xs font-semibold text-foreground truncate block hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-[11px] text-muted-foreground">
                          {item.size} • Qty: {item.qty}
                        </p>
                      </div>

                      <span className="font-semibold text-foreground text-xs shrink-0">
                        {formatBDT(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority WhatsApp Support Box */}
              <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-cream via-background to-cream p-6 shadow-xs space-y-4 text-center sm:text-left">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-[#25D366]/15 text-[#25D366] shrink-0">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      Need Help With Delivery?
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Live representative available 9 AM – 11 PM
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Have questions about timing, address changes, or rider coordination? Contact our Dhaka dispatch team on WhatsApp.
                </p>

                <div className="space-y-2 pt-1">
                  <a
                    href={whatsappHelpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#20ba59] transition-all shadow-xs"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Chat on WhatsApp
                  </a>

                  <a
                    href="tel:+8801700000000"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-all"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    Hotline: +880 1700-000000
                  </a>
                </div>
              </div>

              {/* Authenticity Guarantee Callout */}
              <div className="rounded-xl border border-border/70 bg-card p-4 text-xs text-muted-foreground flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Authentic Tokyo Seal</p>
                  <p className="text-[11px] leading-relaxed mt-0.5">
                    Your package includes a tamper-evident holographic seal with Japanese batch verification. Check seal integrity upon delivery.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </Layout>
  );
}
