"use client";

import { useRef, useEffect, useState } from "react";
import { Link } from "@/lib/navigation";
import { User, Settings, LogOut } from "lucide-react";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface UserDropdownProps {
  user: User | null;
  onLogout: () => void;
}

export function UserDropdown({ user, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
    toast("Signed out successfully.");
  };

  return (
    <div ref={dropdownRef} className="relative mr-1 hidden md:block">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Account"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((v) => !v)}
        className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
      >
        {user ? (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
            {user.name[0]?.toUpperCase()}
          </span>
        ) : (
          <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-popover shadow-[var(--shadow-lift)]">
          {user ? (
            <>
              <div className="border-b border-border px-4 py-3">
                <p className="text-[12px] font-semibold">{user.name}</p>
                <p className="text-[11px] text-muted-foreground">{user.email}</p>
                {user.role === "admin" && (
                  <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">Admin</span>
                )}
              </div>
              <div className="p-1">
                <Link
                  to="/account"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] transition-colors hover:bg-secondary"
                >
                  <User className="h-3.5 w-3.5" strokeWidth={1.5} /> My Account
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] transition-colors hover:bg-secondary"
                  >
                    <Settings className="h-3.5 w-3.5" strokeWidth={1.5} /> Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[12px] text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} /> Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="p-1">
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] transition-colors hover:bg-secondary"
              >
                <User className="h-3.5 w-3.5" strokeWidth={1.5} /> Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}