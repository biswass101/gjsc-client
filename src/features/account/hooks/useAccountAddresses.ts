import { useState } from "react";
import { toast } from "sonner";
import type { SavedAddress } from "../types";
import { INITIAL_ADDRESSES } from "../data/accountConstants";

export function useAccountAddresses(fallbackName: string, fallbackPhone: string) {
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);
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

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressStreet.trim() || !addressArea.trim()) {
      toast.error("Please fill in the full street address and area.");
      return;
    }

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((a) => {
          if (a.id === editingAddressId) {
            return {
              ...a,
              label: addressLabel,
              name: addressName,
              phone: addressPhone,
              division: addressDivision,
              city: addressCity,
              area: addressArea,
              street: addressStreet,
              isDefault: addressIsDefault,
            };
          }
          return addressIsDefault ? { ...a, isDefault: false } : a;
        }),
      );
      toast.success("Address updated successfully!");
    } else {
      const newAddr: SavedAddress = {
        id: `addr-${Date.now()}`,
        label: addressLabel,
        isDefault: addressIsDefault || addresses.length === 0,
        name: addressName || fallbackName,
        phone: addressPhone || fallbackPhone,
        division: addressDivision,
        city: addressCity,
        area: addressArea,
        street: addressStreet,
      };

      setAddresses((prev) => [
        ...(addressIsDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev),
        newAddr,
      ]);
      toast.success("New address added to your address book!");
    }

    setIsAddressModalOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed from address book.");
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    );
    toast.success("Default shipping address updated.");
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

