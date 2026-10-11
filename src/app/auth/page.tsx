"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShop } from "@/lib/store";

export default function AuthPage() {
  const { user, login, logout } = useShop();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPass, setRegPass] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPass) return;
    const u = login(loginEmail, loginPass);
    toast.success(`Welcome back, ${u.name}!`);
    if (u.role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/account";
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const u = login(regEmail, regPass);
    toast.success(`Account created — welcome, ${regName || u.name}!`);
    window.location.href = "/account";
  };

  const handleLogout = () => {
    logout();
    toast("Signed out successfully.");
  };

  if (user) {
    return (
      <Layout>
        <div className="container-lux flex justify-center py-20">
          <div className="w-full max-w-md text-center">
            <img
              src="/glorious-japan-skin-care-logo.jpeg"
              alt="Glorious Japan Skin Care"
              width={72}
              height={72}
              className="mx-auto h-16 w-16 object-contain"
            />
            <p className="eyebrow mt-4">My Account</p>
            <h1 className="mt-3 font-display text-4xl">Hello, {user.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
            {user.role === "admin" && (
              <div className="mt-2">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Admin</span>
              </div>
            )}
            <div className="mt-8 flex flex-col gap-3">
              {user.role === "admin" && (
                <Button asChild className="rounded-full py-6 text-xs uppercase tracking-[0.2em]">
                  <a href="/admin">Go to Admin Panel</a>
                </Button>
              )}
              <Button asChild variant="outline" className="rounded-full py-6 text-xs uppercase tracking-[0.2em]">
                <a href="/account">My Account</a>
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="rounded-full py-6 text-xs uppercase tracking-[0.2em] text-destructive hover:text-destructive"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-lux flex justify-center py-20">
        <div className="w-full max-w-md">
          <div className="text-center">
            <img
              src="/glorious-japan-skin-care-logo.jpeg"
              alt="Glorious Japan Skin Care"
              width={72}
              height={72}
              className="mx-auto h-16 w-16 object-contain"
            />
            <p className="eyebrow mt-4">Welcome</p>
            <h1 className="mt-3 font-display text-4xl">Your Glorious Account</h1>
            <p className="mt-2 text-xs text-muted-foreground">
              Tip: Use any <code className="rounded bg-secondary px-1">@admin</code> email to sign in as admin
            </p>
          </div>
          <Tabs defaultValue="login" className="mt-8">
            <TabsList className="grid w-full grid-cols-2 rounded-full">
              <TabsTrigger value="login" className="rounded-full">Sign in</TabsTrigger>
              <TabsTrigger value="register" className="rounded-full">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form className="surface-card mt-6 space-y-4 p-6" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="li-email">Email</Label>
                  <Input id="li-email" type="email" required className="mt-2 rounded-full" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="li-pass">Password</Label>
                  <Input id="li-pass" type="password" required className="mt-2 rounded-full" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} />
                </div>
                <Button type="submit" className="w-full rounded-full py-6 text-xs uppercase tracking-[0.2em]">Sign in</Button>
                <p className="text-center text-xs text-muted-foreground">
                  Forgot your password?{" "}
                  <button type="button" onClick={() => toast("Reset link sent (demo)")} className="text-primary hover:underline">
                    Reset it
                  </button>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form className="surface-card mt-6 space-y-4 p-6" onSubmit={handleRegister}>
                <div>
                  <Label htmlFor="rg-name">Full name</Label>
                  <Input id="rg-name" required className="mt-2 rounded-full" value={regName} onChange={(e) => setRegName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="rg-email">Email</Label>
                  <Input id="rg-email" type="email" required className="mt-2 rounded-full" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="rg-phone">Phone</Label>
                  <Input id="rg-phone" type="tel" required className="mt-2 rounded-full" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="rg-pass">Password</Label>
                  <Input id="rg-pass" type="password" required className="mt-2 rounded-full" value={regPass} onChange={(e) => setRegPass(e.target.value)} />
                </div>
                <Button type="submit" className="w-full rounded-full py-6 text-xs uppercase tracking-[0.2em]">Create account</Button>
                <p className="text-center text-xs text-muted-foreground">
                  By registering you agree to our{" "}
                  <a href="/terms" className="text-primary hover:underline">Terms</a>.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
