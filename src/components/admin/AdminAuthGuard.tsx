"use client";

import React, { useState } from "react";
import { Link } from "@/lib/navigation";
import {
  Lock,
  ShieldAlert,
  KeyRound,
  ArrowRight,
  Store,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShop } from "@/context/shop-context";
import { toast } from "sonner";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { user, isAuthLoading, login, logout } = useShop();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Initial Authentication Check State
  if (isAuthLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 shadow-inner">
            <Loader2 className="h-7 w-7 text-primary animate-spin" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
              Verifying Administrator Credentials
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Validating session tokens and role-based permissions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated as Admin -> Unlock Console
  if (user && user.role === "admin") {
    return <>{children}</>;
  }

  // 3. Authenticated but Customer Role -> Access Denied Gate
  if (user && user.role !== "admin") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background p-4 sm:p-6 selection:bg-primary/20">
        <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                Administrative Privileges Required
              </h2>
              <span className="inline-block mt-0.5 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                Unauthorized Role
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-secondary/30 p-3.5 space-y-1.5 text-xs text-muted-foreground">
            <p>
              You are currently signed in as:
            </p>
            <p className="font-semibold text-foreground font-mono text-xs">
              {user.email} <span className="text-[11px] font-normal text-muted-foreground">({user.role})</span>
            </p>
            <p className="text-[11px] pt-1">
              Your account does not possess administrator clearance to access the store management console.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                await logout();
                toast.info("Signed out. Please sign in with an administrator account.");
              }}
              className="w-full h-10 text-xs font-semibold"
            >
              Sign In with Another Account
            </Button>

            <Button asChild variant="ghost" className="w-full h-10 text-xs text-muted-foreground hover:text-foreground">
              <Link to="/">
                <Store className="h-3.5 w-3.5 mr-2" />
                Return to Storefront
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Unauthenticated -> Admin Sign-In Gate
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage("Please enter both administrator email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const authenticated = await login(email.trim(), password);
      if (authenticated.role !== "admin") {
        setErrorMessage("Account signed in, but does not have administrator clearance.");
      } else {
        toast.success(`Welcome to Admin Console, ${authenticated.name || "Administrator"}! 🌸`);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Invalid administrator credentials. Please check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail("admin@gloriousjapan.com");
    setPassword("AdminPassword123!");
    setErrorMessage(null);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 sm:p-6 selection:bg-primary/20">
      <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xl space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-xs">
            <Lock className="h-6 w-6" />
          </div>
          <span className="eyebrow text-[10px] tracking-[0.2em] text-primary/80 font-bold block">
            Security Perimeter
          </span>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Glorious Japan Admin Console
          </h1>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            Authorized personnel only. Enter administrator credentials to proceed.
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 rounded-xl border border-rose/30 bg-rose/10 p-3 text-xs text-rose">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="flex-1">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="admin-email" className="text-xs font-semibold">
              Admin Email
            </Label>
            <Input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gloriousjapan.com"
              required
              autoComplete="username"
              className="h-10 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="admin-password" className="text-xs font-semibold">
              Password
            </Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              autoComplete="current-password"
              className="h-10 text-xs"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 text-xs font-semibold shadow-xs"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Sign In to Admin Console
                <ArrowRight className="h-3.5 w-3.5 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Development Quick-Fill Helper */}
        {process.env.NODE_ENV !== "production" && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                <Sparkles className="h-3 w-3" />
                Dev Quick Credentials
              </span>
              <button
                type="button"
                onClick={handleFillDemoAdmin}
                className="text-[11px] font-semibold text-primary underline underline-offset-2 hover:opacity-80"
              >
                Auto-fill
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">
              admin@gloriousjapan.com • AdminPassword123!
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 text-center border-t border-border/60">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <Store className="h-3.5 w-3.5" />
            Return to Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

