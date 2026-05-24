"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Send, Info, Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimetableRequest } from "@/types/request.types";
import { Room } from "@/types/room.types";
import { roomService } from "@/services/room.service";
import { requestService } from "@/services/request.service";
import { toast } from "sonner";
import { timetableService } from "@/services/timetable.service";

interface SubmitRequestFormProps {
  onSubmitted: () => void;
}

export function SubmitRequestForm({ onSubmitted }: SubmitRequestFormProps) {
  const [salles, setSalles] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  
  const [typeDemande, setTypeDemande] = useState("Modification");
  const [idSalle, setIdSalle] = useState<string>("");
  const [idCours, setIdCours] = useState<string>("");
  const [justification, setJustification] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingRooms(true);
        setLoadingCourses(true);
        
        const roomsData = await roomService.getRooms();
        setSalles(roomsData);
        if (roomsData.length > 0) setIdSalle(roomsData[0].IdSalle.toString());

        const coursesData = await timetableService.getWeeklyTimetable({});
        setCourses(coursesData);
        if (coursesData.length > 0) setIdCours(coursesData[0].IdCours.toString());

      } catch (err) {
        console.error("Erreur lors du chargement", err);
      } finally {
        setLoadingRooms(false);
        setLoadingCourses(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async () => {
    if (!justification.trim()) {
      toast.error("Veuillez entrer une justification.");
      return;
    }

    try {
      setSubmitting(true);
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : { id: 1 };

      const newDemande: Omit<TimetableRequest, "IdDemande"> = {
        IdDemandeur: parseInt(user.id) || 1,
        IdSalle: idSalle ? parseInt(idSalle) : undefined,
        IdCours: idCours ? parseInt(idCours) : undefined,
        TypeDemande: typeDemande,
        Statut: "en attente",
        Justification: justification,
      };

      await requestService.createRequest(newDemande);
      toast.success("Votre demande a été soumise avec succès.");
      setJustification("");
      onSubmitted();
    } catch (err: any) {
      console.error("Échec de la soumission", err);
      const msg = err.response?.data?.ExceptionMessage || err.response?.data?.Message || err.message;
      toast.error("Erreur de soumission", { description: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader className="border-b border-gray-50 pb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-600" />
          <CardTitle className="text-xl font-bold text-[#17203A]">Nouvelle Demande</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-8 space-y-8">
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Type de demande</p>
          <Tabs defaultValue="Modification" onValueChange={setTypeDemande} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
              <TabsTrigger 
                value="Modification" 
                className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-[#17203A] data-[state=active]:shadow-sm"
              >
                Modification de Cours
              </TabsTrigger>
              <TabsTrigger 
                value="Reservation"
                className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-[#17203A] data-[state=active]:shadow-sm"
              >
                Nouvelle Réservation
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Cours Concerné</p>
            {loadingCourses ? (
              <div className="h-14 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-xl">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            ) : (
              <Select value={idCours} onValueChange={setIdCours}>
                <SelectTrigger className="h-14 bg-gray-50 border-gray-100 rounded-xl focus:ring-1 focus:ring-[#17203A]/10">
                  <SelectValue placeholder="Sélectionnez un cours..." />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.IdCours} value={c.IdCours.toString()}>
                      {c.Matiere?.NomMatiere || `Cours #${c.IdCours}`} ({c.TypeCours})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Salle Ciblée</p>
            {loadingRooms ? (
              <div className="h-14 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-xl">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            ) : (
              <Select value={idSalle} onValueChange={setIdSalle}>
                <SelectTrigger className="h-14 bg-gray-50 border-gray-100 rounded-xl focus:ring-1 focus:ring-[#17203A]/10">
                  <SelectValue placeholder="Sélectionnez une salle..." />
                </SelectTrigger>
                <SelectContent>
                  {salles.map((salle) => (
                    <SelectItem key={salle.IdSalle} value={salle.IdSalle.toString()}>
                      {salle.NomSalle} (Capacité: {salle.Capacite})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Justification</p>
          <Textarea 
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Détaillez la raison de votre demande (date, heure souhaitée, motifs...)" 
            className="min-h-[120px] bg-gray-50 border-gray-100 rounded-xl resize-none p-4"
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={submitting}
          className="w-full h-14 bg-[#17203A] hover:bg-[#12192B] rounded-xl text-md font-bold gap-2"
        >
          {submitting ? (
            <>
              Envoi en cours...
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              Envoyer la Demande
              <Send className="w-4 h-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

interface RequestsSummaryCardsProps {
  demandes: TimetableRequest[];
}

export function RequestsSummaryCards({ demandes }: RequestsSummaryCardsProps) {
  const countByStatut = (status: string) => {
    return demandes.filter((d) => d.Statut?.toLowerCase() === status.toLowerCase()).length;
  };

  const pendingCount = countByStatut("en attente") + countByStatut("pending");
  const approvedCount = countByStatut("validée") + countByStatut("validee") + countByStatut("approved");
  const rejectedCount = countByStatut("refusée") + countByStatut("refusee") + countByStatut("rejected");

  const padZero = (num: number) => (num < 10 ? `0${num}` : num.toString());

  const summaries = [
    { label: "EN ATTENTE D'APPROBATION", value: padZero(pendingCount), icon: Clock, color: "bg-amber-50 text-amber-600", iconBg: "bg-amber-100" },
    { label: "VALIDÉES AVEC SUCCÈS", value: padZero(approvedCount), icon: Send, color: "bg-green-50 text-green-600", iconBg: "bg-green-100" },
    { label: "TOTAL REFUSÉES", value: padZero(rejectedCount), icon: Info, color: "bg-red-50 text-red-600", iconBg: "bg-red-100" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaries.map((s, i) => (
        <Card key={i} className={`border-none shadow-sm ${s.color} overflow-hidden group`}>
          <CardContent className="p-6 flex items-center gap-6">
            <div className={`${s.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-70">{s.label}</p>
              <h4 className="text-3xl font-black">{s.value}</h4>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
