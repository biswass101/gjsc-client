"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  EyeOff,
  Gift,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  Package,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "@/lib/navigation";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useShop } from "@/context";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, login, logout, wishlist } = useShop();

  // Tab State
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Login Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPass, setRegPass] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  // Password Reset Dialog
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPass) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const u = login(loginEmail, loginPass);
      setIsLoading(false);
      toast.success(`Welcome back, ${u.name}!`, {
        description: u.role === "admin" ? "Logged in as Administrator." : "Welcome back to your Japanese beauty sanctuary.",
      });

      if (u.role === "admin") {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/account" });
      }
    }, 400);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regPass) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Phone validation for Bangladesh numbers
    const cleanPhone = regPhone.replace(/[\s-]/g, "");
    if (cleanPhone && !/^01[3-9]\d{8}$/.test(cleanPhone)) {
      toast.error("Invalid Bangladeshi mobile number", {
        description: "Please enter a valid 11-digit mobile number (e.g. 017XXXXXXXX).",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const u = login(regEmail, regPass);
      setIsLoading(false);
      toast.success(`Account created! Welcome, ${regName || u.name}`, {
        description: "You've received 500 Welcome Ritual Points in your account.",
      });
      navigate({ to: "/account" });
    }, 400);
  };

  const handleLogout = () => {
    logout();
    toast.info("Signed out successfully", {
      description: "We look forward to seeing you again.",
    });
  };

  const handleFillDemo = (type: "customer" | "admin") => {
    if (type === "customer") {
      setLoginEmail("nusrat.jahan@gmail.com");
      setLoginPass("sakura2026");
      toast.info("Customer credentials loaded");
    } else {
      setLoginEmail("admin@gloriousjapan.com");
      setLoginPass("adminPass2026");
      toast.info("Admin credentials loaded");
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSent(true);
    toast.success("Password reset instructions sent!", {
      description: `A recovery link has been sent to ${resetEmail}.`,
    });
  };

  // ==========================================
  // VIEW: Logged-In User Profile Hub
  // ==========================================
  if (user) {
    const initials = user.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <Layout>
        <div className="container-lux py-12 sm:py-20">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm text-center">
            {/* User Avatar */}
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-primary/30 bg-primary/10 text-primary font-display text-2xl font-bold shadow-xs">
              {initials || "GJ"}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="eyebrow text-primary">Member Portal</span>
              <span className="text-muted-foreground/40">•</span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  user.role === "admin"
                    ? "bg-purple-500/15 text-purple-700 dark:text-purple-300"
                    : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
                )}
              >
                {user.role === "admin" ? "🛡️ Verified Admin" : "🌸 VIP Ritual Member"}
              </span>
            </div>

            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
              Welcome Back, {user.name}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{user.email}</p>

            {/* Quick Balance / Stats Grid */}
            <div className="mt-8 grid grid-cols-3 gap-3 text-left">
              <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  Ritual Points
                </span>
                <p className="mt-1 text-lg font-bold text-foreground">500 Pts</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Worth ৳200
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Package className="h-3 w-3 text-primary" />
                  Active Orders
                </span>
                <p className="mt-1 text-lg font-bold text-foreground">1 Active</p>
                <Link to="/track" className="text-[10px] text-primary hover:underline font-medium">
                  Track parcel →
                </Link>
              </div>

              <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 text-primary" />
                  Saved Wishlist
                </span>
                <p className="mt-1 text-lg font-bold text-foreground">{wishlist.length} Items</p>
                <Link to="/wishlist" className="text-[10px] text-primary hover:underline font-medium">
                  View saved →
                </Link>
              </div>
            </div>

            {/* Quick Action Navigation Links */}
            <div className="mt-8 space-y-2.5">
              {user.role === "admin" && (
                <Button
                  asChild
                  className="w-full rounded-full py-6 text-xs uppercase tracking-[0.2em] font-bold shadow-sm"
                >
                  <Link to="/admin">Go to Administrator Dashboard</Link>
                </Button>
              )}

              <Button
                asChild
                variant="outline"
                className="w-full rounded-full py-6 text-xs uppercase tracking-[0.2em] font-semibold"
              >
                <Link to="/account">View Account & Order History</Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                className="w-full rounded-full py-5 text-xs uppercase tracking-[0.2em] font-semibold"
              >
                <Link to="/shop">Browse Japanese Skincare Catalog</Link>
              </Button>

              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full rounded-full text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-rose hover:bg-rose/5 gap-2 mt-2"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out of Account
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ==========================================
  // VIEW: Guest Auth Screen (Dual Column Luxury)
  // ==========================================
  return (
    <Layout>
      <div className="container-lux py-10 sm:py-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm grid lg:grid-cols-12">
          {/* Left Column: Luxury J-Beauty Branding & Membership Perks (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-cream via-secondary/20 to-cream p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border/60">
            <div className="space-y-6">
              {/* Brand Logo & Kanji Stamp */}
              <div className="flex items-center gap-3">
                <img
                  src="/glorious-japan-skin-care-logo.jpeg"
                  alt="Glorious Japan"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-contain border border-border/70 shadow-xs"
                />
                <div>
                  <span className="font-display text-lg font-bold tracking-tight text-foreground block">
                    Glorious Japan
                  </span>
                  <span className="text-[10px] tracking-widest text-muted-foreground uppercase font-serif">
                    東京 · Authentic J-Beauty
                  </span>
                </div>
              </div>

              <div>
                <span className="eyebrow text-primary">Member Experience</span>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                  Elevate Your Daily Skincare Ritual
                </h2>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Join thousands of skincare connoisseurs across Bangladesh receiving authentic fermented Japanese formulations direct from Tokyo.
                </p>
              </div>

              {/* VIP Member Perks */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground">
                      500 Welcome Ritual Points
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Instantly receive ৳200 voucher credit towards your first purchase.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Gift className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground">
                      Complimentary Tokyo Samples
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Deluxe essence and sunscreen minis included with every member parcel.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground">
                      Priority 24h VIP Dispatch
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Express Dhaka delivery and instant order tracking updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof Testimonial Card */}
            <div className="mt-8 rounded-2xl border border-border/70 bg-background/80 p-4 backdrop-blur-xs">
              <div className="flex items-center gap-1 text-amber-500 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground italic leading-relaxed">
                “The only authentic source in Dhaka where I can trust the Tokyo batch codes. My skin barrier has never been calmer.”
              </p>
              <p className="mt-2 text-[10px] font-bold text-foreground uppercase tracking-wider">
                — Mehjabin T. · Verified VIP Member
              </p>
            </div>
          </div>

          {/* Right Column: Clean Authentication Tabs & Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Tab Switcher */}
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as "login" | "register")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 rounded-full border border-border/60 bg-secondary/40 p-1">
                  <TabsTrigger
                    value="login"
                    className="rounded-full text-xs font-semibold uppercase tracking-wider py-2"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="rounded-full text-xs font-semibold uppercase tracking-wider py-2"
                  >
                    Create Account
                  </TabsTrigger>
                </TabsList>

                {/* SIGN IN TAB */}
                <TabsContent value="login" className="mt-6 space-y-5">
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-tight">
                      Welcome Back
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Access your saved skincare rituals, order history, and points.
                    </p>
                  </div>

                  {/* One-Click Demo Credentials Chip Bar */}
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                      <KeyRound className="h-3.5 w-3.5 text-primary" />
                      Quick Testing Demos:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleFillDemo("customer")}
                        className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10.5px] font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        Customer
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFillDemo("admin")}
                        className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10.5px] font-medium text-purple-600 dark:text-purple-400 hover:border-purple-500 transition-colors"
                      >
                        Admin Panel
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="signin-email" className="text-xs font-semibold">
                        Email Address
                      </Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="signin-email"
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="rounded-full pl-9 text-xs h-10"
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password" className="text-xs font-semibold">
                          Password
                        </Label>
                        <button
                          type="button"
                          onClick={() => setIsResetOpen(true)}
                          className="text-[11px] font-medium text-primary hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <div className="relative mt-1.5">
                        <Input
                          id="signin-password"
                          type={showLoginPass ? "text" : "password"}
                          required
                          value={loginPass}
                          onChange={(e) => setLoginPass(e.target.value)}
                          placeholder="••••••••"
                          className="rounded-full pl-9 pr-10 text-xs h-10"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <button
                          type="button"
                          onClick={() => setShowLoginPass(!showLoginPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                        >
                          {showLoginPass ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(v) => setRememberMe(Boolean(v))}
                      />
                      <label
                        htmlFor="remember"
                        className="text-xs text-muted-foreground cursor-pointer font-medium"
                      >
                        Keep me signed in on this browser
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-full py-6 text-xs uppercase tracking-[0.2em] font-bold shadow-sm"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Verifying...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Sign In to Ritual
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </Button>
                  </form>

                  <div className="text-center pt-2">
                    <p className="text-xs text-muted-foreground">
                      Don't have an account yet?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("register")}
                        className="font-semibold text-primary hover:underline"
                      >
                        Create an account for 500 Pts
                      </button>
                    </p>
                  </div>
                </TabsContent>

                {/* CREATE ACCOUNT TAB */}
                <TabsContent value="register" className="mt-6 space-y-5">
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-tight">
                      Create Member Account
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Join Glorious Japan Club for member-only pricing and rewards.
                    </p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="reg-name" className="text-xs font-semibold">
                        Full Name <span className="text-rose">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="reg-name"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="e.g. Nusrat Jahan"
                          className="rounded-full pl-9 text-xs h-10"
                        />
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reg-email" className="text-xs font-semibold">
                        Email Address <span className="text-rose">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="reg-email"
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="rounded-full pl-9 text-xs h-10"
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reg-phone" className="text-xs font-semibold">
                        Mobile Number (Bangladesh)
                      </Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="reg-phone"
                          type="tel"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="017XXXXXXXX"
                          className="rounded-full pl-9 text-xs h-10"
                        />
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <p className="mt-1 text-[10.5px] text-muted-foreground">
                        Used for fast order tracking and courier dispatch alerts.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="reg-password" className="text-xs font-semibold">
                        Create Password <span className="text-rose">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="reg-password"
                          type={showRegPass ? "text" : "password"}
                          required
                          minLength={6}
                          value={regPass}
                          onChange={(e) => setRegPass(e.target.value)}
                          placeholder="Minimum 6 characters"
                          className="rounded-full pl-9 pr-10 text-xs h-10"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <button
                          type="button"
                          onClick={() => setShowRegPass(!showRegPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                        >
                          {showRegPass ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 pt-1">
                      <Checkbox
                        id="newsletter"
                        checked={newsletter}
                        onCheckedChange={(v) => setNewsletter(Boolean(v))}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor="newsletter"
                        className="text-xs text-muted-foreground cursor-pointer leading-tight"
                      >
                        Send me exclusive Japanese skincare advice, new Tokyo launches & VIP discounts.
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-full py-6 text-xs uppercase tracking-[0.2em] font-bold shadow-sm"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Creating Account...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Create Account & Claim 500 Pts
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </Button>
                  </form>

                  <div className="text-center pt-2">
                    <p className="text-xs text-muted-foreground">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("login")}
                        className="font-semibold text-primary hover:underline"
                      >
                        Sign in here
                      </button>
                    </p>
                  </div>

                  <p className="text-[11px] text-muted-foreground text-center">
                    By registering, you agree to Glorious Japan's{" "}
                    <Link to="/terms" className="underline hover:text-primary">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="underline hover:text-primary">
                      Privacy Policy
                    </Link>.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={isResetOpen} onOpenChange={setIsResetOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Reset Your Password</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Enter the email address associated with your account, and we will send you a secure link to reset your password.
            </DialogDescription>
          </DialogHeader>

          {resetSent ? (
            <div className="py-6 text-center space-y-3">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
                <Check className="h-6 w-6 stroke-[2.5]" />
              </div>
              <h4 className="font-semibold text-sm">Check Your Email</h4>
              <p className="text-xs text-muted-foreground">
                We've sent recovery instructions to <strong>{resetEmail}</strong>.
              </p>
              <Button
                type="button"
                className="rounded-full text-xs mt-3"
                onClick={() => {
                  setIsResetOpen(false);
                  setResetSent(false);
                  setResetEmail("");
                }}
              >
                Return to Sign In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="mt-4 space-y-4">
              <div>
                <Label htmlFor="reset-email" className="text-xs font-semibold">
                  Registered Email Address
                </Label>
                <div className="relative mt-1.5">
                  <Input
                    id="reset-email"
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="rounded-full pl-9 text-xs h-10"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full text-xs"
                  onClick={() => setIsResetOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="rounded-full text-xs px-6">
                  Send Reset Link
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
