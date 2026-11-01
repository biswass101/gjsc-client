"use client";

import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AccountPasswordSettingsProps {
  currentPass: string;
  onCurrentPassChange: (val: string) => void;
  newPass: string;
  onNewPassChange: (val: string) => void;
  confirmPass: string;
  onConfirmPassChange: (val: string) => void;
  onChangePassword: (e: React.FormEvent) => void;
}

export function AccountPasswordSettings({
  currentPass,
  onCurrentPassChange,
  newPass,
  onNewPassChange,
  confirmPass,
  onConfirmPassChange,
  onChangePassword,
}: AccountPasswordSettingsProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
      <h3 className="font-semibold text-sm text-foreground flex items-center gap-2 border-b border-border/40 pb-3">
        <KeyRound className="h-4 w-4 text-primary" />
        Change Password
      </h3>

      <form onSubmit={onChangePassword} className="space-y-3.5 max-w-md">
        <div>
          <Label htmlFor="current-pass" className="text-xs font-semibold">
            Current Password
          </Label>
          <Input
            id="current-pass"
            type="password"
            value={currentPass}
            onChange={(e) => onCurrentPassChange(e.target.value)}
            placeholder="••••••••"
            className="mt-1.5 rounded-full text-xs"
          />
        </div>

        <div>
          <Label htmlFor="new-pass" className="text-xs font-semibold">
            New Password
          </Label>
          <Input
            id="new-pass"
            type="password"
            value={newPass}
            onChange={(e) => onNewPassChange(e.target.value)}
            placeholder="Minimum 6 characters"
            className="mt-1.5 rounded-full text-xs"
          />
        </div>

        <div>
          <Label htmlFor="confirm-pass" className="text-xs font-semibold">
            Confirm New Password
          </Label>
          <Input
            id="confirm-pass"
            type="password"
            value={confirmPass}
            onChange={(e) => onConfirmPassChange(e.target.value)}
            placeholder="••••••••"
            className="mt-1.5 rounded-full text-xs"
          />
        </div>

        <Button type="submit" size="sm" className="rounded-full text-xs mt-2 cursor-pointer">
          Update Password
        </Button>
      </form>
    </div>
  );
}

