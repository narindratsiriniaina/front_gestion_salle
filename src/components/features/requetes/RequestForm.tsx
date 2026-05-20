"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Send, Info, Loader2 } from "lucide-react";
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

interface SubmitRequestFormProps {
  onSubmitted: () => void;
}

export function SubmitRequestForm({ onSubmitted }: SubmitRequestFormProps) {
  const [salles, setSalles] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  
  const [typeDemande, setTypeDemande] = useState("Modification");
  const [idSalle, setIdSalle] = useState<string>("");
  const [justification, setJustification] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadSalles() {
      try {
        setLoadingRooms(true);
        const data = await roomService.getRooms();
        setSalles(data);
        if (data.length > 0) {
          setIdSalle(data[0].IdSalle.toString());
        }
      } catch (err) {
        console.error("Failed to load salles in form", err);
      } finally {
        setLoadingRooms(false);
      }
    }
    loadSalles();
  }, []);

  const handleSubmit = async () => {
    if (!justification.trim()) {
      toast.error("Veuillez entrer une justification.");
      return;
    }

    try {
      setSubmitting(true);
      const newDemande: Omit<TimetableRequest, "IdDemande"> = {
        IdDemandeur: 1, // Mock current user ID
        IdSalle: idSalle ? parseInt(idSalle) : undefined,
        TypeDemande: typeDemande,
        Statut: "en attente",
        Justification: justification,
      };

      await requestService.createRequest(newDemande);
      toast.success("Votre demande a été soumise avec succès.");
      setJustification("");
      onSubmitted();
    } catch (err) {
      console.error("Failed to submit request", err);
      toast.error("Erreur lors de la soumission de la demande.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader className="border-b border-gray-50 pb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-600" />
          <CardTitle className="text-xl font-bold text-[#001f3f]">Submit New Request</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-8 space-y-8">
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Request Type</p>
          <Tabs defaultValue="Modification" onValueChange={setTypeDemande} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
              <TabsTrigger 
                value="Modification" 
                className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-[#001f3f] data-[state=active]:shadow-sm"
              >
                Modification
              </TabsTrigger>
              <TabsTrigger 
                value="Reservation"
                className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-[#001f3f] data-[state=active]:shadow-sm"
              >
                Reservation
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Target Room (Salle)</p>
          {loadingRooms ? (
            <div className="h-14 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-xl">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          ) : (
            <Select value={idSalle} onValueChange={setIdSalle}>
              <SelectTrigger className="h-14 bg-gray-50 border-gray-100 rounded-xl focus:ring-1 focus:ring-[#001f3f]/10">
                <SelectValue placeholder="Select a classroom..." />
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

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Preferred Date</p>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input type="date" className="h-14 pl-12 bg-gray-50 border-gray-100 rounded-xl" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Preferred Time</p>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input type="time" className="h-14 pl-12 bg-gray-50 border-gray-100 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Justification</p>
          <Textarea 
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Provide details for your request..." 
            className="min-h-[120px] bg-gray-50 border-gray-100 rounded-xl resize-none p-4"
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={submitting}
          className="w-full h-14 bg-[#001f3f] hover:bg-[#001429] rounded-xl text-md font-bold gap-2"
        >
          {submitting ? (
            <>
              Sending...
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              Send Request for Validation
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
  const countByStatus = (status: string) => {
    return demandes.filter((d) => d.Statut?.toLowerCase() === status.toLowerCase()).length;
  };

  const pendingCount = countByStatus("en attente") + countByStatus("pending");
  const approvedCount = countByStatus("validée") + countByStatus("validee") + countByStatus("approved");
  const rejectedCount = countByStatus("refusée") + countByStatus("refusee") + countByStatus("rejected");

  const padZero = (num: number) => (num < 10 ? `0${num}` : num.toString());

  const summaries = [
    { label: "PENDING APPROVAL", value: padZero(pendingCount), icon: Clock, color: "bg-amber-50 text-amber-600", iconBg: "bg-amber-100" },
    { label: "SUCCESSFULLY VALIDATED", value: padZero(approvedCount), icon: Send, color: "bg-green-50 text-green-600", iconBg: "bg-green-100" },
    { label: "TOTAL REFUSED", value: padZero(rejectedCount), icon: Info, color: "bg-red-50 text-red-600", iconBg: "bg-red-100" }
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
