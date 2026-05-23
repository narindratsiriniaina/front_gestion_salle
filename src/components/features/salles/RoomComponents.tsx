"use client";

import { DoorOpen, CheckCircle2, Users, Settings2, Download, Printer, Edit2, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Room } from "@/types/room.types";

interface RoomProps {
  salles: Room[];
}

export function RoomStats({ salles }: RoomProps) {
  const totalCapacité = salles.reduce((acc, s) => acc + (s.Capacite || 0), 0);
  const totalRooms = salles.length;
  const availableRooms = salles.filter((_, i) => i % 3 !== 0).length; // Mock availability formula
  const maintenanceRooms = salles.filter((_, i) => i % 15 === 0 && i !== 0).length;

  const stats = [
    { label: "Total des Salles", value: totalRooms.toString(), icon: DoorOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Disponible Now", value: availableRooms.toString(), icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
    { label: "Capacité Totale", value: totalCapacité.toLocaleString(), icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Maintenance", value: maintenanceRooms.toString(), icon: Settings2, color: "text-gray-600", bg: "bg-gray-100" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <Card key={i} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`${s.bg} w-12 h-12 rounded-xl flex items-center justify-center`}>
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
              <h4 className="text-2xl font-black text-[#17203A]">{s.value}</h4>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function RoomInventoryTable({ salles }: RoomProps) {
  // Format floor names helper
  const getFloorName = (floor: number) => {
    if (floor === 0) return "Ground Floor";
    if (floor === 1) return "1st Floor";
    if (floor === 2) return "2nd Floor";
    if (floor === 3) return "3rd Floor";
    return `${floor}th Floor`;
  };

  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-6">
        <CardTitle className="text-xl font-bold text-[#17203A]">Inventory & Availability</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400"><Download size={18} /></Button>
          <Button variant="ghost" size="icon" className="text-gray-400"><Printer size={18} /></Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="pl-8 uppercase text-[10px] font-bold tracking-widest text-gray-400">Nom de la Salle</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Bâtiment</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Floor</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Capacité</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Type</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Statut</TableHead>
              <TableHead className="pr-8 text-right uppercase text-[10px] font-bold tracking-widest text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  Aucune salle disponible.
                </TableCell>
              </TableRow>
            ) : (
              salles.map((room, i) => {
                const isDisponible = i % 3 !== 0;
                return (
                  <TableRow key={room.IdSalle || i} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="pl-8 font-bold text-[#17203A] py-5">{room.NomSalle}</TableCell>
                    <TableCell className="text-sm text-gray-600">Bâtiment {room.CodeBatiment}</TableCell>
                    <TableCell className="text-sm text-gray-500">{getFloorName(room.Etage)}</TableCell>
                    <TableCell className="text-sm font-medium text-gray-700">{room.Capacite} seats</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none font-medium text-[10px] px-2 py-0.5">
                        {room.TypeSalle || "Lecture Hall"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        isDisponible ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isDisponible ? 'bg-green-500' : 'bg-amber-500'}`} />
                        {isDisponible ? "Disponible" : "Occupée"}
                      </div>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex justify-end gap-4">
                        <button className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"><Edit2 size={12} /> Modifier Room</button>
                        <button className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"><Calendar size={12} /> Voir le planning</button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
          <p className="text-[11px] text-gray-400">Affichage de {salles.length} rooms</p>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-lg">&lt;</Button>
            <Button className="w-9 h-9 p-0 rounded-lg bg-[#17203A] hover:bg-[#12192B]">1</Button>
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-lg">&gt;</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function UsageEfficacité() {
  return (
    <Card className="bg-[#17203A] text-white border-none shadow-xl overflow-hidden h-full">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-xl font-bold">Usage Efficacité</CardTitle>
        <p className="text-blue-200/50 text-xs mt-1 leading-relaxed">Real-time room utilization across all departments.</p>
      </CardHeader>
      <CardContent className="p-8 pt-4 space-y-8">
        {[
          { label: "Lecture Halls", value: 92, color: "bg-amber-500" },
          { label: "Computer Labs", value: 65, color: "bg-blue-300" },
          { label: "Faculty Offices", value: 40, color: "bg-white/20" }
        ].map((item, i) => (
          <div key={i} className="space-y-3">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
              <span className="text-blue-100">{item.label}</span>
              <span className="text-white">{item.value}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full h-12 mt-8 bg-transparent border-white/20 text-white hover:bg-white/5 font-bold rounded-xl">
          Download Report
        </Button>
      </CardContent>
    </Card>
  );
}
