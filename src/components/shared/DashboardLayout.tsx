"use client";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { usePathname } from "next/navigation";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const getTitle = (path: string) => {
    if (path === "/") return "Academic Portal";
    if (path === "/emplois-du-temps") return "Emploi du Temps";
    if (path === "/salles") return "Gestion des Salles";
    if (path === "/faculty") return "Annuaire des Enseignants";
    if (path === "/structures") return "Configuration Académique";
    if (path === "/requetes") return "Portail des Requêtes";
    if (path === "/validation") return "Portail de Validation";
    return "Academic Portal";
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar title={getTitle(pathname)} />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
