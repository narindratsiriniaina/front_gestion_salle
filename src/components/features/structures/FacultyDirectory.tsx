"use client";

import { Filter, UserPlus, MoreVertical, Mail, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const faculty = [
  {
    id: 1,
    name: "Dr. Aristhène Randriana",
    title: "Senior Lecturer",
    specialization: "Artificial Intelligence",
    email: "a.randriana@emit.edu",
    phone: "+261 34 00 000 01",
    status: "Available",
    assignments: ["L3", "M2"],
    image: "/avatars/1.png"
  },
  {
    id: 2,
    name: "Pr. Jean Rakoto",
    title: "Department Head",
    specialization: "Advanced Mathematics",
    email: "j.rakoto@emit.edu",
    phone: "+261 34 00 000 02",
    status: "On Leave",
    assignments: ["L1", "L2"],
    image: "/avatars/2.png"
  },
  {
    id: 3,
    name: "Mme Claire Volana",
    title: "Lecturer",
    specialization: "Digital Marketing",
    email: "c.volana@emit.edu",
    phone: "+261 34 00 000 03",
    status: "Available",
    assignments: ["M1"],
    image: "/avatars/3.png"
  }
];

export function FacultyDirectory() {
  return (
    <Card className="shadow-sm border-none bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <div>
          <CardTitle className="text-xl font-bold text-[#001f3f]">Annuaire des Enseignants</CardTitle>
          <p className="text-sm text-gray-500">Registry of professors, specializations, and availability.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filter by Department
          </Button>
          <Button className="bg-[#001f3f] hover:bg-[#001429] gap-2">
            <UserPlus className="w-4 h-4" /> Add Professor
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-gray-50/50">
              <TableHead className="w-[300px] uppercase text-[10px] font-bold tracking-wider text-gray-500">Professor</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-wider text-gray-500">Specialization</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-wider text-gray-500">Contact Info</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-wider text-gray-500">Status</TableHead>
              <TableHead className="uppercase text-[10px] font-bold tracking-wider text-gray-500">Assignments</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faculty.map((member) => (
              <TableRow key={member.id} className="group hover:bg-gray-50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                      <AvatarImage src={member.image} />
                      <AvatarFallback className="bg-blue-100 text-blue-900 font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-[#001f3f]">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.title}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm font-medium text-blue-900/80">{member.specialization}</p>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <p className="text-sm text-gray-700">{member.email}</p>
                    <p className="text-[11px] text-gray-400">{member.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={
                    member.status === "Available" 
                      ? "bg-green-100 text-green-700 hover:bg-green-100 border-none px-3" 
                      : "bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-3"
                  }>
                    <div className={member.status === "Available" ? "w-2 h-2 rounded-full bg-green-500 mr-2" : "w-2 h-2 rounded-full bg-amber-500 mr-2"} />
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5">
                    {member.assignments.map(lvl => (
                      <div key={lvl} className={
                        lvl.startsWith('M') 
                          ? "w-8 h-8 rounded bg-[#001f3f] text-white flex items-center justify-center text-[10px] font-bold"
                          : "w-8 h-8 rounded bg-blue-100 text-blue-900 flex items-center justify-center text-[10px] font-bold"
                      }>
                        {lvl}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-between mt-6 pt-6 border-t">
          <p className="text-xs text-gray-500">Showing 1-3 of 42 Professors</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="px-6 h-9">Previous</Button>
            <Button className="bg-[#b8860b] hover:bg-[#a67a0a] w-9 h-9 p-0 flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
