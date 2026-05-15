"use client";

import { Printer, Filter, Plus, Info, AlertCircle, GripVertical, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const days = ["MON", "TUE", "WED", "THU", "FRI"];
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export function TimetableGrid() {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b border-r bg-gray-50/50 w-24"></th>
              {days.map(day => (
                <th key={day} className="p-4 border-b border-r bg-gray-50/50 text-xs font-bold text-gray-500 tracking-widest last:border-r-0">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, idx) => (
              <tr key={hour} className="h-24">
                <td className="p-3 border-b border-r bg-gray-50/30 text-[10px] font-bold text-gray-400 text-center align-top">
                  {hour}
                </td>
                {days.map(day => (
                  <td key={`${day}-${hour}`} className="border-b border-r last:border-r-0 relative group hover:bg-blue-50/30 transition-colors">
                    {day === "MON" && hour === "08:00" && (
                      <div className="absolute inset-1.5 bg-blue-100/80 border-l-4 border-blue-900 rounded-md p-3 shadow-sm z-10">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[10px] font-black text-blue-900 uppercase tracking-tighter">Cours</span>
                          <button className="text-blue-900/50 hover:text-blue-900"><GripVertical size={12} /></button>
                        </div>
                        <p className="text-xs font-black text-blue-950 leading-tight">Algorithmique Fondamentale</p>
                        <p className="text-[10px] text-blue-900/60 mt-1 font-medium">Dr. Jean Dupont • Salle 104</p>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function SidebarSchedules() {
  return (
    <div className="space-y-8">
      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-amber-500 rounded-full" />
            <CardTitle className="text-lg font-bold text-[#001f3f]">Unassigned Courses</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { type: "TP", name: "Architecture Logicielle", prof: "Prof. K. Wilson", duration: "3 Hours" },
            { type: "TD", name: "Statistiques Avancées", prof: "Dr. M. Ross", duration: "1.5 Hours" },
            { type: "COURS", name: "Droit du Numérique", prof: "Mme. Sophie Q.", duration: "2 Hours" }
          ].map((course, i) => (
            <div key={i} className="group border border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-grab active:cursor-grabbing">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="outline" className="bg-white border-none shadow-sm text-[10px] font-bold px-2 py-0.5 text-blue-900">
                  {course.type}
                </Badge>
                <GripVertical className="w-4 h-4 text-gray-300 group-hover:text-blue-400" />
              </div>
              <h5 className="font-bold text-gray-900 text-sm mb-1">{course.name}</h5>
              <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1">
                <Info size={12} /> {course.prof}
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <Clock size={12} /> {course.duration}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-blue-50/50 border-l-4 border-l-red-400">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-blue-950">Scheduling Conflicts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 text-red-600">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-xs font-medium leading-relaxed">
              Room Lab 02 overbooked on Tue morning by 2 different groups.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
