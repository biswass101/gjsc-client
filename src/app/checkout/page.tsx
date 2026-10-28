"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Banknote,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  ExternalLink,
  Gift,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Truck,
  User,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "@/lib/navigation";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { formatBDT } from "@/lib/catalog";
import { useShop } from "@/context";
import { cn } from "@/lib/utils";

const BD_DIVISIONS = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

const POPULAR_DHAKA_AREAS = [
  "Dhanmondi",
  "Gulshan 1",
  "Gulshan 2",
  "Banani",
  "Uttara",
  "Mirpur",
  "Mohammadpur",
  "Bashundhara R/A",
  "Badda / Rampura",
  "Motijheel / Dilkusha",
  "Khilgaon",
  "Malibagh / Shantinagar",
  "Baridhara DOHS",
  "Mirpur DOHS",
  "Mohakhali DOHS",
  "Lalmatia",
  "Wari / Old Dhaka",
  "Tejgaon Industrial Area",
];

type DeliveryZone = "dhaka_metro" | "dhaka_suburbs" | "outside_dhaka";
type PaymentMethod = "cod" | "bkash" | "nagad" | "card";

const VALID_COUPONS: Record<
  string,
  { type: "percent" | "fixed" | "free_shipping"; value: number; label: string }
> = {
  GLORIOUS10: { type: "percent", value: 10, label: "10% Off Entire Ritual" },
  SAKURA200: { type: "fixed", value: 200, label: "৳200 Tokyo Welcome Voucher" },
  FREESHIP: { type: "free_shipping", value: 0, label: "Free Nationwide Shipping" },
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, subtotal, clearCart, user } = useShop();

  // Contact info
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");

  // Shipping destination
  const [zone, setZone] = useState<DeliveryZone>("dhaka_metro");
  const [division, setDivision] = useState("Dhaka");
  const [cityDistrict, setCityDistrict] = useState("Dhaka");
  const [area, setArea] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

  // Payment
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [bkashPhone, setBkashPhone] = useState("");
  const [bkashTrxId, setBkashTrxId] = useState("");
  const [nagadPhone, setNagadPhone] = useState("");
  const [nagadTrxId, setNagadTrxId] = useState("");

  // Add-ons & Promo
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSummaryData, setOrderSummaryData] = useState<{
    orderId: string;
    total: number;
    shippingFee: number;
    discount: number;
    zone: DeliveryZone;
    address: string;
    phone: string;
    payment: PaymentMethod;
    date: string;
    items: typeof lines;
  } | null>(null);

  // Dynamic Shipping Calculation based on Bangladesh zones
  const baseShippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (subtotal >= 5000) return 0; // Free delivery above ৳5,000 threshold
    if (appliedCoupon === "FREESHIP") return 0;

    switch (zone) {
      case "dhaka_metro":
        return 80;
      case "dhaka_suburbs":
        return 100;
      case "outside_dhaka":
        return 130;
      default:
        return 80;
    }
  }, [subtotal, zone, appliedCoupon]);

  // Coupon Discount Calculation
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const rule = VALID_COUPONS[appliedCoupon];
    if (!rule) return 0;
    if (rule.type === "percent") {
      return Math.round((subtotal * rule.value) / 100);
    }
    if (rule.type === "fixed") {
      return Math.min(rule.value, subtotal);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const giftFee = giftWrap ? 150 : 0;
  const grandTotal = Math.max(0, subtotal - couponDiscount + baseShippingFee + giftFee);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / 5000) * 100));
  const amountToFreeShipping = Math.max(0, 5000 - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (!clean) return;
    if (VALID_COUPONS[clean]) {
      setAppliedCoupon(clean);
      setCouponInput("");
      toast.success("Coupon code applied successfully!", {
        description: VALID_COUPONS[clean]?.label,
      });
    } else {
      toast.error("Invalid coupon code", {
        description: "Please check your code or try 'GLORIOUS10' for 10% off.",
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (lines.length === 0) {
      toast.error("Your shopping bag is empty");
      return;
    }

    // Phone validation for BD numbers (11 digits, starts with 01)
    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      toast.error("Invalid Bangladeshi mobile number", {
        description: "Please provide a valid 11-digit mobile number (e.g., 017XXXXXXXX).",
      });
      return;
    }

    if (payment === "bkash" && (!bkashPhone.trim() || !bkashTrxId.trim())) {
      toast.error("bKash payment details required", {
        description: "Please provide your bKash mobile number and the Transaction ID (TrxID).",
      });
      return;
    }

    if (payment === "nagad" && (!nagadPhone.trim() || !nagadTrxId.trim())) {
      toast.error("Nagad payment details required", {
        description: "Please provide your Nagad mobile number and the Transaction ID (TrxID).",
      });
      return;
    }

    setIsSubmitting(true);

    const generatedId = `GJ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      setOrderSummaryData({
        orderId: generatedId,
        total: grandTotal,
        shippingFee: baseShippingFee,
        discount: couponDiscount,
        zone,
        address: `${streetAddress}, ${area ? area + ", " : ""}${cityDistrict}, ${division}`,
        phone: cleanPhone,
        payment,
        date: new Date().toLocaleDateString("en-BD", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        items: [...lines],
      });
      clearCart();
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  // ==========================================
  // VIEW: Order Confirmation (Celebration Screen)
  // ==========================================
  if (orderSummaryData) {
    const isDhaka =
      orderSummaryData.zone === "dhaka_metro" || orderSummaryData.zone === "dhaka_suburbs";
    const estimatedDelivery = isDhaka
      ? "Within 24–48 Hours (Tomorrow or Day After)"
      : "Within 48–72 Hours via Steadfast / Pathao";

    const whatsappMessage = encodeURIComponent(
      `Hello Glorious Japan! I just placed order #${orderSummaryData.orderId} for ৳${orderSummaryData.total.toLocaleString("en-BD")}. My phone is ${orderSummaryData.phone}. Please confirm tracking updates.`,
    );

    return (
      <Layout>
        <div className="container-lux py-12 sm:py-16">
          <div className="mx-auto max-w-2xl rounded-xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm text-center">
            {/* Success icon */}
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              Order Confirmed · 注文完了
            </span>

            <h1 className="mt-1 font-display text-3xl sm:text-4xl font-medium tracking-tight">
              Thank You for Your Order!
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Your Japanese skincare ritual order{" "}
              <strong className="text-foreground font-semibold">
                #{orderSummaryData.orderId}
              </strong>{" "}
              has been successfully placed and received by our dispatch team.
            </p>

            {/* Notification alert */}
            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-left space-y-2">
              <p className="font-semibold text-foreground flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary" />
                Confirmation Call & WhatsApp Notice
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our representative will contact your phone{" "}
                <strong className="text-foreground font-medium">
                  {orderSummaryData.phone}
                </strong>{" "}
                before shipping. You will also receive SMS and WhatsApp tracking as soon as the package is handed over to our delivery partner.
              </p>
            </div>

            {/* Order snapshot summary */}
            <div className="mt-6 rounded-xl border border-border/70 bg-secondary/30 p-5 text-left text-xs space-y-3">
              <div className="flex justify-between border-b border-border/40 pb-2.5">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="font-medium text-foreground">{orderSummaryData.date}</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2.5">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-medium text-foreground capitalize">
                  {orderSummaryData.payment === "cod"
                    ? "Cash on Delivery (COD)"
                    : orderSummaryData.payment === "bkash"
                      ? "bKash Mobile Payment"
                      : orderSummaryData.payment === "nagad"
                        ? "Nagad Mobile Payment"
                        : "Debit / Credit Card"}
                </span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2.5">
                <span className="text-muted-foreground">Delivery Timeline:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {estimatedDelivery}
                </span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2.5">
                <span className="text-muted-foreground">Delivery Destination:</span>
                <span className="font-medium text-foreground text-right max-w-[280px]">
                  {orderSummaryData.address}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-semibold">
                <span>Total Amount Paid / Payable:</span>
                <span className="font-display text-base text-primary">
                  {formatBDT(orderSummaryData.total)}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/8801700000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-bold text-white hover:bg-[#20ba59] transition-all shadow-sm"
              >
                <MessageSquare className="h-4 w-4" />
                Notify on WhatsApp
              </a>

              <Button asChild variant="outline" className="w-full sm:w-auto rounded-full px-6">
                <Link to="/track">Track Package Status</Link>
              </Button>

              <Button asChild className="w-full sm:w-auto rounded-full px-6">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ==========================================
  // VIEW: Active Checkout Form
  // ==========================================
  return (
    <Layout>
      {/* Checkout Trust & Progress Header */}
      <div className="border-b border-border/50 bg-secondary/30">
        <div className="container-lux py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
            {/* Progress breadcrumbs */}
            <nav aria-label="Checkout steps" className="flex items-center gap-2 font-medium">
              <Link to="/cart" className="hover:text-primary transition-colors">
                Shopping Bag
              </Link>
              <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
              <span className="text-primary font-semibold flex items-center gap-1.5">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                  2
                </span>
                Shipping & Payment
              </span>
              <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
              <span className="text-muted-foreground/50">Order Complete</span>
            </nav>

            {/* Trust pill */}
            <div className="flex items-center gap-4 text-[11px] font-medium">
              <span className="flex items-center gap-1.5 text-foreground">
                <Lock className="h-3.5 w-3.5 text-primary" />
                256-Bit SSL Encrypted
              </span>
              <span className="hidden md:inline text-muted-foreground/40">•</span>
              <span className="hidden md:flex items-center gap-1.5 text-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                100% Genuine Japanese Formulas
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-lux py-8 sm:py-12">
        <h1 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
          Checkout & Dispatch
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Express shipping from Tokyo & Dhaka central warehouse. Cash on Delivery & bKash available nationwide.
        </p>

        {lines.length === 0 ? (
          <div className="mt-10 rounded-xl border border-border/80 bg-card p-12 text-center max-w-lg mx-auto space-y-4">
            <p className="font-display text-2xl font-medium">Your shopping bag is empty</p>
            <p className="text-xs text-muted-foreground">
              Please add at least one Japanese skincare product to proceed with checkout.
            </p>
            <Button asChild className="rounded-full px-8">
              <Link to="/shop">Explore Skincare Shop</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="mt-8 grid gap-10 lg:grid-cols-12 items-start">
            {/* Left 7 Columns: Checkout Details Form */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Contact Information */}
              <section className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      1
                    </span>
                    <h2 className="font-display text-lg sm:text-xl font-medium">
                      Contact Information
                    </h2>
                  </div>
                  {!user && (
                    <Link to="/auth" className="text-xs text-primary hover:underline font-medium">
                      Sign in for faster checkout
                    </Link>
                  )}
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="fullname" className="text-xs font-semibold">
                      Full Name <span className="text-rose">*</span>
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="fullname"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Farhana Yasmin"
                        className="rounded-full pl-9 text-xs"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-xs font-semibold">
                      Mobile Number <span className="text-rose">*</span>
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="phone"
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="rounded-full pl-9 text-xs"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <p className="mt-1 text-[10.5px] text-muted-foreground">
                      We will call you for order confirmation before dispatch.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="altPhone" className="text-xs font-semibold">
                      Alternative Phone (Optional)
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="altPhone"
                        type="tel"
                        value={altPhone}
                        onChange={(e) => setAltPhone(e.target.value)}
                        placeholder="018XXXXXXXX"
                        className="rounded-full pl-9 text-xs"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <p className="mt-1 text-[10.5px] text-muted-foreground">
                      In case your primary number is busy during delivery.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="email" className="text-xs font-semibold">
                      Email Address (Optional)
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com (for invoices & tracking)"
                        className="rounded-full pl-9 text-xs"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Step 2: Delivery Location & Address (Bangladesh Specific) */}
              <section className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 border-b border-border/50 pb-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    2
                  </span>
                  <h2 className="font-display text-lg sm:text-xl font-medium">
                    Shipping & Delivery Destination
                  </h2>
                </div>

                {/* Delivery Zone Selector */}
                <div className="mt-5">
                  <Label className="text-xs font-semibold">
                    Select Delivery Zone <span className="text-rose">*</span>
                  </Label>
                  <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
                    <label
                      onClick={() => setZone("dhaka_metro")}
                      className={cn(
                        "cursor-pointer rounded-xl border p-3.5 transition-all flex flex-col justify-between",
                        zone === "dhaka_metro"
                          ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                          : "border-border hover:border-primary/50 bg-secondary/20",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-foreground">Inside Dhaka</span>
                        <input
                          type="radio"
                          name="zone"
                          checked={zone === "dhaka_metro"}
                          onChange={() => setZone("dhaka_metro")}
                          className="text-primary focus:ring-0"
                        />
                      </div>
                      <div className="mt-2">
                        <span className="text-xs font-bold text-primary">
                          {subtotal >= 5000 || appliedCoupon === "FREESHIP" ? "FREE" : "৳80"}
                        </span>
                        <p className="text-[10.5px] text-muted-foreground">24–48 Hours</p>
                      </div>
                    </label>

                    <label
                      onClick={() => setZone("dhaka_suburbs")}
                      className={cn(
                        "cursor-pointer rounded-xl border p-3.5 transition-all flex flex-col justify-between",
                        zone === "dhaka_suburbs"
                          ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                          : "border-border hover:border-primary/50 bg-secondary/20",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-foreground">Dhaka Suburbs</span>
                        <input
                          type="radio"
                          name="zone"
                          checked={zone === "dhaka_suburbs"}
                          onChange={() => setZone("dhaka_suburbs")}
                          className="text-primary focus:ring-0"
                        />
                      </div>
                      <div className="mt-2">
                        <span className="text-xs font-bold text-primary">
                          {subtotal >= 5000 || appliedCoupon === "FREESHIP" ? "FREE" : "৳100"}
                        </span>
                        <p className="text-[10.5px] text-muted-foreground">Gazipur, Savar, N.ganj</p>
                      </div>
                    </label>

                    <label
                      onClick={() => setZone("outside_dhaka")}
                      className={cn(
                        "cursor-pointer rounded-xl border p-3.5 transition-all flex flex-col justify-between",
                        zone === "outside_dhaka"
                          ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                          : "border-border hover:border-primary/50 bg-secondary/20",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-foreground">Outside Dhaka</span>
                        <input
                          type="radio"
                          name="zone"
                          checked={zone === "outside_dhaka"}
                          onChange={() => setZone("outside_dhaka")}
                          className="text-primary focus:ring-0"
                        />
                      </div>
                      <div className="mt-2">
                        <span className="text-xs font-bold text-primary">
                          {subtotal >= 5000 || appliedCoupon === "FREESHIP" ? "FREE" : "৳130"}
                        </span>
                        <p className="text-[10.5px] text-muted-foreground">All 64 Districts</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Division & District Inputs */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="division" className="text-xs font-semibold">
                      Division <span className="text-rose">*</span>
                    </Label>
                    <select
                      id="division"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="mt-1.5 w-full rounded-full border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {BD_DIVISIONS.map((d) => (
                        <option key={d} value={d}>
                          {d} Division
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="district" className="text-xs font-semibold">
                      District / City <span className="text-rose">*</span>
                    </Label>
                    <Input
                      id="district"
                      required
                      value={cityDistrict}
                      onChange={(e) => setCityDistrict(e.target.value)}
                      placeholder="e.g. Dhaka, Chattogram, Sylhet"
                      className="mt-1.5 rounded-full text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="area" className="text-xs font-semibold">
                      Thana / Area <span className="text-rose">*</span>
                    </Label>
                    <Input
                      id="area"
                      required
                      list="dhaka-areas"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. Dhanmondi, Gulshan, Uttara, Halishahar"
                      className="mt-1.5 rounded-full text-xs"
                    />
                    <datalist id="dhaka-areas">
                      {POPULAR_DHAKA_AREAS.map((a) => (
                        <option key={a} value={a} />
                      ))}
                    </datalist>
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="address" className="text-xs font-semibold">
                      Street Address & House Details <span className="text-rose">*</span>
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="address"
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="House no, Road no, Flat / Floor no, Block / Sector"
                        className="rounded-full pl-9 text-xs"
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="notes" className="text-xs font-semibold">
                      Special Delivery Instructions (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      rows={2}
                      value={deliveryNote}
                      onChange={(e) => setDeliveryNote(e.target.value)}
                      placeholder="e.g. Call before coming, Leave with building security reception..."
                      className="mt-1.5 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </section>

              {/* Step 3: Payment Options (Bangladesh Tailored) */}
              <section className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 border-b border-border/50 pb-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    3
                  </span>
                  <h2 className="font-display text-lg sm:text-xl font-medium">
                    Payment Method
                  </h2>
                </div>

                <RadioGroup
                  value={payment}
                  onValueChange={(v) => setPayment(v as PaymentMethod)}
                  className="mt-5 grid gap-3"
                >
                  {/* Option 1: Cash on Delivery */}
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
                      payment === "cod"
                        ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <RadioGroupItem value="cod" id="cod" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                          <Banknote className="h-4 w-4 text-primary" />
                          Cash on Delivery (COD)
                        </span>
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          Recommended
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        Pay in cash or bKash when courier hands over your sealed Japanese skincare parcel. You can inspect the outer packaging before payment.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: bKash */}
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
                      payment === "bkash"
                        ? "border-[#E2136E] bg-[#E2136E]/10 ring-1 ring-[#E2136E]/30"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <RadioGroupItem value="bkash" id="bkash" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-[#E2136E]" />
                          bKash Mobile Payment
                        </span>
                        <span className="rounded-full bg-[#E2136E]/15 px-2 py-0.5 text-[10px] font-bold text-[#E2136E]">
                          Fast MFS
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        Send payment directly from your bKash app to our verified Merchant / Personal account.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Nagad */}
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
                      payment === "nagad"
                        ? "border-[#F7941D] bg-[#F7941D]/10 ring-1 ring-[#F7941D]/30"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <RadioGroupItem value="nagad" id="nagad" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-[#F7941D]" />
                          Nagad Mobile Payment
                        </span>
                        <span className="rounded-full bg-[#F7941D]/15 px-2 py-0.5 text-[10px] font-bold text-[#F7941D]">
                          0% Fee
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        Pay using your Nagad account for seamless instant confirmation.
                      </p>
                    </div>
                  </label>

                  {/* Option 4: Debit / Credit Card */}
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
                      payment === "card"
                        ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <RadioGroupItem value="card" id="card" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-primary" />
                          Debit / Credit Card / Internet Banking
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground">
                          Visa · Master · AMEX
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        Pay securely with your Bangladeshi or international card via SSLCommerz gateway.
                      </p>
                    </div>
                  </label>
                </RadioGroup>

                {/* bKash Payment Instructions & Input Fields */}
                {payment === "bkash" && (
                  <div className="mt-4 rounded-xl border border-[#E2136E]/30 bg-[#E2136E]/5 p-4 text-xs space-y-3">
                    <div className="flex items-center gap-2 font-semibold text-[#E2136E]">
                      <Sparkles className="h-4 w-4" />
                      bKash Payment Instructions
                    </div>
                    <ol className="list-decimal pl-4 space-y-1 text-muted-foreground leading-relaxed">
                      <li>Open your bKash app or dial <strong>*247#</strong>.</li>
                      <li>
                        Choose <strong>Send Money</strong> to Merchant/Personal number:{" "}
                        <strong className="text-foreground">01788-990011</strong>.
                      </li>
                      <li>
                        Enter Amount: <strong className="text-foreground">{formatBDT(grandTotal)}</strong>.
                      </li>
                      <li>Reference: <strong>GLORIOUS</strong>.</li>
                      <li>Enter your sender number and Transaction ID (TrxID) below:</li>
                    </ol>

                    <div className="grid gap-3 sm:grid-cols-2 pt-1">
                      <div>
                        <Label htmlFor="bkashPhone" className="text-[11px] font-semibold">
                          Your bKash Number <span className="text-rose">*</span>
                        </Label>
                        <Input
                          id="bkashPhone"
                          required
                          value={bkashPhone}
                          onChange={(e) => setBkashPhone(e.target.value)}
                          placeholder="017XXXXXXXX"
                          className="mt-1 h-9 rounded-full text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bkashTrx" className="text-[11px] font-semibold">
                          Transaction ID (TrxID) <span className="text-rose">*</span>
                        </Label>
                        <Input
                          id="bkashTrx"
                          required
                          value={bkashTrxId}
                          onChange={(e) => setBkashTrxId(e.target.value.toUpperCase())}
                          placeholder="e.g. BL9A8BC71D"
                          className="mt-1 h-9 rounded-full text-xs uppercase"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Nagad Payment Instructions & Input Fields */}
                {payment === "nagad" && (
                  <div className="mt-4 rounded-xl border border-[#F7941D]/30 bg-[#F7941D]/5 p-4 text-xs space-y-3">
                    <div className="flex items-center gap-2 font-semibold text-[#F7941D]">
                      <Sparkles className="h-4 w-4" />
                      Nagad Payment Instructions
                    </div>
                    <ol className="list-decimal pl-4 space-y-1 text-muted-foreground leading-relaxed">
                      <li>Open your Nagad app or dial <strong>*167#</strong>.</li>
                      <li>
                        Choose <strong>Send Money</strong> to number:{" "}
                        <strong className="text-foreground">01988-990022</strong>.
                      </li>
                      <li>
                        Enter Amount: <strong className="text-foreground">{formatBDT(grandTotal)}</strong>.
                      </li>
                      <li>Enter your sender number and Transaction ID below:</li>
                    </ol>

                    <div className="grid gap-3 sm:grid-cols-2 pt-1">
                      <div>
                        <Label htmlFor="nagadPhone" className="text-[11px] font-semibold">
                          Your Nagad Number <span className="text-rose">*</span>
                        </Label>
                        <Input
                          id="nagadPhone"
                          required
                          value={nagadPhone}
                          onChange={(e) => setNagadPhone(e.target.value)}
                          placeholder="019XXXXXXXX"
                          className="mt-1 h-9 rounded-full text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nagadTrx" className="text-[11px] font-semibold">
                          Nagad Transaction ID <span className="text-rose">*</span>
                        </Label>
                        <Input
                          id="nagadTrx"
                          required
                          value={nagadTrxId}
                          onChange={(e) => setNagadTrxId(e.target.value.toUpperCase())}
                          placeholder="e.g. 7X38AD2F"
                          className="mt-1 h-9 rounded-full text-xs uppercase"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Step 4: Japanese Gift Wrapping Add-on */}
              <section className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="gift"
                    checked={giftWrap}
                    onCheckedChange={(v) => setGiftWrap(Boolean(v))}
                    className="mt-0.5"
                  />
                  <div className="flex-1 text-xs">
                    <label htmlFor="gift" className="font-semibold text-foreground cursor-pointer flex items-center gap-1.5">
                      <Gift className="h-3.5 w-3.5 text-primary" />
                      Add Luxury Japanese Gift Wrapping & Card (+৳150)
                    </label>
                    <p className="mt-0.5 text-muted-foreground">
                      Presented in traditional Japanese washi gift wrap with a gold seal and handwritten personalized card.
                    </p>

                    {giftWrap && (
                      <div className="mt-3">
                        <Input
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          placeholder="Write your personal gift message for the card..."
                          className="rounded-full text-xs"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Right 5 Columns: Sticky Order Summary Sidebar */}
            <aside className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <h2 className="font-display text-xl font-medium">Order Summary</h2>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {lines.reduce((acc, l) => acc + l.qty, 0)} Items
                  </span>
                </div>

                {/* Free Delivery Threshold Progress */}
                <div className="mt-4 rounded-xl border border-border/60 bg-secondary/30 p-3 text-xs space-y-1.5">
                  <div className="flex justify-between items-center text-[11.5px]">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Truck className="h-3.5 w-3.5 text-primary" />
                      {subtotal >= 5000 || appliedCoupon === "FREESHIP"
                        ? "🎉 Free Nationwide Shipping Unlocked!"
                        : `Add ${formatBDT(amountToFreeShipping)} more for FREE Delivery`}
                    </span>
                    <span className="text-muted-foreground">{freeShippingProgress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${appliedCoupon === "FREESHIP" ? 100 : freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Line Items List with thumbnail & size */}
                <div className="mt-5 space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {lines.map(({ product, qty, size }) => (
                    <div key={product.slug} className="flex items-center gap-3 text-xs">
                      <Link
                        to="/product/$slug"
                        params={{ slug: product.slug }}
                        className="shrink-0 overflow-hidden rounded-md border border-border bg-cream"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="h-14 w-12 object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          to="/product/$slug"
                          params={{ slug: product.slug }}
                          className="font-display text-sm font-semibold text-foreground truncate block hover:text-primary transition-colors"
                        >
                          {product.name}
                        </Link>
                        <p className="text-[11px] text-muted-foreground">
                          {size} • Qty: {qty}
                        </p>
                      </div>

                      <span className="font-semibold text-foreground shrink-0 text-sm">
                        {formatBDT(product.price * qty)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Promo Code Input */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. GLORIOUS10)"
                      className="rounded-full text-xs h-9 uppercase"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleApplyCoupon}
                      className="rounded-full text-xs px-4 h-9 font-semibold shrink-0"
                    >
                      Apply
                    </Button>
                  </div>

                  {appliedCoupon && (
                    <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-700 dark:text-emerald-400">
                      <span>✓ {VALID_COUPONS[appliedCoupon]?.label}</span>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-[11px] font-semibold underline hover:opacity-80"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Price Breakdown */}
                <dl className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-foreground">{formatBDT(subtotal)}</dd>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                      <dt>Voucher Discount</dt>
                      <dd>-{formatBDT(couponDiscount)}</dd>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <dt className="flex items-center gap-1">
                      <span>Delivery Fee</span>
                      <span className="text-[10px] text-muted-foreground">
                        ({zone === "dhaka_metro" ? "Inside Dhaka" : zone === "dhaka_suburbs" ? "Dhaka Suburbs" : "Outside Dhaka"})
                      </span>
                    </dt>
                    <dd className="font-medium text-foreground">
                      {baseShippingFee === 0 ? (
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          FREE
                        </span>
                      ) : (
                        formatBDT(baseShippingFee)
                      )}
                    </dd>
                  </div>

                  {giftWrap && (
                    <div className="flex justify-between">
                      <dt>Japanese Gift Wrap</dt>
                      <dd className="font-medium text-foreground">{formatBDT(150)}</dd>
                    </div>
                  )}
                </dl>

                <Separator className="my-4" />

                {/* Grand Total */}
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-foreground">Total Payable:</span>
                  <span className="font-display text-2xl font-bold text-primary">
                    {formatBDT(grandTotal)}
                  </span>
                </div>

                <p className="mt-1 text-[10.5px] text-muted-foreground text-right">
                  Includes all VAT and Japanese customs tariffs.
                </p>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || lines.length === 0}
                  className="mt-5 w-full rounded-full py-6 text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Confirming Order...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Lock className="h-3.5 w-3.5" />
                      Place Order · {formatBDT(grandTotal)}
                    </span>
                  )}
                </Button>

                {/* Courier trust note */}
                <div className="mt-4 pt-3 border-t border-border/50 grid grid-cols-2 gap-2 text-[10.5px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Pathao / Steadfast</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>7-Day Return Policy</span>
                  </div>
                </div>
              </div>
            </aside>
          </form>
        )}
      </div>
    </Layout>
  );
}
