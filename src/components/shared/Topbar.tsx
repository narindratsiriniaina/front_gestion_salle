"use client";

import { Search, Bell, HelpCircle, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className="h-16 border-b border-gray-200 bg-white px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-8 flex-1">
        <h2 className="text-xl font-bold text-[#17203A] whitespace-nowrap">{title}</h2>
        
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Rechercher une demande, une salle..." 
            className="pl-10 bg-gray-50 border-none focus-visible:ring-1 focus-visible:ring-[#17203A]/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" className="gap-2 border-gray-300 text-gray-700 font-semibold px-6">
          Switch Role
          <ChevronDown className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#17203A] hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#17203A] hover:bg-gray-100">
            <HelpCircle className="w-5 h-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1 h-auto hover:bg-gray-100 rounded-full ml-2">
                <div className="w-9 h-9 bg-[#17203A] rounded-full flex items-center justify-center text-white font-bold">
                  <User className="w-5 h-5" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>Mon Profil</DropdownMenuItem>
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
