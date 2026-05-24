"use client";

import { useEffect, useState } from "react";
import { Printer, Filter, Plus, ChevronLeft, ChevronRight, Loader2, Download, Eye } from "lucide-react";
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
import { classService } from "@/services/class.service";
import { teacherService } from "@/services/teacher.service";
import { roomService } from "@/services/room.service";
import { Course } from "@/types/course.types";
import { ClassGroup, Teacher } from "@/types/academic.types";
import { Room } from "@/types/room.types";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SubmitRequestForm } from "@/components/features/requetes/RequestForm";

export function SchedulesContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter lists from API
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  // Selected filters
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [selectedRoom, setSelectedRoom] = useState<string>("all");

  // Load classes, teachers, and rooms on mount
  useEffect(() => {
    const loadFilterData = async () => {
      try {
        const [classesData, teachersData, roomsData] = await Promise.all([
          classService.getClasses().catch(() => []),
          teacherService.getTeachers().catch(() => []),
          roomService.getRooms().catch(() => [])
        ]);
        setClasses(classesData);
        setTeachers(teachersData);
        setRooms(roomsData);
      } catch (error) {
        console.error("Erreur de récupération des filtres:", error);
      }
    };
    loadFilterData();
  }, []);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      if (selectedClass !== "all") filters.classeId = parseInt(selectedClass);
      if (selectedTeacher !== "all") filters.profId = parseInt(selectedTeacher);
      if (selectedRoom !== "all") filters.salleId = parseInt(selectedRoom);

      const data = await timetableService.getWeeklyTimetable(filters);
      setCourses(data);
    } catch (error) {
      console.error("Erreur de récupération:", error);
      toast.error("Échec du chargement de l'emploi du temps");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, [selectedClass, selectedTeacher, selectedRoom]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-3xl font-black text-[#17203A] tracking-tight">Emploi du Temps</h1>
          <p className="text-gray-500 mt-1">Gérer la répartition hebdomadaire des cours</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#17203A] hover:bg-[#12192B] gap-2">
                <Plus className="w-4 h-4" /> Nouvelle Demande
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-6xl bg-white p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
              <DialogHeader className="sr-only">
                <DialogTitle>Nouvelle Demande</DialogTitle>
                <DialogDescription>
                  Formulaire pour soumettre une nouvelle demande d'emploi du temps ou de réservation.
                </DialogDescription>
              </DialogHeader>
              <SubmitRequestForm onSubmitted={() => {
                setIsDialogOpen(false);
                fetchTimetable();
              }} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap items-center gap-6 border print:hidden">
        {/* Class Filter */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Classe</span>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px] border-none font-bold text-[#17203A] bg-gray-50/50">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              {classes.map((c) => (
                <SelectItem key={c.IdClasse} value={c.IdClasse.toString()}>
                  {c.NomClasse}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Teacher Filter */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Enseignant</span>
          <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
            <SelectTrigger className="w-[180px] border-none font-bold text-[#17203A] bg-gray-50/50">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les enseignants</SelectItem>
              {teachers.map((t) => (
                <SelectItem key={t.IdProfesseur} value={t.IdProfesseur.toString()}>
                  {t.Nom} {t.Prenom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Room Filter */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Salle</span>
          <Select value={selectedRoom} onValueChange={setSelectedRoom}>
            <SelectTrigger className="w-[180px] border-none font-bold text-[#17203A] bg-gray-50/50">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les salles</SelectItem>
              {rooms.map((r) => (
                <SelectItem key={r.IdSalle} value={r.IdSalle.toString()}>
                  {r.NomSalle}
                </SelectItem>
              ))}
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
          <div className="lg:col-span-3 print:col-span-4 print:w-full">
            <div className="hidden print:block mb-6">
              <h1 className="text-2xl font-bold text-[#17203A]">École de Management et d'Innovation Technologique</h1>
              <h2 className="text-xl font-bold text-gray-800">Emploi du Temps Universitaire</h2>
              <p className="text-sm text-gray-500">Généré le {new Date().toLocaleDateString()}</p>
              <div className="mt-4 flex gap-4 text-xs font-semibold text-gray-600">
                {selectedClass !== "all" && <span>Classe: {classes.find(c => c.IdClasse.toString() === selectedClass)?.NomClasse}</span>}
                {selectedTeacher !== "all" && <span>Enseignant: {teachers.find(t => t.IdProfesseur.toString() === selectedTeacher)?.Nom}</span>}
                {selectedRoom !== "all" && <span>Salle: {rooms.find(r => r.IdSalle.toString() === selectedRoom)?.NomSalle}</span>}
              </div>
            </div>
            <TimetableGrid courses={courses} />
          </div>
          <div className="print:hidden">
            <SidebarSchedules />
          </div>
        </div>
      )}

      {/* Floating Buttons: Imprimer et Télécharger PDF */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-3 print:hidden z-50">
        <Button 
          title="Imprimer l'emploi du temps"
          onClick={handlePrint}
          className="w-14 h-14 rounded-2xl bg-[#17203A] hover:bg-[#12192B] shadow-2xl p-0 flex items-center justify-center text-white"
        >
          <Printer className="w-6 h-6" />
        </Button>
        <Button 
          title="Télécharger l'emploi du temps en PDF"
          onClick={handlePrint} // Triggers browser's native print-to-PDF
          className="w-14 h-14 rounded-2xl bg-[#5C8ABF] hover:bg-[#a67a0a] shadow-2xl p-0 flex items-center justify-center text-white"
        >
          <Download className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
