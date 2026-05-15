"use client";

import { DoorOpen, CheckCircle2, Users, Settings2, Filter, Download, Printer, Edit2, Calendar } from "lucide-react";
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

export function RoomStats() {
  const stats = [
    { label: "Total Rooms", value: "124", icon: DoorOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Available Now", value: "82", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Capacity", value: "4,250", icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Maintenance", value: "4", icon: Settings2, color: "text-gray-600", bg: "bg-gray-100" }
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
              <h4 className="text-2xl font-black text-[#001f3f]">{s.value}</h4>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const rooms = [
  { name: "Amphi A1", building: "Building A", floor: "Ground Floor", capacity: "250 seats", type: "Lecture Hall", status: "Available" },
  { name: "Lab B-302", building: "Building B", floor: "3rd Floor", capacity: "45 seats", type: "Computer Lab", status: "Occupied" },
  { name: "Seminar C02", building: "Building C", floor: "1st Floor", capacity: "20 seats", type: "Seminar Room", status: "Available" },
  { name: "Lab A-212", building: "Building A", floor: "2nd Floor", capacity: "30 seats", type: "Computer Lab", status: "Available" },
  { name: "Conference D1", building: "Building D", floor: "Top Floor", capacity: "100 seats", type: "Lecture Hall", status: "Occupied" },
];

export function RoomInventoryTable() {
  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-6">
        <CardTitle className="text-xl font-bold text-[#001f3f]">Inventory & Availability</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400"><Download size={18} /></Button>
          <Button variant="ghost" size="icon" className="text-gray-400"><Printer size={18} /></Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="pl-8 uppercase text-[10px] font-bold tracking-widest text-gray-400">Room Name</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Building</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Floor</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Capacity</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Type</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-widest text-gray-400">Status</TableHead>
              <TableHead className="pr-8 text-right uppercase text-[10px] font-bold tracking-widest text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room, i) => (
              <TableRow key={i} className="hover:bg-gray-50 transition-colors">
                <TableCell className="pl-8 font-bold text-[#001f3f] py-5">{room.name}</TableCell>
                <TableCell className="text-sm text-gray-600">{room.building}</TableCell>
                <TableCell className="text-sm text-gray-500">{room.floor}</TableCell>
                <TableCell className="text-sm font-medium text-gray-700">{room.capacity}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none font-medium text-[10px] px-2 py-0.5">
                    {room.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    room.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${room.status === 'Available' ? 'bg-green-500' : 'bg-amber-500'}`} />
                    {room.status}
                  </div>
                </TableCell>
                <TableCell className="pr-8 text-right">
                  <div className="flex justify-end gap-4">
                    <button className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"><Edit2 size={12} /> Edit Room</button>
                    <button className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"><Calendar size={12} /> View Schedule</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
          <p className="text-[11px] text-gray-400">Showing 1-5 of 124 rooms</p>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-lg">&lt;</Button>
            <Button className="w-9 h-9 p-0 rounded-lg bg-[#001f3f] hover:bg-[#001429]">1</Button>
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-lg">2</Button>
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-lg">3</Button>
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-lg">&gt;</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function UsageEfficiency() {
  return (
    <Card className="bg-[#001f3f] text-white border-none shadow-xl overflow-hidden h-full">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-xl font-bold">Usage Efficiency</CardTitle>
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
