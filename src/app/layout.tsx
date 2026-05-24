import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EMIT | Gestion de Salles",
  description: "Portail académique moderne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        <DashboardLayout>{children}</DashboardLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
