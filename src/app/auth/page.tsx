"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
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

function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

const GOOGLE_ACCOUNTS = [
  {
    name: "Nusrat Jahan",
    email: "nusrat.jahan.tokyo@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Naeem Biswas",
    email: "naeem.biswas@gmail.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, login, loginWithGoogle, logout, wishlist } = useShop();

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

  // Google OAuth State
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  const [isCustomGoogleOpen, setIsCustomGoogleOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSelectGoogleAccount = (acc: { name: string; email: string; avatar: string }) => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      loginWithGoogle(acc);
      setIsGoogleLoading(false);
      setIsGoogleModalOpen(false);
      toast.success(`Connected with Google as ${acc.name}!`, {
        description: `Signed in with ${acc.email}`,
      });
      navigate({ to: "/account" });
    }, 450);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail) return;
    setIsGoogleLoading(true);
    setTimeout(() => {
      const namePart = customGoogleEmail.split("@")[0] ?? "Google User";
      const name = namePart.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      loginWithGoogle({
        name,
        email: customGoogleEmail,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      });
      setIsGoogleLoading(false);
      setIsGoogleModalOpen(false);
      setIsCustomGoogleOpen(false);
      toast.success(`Connected with Google as ${name}!`, {
        description: `Signed in with ${customGoogleEmail}`,
      });
      navigate({ to: "/account" });
    }, 450);
  };

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
          <div className="mx-auto max-w-2xl rounded-xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm text-center">
            {/* User Avatar */}
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="mx-auto h-20 w-20 rounded-full object-cover border-2 border-primary/30 shadow-xs"
              />
            ) : (
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-primary/30 bg-primary/10 text-primary font-display text-2xl font-bold shadow-xs">
                {initials || "GJ"}
              </div>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
              <span className="eyebrow text-primary">Member Portal</span>
              <span className="text-muted-foreground/40">•</span>
              {user.authProvider === "google" && (
                <>
                  <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <GoogleIcon className="h-2.5 w-2.5" /> Google Account
                  </span>
                  <span className="text-muted-foreground/40">•</span>
                </>
              )}
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
        <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm grid lg:grid-cols-12">
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
            <div className="mt-8 rounded-lg border border-border/70 bg-background/80 p-4 backdrop-blur-xs">
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

                  {/* Google OAuth Quick Button */}
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsGoogleModalOpen(true)}
                      disabled={isLoading || isGoogleLoading}
                      className="w-full rounded-full py-5 text-xs font-semibold border-border/80 bg-background hover:bg-secondary/60 transition-all flex items-center justify-center gap-2.5 shadow-2xs hover:border-primary/40 cursor-pointer"
                    >
                      <GoogleIcon className="h-4 w-4" />
                      <span>Continue with Google</span>
                    </Button>

                    <div className="relative my-2 text-center">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border/60" />
                      </div>
                      <span className="relative bg-card px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Or with email & password
                      </span>
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

                  {/* Google OAuth Quick Button */}
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsGoogleModalOpen(true)}
                      disabled={isLoading || isGoogleLoading}
                      className="w-full rounded-full py-5 text-xs font-semibold border-border/80 bg-background hover:bg-secondary/60 transition-all flex items-center justify-center gap-2.5 shadow-2xs hover:border-primary/40 cursor-pointer"
                    >
                      <GoogleIcon className="h-4 w-4" />
                      <span>Sign Up with Google</span>
                    </Button>

                    <div className="relative my-2 text-center">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border/60" />
                      </div>
                      <span className="relative bg-card px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Or create with email
                      </span>
                    </div>
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

      {/* Google Account OAuth Dialog */}
      <Dialog open={isGoogleModalOpen} onOpenChange={setIsGoogleModalOpen}>
        <DialogContent className="sm:max-w-md rounded-xl p-6">
          <DialogHeader className="text-center sm:text-center pb-2">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-secondary/80 mb-2 border border-border/80">
              <GoogleIcon className="h-6 w-6" />
            </div>
            <DialogTitle className="font-display text-xl font-medium">
              Sign in with Google
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Choose an account to continue to <strong>Glorious Japan Skin Care</strong>
            </DialogDescription>
          </DialogHeader>

          {isGoogleLoading ? (
            <div className="py-10 text-center space-y-3">
              <RefreshCw className="h-7 w-7 animate-spin text-primary mx-auto" />
              <p className="text-xs font-semibold text-foreground">
                Connecting to Google securely...
              </p>
              <p className="text-[11px] text-muted-foreground">
                Authenticating credentials with Google Identity Services.
              </p>
            </div>
          ) : isCustomGoogleOpen ? (
            <form onSubmit={handleCustomGoogleSubmit} className="mt-3 space-y-4">
              <div>
                <Label htmlFor="custom-google-email" className="text-xs font-semibold">
                  Google Account Email
                </Label>
                <div className="relative mt-1.5">
                  <Input
                    id="custom-google-email"
                    type="email"
                    required
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="rounded-full pl-9 text-xs h-10"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => setIsCustomGoogleOpen(false)}
                >
                  ← Back to accounts
                </Button>
                <Button type="submit" size="sm" className="rounded-full text-xs px-5">
                  Sign in
                </Button>
              </div>
            </form>
          ) : (
            <div className="mt-3 space-y-2">
              {GOOGLE_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectGoogleAccount(acc)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/70 bg-card hover:bg-secondary/40 hover:border-primary/40 transition-all text-left group cursor-pointer"
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="h-9 w-9 rounded-full object-cover border border-border shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      {acc.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">{acc.email}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}

              <button
                type="button"
                onClick={() => setIsCustomGoogleOpen(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-border hover:border-primary/50 hover:bg-secondary/20 transition-all text-left text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary/80 shrink-0">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <span>Use another Google account</span>
              </button>

              <div className="pt-3 text-center">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  To continue, Google will share your name, email address, language preference, and
                  profile picture with Glorious Japan.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
