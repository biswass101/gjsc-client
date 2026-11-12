"use client";

import { CheckCircle2, KeyRound, Link2, Mail, PlusCircle, RefreshCw, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/features/auth/components/GoogleIcon";
import { FacebookIcon } from "@/features/auth/components/FacebookIcon";
import type { AuthProviderName, User } from "@/types";

export interface AccountConnectedAccountsProps {
  user: User;
  isConnectingGoogle?: boolean | undefined;
  isConnectingFacebook?: boolean | undefined;
  onConnectGoogle: () => void;
  onConnectFacebook: () => void;
  onSetPasswordClick?: (() => void) | undefined;
}

function resolveLinkedProviders(user: User): AuthProviderName[] {
  if (Array.isArray(user.linkedProviders) && user.linkedProviders.length > 0) {
    return user.linkedProviders;
  }
  const derived: AuthProviderName[] = [];
  if (user.hasPassword) derived.push("email");
  if (user.authProvider && !derived.includes(user.authProvider)) {
    derived.push(user.authProvider);
  }
  return derived;
}

export function AccountConnectedAccounts({
  user,
  isConnectingGoogle,
  isConnectingFacebook,
  onConnectGoogle,
  onConnectFacebook,
  onSetPasswordClick,
}: AccountConnectedAccountsProps) {
  const linked = resolveLinkedProviders(user);
  const hasGoogle = linked.includes("google") || user.authProvider === "google";
  const hasFacebook = linked.includes("facebook") || user.authProvider === "facebook";
  const hasEmailPassword = linked.includes("email") || Boolean(user.hasPassword);

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
      <div className="border-b border-border/40 pb-3">
        <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
          <Link2 className="h-4 w-4 text-primary" />
          Connected Sign-In Methods
        </h3>
        <p className="text-[11px] text-muted-foreground mt-1">
          Every connected method signs you into this same Glorious Japan profile—keeping your orders,
          Sakura VIP tier, Ritual Points, and saved wishlist unified without duplicates.
        </p>
      </div>

      {user.isPlaceholderEmail && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
          <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="font-semibold">Meta did not share your email during Facebook login</p>
            <p className="text-[11px] opacity-90 mt-0.5">
              Connect your Google account below to verify your real email address and keep your profile
              automatically unified across devices.
            </p>
          </div>
        </div>
      )}

      <div className="divide-y divide-border/50 rounded-xl border border-border/60 bg-secondary/20">
        {/* Email & Password */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-background text-primary">
              <Mail className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground">Email & Password</p>
              <p className="text-[11px] text-muted-foreground truncate">
                {user.isPlaceholderEmail
                  ? "Waiting for verified email (Facebook email not shared)"
                  : user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasEmailPassword ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-3 w-3" />
                Connected
              </span>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onSetPasswordClick}
                className="rounded-full text-xs h-7 gap-1.5 cursor-pointer"
              >
                <KeyRound className="h-3 w-3" />
                Set Password Below
              </Button>
            )}
          </div>
        </div>

        {/* Google */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-background">
              <GoogleIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Google</p>
              <p className="text-[11px] text-muted-foreground">
                {hasGoogle
                  ? "Verified Google Sign-In is linked to this profile."
                  : "Sign in with Google using one click (works even with a different Gmail)."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasGoogle ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-3 w-3" />
                Connected
              </span>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isConnectingGoogle}
                onClick={onConnectGoogle}
                className="rounded-full text-xs h-7 gap-1.5 cursor-pointer"
              >
                {isConnectingGoogle ? (
                  <RefreshCw className="h-3 w-3 animate-spin" />
                ) : (
                  <PlusCircle className="h-3 w-3" />
                )}
                {isConnectingGoogle ? "Redirecting..." : "Connect Google"}
              </Button>
            )}
          </div>
        </div>

        {/* Facebook */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-background">
              <FacebookIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Facebook</p>
              <p className="text-[11px] text-muted-foreground">
                {hasFacebook
                  ? "Verified Facebook Login is linked to this profile."
                  : "Connect Facebook so signing in via Facebook always opens this exact account."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasFacebook ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-3 w-3" />
                Connected
              </span>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isConnectingFacebook}
                onClick={onConnectFacebook}
                className="rounded-full text-xs h-7 gap-1.5 cursor-pointer"
              >
                {isConnectingFacebook ? (
                  <RefreshCw className="h-3 w-3 animate-spin" />
                ) : (
                  <PlusCircle className="h-3 w-3" />
                )}
                {isConnectingFacebook ? "Redirecting..." : "Connect Facebook"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
