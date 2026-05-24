"use client";

import { useEffect, useState } from "react";
import { Plus, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RoomStats, RoomInventoryTable, UsageEfficacité } from "@/components/features/salles/RoomComponents";
import { Card } from "@/components/ui/card";
import { roomService } from "@/services/room.service";
import { Room } from "@/types/room.types";
import { AddRoomModal } from "@/components/features/salles/AddRoomModal";

export function ClassroomsContent() {
  const [salles, setSalles] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedBatiment, setSelectedBatiment] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  async function fetchSalles() {
    try {
      setLoading(true);
      const data = await roomService.getRooms(selectedBatiment, selectedType);
      setSalles(data);
      setError(null);
    } catch (err: unknown) {
      console.error("Failed to fetch salles", err);
      setError("Erreur lors de la récupération des salles.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSalles();
  }, [selectedBatiment, selectedType]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#17203A] tracking-tight">Gestion des Salles</h1>
          <p className="text-gray-500 mt-1">Manage infrastructure, seating capacity, and room availability across all campus buildings.</p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Bâtiment</span>
            <Select value={selectedBatiment} onValueChange={setSelectedBatiment}>
              <SelectTrigger className="w-[140px] h-11 bg-white border-gray-200 font-bold text-[#17203A]">
                <SelectValue placeholder="Tous" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="A">Bâtiment A</SelectItem>
                <SelectItem value="B">Bâtiment B</SelectItem>
                <SelectItem value="C">Bâtiment C</SelectItem>
                <SelectItem value="D">Bâtiment D</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Type de salle</span>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px] h-11 bg-white border-gray-200 font-bold text-[#17203A]">
                <SelectValue placeholder="Tous" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="cours">Cours</SelectItem>
                <SelectItem value="tp">TP</SelectItem>
                <SelectItem value="amphi">Amphi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="h-11 px-6 bg-[#17203A] hover:bg-[#12192B] gap-2 font-bold"
          >
            <Plus className="w-4 h-4" /> Ajouter Salle
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-[#17203A] animate-spin" />
          <span className="ml-2 text-gray-500 font-bold">Chargement des données...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 font-semibold">
          {error}
        </div>
      ) : (
        <>
          <RoomStats salles={salles} />

          <RoomInventoryTable salles={salles} />
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8">
          <Card className="h-full border-none shadow-sm bg-gray-100 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/0 transition-colors duration-500" />
            <div className="relative z-10 text-center p-12">
               <div className="bg-white px-4 py-2 rounded-lg shadow-sm font-bold text-[#17203A] mb-4">Interactive Campus Layout</div>
               <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">Map visualization would be rendered here in the production version.</p>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4 h-full">
          <UsageEfficacité />
        </div>
      </div>

      {/* Mobile Plus Button */}
      <Button 
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-10 right-10 w-14 h-14 rounded-2xl bg-[#5C8ABF] hover:bg-[#a67a0a] shadow-2xl p-0 flex items-center justify-center lg:hidden z-50"
      >
        <Plus className="text-white w-6 h-6" />
      </Button>

      <AddRoomModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen} 
        onSuccess={fetchSalles} 
      />
    </div>
  );
}
