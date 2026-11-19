import type { Metadata, Viewport } from "next";
import "../styles.css";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "Glorious Japan Skin Care",
  description: "Authentic Japanese beauty and skincare. Stay Glorious, Shine with Confidence.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}