import { useState, useRef, useEffect } from "react";
import { MessageCircle, Instagram, Headset, PhoneCall, X } from "lucide-react";
import { toast } from "sonner";

const CHAT_OPTIONS = [
  {
    id: "messenger",
    label: "Messenger",
    icon: MessageCircle,
    color: "bg-[#0084FF] text-white",
    onClick: () => toast("Opening Messenger... (demo)"),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: PhoneCall,
    color: "bg-[#25D366] text-white",
    onClick: () => toast("Opening WhatsApp... (demo)"),
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    color: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white",
    onClick: () => toast("Opening Instagram... (demo)"),
  },
  {
    id: "customer-care",
    label: "Customer Care",
    icon: Headset,
    color: "bg-primary text-primary-foreground",
    onClick: () => toast("Starting Live Chat... (demo)"),
  },
];

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-2 sm:bottom-6 right-2 sm:right-6 z-50" ref={menuRef}>
      {/* Expanded Menu */}
      <div
        className={`absolute bottom-14 sm:bottom-16 right-0 mb-2 sm:mb-4 flex flex-col items-end gap-2 sm:gap-3 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {CHAT_OPTIONS.map((option) => {
          const Icon = option.icon;
          return (
            <div key={option.id} className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline rounded-xl bg-background px-3 py-1.5 text-[11px] font-medium shadow-md whitespace-nowrap">
                {option.label}
              </span>
              <button
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 shrink-0 ${option.color}`}
                aria-label={option.label}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105 active:scale-95 shrink-0"
        aria-label="Chat with us"
      >
        <div className="relative">
          <MessageCircle
            className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 ${
              isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            className={`absolute inset-0 h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 ${
              isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </div>
      </button>
    </div>
  );
}
