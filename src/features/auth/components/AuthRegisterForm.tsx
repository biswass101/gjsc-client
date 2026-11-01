"use client";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  RefreshCw,
  User as UserIcon,
} from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleIcon } from "./GoogleIcon";

export interface AuthRegisterFormProps {
  regName: string;
  onRegNameChange: (val: string) => void;
  regEmail: string;
  onRegEmailChange: (val: string) => void;
  regPhone: string;
  onRegPhoneChange: (val: string) => void;
  regPass: string;
  onRegPassChange: (val: string) => void;
  showRegPass: boolean;
  onToggleShowRegPass: () => void;
  newsletter: boolean;
  onNewsletterChange: (val: boolean) => void;
  isLoading: boolean;
  isGoogleLoading: boolean;
  onOpenGoogleModal: () => void;
  onSwitchToLogin: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AuthRegisterForm({
  regName,
  onRegNameChange,
  regEmail,
  onRegEmailChange,
  regPhone,
  onRegPhoneChange,
  regPass,
  onRegPassChange,
  showRegPass,
  onToggleShowRegPass,
  newsletter,
  onNewsletterChange,
  isLoading,
  isGoogleLoading,
  onOpenGoogleModal,
  onSwitchToLogin,
  onSubmit,
}: AuthRegisterFormProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-2xl font-medium tracking-tight">Create Member Account</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Join Glorious Japan Club for member-only pricing and rewards.
        </p>
      </div>

      {/* Google OAuth Quick Button */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          onClick={onOpenGoogleModal}
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

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="reg-name" className="text-xs font-semibold">
            Full Name <span className="text-rose">*</span>
          </Label>
          <div className="relative mt-1.5">
            <Input
              id="reg-name"
              required
              value={regName}
              onChange={(e) => onRegNameChange(e.target.value)}
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
              onChange={(e) => onRegEmailChange(e.target.value)}
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
              onChange={(e) => onRegPhoneChange(e.target.value)}
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
              onChange={(e) => onRegPassChange(e.target.value)}
              placeholder="Minimum 6 characters"
              className="rounded-full pl-9 pr-10 text-xs h-10"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <button
              type="button"
              onClick={onToggleShowRegPass}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
            >
              {showRegPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <div className="flex items-start space-x-2 pt-1">
          <Checkbox
            id="newsletter"
            checked={newsletter}
            onCheckedChange={(v) => onNewsletterChange(Boolean(v))}
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
            onClick={onSwitchToLogin}
            className="font-semibold text-primary hover:underline cursor-pointer"
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
        </Link>
        .
      </p>
    </div>
  );
}
