"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  SettingsHeader,
  SettingsStoreIdentityCard,
  SettingsLogisticsCard,
  SettingsPaymentGatewaysCard,
  SettingsAlertsNotificationsCard,
  SettingsDisasterRecoveryCard,
  useAdminSettingsForm,
} from "@/features/admin-settings";

export default function AdminSettingsPage() {
  const {
    storeName,
    setStoreName,
    tagline,
    setTagline,
    contactEmail,
    setContactEmail,
    contactPhone,
    setContactPhone,
    warehouseAddress,
    setWarehouseAddress,
    tokyoOfficeAddress,
    setTokyoOfficeAddress,
    insideDhakaRate,
    setInsideDhakaRate,
    outsideDhakaRate,
    setOutsideDhakaRate,
    expressDeliveryRate,
    setExpressDeliveryRate,
    freeShippingMin,
    setFreeShippingMin,
    defaultCourier,
    setDefaultCourier,
    autoAssignCourier,
    setAutoAssignCourier,
    pathaoApiKey,
    setPathaoApiKey,
    steadfastApiKey,
    setSteadfastApiKey,
    codEnabled,
    setCodEnabled,
    codMinAmount,
    setCodMinAmount,
    codMaxAmount,
    setCodMaxAmount,
    codInstructions,
    setCodInstructions,
    bkashEnabled,
    setBkashEnabled,
    bkashMerchantNumber,
    setBkashMerchantNumber,
    bkashAccountType,
    setBkashAccountType,
    bkashInstructions,
    setBkashInstructions,
    nagadEnabled,
    setNagadEnabled,
    nagadMerchantNumber,
    setNagadMerchantNumber,
    nagadAccountType,
    setNagadAccountType,
    nagadInstructions,
    setNagadInstructions,
    cardEnabled,
    setCardEnabled,
    cardGateway,
    setCardGateway,
    cardStoreId,
    setCardStoreId,
    cardInstructions,
    setCardInstructions,
    cardTestMode,
    setCardTestMode,
    lowStockWarningQty,
    setLowStockWarningQty,
    enableSmsAlerts,
    setEnableSmsAlerts,
    enableWhatsappUpdates,
    setEnableWhatsappUpdates,
    isSaving,
    isSavingPayment,
    handleSave,
    handleSavePaymentGateways,
    handleToggleGateway,
    handleExportDatabase,
    handleReset,
  } = useAdminSettingsForm();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <SettingsHeader onExport={handleExportDatabase} onSave={() => handleSave()} />

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        <SettingsStoreIdentityCard
          storeName={storeName}
          setStoreName={setStoreName}
          tagline={tagline}
          setTagline={setTagline}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          contactPhone={contactPhone}
          setContactPhone={setContactPhone}
          warehouseAddress={warehouseAddress}
          setWarehouseAddress={setWarehouseAddress}
          tokyoOfficeAddress={tokyoOfficeAddress}
          setTokyoOfficeAddress={setTokyoOfficeAddress}
        />

        <SettingsLogisticsCard
          insideDhakaRate={insideDhakaRate}
          setInsideDhakaRate={setInsideDhakaRate}
          outsideDhakaRate={outsideDhakaRate}
          setOutsideDhakaRate={setOutsideDhakaRate}
          expressDeliveryRate={expressDeliveryRate}
          setExpressDeliveryRate={setExpressDeliveryRate}
          freeShippingMin={freeShippingMin}
          setFreeShippingMin={setFreeShippingMin}
          defaultCourier={defaultCourier}
          setDefaultCourier={setDefaultCourier}
          autoAssignCourier={autoAssignCourier}
          setAutoAssignCourier={setAutoAssignCourier}
          pathaoApiKey={pathaoApiKey}
          setPathaoApiKey={setPathaoApiKey}
          steadfastApiKey={steadfastApiKey}
          setSteadfastApiKey={setSteadfastApiKey}
        />

        <SettingsPaymentGatewaysCard
          codEnabled={codEnabled}
          setCodEnabled={setCodEnabled}
          codMinAmount={codMinAmount}
          setCodMinAmount={setCodMinAmount}
          codMaxAmount={codMaxAmount}
          setCodMaxAmount={setCodMaxAmount}
          codInstructions={codInstructions}
          setCodInstructions={setCodInstructions}
          bkashEnabled={bkashEnabled}
          setBkashEnabled={setBkashEnabled}
          bkashMerchantNumber={bkashMerchantNumber}
          setBkashMerchantNumber={setBkashMerchantNumber}
          bkashAccountType={bkashAccountType}
          setBkashAccountType={setBkashAccountType}
          bkashInstructions={bkashInstructions}
          setBkashInstructions={setBkashInstructions}
          nagadEnabled={nagadEnabled}
          setNagadEnabled={setNagadEnabled}
          nagadMerchantNumber={nagadMerchantNumber}
          setNagadMerchantNumber={setNagadMerchantNumber}
          nagadAccountType={nagadAccountType}
          setNagadAccountType={setNagadAccountType}
          nagadInstructions={nagadInstructions}
          setNagadInstructions={setNagadInstructions}
          cardEnabled={cardEnabled}
          setCardEnabled={setCardEnabled}
          cardGateway={cardGateway}
          setCardGateway={setCardGateway}
          cardStoreId={cardStoreId}
          setCardStoreId={setCardStoreId}
          cardInstructions={cardInstructions}
          setCardInstructions={setCardInstructions}
          cardTestMode={cardTestMode}
          setCardTestMode={setCardTestMode}
          onSavePaymentGateways={handleSavePaymentGateways}
          isSavingPayment={isSavingPayment}
          onToggleGateway={handleToggleGateway}
        />

        <SettingsAlertsNotificationsCard
          lowStockWarningQty={lowStockWarningQty}
          setLowStockWarningQty={setLowStockWarningQty}
          enableSmsAlerts={enableSmsAlerts}
          setEnableSmsAlerts={setEnableSmsAlerts}
          enableWhatsappUpdates={enableWhatsappUpdates}
          setEnableWhatsappUpdates={setEnableWhatsappUpdates}
        />

        <SettingsDisasterRecoveryCard onReset={handleReset} />

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            size="sm"
            disabled={isSaving}
            className="rounded-full text-xs px-8 h-9 shadow-sm"
          >
            {isSaving ? "Saving..." : "Save All Configurations"}
          </Button>
        </div>
      </form>
    </div>
  );
}
