"use client";

import { Check, Mail } from "lucide-react";
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

export interface AuthResetPasswordDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resetEmail: string;
  onResetEmailChange: (val: string) => void;
  resetSent: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AuthResetPasswordDialog({
  isOpen,
  onOpenChange,
  resetEmail,
  onResetEmailChange,
  resetSent,
  onClose,
  onSubmit,
}: AuthResetPasswordDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Reset Your Password</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            Enter the email address associated with your account, and we will send you a secure link
            to reset your password.
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
              className="rounded-full text-xs mt-3 cursor-pointer"
              onClick={onClose}
            >
              Return to Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
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
                  onChange={(e) => onResetEmailChange(e.target.value)}
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
                className="rounded-full text-xs cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="rounded-full text-xs px-6 cursor-pointer">
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
