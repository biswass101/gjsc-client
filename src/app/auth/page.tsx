"use client";

import { Layout } from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAuthForm,
  AuthMemberHub,
  AuthBrandingPanel,
  AuthLoginForm,
  AuthRegisterForm,
  AuthResetPasswordDialog,
  AuthGoogleModal,
} from "@/features/auth";

export default function AuthPage() {
  const {
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
  } = useAuthForm();

  // Logged-in profile hub
  if (user) {
    return (
      <Layout>
        <AuthMemberHub user={user} wishlistCount={wishlist.length} onLogout={handleLogout} />
      </Layout>
    );
  }

  // Guest authentication screen
  return (
    <Layout>
      <div className="container-lux py-10 sm:py-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm grid lg:grid-cols-12">
          {/* Left Column: Branding & VIP Perks */}
          <AuthBrandingPanel />

          {/* Right Column: Auth Tabs & Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as "login" | "register")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 rounded-full border border-border/60 bg-secondary/40 p-1">
                  <TabsTrigger
                    value="login"
                    className="rounded-full text-xs font-semibold uppercase tracking-wider py-2 cursor-pointer"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="rounded-full text-xs font-semibold uppercase tracking-wider py-2 cursor-pointer"
                  >
                    Create Account
                  </TabsTrigger>
                </TabsList>

                {/* SIGN IN TAB */}
                <TabsContent value="login" className="mt-6">
                  <AuthLoginForm
                    loginEmail={loginEmail}
                    onLoginEmailChange={setLoginEmail}
                    loginPass={loginPass}
                    onLoginPassChange={setLoginPass}
                    showLoginPass={showLoginPass}
                    onToggleShowLoginPass={() => setShowLoginPass(!showLoginPass)}
                    rememberMe={rememberMe}
                    onRememberMeChange={setRememberMe}
                    isLoading={isLoading}
                    isGoogleLoading={isGoogleLoading}
                    onFillDemo={handleFillDemo}
                    onOpenGoogleModal={() => setIsGoogleModalOpen(true)}
                    onOpenResetPassword={() => setIsResetOpen(true)}
                    onSwitchToRegister={() => setActiveTab("register")}
                    onSubmit={handleLogin}
                  />
                </TabsContent>

                {/* CREATE ACCOUNT TAB */}
                <TabsContent value="register" className="mt-6">
                  <AuthRegisterForm
                    regName={regName}
                    onRegNameChange={setRegName}
                    regEmail={regEmail}
                    onRegEmailChange={setRegEmail}
                    regPhone={regPhone}
                    onRegPhoneChange={setRegPhone}
                    regPass={regPass}
                    onRegPassChange={setRegPass}
                    showRegPass={showRegPass}
                    onToggleShowRegPass={() => setShowRegPass(!showRegPass)}
                    newsletter={newsletter}
                    onNewsletterChange={setNewsletter}
                    isLoading={isLoading}
                    isGoogleLoading={isGoogleLoading}
                    onOpenGoogleModal={() => setIsGoogleModalOpen(true)}
                    onSwitchToLogin={() => setActiveTab("login")}
                    onSubmit={handleRegister}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <AuthResetPasswordDialog
        isOpen={isResetOpen}
        onOpenChange={setIsResetOpen}
        resetEmail={resetEmail}
        onResetEmailChange={setResetEmail}
        resetSent={resetSent}
        onClose={() => {
          setIsResetOpen(false);
          setResetSent(false);
          setResetEmail("");
        }}
        onSubmit={handleResetPassword}
      />

      {/* Google Account OAuth Dialog */}
      <AuthGoogleModal
        isOpen={isGoogleModalOpen}
        onOpenChange={setIsGoogleModalOpen}
        isLoading={isGoogleLoading}
        isCustomGoogleOpen={isCustomGoogleOpen}
        onSetIsCustomGoogleOpen={setIsCustomGoogleOpen}
        customGoogleEmail={customGoogleEmail}
        onCustomGoogleEmailChange={setCustomGoogleEmail}
        onSelectAccount={handleSelectGoogleAccount}
        onCustomGoogleSubmit={handleCustomGoogleSubmit}
      />
    </Layout>
  );
}
