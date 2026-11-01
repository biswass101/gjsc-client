import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import type { User } from "@/types";

export function useAccountProfile(
  user: User | null,
  updateUserProfile: (updates: Partial<User>) => void,
) {
  const [name, setName] = useState(user?.name || "Nusrat Jahan");
  const [email, setEmail] = useState(user?.email || "nusrat.jahan@gmail.com");
  const [phone, setPhone] = useState(user?.phone || "01712-849201");
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [tempAvatar, setTempAvatar] = useState<string | undefined>(user?.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.phone) setPhone(user.phone);
      setAvatar(user.avatar);
      setTempAvatar(user.avatar);
    }
  }, [user]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setTempAvatar(result);
      toast.success("Photo selected! Click 'Save Changes' to update your profile.");
    };
    reader.onerror = () => {
      toast.error("Failed to read image file.");
    };
    reader.readAsDataURL(file);
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
    setName(user?.name || "Nusrat Jahan");
    setEmail(user?.email || "nusrat.jahan@gmail.com");
    setPhone(user?.phone || "01712-849201");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setAvatar(tempAvatar);
    updateUserProfile({
      name,
      email,
      phone,
      avatar: tempAvatar,
    });
    setIsEditingProfile(false);
    toast.success("Profile & photo updated successfully! 🌸");
  };

  return {
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
  };
}

