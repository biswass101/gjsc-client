"use client";

import { Mail, Phone, User } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface CheckoutContactFormProps {
  fullName: string;
  onFullNameChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  altPhone: string;
  onAltPhoneChange: (val: string) => void;
  email: string;
  onEmailChange: (val: string) => void;
  isLoggedIn: boolean;
}

export function CheckoutContactForm({
  fullName,
  onFullNameChange,
  phone,
  onPhoneChange,
  altPhone,
  onAltPhoneChange,
  email,
  onEmailChange,
  isLoggedIn,
}: CheckoutContactFormProps) {
  return (
    <section className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            1
          </span>
          <h2 className="font-display text-lg sm:text-xl font-medium">Contact Information</h2>
        </div>
        {!isLoggedIn && (
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
              onChange={(e) => onFullNameChange(e.target.value)}
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
              onChange={(e) => onPhoneChange(e.target.value)}
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
              onChange={(e) => onAltPhoneChange(e.target.value)}
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
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="yourname@gmail.com (for invoices & tracking)"
              className="rounded-full pl-9 text-xs"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}

