"use client";

import { Layout } from "@/components/layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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
    activeTab,
    setActiveTab,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    avatar,
    tempAvatar,
    setTempAvatar,
    fileInputRef,
    isEditingProfile,
    setIsEditingProfile,
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
    handleToggleConcern,
    handleSaveSkincareProfile,
    notifSms,
    setNotifSms,
    notifWhatsapp,
    setNotifWhatsapp,
    notifPromos,
    setNotifPromos,
    currentPass,
    setCurrentPass,
    newPass,
    setNewPass,
    confirmPass,
    setConfirmPass,
    wishlistProducts,
    handleBuyAgain,
    handleChangePassword,
    handleSignOut,
    handleDownloadInvoice,
  } = useAccountData();

  return (
    <Layout>
      {/* Account Hero Banner */}
      <AccountHeroBanner user={user} name={name} avatar={avatar} />

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
                avatar={avatar}
                tempAvatar={tempAvatar}
                onSelectPresetAvatar={setTempAvatar}
                fileInputRef={fileInputRef}
                onPhotoUpload={handlePhotoUpload}
                onRemovePhoto={handleRemovePhoto}
                isEditingProfile={isEditingProfile}
                onStartEditProfile={() => setIsEditingProfile(true)}
                onCancelEditProfile={handleCancelEditProfile}
                onSaveProfile={handleSaveProfile}
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
