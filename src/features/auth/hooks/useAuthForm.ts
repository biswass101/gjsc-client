"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@/lib/navigation";
import { useShop } from "@/context";
import { authApi, tokenStorage } from "@/lib/api";
import {
  clearOAuthState,
  consumeAndVerifyOAuthState,
  getOAuthProviderFromState,
  type OAuthMode,
  type OAuthProvider,
} from "@/lib/oauth/state";
import { getGoogleRedirectUri, redirectToGoogleOAuth } from "@/lib/oauth/google";
import { getFacebookRedirectUri, redirectToFacebookOAuth } from "@/lib/oauth/facebook";

// Module-level deduplication so React StrictMode double-effects never reuse single-use OAuth codes
const processedOAuthCallbacks = new Set<string>();

export function useAuthForm() {
  const navigate = useNavigate();
  const {
    user,
    login,
    registerUser,
    loginWithGoogle,
    loginWithFacebook,
    refreshUserProfile,
    logout,
    wishlist,
  } = useShop();

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

  // OAuth & Loading States
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [completingOAuthProvider, setCompletingOAuthProvider] =
    useState<OAuthProvider | null>(null);
  const [completingOAuthMode, setCompletingOAuthMode] = useState<OAuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);

  // Handle traditional OAuth 2.0 Authorization Code return (?code=...&state=...)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const oauthError = params.get("error");
    const oauthErrorDesc =
      params.get("error_description") || params.get("error_message");

    if (!code && !oauthError) return;

    const detectedProvider = getOAuthProviderFromState(state);
    const dedupeKey = `${detectedProvider || "unknown"}:${code || oauthError || state || ""}`;
    if (processedOAuthCallbacks.has(dedupeKey)) {
      return;
    }
    processedOAuthCallbacks.add(dedupeKey);

    // Immediately clean OAuth query parameters (and Facebook's #_=_ fragment) from the URL
    window.history.replaceState({}, "", "/auth");

    if (oauthError) {
      clearOAuthState();
      const label = detectedProvider === "facebook" ? "Facebook" : "Google";
      if (oauthError === "access_denied") {
        toast.info(`${label} sign-in was cancelled.`);
      } else {
        toast.error(`${label} Sign-In Failed`, {
          description: oauthErrorDesc || oauthError,
        });
      }
      return;
    }

    if (!code) return;

    const { valid, provider, mode } = consumeAndVerifyOAuthState(state);
    if (!valid || !provider) {
      toast.error("Sign-In Verification Failed", {
        description:
          "Security validation failed (invalid or expired OAuth state). Please try again.",
      });
      return;
    }

    const providerLabel = provider === "google" ? "Google" : "Facebook";
    setCompletingOAuthMode(mode);
    setCompletingOAuthProvider(provider);
    if (provider === "google") {
      setIsGoogleLoading(true);
    } else {
      setIsFacebookLoading(true);
    }

    void (async () => {
      try {
        if (mode === "link") {
          if (!tokenStorage.get()) {
            toast.error("Please sign in first", {
              description: "Sign into your account before connecting another login method.",
            });
            setCompletingOAuthProvider(null);
            return;
          }
          const res =
            provider === "google"
              ? await authApi.linkGoogle({
                  code,
                  redirectUri: getGoogleRedirectUri(),
                })
              : await authApi.linkFacebook({
                  code,
                  redirectUri: getFacebookRedirectUri(),
                });
          await refreshUserProfile?.();
          toast.success(`${providerLabel} Account Connected!`, {
            description:
              res.message || `${providerLabel} Sign-In is now unified with your profile.`,
          });
          navigate({ to: "/account", search: { tab: "settings" } });
          return;
        }

        const authenticatedUser =
          provider === "google"
            ? await loginWithGoogle({
                code,
                redirectUri: getGoogleRedirectUri(),
              })
            : await loginWithFacebook({
                code,
                redirectUri: getFacebookRedirectUri(),
              });

        toast.success(`Signed in with ${providerLabel} as ${authenticatedUser.name}!`, {
          description: `Authenticated as ${authenticatedUser.email}`,
        });
        navigate({ to: authenticatedUser.role === "admin" ? "/admin" : "/account" });
      } catch (err: any) {
        toast.error(
          mode === "link"
            ? `Could not connect ${providerLabel}`
            : `${providerLabel} Sign-In Failed`,
          {
            description:
              err?.message || `Could not verify your ${providerLabel} account. Please try again.`,
          },
        );
        setCompletingOAuthProvider(null);
        if (mode === "link" && tokenStorage.get()) {
          navigate({ to: "/account", search: { tab: "settings" } });
        }
      } finally {
        setIsGoogleLoading(false);
        setIsFacebookLoading(false);
      }
    })();
  }, [loginWithGoogle, loginWithFacebook, refreshUserProfile, navigate]);

  const handleGoogleSignIn = () => {
    const clientId = process.env["NEXT_PUBLIC_GOOGLE_CLIENT_ID"];
    if (!clientId) {
      toast.error("Google Sign-In Not Configured", {
        description: "Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment configuration.",
      });
      return;
    }

    setIsGoogleLoading(true);
    redirectToGoogleOAuth(clientId);
  };

  const handleFacebookSignIn = () => {
    const appId = process.env["NEXT_PUBLIC_FACEBOOK_APP_ID"];
    if (!appId) {
      toast.error("Facebook Login Not Configured", {
        description: "Missing NEXT_PUBLIC_FACEBOOK_APP_ID environment configuration.",
      });
      return;
    }

    setIsFacebookLoading(true);
    redirectToFacebookOAuth(appId);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPass) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const u = await login(loginEmail, loginPass);
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
    } catch (err: any) {
      setIsLoading(false);
      toast.error("Login Failed", {
        description: err?.message || "Invalid email or password",
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
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
    try {
      const u = registerUser
        ? await registerUser(regName, regEmail, regPass, cleanPhone)
        : await login(regEmail, regPass);
      setIsLoading(false);
      toast.success(`Account created! Welcome, ${regName || u.name}`, {
        description:
          "You've unlocked +100 Welcome Ritual Points (complete onboarding for up to 500 Pts).",
      });
      navigate({ to: "/account" });
    } catch (err: any) {
      setIsLoading(false);
      toast.error("Registration Failed", {
        description: err?.message || "Could not create account",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast.info("Signed out successfully", {
      description: "We look forward to seeing you again.",
    });
  };

  const handleFillDemo = (type: "customer" | "admin") => {
    if (type === "customer") {
      setLoginEmail("customer@gloriousjapan.com");
      setLoginPass("CustomerPass123!");
      toast.info("Customer credentials loaded");
    } else {
      setLoginEmail("admin@gloriousjapan.com");
      setLoginPass("AdminPassword123!");
      toast.info("Admin credentials loaded (admin@gloriousjapan.com)");
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
    isGoogleLoading,
    isFacebookLoading,
    completingOAuthProvider,
    completingOAuthMode,
    isLoading,
    handleGoogleSignIn,
    handleFacebookSignIn,
    handleLogin,
    handleRegister,
    handleLogout,
    handleFillDemo,
    handleResetPassword,
  };
}
