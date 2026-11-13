"use client";

import { KeyRound, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AccountPasswordSettingsProps {
  hasPassword?: boolean | undefined;
  isUpdatingPassword?: boolean | undefined;
  currentPass: string;
  onCurrentPassChange: (val: string) => void;
  newPass: string;
  onNewPassChange: (val: string) => void;
  confirmPass: string;
  onConfirmPassChange: (val: string) => void;
  onChangePassword: (e: React.FormEvent) => void;
}

export function AccountPasswordSettings({
  hasPassword = true,
  isUpdatingPassword,
  currentPass,
  onCurrentPassChange,
  newPass,
  onNewPassChange,
  confirmPass,
  onConfirmPassChange,
  onChangePassword,
}: AccountPasswordSettingsProps) {
  const isSettingInitialPassword = hasPassword === false;

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
      <div className="border-b border-border/40 pb-3">
        <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-primary" />
          {isSettingInitialPassword ? "Set Account Password" : "Change Password"}
        </h3>
        {isSettingInitialPassword && (
          <p className="text-[11px] text-muted-foreground mt-1">
            You signed in with Google or Facebook. Set an optional password if you would also like
            to sign in with email and password.
          </p>
        )}
      </div>

      <form onSubmit={onChangePassword} className="space-y-3.5 max-w-md">
        {!isSettingInitialPassword && (
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
        )}

        <div>
          <Label htmlFor="new-pass" className="text-xs font-semibold">
            {isSettingInitialPassword ? "Account Password" : "New Password"}
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
            Confirm {isSettingInitialPassword ? "Password" : "New Password"}
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

        <Button
          type="submit"
          size="sm"
          disabled={isUpdatingPassword}
          className="rounded-full text-xs mt-2 cursor-pointer gap-2"
        >
          {isUpdatingPassword && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
          {isUpdatingPassword
            ? "Saving..."
            : isSettingInitialPassword
            ? "Set Account Password"
            : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
