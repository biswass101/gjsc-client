import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { SavedAddress } from "../types";
import { customerApi, tokenStorage, type CustomerAddress } from "@/lib/api";

function mapBackendAddress(a: CustomerAddress): SavedAddress {
  return {
    id: String(a.id),
    label: a.label,
    isDefault: Boolean(a.isDefault),
    name: a.name,
    phone: a.phone,
    division: a.division,
    city: a.city,
    area: a.area,
    street: a.street,
  };
}

function inferZoneFromLocation(
  division: string,
  city: string
): "dhaka_metro" | "dhaka_suburbs" | "outside_dhaka" {
  const combined = `${division} ${city}`.toLowerCase();
  if (combined.includes("dhaka") && !combined.includes("savar") && !combined.includes("keraniganj")) {
    return "dhaka_metro";
  }
  if (
    combined.includes("gazipur") ||
    combined.includes("narayanganj") ||
    combined.includes("savar") ||
    combined.includes("keraniganj")
  ) {
    return "dhaka_suburbs";
  }
  return "outside_dhaka";
}

export function useAccountAddresses(
  fallbackName: string,
  fallbackPhone: string,
  userEmail?: string,
  onAddressesMutated?: () => void,
) {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressLabel, setAddressLabel] = useState<"Home" | "Office" | "Other">("Home");
  const [addressName, setAddressName] = useState("");
  const [addressPhone, setAddressPhone] = useState("");
  const [addressDivision, setAddressDivision] = useState("Dhaka");
  const [addressCity, setAddressCity] = useState("Dhaka");
  const [addressArea, setAddressArea] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressIsDefault, setAddressIsDefault] = useState(false);

  useEffect(() => {
    if (!tokenStorage.get()) {
      setAddresses([]);
      return;
    }

    let cancelled = false;
    customerApi
      .getAddresses()
      .then((list) => {
        if (!cancelled && Array.isArray(list)) {
          setAddresses(list.map(mapBackendAddress));
        }
      })
      .catch(() => {
        /* leave empty if unavailable */
      });

    return () => {
      cancelled = true;
    };
  }, [userEmail]);

  const handleOpenAddressModal = (existing?: SavedAddress) => {
    if (existing) {
      setEditingAddressId(existing.id);
      setAddressLabel(existing.label);
      setAddressName(existing.name);
      setAddressPhone(existing.phone);
      setAddressDivision(existing.division);
      setAddressCity(existing.city);
      setAddressArea(existing.area);
      setAddressStreet(existing.street);
      setAddressIsDefault(existing.isDefault);
    } else {
      setEditingAddressId(null);
      setAddressLabel("Home");
      setAddressName(fallbackName);
      setAddressPhone(fallbackPhone);
      setAddressDivision("Dhaka");
      setAddressCity("Dhaka");
      setAddressArea("");
      setAddressStreet("");
      setAddressIsDefault(addresses.length === 0);
    }
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressStreet.trim() || !addressArea.trim()) {
      toast.error("Please fill in the full street address and area.");
      return;
    }

    const payload = {
      label: addressLabel,
      name: (addressName || fallbackName || "Customer").trim(),
      phone: (addressPhone || fallbackPhone || "Not provided").trim(),
      division: addressDivision.trim() || "Dhaka",
      city: addressCity.trim() || "Dhaka",
      area: addressArea.trim(),
      street: addressStreet.trim(),
      deliveryZone: inferZoneFromLocation(addressDivision, addressCity),
      isDefault: addressIsDefault || addresses.length === 0,
    };

    try {
      if (tokenStorage.get()) {
        if (editingAddressId) {
          await customerApi.updateAddress(Number(editingAddressId), payload);
          toast.success("Address updated successfully!");
        } else {
          await customerApi.createAddress(payload);
          toast.success("New address added to your address book!");
        }
        const refreshed = await customerApi.getAddresses();
        setAddresses(refreshed.map(mapBackendAddress));
        setIsAddressModalOpen(false);
        onAddressesMutated?.();
        return;
      }
    } catch (err: any) {
      toast.error("Failed to save address", {
        description: err?.message || "Please check your details and try again.",
      });
      return;
    }

    // Fallback when offline/unauthenticated
    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((a) => {
          if (a.id === editingAddressId) {
            return { ...a, ...payload };
          }
          return payload.isDefault ? { ...a, isDefault: false } : a;
        })
      );
    } else {
      const newAddr: SavedAddress = { id: `addr-${Date.now()}`, ...payload };
      setAddresses((prev) => [
        ...(payload.isDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev),
        newAddr,
      ]);
    }
    setIsAddressModalOpen(false);
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      if (tokenStorage.get() && /^\d+$/.test(id)) {
        await customerApi.deleteAddress(Number(id));
        const refreshed = await customerApi.getAddresses();
        setAddresses(refreshed.map(mapBackendAddress));
        onAddressesMutated?.();
      } else {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
      }
      toast.success("Address removed from address book.");
    } catch (err: any) {
      toast.error("Failed to remove address", {
        description: err?.message || "Please try again.",
      });
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    try {
      if (tokenStorage.get() && /^\d+$/.test(id)) {
        await customerApi.setDefaultAddress(Number(id));
        const refreshed = await customerApi.getAddresses();
        setAddresses(refreshed.map(mapBackendAddress));
      } else {
        setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
      }
      toast.success("Default shipping address updated.");
    } catch (err: any) {
      toast.error("Failed to update default address", {
        description: err?.message || "Please try again.",
      });
    }
  };

  return {
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
  };
}
