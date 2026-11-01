"use client";

import { ChevronRight, Mail, RefreshCw, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GoogleAccount } from "../types";
import { GOOGLE_ACCOUNTS } from "../data/authConstants";
import { GoogleIcon } from "./GoogleIcon";

export interface AuthGoogleModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
  isCustomGoogleOpen: boolean;
  onSetIsCustomGoogleOpen: (open: boolean) => void;
  customGoogleEmail: string;
  onCustomGoogleEmailChange: (val: string) => void;
  onSelectAccount: (acc: GoogleAccount) => void;
  onCustomGoogleSubmit: (e: React.FormEvent) => void;
}

export function AuthGoogleModal({
  isOpen,
  onOpenChange,
  isLoading,
  isCustomGoogleOpen,
  onSetIsCustomGoogleOpen,
  customGoogleEmail,
  onCustomGoogleEmailChange,
  onSelectAccount,
  onCustomGoogleSubmit,
}: AuthGoogleModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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

        {isLoading ? (
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
          <form onSubmit={onCustomGoogleSubmit} className="mt-3 space-y-4">
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
                  onChange={(e) => onCustomGoogleEmailChange(e.target.value)}
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
                className="rounded-full text-xs cursor-pointer"
                onClick={() => onSetIsCustomGoogleOpen(false)}
              >
                ← Back to accounts
              </Button>
              <Button type="submit" size="sm" className="rounded-full text-xs px-5 cursor-pointer">
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
                onClick={() => onSelectAccount(acc)}
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
              onClick={() => onSetIsCustomGoogleOpen(true)}
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
  );
}

