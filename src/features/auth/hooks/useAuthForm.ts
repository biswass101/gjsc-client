"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@/lib/navigation";
import { useShop } from "@/context";
import type { GoogleAccount } from "../types";

export function useAuthForm() {
  const navigate = useNavigate();
  const { user, login, loginWithGoogle, logout, wishlist } = useShop();

  // Tab State
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Login Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPass, setRegPass] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  // Password Reset Dialog
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // Google OAuth State
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  const [isCustomGoogleOpen, setIsCustomGoogleOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSelectGoogleAccount = (acc: GoogleAccount) => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      loginWithGoogle(acc);
      setIsGoogleLoading(false);
      setIsGoogleModalOpen(false);
      toast.success(`Connected with Google as ${acc.name}!`, {
        description: `Signed in with ${acc.email}`,
      });
      navigate({ to: "/account" });
    }, 450);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail) return;
    setIsGoogleLoading(true);
    setTimeout(() => {
      const namePart = customGoogleEmail.split("@")[0] ?? "Google User";
      const name = namePart.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      loginWithGoogle({
        name,
        email: customGoogleEmail,
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      });
      setIsGoogleLoading(false);
      setIsGoogleModalOpen(false);
      setIsCustomGoogleOpen(false);
      toast.success(`Connected with Google as ${name}!`, {
        description: `Signed in with ${customGoogleEmail}`,
      });
      navigate({ to: "/account" });
    }, 450);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPass) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const u = login(loginEmail, loginPass);
      setIsLoading(false);
      toast.success(`Welcome back, ${u.name}!`, {
        description:
          u.role === "admin"
            ? "Logged in as Administrator."
            : "Welcome back to your Japanese beauty sanctuary.",
      });

      if (u.role === "admin") {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/account" });
      }
    }, 400);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regPass) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Phone validation for Bangladesh numbers
    const cleanPhone = regPhone.replace(/[\s-]/g, "");
    if (cleanPhone && !/^01[3-9]\d{8}$/.test(cleanPhone)) {
      toast.error("Invalid Bangladeshi mobile number", {
        description: "Please enter a valid 11-digit mobile number (e.g. 017XXXXXXXX).",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const u = login(regEmail, regPass);
      setIsLoading(false);
      toast.success(`Account created! Welcome, ${regName || u.name}`, {
        description: "You've received 500 Welcome Ritual Points in your account.",
      });
      navigate({ to: "/account" });
    }, 400);
  };

  const handleLogout = () => {
    logout();
    toast.info("Signed out successfully", {
      description: "We look forward to seeing you again.",
    });
  };

  const handleFillDemo = (type: "customer" | "admin") => {
    if (type === "customer") {
      setLoginEmail("nusrat.jahan@gmail.com");
      setLoginPass("sakura2026");
      toast.info("Customer credentials loaded");
    } else {
      setLoginEmail("admin@gloriousjapan.com");
      setLoginPass("adminPass2026");
      toast.info("Admin credentials loaded");
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSent(true);
    toast.success("Password reset instructions sent!", {
      description: `A recovery link has been sent to ${resetEmail}.`,
    });
  };

  return {
    user,
    wishlist,
    activeTab,
    setActiveTab,
    loginEmail,
    setLoginEmail,
    loginPass,
    setLoginPass,
    showLoginPass,
    setShowLoginPass,
    rememberMe,
    setRememberMe,
    regName,
    setRegName,
    regEmail,
    setRegEmail,
    regPhone,
    setRegPhone,
    regPass,
    setRegPass,
    showRegPass,
    setShowRegPass,
    newsletter,
    setNewsletter,
    isResetOpen,
    setIsResetOpen,
    resetEmail,
    setResetEmail,
    resetSent,
    setResetSent,
    isGoogleModalOpen,
    setIsGoogleModalOpen,
    isGoogleLoading,
    customGoogleEmail,
    setCustomGoogleEmail,
    isCustomGoogleOpen,
    setIsCustomGoogleOpen,
    isLoading,
    handleSelectGoogleAccount,
    handleCustomGoogleSubmit,
    handleLogin,
    handleRegister,
    handleLogout,
    handleFillDemo,
    handleResetPassword,
  };
}

