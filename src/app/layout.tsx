import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "EMIT | University Management System",
  description: "Modern academic portal for institutional management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DashboardLayout>{children}</DashboardLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
