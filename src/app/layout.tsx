import type { Metadata } from "next";
import "./globals.css";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <DashboardLayout>{children}</DashboardLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
