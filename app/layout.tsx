import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeEffect } from "@/lib/theme-effect";
import { ThemeScript } from "./theme-script";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pizza Dash",
  description: "A Pizza Delivery Website",
  generator: "Mukesh ghildiyal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <ThemeScript />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="pizza-dashboard-theme"
        >
          <AuthProvider>
            <ThemeEffect />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
