"use client";

import { ArrowRight, Eye, EyeOff, KeyRound, Lock, Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleIcon } from "./GoogleIcon";
import { FacebookIcon } from "./FacebookIcon";

export interface AuthLoginFormProps {
  loginEmail: string;
  onLoginEmailChange: (val: string) => void;
  loginPass: string;
  onLoginPassChange: (val: string) => void;
  showLoginPass: boolean;
  onToggleShowLoginPass: () => void;
  rememberMe: boolean;
  onRememberMeChange: (val: boolean) => void;
  isLoading: boolean;
  isGoogleLoading: boolean;
  isFacebookLoading: boolean;
  onFillDemo: (type: "customer" | "admin") => void;
  onGoogleSignIn: () => void;
  onFacebookSignIn: () => void;
  onOpenResetPassword: () => void;
  onSwitchToRegister: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AuthLoginForm({
  loginEmail,
  onLoginEmailChange,
  loginPass,
  onLoginPassChange,
  showLoginPass,
  onToggleShowLoginPass,
  rememberMe,
  onRememberMeChange,
  isLoading,
  isGoogleLoading,
  isFacebookLoading,
  onFillDemo,
  onGoogleSignIn,
  onFacebookSignIn,
  onOpenResetPassword,
  onSwitchToRegister,
  onSubmit,
}: AuthLoginFormProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-2xl font-medium tracking-tight">Welcome Back</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Access your saved skincare rituals, order history, and points.
        </p>
      </div>

      {/* One-Click Demo Credentials Chip Bar (Development Only) */}
      {process.env.NODE_ENV !== "production" && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
            <KeyRound className="h-3.5 w-3.5 text-primary" />
            Quick Testing Demos:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onFillDemo("customer")}
              className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10.5px] font-medium text-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => onFillDemo("admin")}
              className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10.5px] font-medium text-purple-600 dark:text-purple-400 hover:border-purple-500 transition-colors cursor-pointer"
            >
              Admin Panel
            </button>
          </div>
        </div>
      )}

      {/* Social OAuth Buttons */}
      <div className="space-y-2.5">
        <Button
          type="button"
          variant="outline"
          onClick={onGoogleSignIn}
          disabled={isLoading || isGoogleLoading || isFacebookLoading}
          className="w-full rounded-full py-5 text-xs font-semibold border-border/80 bg-background hover:bg-secondary/60 transition-all flex items-center justify-center gap-2.5 shadow-2xs hover:border-primary/40 cursor-pointer"
        >
          {isGoogleLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <GoogleIcon className="h-4 w-4" />
          )}
          <span>{isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onFacebookSignIn}
          disabled={isLoading || isGoogleLoading || isFacebookLoading}
          className="w-full rounded-full py-5 text-xs font-semibold border-border/80 bg-background hover:bg-secondary/60 transition-all flex items-center justify-center gap-2.5 shadow-2xs hover:border-[#1877F2]/40 cursor-pointer"
        >
          {isFacebookLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin text-[#1877F2]" />
          ) : (
            <FacebookIcon className="h-4 w-4" />
          )}
          <span>{isFacebookLoading ? "Connecting to Facebook..." : "Continue with Facebook"}</span>
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

      <form onSubmit={onSubmit} className="space-y-4">
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
              onChange={(e) => onLoginEmailChange(e.target.value)}
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
              onClick={onOpenResetPassword}
              className="text-[11px] font-medium text-primary hover:underline cursor-pointer"
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
              onChange={(e) => onLoginPassChange(e.target.value)}
              placeholder="••••••••"
              className="rounded-full pl-9 pr-10 text-xs h-10"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <button
              type="button"
              onClick={onToggleShowLoginPass}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
            >
              {showLoginPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-1">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(v) => onRememberMeChange(Boolean(v))}
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
            onClick={onSwitchToRegister}
            className="font-semibold text-primary hover:underline cursor-pointer"
          >
            Create account & earn up to 500 Pts
          </button>
        </p>
      </div>
    </div>
  );
}
