import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import type { User } from "@/types";
import { apiClient, tokenStorage } from "@/lib/api";
import type { ProfileUpdateInput } from "@/context/shop-types";

async function resizeAvatarDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxSize = 360;
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => resolve(reader.result as string);
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

export function useAccountProfile(
  user: User | null,
  updateUserProfile: (updates: ProfileUpdateInput) => Promise<void> | void,
  onProfileMutated?: () => void,
) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [tempAvatar, setTempAvatar] = useState<string | undefined>(user?.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setAvatar(user.avatar);
      setTempAvatar(user.avatar);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setAvatar(undefined);
      setTempAvatar(undefined);
    }
  }, [user]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size exceeds 5MB limit. Please choose a smaller image.");
      return;
    }

    try {
      if (tokenStorage.get()) {
        try {
          const formData = new FormData();
          formData.append("image", file);
          const uploaded = await apiClient.upload<{ url: string }>("/uploads/image", formData);
          if (uploaded?.url && !uploaded.url.startsWith("data:")) {
            setTempAvatar(uploaded.url);
            toast.success("Photo uploaded! Click 'Save Changes' to apply.");
            return;
          }
        } catch {
          /* fall through to compressed data URL */
        }
      }

      const compressed = await resizeAvatarDataUrl(file);
      setTempAvatar(compressed);
      toast.success("Photo selected! Click 'Save Changes' to update your profile.");
    } catch {
      toast.error("Failed to process image file.");
    }
  };

  const handleRemovePhoto = () => {
    setTempAvatar(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Photo removed. Remember to click 'Save Changes' to apply.");
  };

  const handleCancelEditProfile = () => {
    setIsEditingProfile(false);
    setTempAvatar(avatar);
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setAddress(user?.address || "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await updateUserProfile({
        name,
        phone: phone.trim() ? phone.trim() : null,
        address: address.trim() ? address.trim() : null,
        avatar: tempAvatar ?? null,
      });
      setAvatar(tempAvatar);
      setIsEditingProfile(false);
      toast.success("Profile updated successfully!");
      onProfileMutated?.();
    } catch (err: any) {
      toast.error("Failed to update profile", {
        description: err?.message || "Please try again.",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  return {
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
  };
}
