"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  DoorOpen, 
  Users, 
  Network, 
  ClipboardList, 
  CheckSquare, 
  Settings, 
  LifeBuoy,
  Plus,
  LogOut
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const baseMenuItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", href: "/" },
  { icon: Calendar, label: "Emplois du temps", href: "/emplois-du-temps" },
  { icon: DoorOpen, label: "Salles de classe", href: "/salles" },
  { icon: Users, label: "Enseignants", href: "/faculty" },
  { icon: Network, label: "Structures", href: "/structures" },
  { icon: ClipboardList, label: "Requêtes", href: "/requetes" },
  { icon: CheckSquare, label: "Validation", href: "/validation" },
];

const bottomItems = [
  { icon: Settings, label: "Paramètres", href: "/parametres" },
  { icon: LifeBuoy, label: "Aide & Support", href: "/support" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setRole(user.role);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const menuItems = [...baseMenuItems];
  if (role === "admin") {
    menuItems.push({ icon: Users, label: "Utilisateurs", href: "/admin/utilisateurs" });
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/connexion";
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-[#17203A] text-white border-r border-white/10">
      <div className="p-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Network className="text-[#17203A] w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">EMIT</h1>
            <p className="text-[10px] text-white/60 uppercase tracking-wider">University Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              pathname === item.href 
                ? "bg-[#5C8ABF] text-white font-medium" 
                : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              pathname === item.href ? "text-white" : "text-white/60 group-hover:text-white"
            )} />
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-4 py-6 space-y-4">
        <Button 
          className="w-full justify-start gap-3 bg-[#5C8ABF] hover:bg-[#a67a0a] text-white border-none"
          size="lg"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-semibold">Nouvelle Requête</span>
        </Button>

        <div className="pt-4 border-t border-white/10 space-y-1">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all",
                pathname === item.href && "text-white bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5 text-white/60" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-left"
          >
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-sm">Se déconnecter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
