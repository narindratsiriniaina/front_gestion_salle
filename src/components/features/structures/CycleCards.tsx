"use client";

import { Download, Calendar, ArrowRight, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AcademicCycles() {
  return (
    <Card className="shadow-sm border-none bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-lg font-bold text-[#17203A]">Cycles Académiques</CardTitle>
        <Button variant="ghost" size="sm" className="text-amber-600 font-semibold gap-1 px-0 hover:bg-transparent">
          <Download className="w-4 h-4" /> Exporter le planning
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50/50 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-blue-900/60 uppercase tracking-wider">Année Actif</p>
              <h4 className="text-2xl font-bold text-blue-950">2023 - 2024</h4>
            </div>
            <Badge className="bg-[#17203A] text-white hover:bg-[#17203A] border-none rounded-full px-4">
              Actuel
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white border p-3 rounded-xl text-center shadow-sm">
              <p className="text-xs font-medium text-gray-500 mb-1">Semestre 1</p>
              <p className="text-sm font-bold text-gray-400">Fermé</p>
            </div>
            <div className="bg-white border-2 border-amber-600/20 p-3 rounded-xl text-center shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-xs font-medium text-amber-600 mb-1">Semestre 2</p>
              <p className="text-sm font-bold text-amber-600">Actif</p>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full py-6 border-dashed border-2 border-gray-300 text-gray-500 hover:border-[#17203A] hover:text-[#17203A] bg-transparent gap-2 rounded-xl">
          <Calendar className="w-5 h-5" />
          Configurer l'Année Prochaine
        </Button>
      </CardContent>
    </Card>
  );
}

export function CapacitéCard() {
  return (
    <Card className="bg-[#17203A] text-white border-none shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
        <Network size={120} />
      </div>
      <CardContent className="p-8 space-y-6 relative z-10">
        <div>
          <p className="text-blue-200/60 font-medium text-sm mb-1">Capacité Totale</p>
          <h2 className="text-5xl font-black tracking-tight">1,240</h2>
          <p className="text-blue-200/60 text-xs mt-1">Sur tous les niveaux</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-blue-200">75% Objectif d'inscription atteint</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
