"use client";

import { Lock, RefreshCw } from "lucide-react";
import { Layout } from "@/components/layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import {
  useAccountData,
  AccountHeroBanner,
  AccountSidebar,
  AccountOverviewTab,
  AccountOrdersTab,
  AccountAddressesTab,
  AccountWishlistTab,
  AccountSkincareTab,
  AccountSettingsTab,
  AccountOrderDetailModal,
  AccountAddressModal,
} from "@/features/account";

export default function AccountPage() {
  const {
    user,
    isAuthLoading,
    activeTab,
    setActiveTab,
    dashboard,
    isLoadingDashboard,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    avatar,
    tempAvatar,
    setTempAvatar,
    fileInputRef,
    isEditingProfile,
    setIsEditingProfile,
    isSavingProfile,
    handlePhotoUpload,
    handleRemovePhoto,
    handleCancelEditProfile,
    handleSaveProfile,
    addresses,
    isAddressModalOpen,
    setIsAddressModalOpen,
    editingAddressId,
    addressLabel,
    setAddressLabel,
    addressName,
    setAddressName,
    addressPhone,
    setAddressPhone,
    addressDivision,
    setAddressDivision,
    addressCity,
    setAddressCity,
    addressArea,
    setAddressArea,
    addressStreet,
    setAddressStreet,
    addressIsDefault,
    setAddressIsDefault,
    handleOpenAddressModal,
    handleSaveAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
    orders,
    orderFilter,
    setOrderFilter,
    selectedOrderReceipt,
    setSelectedOrderReceipt,
    skinType,
    setSkinType,
    concerns,
    isSavingSkincare,
    handleToggleConcern,
    handleSaveSkincareProfile,
    notifSms,
    setNotifSms,
    notifWhatsapp,
    setNotifWhatsapp,
    notifPromos,
    setNotifPromos,
    isSavingNotifications,
    currentPass,
    setCurrentPass,
    newPass,
    setNewPass,
    confirmPass,
    setConfirmPass,
    isUpdatingPassword,
    wishlistProducts,
    handleBuyAgain,
    handleChangePassword,
    handleSignOut,
    handleDownloadInvoice,
  } = useAccountData();

  if (isAuthLoading) {
    return (
      <Layout>
        <div className="container-lux py-24 text-center">
          <div className="mx-auto max-w-md rounded-xl border border-border/80 bg-card p-10 space-y-3">
            <RefreshCw className="mx-auto h-7 w-7 animate-spin text-primary" />
            <p className="text-sm font-medium text-foreground">
              Loading your Glorious Japan sanctuary...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container-lux py-20 sm:py-28">
          <div className="mx-auto max-w-lg rounded-xl border border-border/80 bg-card p-8 sm:p-10 text-center space-y-4 shadow-sm">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-medium text-foreground">
              Sign In to Your Member Account
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Access your real-time Glorious Sakura VIP Club tier progress, Ritual Points, saved
              delivery addresses, order history, wishlist, and personalized skin diagnostics.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button asChild className="rounded-full px-7 text-xs font-semibold">
                <Link to="/auth">Sign In or Create Account</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6 text-xs">
                <Link to="/shop">Browse J-Beauty Shop</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Account Hero Banner */}
      <AccountHeroBanner
        user={user}
        name={name}
        avatar={avatar}
        tierLabel={dashboard?.loyalty.currentTier.badgeLabel}
        availablePoints={dashboard?.points.availablePoints}
      />

      <div className="container-lux py-8 sm:py-12">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="grid gap-8 lg:grid-cols-12 items-start"
        >
          {/* Left Column (3 cols): Sidebar Navigation */}
          <AccountSidebar
            ordersCount={orders.length}
            wishlistCount={wishlistProducts.length}
            onSignOut={handleSignOut}
          />

          {/* Right Column (9 cols): Tab Contents */}
          <main className="lg:col-span-9 min-w-0">
            {/* 1. Dashboard Overview */}
            <TabsContent value="overview" className="m-0 space-y-6">
              <AccountOverviewTab
                orders={orders}
                wishlistCount={wishlistProducts.length}
                skinType={skinType}
                dashboard={dashboard}
                isLoading={isLoadingDashboard}
                onNavigateTab={setActiveTab}
                onViewReceipt={setSelectedOrderReceipt}
              />
            </TabsContent>

            {/* 2. My Orders */}
            <TabsContent value="orders" className="m-0 space-y-5">
              <AccountOrdersTab
                orders={orders}
                orderFilter={orderFilter}
                onOrderFilterChange={setOrderFilter}
                onViewReceipt={setSelectedOrderReceipt}
                onBuyAgain={handleBuyAgain}
              />
            </TabsContent>

            {/* 3. Address Book */}
            <TabsContent value="addresses" className="m-0 space-y-5">
              <AccountAddressesTab
                addresses={addresses}
                onOpenAddressModal={handleOpenAddressModal}
                onSetDefault={handleSetDefaultAddress}
                onDelete={handleDeleteAddress}
              />
            </TabsContent>

            {/* 4. Wishlist */}
            <TabsContent value="wishlist" className="m-0 space-y-5">
              <AccountWishlistTab products={wishlistProducts} />
            </TabsContent>

            {/* 5. Skin Diagnostics */}
            <TabsContent value="skincare" className="m-0 space-y-6">
              <AccountSkincareTab
                skinType={skinType}
                onSkinTypeChange={setSkinType}
                concerns={concerns}
                onToggleConcern={handleToggleConcern}
                onSaveProfile={handleSaveSkincareProfile}
                isSaving={isSavingSkincare}
              />
            </TabsContent>

            {/* 6. Settings & Security */}
            <TabsContent value="settings" className="m-0 space-y-6">
              <AccountSettingsTab
                name={name}
                onNameChange={setName}
                email={email}
                onEmailChange={setEmail}
                phone={phone}
                onPhoneChange={setPhone}
                address={address}
                onAddressChange={setAddress}
                avatar={avatar}
                tempAvatar={tempAvatar}
                onSelectPresetAvatar={setTempAvatar}
                fileInputRef={fileInputRef}
                onPhotoUpload={handlePhotoUpload}
                onRemovePhoto={handleRemovePhoto}
                isEditingProfile={isEditingProfile}
                isSavingProfile={isSavingProfile}
                onStartEditProfile={() => setIsEditingProfile(true)}
                onCancelEditProfile={handleCancelEditProfile}
                onSaveProfile={handleSaveProfile}
                hasPassword={user.hasPassword}
                isUpdatingPassword={isUpdatingPassword}
                currentPass={currentPass}
                onCurrentPassChange={setCurrentPass}
                newPass={newPass}
                onNewPassChange={setNewPass}
                confirmPass={confirmPass}
                onConfirmPassChange={setConfirmPass}
                onChangePassword={handleChangePassword}
                notifSms={notifSms}
                onNotifSmsChange={setNotifSms}
                notifWhatsapp={notifWhatsapp}
                onNotifWhatsappChange={setNotifWhatsapp}
                notifPromos={notifPromos}
                onNotifPromosChange={setNotifPromos}
                isSavingNotifications={isSavingNotifications}
                onSignOut={handleSignOut}
              />
            </TabsContent>
          </main>
        </Tabs>
      </div>

      {/* Order Detail Modal */}
      <AccountOrderDetailModal
        order={selectedOrderReceipt}
        onClose={() => setSelectedOrderReceipt(null)}
        onDownloadInvoice={handleDownloadInvoice}
      />

      {/* Add / Edit Address Modal */}
      <AccountAddressModal
        isOpen={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
        isEditing={Boolean(editingAddressId)}
        addressLabel={addressLabel}
        onAddressLabelChange={setAddressLabel}
        addressName={addressName}
        onAddressNameChange={setAddressName}
        addressPhone={addressPhone}
        onAddressPhoneChange={setAddressPhone}
        addressDivision={addressDivision}
        onAddressDivisionChange={setAddressDivision}
        addressCity={addressCity}
        onAddressCityChange={setAddressCity}
        addressArea={addressArea}
        onAddressAreaChange={setAddressArea}
        addressStreet={addressStreet}
        onAddressStreetChange={setAddressStreet}
        addressIsDefault={addressIsDefault}
        onAddressIsDefaultChange={setAddressIsDefault}
        onSaveAddress={handleSaveAddress}
      />
    </Layout>
  );
}
