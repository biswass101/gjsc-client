import { useState } from "react";
import { toast } from "sonner";
import { useAdmin } from "@/context/admin-context";

export function useAdminSettingsForm() {
  const { settings, updateSettings, resetToDefaults, products, orders, customers, discounts } =
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
  const [bkashEnabled, setBkashEnabled] = useState(settings.bkashEnabled);
  const [bkashMerchantNumber, setBkashMerchantNumber] = useState(settings.bkashMerchantNumber);
  const [nagadEnabled, setNagadEnabled] = useState(settings.nagadEnabled);
  const [nagadMerchantNumber, setNagadMerchantNumber] = useState(settings.nagadMerchantNumber);

  // Notifications & Alerts
  const [lowStockWarningQty, setLowStockWarningQty] = useState(
    settings.lowStockWarningQty.toString(),
  );
  const [enableSmsAlerts, setEnableSmsAlerts] = useState(settings.enableSmsAlerts);
  const [enableWhatsappUpdates, setEnableWhatsappUpdates] = useState(
    settings.enableWhatsappUpdates,
  );
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenanceMode);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSettings({
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
      bkashEnabled,
      bkashMerchantNumber,
      nagadEnabled,
      nagadMerchantNumber,
      lowStockWarningQty: parseInt(lowStockWarningQty, 10) || 5,
      enableSmsAlerts,
      enableWhatsappUpdates,
      maintenanceMode,
    });
    toast.success("Enterprise store & logistics settings saved successfully! ⚙️");
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
    bkashEnabled,
    setBkashEnabled,
    bkashMerchantNumber,
    setBkashMerchantNumber,
    nagadEnabled,
    setNagadEnabled,
    nagadMerchantNumber,
    setNagadMerchantNumber,
    lowStockWarningQty,
    setLowStockWarningQty,
    enableSmsAlerts,
    setEnableSmsAlerts,
    enableWhatsappUpdates,
    setEnableWhatsappUpdates,
    maintenanceMode,
    setMaintenanceMode,
    handleSave,
    handleExportDatabase,
    handleReset,
  };
}
