"use client";

import type { User } from "@/types";
import { AccountProfileSettings, type AccountProfileSettingsProps } from "./AccountProfileSettings";
import { AccountConnectedAccounts } from "./AccountConnectedAccounts";
import {
  AccountPasswordSettings,
  type AccountPasswordSettingsProps,
} from "./AccountPasswordSettings";
import {
  AccountNotificationSettings,
  type AccountNotificationSettingsProps,
} from "./AccountNotificationSettings";

export interface AccountSettingsTabProps
  extends
    AccountProfileSettingsProps,
    AccountPasswordSettingsProps,
    AccountNotificationSettingsProps {
  user?: User | undefined;
  isConnectingGoogle?: boolean | undefined;
  isConnectingFacebook?: boolean | undefined;
  onConnectGoogle?: (() => void) | undefined;
  onConnectFacebook?: (() => void) | undefined;
}

export function AccountSettingsTab(props: AccountSettingsTabProps) {
  const {
    user,
    isConnectingGoogle,
    isConnectingFacebook,
    onConnectGoogle,
    onConnectFacebook,
    name,
    onNameChange,
    email,
    onEmailChange,
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
    hasPassword,
    isUpdatingPassword,
    currentPass,
    onCurrentPassChange,
    newPass,
    onNewPassChange,
    confirmPass,
    onConfirmPassChange,
    onChangePassword,
    notifSms,
    onNotifSmsChange,
    notifWhatsapp,
    onNotifWhatsappChange,
    notifPromos,
    onNotifPromosChange,
    isSavingNotifications,
    onSignOut,
  } = props;

  const focusPasswordInput = () => {
    const el = document.getElementById("new-pass");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border/50 pb-4">
        <h2 className="font-display text-xl sm:text-2xl font-medium text-foreground">
          Profile, Password & Security
        </h2>
        <p className="text-xs text-muted-foreground">
          Update personal information, connect login providers, change security credentials, and
          manage notification preferences.
        </p>
      </div>

      <AccountProfileSettings
        name={name}
        onNameChange={onNameChange}
        email={email}
        onEmailChange={onEmailChange}
        phone={phone}
        onPhoneChange={onPhoneChange}
        address={address}
        onAddressChange={onAddressChange}
        avatar={avatar}
        tempAvatar={tempAvatar}
        onSelectPresetAvatar={onSelectPresetAvatar}
        fileInputRef={fileInputRef}
        onPhotoUpload={onPhotoUpload}
        onRemovePhoto={onRemovePhoto}
        isEditingProfile={isEditingProfile}
        isSavingProfile={isSavingProfile}
        onStartEditProfile={onStartEditProfile}
        onCancelEditProfile={onCancelEditProfile}
        onSaveProfile={onSaveProfile}
      />

      {user && onConnectGoogle && onConnectFacebook && (
        <AccountConnectedAccounts
          user={user}
          isConnectingGoogle={isConnectingGoogle}
          isConnectingFacebook={isConnectingFacebook}
          onConnectGoogle={onConnectGoogle}
          onConnectFacebook={onConnectFacebook}
          onSetPasswordClick={focusPasswordInput}
        />
      )}

      <AccountPasswordSettings
        hasPassword={hasPassword}
        isUpdatingPassword={isUpdatingPassword}
        currentPass={currentPass}
        onCurrentPassChange={onCurrentPassChange}
        newPass={newPass}
        onNewPassChange={onNewPassChange}
        confirmPass={confirmPass}
        onConfirmPassChange={onConfirmPassChange}
        onChangePassword={onChangePassword}
      />

      <AccountNotificationSettings
        notifSms={notifSms}
        onNotifSmsChange={onNotifSmsChange}
        notifWhatsapp={notifWhatsapp}
        onNotifWhatsappChange={onNotifWhatsappChange}
        notifPromos={notifPromos}
        onNotifPromosChange={onNotifPromosChange}
        isSavingNotifications={isSavingNotifications}
        onSignOut={onSignOut}
      />
    </div>
  );
}
