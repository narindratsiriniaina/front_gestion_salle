"use client";

import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RoomStats, RoomInventoryTable, UsageEfficiency } from "@/components/features/classrooms/RoomComponents";
import { Card } from "@/components/ui/card";

export default function ClassroomsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#001f3f] tracking-tight">Gestion des Salles</h1>
          <p className="text-gray-500 mt-1">Manage infrastructure, seating capacity, and room availability across all campus buildings.</p>
        </div>
        <div className="flex items-end gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Building</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] h-11 bg-white border-gray-200">
                <SelectValue placeholder="All Buildings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Buildings</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Room Type</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] h-11 bg-white border-gray-200">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="h-11 px-6 bg-[#001f3f] hover:bg-[#001429] gap-2">
            <Filter className="w-4 h-4" /> Apply Filters
          </Button>
        </div>
      </div>

      <RoomStats />

      <RoomInventoryTable />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8">
          <Card className="h-full border-none shadow-sm bg-gray-100 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/0 transition-colors duration-500" />
            <div className="relative z-10 text-center p-12">
               <div className="bg-white px-4 py-2 rounded-lg shadow-sm font-bold text-[#001f3f] mb-4">Interactive Campus Layout</div>
               <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">Map visualization would be rendered here in the production version.</p>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4 h-full">
          <UsageEfficiency />
        </div>
      </div>

      <Button className="fixed bottom-10 right-10 w-14 h-14 rounded-2xl bg-[#b8860b] hover:bg-[#a67a0a] shadow-2xl p-0 flex items-center justify-center lg:hidden">
        <Plus className="text-white w-6 h-6" />
      </Button>
    </div>
  );
}
