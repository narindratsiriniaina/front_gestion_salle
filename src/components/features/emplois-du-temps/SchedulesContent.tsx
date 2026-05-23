"use client";

import { useEffect, useState } from "react";
import { Printer, Filter, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { TimetableGrid, SidebarSchedules } from "@/components/features/emplois-du-temps/TimetableComponents";
import { timetableService } from "@/services/timetable.service";
import { Course } from "@/types/course.types";
import { toast } from "sonner";

export function SchedulesContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true);
        // Load default weekly timetable
        const data = await timetableService.getWeeklyTimetable({});
        setCourses(data);
      } catch (error) {
        console.error("Erreur de récupération:", error);
        toast.error("Échec du chargement de l'emploi du temps");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#17203A] tracking-tight">Emploi du Temps</h1>
          <p className="text-gray-500 mt-1">Gérer la répartition hebdomadaire des cours</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-gray-300 shadow-sm bg-white">
            <Filter className="w-4 h-4" /> Filtres
          </Button>
          <Button className="bg-[#17203A] hover:bg-[#12192B] gap-2">
            <Plus className="w-4 h-4" /> Nouvelle Demande
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap items-center gap-6 border">
        {/* ... filters ... */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Classe</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px] border-none font-bold text-[#17203A] bg-gray-50/50">
              <SelectValue placeholder="Sélectionnez une classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              <SelectItem value="1">L3 DA2I</SelectItem>
              <SelectItem value="2">L3 CIGSI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Période</span>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><ChevronLeft size={16} /></Button>
            <span className="font-bold text-[#17203A] text-sm">Cette Semaine</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><ChevronRight size={16} /></Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
          <Loader2 className="w-8 h-8 animate-spin text-[#17203A]/40" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <TimetableGrid courses={courses} />
          </div>
          <SidebarSchedules />
        </div>
      )}

      <Button className="fixed bottom-10 right-10 w-14 h-14 rounded-2xl bg-[#5C8ABF] hover:bg-[#a67a0a] shadow-2xl p-0 flex items-center justify-center">
        <Printer className="text-white w-6 h-6" />
      </Button>
    </div>
  );
}
