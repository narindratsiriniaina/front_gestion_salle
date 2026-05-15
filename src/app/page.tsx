"use client";

import { 
  Users, 
  DoorOpen, 
  Calendar, 
  CheckSquare, 
  TrendingUp,
  ArrowRight,
  Bell
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#001f3f] tracking-tight">Bienvenue, Admin</h1>
          <p className="text-gray-500 mt-1">Voici un aperçu de l'état actuel de l'université.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#b8860b] hover:bg-[#a67a0a] gap-2 shadow-lg shadow-amber-900/10 h-12 px-6">
            <TrendingUp className="w-4 h-4" /> Voir les rapports
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Enseignants Actifs", value: "42", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Salles Disponibles", value: "82/124", icon: DoorOpen, color: "text-green-600", bg: "bg-green-50" },
          { label: "Cours Aujourd'hui", value: "18", icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Validations en attente", value: "4", icon: CheckSquare, color: "text-red-600", bg: "bg-red-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <CardContent className="p-6 relative">
              <div className={`absolute -right-2 -bottom-2 opacity-5 group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={80} />
              </div>
              <div className="flex items-center gap-4">
                <div className={`${stat.bg} w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <h4 className="text-2xl font-black text-[#001f3f]">{stat.value}</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-6 px-8">
            <CardTitle className="text-xl font-bold text-[#001f3f]">Activités Récentes</CardTitle>
            <Button variant="ghost" className="text-blue-600 font-bold hover:bg-blue-50 gap-1">
              Tout voir <ArrowRight size={16} />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50">
              {[
                { title: "Nouveau planning validé", time: "Il y a 10 min", user: "Admin", type: "success" },
                { title: "Demande de salle Labo 3", time: "Il y a 45 min", user: "Dr. Rakoto", type: "pending" },
                { title: "Maintenance prévue Salle 104", time: "Il y a 2 heures", user: "Système", type: "info" },
                { title: "Alerte conflit d'horaire L3", time: "Il y a 4 heures", user: "Système", type: "error" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-green-50 text-green-600' :
                    activity.type === 'error' ? 'bg-red-50 text-red-600' :
                    activity.type === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Bell size={18} className="group-hover:animate-ring" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 group-hover:text-[#001f3f] transition-colors">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                  <Badge variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} />
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="bg-[#001f3f] text-white border-none shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <TrendingUp size={100} />
            </div>
            <CardContent className="p-8 space-y-6 relative z-10">
              <h3 className="text-xl font-bold">Performance Académique</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-blue-200/70 text-sm">Taux d'occupation des salles</p>
                  <p className="text-2xl font-black">78%</p>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
              <Button className="w-full bg-white text-[#001f3f] hover:bg-blue-50 font-bold h-12 rounded-xl">
                Détails de l'analyse
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp className="text-amber-600 w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Support Technique</h4>
                <p className="text-xs text-gray-500 mt-1">Besoin d'aide avec la plateforme ?</p>
              </div>
              <Button variant="outline" className="w-full border-dashed border-2 hover:border-[#001f3f] hover:text-[#001f3f]">
                Contacter le support
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
