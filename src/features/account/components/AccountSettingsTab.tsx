"use client";

import { AccountProfileSettings, type AccountProfileSettingsProps } from "./AccountProfileSettings";
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
    AccountNotificationSettingsProps {}

export function AccountSettingsTab(props: AccountSettingsTabProps) {
  const {
    name,
    onNameChange,
    email,
    onEmailChange,
    phone,
    onPhoneChange,
    avatar,
    tempAvatar,
    onSelectPresetAvatar,
    fileInputRef,
    onPhotoUpload,
    onRemovePhoto,
    isEditingProfile,
    onStartEditProfile,
    onCancelEditProfile,
    onSaveProfile,
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
    onSignOut,
  } = props;

  return (
    <div className="space-y-6">
      <div className="border-b border-border/50 pb-4">
        <h2 className="font-display text-xl sm:text-2xl font-medium text-foreground">
          Profile, Password & Security
        </h2>
        <p className="text-xs text-muted-foreground">
          Update personal information, change security credentials, and manage notification
          preferences.
        </p>
      </div>

      <AccountProfileSettings
        name={name}
        onNameChange={onNameChange}
        email={email}
        onEmailChange={onEmailChange}
        phone={phone}
        onPhoneChange={onPhoneChange}
        avatar={avatar}
        tempAvatar={tempAvatar}
        onSelectPresetAvatar={onSelectPresetAvatar}
        fileInputRef={fileInputRef}
        onPhotoUpload={onPhotoUpload}
        onRemovePhoto={onRemovePhoto}
        isEditingProfile={isEditingProfile}
        onStartEditProfile={onStartEditProfile}
        onCancelEditProfile={onCancelEditProfile}
        onSaveProfile={onSaveProfile}
      />

      <AccountPasswordSettings
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
        onSignOut={onSignOut}
      />
    </div>
  );
}
