"use client";

import { AlertTriangle, Clock, MapPin, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const validationRequests = [
  {
    id: 1,
    type: "Changement de Salle",
    subject: "CS-301",
    requester: "Dr. Jean Dupont",
    timeAgo: "Il y a 2 heures",
    priority: "Moyenne Priorité",
    priorityColor: "bg-blue-100 text-blue-700",
    justification: "Panne de climatisation signalée dans la salle initiale (Amphi B). Nécessite un transfert immédiat pour le cours d'Algorithmique de 14h.",
    conflicts: [
      "Chevauchement partiel avec le cours \"Réseaux\" de 15h30. Impact : 30 minutes."
    ]
  },
  {
    id: 2,
    type: "Modification d'Horaire",
    subject: "TD Mathématiques",
    requester: "Mme. Sarah Bel",
    timeAgo: "Il y a 5 heures",
    priority: "Haute Priorité",
    priorityColor: "bg-amber-100 text-amber-700",
    justification: "Décalage du créneau du mardi matin au vendredi après-midi pour accommoder un intervenant externe.",
    impact: "Aucun conflit majeur détecté. La salle 204 est libre sur le nouveau créneau."
  }
];

export function PendingRequests() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#17203A]" />
          <h3 className="text-xl font-bold text-[#17203A]">Demandes en attente</h3>
        </div>
        <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400 border-none px-4 py-1">
          4 Actions requises
        </Badge>
      </div>

      {validationRequests.map((req) => (
        <Card key={req.id} className="border-none shadow-sm bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{req.type} : {req.subject}</h4>
                    <p className="text-sm text-gray-500">Demandé par <span className="font-semibold text-gray-700">{req.requester}</span> • {req.timeAgo}</p>
                  </div>
                </div>
                <Badge className={req.priorityColor + " border-none uppercase text-[10px] font-bold px-3 py-1"}>
                  {req.priority}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Justification</p>
                  <div className="bg-blue-50/30 p-4 rounded-lg text-sm text-gray-700 leading-relaxed border border-blue-50">
                    {req.justification}
                  </div>
                </div>

                {req.conflicts ? (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Conflits Détectés
                    </p>
                    <div className="bg-red-50 p-4 rounded-lg text-sm text-red-900 leading-relaxed border border-red-100">
                      {req.conflicts.map((conflict, i) => (
                        <div key={i}>
                          <p className="font-semibold mb-1">{conflict}</p>
                          <button className="text-[11px] underline font-bold mt-1">Voir les détails du conflit</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Impact sur le planning</p>
                    <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-900 leading-relaxed border border-blue-100">
                      {req.impact}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50/50 flex flex-col md:flex-row items-center gap-4">
              <Input 
                placeholder="Ajouter un commentaire de validation..." 
                className="bg-white border-gray-200"
              />
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none border-gray-300 text-gray-700 px-8">
                  Rejeter
                </Button>
                <Button className="flex-1 md:flex-none bg-[#17203A] hover:bg-[#12192B] px-8">
                  Approuver
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
