"use client";

import { Camera, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRESET_AVATARS } from "../data/accountConstants";

export interface AccountProfileSettingsProps {
  name: string;
  onNameChange: (val: string) => void;
  email: string;
  onEmailChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  address?: string | undefined;
  onAddressChange?: ((val: string) => void) | undefined;
  avatar?: string | undefined;
  tempAvatar?: string | undefined;
  onSelectPresetAvatar: (url: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: () => void;
  isEditingProfile: boolean;
  isSavingProfile?: boolean | undefined;
  onStartEditProfile: () => void;
  onCancelEditProfile: () => void;
  onSaveProfile: (e: React.FormEvent) => void;
}

export function AccountProfileSettings({
  name,
  onNameChange,
  email,
  onEmailChange: _onEmailChange,
  phone,
  onPhoneChange,
  address,
  onAddressChange,
  avatar,
  tempAvatar,
  onSelectPresetAvatar,
  fileInputRef,
  onPhotoUpload,
  onRemovePhoto,
  isEditingProfile,
  isSavingProfile,
  onStartEditProfile,
  onCancelEditProfile,
  onSaveProfile,
}: AccountProfileSettingsProps) {
  const displayAvatar = isEditingProfile ? tempAvatar : avatar;
  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
          <UserIcon className="h-4 w-4 text-primary" />
          Personal Details & Avatar
        </h3>
        {!isEditingProfile && (
          <Button
            variant="outline"
            size="sm"
            onClick={onStartEditProfile}
            className="rounded-full text-xs cursor-pointer"
          >
            Edit Profile
          </Button>
        )}
      </div>

      {/* Avatar Uploader & Preset Badges */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative group shrink-0">
          {displayAvatar ? (
            <img
              src={displayAvatar}
              alt={name}
              referrerPolicy="no-referrer"
              className="h-20 w-20 rounded-full object-cover border-2 border-primary/40 shadow-xs"
            />
          ) : (
            <div className="grid h-20 w-20 place-items-center rounded-full border-2 border-primary/30 bg-primary/10 text-primary font-display text-2xl font-bold shadow-xs">
              {name[0] || "U"}
            </div>
          )}

          {isEditingProfile && (
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 grid place-items-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="h-5 w-5" />
            </label>
          )}
          <input
            id="avatar-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onPhotoUpload}
            disabled={!isEditingProfile}
          />
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <p className="text-xs font-semibold text-foreground">Profile Picture</p>
          <p className="text-[11px] text-muted-foreground">
            Upload a square photo (PNG, JPG, max 5MB) or select from our curated J-Beauty avatars.
          </p>

          {isEditingProfile && (
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full text-xs h-7 gap-1.5 cursor-pointer"
              >
                <Camera className="h-3 w-3" />
                Upload Photo
              </Button>

              {tempAvatar && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onRemovePhoto}
                  className="rounded-full text-xs h-7 text-rose hover:bg-rose/10 cursor-pointer"
                >
                  Remove
                </Button>
              )}

              <div className="flex items-center gap-1.5 pl-2 border-l border-border/50">
                {PRESET_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    title={av.label}
                    onClick={() => onSelectPresetAvatar(av.url)}
                    className="h-6 w-6 rounded-full overflow-hidden border border-border hover:ring-2 hover:ring-primary transition-all cursor-pointer"
                  >
                    <img src={av.url} alt={av.label} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={onSaveProfile} className="space-y-4 pt-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="prof-name" className="text-xs font-semibold">
              Full Name
            </Label>
            <Input
              id="prof-name"
              disabled={!isEditingProfile}
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="mt-1.5 rounded-full text-xs"
            />
          </div>

          <div>
            <Label htmlFor="prof-email" className="text-xs font-semibold">
              Email Address
            </Label>
            <Input
              id="prof-email"
              type="email"
              disabled
              readOnly
              value={email}
              className="mt-1.5 rounded-full text-xs bg-muted/40"
            />
            <p className="mt-1 text-[10.5px] text-muted-foreground">
              Linked to your login credentials.
            </p>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="prof-phone" className="text-xs font-semibold">
              Mobile Number (for order delivery updates)
            </Label>
            <Input
              id="prof-phone"
              disabled={!isEditingProfile}
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="e.g. 017XXXXXXXX"
              className="mt-1.5 rounded-full text-xs"
            />
          </div>

          {onAddressChange && (
            <div className="sm:col-span-2">
              <Label htmlFor="prof-address" className="text-xs font-semibold">
                Primary Address
              </Label>
              <Input
                id="prof-address"
                disabled={!isEditingProfile}
                value={address ?? ""}
                onChange={(e) => onAddressChange(e.target.value)}
                placeholder="Street, area, city (auto-filled when shared by Google/Facebook)"
                className="mt-1.5 rounded-full text-xs"
              />
            </div>
          )}
        </div>

        {isEditingProfile && (
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancelEditProfile}
              className="rounded-full text-xs cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSavingProfile}
              className="rounded-full text-xs px-6 cursor-pointer"
            >
              {isSavingProfile ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
