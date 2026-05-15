"use client";

import { Printer, Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { TimetableGrid, SidebarSchedules } from "@/components/features/schedules/TimetableComponents";

export default function SchedulesPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#001f3f] tracking-tight">Emploi du Temps</h1>
          <p className="text-gray-500 mt-1">Manage weekly course distribution for Faculty of Technology</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-gray-300 shadow-sm bg-white">
            <Filter className="w-4 h-4" /> Filters
          </Button>
          <Button className="bg-[#001f3f] hover:bg-[#001429] gap-2">
            <Plus className="w-4 h-4" /> New Request
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap items-center gap-6 border">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Classe</span>
          <Select defaultValue="l3">
            <SelectTrigger className="w-[200px] border-none font-bold text-[#001f3f] bg-gray-50/50">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="l3">L3 Informatique G1</SelectItem>
              <SelectItem value="m1">M1 Management</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Professor</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] border-none font-bold text-[#001f3f] bg-gray-50/50">
              <SelectValue placeholder="Select Prof" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Faculty</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Room (Salle)</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px] border-none font-bold text-[#001f3f] bg-gray-50/50">
              <SelectValue placeholder="Select Room" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Period</span>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><ChevronLeft size={16} /></Button>
            <span className="font-bold text-[#001f3f] text-sm">Oct 23 - Oct 27, 2023</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><ChevronRight size={16} /></Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <TimetableGrid />
        </div>
        <SidebarSchedules />
      </div>

      <Button className="fixed bottom-10 right-10 w-14 h-14 rounded-2xl bg-[#5a4200] hover:bg-[#4a3600] shadow-2xl p-0 flex items-center justify-center">
        <Printer className="text-white w-6 h-6" />
      </Button>
    </div>
  );
}
