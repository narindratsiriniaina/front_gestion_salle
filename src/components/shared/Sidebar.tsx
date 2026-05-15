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
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", href: "/" },
  { icon: Calendar, label: "Emplois du temps", href: "/schedules" },
  { icon: DoorOpen, label: "Salles de classe", href: "/classrooms" },
  { icon: Users, label: "Enseignants", href: "/faculty" },
  { icon: Network, label: "Structures", href: "/structures" },
  { icon: ClipboardList, label: "Requêtes", href: "/requests" },
  { icon: CheckSquare, label: "Validation", href: "/validation" },
];

const bottomItems = [
  { icon: Settings, label: "Paramètres", href: "/settings" },
  { icon: LifeBuoy, label: "Aide & Support", href: "/support" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-[#001f3f] text-white border-r border-white/10">
      <div className="p-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Network className="text-[#001f3f] w-6 h-6" />
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
                ? "bg-[#b8860b] text-white font-medium" 
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
          className="w-full justify-start gap-3 bg-[#b8860b] hover:bg-[#a67a0a] text-white border-none"
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
        </div>
      </div>
    </div>
  );
}
