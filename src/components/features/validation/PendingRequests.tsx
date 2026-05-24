"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Clock, MapPin, Calendar, CheckCircle2, XCircle, Loader2, MoreVertical, Check, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requestService } from "@/services/request.service";
import { TimetableRequest } from "@/types/request.types";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function PendingRequests() {
  const [demandes, setDemandes] = useState<TimetableRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDemandes = async () => {
    try {
      setLoading(true);
      const data = await requestService.getRequests();
      // Filter for pending requests
      const pending = data.filter(d => 
        d.Statut?.toLowerCase() === "en attente" || 
        d.Statut?.toLowerCase() === "pending" ||
        d.Statut?.toLowerCase() === "en_attente"
      );
      setDemandes(pending);
    } catch (error) {
      console.error("Erreur de récupération des demandes:", error);
      toast.error("Impossible de charger les demandes de validation.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await requestService.validateRequest(id);
      toast.success("La demande a été validée avec succès !");
      fetchDemandes();
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.Message || error.message;
      toast.error("Échec de la validation", { description: msg });
    }
  };

  const handleReject = async (id: number) => {
    try {
      await requestService.rejectRequest(id);
      toast.success("La demande a été refusée.");
      fetchDemandes();
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.Message || error.message;
      toast.error("Échec du rejet", { description: msg });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 text-[#17203A] animate-spin" />
        <span className="ml-2 text-gray-500 font-bold">Chargement des demandes...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#17203A]" />
          <h3 className="text-xl font-bold text-[#17203A]">Demandes en attente</h3>
        </div>
        <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400 border-none px-4 py-1 font-bold">
          {demandes.length} Action{demandes.length > 1 ? "s" : ""} requise{demandes.length > 1 ? "s" : ""}
        </Badge>
      </div>

      {demandes.length === 0 ? (
        <Card className="border-none shadow-sm bg-white p-8 text-center text-gray-500 font-medium">
          Aucune demande de validation en attente.
        </Card>
      ) : (
        demandes.map((req) => (
          <Card key={req.IdDemande} className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        {req.TypeDemande} {req.Cours?.Matiere?.NomMatiere ? `: ${req.Cours.Matiere.NomMatiere}` : ""}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Demandé par <span className="font-semibold text-gray-700">{req.Demandeur?.Nom || "Enseignant"} {req.Demandeur?.Prenom || ""}</span>
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 border-none uppercase text-[10px] font-bold px-3 py-1">
                    En Attente
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Justification</p>
                    <div className="bg-blue-50/30 p-4 rounded-lg text-sm text-gray-700 leading-relaxed border border-blue-50">
                      {req.Justification || "Aucune justification fournie."}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Détails techniques</p>
                    <div className="bg-blue-50/20 p-4 rounded-lg text-sm text-blue-950/80 leading-relaxed border border-blue-50/50">
                      <p><strong>Salle Ciblée :</strong> {req.Salle?.NomSalle || "Non spécifié"}</p>
                      <p><strong>Cours initial :</strong> {req.Cours?.Matiere?.NomMatiere || "Non spécifié"}</p>
                      <p><strong>Type de cours :</strong> {req.Cours?.TypeCours || "Non spécifié"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50/50 flex flex-col md:flex-row justify-end items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-gray-200 text-[#17203A] hover:bg-gray-100 font-bold gap-2">
                       Options <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border shadow-xl rounded-xl p-2 min-w-[200px]">
                    <DropdownMenuLabel className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1.5">Décision</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-100" />
                    <DropdownMenuItem 
                      onClick={() => handleApprove(req.IdDemande)}
                      className="flex items-center gap-2 p-2 focus:bg-green-50 focus:text-green-700 rounded-lg cursor-pointer font-bold"
                    >
                      <Check className="w-4 h-4" /> Approuver la demande
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleReject(req.IdDemande)}
                      className="flex items-center gap-2 p-2 focus:bg-red-50 focus:text-red-700 rounded-lg cursor-pointer font-bold"
                    >
                      <X className="w-4 h-4" /> Rejeter la demande
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-100" />
                    <DropdownMenuItem className="flex items-center gap-2 p-2 focus:bg-blue-50 focus:text-blue-700 rounded-lg cursor-pointer font-medium">
                      <Eye className="w-4 h-4" /> Voir détails complets
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
