"use client";

import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ValidationStats() {
  return (
    <Card className="bg-[#001f3f] text-white border-none shadow-xl">
      <CardContent className="p-8 space-y-6">
        <h3 className="text-xl font-bold">Statistiques du jour</h3>
        
        <div className="flex justify-between items-end">
          <p className="text-blue-200/70 text-sm font-medium">Total Validations</p>
          <p className="text-4xl font-black">24</p>
        </div>

        <div className="space-y-2">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '82%' }} />
          </div>
          <p className="text-[11px] text-blue-200/60 font-medium">Taux d'approbation : 82%</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentHistory() {
  const events = [
    {
      id: 1,
      title: "Salle Labo 102 Approuvée",
      meta: "Par vous • Aujourd'hui, 09:45",
      type: "success"
    },
    {
      id: 2,
      title: "Report examen rejeté",
      meta: "Motif : Délai trop court • Hier",
      type: "error"
    },
    {
      id: 3,
      title: "Ajout séance tutorat",
      meta: "Par vous • Hier",
      type: "neutral"
    }
  ];

  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-[#001f3f]">Historique Récent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
          {events.map((event) => (
            <div key={event.id} className="flex gap-4 relative">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                event.type === 'success' ? 'bg-blue-50 text-blue-600' :
                event.type === 'error' ? 'bg-red-50 text-red-600' :
                'bg-gray-50 text-gray-600'
              } border-2 border-white`}>
                {event.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                 event.type === 'error' ? <XCircle className="w-3.5 h-3.5" /> :
                 <Clock className="w-3.5 h-3.5" />}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-tight">{event.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{event.meta}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-2 text-gray-600 border-gray-200">
          Voir tout l'historique
        </Button>
      </CardContent>
    </Card>
  );
}
