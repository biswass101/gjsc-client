import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAdmin } from "@/context/admin-context";

export function useAdminSettingsForm() {
  const { settings, updateSettings, updatePaymentSettings, resetToDefaults, products, orders, customers, discounts } =
    useAdmin();

  // Store details
  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [warehouseAddress, setWarehouseAddress] = useState(settings.warehouseAddress);
  const [tokyoOfficeAddress, setTokyoOfficeAddress] = useState(settings.tokyoOfficeAddress);

  // Delivery
  const [insideDhakaRate, setInsideDhakaRate] = useState(settings.insideDhakaRate.toString());
  const [outsideDhakaRate, setOutsideDhakaRate] = useState(settings.outsideDhakaRate.toString());
  const [expressDeliveryRate, setExpressDeliveryRate] = useState(
    settings.expressDeliveryRate.toString(),
  );
  const [freeShippingMin, setFreeShippingMin] = useState(settings.freeShippingMin.toString());
  const [defaultCourier, setDefaultCourier] = useState(settings.defaultCourier);
  const [autoAssignCourier, setAutoAssignCourier] = useState(settings.autoAssignCourier);
  const [pathaoApiKey, setPathaoApiKey] = useState(settings.pathaoApiKey);
  const [steadfastApiKey, setSteadfastApiKey] = useState(settings.steadfastApiKey);

  // Payment
  const [codEnabled, setCodEnabled] = useState(settings.codEnabled);
  const [codMinAmount, setCodMinAmount] = useState((settings.codMinAmount ?? 0).toString());
  const [codMaxAmount, setCodMaxAmount] = useState((settings.codMaxAmount ?? 50000).toString());
  const [codInstructions, setCodInstructions] = useState(
    settings.codInstructions ?? "Pay with exact cash to the delivery agent upon receiving your order package.",
  );

  const [bkashEnabled, setBkashEnabled] = useState(settings.bkashEnabled);
  const [bkashMerchantNumber, setBkashMerchantNumber] = useState(settings.bkashMerchantNumber);
  const [bkashAccountType, setBkashAccountType] = useState<"Merchant" | "Personal" | "Send Money">(
    settings.bkashAccountType ?? "Merchant",
  );
  const [bkashInstructions, setBkashInstructions] = useState(
    settings.bkashInstructions ?? "Use Make Payment option from bKash app.",
  );

  const [nagadEnabled, setNagadEnabled] = useState(settings.nagadEnabled);
  const [nagadMerchantNumber, setNagadMerchantNumber] = useState(settings.nagadMerchantNumber);
  const [nagadAccountType, setNagadAccountType] = useState<"Merchant" | "Personal" | "Send Money">(
    settings.nagadAccountType ?? "Merchant",
  );
  const [nagadInstructions, setNagadInstructions] = useState(
    settings.nagadInstructions ?? "Use Merchant Pay option from Nagad app.",
  );

  const [cardEnabled, setCardEnabled] = useState(settings.cardEnabled ?? true);
  const [cardGateway, setCardGateway] = useState(settings.cardGateway ?? "SSLCommerz / Shurjopay Enterprise");
  const [cardStoreId, setCardStoreId] = useState(settings.cardStoreId ?? "GLORIOUS_JAPAN_STORE");
  const [cardInstructions, setCardInstructions] = useState(
    settings.cardInstructions ?? "Supports Visa, Mastercard, UnionPay, Amex & major Bangladesh Internet Banking.",
  );
  const [cardTestMode, setCardTestMode] = useState(settings.cardTestMode ?? false);

  // Notifications & Alerts
  const [lowStockWarningQty, setLowStockWarningQty] = useState(
    settings.lowStockWarningQty.toString(),
  );
  const [enableSmsAlerts, setEnableSmsAlerts] = useState(settings.enableSmsAlerts);
  const [enableWhatsappUpdates, setEnableWhatsappUpdates] = useState(
    settings.enableWhatsappUpdates,
  );
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenanceMode);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingPayment, setIsSavingPayment] = useState(false);

  // Synchronize form states whenever backend settings are retrieved or updated
  useEffect(() => {
    setStoreName(settings.storeName);
    setTagline(settings.tagline);
    setContactEmail(settings.contactEmail);
    setContactPhone(settings.contactPhone);
    setWarehouseAddress(settings.warehouseAddress);
    setTokyoOfficeAddress(settings.tokyoOfficeAddress);
    setInsideDhakaRate(settings.insideDhakaRate.toString());
    setOutsideDhakaRate(settings.outsideDhakaRate.toString());
    setExpressDeliveryRate(settings.expressDeliveryRate.toString());
    setFreeShippingMin(settings.freeShippingMin.toString());
    setDefaultCourier(settings.defaultCourier);
    setAutoAssignCourier(settings.autoAssignCourier);
    setPathaoApiKey(settings.pathaoApiKey);
    setSteadfastApiKey(settings.steadfastApiKey);
    setCodEnabled(settings.codEnabled);
    setCodMinAmount((settings.codMinAmount ?? 0).toString());
    setCodMaxAmount((settings.codMaxAmount ?? 50000).toString());
    setCodInstructions(settings.codInstructions ?? "Pay with exact cash to the delivery agent upon receiving your order package.");
    setBkashEnabled(settings.bkashEnabled);
    setBkashMerchantNumber(settings.bkashMerchantNumber);
    setBkashAccountType(settings.bkashAccountType ?? "Merchant");
    setBkashInstructions(settings.bkashInstructions ?? "Use Make Payment option from bKash app.");
    setNagadEnabled(settings.nagadEnabled);
    setNagadMerchantNumber(settings.nagadMerchantNumber);
    setNagadAccountType(settings.nagadAccountType ?? "Merchant");
    setNagadInstructions(settings.nagadInstructions ?? "Use Merchant Pay option from Nagad app.");
    setCardEnabled(settings.cardEnabled ?? true);
    setCardGateway(settings.cardGateway ?? "SSLCommerz / Shurjopay Enterprise");
    setCardStoreId(settings.cardStoreId ?? "GLORIOUS_JAPAN_STORE");
    setCardInstructions(settings.cardInstructions ?? "Supports Visa, Mastercard, UnionPay, Amex & major Bangladesh Internet Banking.");
    setCardTestMode(settings.cardTestMode ?? false);
    setLowStockWarningQty(settings.lowStockWarningQty.toString());
    setEnableSmsAlerts(settings.enableSmsAlerts);
    setEnableWhatsappUpdates(settings.enableWhatsappUpdates);
    setMaintenanceMode(settings.maintenanceMode);
  }, [settings]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings({
        storeName,
        tagline,
        contactEmail,
        contactPhone,
        warehouseAddress,
        tokyoOfficeAddress,
        insideDhakaRate: parseFloat(insideDhakaRate) || 60,
        outsideDhakaRate: parseFloat(outsideDhakaRate) || 120,
        expressDeliveryRate: parseFloat(expressDeliveryRate) || 150,
        freeShippingMin: parseFloat(freeShippingMin) || 5000,
        defaultCourier,
        autoAssignCourier,
        pathaoApiKey,
        steadfastApiKey,
        codEnabled,
        codMinAmount: parseFloat(codMinAmount) || 0,
        codMaxAmount: parseFloat(codMaxAmount) || 50000,
        codInstructions,
        bkashEnabled,
        bkashMerchantNumber,
        bkashAccountType,
        bkashInstructions,
        nagadEnabled,
        nagadMerchantNumber,
        nagadAccountType,
        nagadInstructions,
        cardEnabled,
        cardGateway,
        cardStoreId,
        cardInstructions,
        cardTestMode,
        lowStockWarningQty: parseInt(lowStockWarningQty, 10) || 5,
        enableSmsAlerts,
        enableWhatsappUpdates,
        maintenanceMode,
      });
      toast.success("Enterprise store & logistics settings saved successfully! ⚙️");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save settings to database");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePaymentGateways = async () => {
    setIsSavingPayment(true);
    try {
      await updatePaymentSettings({
        codEnabled,
        codMinAmount: parseFloat(codMinAmount) || 0,
        codMaxAmount: parseFloat(codMaxAmount) || 50000,
        codInstructions,
        bkashEnabled,
        bkashMerchantNumber,
        bkashAccountType,
        bkashInstructions,
        nagadEnabled,
        nagadMerchantNumber,
        nagadAccountType,
        nagadInstructions,
        cardEnabled,
        cardGateway,
        cardStoreId,
        cardInstructions,
        cardTestMode,
      });
      toast.success("Payment gateway configurations saved and synchronized with database! 💳");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save payment settings to database");
    } finally {
      setIsSavingPayment(false);
    }
  };

  const handleToggleGateway = async (gatewayKey: string, enabled: boolean) => {
    if (gatewayKey === "codEnabled") setCodEnabled(enabled);
    else if (gatewayKey === "bkashEnabled") setBkashEnabled(enabled);
    else if (gatewayKey === "nagadEnabled") setNagadEnabled(enabled);
    else if (gatewayKey === "cardEnabled") setCardEnabled(enabled);
    else if (gatewayKey === "cardTestMode") setCardTestMode(enabled);

    try {
      await updatePaymentSettings({ [gatewayKey]: enabled });
      const label =
        gatewayKey === "codEnabled"
          ? "Cash on Delivery (COD)"
          : gatewayKey === "bkashEnabled"
            ? "bKash Mobile Payment"
            : gatewayKey === "nagadEnabled"
              ? "Nagad Mobile Payment"
              : gatewayKey === "cardEnabled"
                ? "Debit/Credit Card & NetBanking"
                : "Sandbox / Test Mode";
      toast.success(`${label} ${enabled ? "enabled" : "disabled"} & synced to database! ⚡`);
    } catch (err: any) {
      toast.error(`Failed to update ${gatewayKey} in database`);
    }
  };

  const handleExportDatabase = () => {
    const fullDatabase = {
      exportTimestamp: new Date().toISOString(),
      store: settings,
      productsCount: products.length,
      ordersCount: orders.length,
      customersCount: customers.length,
      discountsCount: discounts.length,
      products,
      orders,
      customers,
      discounts,
    };
    const jsonStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullDatabase, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute(
      "download",
      `GJSC_Store_Backup_${new Date().toISOString().split("T")[0]}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Full Store Database exported to JSON! 💾");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Restore factory demo state? This will reinitialize all sample products, orders, and settings.",
      )
    ) {
      resetToDefaults();
      toast.success("Store factory settings restored!");
    }
  };

  return {
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
    maintenanceMode,
    setMaintenanceMode,
    isSaving,
    isSavingPayment,
    handleSave,
    handleSavePaymentGateways,
    handleToggleGateway,
    handleExportDatabase,
    handleReset,
  };
}
